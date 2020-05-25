from flask import Flask, render_template

app = Flask(__name__)

@app.route("/") # default
def home():
    return render_template("home.html")

@app.route("/cal")
def cal():
    return render_template("cal.html")

if __name__ == "__main__":
    app.run(debug=True)