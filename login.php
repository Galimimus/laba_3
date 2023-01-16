<?php
include 'helper.php';
include 'db.php';
session_start();


if(isset($_GET['name']) && isset($_GET['pass'])){
    if(isset($_GET['name']) && isset($_GET['pass'])){
        $name = $_GET['name'];
        $pass = $_GET['pass'];
        $link = db_conn();
        $sql = "SELECT * FROM users WHERE name = '$name' AND password = '$pass'";
        $result = mysqli_query($link, $sql);

        if (mysqli_num_rows($result) > 0) {
            
            $_SESSION['status'] = true;
            $_SESSION['name'] = $name;
            $_SESSION['id'] = mysqli_fetch_assoc($result)['id'];

            $result=array(
                "status" => true,
                "name" => $name,
                "id" => $_SESSION['id']);

            
            return_ok($result, 200);

        } else {
            return_error("User not found", 404);
        }
        mysqli_close($link);
    }else{
        return_error("Bad request", 400);
    }
}
