import pandas as pd

df = pd.read_csv("random_kv.csv")
df.rename(columns = {" value": "value"}, inplace = True)
df1 = df.groupby("key").aggregate({"key": "count", "value":"sum"})
df1 = df1.rename(columns={"key": "occurences", "value": "sum"})
df1 = df1.sort_values(by = ["occurences", "sum"], ascending = False)
df1.to_csv("clean_kv.csv", index = True)