# Options Page

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

then, in javascript file

```javascript
chrome.storage.sync.set({ key: value }, function () {
  console.log('Value is set to ' + value);
});
chrome.storage.sync.get(['key'], function (result) {
  console.log('Value currently is ' + result.key);
});
```

## How to send a message object to Background Script from Option Page

```javascript
//options.js >> send message
chrome.runtime.sendMessage({
  type: 'setBadgeText',
  data: 'Hi',
});
```

And [How to listen this message in Background Script](background?id=how-to-listen-message-in-background-script)

Note: The fields `type` and `data` are custom fields. You are free to add any field names instead.

Debug: in order to debug the message in Background Script, right click on the extension > "Manage Extensions" > under "Inspect views" click on "background page".
