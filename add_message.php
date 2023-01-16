<?php
include 'helper.php';
include 'db.php';
session_start();

if(isset($_GET['chat_id']) && $_GET['chat_id'] != "" && isset($_GET['message']) && $_GET['message'] != "") {
    $chat_id = $_GET['chat_id'];
    $message = $_GET['message'];
    $user_id = $_SESSION['id'];
    $link = db_conn();

    $sql = "INSERT INTO messages (chat_id, user_id, message) VALUES ('$chat_id', '$user_id', '$message')";
    $result = mysqli_query($link, $sql);

    mysqli_close($link);
    if($result == true) {
        $new_message = array(
            "chat_id" => $chat_id,
            "user_id" => $user_id,
            "name" => $_SESSION['name'],
            "message" => $message
        );
        return_ok($new_message, 200);
    } else {
        return_error("Message not sent", 400);
    }
}