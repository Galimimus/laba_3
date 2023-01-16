<?php

include 'helper.php';
include 'db.php';

session_start();

if(!isset($_SESSION['status'])){
    return_error("Unauthorized", 401);
}
if($_SESSION['status'] != true){
    return_error("Unauthorized", 401);
}

$link = db_conn();
$sql = "SELECT * FROM chats LEFT JOIN users_chats ON chats.id = users_chats.chat_id WHERE users_chats.user_id = ".$_SESSION['id']." OR chats.access='public'";
$result = mysqli_query($link, $sql);
$num = mysqli_num_rows($result);
mysqli_close($link);

if ($num > 0) {
    $res = array();
    while($row = mysqli_fetch_assoc($result)) {
        array_push($res, $row);
    }
    return_ok($res, 200);
} else {
    return_error("Channels not found", 404);
}
mysqli_close($link);

