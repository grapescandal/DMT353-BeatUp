<?php
    $servername = "localhost";
    $username = "nuttakron";
    $password = "admin";
    $dbname = "beat_up";
    $connection = new mysqli($servername, $username, $password, $dbname);

    session_start();
    $_SESSION['userId'] = "";
    $_SESSION['username'] = "";
    $_SESSION['email'] = "";
    $_SESSION['password'] = "";
    $_SESSION['login'] = 'block';
    $_SESSION['logout'] = 'none';

    $input_user_email = filter_input(INPUT_GET, "email", FILTER_SANITIZE_STRING);
    $input_user_password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_STRING);

    $query_statment = "SELECT user_id, user_name, user_email, password FROM user WHERE user_email = '$input_user_email' AND password = '$input_user_password'";
    $query_result = mysqli_query($connection, $query_statment);
    $personinfo =[];

    if($query_result->num_rows > 0) {
      while($result = mysqli_fetch_assoc($query_result)){
          $personinfo[] = $result;
          $_SESSION['userId'] = $personinfo[0]['user_id'];
          $_SESSION['username'] = $personinfo[0]['user_name'];
          $_SESSION['email'] = $personinfo[0]['user_email'];
          $_SESSION['password'] = $personinfo[0]['password'];
          $_SESSION['login'] = 'none';
          $_SESSION['logout'] = 'block';
          header("Location: ../index.php");
          exit;
          break;
      }
    } else {
      session_unset();
      echo "<script type='text/javascript'>
  			alert('Login Error. Please check your E-mail and Password');
  			window.location.href = '../index.php';
  		</script>";
    }

    $connection->close();
    // echo '<script>  window.history.back();  </script>';
?>
