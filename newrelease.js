readNewrelease();

function readNewrelease() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(evt) {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = JSON.parse(xhr.response);
      createNewreleaseList(result);
    }
  }
  xhr.open("GET","query/newrelease.php");
  xhr.onerror = function() {alert("error!");};
  xhr.send();
}

function createNewreleaseList(newreleaseList) {
  var newreleaseContainer = document.getElementsByClassName("layoutgrid");
  var newreleaseListLength = newreleaseList.length;
  for(var i = 0; i < newreleaseListLength; i++) {
    var container = document.getElementById("template_newrelease").cloneNode(true);
    container.getElementsByClassName("reclist")[0].alt = "uploads/Music/" + newreleaseList[i]["music_local"];
    container.getElementsByClassName("reclist")[0].src = "uploads/Album/" + newreleaseList[i]["picture_albums"];
    container.getElementsByClassName("musicName")[0].innerHTML = newreleaseList[i]["music_name"];
    container.getElementsByClassName("reclist")[0].setAttribute("music_id", newreleaseList[i]["music_id"]);
    container.getElementsByClassName("reclist")[0].setAttribute("music_name", newreleaseList[i]["music_name"]);
    container.style.display = "block";
    container.getElementsByClassName("reclist")[0].addEventListener('click', addEventForNewrelease);
    container.getElementsByClassName("btnADlayout")[0].childNodes[1].addEventListener('click', addEventForNewrelease);

    //add to playlist
    container.getElementsByClassName("btnADlayout")[0].childNodes[3].addEventListener('click', function() {
      addToPlayList(this.parentNode.parentNode.getElementsByClassName("reclist")[0]);

      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });

    newreleaseContainer[0].appendChild(container);
  }
}

function addEventForNewrelease() {
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
