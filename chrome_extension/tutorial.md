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
The first thing we'll need to do is write the "manifest" of the extension. This JSON file tells Google Chrome a lot of information about your extension: what it does, what permissions it needs, and what scripts it runs. Next, we'll create an html page that we want to display in the popup when you click its icon in the toolbar. After this, we'll have a minimum working product we can look at!
## manifest.json
Okay, let's actually write some code. 
## popup.html
# JavaScript & The Chrome API
![Chrome extension architecture](https://github.com/maximgeller/projects/blob/master/chrome_extension/img/popuparc.png?raw=true)
[Source](https://developer.chrome.com/extensions/overview)

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDg1Nzc0NzI0LDE5ODY5MzcwNzhdfQ==
-->