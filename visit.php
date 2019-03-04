<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Visiting...</title>
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

  <link href="css/visit.css" rel="stylesheet">
  <link href="css/color.css" rel="stylesheet">
</head>
<body>
<nav>
    <p class="center" style="font-size: 20px">Fucking Logo Here</p>
  </nav>

  <div class="row" style="padding: 20px 20px 20px 20px">
    <div class="col s3" style="padding: 20px 30px 30px 30px">
      <a id="btnGoHome" href="#!" style="margin: 40px 0px 0px 40px"><i class="material-icons" style="color: white; font-size: 30px;">arrow_back</i></a>

      <div class="personalInfo card">
        <img src="images/noImage.png" alt="" class="circle" style="height: 100px; width: 100px;">
        
        <p id="fullName" style="font-size: 18px; margin-bottom: 0px">Full Name Here</p>
        <p id="email" style="font-size: 14px; margin-top: 5px;">Email Here</p>
      </div>

      <p style="color: silver; font-size: 12px;">Go Social! © 2019</p>
    </div>

    <div class="col s6" style="margin-top: 150px;">

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

<script src="js/visit.js"></script>
</html>
