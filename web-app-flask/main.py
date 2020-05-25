from flask import Flask

app = Flask(__name__)

@app.route("/") # default
def home():
    return "hello world!"

@app.route("/enlight")
def enlight():
    return "Hey enlight! Fancy seeing you here!"


if __name__ == "__main__":
    app.run(debug=True)