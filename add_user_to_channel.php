<?php
include 'helper.php';
include 'db.php';
session_start();

if(isset($_GET['chat_id']) && $_GET['chat_id'] != "") {
    $chat_id = $_GET['chat_id'];
    if(isset($_GET['user_id']) && $_GET['user_id'] != "") {
        $user_id = $_GET['user_id'];
    } else {
       $user_id = $_SESSION['id'];
    }
    $link = db_conn();

    $sql = "INSERT INTO users_chats (user_id, chat_id) VALUES ('$user_id', '$chat_id')";
    $result = mysqli_query($link, $sql);

    mysqli_close($link);
    if($result == true) {
        return_ok("User added to chat", 200);
    } else {
        return_error("User not added to chat", 400);    }
}


    