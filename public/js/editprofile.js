/**
 * NOTE:
 * 1. Maksud dari () => {} itu sama aja kayak function(){}
 */

document.addEventListener('DOMContentLoaded', function() {
  var elemsDatepicker = document.querySelectorAll('.datepicker');
  var instancesDatepicker = M.Datepicker.init(elemsDatepicker);
});

$(document).ready(() => {
  showLoadingBar();
  let {userID} = JSON.parse(localStorage.getItem('goSocial'));
  fetchUserInfo(userID);

  //On press button FAB
  $('#fabSubmitForm').click(() => {
    showLoadingBar();

    let fileProfilePic = $('#ppFile').get(0).files;
    let fileCoverPic = $('#cpFile').get(0).files;
    let firstname = $('#firstName').val();
    let lastname = $('#lastName').val();
    let fullname = `${firstname} ${lastname}`;
    let bio = $('#biography').val();
    let email = $('#email').val();
    let dateofbirth = $('#dateofbirth').val();
    let selectorGender = M.FormSelect.getInstance(
      document.getElementById('gender'),
    );
    let gender = getSelectedValues(selectorGender);
    console.log(gender);

    if (checkEmptyField(firstname.trim(), lastname.trim(), email.trim())) {
      Swal.fire('Error!', 'Field cannot be empty!', 'error');
      hideLoadingBar();
      return;
    }

    //If files exist and already selected
    if (fileProfilePic.length || fileCoverPic.length) {
      if (fileProfilePic.length && fileCoverPic.length) {
        // Reject big files
        if (fileProfilePic[0].size > $(this).data('max-size') * 1024) {
          Swal.fire('Error!', 'Please select smaller file size!', 'error');
          return false;
        }
        if (fileCoverPic[0].size > $(this).data('max-size') * 1024) {
          Swal.fire('Error!', 'Please select smaller file size!', 'error');
          return false;
        }

        let promiseProfilePic = new Promise((resolve, reject) => {
          uploadImage(resolve, reject, fileProfilePic);
        });

        let promiseCoverPic = new Promise((resolve, reject) => {
          uploadImage(resolve, reject, fileCoverPic);
        });

        Promise.all([promiseProfilePic, promiseCoverPic]).then((result) => {
          //Update to DB
          let {userID} = JSON.parse(localStorage.getItem('goSocial'));
          let data = {
            userID: userID,
            profilePicURL: result[0],
            coverPicURL: result[1],
            fullname: fullname,
            bio: bio,
            email: email,
            dateofbirth: dateofbirth,
            gender: gender,
          };

          $.post('actions/updateUserInfo.php?type=all', data, (res) => {
            let response = JSON.parse(res);

            if (response.status === 'ok') {
              hideLoadingBar();

              Swal.fire({
                title: 'Success!',
                text: 'Profile has been updated!',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirm',
              }).then((result) => {
                if (result.value) {
                  location.href = 'main.php';
                }
              });
            }
          });
        });
      } else if (fileProfilePic.length) {
        // Reject big files
        if (fileProfilePic[0].size > $(this).data('max-size') * 1024) {
          Swal.fire('Error!', 'Please select smaller file size!', 'error');
          return false;
        }

        new Promise((resolve, reject) => {
          uploadImage(resolve, reject, fileProfilePic);
        }).then((result) => {
          //Update to DB
          let {userID} = JSON.parse(localStorage.getItem('goSocial'));
          let data = {
            userID: userID,
            profilePicURL: result,
            fullname: fullname,
            bio: bio,
            email: email,
            dateofbirth: dateofbirth,
            gender: gender,
          };

          $.post('actions/updateUserInfo.php?type=profilePic', data, (res) => {
            let response = JSON.parse(res);

            if (response.status === 'ok') {
              hideLoadingBar();
              Swal.fire({
                title: 'Success!',
                text: 'Profile has been updated!',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirm',
              }).then((result) => {
                if (result.value) {
                  location.href = 'main.php';
                }
              });
            }
          });
        });
      } else if (fileCoverPic.length) {
        if (fileCoverPic[0].size > $(this).data('max-size') * 1024) {
          Swal.fire('Error!', 'Please select smaller file size!', 'error');
          return false;
        }

        new Promise((resolve, reject) => {
          uploadImage(resolve, reject, fileCoverPic);
        }).then((result) => {
          //Update to DB
          let {userID} = JSON.parse(localStorage.getItem('goSocial'));
          let data = {
            userID: userID,
            coverPicURL: result,
            fullname: fullname,
            bio: bio,
            email: email,
            dateofbirth: dateofbirth,
            gender: gender,
          };

          $.post('actions/updateUserInfo.php?type=coverPic', data, (res) => {
            let response = JSON.parse(res);

            if (response.status === 'ok') {
              hideLoadingBar();
              Swal.fire({
                title: 'Success!',
                text: 'Profile has been updated!',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirm',
              }).then((result) => {
                if (result.value) {
                  location.href = 'main.php';
                }
              });
            }
          });
        });
      }
    } else {
      let data = {
        userID: userID,
        fullname: fullname,
        bio: bio,
        email: email,
        dateofbirth: dateofbirth,
        gender: gender,
      };

      $.post('actions/updateUserInfo.php?type=info', data, (res) => {
        let response = JSON.parse(res);

        if (response.status === 'ok') {
          hideLoadingBar();
          Swal.fire({
            title: 'Success!',
            text: 'Profile has been updated!',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirm',
          }).then((result) => {
            if (result.value) {
              location.href = 'main.php';
            }
          });
        }
      });
    }
  });
});

function checkEmptyField(firstname, lastname, email) {
  if (firstname === '' || lastname === '' || email === '') {
    return true;
  }

  return false;
}

function fetchUserInfo(userID) {
  $.post('actions/fetchUserInfo.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);

    let {fullname, bio, email, dateofbirth, gender} = response;

    let name = fullname.split(' ');
    let firstname = name[0];
    let lastname = name[1];

    $('#firstName').val(firstname);
    $('#lastName').val(lastname);
    $('#biography').val(bio);
    $('#email').val(email);
    $('#dateofbirth').val(dateofbirth);
    $('#gender').val(gender);
    var elemsSelect = document.querySelectorAll('select');
    var instancesSelect = M.FormSelect.init(elemsSelect);
    M.updateTextFields();
    hideLoadingBar();
  });
}

function showLoadingBar() {
  let loadingBar = `
  <div class="progress" style="margin-top: 0px; height: 5px;">
    <div class="indeterminate"></div>
  </div>`;

  $('#loadingBar').html(loadingBar);
}

function hideLoadingBar() {
  $('#loadingBar').html('');
}

function uploadImage(resolve, reject, file) {
  let url = 'https://api.imgur.com/3/image';
  let clientID = '4689e4a62b06c0f';
  let clientSecret = '109c0adbff19a90cf5e0c5880b61f3dc2d98ec37';
  let settings = {
    url: url,
    method: 'POST',
    timeout: 0,
    headers: {
      Authorization: `Client-ID ${clientID}`,
    },
    processData: false,
    mimeType: 'multipart/form-data',
    contentType: false,
    data: file[0],
  };

  $.ajax(settings).done(function(res) {
    //If the request is complete, the response will be the URL of uploaded image
    let response = JSON.parse(res);

    let {data} = response;
    let {link} = data;

    resolve(link);
  });
}

function getSelectedValues(selectorObject) {
  let selectorOptions = selectorObject.$selectOptions;

  let selectedOption = selectorOptions.filter(
    (option) => option.selected === true,
  );

  return selectedOption[0].value;
}
