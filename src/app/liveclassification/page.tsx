"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import "../styles/liveclassification.css";
import Link from "next/link";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useRecording } from "./hooks/useRecording";
import { RecordingButton } from "./components/RecordingButton";
import { ClassificationResult } from "./components/ClassificationResult";

export default function LiveClassificationPage() {
  const {
    isRecording,
    isLoading,
    showSubmit,
    classification,
    toggleRecording,
    handleSubmit,
  } = useRecording();

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

        <RecordingButton
          isRecording={isRecording}
          isLoading={isLoading}
          onToggle={toggleRecording}
        />

        {showSubmit && (
          <Button className="bg-green-600 mt-4" onClick={handleSubmit}>
            Submit
          </Button>
        )}

        <ClassificationResult classification={classification} />
      </div>
    </TooltipProvider>
  );
}
