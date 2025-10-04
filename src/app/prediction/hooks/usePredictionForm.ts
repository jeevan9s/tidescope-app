import { useState } from "react";

export const usePredictionForm = () => {
  const [yearMonth, setYearMonth] = useState<string>("");
  const [magnitude, setMagnitude] = useState<number>(0);
  const [intensityValue, setIntensityValue] = useState<number>(0);
  const [intensityType, setIntensityType] = useState<"cdi" | "mmi" | undefined>(undefined);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<{
    tsunami_risk: string;
  } | null>(null);

  return {
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
  };
};
