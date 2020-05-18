# Introduction
In today's online world, it can sometimes be difficult to discern whether the news you're reading is likely true or not. What if you had a model that could tell you if that article you think is real is actually **fake news?** <br/>In this tutorial, we'll be building a text **classification** model using the Naive Bayes classifier. Our data will come from the [fake and real news dataset on Kaggle](https://www.kaggle.com/clmentbisaillon/fake-and-real-news-dataset). By the end, you'll have your very own machine learning model trained on a vast dataset to recognize when news might not be authentic. Let's dive in!
### Suggested Dependencies
This tutorial will cover some concepts in probability and we will be coding in Python using a notebook (.ipynb) environment such as Jupyter or Google Colab. Familiarity with both would be helpful, but is not a necessity. Coding in a regular Python (.py) file works just as well!
If you are not in an Anaconda environment, install the following packages using these commands in your terminal:
```bash
pip install pandas
pip install -U scikit-learn
```
In Anaconda, run these commands (though you likely will already have them installed)
```bash
conda install pandas
conda install scikit-learn
```
## Intuition
In this section, let's cover what a **classifier** is, what **Naive Bayes** is, and some of the assumptions we'll be making in order to build this project. <br/>
### Classification
In machine learning, classification refer to a type of predictive modeling where the model attempts to predict the labels for a set of input data. The simplest example of this is spam filtering in your email inbox. An algorithm sorts incoming email by analyzing their text (something we're going to get into in just a bit) and decides whether or not to put it in your inbox or your junk by appropriately labeling each email. Here's another representation:

![Classification Graph](https://github.com/maximgeller/projects/blob/master/fake_news_naive_bayes/img/classification.png?raw=true)

In this tutorial we'll be doing the same thing, but with news stories!
### The Bag of Words Model 
In order to classify news as fake or not, our model needs a vocabulary. This is where our bag of words comes in. In this project, we'll be using sklearn's [CountVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html) in order to convert our text into a dictionary that maps every unique word to the number of times it appears in the data. This feature extractor will also *convert the words into vectors* that we can fit to our model. <br/>
Think about it this way: your brain generally finds patterns in the language of spammy emails versus ones that are actually important to you. You have a bag of words for the emails that tend to end up in your inbox, and another separate bag for those that go to your spam. Our model works the same way!
### Bayes' Theorem
Bayes is a big name in probability as well as in machine learning! In this project, our classifier is called **Naive Bayes** and it's based on **Bayes' Theorem**. It looks like this:
$$
P (A\mid B) =  \frac{P(B\mid A)P(A) }{P(B)}
$$
Okay, this might confusing to look at, so let's start with the idea of  **conditional probability**, which we'll define in the following way:

> The likelihood of event A happening given event B does happen.

Cool, so you might already be able to see how this plays into the theorem. Bayes Theorem calculates the probability that A is true given event B based on the inverse probability, probability of B given A. If you want to learn more about it and see a derivation, I highly suggest researching the **law of total probability**, but it's a bit beyond the scope for what we need to know for this project.
### Naive Bayes & Assumptions
We've almost got all of the understanding we need to know. The last thing we are going to talk about is our classifier and the assumptions we'll be making.
The **Naive Bayes** method for text classification is very popular because it scales very easily. But what is it, and why do we call it naive? Well, Naive Bayes assumes *conditional independence* between every pair of features. For our project, this means we are assuming that the words in a news article have no impact on each other; we are only examining the probability of seeing each word given a fake or real news story. You might be starting to see why this is a naive assumption. A sentence is not just an independent jumble of words. The words build off and on top of one another. Let's take a hypothetical sentence as an example
$$
P(I\>walked \>to\> the\> zoo\> today) = P(I) * P(walked) * P(to) * P(the) * P(zoo) * P(today)
$$
For our classifier, we assume the above equation to be true. However, in real life you know that sentences aren't formed this way. Let's keep this in mind when we get to modeling, but for now let's get started with our dataset!
## Importing and Cleaning
We'll be working with the fake news dataset from Kaggle. Download both sets of data and place them in the same folder as your `exploration.ipynb` file. 
### Optional: Google Colab
If you're working in a Google Colab notebook, you'll have to mount it to your drive. Run this in your notebook:
```python
from google.colab import drive 
drive.mount('/content/drive/') # you will need to authenticate
# cd into the directory where your data is stored, for me it's the My Drive folder
cd My\ Drive/ 
```
Before we load in our data, we have to import the pandas library to read it as a `DataFrame` object.
```python
import pandas as pd # calling it pd is convention
```
Now let's load in the `Fake.csv` and `True.csv` datasets!
```python
# loading in our two datasets..we'll combine them later on
# if you load in the data set as I do, they'll need to be placed in the same directory
fake = pd.read_csv("Fake.csv")
true = pd.read_csv("True.csv")
```
It's a good idea to take a peek at the first few rows of both dataframes to see what we're dealing with, so let's use the `.head()` function.
```python
true.head() 
# load in fake in a separate cell
fake.csv()
```
Great, we see each entry has a title, text, a subject, and date published. However, the only way we can tell which stories are fake is by which dataset it is in. Since we're going to be concatenating the dataframes later on, let's put a flag in as a feature to both dataframes
```python
# setting entire column to 0 so when we concat the dataframes we know which were real and which were fake
# In this case, the real articles are equal to 0
true["fake_news"] = 0 
```
Now it's your turn! Create a column in `fake` that has all of its entries equal to 1. 

<details>
<summary><b>Solution</b></summary> 

```python
fake["fake_news"] = 1
```
</details>

We just created a brand new column in both dataframes and populated all of their entries with either a 0 or 1. Take a look if you don't believe me with the `.head()` function again.

Awesome, we're doing great already. We can already see that the `subject` column looks a little different between the two dataframes. Let's explore this some more.
```python
# examine the unique article subjects
fake["subject"].unique()
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzNTQ1NjMxNjMsLTE2MTg2NDE4NjIsLT
M1MzgyMzIxNywtMTE4MjgyMDk3MCwtNDE4NjUzMDk5LC0xMjYy
NzYzNTk4LDE1ODk4NTU1NDYsLTMwOTA4MjEwMSwtMTMwNjgzOD
A5NiwtMzUxNjY0NTExLDczMDk5ODExNl19
-->