<?php
if(file_exists("Charts.html") && filesize("Charts.html") > 0){
    $myfile = fopen("Charts.html","r");
    echo fread($myfile,filesize("Charts.html"));
    fclose($myfile);
}
?>