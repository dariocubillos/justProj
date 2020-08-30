<?php
include 'users.php';

$Mysql = new MysqlConn;

$userid = $_POST['user'];

$result=$Mysql->CheckJust($userid);

echo $Mysql->QueryToJson($result);

?>