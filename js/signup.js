$(document).ready(() => {
  $('#btn_goToLogin').click(() => {
    location.href = 'login.php';
  });

  $('#formSignup').submit((e) => {
    e.preventDefault();

    let inputtedFirstName = $('#firstName')
      .val()
      .trim();
    let inputtedLastName = $('#lastName')
      .val()
      .trim();
    let inputtedEmail = $('#email')
      .val()
      .trim();
    let inputtedPassword = $('#password')
      .val()
      .trim();
    let inputtedUserID = $('#userID')
      .val()
      .trim();

    if (
      inputtedFirstName === '' ||
      inputtedLastName === '' ||
      inputtedEmail === '' ||
      inputtedPassword === ''
    ) {
      Swal.fire('Error', 'Please fill all the form!', 'error');
    } else {
      let inputtedFullName = `${inputtedFirstName} ${inputtedLastName}`;

      let data = {
        inputtedFullName: inputtedFullName,
        inputtedUserID: inputtedUserID,
        inputtedEmail: inputtedEmail,
        inputtedPassword: inputtedPassword,
      };

      $.post('actions/signupAction.php', data, (res) => {
        let response = JSON.parse(res);
        let {status, message} = response;

        if (status === 'ok') {
          Swal.fire({
            title: 'Success!',
            text: message,
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Login Now!',
          }).then((result) => {
            if (result.value) {
              location.href = 'login.php';
            }
          });
        } else {
          Swal.fire('Error', message, 'error');
        }
      });
    }
  });
});
