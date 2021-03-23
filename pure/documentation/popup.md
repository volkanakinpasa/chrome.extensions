# Popup Page

## How to read the title of the current page

in this senario, it reads the title of the current window and active tab. for instance, if you are browsing YouTube, the title of YouTube will be read.

```javascript
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const title = tabs[0].title;
  console.log(title);
});
```

## How to open a new tab from Popup Page

```javascript
chrome.tabs.create({ url });
```

## How to send a message object to Background Script

Send a message from Popup Page to Background Script. Same approach as Content Script

```javascript
chrome.runtime.sendMessage({
  type: 'setBadgeText',
  data: 'Hi',
});
```

Note: The fields `type` and `data` are custom fields. You are free to add any field names instead.

## How to send a message object to Content Script and send an XHR request to your API

This approach here is slightly different than sending a message to Background Script. You first need to find which window and which tab you should send the message by giving query <code>{ active: true, currentWindow: true }</code>.

Example: Let's say you have two tabs open, one is YouTube and another one is Google and you are currently on the YouTube page. That means your active tab is YouTube. And you want to send a message from Popup Page to YouTube content page.

```javascript
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { type: 'sendXhrRequest' },
    function (callbackData) {
      console.log('Message sent to content.js from popup.', callbackData);
    }
  );
});
```

If the active tab is Google, then you don't need to use <code> {active: true} </code>. instead you can use URL patterns. [More info in google developer page](https://developer.chrome.com/docs/extensions/reference/tabs/#method-query)

In this case it will first sends a message to content.js and then content.js will send an XHR request to your API.

Callback function: Once API responds, content.js pass the data back to Popup Page and you can catch it in this callback function.

To debug the request on Popup Page, right click on Popup Page > "inspect" to see the responded data in console.

To debug and see the XHR request in Conten Page, right click on Content Page(your active page which is YouTube) > "inspect" to see the responded data in console.

Click
[here](content?id=how-to-send-an-xhr-request-to-your-api)
to see how Content Script sends an XHR request to your API.
