readChart();

function readChart() {
  clearCharts();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(evt) {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = JSON.parse(xhr.response);
      createChartList(result);
    }
  }
  xhr.open("GET","query/FetchCharts.php");
  xhr.onerror = function() {alert("error!");};
  xhr.send();
}

function createChartList(chartsList) {
  var chartsContainer = document.getElementsByTagName("tbody");
  var chartsLength = chartsList.length;
  for(var i = 0; i < chartsLength; i++) {
    var container = document.getElementById("template_charts").cloneNode(true);
    container.getElementsByClassName("reclisttable")[0].alt = "uploads/Music/" + chartsList[i]["music_local"];
    container.getElementsByClassName("reclisttable")[0].src = "uploads/Album/" + chartsList[i]["picture_albums"];
    container.getElementsByClassName("chartsMusicName")[0].innerHTML = chartsList[i]["music_name"];
    container.getElementsByClassName("viewCount")[0].innerHTML = chartsList[i]["viewCount"];
    container.getElementsByClassName("likeCount")[0].innerHTML = chartsList[i]["likeCount"];
    container.getElementsByClassName("artist")[0].innerHTML = chartsList[i]["music_artist"];
    container.getElementsByClassName("reclisttable")[0].setAttribute("music_id", chartsList[i]["music_id"]);
    container.getElementsByClassName("reclisttable")[0].setAttribute("music_name", chartsList[i]["music_name"]);
    container.style.display = "table-row";
    container.getElementsByClassName("musicInfo")[0].addEventListener('click', addEventForChart);
    container.getElementsByClassName("chartsMusicName")[0].addEventListener('click', addEventForChart);

    //add to playlist
    container.childNodes[9].addEventListener('click', function() {
      addToPlayList(this.parentNode.getElementsByClassName("reclisttable")[0]);

      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });

    chartsContainer[1].appendChild(container);
  }
}

function addEventForChart() {
  playList = clearPlayList();
  songCover = clearSongCover();
  musicNameList = clearMusicName();
  clearPlayListNav();
  addToPlayList(this.parentNode.getElementsByClassName("reclisttable")[0]);
  currentSong = 0;
  mytrack.src = playList[currentSong];
  currentSongCover.src = songCover[currentSong];
  playOrPause();

  if(!isPlayerShow) {
    showPlayer("block");
    isPlayerShow = true;
  }
}

function addToPlayList(element) {
  increseView(global_user_id, element.getAttribute("music_id"), readChart);
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

function clearCharts() {
  var container = document.querySelectorAll("#template_charts");

  for (var i = 1; i < container.length; i++) {
    container[i].parentNode.removeChild(container[i]);
  }
}
