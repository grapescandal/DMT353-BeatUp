initButton();

function initButton() {
  var categoriesBtn = document.getElementsByClassName("detail");
  var categoriesBtnLength = categoriesBtn.length;
  for (var i = 0; i < categoriesBtnLength; i++) {
    categoriesBtn[i].addEventListener('click', function() {
      var music_genres = this.getElementsByClassName("reclist")[0].getAttribute("music_genres");
      var music_moods = this.getElementsByClassName("reclist")[0].getAttribute("music_moods");
      if(music_genres == null) {
        music_genres = 0;
      }

      if(music_moods == null) {
        music_moods = 0;
      }
      readCategories(music_genres, music_moods);
    });
  }
}

var readCategories = function(music_genres, music_moods) {

  clearCategories();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(evt) {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = JSON.parse(xhr.response);
      createCategories(result);
    }
  }
  xhr.open("GET","query/categories.php?music_genres=" + music_genres + "&music_moods=" + music_moods);
  xhr.onerror = function() {alert("error!");};
  xhr.send();
}

var createCategories = function (categories) {

  var categoriesContainer = document.getElementById("categoriesContainer");
  var categoriesLength = categories.length;
  for(var i = 0; i < categoriesLength; i++) {
    var container = document.getElementById("template_categories").cloneNode(true);
    container.getElementsByClassName("reclist")[0].alt = "uploads/Music/" + categories[i]["music_local"];
    container.getElementsByClassName("reclist")[0].src = "uploads/Album/" + categories[i]["picture_albums"];
    container.getElementsByClassName("musicName")[0].innerHTML = categories[i]["music_name"];
    container.getElementsByClassName("reclist")[0].setAttribute("music_id", categories[i]["music_id"]);
    container.getElementsByClassName("reclist")[0].setAttribute("music_name", categories[i]["music_name"]);
    container.style.display = "block";
    container.getElementsByClassName("reclist")[0].addEventListener('click', addEventForCategories);
    container.getElementsByClassName("btnADlayout")[0].childNodes[1].addEventListener('click', addEventForCategories);

    //add to playlist
    container.getElementsByClassName("btnADlayout")[0].childNodes[3].addEventListener('click', function() {
      addToPlayList(this.parentNode.parentNode.getElementsByClassName("reclist")[0]);

      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });

    categoriesContainer.appendChild(container);
  }
}

function addEventForCategories() {
  playList = clearPlayList();
  songCover = clearSongCover();
  musicNameList = clearMusicName();
  clearPlayListNav();
  if(this == this.parentNode.getElementsByClassName("reclist")[0]) {
    addToPlayList(this.parentNode.getElementsByClassName("reclist")[0]);
  } else {
    addToPlayList(this.parentNode.parentNode.getElementsByClassName("reclist")[0]);

  }
  currentSong = 0;
  mytrack.src = playList[currentSong];
  currentSongCover.src = songCover[currentSong];
  currentSongName.text = musicNameList[currentSong];
  playOrPause();

  if(!isPlayerShow) {
    showPlayer("block");
    isPlayerShow = true;
  }
}

function addToPlayList(element) {
  increseView(global_user_id, element.getAttribute("music_id"));
  var index = playList.indexOf(element.alt);
  if(index < 0) {
    playList.push(element.alt);
    songCover.push(element.src);
    musicIdList.push(element.getAttribute("music_id"));
    musicNameList.push(element.getAttribute("music_name"));

    addToPlaylistNav(playList);
  }

  if(playList.length < 2 && index < 0) {
    currentSong = 0;
    mytrack.src = playList[currentSong];
    currentSongCover.src = songCover[currentSong];
    currentSongCover.setAttribute("currentMusic_id", element.getAttribute("music_id"));
  }

  currentSongName.text = musicNameList[currentSong];

  if(global_user_id > 0) {
    checkLike(global_user_id, currentSongCover.getAttribute("currentMusic_id"));
  }
}

var clearCategories = function () {
  var container = document.querySelectorAll("#template_categories");

  for (var i = 1; i < container.length; i++) {
    container[i].parentNode.removeChild(container[i]);
  }
}
