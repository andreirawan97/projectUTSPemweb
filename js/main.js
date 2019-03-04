$(document).ready(() => {
  $('#btnLogOut').click(() => {
    Swal.fire({
      title: 'Really?',
      text: 'Are you sure want to log out?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ff1744',
      confirmButtonText: "I'm 200% sure!",
    }).then((result) => {
      if (result.value) {
        let oldDataLocalStorage = JSON.parse(localStorage.getItem('goSocial'));

        let dataLocalStorage = {
          ...oldDataLocalStorage,
          isLogin: false,
          userID: '',
        };

        localStorage.setItem('goSocial', JSON.stringify(dataLocalStorage));
        location.href = 'login.php';
      }
    });
  });

  $('#btnSendStatus').click(() => {
    let status = $('#inputTextStatus')
      .val()
      .trim();

    if (status === '') {
      Swal.fire('Error', 'Status cannot be empty', 'error');
    } else {
      let currentTimestamp = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let data = {
        userID: userID,
        status: status,
        currentTimestamp: currentTimestamp,
      };

      $.post('actions/postStatus.php', data, (res) => {
        let response = JSON.parse(res);
        let {status} = response;

        if (status === 'ok') {
          $('#inputTextStatus').val('');
          fetchUserFeeds();
        }
      });
    }
  });

  $('#formVisitUser').submit((e) => {
    e.preventDefault();

    let inputtedUser = $('#inputTextUserSearch')
      .val()
      .trim();

    if (inputtedUser === '') {
      Swal.fire('Error', 'Cannot be empty!', 'error');
    } else {
      location.href = `visit.php?id=${inputtedUser}`;
    }
  });

  let dataLocalStorage = JSON.parse(localStorage.getItem('goSocial'));
  let {userID, isLogin} = dataLocalStorage;
  checkIsLogin(isLogin);
  fetchUserInfo(userID);
  fetchUserFeeds();
});

function fetchUserFeeds() {
  let {userID} = JSON.parse(localStorage.getItem('goSocial'));

  $.post('actions/fetchFeeds.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);

    // Reset the container
    $('#feedsContainer').html('');

    response.forEach((data) => {
      let fromNow = moment(data.timestamp).fromNow();

      let feedsCard = `     
        <div class="card" style=" padding: 5px 20px 15px 20px">
          <div class="row" style="margin-bottom: 0px; padding-bottom: 0px">
            <div class="row col s6 valign-wrapper" style="margin-bottom: 0px;">
              <div class="col s3">
                <img src="images/noImage.png" alt="" class="circle" style="height: 40px; width: 40px;">      
              </div>
              <div class="col s9">
                <p style="font-size: 20px">${data.fullName}</p>
              </div>
            </div>
            <div class="col s6">
              <a id="${
                data.postID
              }" onClick="deletePost(this)" href="#!" style="float: right; padding-top: 13px; padding-left: 8px;">
                <i style="font-size: 24px; color: grey;" class="material-icons">delete</i>
              </a>
              <p style="float: right; color: grey">${fromNow}</p>
            </div>
          </div>
          <p id="cardContent" style="margin-top: 0px">${data.message}</p>
          <div class="divider" style="margin-bottom: 12px;"></div>
          <a id="${
            data.postID
          }" href="#!" style="color: grey"><i class="material-icons" style="font-size: 15px;">comment</i> comment</a>
        </div>`;

      $('#feedsContainer').append(feedsCard);
    });
  });
}

function checkIsLogin(isLogin) {
  if (!isLogin) {
    Swal.fire({
      title: 'Who are you???!!!!!',
      text: 'You need to sign in first!',
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Oh, sorry!',
    }).then((result) => {
      if (result.value) {
        location.href = 'login.php';
      }
    });
  }
}

function fetchUserInfo(userID) {
  $.post('actions/fetchUserInfo.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);
    let {id, email, fullName} = response;

    $('#fullName').html(fullName);
    $('#email').html(email);
  });
}

function deletePost(object) {
  Swal.fire({
    title: 'Are you sure??',
    text: 'You cannot revert this action!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff1744',
    confirmButtonText: 'YES!!!',
  }).then((result) => {
    if (result.value) {
      let postID = object.getAttribute('id');

      $.post('actions/deleteStatus.php', {postID: postID}, (res) => {
        let response = JSON.parse(res);

        if (response.status === 'ok') {
          fetchUserFeeds();
        }
      });
    }
  });
}
