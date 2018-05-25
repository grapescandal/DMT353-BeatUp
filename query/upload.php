<?php
$target_dir = "../uploads/";

if($_FILES['fileToUpload']['name'] != "" && $_FILES['picToUpload']['name']) { // if the file input is not empty
 if(($_FILES['fileToUpload']['type'] == "audio/mp3") || ($_FILES['fileToUpload']['type'] == "application/force-download") &&
 ((($_FILES['picToUpload']['type'] == "image/jpg") && ($_FILES['picToUpload']['type'] == "image/png")) || ($_FILES['picToUpload']['type'] == "application/force-download"))) { // if the file is a .mp3 file
              if ($_FILES["fileToUpload"]["size"] < 20971520 && $_FILES["picToUpload"]["size"] < 10971520) { // if the file is under 2 megabytes
                move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir . "Music/" . $_FILES["fileToUpload"]["name"]);
                move_uploaded_file($_FILES["picToUpload"]["tmp_name"], $target_dir . "Album/" . $_FILES["picToUpload"]["name"]);
                echo "<script type='text/javascript'>
                  alert('File has been stored in your uploads directory.');
                  window.location.href = '../index.php';
                </script>";
              }
              else {
                echo "<script type='text/javascript'>
                  alert('Please upload a music that is under 20 mb and image is under 10 mb!');
                  window.location.href = '../index.php';
                </script>";
             }
  }
  else {
    echo "<script type='text/javascript'>
      alert('Please upload correct file type!');
      window.location.href = '../index.php';
    </script>";
  }
}
?>
