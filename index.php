<?php
	session_start();
	$userId = "";
	$username = "";

	if(isset($_SESSION["email"]) && isset($_SESSION["password"])){
		$userId = $_SESSION['userId'];
		$username = $_SESSION['username'];
	}
	else {
		$_SESSION['login'] = 'block';
		$_SESSION['logout'] = 'none';
	}
?>

<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Fira+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
        <link rel="stylesheet" href="app.css" />
        <link rel="stylesheet" href="playlist.css" />
        <title>Beat up</title>
        <link rel="shortcut icon" href="img/sound-bars-pulse2.png" >
    </head>
    <body>
        <nav class="nav">
            <div class="nav-right" id="homebtn">
                <img class="icon" src="img/sound-bars-pulse.png"/>
                <div>Beat up</div>
            </div>

            <!-- <a href="" class="nav-left"></a>
            </a> -->
            <div class="search" >
                <img class="icon" src="img/search.png"/>
                <input type="text" placeholder="Search" />
            </div>
            <div class="nav-right">
                <button onclick="document.getElementById('id01').style.display='block'" class="flo" style = "display: <?php echo $_SESSION['login']?>">Log in</button>
								<p><?php echo $username ?></p>
								<button type="submit" class="flo" id="logoutBtn" style = "display: <?php echo $_SESSION['logout']?>">Logout</button>
                <a>|</a>
								<button type="submit" class="flo" id="uploadsBtn" style = "display: <?php echo $_SESSION['logout']?>">Uploads</button>
                <button onclick="document.getElementById('id02').style.display='block'" class="flo" style = "display: <?php echo $_SESSION['login']?>">Register</button>
            </div>
        </nav>

        <!-- login pup-up -->

        <div class="layout">
            <!-- <button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Login</button> -->
            <div id="id01" class="modal">
                <form class="modal-content animate" method="get" action="query/login.php">
                    <div class="imgcontainer">
                        <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                        <img src="img/sound-bars-pulse2.png"alt="lock" class="avatar">
                    </div>
                    <div class="container">
                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter email" name="email" required>
                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" required>
                        <!-- <button type="submit" class="loginbtn">Login</button> -->
                        <!-- <label>
                        <input type="checkbox" checked="checked" name="remember"> Remember me
                        </label> -->
                    </div>
                    <div class="container" style="background-color:#f1f1f1">
                        <!-- <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button> -->
                        <button type="submit" class="loginbtn">Login</button>
                        <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
                    </div>
                </form>
            </div>
            <div id="id02" class="modal">
                <form class="modal-content2 animate" action="index.php">
                    <div class="imgcontainer">
                        <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>
                    </div>
                    <div class="container">
                        <label><b>First name</b></label>
                        <input type="text" placeholder="Enter First name" name="uname" id="fireNameIput" required>
                        <label><b>Last name</b></label>
                        <input type="text" placeholder="Enter Last name" name="lname" id="lastNameIput" required>
                        <label><b>Email</b></label>
                        <input type="text" placeholder="Enter email" name="email" id="emailIput" required>
                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" id="pswIput" required>
                        <label><b>Date of birth</b></label>
                        <input type="date" placeholder="Enter Password" name="birthdate" id="birthdate" required>

                    </div>
                    <div class="container2" style="background-color:#f1f1f1">
                        <button type="submit" class="loginbtn">Submit</button>
                    </div>
                </form>
            </div>

        <!-- playlist -->
            <div id="mySidenav" class="sidenav">

                    <button type="button" id="trash"></button>
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                <h1>Playlist</h1>
                <div id="playlistgrid">
                </div>
           </div>


          <!-- <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span> -->
            <div class="menu">
                <button class="flo" id="home">Recommend</button>
                <p>|</p>
                <button class="flo" id="NewRelease">New Release</button>
                <p>|</p>
                <button class="flo" id="Moods">Categories</button>
                <p>|</p>
                <button class="flo" id="Charts">Charts</button>
            </div>
            <div id="layout2" class="layout2"></div>
        </div>

        <!-- player -->

        <div id="wrapper">
            <div class="player">
                <nav>
                    <div class="player2">
                        <div id="buttons">
                            <img class="album" id="cover" src="" />
                            <button type="button" id="prevbtn"></button>
                            <button type="button" id="playbtn"></button>
                            <button type="button" id="nextbtn"></button>
                            <button type="button" id="stopbtn"></button>
                            <button type="button" id="mutebtn"></button>
                            <div id="volumeBar">
                                <div id="progressvolumeBar"></div>
                            </div>
                            <span id="currentTime">0:00</span>/<span id="fullDuration">0:00</span>
                            <div class="song" id="song"></div>
                            <button type="button"id="unrating"></button>



                        </div>

                        <div class="kk">
                            <button type="button" id="playlistbtn" onclick="openNav()"></button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div id="defaulBar">
            <div id="progressBar"></div>
        </div>
        <script type="text/javascript" src="script.js"></script>
    </body>
</html>
