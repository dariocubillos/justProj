<?php
include 'users.php';

$Mysql = new MysqlConn;

$username = $_POST['user'];
$dateStart = $_POST['dateStart'];
$dateEnd = $_POST['dateEnd'];
$reason = $_POST['reason'];
$info = $_POST['info'];
$filename = $_POST['filename'];
$teacher = $_POST['teacher'];

$cad=json_encode(
    $Mysql->RegisterJust($username,$filename,
                         $dateStart,$dateEnd,$reason,$info, $teacher));
echo $cad;
?>