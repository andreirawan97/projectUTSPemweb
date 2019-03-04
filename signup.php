<!DOCTYPE html>
<html>
<head>
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

  <!-- Color Scheme -->
  <link rel="stylesheet" href="css/color.css">
  <link rel="stylesheet" href="css/signup.css">
</head>
<body>
  <a id="btn_goToLogin" href="#!" style="margin: 40px 0px 0px 40px"><i class="material-icons" style="color: white; font-size: 40px;">arrow_back</i></a>

  <div style="display: flex; flex: 1; height: 100vh; justify-content: center; align-items: center">
    <div style="height: 400px; width: 800px; background-color: white; border-radius: 20px; padding: 40px 80px 40px 80px;">
      
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
        </div>

        <input class="btn" type="submit" value="Signup!" style="width: 100%; background-color: #1976d2">
      </form>
    </div>
  </div>
</body>

<script>
  $(document).ready(() => {
    $('#btn_goToLogin').click(() => {
      location.href="login.php";
    })

    $('#formSignup').submit((e) => {
      e.preventDefault();

      let inputtedFirstName = $('#firstName').val().trim();
      let inputtedLastName = $('#lastName').val().trim();
      let inputtedEmail = $('#email').val().trim();
      let inputtedPassword = $('#password').val().trim();
      let inputtedUserID = $('#userID').val().trim();

      if(inputtedFirstName === '' || inputtedLastName === '' || inputtedEmail === '' || inputtedPassword === ''){
        Swal.fire(
          'Error',
          'Please fill all the form!',
          'error'
        )
      }
      else{
        let inputtedFullName = `${inputtedFirstName} ${inputtedLastName}`;

        let data = {
          inputtedFullName: inputtedFullName,
          inputtedUserID: inputtedUserID,
          inputtedEmail: inputtedEmail,
          inputtedPassword: inputtedPassword,
        }

        $.post('actions/signupAction.php', data, (res) => {
          let response = JSON.parse(res);
          let {status, message} = response;

          if(status === 'ok'){
            Swal.fire({
              title: 'Success!',
              text: message,
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Login Now!'
            }).then((result) => {
              if (result.value) {
                location.href="login.php";
              }
            })
          }
          else{
            Swal.fire(
              'Error',
              message,
              'error'
            )
          }
        })
      }

    })
  })
</script>
</html>
