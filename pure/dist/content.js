console.log('content.js');

//Listens message from background page or from popup page
//message: any type, string, number, json object...
//sender: message sender
//sendResponse: is a callback function
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  log('Got message from background page or : ' + msg);
  if (message != undefined) {
    if (message.type == 'sayHi') {
      log('hello', { data: message.data });
      sendResponse('said hi'); //this could be a any type, string, number, json object...
    } else if (message.type == 'showAlert') {
      alert('hello');
      sendResponse('alerted'); //this could be a any type, string, number, json object...
    }
  }
});

const onLoad = () => {
  //EXAMPLE 1
  //folder webAccessibleResources is define in web_accessible_resources in manifest.json
  var imgURL = chrome.runtime.getURL('webAccessibleResources/spotify.png');
  console.log('content.js', { imgURL });

  //EXAMPLE 2
  //listen event
  // For some reason, "resize" doesn't seem to work with addEventListener.
  if (window == window.top && document.body && !document.body.onresize) {
    document.body.onresize = function (event) {
      console.log('resize: ', { event });
    };
  }

  //EXAMPLE 3
  console.log('Title: ', document.title);

  //EXAMPLE 4 - Add feedback text in DOM
  const footerName = 'chrome-template-footer';
  const container = window.document.createElement('div');
  container.id = footerName;
  container.className = footerName;
  container.innerHTML = 'Feedback';
  window.document.body.appendChild(container);
  //remove it in 10 seconds.
  setTimeout(() => {
    window.document.body.removeChild(container);
  }, 10000);
};

window.addEventListener('load', onLoad, false);
