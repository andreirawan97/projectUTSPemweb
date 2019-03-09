<?php
  include "serverConfig.php";

  $userID = $_POST['userID'];
  $query = "SELECT * FROM account WHERE id = '$userID'";

  $result = $conn->query($query);
  $row = mysqli_fetch_assoc($result);

  if(is_array($row)){
    echo json_encode($row);
  }
  else{
    echo json_encode(array("status" => "err"));
  }

  /*
    Dia ngirim dari hasilnya berupa json
  */
?>
