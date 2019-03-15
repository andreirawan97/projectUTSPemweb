/**
 * NOTE:
 * 1. Maksud dari () => {} itu sama aja kayak function(){}
 */

$(document).ready(() => {
  //On press button FAB
  $('#fabSubmitForm').click(() => {
    //TODO: Update ke DB

    let fileProfilePic = $('#ppFile').get(0).files;
    console.log(fileProfilePic);
    //If file exist and already selected
    if (fileProfilePic.length) {
    }
  });
});
