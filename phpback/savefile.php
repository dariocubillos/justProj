<?php
include 'users.php';

$Mysql = new MysqlConn;


$files = $_FILES["file"]["name"];
$uploadFolder =  "upload/";
$fileurl;

    for ($i =  0; $i < count($files); $i++)  {
        $filename=$files[$i];
        $temp = explode(".", $filename);
        $ext = end($temp);
        $original = pathinfo($filename, PATHINFO_FILENAME);
        $fileurl = $original .  "-"  . date("YmdHis")  .  "."  . $ext;
        move_uploaded_file($_FILES["file"]["tmp_name"][$i], $uploadFolder . $fileurl);
    }


echo json_encode($fileurl);
?>