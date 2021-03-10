'use strict';

function setBadgeText(text) {
  //you must add browser_action in manifest.json.
  //manigest.json > "browser_action": { "default_title": "Chrome Template" },
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color: '#f00' });
  setTimeout(() => clearBadge(), 10000);
  console.log('A text is set to badge');
}

function clearBadge() {
  chrome.browserAction.setBadgeText({ text: '' });
  console.log('The text is removed from badge');
}

function setStorage(data) {
  //you must add storage permission in manifest.json.
  //manigest.json > "permissions": [storage]
  chrome.storage.sync.set(data, function () {
    console.log('Storage is set', data);
  });
}

//opens a new tab on your Chrome
function openTab(url) {
  chrome.tabs.create({
    url,
  });
}

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install') {
    console.log('onInstalled listener > extension is installed');
    setStorage({ key: 'value' });
    openTab(`chrome-extension://${chrome.runtime.id}/options.html`);
  } else if (details.reason == 'update') {
    console.log('onInstalled listener > extension is updated');
    setBadgeText('Up!');
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case 'onContentPageLoad':
      console.log(
        'onMessage Listener > "onContentPageLoad" > Content page is loaded.',
        message.data
      );
      sendResponse('Done');
      break;
    case 'setBadgeText':
      console.log('onMessage Listener > "setBadgeText" > Message is recieved.');
      setBadgeText(message.data);
      sendResponse('Done');
      break;
    case 'storageOnchangeComplete':
      console.log('storage has been updated', message.data);
      break;
  }
});

chrome.runtime.setUninstallURL(
  `https://media.giphy.com/media/kqu0JnieiuhGw/source.gif`
);

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (const key in changes) {
    const storageChange = changes[key];
    console.log('storage has been updated', storageChange);
  }
});
