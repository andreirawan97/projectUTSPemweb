<?php
  include "serverConfig.php";

  $userID = $_POST['userID'];

  $query = "SELECT * FROM feeds INNER JOIN account ON feeds.id = account.id WHERE feeds.id = '$userID' ORDER BY timestamp DESC;";
  $result = $conn->query($query);
  $response = [];

  while($row = mysqli_fetch_assoc($result)){
    array_push($response, 
      array(
        "postID" => $row['postID'], 
        "message" => $row['message'], 
        "timestamp" => $row['timestamp'],
        "fullName" => $row['fullname']
      ));
  }

  echo json_encode($response);
?>
