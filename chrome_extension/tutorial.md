# Introduction
Have you ever wanted to build your own extension for Google Chrome but wasn't sure when to start? We're going to be building a simple extension that saves the text you highlight with your cursor!
## Setting Up Files
Let's get started by talking about all the files we'll need to create and understanding their purpose. In a new folder, create the following files:

* manifest.json
* popup.html
* popup.js
* background.js
* main.css

Wow, so there are actually a number of files that go into this. We're going to dive into each file's purpose as we go through the project. 

### Getting an Icon
One other file you'll need is an icon. If you want to make your own then check out [Figma](https://www.figma.com/), otherwise download the same icon I created from my repository [here](https://github.com/maximgeller/projects/blob/master/chrome_extension/img/icon48.png?raw=true). Add it to the same folder as the other files.

# Writing the Manifest and HTML
The first thing we'll need to do is write the "manifest" of the extension. This JSON file tells Google Chrome a lot of information about your extension: what it does, what permissions it needs, any icons used, and what scripts it runs. Next, we'll create an html page that we want to display in the popup when you click its icon in the toolbar. After this, we'll have a minimum working product we can look at!
## manifest.json
Okay, let's actually write some code. Open up the `manifest.json` file and put in this info:
```json
{
"manifest_version": 2,
"name": "Easy Text Saver",
"version": "1.0",
"description": "Paste your highlighted text into a file from anywhere on the web.",
"permissions": [
	"activeTab",
	"storage"
],
"icons": {
	"48" : "icon48.png"
},
"browser_action": {
	"default_icon": "icon48.png",
	"default_popup": "popup.html",
	"default_title": "Easy Text Saver"
},
"background": {
	"scripts": [
		"background.js"
	],
	"persistent": false
	}
}
```
This is a lot, so let's focus on a few things. Notice that the permissions for this tab are `activeTab` and `storage`. We need the extension to be able to access the tab you'll be using it on in order to display anything. We need access to the browser's storage to save the items you put in it!
For icons, I chose to make the default icon 48 px by 48 px. You can play around with making it another common size like 128px.
## popup.html
# JavaScript & The Chrome API
![Chrome extension architecture](https://github.com/maximgeller/projects/blob/master/chrome_extension/img/popuparc.png?raw=true)
[Source](https://developer.chrome.com/extensions/overview)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgzOTYxNDczOSw0ODU3NzQ3MjQsMTk4Nj
kzNzA3OF19
-->