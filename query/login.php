<?php
    $servername = "localhost";
    $username = "projectweb";
    $password = "projectweb";
    $dbname = "projectweb";
    $connection = new mysqli($servername, $username, $password, $dbname);

    $query_statment = "SELECT user_email,password FROM user";
    $query_result = mysqli_query($connection, $query_statment);
    $personinfo =[];
    while($result = mysqli_fetch_assoc($query_result)){
        $personinfo[] = $result;
    }
    
    $connection->close();
?>