<?php
include 'helper.php';
include 'db.php';
session_start();

if(isset($_GET['chat_id']) && $_GET['chat_id'] != "") {
    $chat_id = $_GET['chat_id'];
    $user_id = $_SESSION['id'];
    $link = db_conn();

    $sql = "SELECT * FROM messages LEFT JOIN users ON messages.user_id = users.id WHERE chat_id = $chat_id";
    $result = mysqli_query($link, $sql);
    $messages = array();
    while($row = mysqli_fetch_assoc($result)) {
        $message = array(
            "chat_id" => $row['chat_id'],
            "user_id" => $row['user_id'],
            "name" => $row['name'],
            "message" => $row['message']
        );
        array_push($messages, $message);
    }
    mysqli_close($link);
    if($result == true) {
        return_ok($messages, 200);
    } else {
        return_error("No messages found", 404);
    }
}else{
    return_error("Bad request", 400);
}