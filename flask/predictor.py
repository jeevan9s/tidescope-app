import joblib
import numpy as np
import pandas as pd
from sklearn.impute import KNNImputer
from config import MODEL_PATH, SCALER_PATH, DATA_PATH, FEATURES

df = pd.read_csv(DATA_PATH)
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

imputer = KNNImputer(n_neighbors=1)
imputer.fit(df[FEATURES])


def predict_tsunami(input_data: dict):
    row = []
    for feature in FEATURES:
        value = input_data.get(feature)
        if value in [None, ""]:
            row.append(np.nan)
        else:
            row.append(float(value))

    data_df = pd.DataFrame([row], columns=FEATURES)
    data_df[['cdi', 'mmi', 'sig']] = data_df[['cdi', 'mmi', 'sig']].replace(0, np.nan)

    imputed = imputer.transform(data_df)
    scaled = scaler.transform(imputed)

    prediction = int(model.predict(scaled)[0])
    return {"tsunami_risk": "High" if prediction == 1 else "Low"}
