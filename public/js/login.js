$(document).ready(() => {
  if (checkIsLogin()) {
    location.href = 'main.php';
  }

  $('#btn_goToSignup').click(() => {
    location.href = 'signup.php';
  });

  $('#loginForm').submit((e) => {
    e.preventDefault();

    let inputtedEmail = $('#email')
      .val()
      .trim();
    let inputtedPassword = $('#password')
      .val()
      .trim();

    if (inputtedEmail === '' || inputtedPassword === '') {
      Swal.fire('Error', 'Please fill all the form!', 'error');
    } else {
      let data = {
        inputtedEmail: inputtedEmail,
        inputtedPassword: inputtedPassword,
      };
      $.post('actions/loginAction.php', data, (res) => {
        let response = JSON.parse(res);
        let {status, message, userID} = response;

        if (status === 'ok') {
          let dataLocalStorage = {
            isLogin: 'true',
            userID: userID,
          };

          localStorage.setItem('goSocial', JSON.stringify(dataLocalStorage));
          Swal.fire({
            title: 'Success!',
            text: message,
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Take me in!',
          }).then((result) => {
            if (result.value) {
              location.href = 'main.php';
            }
          });
        } else {
          Swal.fire('Error', message, 'error');
        }
      });
    }
  });
});

function checkIsLogin() {
  let dataLocalStorage = JSON.parse(localStorage.getItem('goSocial'));

  if (!dataLocalStorage) {
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

function initializeLocalStorage() {
  let initialData = {
    isLogin: false,
    userID: '',
  };

  localStorage.setItem('goSocial', JSON.stringify(initialData));
}
