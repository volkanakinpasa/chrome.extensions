'use strict';

function setBadgeText(text) {
  //you must add browser_action in manifest.json.
  //manigest.json > "browser_action": { "default_title": "Chrome Template" },
  chrome.browserAction.setBadgeText({ text });
  setTimeout(() => clearBadge(), 5000);
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
    console.log('Storage is set');
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
    openTab('http://localhost:8080/installed');
  } else if (details.reason == 'update') {
    console.log('onInstalled listener > extension is updated');
    setBadgeText('Thnx');
  }
});

// function showDialog(messag) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { ...message, type: 'showDialog' },
//       function (response) {}
//     );
//   });
// }

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case 'onContentPageLoad':
      console.log(
        'onMessage Listener > "onContentPageLoad" > Content page is loaded.',
        message.data
      );
      break;
    case 'setBadgeText':
      console.log('onMessage Listener > "setBadgeText" > Message is recieved.');
      setBadgeText(message.data);
      break;
  }
});

chrome.runtime.setUninstallURL(`http://localhost:8080/uninstalled`);

// chrome.storage.onChanged.addListener(function (changes, namespace) {

//   for (const key in changes) {
//     const storageChange = changes[key];
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {
//         type: 'storageOnchangeComplete',
//         data: {
//           key,
//           namespace,
//           oldValue: storageChange.oldValue,
//           newValue: storageChange.newValue,
//         },
//       });
//     });
//   }
// });

// //send message to the current tab(context.js)
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   chrome.tabs.sendMessage(
//     tabs[0].id,
//     { type: 'sayHi', data: { name: 'John' } },
//     function (response) {}
//   );
// });
