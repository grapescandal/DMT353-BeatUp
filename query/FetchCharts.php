<?php
    $servername = "localhost";
    $username = "nuttakron";
    $password = "admin";
    $dbname = "beat_up";
    $connection = new mysqli($servername, $username, $password, $dbname);

    $query_statment =
    "SELECT  music.music_id, music.music_name, music.music_local, music.music_artist, music.upload_date, albums.picture_albums, COUNT(view.user_id) as viewCount FROM music
		    left join view
        on view.music_id = music.music_id
        left join albums_detail
        on music.music_id = albums_detail.music_id
        left join albums
        on albums_detail.albums_id = albums.albums_id
        GROUP BY music.music_id
        ORDER BY COUNT(view.user_id) DESC LIMIT 10;";

    $query_result = mysqli_query($connection, $query_statment);
    $chartsInfo = [];
    while($result = mysqli_fetch_assoc($query_result)){
        $chartsInfo[] = $result;
    }

    $query_statment =
    "SELECT  music.music_id, COUNT(`like`.user_id) as likeCount FROM music
    left join `like`
    on music.music_id = `like`.music_id
    GROUP BY music_id;";
    $query_result = mysqli_query($connection, $query_statment);
    $chartsLike = [];
    while($result = mysqli_fetch_assoc($query_result)){
        $chartsLike[] = $result;
    }

    for($i = 0; $i < count($chartsInfo); $i++) {
      $j = 0;
      while ($j <= count($chartsLike)) {
        if($chartsInfo[$i]["music_id"] == $chartsLike[$j]["music_id"]) {
          $chartsInfo[$i]["likeCount"] = $chartsLike[$j]["likeCount"];
          break;
        }
        $j++;
      }
    }

    $connection->close();
    echo json_encode($chartsInfo);
?>
