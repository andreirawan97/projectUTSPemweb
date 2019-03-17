<?php 
  include "serverConfig.php";
  
  //User info yang lain masukin kesini
  //...
  $type = $_GET['type'];
  $userID = $_POST['userID'];

  if($type === 'profilePic'){
    $profilePicURL = $_POST['profilePicURL'];
    $query = "UPDATE account SET profilePicURL = '$profilePicURL' WHERE id = '$userID'";

    $conn->query($query);

    echo json_encode(array("status" => "ok"));
  }
  else if($type === 'coverPic'){
    $coverPicURL = $_POST['coverPicURL'];
    $query = "UPDATE account SET coverPicURL = '$coverPicURL' WHERE id = '$userID'";

    $conn->query($query);

    echo json_encode(array("status" => "ok"));
  }
  else if($type === 'all'){
    $profilePicURL = $_POST['profilePicURL'];
    $coverPicURL = $_POST['coverPicURL'];
    $query = "UPDATE account SET profilePicURL = '$profilePicURL', coverPicURL = '$coverPicURL' WHERE id = '$userID'";

    $conn->query($query);

    echo json_encode(array("status" => "ok"));
  }
?>
