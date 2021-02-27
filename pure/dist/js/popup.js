function readTitle() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const title = tabs[0].title;
    document.getElementById('title').innerHTML = title;
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
