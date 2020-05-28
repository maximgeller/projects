
# Introduction
Web development in...*Python*??? Yup, it's true. In this project, we'll be making our very own web app using the [Flask](https://flask.palletsprojects.com/en/1.1.x/) micro-framework and deploying it via the [Google App Engine](https://cloud.google.com/appengine)! By the end of this tutorial, you'll be able to make your own web apps using Python and Flask and share them with your friends to use.
## Dependencies
If you've touched Python and HTML/CSS before, this tutorial is for you. Also, you'll need a Google account for deploying your app and getting a live URL for it. While this is not necessary, it's a really cool way to share what you've built with your friends.
## Intuition
What's the difference between a web app and a static website? Well, a static website is just that, static. The information it is always the same and you can't interact with it. In more technical speak, there is no **back end**. A web app however, does have a back end! It's what we're writing in Python. In this tutorial, our back end will interact with the Google Calendar API to pull the events you have coming up on your calendar and display them to you. Now, your website has a layer of interactivity to it. Every time you'll load the calendar page, it will refresh with the events that are coming up for you. 

# Setting up Flask
First things first, we're going to create a folder that will contain all the files we'll need to have. In your folder, create a file called `main.py`. This is the file that we'll be running to execute all the code you're about to write. In this file, we will first import `flask` and set up the home page of the app.
```python
from flask import Flask
 
app = Flask(__name__)

@app.route("/") # this route is the default one
def home():
	return "My name is Max!"

if  __name__  ==  "__main__":
	app.run(debug=True)
```

This is the bare bones structure of the web app. We set the default landing page to above a function called `home` that just returns a string. At the bottom, you'll see that a conditional that will let the application run only if the script itself, `main.py` is being called. If we tried to import this into another file and call that file's name, our app would not run. Run the script by typing this in your command line:
```bash
python main.py
```
Your terminal will prompt you to navigate t

## Making Our Own Pages
## Add CSS!
# Integrating Google Calendar
# Deploying Your App
## Setting Up Google App Engine
# Appendix
## What's Next?

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjI2MjIxNDM0LDIxNTI5NzIzMSwxODkxOD
YzMTEyLC04MTM0ODgzMjMsMTQ1MjY0ODc4NCwtMTExNDgzODA5
NF19
-->