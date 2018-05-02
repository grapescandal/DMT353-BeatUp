//playList
var mytrack = new Audio();
mytrack.autoplay = false;
mytrack.loop = false;
var currentSong = 0;
var playList = new Array();
var playListEnded;

var playbtn = document.getElementById('playbtn');
var mutebtn = document.getElementById('mutebtn');
var stopbtn = document.getElementById('stopbtn');
var nextbtn = document.getElementById('nextbtn');
var prevbtn = document.getElementById('prevbtn');
// var volumeupbtn = document.getElementById('volumeupbtn');
// var volumedownbtn = document.getElementById('volumedownbtn');
var stopbtn = document.getElementById('stopbtn');
var getWidth = document.getElementById("defaulBar").clientWidth;

var getVolWidth;

var duration = document.getElementById('fullDuration');
var currentTime = document.getElementById('currentTime');

var playerSongName = document.getElementById('song');
var songCover = new Array();
var currentSongCover;
var minutes;
var seconds;

var barsize = getWidth;
var barsizeVol;
var resize = false;

var bar = document.getElementById('defaulBar');
var barVol = document.getElementById('volumeBar');
var progressBar = document.getElementById('progressBar');
var progressVolBar = document.getElementById('progressvolumeBar');
var defaulBarKK = document.getElementById('defaulBar');

var player = document.getElementById('wrapper');
var reclistAll;

var isPlayerShow = false;

var btnAD = new Array();

var t;

window.onload = function() {

    currentSongCover = document.getElementById('cover');

    //player
    playbtn.addEventListener('click', playOrPause,false);
    mutebtn.addEventListener('click', muteOrUnmute,false);
    bar.addEventListener('click', clickedBar,false);
    barVol.addEventListener('click', clickedVolBar,false);
    stopbtn.addEventListener('click', stop, false);
    nextbtn.addEventListener('click', nextSong);
    prevbtn.addEventListener('click', prevSong);
    // volumeupbtn.addEventListener('click', volumeUp, false);
    // volumedownbtn.addEventListener('click', volumeDown, false);

    readLog();
    var a = document.getElementById("home");
    a.onclick = readLog;
    var b = document.getElementById("NewRelease");
    b.onclick = NewRelease;
    var c = document.getElementById("Moods");
    c.onclick = Moods;
    var d = document.getElementById("Charts");
    d.onclick = Charts;
    var home = document.getElementById("homebtn");
    home.onclick = readLog;

    /*if(!isPlayerShow) {
      showPlayer("none");
    } else {
      showPlayer("block");
      isPlayerShow = true;
    }*/

    mytrack.addEventListener('loadedmetadata', function() {
      checkDuration(mytrack.duration);
    });
}


window.onresize =  function() {
    //Bar
    var px = progressBar.style.width.search("px");
    var progressBarWidth = progressBar.style.width.slice(0, px);
    var oldWidth = getWidth;
    var oldPercentageBar = progressBarWidth / getWidth;
    getWidth = document.getElementById("defaulBar").clientWidth;
    barsize = getWidth;
    progressBar.style.width = getWidth * oldPercentageBar + 'px';

    //Volume bar
    var pxVol = progressVolBar.style.width.search("px");
    var progressVolBarWidth = progressVolBar.style.width.slice(0, pxVol);
    var oldVolWidth = getVolWidth;
    var oldPercentageVolBar = progressVolBarWidth / getVolWidth;
    getVolWidth = document.getElementById("volumeBar").clientWidth;
    barsizeVol = getVolWidth;
    progressVolBar.style.width = getVolWidth * oldPercentageVolBar + 'px';

    resize = true;
}

document.body.onkeydown = function(e) {
    if((e || window.event).keycode == 32) {
        playOrPause();
    }
}

function setVolume() {
  getVolWidth = document.getElementById("volumeBar").clientWidth;
  barsizeVol = getVolWidth;
  mytrack.volume = 0.5;
  progressVolBar.style.width = mytrack.volume * barsizeVol + 'px';
}

function checkDuration(songDuration) {
  var indexSongName = mytrack.src.search("Music");
  var songName = mytrack.src.substring(indexSongName + 6);
  playerSongName.innerHTML = songName.replace(/%20/g, " ");

  if(isNaN(songDuration)) {
    minutes = 0;
    seconds = pad(0);
  } else {
    minutes = parseInt(songDuration/60);
    seconds = pad(parseInt(songDuration%60));
  }
  duration.innerHTML = minutes + ':' + seconds;
}

function getSongName(songName) {
  var indexSongName = songName.search("Music");
  var songName = songName.substring(indexSongName + 6);
  return songName;
}

function showPlayer(string) {
  player.style.display = string;
  setVolume();
}

function changeCurrentSong(songIndex){
  mytrack.pause();
  currentSong = songIndex;
  mytrack.src = playList[currentSong];
  currentSongCover.src = songCover[currentSong];
  playOrPause();
}

function nextSong() {
  currentSong++;

  if(currentSong < playList.length) {
    mytrack.src = playList[currentSong];
    currentSongCover.src = songCover[currentSong];
    playOrPause();
  } else {
    currentSong = Math.abs(currentSong) % playList.length;
    mytrack.src = playList[currentSong];
    currentSongCover.src = songCover[currentSong];
    playOrPause();
  }
}

function prevSong() {
  if(currentSong == 0) {
    currentSong = playList.length - 1;
  } else {
    currentSong--;
  }

  if(currentSong < playList.length) {
    mytrack.src = playList[currentSong];
    currentSongCover.src = songCover[currentSong];
    playOrPause();
  }
}

function playOrPause() {
    if(!mytrack.paused && !mytrack.ended){
        mytrack.pause();
        playbtn.style.backgroundImage = 'url("img/player/play-button.png")';
        playbtn.id = "playbtn";
        window.clearInterval(updateTime);
    } else {
      mytrack.play();
      togglePlay();
    }
}

// function volumeUp() {
//     mytrack.volume += 0.1;

//     mytrack.onvolumechange = function() {

//     }
// }

// function volumeDown() {
//     mytrack.volume -= 0.1;
// }

function togglePlay() {
  playbtn.style.backgroundImage = 'url("img/player/pause.png")';
  playbtn.id = "pausebtn";
  defaulBarKK.style.backgroundColor = "rgba(158, 158, 158, 0.5)";
  updateTime = setInterval(update,500);
}

function stop() {
    if(!mytrack.ended) {
        mytrack.currentTime = 0;
        mytrack.pause();
        currentTime.innerHTML = "0.00";
        playbtn.style.backgroundImage = 'url("img/player/play-button.png")';
        playbtn.id = "playbtn";
        updateTime = setInterval(update,500);
        defaulBarKK.style.backgroundColor = "";
        window.clearInterval(updateTime);
    }
}
function muteOrUnmute() {
    if(mytrack.muted == true){
        mytrack.muted =false;
        mutebtn.style.backgroundImage = 'url("img/player/speaker.png")';
        mutebtn.id = "mutebtn";
    }
    else{
        mytrack.muted =true;
        mutebtn.style.backgroundImage = 'url("img/player/speaker (1).png")';
        mutebtn.id = "unmutebtn";
    }
}

function update() {
    if(!mytrack.ended){
        var playedMinutes = parseInt(mytrack.currentTime / 60);
        var playedSeconds= pad(parseInt(mytrack.currentTime % 60));
        currentTime.innerHTML = playedMinutes + ':' + playedSeconds;

        if(resize !== true) {
            var size = parseInt(mytrack.currentTime * barsize / mytrack.duration);
            progressBar.style.width = size + "px";
        } else {
          //Bar
           var px = progressBar.style.width.search("px");
           var progressBarWidth = progressBar.style.width.slice(0, px);
           var oldWidth = getWidth;
           var oldPercentageBar = progressBarWidth / getWidth;
           getWidth = document.getElementById("defaulBar").clientWidth;
           barsize = getWidth;
           progressBar.style.width = getWidth * oldPercentageBar + 'px';

           resize = false;
        }

    }
    else {
      if(playList.length > currentSong) {
        nextSong();
      } else {
        currentTime.innerHTML = "0.00";
        playbtn.style.backgroundImage = 'url("img/player/play-button.png")';
        defaulBarKK.style.backgroundColor = "";
        progressBar.style.width = "0px";
        window.clearInterval(updateTime);
      }
    }
}

function clickedBar(e) {
    if(!mytrack.ended){
        var mouseX = e.pageX - bar.offsetLeft;
        var newtime = mouseX*mytrack.duration/barsize;
        mytrack.currentTime = newtime;
        progressBar.style.width = mouseX + 'px';
    }
}

function clickedVolBar(k) {
    var mouseX = k.pageX - barVol.offsetLeft;
    var newVol = (mouseX / barsizeVol);
    progressVolBar.style.width = mouseX + 'px';
    mytrack.volume = newVol;
}

function pad(d) {
    return (d < 10) ? '0'+ d.toString() : d.toString();
}

// player
// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

// playlist
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

var myIndex = 0;
// carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var length = x.length;
    for (var i = 0; i < length; i++) {
       x[i].style.display = "none";
       btnAD[i].className = "btnAD";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    btnAD[myIndex-1].className = "btnADCurrent";
    t = setTimeout(carousel, 2000); // Change image every 2 seconds
}

function setAD() {
  clearTimeout(t);
  for(var i = 0; i < 3; i++) {
    btnAD[i] = document.getElementById("btnAD" + (i + 1));
  }

  btnAD[0].addEventListener('click', function() {
    myIndex = 0;
    changeADWithBtn(0);
  }, false);
  btnAD[1].addEventListener('click', function() {
    myIndex = 1;
    changeADWithBtn(1);
  }, false);
  btnAD[2].addEventListener('click', function() {
    myIndex = 2;
    changeADWithBtn(2);
  }, false);
  carousel();
}


function addToPlayList(element) {
  var index = playList.indexOf(element.alt);
  if(index < 0) {
    playList.push(element.alt);
    songCover.push(element.src);

    addToPlaylistNav(playList);
  }
}

function addToPlaylistNav(playList) {
  openNav();
  var playlistParent = document.getElementById("mySidenav");
  for (var i = 0; i < playList.length; i++) {
    var playlistChild = document.createElement("a");
    playlistChild.id = i;
    playlistChild.className = "playListBlock";
    playlistChild.text = getSongName(playList[i]);
    playlistChild.addEventListener('click', function() {
      changeCurrentSong(playlistChild.id);
    });
  }
  playlistParent.appendChild(playlistChild);
}

function addEventForSongBlock() {
  //Add Event for song img
  reclistAll = document.querySelectorAll(".detail");
  var reclistLength = reclistAll.length;

  for(var i = 0; i < reclistLength; i++) {

    reclistAll[i].childNodes[1].addEventListener('click', function() {
      mytrack.src = this.alt;
      currentSongCover.src = this.src;
      playOrPause();

      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });

    reclistAll[i].childNodes[3].childNodes[3].addEventListener('click', function() {
      addToPlayList(this.parentNode.parentNode.childNodes[1]);
      currentSong = 0;
      mytrack.src = playList[currentSong];
      currentSongCover.src = songCover[currentSong];
      playOrPause();
      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });
  }
}

function changeADWithBtn(i) {
  clearTimeout(t);
  var x = document.getElementsByClassName("mySlides");
  var adLength = x.length;
  for (j = 0; j < adLength; j++) {
     x[j].style.display = "none";
  }
  x[i].style.display = "block";
  carousel();
}

function readLog(){
	var xhr = new XMLHttpRequest();
  xhr.open("GET","home.php");
  xhr.onload = function(){
      post(xhr.responseText);
      setAD();
      addEventForSongBlock();
  };
  xhr.onerror = function() {alert("error!");};
  xhr.send();
}

function NewRelease(){
	var xhr = new XMLHttpRequest();
    xhr.open("GET","NewRelease.php");
    xhr.onload = function(){
        postMsg(xhr.responseText);
        addEventForSongBlock();
    };
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}
function Moods(){
	var xhr = new XMLHttpRequest();
    xhr.open("GET","Moods.php");
    xhr.onload = function(){
        postMsg(xhr.responseText);
        addEventForSongBlock();
    };
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}
function Charts(){
	var xhr = new XMLHttpRequest();
    xhr.open("GET","Charts.php");
    xhr.onload = function(){
        postMsg(xhr.responseText);
        addEventForSongBlock();
    };
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}
function post(msg){
    var x = document.getElementById("layout2");
    x.innerHTML = msg;
}
function postMsg(msg){
    var x = document.getElementById("layout2");
    x.innerHTML = msg;
}
