"use client";
import Link from "next/link";
import "../styles/prediction.css";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "./hooks/useLocation";
import { usePredictionForm } from "./hooks/usePredictionForm";
import { validateForm } from "./utils/validation";
import { submitPrediction } from "./utils/api";
import { GeneralInfoSection } from "./components/GeneralInfoSection";
import { SeismicParametersSection } from "./components/SeismicParametersSection";
import { PredictionResultPopup } from "./components/PredictionResultPopup";

export default function PredictionPage() {
  const { location, getLocation } = useLocation();
  const {
    yearMonth,
    setYearMonth,
    magnitude,
    setMagnitude,
    intensityValue,
    setIntensityValue,
    intensityType,
    setIntensityType,
    showPopup,
    setShowPopup,
    predictionResult,
    setPredictionResult,
  } = usePredictionForm();

  console.log("intensityValue:", intensityValue);
  console.log("Type of intensityValue:", typeof intensityValue);

  const handleDateChange = (selectedYearMonth: string) => {
    setYearMonth(selectedYearMonth);
    console.log("Selected Year and Month:", selectedYearMonth);
  };

  const handleSubmit = async () => {
    if (!validateForm(yearMonth, location, magnitude, intensityType, intensityValue)) {
      return;
    }

    if (typeof location === "string" || location === null) {
      return;
    }

    const result = await submitPrediction(
      location,
      yearMonth,
      magnitude,
      intensityType,
      intensityValue
    );

    if (result) {
      setPredictionResult(result);
      setShowPopup(true);
    }
  };
  
  

  return (
    <TooltipProvider>
      <div className="page flex justify-center items-center min-h-screen bg-gray-900">
        <title>Prediction Model</title>
        <div className="title-cntr3">
          <Link href="/main">
            <h1 id="title3" className="text-white text-center font-normal mb-2">
              <span className="text-sky-700">Tide</span>
              <span className="text-zinc-100">Scope</span>
            </h1>
          </Link>
        </div>
        <div
          id="input-field"
          className="flex flex-col items-center w-150 h-300 justify-center space-y-8 bg-zinc-200 bg-opacity-100 rounded-lg p-10"
        >
          <div className="w-full text-left">
            <h1 className="text-black text-2xl font-bold">Input Parameters</h1>
          </div>

          <GeneralInfoSection
            onDateChange={handleDateChange}
            onLocationClick={getLocation}
          />

          <SeismicParametersSection
            magnitude={magnitude}
            onMagnitudeChange={setMagnitude}
            intensityType={intensityType}
            onIntensityTypeChange={setIntensityType}
            intensityValue={intensityValue}
            onIntensityValueChange={setIntensityValue}
          />

          <Button
            onClick={handleSubmit}
            className="bg-zinc-800 text-white px-6 py-2 rounded mt-4 hover-animate hover:bg-sky-700"
          >
            Submit
          </Button>
        </div>

        {showPopup && predictionResult && (
          <PredictionResultPopup
            tsunamiRisk={predictionResult.tsunami_risk}
            onClose={() => setShowPopup(false)}
          />
        )}

      </div>
      <ToastContainer />
    </TooltipProvider>
  );
}
