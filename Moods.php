<?php
if(file_exists("Moods.html") && filesize("Moods.html") > 0){
    $myfile = fopen("Moods.html","r");
    echo fread($myfile,filesize("Moods.html"));
    fclose($myfile);
}
?>
