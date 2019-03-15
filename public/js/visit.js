document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

$(document).ready(() => {
  let userID = getUrlParameter('id');
  fetchUserInfo(userID);
  fetchUserFeeds(userID);
  fetchProfilePic(userID);

  $('#btnGoHome').click(() => {
    location.href = 'main.php';
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
});

function fetchProfilePic(userID) {
  $.post('actions/fetchUserInfo.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);
    let {profilePicURL} = response;

    $('#profilePic').attr('src', profilePicURL);
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

function deleteComment(object) {
  let commentID = object.getAttribute('id');

  $.post('actions/deleteComment.php', {commentID: commentID}, (res) => {
    let response = JSON.parse(res);

    if (response.status === 'ok') {
      refreshComment();
    }
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

function viewComment(object) {
  let postID = object.getAttribute('id');

  fetchComment(postID);

  let modalComment = M.Modal.getInstance(
    document.getElementById('modalComment'),
  );
  modalComment.open();
}

function fetchUserInfo(userID) {
  $.post('actions/fetchUserInfo.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);

    if (response.status === 'err') {
      location.href = 'errorpage.php';
    }

    let {id, email, fullname} = response;
    $('#fullName').html(fullname);
    $('#email').html(email);
  });
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
}
