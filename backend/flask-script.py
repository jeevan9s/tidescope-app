# tidescope backend-flask-model script
from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from sklearn.impute import KNNImputer

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

p_model_path = "./models/tsunami_prediction_model.pkl"
scaler_path = "./models/scaler.pkl"
df = pd.read_csv("./data/proc-eq-data.csv")
model = joblib.load(p_model_path)
scaler = joblib.load(scaler_path)


feature_order = [
    "magnitude", "cdi", "mmi", "sig", "dmin",  
    "depth", "latitude", "longitude", "Year", "Month"
]

imputer = KNNImputer(n_neighbors=1)
ip_train_data = df[feature_order]
train_data_imputed = imputer.fit_transform(ip_train_data)
train_data_imputed_df = pd.DataFrame(train_data_imputed, columns=ip_train_data.columns)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        latitude = float(request.form.get("latitude"))
        longitude = float(request.form.get("longitude"))
        magnitude = float(request.form.get("magnitude"))
        depth = float(request.form.get("depth"))
        dmin = float(request.form.get("dmin"))
        year = int(request.form.get("Year"))
        month = int(request.form.get("Month"))
        cdi = request.form.get("cdi", None)
        mmi = request.form.get("mmi", None)
        sig = request.form.get("sig", None)

        data = []

        for feature in feature_order:
            if feature == "sig":
                data.append(np.nan if sig is None else float(sig))
            elif feature == "cdi":
                data.append(np.nan if cdi is None else float(cdi))
            elif feature == "mmi":
                data.append(np.nan if mmi is None else float(mmi))
            else: 
                value = request.form.get(feature)
                if value is None:
                    return jsonify({"error": f"Missing value for {feature}"}), 400
                try:
                    data.append(float(value))
                except ValueError:
                    return jsonify({"error": f"Invalid number for {feature}: {value}"}), 400

        data_df = pd.DataFrame([data], columns=feature_order)
        
        data_df[['cdi', 'mmi', 'sig']] = data_df[['cdi', 'mmi', 'sig']].replace(0, np.nan)
        
        imputed_data = imputer.transform(data_df[feature_order])
        imputed_data_df = pd.DataFrame(imputed_data, columns=data_df.columns)
        
        if data_df.shape[1] != 10:
            return jsonify({"error": f"Feature shape mismatch, expected 10 features, got {imputed_data_df.shape[1]}"}), 400

        scaled_input = scaler.transform(imputed_data_df)

        
        prediction = model.predict(scaled_input)
        result = {
            "tsunami_risk": "High" if prediction == 1 else "Low",
        }

        return jsonify({"success": True, "data": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)