<?php
  $servername = "localhost";
  $username = "nuttakron";
  $password = "admin";
  $dbname = "beat_up";

  $music_genres = filter_input(INPUT_GET, "music_genres", FILTER_SANITIZE_NUMBER_INT);
  $music_moods = filter_input(INPUT_GET, "music_moods", FILTER_SANITIZE_NUMBER_INT);

  $connection = mysqli_connect($servername, $username, $password, $dbname);
  $query_statment = "SELECT music.music_id,music_name,music_local,music_artist,picture_albums FROM music
  left join albums_detail
  on music.music_id = albums_detail.music_id
  left join albums
  on albums_detail.albums_id = albums.albums_id WHERE music_genres = $music_genres OR music_moods = $music_moods;";
  $query_result = mysqli_query($connection, $query_statment);
  $query_music_result = [];

  while($result = mysqli_fetch_assoc($query_result)){
    $query_music_result[] = $result;
  }

  echo json_encode($query_music_result);
?>
