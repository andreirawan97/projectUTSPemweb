<?php 
  include "serverConfig.php";
  $postID = $_POST['postID'];
  $query = "SELECT * FROM feeds INNER JOIN account ON feeds.id = account.id WHERE feeds.postID = '$postID'";
  $result = $conn->query($query);
  $row = mysqli_fetch_assoc($result);

  echo json_encode($row);
?>
