# Pre-processing script for main dataset

import pandas as pd 
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler

df = pd.read_csv("data/raw-eq-data.csv")
output = "data/processed-data.csv"

null_percent = round(df.isnull().sum() / df.shape[0] * 100, 2)
# print(null_percent[null_percent > 0.1])

# alert, location, continent, country have a large amount of null values 
# alert, continent, country, location are unecessary, just use longitude & latitude 

df.drop(['title', 'continent', 'alert', 'location', 'country'], axis=1, inplace=True)

# date_time conversions 
df['date_time'] = pd.to_datetime(df['date_time'])
df['Year'] = pd.DatetimeIndex(df['date_time']).year
df['Month'] = pd.DatetimeIndex(df['date_time']).month
df.drop('date_time',axis=1,inplace=True)

# print(df.head())
# print(df.isnull().sum())

obj = df.select_dtypes(include=['object'])
# print(obj)
# print(obj.nunique)

obj.drop('net', axis=1, inplace=True)
df.drop(['net', 'magType'], axis=1, inplace=True)

le = LabelEncoder()
obj_encoded = obj.apply(le.fit_transform)
df = pd.concat([df, obj_encoded], axis=1)

df.to_csv(output, index=False)




