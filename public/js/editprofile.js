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

    //If file exist and already selected
    if (fileProfilePic.length) {
      // Reject big files
      if (fileProfilePic[0].size > $(this).data('max-size') * 1024) {
        console.log('Please select a smaller file');
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

        $.post('actions/updateUserInfo.php', data, (res) => {
          let response = JSON.parse(res);

          if (response.status === 'ok') {
            modalLoading.close();
            Swal.fire('Success!', 'Profile has been updated!', 'success');
          }
        });
      });
    } else {
      //Do something when no profile pic is chosen
      modalLoading.close();
    }
  });
});

function uploadImage(resolve, reject, fileProfilePic) {
  console.log(fileProfilePic);
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
    data: fileProfilePic[0],
  };

  $.ajax(settings).done(function(res) {
    //If the request is complete, the response will be the URL of uploaded image
    let response = JSON.parse(res);

    let {data} = response;
    let {link} = data;

    resolve(link);
  });
}
