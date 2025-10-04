import { toast } from "react-toastify";

interface PredictionData {
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
}

export const submitPrediction = async (
  location: { latitude: number; longitude: number },
  yearMonth: string,
  magnitude: number,
  intensityType: "cdi" | "mmi" | undefined,
  intensityValue: number
): Promise<{ tsunami_risk: string } | null> => {
  const depthInput = (
    document.querySelector('input[placeholder="km"]') as HTMLInputElement
  )?.value;
  const stationDistanceInput = (
    document.querySelectorAll('input[placeholder="km"]')[1] as HTMLInputElement
  )?.value;

  const [year, month] = yearMonth.split("-");
  const data: PredictionData = {
    latitude: location.latitude,
    longitude: location.longitude,
    magnitude: magnitude,
    depth: parseFloat(depthInput),
    dmin: parseFloat(stationDistanceInput),
    Year: year,
    Month: month,
    cdi: 0,
    mmi: 0,
    sig: 0,
  };

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
      return result.data;
    } else {
      toast.error(result.error, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to send data!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
    return null;
  }
};
