<?php
$servername = "localhost";
$username = "nuttakron";
$password = "admin";
$dbname = "beat_up";

$user_id = filter_input(INPUT_GET, "user_id", FILTER_SANITIZE_STRING);
$song_id = filter_input(INPUT_GET, "song_id", FILTER_SANITIZE_STRING);
$connection = mysqli_connect($servername, $username, $password, $dbname);
//check if exists
$query_statment = "SELECT * FROM `like` WHERE user_id = '$user_id' AND music_id = '$song_id';";
$query_result = mysqli_query($connection, $query_statment);
$query_like_result = [];

while($result = mysqli_fetch_assoc($query_result)){
  $query_like_result = $result;
}

if(count($query_like_result) <= 0) {
  echo json_encode(true);
} else {
  echo json_encode(false);
}
?>
