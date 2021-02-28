console.log('content script');

//Listens message from background page or from popup page
//message: any type, string, number, json object...
//sender: message sender
//sendResponse: is a callback function
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message) {
    if (message.type == 'sayHi') {
      console.log('hello', { data: message.data });
      sendResponse('done'); //this could be a any type, string, number, json object...
    } else if (message.type == 'showAlert') {
      alert('hello');
      sendResponse('done'); //this could be a any type, string, number, json object...
    } else if (message.type == 'sendXhrRequest') {
      sendTestApiRequest().then(function (data) {
        sendResponse(data);
      });
      return true;
    } else if (message.type == 'injectHtml') {
      injectHtml();
    }
  }
});

function injectHtml() {
  //EXAMPLE 4 - Add feedback text in DOM
  const footerName = 'chrome-template-footer';
  const container = window.document.createElement('div');
  container.id = footerName;
  container.className = footerName;
  container.innerHTML = 'Feedback';
  window.document.body.appendChild(container);
  // remove it in 10 seconds.
  setTimeout(() => {
    window.document.body.removeChild(container);
  }, 4000);
}

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
};

function sendTestApiRequest() {
  //this domain api url has to match with domain you entered in externally_connectable in manifest.json.
  //You must be aware of that your API might respond CORS origin within an error. In your API, You might need to give access to the domain where your content.js runs.
  //For instance, if you want to call your API from youtube.com, you need to give access to youtube.com in your API.

  return new Promise(function (resolve, reject) {
    try {
      const url =
        'https://api.github.com/repos/volkanakinpasa/chrome.extensions.docs';
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    } catch (err) {
      reject(err);
    }
  });
}

window.addEventListener('load', onLoad, false);
