<!DOCTYPE html>
<html>
<head>  
  <link rel="shortcut icon" href="favicon.ico" >

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Go Signup!</title>
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

  <!-- Color Scheme -->
  <link rel="stylesheet" href="css/color.css">
  <link rel="stylesheet" href="css/signup.css">
</head>
<body>
  <a id="btn_goToLogin" href="#!" style="margin: 40px 0px 0px 40px"><i class="material-icons" style="color: white; font-size: 40px;">arrow_back</i></a>

  <div style="display: flex; flex: 1; height: 100vh; justify-content: center; align-items: center">
    <div style="height: 450px; width: 800px; background-color: white; border-radius: 20px; padding: 40px 80px 40px 80px;">
      
      <form id="formSignup" style="margin-top: 30px;">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix" style="color: #1976d2;">person</i>
            <input id="userID" name="userID" type="text">
            <label for="userID">User ID</label>
          </div>
          <div class="input-field col s3">
            <input id="firstName" name="firstName" type="text">
            <label for="firstName">First Name</label>
          </div>
          <div class="input-field col s3">
            <input id="lastName" name="lastName" type="text">
            <label for="lastName">Last Name</label>
          </div>

          <div class="input-field col s6">
            <i class="material-icons prefix" style="color: #1976d2;">email</i>
            <input id="email" name="email" type="email" class="validate">
            <label for="email">Email</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix" style="color: #1976d2;">lock</i>
            <input id="password" name="password" type="password" class="validate">
            <label for="password">Password</label>
          </div>

          <div class="input-field col s6">
            <i class="material-icons prefix" style="color: #1976d2;">date_range</i>
            <input class="datepicker" id="dateofbirth" name="dateofbirth" type="text">
            <label for="dateofbirth">Date of Birth</label>
          </div>

          <div class="input-field col s6"> 
            <select id="gender">
              <option value="Male" style="color: #1976d2" selected>Male</option>
              <option value="Female"><p style="color: #1976d2">Female</p></option>
            </select>
            <label>Gender</label>
          </div>
        </div>

        <input class="btn" type="submit" value="Signup!" style="width: 100%; background-color: #1976d2">
      </form>
    </div>
  </div>
</body>

<script src="js/signup.js"></script>
</html>
