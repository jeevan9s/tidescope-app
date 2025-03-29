"use client";
import Link from "next/link";
import "../styles/prediction.css";
import Upload from "@/components/ui/upload";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Datepicker from "@/components/ui/datepicker";
import { ComboboxDemo } from "@/components/ui/dropdown";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PredictionPage() {
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | string | null
  >(null);

  const [yearMonth, setYearMonth] = useState<string>("");
  const [magnitude, setMagnitude] = useState<number>(0);

  const [intensityValue, setIntensityValue] = useState<number>(0); 
  const [intensityType, setIntensityType] = useState<"cdi" | "mmi" | undefined>(undefined);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<{
    tsunami_risk: string;
  } | null>(null);

  console.log("intensityValue:", intensityValue);
  console.log("Type of intensityValue:", typeof intensityValue);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        console.log("Latitude: ", latitude, "Longitude: ", longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocation("Location access denied.");
      }
    );
  };

  const handleDateChange = (selectedYearMonth: string) => {
    setYearMonth(selectedYearMonth);
    console.log("Selected Year and Month:", selectedYearMonth);
  };
  
  const handleSubmit = async () => {
    if (!yearMonth) {
      toast.error("Please select a year and month!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    if (typeof location === "string" || location === null) {
      toast.error("Location not set!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    if (magnitude === 0) {
      toast.error("Please select a valid earthquake magnitude!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    const depthInput = (
      document.querySelector('input[placeholder="km"]') as HTMLInputElement
    )?.value;
    if (!depthInput || isNaN(parseFloat(depthInput))) {
      toast.error("Earthquake depth is required and should be a number!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    const stationDistanceInput = (
      document.querySelectorAll('input[placeholder="km"]')[1] as HTMLInputElement
    )?.value;
    if (!stationDistanceInput || isNaN(parseFloat(stationDistanceInput))) {
      toast.error("Station distance is required and should be a number!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    if (intensityType && intensityValue === undefined) {
      toast.error("Please select an intensity value!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    const [year, month] = yearMonth.split("-");
    const data: {
      magnitude: number;
      sig: number;
      cdi: number;
      mmi: number;
      dmin: number;
      depth: number;
      latitude: number;
      longitude: number;
      Year: string;
      Month: string;

    } = {
      latitude: location.latitude,
      longitude: location.longitude,
      magnitude: magnitude,
      depth: parseFloat(depthInput),
      dmin: parseFloat(stationDistanceInput),
      Year: year,
      Month: month,
      cdi: 0,   
      mmi: 0,  
      sig:0,
    }
    
    if (intensityType && intensityValue !== undefined) {
      data[intensityType] = intensityValue;
    }
    
    console.log("Data being sent to backend:", data);
  
    const formData = new FormData();
    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    formData.append("magnitude", data.magnitude.toString());
    formData.append("depth", data.depth.toString());
    formData.append("dmin", data.dmin.toString());
    formData.append("Year", data.Year);
    formData.append("Month", data.Month);
  
    if (data.cdi !== undefined) formData.append("cdi", data.cdi.toString());
    if (data.mmi !== undefined) formData.append("mmi", data.mmi.toString());
  
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("Parameters successfully submitted.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        console.log("Backend Response:", result);
        setPredictionResult(result.data);
        setShowPopup(true);

      } else {
        toast.error(result.error, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send data!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
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
  
          <div className="flex flex-col w-full space-y-4">
            <span id="sec-h" className="text-black text-md font-bold">General Information</span>
            <div
              id="subfield-1"
              className="flex flex-row items-center justify-between w-full space-x-6"
            >
              <Datepicker onDateChange={handleDateChange} />
              <Button
                onClick={getLocation}
                className="bg-zinc-300 font-md text-gray-950 px-4 py-2 rounded hover-animate hover:bg-zinc-400"
              >
                Location
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Upload />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={2}>
                  <p>Upload seismic data (CSV/JSON).</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
  
          <div className="flex flex-col w-full space-y-4">
            <span id="sec2-h" className="text-black text-md font-bold">Seismic Parameters</span>
            <div className="flex items-center justify-center space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Slider
                      className="w-64 h-2 text-gray-800"
                      label="Earthquake Magnitude"
                      min={0}
                      max={10}
                      value={magnitude}
                      onValueChange={(value: number) => setMagnitude(value)}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set earthquake strength</p>
                </TooltipContent>
              </Tooltip>
            </div>
  
            <div className="flex flex-row mt-3 items-center justify-between space-x-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mb-3">
                    <Label className="text-gray-800 font-normal">Earthquake Depth</Label>
                    <Input className="w-24 bg-zinc-300 text-gray-800 mt-1" type="number" placeholder="km" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="translate-x-4">
                  <p>Enter depth of earthquake rupture</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mb-3 ml-r">
                    <Label className="text-gray-800 font-normal">Station Distance</Label>
                    <Input className="w-24 mt-1 text-gray-800 bg-zinc-300" type="number" placeholder="km" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter distance from epicenter to nearest station</p>
                </TooltipContent>
              </Tooltip>
  
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mb-4 ml-4">
                    <Label className="text-gray-800 font-normal ml-4 mt-3 font-normal">
                      Earthquake Intensity
                    </Label>
                    <RadioGroup
                      value={intensityType}
                      onValueChange={(value) => {
                        setIntensityType(value as "cdi" | "mmi");
                        setIntensityValue(0);
                      }}
                      className="flex flex-row ml-4 mb-2 items-center space-x-5"
                    >
                      <div className="flex items-center space-x-2 mt-3">
                        <RadioGroupItem value="cdi" id="cdi-option" />
                        <Label htmlFor="cdi-option" className="text-gray-800-important font-normal">
                          CDI
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <RadioGroupItem value="mmi" id="mmi-option" />
                        <Label htmlFor="mmi-option" className="text-gray-800-important font-normal">
                          MMI
                        </Label>
                      </div>
                    </RadioGroup>
  
                    {intensityType && <ComboboxDemo value={intensityValue} setValue={setIntensityValue} />}
                  </div>
                </TooltipTrigger>
  
                <TooltipContent className="translate-x-4 max-w-xs">
                  <p><strong>Choose an earthquake intensity scale:</strong></p>
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>CDI (Community Determined Intensity)</strong>: The highest intensity
                      reported by people who experienced the earthquake.
                    </li>
                    <li>
                      <strong>MMI (Modified Mercalli Intensity)</strong>: The highest estimated
                      intensity based on instrumental readings and calculations.
                    </li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </div>
  
            <Button
              onClick={handleSubmit}
              className="bg-zinc-800 text-white px-6 py-2 rounded mt-4 hover-animate hover:bg-sky-700"
            >
              Submit
            </Button>
          </div>
        </div>
  
        {showPopup && predictionResult && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold">Tsunami Prediction</h2>
              <p className="mt-2 text-gray-700">
                Risk Level: <strong>{predictionResult.tsunami_risk}</strong>
              </p>
              <Button
                onClick={() => setShowPopup(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover-animate"
              >
                Close
              </Button>
            </div>
          </div>
        )}
  
      </div>
      <ToastContainer />
    </TooltipProvider>
  );
}
