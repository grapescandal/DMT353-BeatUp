<?php
  $servername = "localhost";
  $username = "nuttakron";
  $password = "admin";
  $dbname = "beat_up";

  $user_id = filter_input(INPUT_POST, "user_id", FILTER_SANITIZE_STRING);
  $song_id = filter_input(INPUT_POST, "song_id", FILTER_SANITIZE_STRING);

  $connection = mysqli_connect($servername, $username, $password, $dbname);
  $query_statment = "SELECT music_id FROM music WHERE music_id = '$song_id';";
  $query_result = mysqli_query($connection, $query_statment);
  $query_music_result = [];

  while($result = mysqli_fetch_assoc($query_result)){
    $query_music_result = $result;
  }

  $music_id = $query_music_result['music_id'];

  $query_statment =
      "INSERT INTO `like`
      (user_id, music_id) VALUES
      ('$user_id','$music_id');";

  mysqli_query($connection, $query_statment);
?>
