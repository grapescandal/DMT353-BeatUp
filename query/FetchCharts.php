<?php
    $servername = "localhost";
    $username = "nuttakron";
    $password = "admin";
    $dbname = "beat_up";
    $connection = new mysqli($servername, $username, $password, $dbname);

    $query_statment =
    "SELECT music_name,music_local, music_artist,upload_date,picture_albums FROM music
    left join albums_detail
    on music.music_id = albums_detail.music_id
    left join albums
    on music.music_id = albums.albums_id order by upload_date DESC;";

    $query_result = mysqli_query($connection, $query_statment);
    $newreleaseinfo = [];
    while($result = mysqli_fetch_assoc($query_result)){
        $newreleaseinfo[] = $result;
    }
    $connection->close();
    echo json_encode($newreleaseinfo);
?>
