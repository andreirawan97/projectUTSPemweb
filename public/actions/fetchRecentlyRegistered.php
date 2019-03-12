<?php
  include 'serverConfig.php';

  $query = 'SELECT id FROM account ORDER BY registerDate DESC LIMIT 3';
  $result = $conn->query($query);
  $response = [];

  while($row = mysqli_fetch_assoc($result)){
    array_push($response, $row);
  }

  echo json_encode($response);
?>
