<?php
  $servername = "localhost";
  $username = "nuttakron";
  $password = "admin";
  $dbname = "beat_up";

  $input = filter_input(INPUT_GET, "searchValue", FILTER_SANITIZE_STRING);

  $connection = mysqli_connect($servername, $username, $password, $dbname);
  $query_statment = "SELECT music_name, music_local, music_artist, picture_albums FROM music
  left join albums_detail
  on music.music_id = albums_detail.music_id
  left join albums
  on albums_detail.albums_id = albums.albums_id
  where music_name LIKE '%$input%' OR music_artist LIKE '%$input%' OR albums_name LIKE '%$input';";
  $query_result = mysqli_query($connection, $query_statment);
  $query_music_result = [];

  while($result = mysqli_fetch_assoc($query_result)){
    $query_music_result[] = $result;
  }

  echo json_encode($query_music_result);
?>
