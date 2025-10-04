import { toast } from "react-toastify";

export const validateForm = (
  yearMonth: string,
  location: { latitude: number; longitude: number } | string | null,
  magnitude: number,
  intensityType: "cdi" | "mmi" | undefined,
  intensityValue: number
): boolean => {
  if (!yearMonth) {
    toast.error("Please select a year and month!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
    return false;
  }

  if (typeof location === "string" || location === null) {
    toast.error("Location not set!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
    return false;
  }

  if (magnitude === 0) {
    toast.error("Please select a valid earthquake magnitude!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
    return false;
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
    return false;
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
    return false;
  }

  if (intensityType && intensityValue === undefined) {
    toast.error("Please select an intensity value!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
    return false;
  }

  return true;
};
