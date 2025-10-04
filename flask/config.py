MODEL_PATH = "./models/tsunami_prediction_model.pkl"
SCALER_PATH = "./models/scaler.pkl"
DATA_PATH = "./data/proc-eq-data.csv"

FEATURES = [
    "magnitude", "cdi", "mmi", "sig", "dmin",
    "depth", "latitude", "longitude", "Year", "Month"
]

CORS_ORIGINS = ["http://localhost:3000"]
