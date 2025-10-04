import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecordingButtonProps {
  isRecording: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

export const RecordingButton = ({
  isRecording,
  isLoading,
  onToggle,
}: RecordingButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="bg-sky-700 flex items-center justify-center hover-animate"
          onClick={onToggle}
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
  );
};
