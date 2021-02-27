function getStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (data) => {
      resolve(data[key]);
    });
  });
}

function setStorage(key, value) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      resolve();
    });
  });
}

function sendMessageToBackground() {
  chrome.runtime.sendMessage(
    {
      type: 'setBadgeText',
      data: 'Hi',
    },
    function (callbackData) {
      console.log('Message sent to background.', callbackData);
    }
  );

  notify('Message is sent to background.js');
}
