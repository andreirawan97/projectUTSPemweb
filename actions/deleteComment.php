<?php 
  include "serverConfig.php";

  $commentID = $_POST['commentID'];

  $query = "DELETE FROM comments WHERE commentID = '$commentID'";
  $conn->query($query);

  echo json_encode(array('status' => 'ok'));
?>
