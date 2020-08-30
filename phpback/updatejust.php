<?php
include 'users.php';

$Mysql = new MysqlConn;

$justid = $_POST['justId'];
$estate = $_POST['state'];


$result=$Mysql->UpdateJust($justid, $estate);

echo $result;

?>