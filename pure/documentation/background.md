# Background Script

### (background.js)

## How to debug

Debug: in order to debug the message in Background Script, right click on the extension > "Manage Extensions" > under "Inspect views" click on "background page".

## How to listen if the extension is installed/updated

```javascript
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install') {
    console.log('onInstalled listener > extension is installed');
    //you can open a new link, open options page, set badge text etc.
    chrome.tabs.create({url: `chrome-extension://${chrome.runtime.id}/options/options.html`});
    ...
  } else if (details.reason == 'update') {
    console.log('onInstalled listener > extension is updated');
    //you can open a new link, open options page, set badge text etc.
    chrome.tabs.create({url: `chrome-extension://${chrome.runtime.id}/options/options.html`});
    ...
  }
});
```

## How to open a url when the extension is uninstalled

```javascript
chrome.runtime.setUninstallURL(`[URL]`);
```

## How to open a new tab from Background Script

```javascript
chrome.tabs.create({
  url: 'https//www.google.com',
});
```

## How to set badge background color and text

First of all you must register Browser Action in manifest.json

```json
...
"browser_action": { "default_title": "Chrome Template" },
...
```

Then, in Background Script

```javascript
//set text
chrome.browserAction.setBadgeText(details: object, callback: function);
//sample
chrome.browserAction.setBadgeText({ text: 'Hi' }, function(){...});
//sample to clear badge
chrome.browserAction.setBadgeText({ text: '' }, function(){...});

//set background color
chrome.browserAction.setBadgeBackgroundColor(details: object, callback: function);
//sample
chrome.browserAction.setBadgeBackgroundColor({color: '#f00'}, function(){...});
```

Then, you will see

![Badge text & background color](assets/badge.png)

## How to listen message in Background Script

```javascript
//background.js >> add listener
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    ...
    case 'setBadgeText':
      ...
      //set badge
      chrome.browserAction.setBadgeText({ text: message.data });
      break;
    ...
  }
});
```

Note: The fields `type` and `data` are custom fields. You are free to add any field names instead.

## How to save an object into storage

First of all you must add storage permission in manifest.json file

```json
//manifest.json
{
...
"permissions": [ "storage" ],
...
}
```

Then, in javascript file

```javascript
// 'key' can be string you wish. ie. 'install_date', 'modified_date', 'default_search_engine' etc.
chrome.storage.sync.set({ key: value }, function () {
  console.log('Value is set to ' + value);
});
chrome.storage.sync.get(['key'], function (result) {
  console.log('Value currently is ' + result.key);
});
```

## How to listen on storage change

```javascript
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (const key in changes) {
    const storageChange = changes[key];
    console.log('storage has been updated', storageChange);
  }
});
```
