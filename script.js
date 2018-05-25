//playList
var mytrack = new Audio();
mytrack.autoplay = false;
mytrack.loop = false;
var currentSong = 0;
var playList = [];
var songCover = [];
var musicIdList = [];
var musicNameList = [];
var playListEnded;

//All button
var playbtn = document.getElementById('playbtn');
var mutebtn = document.getElementById('mutebtn');
var stopbtn = document.getElementById('stopbtn');
var nextbtn = document.getElementById('nextbtn');
var prevbtn = document.getElementById('prevbtn');
var stopbtn = document.getElementById('stopbtn');
var unrating = document.getElementById('unrating');

//Player
var player = document.getElementById('wrapper');
var playerSongName = document.getElementById('song');
var duration = document.getElementById('fullDuration');
var currentTime = document.getElementById('currentTime');
var currentSongCover;
var currentSongName;
var minutes;
var seconds;
var isPlayerShow = false;

//Bar
var getWidth = document.getElementById("defaulBar").clientWidth;
var getVolWidth;
var barsize = getWidth;
var barsizeVol;
var resize = false;
var bar = document.getElementById('defaulBar');
var barVol = document.getElementById('volumeBar');
var progressBar = document.getElementById('progressBar');
var progressVolBar = document.getElementById('progressvolumeBar');
var defaulBarKK = document.getElementById('defaulBar');

//All Musicbox
var reclistAll;

//Advertise
var btnAD = [];
var myIndex = 0;

// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');

//timer
var t;
var updateTime;

//profile
var logoutBtn = document.getElementById("logoutBtn");
var global_user_id = 0;
var global_likeStatus = false;

var musicPath = "";
var picPath = "";

var checkLogin = function(){
    //when retrieve user information call function onUserReceived
    var onUserReceived = function(userInformation) {
        var username = userInformation.username;
        window.global_user_id = userInformation.userId;
    }

    //retrieve user information
    getResponse("checklogin.php", onUserReceived)
};

var checkLike = function(user_id, song_id) {
  //when retrieve user information call function onUserReceived
  var onUserReceived = function(likeStatus){
      window.global_likeStatus = likeStatus;
      unrating.className = showRating(window.global_likeStatus);
  }

  //retrieve user information
  getResponse("checklike.php?user_id="+user_id+"&song_id="+song_id, onUserReceived);
};

var toggleLike = function(user_id, song_id) {
  //when retrieve user information call function onUserReceived
  var onUserReceived = function(likeStatus){
      window.global_likeStatus = likeStatus;
      if(likeStatus) {
        like(global_user_id, currentSongCover.getAttribute("currentMusic_id"), ToggleRatingBtn);
        if(window.location.hash.indexOf("Charts") > -1) {
          readChart();
        }
      } else {
        unlike(global_user_id, currentSongCover.getAttribute("currentMusic_id"), ToggleRatingBtn);
        if(window.location.hash.indexOf("Charts") > -1) {
          readChart();
        }
      }
  };

  //retrieve user information
  getResponse("checklike.php?user_id="+user_id+"&song_id="+song_id, onUserReceived);
}

//window
window.onload = function() {
    checkLogin();
    currentSongCover = document.getElementById('cover');
    currentSongName = document.getElementById('song');

    var uploadMusicBtn = document.getElementById("uploadmusic");
    uploadMusicBtn.addEventListener("click", fileUpload);

    var uploadpicBtn = document.getElementById("displayPic");
    uploadpicBtn.addEventListener("click", picUpload);

    var submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", writePath);

    logoutBtn.addEventListener('click', function() {
      window.location.href = "query/logout.php";
    });

    unrating.addEventListener('click', function() {
      if(global_user_id > 0) {
        toggleLike(global_user_id, currentSongCover.getAttribute("currentMusic_id"));
      } else {
        alert("Please login first.");
      }
    });

    var clearPlayListBtn = document.getElementById("trash");
    clearPlayListBtn.addEventListener('click', function() {
      clearPlayList();
      clearSongCover();
      clearMusicName();
      clearPlayListNav();
    });

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
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

//upload
function fileUpload() {
  var filefield = document.getElementById("fileToUpload");
  filefield.click();
  filefield.onchange = fileSubmit;
}

function picUpload() {
  var filefield = document.getElementById("picToUpload");
  filefield.click();
  filefield.onchange = fileSubmit2;
}


function fileSubmit() {
  getMusicfilePath();
}

function fileSubmit2() {
  getPicfilePath();
  var picture = document.getElementById("pictureUpload");
  picture.src = "img/check.png";
}

function getMusicfilePath() {
	 musicPath = document.getElementById("fileToUpload").files[0].name;
}

function getPicfilePath() {
	 picPath = document.getElementById("picToUpload").files[0].name;
}

function writePath(){
  var musicName =  document.forms["uploadForm"]["musicName"].value;
  var musicArtist = document.forms["uploadForm"]["musicArtist"].value;
  var musicMoods = document.forms["uploadForm"]["moodsSelect"].value;
  var musicGenres = document.forms["uploadForm"]["genresSelect"].value;
  var musicAlbumName = document.forms["uploadForm"]["musicAlbumName"].value;

  if(musicName !== "" && musicArtist !== "" && musicMoods !== "" && musicGenres !== "" && musicAlbumName !== "" && musicPath != false && picPath != false) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(evt){
      if( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ){
        document.getElementById("uploadForm").submit();
      }
    }

    xhr.open("POST", "query/writePath.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var parameter = "music_name=" + musicName + "&music_artist=" + musicArtist +  "&music_file=" + musicPath + "&music_moods=" + musicMoods +
    "&music_genres=" + musicGenres + "&albums_name=" + musicAlbumName + "&picture_albums=" + picPath +"&user_id=" + global_user_id ;
    xhr.send(parameter);
  }
}

//Button
function playOrPause() {
    if(!mytrack.paused && !mytrack.ended){
      pause();
    } else {
      play();
    }
}

function play() {
  mytrack.play();
  playbtn.style.backgroundImage = 'url("img/player/pause.png")';
  playbtn.id = "pausebtn";
  defaulBarKK.style.backgroundColor = "rgba(158, 158, 158, 0.5)";
  updateTime = setInterval(update, 500);
}

function pause() {
  mytrack.pause();
  playbtn.style.backgroundImage = 'url("img/player/play-button.png")';
  playbtn.id = "playbtn";

  if(updateTime !== null) {
    window.clearInterval(updateTime);
  }
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
    if(mytrack.muted === true){
        mytrack.muted =false;
        mutebtn.style.backgroundImage = 'url("img/player/speaker.png")';
        mutebtn.id = "mutebtn";
    }
    else {
        mytrack.muted = true;
        mutebtn.style.backgroundImage = 'url("img/player/speaker (1).png")';
        mutebtn.id = "unmutebtn";
    }
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

  currentSongCover.setAttribute("currentMusic_id", musicIdList[currentSong]);
  currentSongName.text = musicNameList[currentSong];
  if(global_user_id > 0) {
    checkLike(global_user_id, currentSongCover.getAttribute("currentMusic_id"));
  }
}

function prevSong() {
  if(currentSong === 0) {
    currentSong = playList.length - 1;
  } else {
    currentSong--;
  }


  if(currentSong < playList.length) {
    mytrack.src = playList[currentSong];
    currentSongCover.src = songCover[currentSong];
    playOrPause();
  }

  currentSongCover.setAttribute("currentMusic_id", musicIdList[currentSong]);
  currentSongName.text = musicNameList[currentSong];
  if(global_user_id > 0) {
    checkLike(global_user_id, currentSongCover.getAttribute("currentMusic_id"));
  }
}

//Bar
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

function checkDuration(songDuration) {
  var songName = musicNameList[currentSong];
  playerSongName.innerHTML = songName;

  if(isNaN(songDuration)) {
    minutes = 0;
    seconds = pad(0);
  } else {
    minutes = parseInt(songDuration/60);
    seconds = pad(parseInt(songDuration%60));
  }
  duration.innerHTML = minutes + ':' + seconds;
}

function pad(d) {
    return (d < 10) ? '0'+ d.toString() : d.toString();
  }

function setVolume() {
  getVolWidth = document.getElementById("volumeBar").clientWidth;
  barsizeVol = getVolWidth;
  mytrack.volume = 0.5;
  progressVolBar.style.width = mytrack.volume * barsizeVol + 'px';
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

// playlist Nav
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

//Play and PlayList
function addEventForSongBlock() {
  //Add Event for song img
  reclistAll = document.querySelectorAll(".detail");
  var reclistLength = reclistAll.length;

  for(var i = 0; i < reclistLength; i++) {

    reclistAll[i].childNodes[1].addEventListener('click', function() {
      playList = clearPlayList();
      songCover = clearSongCover();
      musicNameList = clearMusicName();
      clearPlayListNav();
      addToPlayList(this);
      currentSong = 0;
      mytrack.src = playList[currentSong];
      currentSongCover.setAttribute("currentMusic_id", this.getAttribute("music_id"));
      currentSongCover.src = songCover[currentSong];
      currentSongName.text = musicNameList[currentSong];
      playOrPause();

      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });

    reclistAll[i].getElementsByClassName("musicName")[0].addEventListener('click', function() {
      playList = clearPlayList();
      songCover = clearSongCover();
      musicNameList = clearMusicName();
      clearPlayListNav();
      addToPlayList(this.parentNode.parentNode.parentNode.getElementsByClassName("reclist")[0]);
      currentSong = 0;
      mytrack.src = playList[currentSong];
      currentSongCover.setAttribute("currentMusic_id", this.getAttribute("music_id"));
      currentSongCover.src = songCover[currentSong];
      currentSongName.text = musicNameList[currentSong];
      playOrPause();

      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });

    //add to playlist
    reclistAll[i].childNodes[3].childNodes[3].addEventListener('click', function() {
      addToPlayList(this.parentNode.parentNode.childNodes[1]);

      if(!isPlayerShow) {
        showPlayer("block");
        isPlayerShow = true;
      }
    });
  }
}

function showPlayer(string) {
  player.style.display = string;
  setVolume();
}

function changeCurrentSong(songIndex){
  mytrack.pause();
  currentSong = Number(songIndex);

  mytrack.src = playList[currentSong];
  currentSongCover.src = songCover[currentSong];
  currentSongCover.setAttribute("currentMusic_id", musicIdList[currentSong]);
  increseView(global_user_id, currentSongCover.getAttribute("currentMusic_id"), readChart);
  currentSongName.text = musicNameList[currentSong];
  if(global_user_id > 0) {
    checkLike(global_user_id, currentSongCover.getAttribute("currentMusic_id"));
  }
  playOrPause();
}

function addToPlayList(element) {
  increseView(global_user_id, element.getAttribute("music_id"), readChart);
  var index = playList.indexOf(element.alt);
  if(index < 0) {
    playList.push(element.alt);
    songCover.push(element.src);
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

function addToPlaylistNav(playList) {
  var playlistParent = document.getElementById("playlistgrid");
  for (var i = 0; i < playList.length; i++) {
    var playlistChildBlock = document.createElement("div");
    var playlistChild = document.createElement("a");
    playlistChildBlock.id = "block" + i;
    playlistChild.id = i;
    playlistChildBlock.className = "playlistBlock";
    playlistChild.className = "playlistChild";
    playlistChild.text = musicNameList[i];
    playlistChildBlock.addEventListener('click', function() {
    changeCurrentSong(playlistChild.id);
  }, true);
    playlistChildBlock.appendChild(playlistChild);
    playlistChildBlock.addEventListener('mouseenter', function() {
      playlistChild.className = "playlistChildHover";
    });
    playlistChildBlock.addEventListener('mouseleave', function() {
      playlistChild.className = "playlistChild";
    });
  }
  playlistParent.appendChild(playlistChildBlock);
}

function clearPlayList() {
  return playList = [];
}

function clearSongCover() {
  return songCover = [];
}

function clearMusicName() {
  return musicName = [];
}

function clearPlayListNav() {
  var playlistParent = document.getElementById("playlistgrid");
  while(playlistParent.firstChild) {
    playlistParent.removeChild(playlistParent.firstChild);
  }
}

//Advertise
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

function showRating(likeStatus) {
  if(likeStatus) {
    return "unrating";
  } else {
    return "rating";
  }
}

var getResponse = function(method, callback){
    var url = "query/"+method;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(evt){
        if( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ){
            var result = JSON.parse(xhr.response);
            callback(result);
        }
    }
    xhr.open("GET", url)
    xhr.send();
};

function ToggleRatingBtn() {
  if(unrating.className == "unrating") {
    unrating.className = "rating";
  } else {
     unrating.className = "unrating";
  }
}

//unlike
function unlike(user_id, song_id, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(evt){
      if( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ){
          callback();
      }
  }
  xhr.open("POST", "query/unlike.php")
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var parameter = "user_id="+user_id+"&song_id="+song_id;
  xhr.send(parameter);
}

//like
function like(user_id, song_id, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(evt){
      if( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ){
          callback();
      }
  }
  xhr.open("POST", "query/like.php")
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var parameter = "user_id="+user_id+"&song_id="+song_id;
  xhr.send(parameter);
}

//view
var increseView = function (user_id, song_id, callback) {
  if(user_id > 0) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(evt){
        if( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ){
            if(window.location.hash.indexOf("Charts") > -1) {
              callback();
            }
        }
    }
    xhr.open("POST", "query/view.php")
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var parameter = "user_id="+user_id+"&song_id="+song_id;
    xhr.send(parameter);
  }
}

//Ajax
function readLog(){
	var xhr = new XMLHttpRequest();
  xhr.open("GET","home.php");
  xhr.onload = function(){
      clearScript();
      post(xhr.responseText);
      window.location.hash = 'home';
      setAD();
      addEventForSongBlock();
  };
  xhr.onerror = function() {alert("error!");};
  xhr.send();
}

function NewRelease(){
	var xhr = new XMLHttpRequest();
    xhr.open("GET","NewRelease.php");
    xhr.onload = function() {
        clearScript();
        postMsg(xhr.responseText);
        window.location.hash = 'NewRelease';
        CreateNewReleaseScript();
    };
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}

function CreateNewReleaseScript() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(evt) {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var chartsScript = document.createElement("script");
        chartsScript.src = "newrelease.js";
        document.body.appendChild(chartsScript);
      }
    }
    xhr.open("GET","charts.js");
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}

function Moods(){
	var xhr = new XMLHttpRequest();
    xhr.open("GET","Moods.php");
    xhr.onload = function(){
      clearScript();
      postMsg(xhr.responseText);
      window.location.hash = 'Categories';
      createCategoriesScript();

    };
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}

function createCategoriesScript() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(evt) {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var moodsScript = document.createElement("script");
        moodsScript.src = "moods.js";
        document.body.appendChild(moodsScript);
      }
    }
    xhr.open("GET","moods.js");
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}

function Charts(){
	 var xhr = new XMLHttpRequest();
    xhr.open("GET","Charts.php");
    xhr.onload = function(){
      clearScript();
      window.location.hash = 'Charts';
      postMsg(xhr.responseText);
      CreateChartsScript();
    };
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}

function CreateChartsScript() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(evt) {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var chartsScript = document.createElement("script");
        chartsScript.src = "charts.js";
        document.body.appendChild(chartsScript);
      }
    }
    xhr.open("GET","charts.js");
    xhr.onerror = function() {alert("error!");};
    xhr.send();
}

function clearScript() {
  var script = document.querySelectorAll("script");
  var scriptLength = script.length;
  for(var i = 1; i < scriptLength; i++) {
    script[i].parentNode.removeChild(script[i]);
  }
}

function post(msg){
    var x = document.getElementById("layout2");
    x.innerHTML = msg;
}
function postMsg(msg){
    var x = document.getElementById("layout2");
    x.innerHTML = msg;
}
