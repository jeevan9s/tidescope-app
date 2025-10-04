import { Button } from "@/components/ui/button";

interface PredictionResultPopupProps {
  tsunamiRisk: string;
  onClose: () => void;
}

export const PredictionResultPopup = ({
  tsunamiRisk,
  onClose,
}: PredictionResultPopupProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold">Tsunami Prediction</h2>
        <p className="mt-2 text-gray-700">
          Risk Level: <strong>{tsunamiRisk}</strong>
        </p>
        <Button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover-animate"
        >
          Close
        </Button>
      </div>
    </div>
  );
};
