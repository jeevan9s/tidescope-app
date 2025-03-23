# Main Flask, Backend Script
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import joblib

# init backend (app)
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# prediction_model = joblib.load("")

# init route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        latitude = float(request.form.get("latitude"))
        longitude = float(request.form.get("longitude"))
        magnitude = float(request.form.get("magnitude"))
        depth = float(request.form.get("depth"))
        station_dist = float(request.form.get("station_distance"))
        year = int(request.form.get("year"))
        month = int(request.form.get("month"))
        
        file = request.files.get('file')

        print(f"Received data: Latitude: {latitude}, Longitude: {longitude}, "
              f"Magnitude: {magnitude}, Depth: {depth}, Station Distance: {station_dist}, "
              f"Year: {year}, Month: {month}")
        
        if file:
            print(f"File uploaded: {file.filename}")

        return jsonify({"message": "Data received successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

