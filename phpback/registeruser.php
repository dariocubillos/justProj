<?php
include 'users.php';

$Mysql = new MysqlConn;

$username = $_POST['user'];
$password = $_POST['password'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$typeUser = $_POST['typeUser'];


$cad=json_encode($Mysql->RegisterUser($username,$password,$name,$phone,$typeUser));
echo $cad;
?>