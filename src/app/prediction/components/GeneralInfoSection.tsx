import { Button } from "@/components/ui/button";
import Datepicker from "@/components/ui/datepicker";
import Upload from "@/components/ui/upload";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface GeneralInfoSectionProps {
  onDateChange: (date: string) => void;
  onLocationClick: () => void;
}

export const GeneralInfoSection = ({
  onDateChange,
  onLocationClick,
}: GeneralInfoSectionProps) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      <span id="sec-h" className="text-black text-md font-bold">General Information</span>
      <div
        id="subfield-1"
        className="flex flex-row items-center justify-between w-full space-x-6"
      >
        <Datepicker onDateChange={onDateChange} />
        <Button
          onClick={onLocationClick}
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
  );
};
