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
# Importing and Cleaning
We'll be working with the [fake news dataset](https://www.kaggle.com/clmentbisaillon/fake-and-real-news-dataset) from Kaggle. Download both sets of data and place them in the same folder as your `exploration.ipynb` file. 
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
I'll let you handle the other dataframe by calling the same function, `.unique()` again. It's interesting that there are many more categories in the dataframe with fake entries, and it might be a cool project to categorize what kind of news an article is, but that's not our goal right now.
## Extracting Text in Pandas
You probably already noticed something different about the text column in the `true` dataframe. Let's take a closer look
```python
just_text = true["text"]
just_text.head()
```
All of these articles start with a location and "Reuters" written at the start. If we trained on this data as is, the model would quickly learn that articles that have Reuters in them are true and so the rest aren't. So while we might be able to get a really accurate model that way, what about a real article that doesn't have Reuters in it? It would probably get classified as fake. 

Let's fix this by removing all of the starting information in order to make the text from both dataframes as similar as possible. To do this, pandas has a handy function called `extractall()` that accepts a regular expression (regex) pattern as an argument. We're going to extract all of the text that comes after the hyphen that follows Reuters.
```python
just_text = just_text.str.extractall(r"^.* - (?P<text>.*)")
```
So what the heck is in the function? Let's do a quick crash course in regex. First we told pandas we want the strings in the `just_text` column, and then called `extractall()` on it. In the parenthesis, here's a quick guide to the syntax
|regex| meaning |
|--|--|
| ^ | only at the start of the string|
| . | any character|
| * | repeated 0 or more times|
| ( ) | the text we actually want to capture|
|?P<text\> | name the column our text is extracted under to be called "text"|
Here's a quick question for you. What are we expecting to catch with the pattern `.*` that follows `?P<text\>`?
<details>
<summary><b>Solution</b> </summary>

All of the words that follow the hyphen i.e. the actual news article!

</details>

Amazing, now we have a new dataframe called `just_text` with all of our real news stories without the preceding markers. Imagine trying to change this for all 21,000+ entries manually? Thank you regex!

Even though we got the text out, the dataframe it created has multiple indices. This is a nuisance but we quickly take care of it like this:
```python
just_text = just_text.droplevel(1)
```
Check your dataframe to see it's much nicer looking now.
The last step we have to take before we are ready to concatenate the dataframes is reassign `just_text` to the `text` column in our `true` dataframe. Pandas helps us again here with the `.assign()` function
```python
true = true.assign(text=just_text["text"]) # switcharoo on the columns
```
## Combining and Saving the Data
We're finally ready to concatenate the dataframes. Let's combine `fake` and `true` into a new dataframe called `df`
```python
df = pd.concat([fake, true], axis = 0)
```
We choose to combine on `axis = 0` because we want to stack the rows on top of each other. If we chose `axis = 1`, it would line the columns up together from left to right which isn't helpful to us. 
![concat dataframes](https://github.com/maximgeller/projects/blob/master/fake_news_naive_bayes/img/concat.png?raw=true)
We no longer have a fake or true news dataframe, it's all in one large one. Luckily, we created a feature earlier on to help us determine which dataframe each entry came from. We don't any other columns though, so let's drop them.
```python
df = df.drop(["subject", "date", "title"], axis = 1) # we won't use these columns in our model
```
This time we drop from `axis = 1` because we want to remove columns.

Let's also check if we have any missing records and use the pandas function `.dropna()` to remove them. 
```python
df.info()
```
We can see that there a few entries missing from the text column. There must have been blank entries in parts of our original datasets. Try and call `.dropna()` to remove the rows with missing data. Think about what axis you want to work with too, but you technically don't need to specify an axis  in this case.
<details>
<summary><b>Solution</b> </summary>

```python
df = df.dropna(axis = 0) 
# axis defaults to zero, so I'm just showing off
```
</details>
We're ready to move to the next notebook file and do some modeling. Last thing we have to do is save the new dataframe as it's own csv file.

```python
# save the cleaned csv for other modeling
clean_text = df.to_csv("cleaned_news.csv", index = False) # prevents having two indices
```
# Training Our Classifier
## Load In Clean Data
Create a new notebook called `nb_model.ipynb` in the same folder as your other files for this project. Try and import the pandas module as well as your cleaned dataframe. If you're using Colab, follow the same steps as we did in the `exploration.ipynb` notebook.
<details>
<summary><b>Solution</b> </summary>

```python
import pandas as pd
df = pd.read_csv("cleaned_news.csv")
df.head()
```
</details>

## Naive Multinomial Bayes with sklearn
Let's begin setting up our classifier by splitting the data up into independent and dependent variables. In this case, what do you think our dependent variable is? 
<details>
<summary><b>Solution</b> </summary>

The fake news marker! It tells us which category the model thinks the story falls under. Let's create our `X` and `y`
```python
# split the data
DV = "fake_news" # the dependent variable, text is the independent variable here
X = df.drop([DV], axis = 1) # drop from our X array because this is the text data that gets trained
y = df[DV]
```
</details>

Now let's start using our fun toolkit from sklearn. We'll begin by splitting our entire dataset up into testing and training portions. This is super important to do because we need to save a portion of our data to *validate* our text results on. We will train on 75% of the dataset and test on the remaining 25%.

```python
from sklearn.model_selection import train_test_split
# we train on 75% of the data, test on the rest
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.25)
```
Next we need to convert all of our words into the **bag of words** model from before using sklearn's `CountVectorizer`
```python
from sklearn.feature_extraction.text import CountVectorizer

count_vect = CountVectorizer(max_features = 5000)# limiting to 5000, but room to play with this here!
X_train_counts = count_vect.fit_transform(X_train["text"]) 
# print(count_vect.vocabulary_) # here is our bag of words! 
X_test = count_vect.transform(X_test["text"]) # note: we don't fit it to the model! Or else this is all useless
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQwMTQ3NjgwNiwtMjAwMDU1MjIzNCwzMD
c0MTk4OTQsMjEwMTExMzE3NiwtMTk2NTQ3Mzc2MCwtMTM0NDI0
NTIyNSwtMTYxODY0MTg2MiwtMzUzODIzMjE3LC0xMTgyODIwOT
cwLC00MTg2NTMwOTksLTEyNjI3NjM1OTgsMTU4OTg1NTU0Niwt
MzA5MDgyMTAxLC0xMzA2ODM4MDk2LC0zNTE2NjQ1MTEsNzMwOT
k4MTE2XX0=
-->