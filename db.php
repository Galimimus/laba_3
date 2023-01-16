<?php
function db_conn(){
    //function for connecting to database
    $servername = "localhost";
    $username = "galimimus";
    $password = "pass111";
    $dbname = "laba3";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        return_error("Connection failed: " . $conn->connect_error, 500);
    }
    return $conn;
}