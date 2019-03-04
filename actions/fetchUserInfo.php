<?php
  include "serverConfig.php";

  $userID = $_POST['userID'];
  $query = "SELECT * FROM account WHERE id = '$userID'";

  $result = $conn->query($query);
  $row = mysqli_fetch_assoc($result);

  echo json_encode(array("id" => "$row[id]", "email" => "$row[email]", "fullName" => "$row[fullname]"))
?>
