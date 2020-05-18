# Introduction
In today's online world, it can sometimes be difficult to discern whether the news you're reading is likely true or not. What if you had a model that could tell you if that article you think is real is actually **fake news?** <br/>In this tutorial, we'll be building a text **classification** model using the Naive Bayes classifier. Our data will come from the [fake and real news dataset on Kaggle](https://www.kaggle.com/clmentbisaillon/fake-and-real-news-dataset). By the end, you'll have your very own machine learning model trained on a vast dataset to recognize when news might not be authentic. Let's dive in!
## Intuition
In this section, let's cover what a **classifier** is, what **Naive Bayes** is, and some of the assumptions we'll be making in order to build this project. <br/>
### Classification
In machine learning, classification refer to a type of predictive modeling where the model attempts to predict the labels for a set of input data. The simplest example of this is spam filtering in your email inbox. An algorithm sorts incoming email by analyzing their text (something we're going to get into in just a bit) and decides whether or not to put it in your inbox or your junk. Here's another representation

<image for classification>

In this tutorial we'll be doing the same thing, but with news stories!
### The Bag of Words Model 
In order to classify news as fake or not, our model needs a vocabulary! This is where our bag of words comes in. In this project, we'll be using sklearn's CountVectorizer in order to convert our text into a dictionary that maps every unique word to the number of times it appears in the data. This feature extractor will also *convert the words into vectors* that we can fit to our model. 




### Optional: Google Colab

## Importing and Cleaning





> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxMzA2NzgwMjksMTU4OTg1NTU0NiwtMz
A5MDgyMTAxLC0xMzA2ODM4MDk2LC0zNTE2NjQ1MTEsNzMwOTk4
MTE2XX0=
-->