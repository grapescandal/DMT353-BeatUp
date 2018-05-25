<?php
  $servername = "localhost";
  $username = "nuttakron";
  $password = "admin";
  $dbname = "beat_up";

  $music_name = filter_input(INPUT_POST, "music_name", FILTER_SANITIZE_STRING);
  $music_artist = filter_input(INPUT_POST, "music_artist", FILTER_SANITIZE_STRING);
  $music_moods = filter_input(INPUT_POST, "music_moods", FILTER_SANITIZE_STRING);
  $music_genres = filter_input(INPUT_POST, "music_genres", FILTER_SANITIZE_STRING);
  $music_file = filter_input(INPUT_POST, "music_file", FILTER_SANITIZE_STRING);
  $albums_name = filter_input(INPUT_POST, "albums_name", FILTER_SANITIZE_STRING);
  $picture_albums = filter_input(INPUT_POST, "picture_albums", FILTER_SANITIZE_STRING);
  $user_id = filter_input(INPUT_POST, "user_id", FILTER_SANITIZE_STRING);

  $connection = mysqli_connect($servername, $username, $password, $dbname);

  $query_statment = "INSERT INTO music
  (music_name, music_artist, music_moods, music_genres, music_local, upload_date, user_id) VALUES
  ('$music_name', '$music_artist', $music_moods, $music_genres, '$music_file', CURDATE(), $user_id);";
  mysqli_query($connection, $query_statment);

  $query_statment = "SELECT music_id FROM music ORDER BY music_id DESC LIMIT 1;";
  $query_result = mysqli_query($connection, $query_statment);
  $music_id = [];
  if($query_result->num_rows > 0) {
    while($result = mysqli_fetch_assoc($query_result)){
        $music_id = $result["music_id"];
    }
  }

  $query_statment = "SELECT albums_id, albums_name FROM albums WHERE albums_name = '$albums_name'";
  $query_result = mysqli_query($connection, $query_statment);
  $albums_id = [];
  if($query_result->num_rows > 0) {
    while($result = mysqli_fetch_assoc($query_result)){
        $albums_id = $result["albums_id"];
    }
  } else {
    $query_statment = "INSERT INTO albums
    (albums_name, picture_albums, user_id) VALUES
    ('$albums_name', '$picture_albums',$user_id);";
    mysqli_query($connection, $query_statment);

    $query_statment = "SELECT albums_id FROM albums ORDER BY albums_id DESC LIMIT 1;";
    $query_result = mysqli_query($connection, $query_statment);

    if($query_result->num_rows > 0) {
      while($result = mysqli_fetch_assoc($query_result)){
          $albums_id = $result["albums_id"];
      }
    }
  }

  $query_statment = "INSERT INTO albums_detail
  (albums_id, music_id) VALUES
  ($albums_id, $music_id);";
  mysqli_query($connection, $query_statment);
?>
