<?php
  include "serverConfig.php";

  $status = $_POST['status'];
  $userID = $_POST['userID'];
  $currentTimestamp = $_POST['currentTimestamp'];

  $query = "INSERT INTO feeds VALUES ('$userID', '$status', '$currentTimestamp', null)";
  $conn->query($query);

  $response = array("status" => "ok");
  echo json_encode($response);
?>
