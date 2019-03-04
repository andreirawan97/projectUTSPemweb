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
    <p style="margin-left: 200px">Logo goes fucking here</p>
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

<script>
  $(document).ready(() => {
    if(checkIsLogin()){
      location.href = "main.php";
    }

    $('#btn_goToSignup').click(() => {
      location.href="signup.php";
    })

    $('#loginForm').submit((e) => {
      e.preventDefault();

      let inputtedEmail = $('#email').val().trim();
      let inputtedPassword = $('#password').val().trim();

      if(inputtedEmail === '' || inputtedPassword === ''){
        Swal.fire(
          'Error',
          'Please fill all the form!',
          'error'
        )
      }
      else{
        let data = {inputtedEmail: inputtedEmail, inputtedPassword: inputtedPassword};
        $.post('actions/loginAction.php', data, (res) => {
          let response = JSON.parse(res);
          let {status, message, userID} = response;

          if(status === "ok"){
            let dataLocalStorage = {
              isLogin: 'true',
              userID: userID
            }

            localStorage.setItem('goSocial', JSON.stringify(dataLocalStorage));
            Swal.fire({
              title: 'Success!',
              text: message,
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Take me in!'
            }).then((result) => {
              if (result.value) {
                location.href="main.php";
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

  });

  function checkIsLogin(){
    let dataLocalStorage = JSON.parse(localStorage.getItem('goSocial'));

    if(!dataLocalStorage){
      initializeLocalStorage();
    }

    let {isLogin} = dataLocalStorage;
    return isLogin ? true : false;

    // if(dataLocalStorage.hasOwnProperty('isLogin')){
    //   let {isLogin} = dataLocalStorage;
    //   return isLogin ? true : false;
    // }
    
    // return false;
  }

  function initializeLocalStorage(){
    let initialData = {
      isLogin: false,
      userID: '',
    }

    localStorage.setItem('goSocial', JSON.stringify(initialData));
  }

</script>
</html>
