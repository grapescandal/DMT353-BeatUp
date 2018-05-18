<?php
    $servername = "localhost";
    $username = "projectweb";
    $password = "projectweb";
    $dbname = "projectweb";
    $connection = new mysqli($servername, $username, $password, $dbname);

    $musicname = $_GET["musicname"];
    $music_artist = $_GET["musicartist"];
    $music_moods = $_GET["music_moods"];
    $music_genres = $_GET["music_genres"];
    $music_local = $_GET["music_local"];
    date_default_timezone_set("Asia/Bangkok");
    $datetime = date("Y-m-d h:i:sa");
    $datetimeis = substr($datetime,0,19);
    $query_statment = "INSERT INTO music 
    (music_name,music_artist,music_moods,music_genres,music_local,upload_date) VALUE 
    ('$musicname', '$music_artist','$music_moods','$music_genres','$music_local','$datetimeis')";

    mysqli_query($connection, $query_statment);
    $connection->close();
?>