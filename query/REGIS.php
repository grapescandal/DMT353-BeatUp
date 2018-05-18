<?php
    $servername = "localhost";
    $username = "projectweb";
    $password = "projectweb";
    $dbname = "projectweb";
    $connection = new mysqli($servername, $username, $password, $dbname);
    $firstname = $_GET["uname"];
    $lastname = $_GET["lname"];
    $mail = $_GET["email"];
    $pass = $_GET["psw"];
    $date_of_birth = $_GET["birthdate"];

    $query_chlogin = "SELECT user_email,password FROM user where email = '$mail';";
    $query_result_chlogin = mysqli_query($connection, $query_chlogin);
    
    if(isset($query_result_chlogin)){
        $query_statment = "INSERT INTO user 
        (user_name,user_lastname,user_email,password,date_of_birth) VALUE 
        ('$firstname', '$lastnmame','$mail','$pass','$date_of_birth')";

        mysqli_query($connection, $query_statment);
    }
    $connection->close();
?>