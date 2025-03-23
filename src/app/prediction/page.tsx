"use client";
import Link from "next/link";
import "../styles/prediction.css";
import Upload from "@/components/ui/upload";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Datepicker from "@/components/ui/datepicker";
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
  // geolocation fetch
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | string | null
  >(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const [yearMonth, setYearMonth] = useState<string>("");

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

  // init data & routes
  
  // toast notis
  const handleSubmit = async () => {
    if (typeof location === "string" || location === null) {
      toast.error("Location not set!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    const [year, month] = yearMonth.split("-");
  
    const depthInput = (document.querySelector('input[placeholder="km"]') as HTMLInputElement)?.value || "0";
    const stationDistanceInput = (
      document.querySelectorAll('input[placeholder="km"]')[1] as HTMLInputElement
    )?.value || "0";
  
    const data = {
      latitude: location.latitude,
      longitude: location.longitude,
      magnitude: magnitude,
      depth: parseFloat(depthInput),
      station_distance: parseFloat(stationDistanceInput),
      year: year,
      month: month,
    };
  
    const formData = new FormData();
    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    formData.append("magnitude", data.magnitude.toString());
    formData.append("depth", data.depth.toString());
    formData.append("station_distance", data.station_distance.toString());
    formData.append("year", data.year);
    formData.append("month", data.month);
  
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
  
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData, 
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success(
          "Parameters and file successfully submitted, awaiting model predictions.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          }
        );
        console.log("Backend Response:", result);
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
  
  
  

  const [magnitude, setMagnitude] = useState<number>(0);

  return (
    <TooltipProvider>
      <div className="page flex justify-center items-center min-h-screen bg-gray-900">
        <title>Prediction Model</title>
        <div className="title-cntr3">
          <Link href="/main">
            <h1 id="title3" className="text-white text-center font-normal mb-2">
              <span className="text-sky-700 ">Tide</span>
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
            <span id="sec-h" className="text-black text-md font-bold">
              General Information
            </span>
            <div
              id="subfield-1"
              className="flex flex-row items-center justify-between w-full space-x-6"
            >
              <Datepicker onDateChange={handleDateChange} />
              <Button
                onClick={getLocation}
                className="bg-zinc-300  font-md text-gray-950 px-4 py-2 rounded hover:bg-zinc-400"
              >
                Location
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Upload  />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={2}>
                  <p>Upload seismic data (CSV/JSON).</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="flex flex-col w-full space-y-4">
            <span id="sec2-h" className="text-black text-md font-bold">
              Seismic Parameters
            </span>
            <div className="flex items-center justify-center space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Slider
                      className="w-64 h-2 mt-1 text-gray-800"
                      label="Earthquake Magnitude"
                      min={0}
                      max={10}
                      value={magnitude} // Controlled value
                      onValueChange={(value: number) => setMagnitude(value)} // Update state
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set earthquake strength (Mw)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex flex-row items-center justify-between space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mb-3">
                    <Label className="text-gray-800 font-normal">
                      Earthquake Depth
                    </Label>
                    <Input
                      className="w-24 bg-zinc-300 text-gray-800 mt-1"
                      type="number"
                      placeholder="km"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="translate-x-4">
                  <p>Enter depth of earthquake rupture</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mb-3">
                    <Label className="text-gray-800 font-normal">
                      Station Distance
                    </Label>
                    <Input
                      className="w-24 mt-1 text-gray-800 bg-zinc-300"
                      type="number"
                      placeholder="km"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter distance from epicenter to nearest station</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Button
              onClick={handleSubmit}
              className="bg-zinc-800 text-white px-6 py-2 rounded mt-4 hover:bg-sky-700"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
