from flask import Flask, jsonify, request
from flask_cors import CORS
from predictor import predict_tsunami
from config import CORS_ORIGINS

app = Flask(__name__)
CORS(app, origins=CORS_ORIGINS)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        result = predict_tsunami(data)
        return jsonify({"success": True, "data": result}), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
