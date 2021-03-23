# Content Script

## How to send a message object to Background Script

Send a message from Content Script to Background Script

```javascript
chrome.runtime.sendMessage({
  type: 'setBadgeText',
  data: 'Hi',
});
```

Note: The fields `type` and `data` are custom fields. You are free to add any field names instead.

In order to listen this message in Background Script click here [How to listen message in Background Script](background?id=how-to-listen-message-in-background-script)

## How to listen message in Content Script

in this senario, once you send a message from Background Script, can listen it here

```javascript
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    ...
    case 'showAlertInContenScript':
      ...
      alert('Message is here');
      console.log('Message data:', message.data)
      break;
    ...
  }
});
```

Note: The fields `type` and `data` are custom fields. You are free to add any field names instead.

## How to inject an html/css in DOM

## How to send an XHR request to your API

Let's say your extension needs to interact with your your API by sending GET, POST, PUT, DELETE requests.

First of all, you must add your API domain in manifest.json file as <code>externally_connectable</code> (if you don't need api interaction, please remove this line in manifest.json and skip this part)

```json
 "externally_connectable": { "matches": ["*://*.your-api-domain.com/*"] }
```

then, in content.js

```javascript
const url =
  'https://api.github.com/repos/volkanakinpasa/chrome.extensions.docs';

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(xhttp.responseText);
  }
};
xhttp.open('GET', url, true);
xhttp.send();
```

You must be aware of that your API might respond CORS origin within an error. In your API, You might need to give access to the domain where your content.js runs. For instance, if you want to call your API from youtube.com, you need to give access to youtube.com in your API.
