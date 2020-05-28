
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

This is the bare bones structure of the web app. We set the default landing page to above a function called `home` that just returns a string. At the bottom, you'll see that a conditional that will let the application run only if the script itself, `main.py` is being called. This is not the same as `__main__` though. If `main.py` were called something else, the script would still run as long as it was properly run from the terminal. If we tried to import this into another file and call that file's name, our app would not run. Run the script by typing this in your command line:
```bash
python main.py
```
Your terminal will prompt you to navigate to your localhost at the port 5000 where a local server has been created in order to view your app. [Check it out](http://127.0.0.1:5000/)!

## Making Our Own Pages
Now let's create a second page that we will use to put our calendar in. Set the route to anything you want and create a function of the same name and have it return whatever you want for now. Follow the structure that we used for the home page.

<details>
<summary><b>Solution</b></summary>

```python
@app.route("/cal")
def cal():
	return "Here's what you got coming up"
```
Try running the script and appending `/cal` (or whatever you used) to the address bar and see if your message returns!
</details>

## Templates
Something cool we can do with our web app is to use templates to set up what all the different pages look like using HTML rather than a single line return statement in the Python code. In your project's main folder, create a new folder called `templates` and create a `template.html` file inside it. Let's use this starter file for the template, but feel free to modify what you wish.

```html
<html>
	<head>
		<meta  charset="utf-8">
		<title>Flask Parent Template</title>
		<link  rel="stylesheet"  href="{{ url_for('static',  filename='css/template.css') }}">
	</head>
	<body>
		<header>
			<div class="container">
				<h1 >My Upcoming Events</h1>
				<ul class="menu">
					<li><a href="{{ url_for('home') }}">Home</a></li>
					<li><a href="{{ url_for('cal') }}">Calendar</a></li>
				</ul>
			</div>
		</header>

	{% block content %}
	{% endblock %}

	</body>
</html>
```

This HTML is pretty much boilerplate with some exceptions. You probably noticed a key difference in that there are curly brackets all over the place on it. We use them to pass messages from the Python file into the HTML. The rest is just syntax really. Right now, the template links to all the different URLs for your different pages

## Add CSS!
# Integrating Google Calendar
# Deploying Your App
## Setting Up Google App Engine
# Appendix
## What's Next?

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTc4MjgyMDYyLC0xMzM3Mjk0NTE4LC0xMD
Y4NTMyMTEsLTQzMDM5NTgzOCwtMTM2Njc2MjkzLDIxNTI5NzIz
MSwxODkxODYzMTEyLC04MTM0ODgzMjMsMTQ1MjY0ODc4NCwtMT
ExNDgzODA5NF19
-->