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
For icons, I chose to make the default icon 48 px by 48 px. You can play around with making it another common size like 128 px. 
`browser_action` tells Chrome that this extension should come up in your toolbar and it has a popup that should be read from `popup.html`.
Finally, `background` refers to the scripts running in the background of the extension. `persistent` is set to `false` because this `background.js` does not need to be constantly running.
## popup.html
Cool, let's make our html page for the extension popup. After this, we'll be able to load it in and see what it is going to look like! Some things we want to do in this file is make sure we leave a space where we want to inject JavaScript into the popup and also set up a `div` tag for where we want the cursor-selected text to go. We're also going to set up a link to our `main.css` stylesheet, but we won't worry about touching it until the extension is functioning. Here's the code for `popup.html`
```html
<!DOCTYPE html>
<html>
	<head>
		<meta  charset="utf-8" />
		<title>Easy Text Saver</title>
		<link  rel="stylesheet"  type="text/css"  href="main.css" />
		<script  src="popup.js"></script>
	</head>
	<body>
		<div id="popup-body">
		<h2>Easy Text Saver</h2>
		<h3>Here is your saved text!</h3>
		<div id="output"></div>
		</div>
	</body>
</html>
```

## Loading and Viewing Your Extension
Awesome, now we are going to take a quick look at how the extension looks in our browser. In order to do this, go to [chrome://extensions](chrome://extensions) and flip the developer mode toggle on. Now, you'll see the option to load unpacked extensions. Select that and load the folder that contains all the files we've created. You should now be able to see the icon in your toolbar! Click on it and see what opens up. Not much, right? Let's fix that.
#### Aside
Note that whenever you change `manifest.json` you will have to remove and reload the extension in order for the changes to take effect. Your other changes will either take effect automatically or by clicking the update button in the extensions menu.

# JavaScript & The Chrome API
## Extension Architecture
We need to JavaScript files to make this extension work. The first one is `popup.js`and this file contains the JavaScript we want to inject into `popup.html`. This will be the text that gets selected by your cursor! It also has to communicate with `background.js` in order to store the text that will get displayed in the popup. Take a look at the overview of the architecture in this image.
![Chrome extension architecture](https://github.com/maximgeller/projects/blob/master/chrome_extension/img/popuparc.png?raw=true)
[Source](https://developer.chrome.com/extensions/overview)

We're going to utilize Chrome's API in order to allow the different files to send messages to each other and store text in the browser's storage. 
## Calling The Text With popup.js
We're going to start by creating a function in `popup.js` that gets the text you select with your cursor. Let's do this by creating a script that executes when the tab you're on loads.
```javascript
window.onload  =  function() {
}
```
Great! Let's use the Chrome API to enter the code that will grab our text for us.
```javascript
window.onload  =  function() {
	chrome.tabs.executeScript( {
	code: "window.getSelection().toString();"
	}
	)};
```
The next part of the function we are going to need to define is the part that will send the text to `background.js` in order to be stored by Chrome. We need another function that takes the selected text as a parameter in order to send it. After that, we'll start working on fleshing out `background.js`.
```javascript
window.onload  =  function() {
	chrome.tabs.executeScript( {
	code: "window.getSelection().toString();"
	}, function(selection) {
	chrome.runtime.sendMessage({selection: selection[0]}, function(response) {
	document.getElementById("output").innerHTML  =  null;	
	});
});
};
```
Okay, we did a lot here. First we defined a function that sends a message that contains the highlighted text. Then we defined a function that contains the response *from* `background.js` that will contain the array of all clipped text. Right now this is set to `null` because we haven't actually encoded yet what the response is equal to. However, we know we will want to set it to be located under the `div` with `id="output"`. 

## Writing background.js
Let's write our `background.js` code now. This piece of code is going to wait until it gets a request from `popup.js` before adding the `selection` text to the list (we'll call it `clippings`).
```javascript
// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	let clippings = [];
	
});
```
Sweet. Now we're going to use the chrome API to call the array of text that might already be present in `clippings` and add the text we've selected to it. We'll use conditionals here: we want to know if the user selected test and if text is already present, or if the user didn't select anything and wants to see what was stored, or if this is the first addition to the page.
```javascript
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	let clippings = [];
	chrome.storage.sync.get("list", function (result) {
		if (request.selection && result.list) {
			clippings = [...result.list, request.selection];
		} else if (result.list) {
			clippings = [...result.list];
		} else {
			clippings = [request.selection];
		}
	});
});
```
Awesome, the last thing we need to do in this function is send a response *back* to `popup.js` with the array in `clippings`.
```javascript
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	let clippings = [];
	chrome.storage.sync.get("list", function (result) {
		if (request.selection && result.list) {
			clippings = [...result.list, request.selection];
		} else if (result.list) {
			clippings = [...result.list];
		} else {
			clippings = [request.selection];
		}
		sendResponse({clips: clippings});
		chrome.storage.sync.set({
			list: clippings,
		});
	});
	return true
});
```
The code we've added sends a response in the form of key-value pair `clips: clippings`. Remember how we set the result of the text earlier to `null` in `popup.js`? Let's fill it in!
```javascript
// popup.js replacing null
document.getElementById("output").innerHTML  =  response.clips;
```
We're calling response and asking for `clips` which maps to the array `clippings` of all the clipped text. Now it gets appended to the div and is visible in the popup. Try it out!!

## Wait, What About Removing Text?
You probably quickly noticed a flaw after using this clipper. You can't delete text! Let's make a few changes to our JavaScript files to make this possible. 
First, we modify `popup.js` to clear all saved text in the array when we click on it. We can use `addEventListener` and tell it to wait for the text to get clicked on. When this happens, it will send a message to `background.js` to return an empty array and update the extension!
```javascript
// popup.js
window.onload  =  function() {
	chrome.tabs.executeScript( {
	code: "window.getSelection().toString();"
	}, function(selection) {
	chrome.runtime.sendMessage({selection: selection[0]}, function(response) {
	document.getElementById("output").innerHTML  =  response.clips;	
	});
});
var text = document.getElementById("output")

text.addEventListener("click", function(e) { 
	chrome.runtime.sendMessage({empty: "clear"}), function(response) {
	text.innerHTML = response.clips;
	});
});
};
```
Now we go back to `background.js` and tell the conditional statements to send back an empty array it receives the message to `clear`.
```javascript
// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	let clippings = [];
	chrome.storage.sync.get("list", function (result) {
		if (request.empty == "clear
		if (request.selection && result.list) {
			clippings = [...result.list, request.selection];
		} else if (result.list) {
			clippings = [...result.list];
		} else {
			clippings = [request.selection];
		}
		sendResponse({clips: clippings});
		chrome.storage.sync.set({
			list: clippings,
		});
	});
	return true
});
```

# Styling with CSS
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NDQxMzgzNzgsMzI3OTA1ODQzLDM5Mj
I0OTIyNSw1NDkxNzAwMTYsLTM4OTQ2OTUwOCwtNTE2MzU0NjE4
LDQ4NTc3NDcyNCwxOTg2OTM3MDc4XX0=
-->