<?php
include 'users.php';

$Mysql = new MysqlConn;

$userid = $_POST['userid'];

$result=$Mysql->CheckUserId($userid);

echo $Mysql->QueryToJson($result);

?>