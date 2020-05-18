# Introduction
In today's online world, it can sometimes be difficult to discern whether the news you're reading is likely true or not. What if you had a model that could tell you if that article you think is real is actually **fake news?** <br/>In this tutorial, we'll be building a text **classification** model using the Naive Bayes classifier. Our data will come from the [fake and real news dataset on Kaggle](https://www.kaggle.com/clmentbisaillon/fake-and-real-news-dataset). By the end, you'll have your very own machine learning model trained on a vast dataset to recognize when news might not be authentic. Let's dive in!
### Suggested Dependencies
This tutorial will cover some concepts in probability and we will be coding in Python using a notebook (.ipynb) envi
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

### Optional: Google Colab

## Importing and Cleaning





> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI4MzkyNjQwMywtMTYxODY0MTg2MiwtMz
UzODIzMjE3LC0xMTgyODIwOTcwLC00MTg2NTMwOTksLTEyNjI3
NjM1OTgsMTU4OTg1NTU0NiwtMzA5MDgyMTAxLC0xMzA2ODM4MD
k2LC0zNTE2NjQ1MTEsNzMwOTk4MTE2XX0=
-->