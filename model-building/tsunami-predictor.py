# Model builidng script for prediction model 
# Scaling, splitting, training & evaluation

import pandas as pd 
from sklearn.metrics import roc_curve, auc
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split,GridSearchCV
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
from sklearn.metrics import confusion_matrix, accuracy_score
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np


df = pd.read_csv("./data/proc-eq-data.csv")
# print(df.head())

# scale
sc = StandardScaler()
X = df.drop(['tsunami', 'magType', 'gap', 'nst'], axis =1)
y = df['tsunami']
X_scaled = sc.fit_transform(X)
X = pd.DataFrame(X_scaled, columns=X.columns)
# print(X.head())

joblib.dump(sc, './models/scaler.pkl')
print("Feature Order: ", X.columns.tolist())
print("Features used for training:", X.columns.tolist())




# split
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.2, random_state=42)

# balancing
sm = SMOTE(random_state=42)
X_train,y_train = sm.fit_resample(X_train, y_train)
# print(X_train.head())

# fitting
models = {
    "Logistic Regressionm":LogisticRegression(),
    "Tree":DecisionTreeClassifier(),
    "Forest": RandomForestClassifier(),
    "XG": xgb.XGBClassifier()
}

# for name, model in models.items():
#     model.fit(X_train, y_train)
#     pred = model.predict(X_test)
    # print("Model: " , name)
    # print("------------------------------")    
    # print(classification_report(y_test,pred))
    # print(".........................................................|")

# random forest and xgb classifiers performed the best (90-93)

# hyperparameter tuning with grid search (find best parameters & score between two best models)

# xgb

# model = xgb.XGBClassifier()
# params = {
#         'n_estimators': [100, 200, 300],
#         'learning_rate': [0.01, 0.05, 0.1],
#         'max_depth': [3, 5, 7]
#         }
# grid = GridSearchCV(model, params, cv=5)
# grid.fit(X_train, y_train)
# print("Best XGB Params: ", grid.best_params_)
# print("Best XGBoost Score:", grid.best_score_)

# randomforest
# model2 = RandomForestClassifier()
# params2 = {
#     'n_estimators': [100, 200, 300],
#     'max_depth': [3, 5, 7],
#     'min_samples_split': [2, 5, 10],
#     'min_samples_leaf': [1, 5, 10],
#     'max_features': ['auto', 'sqrt', 'log2']
# }

# grid2 = GridSearchCV(model2, params2, cv=5)
# grid2.fit(X_train, y_train)
# # print("Best RandomForest Params: ", grid2.best_params_)
# # print("Best RandomForest Score:", grid2.best_score_)

# XGB HAS THE BEST SCORE (0.9487)
hy_params = {'learning_rate': 0.01,
             'max_depth': 5, 
             'n_estimators': 300}

tuned_model = xgb.XGBClassifier(**hy_params)
tuned_model.fit(X_train,y_train)
preds = tuned_model.predict(X_test)
print("classification report: ", classification_report(y_test, preds))
cm = confusion_matrix(y_test, preds)
print("Confusion matrix: ", cm)
print("accuracy:", accuracy_score(y_test, preds))


# prob = tuned_model.predict_proba(X_test)
# print(prob)

# print("Feature Importances:")
# for feature, importance in zip(X.columns, tuned_model.feature_importances_):
#     print(f"{feature * 100}: {importance}")

# print(f"Probability of Tsunami Occurring: {prob[0][1]}") 
# joblib.dump(tuned_model, './models/tsunami_prediction_model.pkl')