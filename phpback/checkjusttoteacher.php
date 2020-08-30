<?php
include 'users.php';

$Mysql = new MysqlConn;

$userid = $_POST['user'];

$result=$Mysql->CheckJustToTeacher($userid);

echo $Mysql->QueryToJson($result);

?>