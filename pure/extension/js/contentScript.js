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
      loading(true);
      sendTestApiRequest().then(function (data) {
        setTimeout(function () {
          sendResponse(data);
          loading(false);
        }, 2000);
      });
      return true;
    } else if (message.type == 'injectHtml') {
      injectHtml();
    } else if (message.type == 'readGoogleImageElement') {
      console.log({ message, sender, sendResponse });
      readGoogleImageElement(sendResponse);
    }
  }
});

function injectScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.onload = function () {
    // remote script has loaded
  };
  script.src = 'https://...';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function injectHtml() {
  //EXAMPLE 4 - Add feedback text in DOM
  const footerName = 'chrome-template-footer';
  const container = window.document.createElement('div');
  container.id = footerName;
  container.className = footerName;
  container.innerHTML =
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/QHDRRxKlimY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  window.document.body.appendChild(container);
  // remove it in 10 seconds.
  setTimeout(() => {
    window.document.body.removeChild(container);
  }, 4000);
}

const loadingElementId = 'chrome-template-loading';
function injectLoading() {
  //EXAMPLE 4 - Add feedback text in DOM
  const container = window.document.createElement('div');
  container.id = loadingElementId;
  container.className = loadingElementId;
  var imgURL = chrome.runtime.getURL('webAccessibleResources/loading.gif');
  container.innerHTML =
    `<img src="` +
    imgURL +
    `" width="100" height="100"/>
  `;
  window.document.body.appendChild(container);
}

function readGoogleImageElement(sendResponse) {
  if (
    location.host == 'www.google.com' &&
    location.href.indexOf('/search?q') == -1
  ) {
    const img = document.querySelector('.lnXdpd');
    if (img) {
      sendResponse(img.src);
    }
    sendResponse(null);
  } else sendResponse(null);
}

const onLoad = () => {
  //EXAMPLE 1
  //folder webAccessibleResources is define in web_accessible_resources in manifest.json
  var imgURL = chrome.runtime.getURL('webAccessibleResources/loading.png');
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

  injectLoading();
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

function loading(active) {
  const loading = document.getElementById(loadingElementId);
  if (active == true) loading.classList.add('chrome-template-loading-show');
  else loading.classList.remove('chrome-template-loading-show');
}

window.addEventListener('load', onLoad, false);
