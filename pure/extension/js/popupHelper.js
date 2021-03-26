function load() {
  readTitle();
  readGoogleImageElement();

  $('#button-send-message').on('click', function () {
    sendMessageToBackground();
  });

  $('#button-open-tab').on('click', function () {
    openTab('https://www.google.com/');
  });

  $('#button-send-xhr-request').on('click', function () {
    sendTestApiRequestFromPopup();
  });

  $('#button-send-xhr-request-from-contentjs').on('click', function () {
    sendTestApiRequestFromContentjs();
  });

  $('#button-inject-html-in-content').on('click', function () {
    injectHtmlInContent();
  });
}

$(document).ready(function () {
  load();
});
