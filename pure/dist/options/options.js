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

function saveOption(option) {
  setStorage('option', option).then(() => {});
  loadSelectedOption();
  notify('Options is saved.');
}

function sendMessageToBackground() {
  chrome.runtime.sendMessage({
    type: 'setBadgeText',
    data: 'Hi',
  });

  notify('Message is sent to background.js');
}

function notify(message) {
  alert(message);
  // $('.toast').toast({ autohide: true, delay: 500 });
}
// const loadWelcomeMessage = async () => {
//   const installed = await storageUtil.isInstalled();

//   if (!installed) {

//     chrome.runtime.sendMessage({
//       type: 'showDialog',
//       data: dialog,
//     });
//     storageUtil.setIsInstalled();
//   }
// };

function loadSelectedOption() {
  getStorage('option').then(function (value) {
    $.each($('input[name="options"]'), function (index, value) {
      $(value).parent().removeClass('active');
    });

    var seletedOption = $('input[name="options"][value="' + value + '"]');

    if (seletedOption.length > 0) {
      $(seletedOption[0]).parent().addClass('active');
    }
  });
}

function load() {
  //load event listeners for options
  $('input[name="options"]').on('change', function (e) {
    saveOption(e.target.value);
  });

  loadSelectedOption();

  $('#button-send-message').on('click', function () {
    sendMessageToBackground();
  });
}

$(document).ready(function () {
  load();
});

// chrome.runtime.sendMessage({
//   type: 'openAuthRedirectUrl',
// });
