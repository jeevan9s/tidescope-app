"use client";
import React, { useState } from "react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import "../styles/liveclassification.css";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LiveClassificationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [recordingCount, setRecordingCount] = useState(0);
  const [classification, setClassification] = useState("");

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      if (isRecording) {
        // Stopping recording
        setShowSubmit(true);
      } else {
        // Starting new recording, reset previous state
        setShowSubmit(false);
        setClassification("");
      }
      setIsRecording((prev) => !prev);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (recordingCount === 0) {
      setClassification("No Tsunami Event Detected");
    } else if (recordingCount === 1) {
      setClassification("Tsunami Event Detected | High Severity");
    }
    setRecordingCount(recordingCount + 1);
  };

  return (
    <TooltipProvider>
      <div id="page" className="flex flex-col items-center justify-center min-h-screen text-center">
        <title>Live Classification</title>
        <div className="title-cntr3">
          <Link href="/main">
            <h1 id="title3" className="text-white text-center font-normal mb-2">
              <span className="text-sky-700">Tide</span>
              <span className="text-zinc-100">Scope</span>
            </h1>
          </Link>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="bg-sky-700 flex items-center justify-center hover-animate"
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isRecording ? (
                <>
                  <Spinner className="spinner mr-2" /> Stop Recording
                </>
              ) : (
                "Start Recording"
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Start capturing real-time sensor data for tsunami classification.</p>
          </TooltipContent>
        </Tooltip>

        {showSubmit && (
          <Button className="bg-green-600 mt-4" onClick={handleSubmit}>
            Submit
          </Button>
        )}

{classification && (
  <div className="mt-4 text-lg font-bold text-black bg-white p-4 rounded-md shadow-md">
    Classification Result: <span className="text-blue-600">{classification}</span>
  </div>
)}
      </div>
    </TooltipProvider>
  );
}
