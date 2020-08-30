<?php
include 'users.php';

$Mysql = new MysqlConn;

$username = $_POST['user'];
$password = $_POST['password'];

$result=$Mysql->CheckUser($username,$password);

echo $Mysql->QueryToJson($result);

?>