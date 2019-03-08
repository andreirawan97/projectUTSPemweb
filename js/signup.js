document.addEventListener('DOMContentLoaded', function() {
  var elemsDatepicker = document.querySelectorAll('.datepicker');
  var instancesDatepicker = M.Datepicker.init(elemsDatepicker, {
    format: 'yyyy-mm-dd',
    yearRange: [1940, 2020],
  });
});

$(document).ready(() => {
  $('#dateofbirth').focus(() => {
    let instance = M.Datepicker.getInstance(
      document.getElementById('dateofbirth'),
    );

    instance.open();
  });

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
    let inputtedDateofbirth = $('#dateofbirth').val();
    let inputtedGender = $('input[name="gender"]:checked').val();

    if (
      inputtedFirstName === '' ||
      inputtedLastName === '' ||
      inputtedEmail === '' ||
      inputtedPassword === '' ||
      inputtedDateofbirth === ''
    ) {
      Swal.fire('Error', 'Please fill all the form!', 'error');
    } else {
      let inputtedFullName = `${inputtedFirstName} ${inputtedLastName}`;

      let data = {
        inputtedFullName: inputtedFullName,
        inputtedUserID: inputtedUserID,
        inputtedEmail: inputtedEmail,
        inputtedPassword: inputtedPassword,
        inputtedDateofbirth: inputtedDateofbirth,
        inputtedGender: inputtedGender,
      };

      $.post('actions/signupAction.php', data, (res) => {
        alert(res);
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
