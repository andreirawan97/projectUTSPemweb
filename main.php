<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Home</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
  <!-- SWAL2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js"></script>

  <link href="css/main.css" rel="stylesheet">
  <link href="css/color.css" rel="stylesheet">
</head>
<body>
  <nav>
    <p class="center" style="font-size: 20px">Fucking Logo Here</p>
  </nav>

  <div class="row" style="padding: 20px 20px 20px 20px">
    <div class="col s3" style="padding: 30px 30px 30px 30px">
      <div class="personalInfo card">
        <img src="images/noImage.png" alt="" class="circle" style="height: 100px; width: 100px;">
        
        <p id="fullName" style="font-size: 18px; margin-bottom: 0px">Full Name Here</p>
        <p id="email" style="font-size: 14px; margin-top: 5px;">Email Here</p>
        
        <div style="margin-top: 40px;">
          <a href="#!" style="margin-right: 12px">Edit Profile</a>
          <a id="btnLogOut" href="#!" style="color: #ff1744">Log Out</a>
        </div>
    
      </div>

      <div class="card" style="border-radius: 12px; padding: 5px 20px 0px 20px;">
        <p style="margin-bottom: 0px;">Visit another user: </p>
        <div class="row">
          <div class="col s2">
            <p style="float: right; font-size: 20px;">/</p>
          </div>
          <div class="col s10">
            <form id="formVisitUser">
              <div class="input-field">
                <input id="inputTextUserSearch" type="text">
              </div>
            </form>
          </div>
        </div>
      </div>

      <p style="color: silver; font-size: 12px;">Go Social! © 2019</p>
    </div>

    <div class="col s6">
      <div class="card" style="height: 120px; margin-top: 160px; border-radius: 10px; padding: 20px 20px 10px 20px">
        <div class="row">
          <div class="input-field col s9">
            <input id="inputTextStatus" type="text" data-length="10">
            <label for="inputTextStatus">Share something great!</label>
          </div>
          <div class="col s3" style="margin-top: 30px;">
            <button id="btnSendStatus" class="btn btn-small right" style="background-color: #1976d2"><i class="material-icons right">send</i>Send</button>
          </div>
        </div>
      </div>

      <!-- <div class="divider" style="background-color: grey; margin: 20px 0px 20px 0px"></div> -->

      <!-- Profile feeds -->
      <div id="feedsContainer"></div>

      <div style="text-align: center">
        <div style="display: inline-block; background-color: grey; height: 10px; width: 10px; border-radius: 10px;"></div>   
      </div>
    </div>

    <div class="col s3">

    </div>

  </div>
  
</body>

<script src="js/main.js"></script>
</html>
