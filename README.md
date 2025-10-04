# TideScope
> AI-Powered Tsunami Prediction & Classification

<details>
<summary>Contents</summary>

- [overview](#overview)
- [architecture](#architecture)
  - [machine learning](#machine-learning)
  - [hardware](#hardware)
  - [web interface](#web-interface)
- [prerequisites / installation](#prerequisites--installation)
- [contact](#contact)

</details>

# Overview

I built **TideScope** to predict tsunami occurrence from earthquake data and classify tsunami severity in real time using an ESP32-powered sensor platform (simulation). The web interface allows live monitoring and prediction visualization. This project was presented at the 2025 Toronto Science Fair.

The system combines:

- Ensemble machine learning models (Random Forest, XGBoost) for tsunami prediction  
- Real-time severity classification (0–4 scale) using ultrasonic and accelerometer sensors on ESP32  
- React + Flask web interface for input, visualization, and live classification  

<table width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td width="50%">
      <img src="./media/tidescope-homepage.png" width="100%" height="100%">
    </td>
    <td width="50%">
      <img src="./media/tidescope-form.png" width="100%" height="100%">
    </td>
  </tr>
</table>

## Built With
-	![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
- ![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
- ![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
- ![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)
- ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Architecture

<div align="center">
<img src="./media/tidescope-workflow.png" width="60%">
</div>

<br>

The system is modular:

<details>
<summary>Machine Learning</summary>

- **Algorithms:** Random Forest, XGBoost for tsunami occurrence; Random Forest for severity classification  
- **Input Features:** Magnitude, depth, location, seismic intensity, sensor data (ultrasonic, accelerometer)  
- **Outputs:**  
  - Binary tsunami prediction (0 = no tsunami, 1 = tsunami)  
  - Severity classification (0–4 scale) from sensor input  
- **Accuracy:** Up to 96%  

</details>

<details>
<summary>Hardware</summary>

- **Microcontroller:** ESP32 Devkit  
- **Sensors:** Ultrasonic distance sensor, MPU6050 accelerometer  
- **Function:** Classifies simulated tsunami severity (0–4) in real time  
- **Power & Connectivity:** USB powered, communicates with Flask backend over WiFi  


</details>

<details>
<summary>Web Interface</summary>

- **Frontend:** React.js  
- **Backend:** Flask  
- **Features:**  
  - Live tsunami classification from sensor data  
  - Input form for earthquake parameters (magnitude, depth, location)  
  - Prediction visualization and confidence display  
- **Communication:** Frontend requests predictions via REST API; backend handles sensor streaming from ESP32  
</details>

## Installation
1. Clone the repository:

```bash
git clone https://github.com/jeevan9s/tidescope.git
cd tidescope
```

2. Install requirements:
   
 ```bash
 pip install -r requirements.txt
```

3. Run & Tinker
 ```bash
npm run dev

cd flask
python app.py
```

## Contact 
[`email`](mailto:jeevansanchez42@gmail.com)&nbsp;&nbsp;&nbsp; [``LinkedIn``](https://linkedin.com/in/jeevansanchez)

