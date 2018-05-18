<?php
    $servername = "localhost";
    $username = "nuttakron";
    $password = "admin";
    $dbname = "beat_up";
    $connection = new mysqli($servername, $username, $password, $dbname);

    $_SESSION['email'] = $_GET["email"];
    $_SESSION['password'] = $_GET["password"];

    $query_statment = "SELECT user_email,password FROM user WHERE ";
    $query_result = mysqli_query($connection, $query_statment);
    $personinfo =[];
    while($result = mysqli_fetch_assoc($query_result)){
        $personinfo[] = $result;
    }

    $connection->close();
?>
