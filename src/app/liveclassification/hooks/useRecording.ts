import { useState } from "react";

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [recordingCount, setRecordingCount] = useState(0);
  const [classification, setClassification] = useState("");

  const toggleRecording = async () => {
    setIsLoading(true);
    try {
      if (isRecording) {
        setShowSubmit(true);
      } else {
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

  return {
    isRecording,
    isLoading,
    showSubmit,
    classification,
    toggleRecording,
    handleSubmit,
  };
};
