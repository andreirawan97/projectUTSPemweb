<?php

?>

<?php
  include "serverConfig.php";

  $postID = $_POST['postID'];

  $query = "SELECT * FROM comments INNER JOIN account ON comments.id = account.id WHERE comments.postID = '$postID' ORDER BY timestamp ASC";
  $result = $conn->query($query);
  $response = [];

  while($row = mysqli_fetch_assoc($result)){
    array_push($response, 
      array(
        "id" => "$row[id]",
        "fullname" => "$row[fullname]",
        "message" => "$row[message]",
        "commentID" => "$row[commentID]",
        "timestamp" => "$row[timestamp]"
      ));
  }

  echo json_encode($response);
?>
