<?php
	session_start();
	$currentUser = array();
	if(isset($_SESSION["email"]) && isset($_SESSION["password"])){
		$currentUser['userId'] = $_SESSION['userId'];
		$currentUser['username'] = $_SESSION['username'];
	} else {
		$currentUser['userId'] = 0;
		$currentUser['username'] = 'Guest';
	}

  echo json_encode($currentUser);
?>
