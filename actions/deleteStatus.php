<?php 
  include "serverConfig.php";

  $postID = $_POST['postID'];

  $query = "DELETE FROM feeds WHERE postID = '$postID'";

  $conn->query($query);

  $response = array('status' => 'ok');
  echo json_encode($response);
?>
