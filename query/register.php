<?php
  $servername = "localhost";
  $username = "nuttakron";
  $password = "admin";
  $dbname = "beat_up";

    $firstname = filter_input(INPUT_GET, "uname", FILTER_SANITIZE_STRING);
    $lastname = filter_input(INPUT_GET, "lname", FILTER_SANITIZE_STRING);
    $mail = filter_input(INPUT_GET, "email", FILTER_SANITIZE_STRING);
    $pass = filter_input(INPUT_GET, "password", FILTER_SANITIZE_STRING);
    $repass = filter_input(INPUT_GET, "repassword", FILTER_SANITIZE_STRING);

    if($pass != $repass) {
      echo "<script type='text/javascript'>
        alert('Password doesnt match.');
        window.location.href = '../index.php';
      </script>";
    } else {
      $connection = mysqli_connect($servername, $username, $password, $dbname);

      $query_statment  = "SELECT user_email,password FROM user WHERE user_email = '$mail';";
      $query_result = mysqli_query($connection, $query_statment);
      $result_user = [];

      while($result = mysqli_fetch_assoc($query_result)){
          $result_user[] = $result;
      }

      if(count($result_user) <= 0) {
        $query_statment = "INSERT INTO user
        (user_name,user_lastname,user_email,password) VALUES
        ('$firstname', '$lastname','$mail','$pass')";
        mysqli_query($connection, $query_statment);

        echo "<script type='text/javascript'>
          alert('Register complete.');
          window.location.href = '../index.php';
        </script>";
      } else {
        echo "<script type='text/javascript'>
          alert('This e-mail already use.');
          window.location.href = '../index.php';
        </script>";
      }
      $connection->close();
    }
?>
