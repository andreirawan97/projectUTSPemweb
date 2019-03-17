/**
 * NOTE:
 * 1. Maksud dari () => {} itu sama aja kayak function(){}
 */

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {
    dismissible: false,
  });
  var elemsSelect = document.querySelectorAll('select');
  var instancesSelect = M.FormSelect.init(elemsSelect);
});

$(document).ready(() => {
  //On press button FAB
  $('#fabSubmitForm').click(() => {
    // Invoke loading modal
    let modalLoading = M.Modal.getInstance(
      document.getElementById('modalLoading'),
    );
    modalLoading.open();

    let fileProfilePic = $('#ppFile').get(0).files;
    let fileCoverPic = $('#cpFile').get(0).files;
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
          };

          $.post('actions/updateUserInfo.php?type=all', data, (res) => {
            let response = JSON.parse(res);

            if (response.status === 'ok') {
              modalLoading.close();
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
          };

          $.post('actions/updateUserInfo.php?type=profilePic', data, (res) => {
            let response = JSON.parse(res);

            if (response.status === 'ok') {
              modalLoading.close();
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
          };

          $.post('actions/updateUserInfo.php?type=coverPic', data, (res) => {
            let response = JSON.parse(res);

            if (response.status === 'ok') {
              modalLoading.close();
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
    }
  });
});

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
