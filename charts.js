readChart();

function readChart() {
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
    container.getElementsByClassName("reclisttable")[0].alt = "Music/GALAXY - D GERRARD ft. Kob The X Factor.mp3";
    container.getElementsByClassName("reclisttable")[0].src = "img/recom/D-Gerrard.jpg";
    container.getElementsByClassName("musicName")[0].innerHTML = chartsList[i]["music_name"];
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

    chartsContainer[0].appendChild(container);
  }
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
