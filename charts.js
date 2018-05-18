createChartList();

function createChartList() {
  var container = document.getElementById("template_charts").cloneNode(true);
  container.getElementsByClassName("reclisttable")[0].alt = "Music/GALAXY - D GERRARD ft. Kob The X Factor.mp3";
  container.getElementsByClassName("reclisttable")[0].src = "img/recom/D-Gerrard.jpg";
  container.getElementsByClassName("musicName")[0].innerHTML = "GALAXY - D GERRARD ft. Kob The X Factor.mp3";
  container.style.display = "table-row";
  container.getElementsByClassName("musicInfo")[0].addEventListener('click', addEventForChart);
  container.getElementsByClassName("musicName")[0].addEventListener('click', addEventForChart);

  //add to playlist
  container.childNodes[7].addEventListener('click', function() {
    addToPlayList(this.parentNode.getElementsByClassName("reclisttable")[0]);

    if(!isPlayerShow) {
      showPlayer("block");
      isPlayerShow = true;
    }
  });

  var chartsContainer = document.getElementsByTagName("tbody");
  chartsContainer[0].appendChild(container);
}

function addEventForChart() {
  playList = clearPlayList();
  songCover = clearSongCover();
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
  var index = playList.indexOf(element.alt);
  if(index < 0) {
    playList.push(element.alt);
    songCover.push(element.src);

    addToPlaylistNav(playList);
  }

  if(playList.length < 2 && index < 0) {
    currentSong = 0;
    mytrack.src = playList[currentSong];
    currentSongCover.src = songCover[currentSong];
  }
}
