<?php
if(file_exists("home.html") && filesize("home.html") > 0){
    $myfile = fopen("home.html","r");
    echo fread($myfile,filesize("home.html"));
    fclose($myfile);
}
?>