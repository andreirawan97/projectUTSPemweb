<?php
  include "serverConfig.php";

  $userID = $_POST['userID'];
  $postID = $_POST['postID'];
  $message = $_POST['message'];
  $timestamp = $_POST['timestamp'];

  $query = "INSERT INTO comments VALUES ('$userID', '$postID', null, '$message', '$timestamp')";
  $conn->query($query);

  echo json_encode(array('status' => 'ok'));
?>
