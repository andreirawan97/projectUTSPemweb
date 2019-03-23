<?php 
  include "serverConfig.php";
  
  //User info yang lain masukin kesini
  //...
  $type = $_GET['type'];
  $userID = $_POST['userID'];
  $bio = $_POST['bio'];
  $email = $_POST['email'];
  $dateofbirth = $_POST['dateofbirth'];
  $fullname = $_POST['fullname'];
  $gender = $_POST['gender'];

  if($type === 'profilePic'){
    $profilePicURL = $_POST['profilePicURL'];
    $query = "UPDATE account SET profilePicURL = '$profilePicURL', fullname = '$fullname', bio = '$bio', email = '$email', dateofbirth = '$dateofbirth', gender = '$gender' WHERE id = '$userID'";

    $conn->query($query);

    echo json_encode(array("status" => "ok"));
  }
  else if($type === 'coverPic'){
    $coverPicURL = $_POST['coverPicURL'];
    $query = "UPDATE account SET coverPicURL = '$coverPicURL', fullname = '$fullname', bio = '$bio', email = '$email', dateofbirth = '$dateofbirth', gender = '$gender' WHERE id = '$userID'";

    $conn->query($query);

    echo json_encode(array("status" => "ok"));
  }
  else if($type === 'all'){
    $profilePicURL = $_POST['profilePicURL'];
    $coverPicURL = $_POST['coverPicURL'];
    $query = "UPDATE account SET profilePicURL = '$profilePicURL', coverPicURL = '$coverPicURL', fullname = '$fullname', bio = '$bio', email = '$email', dateofbirth = '$dateofbirth', gender = '$gender' WHERE id = '$userID'";

    $conn->query($query);

    echo json_encode(array("status" => "ok"));
  }
  else if($type === 'info'){
    $query = "UPDATE account SET fullname = '$fullname', bio = '$bio', email = '$email', dateofbirth = '$dateofbirth', gender = '$gender' WHERE id = '$userID'";
  
    $conn->query($query);

    echo json_encode(array("status" => "ok"));
  }
?>
