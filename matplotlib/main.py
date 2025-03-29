# Script for Graph Generation
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np


df = pd.read_csv("data/raw-eq-data.csv")

# preprocessing
null_percent = round(df.isnull().sum() / df.shape[0] * 100, 2)
df.drop(['title', 'continent', 'alert', 'location'], axis=1, inplace=True)
df['date_time'] = pd.to_datetime(df['date_time'])
df['Year'] = pd.DatetimeIndex(df['date_time']).year
df['Month'] = pd.DatetimeIndex(df['date_time']).month
df.drop('date_time',axis=1,inplace=True)
# print(df.head())

tsunami_df = df[df['tsunami'] == 1]

top_significant_tsunamis = tsunami_df.sort_values(by='sig', ascending=False).head(10)
top_significant_tsunamis = top_significant_tsunamis.dropna(subset=['sig'])

plt.figure(figsize=(12,6))
sns.set(style="whitegrid")
sns.barplot(x='sig', y='country', data=top_significant_tsunamis, palette=sns.color_palette("Blues")[::-1])



plt.xlabel('Significance Score', fontsize=14)
plt.ylabel('Country', fontsize=14)
plt.title('Most Significant Tsunami Events by Country', fontsize=16)

plt.tight_layout()
plt.show()
