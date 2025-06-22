# TideScope

AI-Powered Tsunami Prediction & Classification. 

## Overview

- Predicts tsunami occurrence from earthquake data using ensemble models (Random Forest, XGBoost)
- Classifies tsunami severity in real time using ESP32 with ultrasonic and accelerometer sensors
- Web interface built with React (frontend) and Flask (backend)

## Machine Learning

- **Algorithms:** Random Forest, XGBoost for tsunami occurrence prediction; Random Forest classification for sensor-based severity detection  
- **Input:** Magnitude, depth, location, seismic intensity, sensor data (ultrasonic, accelerometer)  
- **Output:**  
  - Binary tsunami prediction (0 or 1)  
  - Severity classification (scale 0–4) based on sensor input  
- **Accuracy:** Up to 96%  

## Hardware

- **Microcontroller:** ESP32  
- **Sensors:** Ultrasonic, MPU6050 accelerometer  
- **Function:** Classifies simulated tsunami severity (scale 0–4)  

## Web Interface

- React frontend for data input and visualization  
- Flask backend for prediction API and sensor data handling  
- Features: Live classification, input form
