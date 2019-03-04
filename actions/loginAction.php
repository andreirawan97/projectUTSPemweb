<?php 
  function userDoesExist($inputtedEmail){
    include "serverConfig.php";

    $query = "SELECT email FROM `account` INNER JOIN `secret` ON account.id = secret.id WHERE email = '$inputtedEmail'";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);

    if(is_array($row)){
      return true;
    }
    else{
      return false;
    }
  }

  function passwordIsCorrect($inputtedEmail, $inputtedPassword){
    include "serverConfig.php";

    $query = "SELECT email, password, salt FROM `account` INNER JOIN `secret` ON account.id = secret.id WHERE email = '$inputtedEmail'";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);

    $inputtedPasswordWithSalt = "$inputtedPassword$row[salt]";
    $md5inputtedPasswordWithSalt = md5($inputtedPasswordWithSalt);

    if($md5inputtedPasswordWithSalt === $row['password']){
      return true;
    }
    else{
      return false;
    }
  }

  function getUserID($inputtedEmail){
    include "serverConfig.php";

    $query = "SELECT id FROM `account` WHERE email = '$inputtedEmail'";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);

    return $row['id'];
  }
?>

<?php
  // Email: ndreirawan97@gmail, Pass: admin, Salt: 123
  $inputtedEmail = $_POST['inputtedEmail'];
  $inputtedPassword = $_POST['inputtedPassword'];
  $response;

  if(userDoesExist($inputtedEmail)){
    if(passwordIsCorrect($inputtedEmail, $inputtedPassword)){
      $userID = getUserID($inputtedEmail);

      $response = json_encode(array("status" => "ok", "message" => "Login Successful!", "userID" => $userID));
    }
    else{
      $response = json_encode(array("status" => "err", "message" => "Wrong Password"));
    }
  }
  else{
    $response = json_encode(array("status" => "err", "message" => "User not found!"));
  }

  echo $response;
  
?>
