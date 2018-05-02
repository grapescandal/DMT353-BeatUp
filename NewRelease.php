<?php
if(file_exists("NewRelease.html") && filesize("NewRelease.html") > 0){
    $myfile = fopen("NewRelease.html","r");
    echo fread($myfile,filesize("NewRelease.html"));
    fclose($myfile);
}
?>
