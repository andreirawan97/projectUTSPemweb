<?php
  function isDuplicateEmail($inputtedEmail){
    include "serverConfig.php";

    $query = "SELECT email from account WHERE email = '$inputtedEmail'";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);

    if(is_array($row)){
      return true;
    }
    else{
      return false;
    }
  }

  function isDuplicateID($inputtedUserID){
    include "serverConfig.php";

    $query = "SELECT id from account WHERE id = '$inputtedUserID'";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);

    if(is_array($row)){
      return true;
    }
    else{
      return false;
    }
  }

  function insertToDatabase($inputtedUserID, $inputtedFullName, $inputtedGender, $inputtedEmail, $inputtedPassword, $_, $inputtedDateofbirth, $registerDate){
    include "serverConfig.php";

    $query = "INSERT INTO account VALUES ('$inputtedUserID', '$inputtedEmail', '$inputtedFullName', '$inputtedGender', '$_', '$inputtedDateofbirth', '$registerDate')";
    $conn->query($query);

    $salt = rand(100, 999);
    $inputtedPasswordWithSalt = "$inputtedPassword$salt";
    $md5InputtedPasswordWithSalt = md5($inputtedPasswordWithSalt);

    $query = "INSERT INTO secret VALUES ('$inputtedUserID', '$md5InputtedPasswordWithSalt', '$salt')";
    $conn->query($query);
  }
?>

<?php
  $inputtedUserID = $_POST['inputtedUserID'];
  $inputtedFullName = $_POST['inputtedFullName'];
  $inputtedEmail = $_POST['inputtedEmail'];
  $inputtedPassword = $_POST['inputtedPassword'];
  $inputtedDateofbirth = $_POST['inputtedDateofbirth'];
  $inputtedGender = $_POST['inputtedGender'];
  $registerDate = $_POST['registerDate'];
  $response;

  if(!isDuplicateID($inputtedUserID) && !isDuplicateEmail($inputtedEmail)){
    insertToDatabase($inputtedUserID, $inputtedFullName, $inputtedGender, $inputtedEmail, $inputtedPassword, null, $inputtedDateofbirth, $registerDate);
    
    $response = json_encode(array("status" => "ok", "message" => "Signup Succesful!"));
  }
  else{
    $response = json_encode(array("status" => "err", "message" => "Email or ID has been used"));
  }

  echo $response;
?>
