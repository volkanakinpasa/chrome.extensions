function load() {
  readTitle();

  $('#button-send-message').on('click', function () {
    sendMessageToBackground();
  });

  $('#button-open-tab').on('click', function () {
    openTab('https://www.google.com/');
  });
}

$(document).ready(function () {
  load();
});
