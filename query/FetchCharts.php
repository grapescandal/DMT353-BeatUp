<?php
    $servername = "localhost";
    $username = "nuttakron";
    $password = "admin";
    $dbname = "beat_up";
    $connection = new mysqli($servername, $username, $password, $dbname);

    $query_statment =
    "SELECT music_name,music_local, music_artist,upload_date,picture_albums FROM `like`
        left join music
        on `like`.music_id = music.music_id
        left join albums_detail
        on `like`.music_id = albums_detail.music_id
        left join albums
        on albums_detail.albums_id = albums.albums_id
        GROUP BY music.music_id
        ORDER BY COUNT(`like`.user_id) DESC LIMIT 10;";

    $query_result = mysqli_query($connection, $query_statment);
    $chartsInfo = [];
    while($result = mysqli_fetch_assoc($query_result)){
        $chartsInfo[] = $result;
    }
    $connection->close();
    echo json_encode($chartsInfo);
?>
