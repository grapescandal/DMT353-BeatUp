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
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

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
                <input type="text" id="searchBox" placeholder="Search" />
            </div>

         <div id="modalsearch" class="modalsearch">
                <div class="modal-content4  animate">

                    <table class"fontblack" id="searchTable">
                            <tr>
                                    <th id"fontblack">#</th>
                                    <th class"fontblack">ALBUM</th>
                                    <th class"fontblack">TITLE</th>
                                    <th class"fontblack">ARTIST</th>
                                    <th class"fontblack"> ADD PLAYLIST </th>

                            </tr>
                            <tr class="searchFont" id="template_search" style = "display:none;">
                                            <td class="counterCell"></td>
                                            <td class="musicInfo"><img class="reclisttable" src="uploads/Album/wan-01.png" alt="uploads/Music/ระหว่างที่เธอจะจากไป -  Wan Soloist feat.Moving and Cut.mp3" music_id="9"/></td>
                                            <td class="chartsMusicName"><p>ระหว่างที่เธอจะจากไป</p></td>
                                            <td class="artist"><p>ว่าน ธนกฤต feat.Moving and Cut</p></td>
                                            <td class="addToPlayListBtn"> <button type="button" id="addToPlayListbtnsseacrh"></button> </td>
                            </tr>
                    </table>








                </div>
             </div>


            <div class="nav-right">
								<p class="userlogin"><?php echo $username ?></p>
                <button onclick="document.getElementById('id01').style.display='block'" class="flo" style = "display: <?php echo $_SESSION['login']?>">Log in</button>
								<button type="submit" class="flo" id="logoutBtn" style = "display: <?php echo $_SESSION['logout']?>">Logout</button>
                <a>|</a>
								<button onclick="document.getElementById('id03').style.display='block'" type="submit" class="flo" id="uploadsBtn" style = "display: <?php echo $_SESSION['logout']?>">Uploads</button>
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
                <form class="modal-content2 animate" action="query/register.php">
                    <div class="imgcontainer">
                        <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>
                    </div>
                    <div class="container3">
                        <label><b>First name</b></label>
                        <input type="text" placeholder="Enter First name" name="uname" id="fireNameIput" required>
                        <label><b>Last name</b></label>
                        <input type="text" placeholder="Enter Last name" name="lname" id="lastNameIput" required>
                        <label><b>Email</b></label>
                        <input type="text" placeholder="Enter email" name="email" id="emailIput" required>
                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" id="pswIput" required>
												<label><b>Retype Password</b></label>
                        <input type="password" placeholder="Enter Password again" name="repassword" id="repswIput" required>
                    </div>
                    <div class="container2" style="background-color:#f1f1f1">
                        <button type="submit" class="loginbtn">Submit</button>
                    </div>
                </form>
            </div>



              <div id="id03" class="modal">
                    <div class="modal-content3">
                            <form id="uploadForm" class="uploadbox animate" action="query/upload.php" method="post" enctype="multipart/form-data"/ name="uploadForm">
                                <div class="imgcontainer">
                                        <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">&times;</span>
                                    </div>
                                <div class="upload">
                                        <p>Upload</p>
                                </div>
                                <div class="containerup1">
                                                <div class="containerupload ">
																																<input type="file" name="picToUpload" id="picToUpload" placeholder="" style = "display:none">
																																<p>Upload Picture</p>
                                                                <div id="displayPic">
																																		<div class="layoutCenter">
																																			<img class="addPicture" id="pictureUpload" src="img/plusblack.png">
																																		</div>
																																</div>
																																<input type="file" name="fileToUpload" id="fileToUpload" placeholder="" style = "display:none">
                                                                <button type="button" id="uploadmusic" class="uploadbtnpic">UploadMusic</button>
                                                  </div>
                                        <div class="containerup">
                                                <label><b>TITLE</b></label>
                                                <input type="text" placeholder="Enter Title" name="musicName" id="NamesongIput" required>
                                                <label><b>Artist</b></label>
                                         				<input type="text" placeholder="Enter Artist" name="musicArtist" id="AtiIput" required>
																								<label><b>Album Name</b></label>
                                         				<input type="text" placeholder="Enter Album Name" name="musicAlbumName" id="albumNameIput" required>
                                                <label><b>Moods</b></label>
                                         <div class="custom-select">
                                                <select name="moodsSelect" required>
                                                        <option value="">Select Moods:</option>
                                                        <option value="1">Sadly</option>
                                                        <option value="2">Alone</option>
                                                        <option value="3">Happy</option>
                                                        <option value="4">Relax</option>
                                                </select>
                                         </div>

                                         <label><b>Genres</b></label>
                                         <div class="custom-select">
                                                 <select name="genresSelect" required>
                                                   <option value="">Select Genres:</option>
                                                   <option value="1">Pop</option>
                                                   <option value="2">Rock</option>
                                                   <option value="3">R&B</option>
																									 <option value="4">Indy</option>
                                                 </select>
                                               </div>
                                        </div>
                                </div>
                                    <div class="imgcontainersunmit">
                                            <button type="button" class="uploadbtn" id="submitBtn">Submit</button>
                                    </div>
                    </form>
                </div>
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

        <div id="wrapper" class="animate">
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
                            <button type="button"id="unrating" class="unrating"></button>

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
