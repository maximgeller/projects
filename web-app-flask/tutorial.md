
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

This HTML is pretty much boilerplate with some exceptions. You probably noticed a key difference in that there are curly brackets all over the place on it. We use them to pass messages from the Python file into the HTML. The rest is just syntax really. Right now, the template links to all the different URLs for your different pages and also to display all the content that you will insert in your other HTML files. This template will act as a header for all of your pages in the web app. Here's a good reference that dives into this [a bit further.](https://www.techiediaries.com/flask-tutorial-templates/)

The other two things we need to do is create HTML pages for your landing page and calendar and link them all together in `main.py`.  In your templates folder, create two new files called `home.html` and `cal.html`.
Fill it with your own boilerplate code or use this one here. The only requirement is that it extends the template as you're about to see.
```html
<html>
	<head>
		<meta  charset="utf-8">
		<title>My First Web App!</title>
	</head>
	<body>
		{% extends "template.html" %}
		{% block content %}
		<h1>Welcome! Navigate to the calendar to see your upcoming events!</h1>
		{% endblock %}
	</body>
</html>
```

Create a similar page for the calendar! Following the format above, make an html page called `cal.html` that extends `template.html`, blocks off content, and in that block contains tags for an unordered list with a single list item (`<ul>` and `<li>` tags, respectively).

<details>
<summary><b>Solution</b></summary>

```html
<html>
	<head>
		<meta  charset="utf-8">
		<title>Upcoming Schedule</title>
	</head>
	<body>
		{% extends "template.html" %}
		{% block content %}
		
		<h1>Here's what you got lined up!</h1>
			<div id="list">
				<ul>
					<li> Item 1! </li>
				</ul>
			</div>
			
		{% endblock %}
	</body>
</html>
```
</details>

Finally, let's link our pages together in `main.py` so you can see them all in action! We'll need to import `render_template` from `flask` which will allow us to use the HTML pages as the pages for the web app.
```python
# main.py 
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
	return render_template("home.html")

@app.route("/cal")
def cal():
	return render_template("cal.html")
```

Sweet! Start your local server up and you should be able to navigate between both of your pages from the browser!

## Add CSS!
Your pages are probably pretty barren right now, right? Let's add a CSS file in order to spice it up a little. Flask looks for CSS in a specific way: you'll have to create a folder called `static` in your main project folder, then inside it create *another* folder called `css`. Finally, in the `css` folder, create a stylesheet called `template.css`. Here's some basic styling I used for my web app, but get creative here!
```css
.menu  li {
	display: inline-block;
	text-align: center;
	padding: 20px;
}

body {
	margin: 0  auto;
	max-width: 50em;
	font-family: "Trebuchet MS", Helvetica, sans-serif;
	line-height: 1.5;
	padding: 1em;
	text-align: center;
	background-color: whitesmoke;
}

h1 {
	color: #d13161;
}

a {
	color: #e81c4f;
}

#list  li {
	font-size: 20px;
	list-style: none;
}
```

I particularly recommend doing something similar to what I did in the first block by setting `display: inline-block;` because it will list your navigation bar horizontally. As a reminder, use the dot to access the elements that are set to be equal to a class e.g. `class="menu"` and the `#` symbol to access elements that are set equal to an id like `id="list"`.

You can always do some styling now and come back later. Now, let's move on to integrating Google Calendar!!

# Integrating Google Calendar
We're going to primarily follow Google's quickstart guide for making requests to their API, but with some adjustments. [You can find it here!](https://developers.google.com/calendar/quickstart/python) Follow the link to turn enable the API (you may have to create a Google Cloud project to do so) and select the option for creating a desktop app. You should then be able to download a file called `credentials.json` and place it in your project folder. Then install the API client from your terminal using this command: `
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib`.  
The third step is to copy over their quickstart code into `main.py`. However, we're going to be making some changes to it in order to suit our purposes. Either way, we'll definitely need to use the import statements they provide. Here's what your `main.py` file should look like after you do all of this
```python
from  __future__  import print_function
from flask import Flask, render_template
import datetime
import pickle
import os.path
import googleapiclient.discovery
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

app = Flask(__name__)

@app.route("/") # default
def home():
	return  render_template("home.html")
  
@app.route("/cal")
def cal():
	creds =  None
	SCOPES  = ['https://www.googleapis.com/auth/calendar.readonly']
	# The file token.pickle stores the user's access and refresh tokens, and is
	# created automatically when the authorization flow completes for the first
	# time.
	if os.path.exists('token.pickle'):
		with  open('token.pickle', 'rb') as token:
			creds = pickle.load(token)
	# If there are no (valid) credentials available, let the user log in.
	if not creds or not creds.valid:
		if creds and creds.expired and creds.refresh_token:
			creds.refresh(Request())
		else:
			flow = InstalledAppFlow.from_client_secrets_file(
	'credentials.json', SCOPES)
			creds = flow.run_local_server(port=0)
			# Save the credentials for the next run
			# with open('token.pickle', 'wb') as token: # can't write files in Google App Engine so comment out or delete
			# pickle.dump(creds, token)
	service = googleapiclient.discovery.build('calendar', 'v3', credentials=creds)
	# Call the Calendar API
	now = datetime.datetime.utcnow().isoformat() +  'Z'  # 'Z' indicates UTC time
	print('Getting the upcoming 10 events')
	events_result = service.events().list(calendarId='find your cal id from google and paste it here', timeMin=now, maxResults=10, singleEvents=True, orderBy='startTime').execute()
	events = events_result.get('items', [])
	if not events:
		print('No upcoming events found.')
	# for event in events:
	# start = event['start'].get('dateTime', event['start'].get('date'))
	# print(start, event['summary'])
	event_list = [event["summary"] for event in events]
	
	return  render_template("cal.html", events=event_list)
	
if  __name__  ==  "__main__":
	app.run(debug=True)
```
Once you have this code, you'll want to grab the calendar ID from google you want to integrate by going to its settings and then pasting it in the `events_result` variable. If your `credentials.json` are saved in your directory, you should have a working web app at this point! Start the localhost and have a look and play around with it. 

# Deploying Your App
It would be awesome to have a working URL for your app that you can always access! As it is a web app and not a static website, we'll need to use a host that allows web apps. For this project, let's use Google App Engine. 
Before we can use it, you'll have to install the Google Cloud SDK which you can find [here]([https://cloud.google.com/sdk/docs/quickstarts](https://cloud.google.com/sdk/docs/quickstarts)). You also need to create a Google Cloud project (if you haven't already) by [signing up for Google Cloud](https://cloud.google.com/). 

## Setting Up Google App Engine
We need to create three files in our main folder in order to use Google App Engine offered by Google Cloud. Create the following files in your project folder:
 - app.yaml
 ```
 runtime: python37
  
handlers:
- url: /static
	static_dir: static
- url: /.*
	script: auto
 ```
 
 - requirements.txt
 For this one, open up your terminal and type `pip freeze`. A long list of dependencies (installed packages) will come up. You'll want to copy and paste this list exactly into `requirements.txt`.  I'll put mine in here for reference, but I don't recommend using it yourself since your dependency versions might be different.
 <details><summary>My  File</summary>

```
appdirs==1.4.4
cachetools==4.1.0
certifi==2020.4.5.1
chardet==3.0.4
click==7.1.2
distlib==0.3.0
filelock==3.0.12
Flask==1.1.2
google-api-core==1.17.0
google-api-python-client==1.8.3
google-auth==1.15.0
google-auth-httplib2==0.0.3
google-auth-oauthlib==0.4.1
googleapis-common-protos==1.51.0
gunicorn==20.0.4
httplib2==0.18.1
idna==2.9
itsdangerous==1.1.0
Jinja2==2.11.2
MarkupSafe==1.1.1
oauth2client==4.1.3
oauthlib==3.1.0
protobuf==3.11.3
pyasn1==0.4.8
pyasn1-modules==0.2.8
pytz==2020.1
requests==2.23.0
requests-oauthlib==1.3.0
rsa==4.0
six==1.15.0
uritemplate==3.0.1
urllib3==1.25.9
virtualenv==20.0.21
Werkzeug==1.0.1
```

<details>

 - appengine_config.py
```python
from google.appengine.ext import vendor
# Add any libraries installed in the "lib" folder.
vendor.add('lib')
```
## Deploying 

In order to deploy, you'll have to initialize Google cloud by `cd`'ing all the way into the Google Cloud directory and italicizing it by typing `gcloud init`.  
# Appendix
## What's Next?

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNDg4NTA3NSw4NjYzMTk0NzgsMTA5ND
E2ODAzNiwxNjQxOTA4NDg3LDU3NzU2ODA4MSwtMTY2MzUxMTAx
LC0xMDM0Mjk4NzU2LC0xMjY0ODU5ODM1LDI3MDkxMzkzNCwtND
Q3MjQyNDM0LC0xMzc2MTM1MzY0LC0xMzM3Mjk0NTE4LC0xMDY4
NTMyMTEsLTQzMDM5NTgzOCwtMTM2Njc2MjkzLDIxNTI5NzIzMS
wxODkxODYzMTEyLC04MTM0ODgzMjMsMTQ1MjY0ODc4NCwtMTEx
NDgzODA5NF19
-->