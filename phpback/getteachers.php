<?php
include 'users.php';

$Mysql = new MysqlConn;


$result=$Mysql->CheckTeachers();

echo $Mysql->QueryToJson($result);

?>