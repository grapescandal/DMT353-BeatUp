<?php
    $servername = "localhost";
    $username = "projectweb";
    $password = "projectweb";
    $dbname = "projectweb";
    $connection = new mysqli($servername, $username, $password, $dbname);

    $query_statment = "SELECT music_name,music_local,picture_albums FROM music
    left join albums_detail
    on music.music_id = albums_detail.music_id
    left join albums
    on albums_detail.albums_id = albums.albums_id
    left join view
    on albums_detail.music_id = view.music_id
    group by view.music_id order by upload_date DESC;";

    $query_result = mysqli_query($connection, $query_statment);
    $recommendinfo =[];
    while($result = mysqli_fetch_assoc($query_result)){
        $recommendinfo[] = $result;
    }
    $connection->close();
    echo $recommendinfo;
?>