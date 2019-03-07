<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Go Login!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- SWAL2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
  
  <!-- Color Scheme -->
  <link rel="stylesheet" href="css/color.css">

</head>
<body class="row">
  <div class="col s6 valign-wrapper" style="background-color: whitesmoke; height: 100vh">
    <!-- <p style="margin-left: 200px">Logo goes fucking here</p> -->
    <img src="images/logo.png" style="height: 200px; width: 200px; margin-left: 200px">
  </div>

  <div
    class="col s6" 
    style="height: 100vh; background-color: #1976d2; padding: 150px 50px 0px 50px;"
  >
    <h3 style="color: white">Welcome to Go Social !</h3>
    <div 
      class="center"
      style="height: 300px; background-color: white; margin-top: 20px;  border-radius: 20px; padding: 15px 50px 15px 50px;"
    > 
      <form id="loginForm" style="margin-bottom: 20px">
        <div class="input-field col s12">
          <i class="material-icons prefix" style="color: #1976d2;">email</i>
          <input id="email" name="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix" style="color: #1976d2;">lock</i>
          <input id="password" name="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>

        <input class="btn btn-small" type="submit" style="background-color: #1976d2" value="Login">
      </form>

      <a id="btn_goToSignup" href="#!">Doesn't have an account? Signup now!</a>
    </div>
  </div>
</body>

<script src="js/login.js"></script>
</html>
