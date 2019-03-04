$(document).ready(() => {
  let userID = getUrlParameter('id');
  fetchUserInfo(userID);
  fetchUserFeeds(userID);

  $('#btnGoHome').click(() => {
    location.href = 'main.php';
  });
});

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
          <a href="#!"><i class="material-icons" style="font-size: 15px;">comment</i> comment</a>
        </div>`;

      $('#feedsContainer').append(feedsCard);
    });
  });
}

function fetchUserInfo(userID) {
  $.post('actions/fetchUserInfo.php', {userID: userID}, (res) => {
    let response = JSON.parse(res);
    let {id, email, fullName} = response;

    $('#fullName').html(fullName);
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
