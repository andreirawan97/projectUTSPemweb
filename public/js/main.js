document.addEventListener('DOMContentLoaded', function() {
  var elemsModal = document.querySelectorAll('.modal');
  var instancesModal = M.Modal.init(elemsModal);
});

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
      let {userID} = JSON.parse(localStorage.getItem('goSocial'));

      let data = {
        userID: userID,
        status: status,
        currentTimestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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

  $('#formReplyComment').submit((e) => {
    e.preventDefault();

    let message = $('#inputTextComment')
      .val()
      .trim();

    if (message === '') {
      Swal.fire('Error', 'Cannot be empty!', 'error');
    } else {
      let {userID} = JSON.parse(localStorage.getItem('goSocial'));

      let data = {
        userID: userID,
        postID: $('#postID').val(),
        message: message,
        timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      };

      $.post('actions/postComment.php', data, (res) => {
        let response = JSON.parse(res);

        if (response.status === 'ok') {
          refreshComment();
        }
      });
    }
  });

  let dataLocalStorage = JSON.parse(localStorage.getItem('goSocial'));
  if (dataLocalStorage) {
    let {userID, isLogin} = dataLocalStorage;
    checkIsLogin(isLogin);
    fetchUserInfo(userID);
    fetchUserFeeds(userID);
    fetchRecentlyRegistered();
    fetchProfilePic(userID);
    fetchCoverPic(userID);
  } else {
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
});

function fetchProfilePic(userID) {
  $.post('actions/fetchUserInfo.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);
    let {profilePicURL} = response;

    $('#profilePic').attr('src', profilePicURL);
  });
}

function fetchCoverPic(userID) {
  $.post('actions/fetchUserInfo.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);
    let {coverPicURL} = response;

    $('#navbar').css('background-image', `url('${coverPicURL}')`);
  });
}

function fetchRecentlyRegistered() {
  $.get('actions/fetchRecentlyRegistered.php', (res) => {
    let response = JSON.parse(res);

    response.forEach((obj) => {
      let {id} = obj;

      $('#exploreUser').append(
        `<a href="visit.php?id=${id}"><u>/${id}</u></a><br />`,
      );
    });
  });
}

function fetchUserFeeds(userID) {
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
          }" onClick="viewComment(this)" href="#!" style="color: grey"><i class="material-icons" style="font-size: 15px;">comment</i> comment</a>
        </div>`;

      $('#feedsContainer').append(feedsCard);
    });
  });
}

function refreshComment() {
  let postID = $('#postID').val();

  fetchComment(postID);
  $('#inputTextComment').val('');
}

function fetchComment(postID) {
  $.post('actions/fetchSinglePost.php', {postID: postID}, (res) => {
    let response = JSON.parse(res);
    let {id, fullname, message, timestamp} = response;

    let item = `
      <li class="collection-item avatar" style="padding-bottom: 0px;">
        <img src="images/noImage.png" alt="" class="circle" style="height: 40px; width: 40px;">
        <span class="title">/${id} (${fullname})</span>
        <p>${message}</p>

        <p class="secondary-content" style="color: grey">${moment(
          timestamp,
        ).fromNow()}</p>
      </li>
    `;

    $('#originalPost').html(item);
  });

  $.post('actions/fetchComment.php', {postID: postID}, (res) => {
    let response = JSON.parse(res);
    console.log(response);

    $('#postID').val(postID);
    $('#commentsContainer').html('');
    response.forEach((comment) => {
      let {userID} = JSON.parse(localStorage.getItem('goSocial'));
      let item;
      //If same, make delete comment
      if (userID === comment.id) {
        item = `
          <li class="collection-item avatar" style="padding-bottom: 0px;">
            <img src="images/noImage.png" alt="" class="circle" style="height: 40px; width: 40px;">
            <span class="title"><a href="visit.php?id=${comment.id}">/${
          comment.id
        }</a> (${comment.fullname})</span>
            <p>${comment.message}</p>

            <a id="${
              comment.commentID
            }" onClick="deleteComment(this)" href="#!" style="font-size: 14px; color: #ff1744">delete comment</a>

            <p class="secondary-content" style="color: grey">${moment(
              comment.timestamp,
            ).fromNow()}</p>
          </li>
        `;
      } else {
        item = `
          <li class="collection-item avatar" style="padding-bottom: 0px;">
            <img src="images/noImage.png" alt="" class="circle" style="height: 40px; width: 40px;">
            <span class="title"><a href="visit.php?id=${comment.id}">/${
          comment.id
        }</a> (${comment.fullname})</span>
            <p>${comment.message}</p>

            <p class="secondary-content" style="color: grey">${moment(
              comment.timestamp,
            ).fromNow()}</p>
          </li>
        `;
      }
      $('#commentsContainer').append(item);
    });
  });
}

function viewComment(object) {
  let postID = object.getAttribute('id');

  fetchComment(postID);

  let modalComment = M.Modal.getInstance(
    document.getElementById('modalComment'),
  );
  modalComment.open();
}

function deleteComment(object) {
  let commentID = object.getAttribute('id');

  $.post('actions/deleteComment.php', {commentID: commentID}, (res) => {
    let response = JSON.parse(res);

    if (response.status === 'ok') {
      refreshComment();
    }
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
    let {id, email, fullname} = response;

    $('#fullName').html(fullname);
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
