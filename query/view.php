<?php
  $servername = "localhost";
  $username = "nuttakron";
  $password = "admin";
  $dbname = "beat_up";

  $user_id = filter_input(INPUT_POST, "user_id", FILTER_SANITIZE_STRING);
  $music_id = filter_input(INPUT_POST, "song_id", FILTER_SANITIZE_STRING);

  $connection = mysqli_connect($servername, $username, $password, $dbname);

  $query_statment =
      "INSERT INTO view
      (user_id, music_id) VALUES
      ($user_id, $music_id);";

  mysqli_query($connection, $query_statment);
?>
