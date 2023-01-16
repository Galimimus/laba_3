<?php
include 'helper.php';
include 'db.php';

 if(isset($_GET['name']) && isset($_GET['pass'])){
        $name = $_GET['name'];
        $pass = $_GET['pass'];
        $link = db_conn();
        $sql = "INSERT INTO users (name, password) VALUES ('$name', '$pass')";
        $result = mysqli_query($link, $sql);
        if ($result) {
            session_start();
            
            $_SESSION['status'] = true;
            $_SESSION['name'] = $name;
            $_SESSION['id'] = mysqli_insert_id($link);

            return_ok("Uder added", 200);
        } else {
            return_error("User not added", 400);
        }
        mysqli_close($link);
}else{
        return_error("Bad request", 400);
}