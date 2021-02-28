function readTitle() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const title = tabs[0].title;
    const url = new URL(tabs[0].url);
    const result = title + ' - ' + url.host;
    document.getElementById('title').innerHTML = result;
    console.log(result);
  });
}

function sendMessageToBackground() {
  chrome.runtime.sendMessage(
    {
      type: 'setBadgeText',
      data: 'Hi',
    },
    function (callbackData) {
      console.log('Message sent to background from popup page.', callbackData);
    }
  );
}

function openTab(url) {
  chrome.tabs.create({ url });
}

function sendTestApiRequestFromPopup() {
  const url = 'https://www.google.com';
  $.ajax({
    url,
    method: 'GET',
  }).done(function (response) {
    console.log(response);
  });
}

//Send message to content.js and then content.js will send a request to your API.
function sendTestApiRequestFromContentjs() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: 'sendXhrRequest' },
      function (callbackData) {
        console.log('Message sent to content.js from popup.', callbackData);
      }
    );
  });
}

function injectHtmlInContent() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'injectHtml' });
  });
}
