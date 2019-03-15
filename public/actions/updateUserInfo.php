<?php 
  include "serverConfig.php";
  
  //User info yang lain masukin kesini
  //...
  $userID = $_POST['userID'];
  $profilePicURL = $_POST['profilePicURL'];

  $query = "UPDATE account SET profilePicURL = '$profilePicURL' WHERE id = '$userID'";

  $conn->query($query);

  echo json_encode(array("status" => "ok"));
?>
