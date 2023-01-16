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

if(isset($_GET['name']) && isset($_GET['access'])){
    if(!strcmp($_GET['access'], "public") || !strcmp($_GET['access'], "private")){

        $name = $_GET['name'];
        $access = $_GET['access'];
        $link = db_conn();
        $sql = "INSERT INTO chats (name, access) VALUES ('$name', '$access')";
        $result = mysqli_query($link, $sql);

        if ($result) {
            $res = array(
                "id" => mysqli_insert_id($link),
                "name" => $name,
                "access" => $access
            );
            return_ok($res, 200);
        } else {
            return_error("Channel not added", 400);
        }
        mysqli_close($link);
    }else{
        return_error("Bad request", 400);
    }
}else{
    return_error("Bad request", 400);
}