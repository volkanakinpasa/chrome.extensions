# Manifest (manifest.json)

### Manifest Version

Manifest version is 2. this should not be changed unless you want to upgrade it to 3. It's a major upgrade. some functionalities might not work.

### Short Name & Description

<code>short_name</code> = Maximum of 12 characters recommended)

<code>description</code> = No HTML or other formatting; no more than 132 characters

### Permissions

<code>permissions</code>:

* "<code>activeTab</code>" grants temporary access to the site the user is currently on. 
* "<code>storage</code>" grants the extension access to the store.
* "<code>\*://\*/\*</code>" works while you open any website. if you wish your extension to work on only one website ie YouTube, you must define like <code>"\*://\*.youtube.com/\*"</code>. 

The list of permission can be found here https://developer.chrome.com/docs/extensions/mv2/permission_warnings/

### Content Script

<code>content_scripts</code>: Content Scripts run on the web pages user visits. ie. on youtube.com. in our samples contentScript.js and content.css will be loaded on youtube.com.  Add <code>\*://\*.youtube.com/\*</code> in order to run them on every page.

```json
"content_scripts": [
  {
    "matches": ["*://*.youtube.com/*"],
    "js": ["js/contentScript.js"],
    "css": ["css/content.css"]
  }
]
```

### Web Accessible Resources

<code>web_accessible_resources</code>: are expected to be usable in the context of a web page. For instance, if you want to load an image on youtube, you must define image file path and name here in a string. in the following case we give access to the folder that means whatever you add inside the folder can be accessible from Content page.

### Background Script
<code>background</code>: is for listening events & messages in background.

<code>browser_action</code>: provides popup page in any case you use a popup page.

<code>icons</code>: provides the path and names of the icons within different sizes.

<code>externally_connectable</code>: if you have an API and want to connect to it via content page/extension, you need to define the matched domain here.

<code>options_page</code>: options page helps you to create a page where you can build a setting/configuration page, you may keep user configuration via options page, etc.
