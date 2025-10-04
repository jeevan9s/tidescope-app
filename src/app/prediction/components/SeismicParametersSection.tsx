import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "@/components/ui/dropdown";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface SeismicParametersSectionProps {
  magnitude: number;
  onMagnitudeChange: (value: number) => void;
  intensityType: "cdi" | "mmi" | undefined;
  onIntensityTypeChange: (value: "cdi" | "mmi") => void;
  intensityValue: number;
  onIntensityValueChange: (value: number) => void;
}

export const SeismicParametersSection = ({
  magnitude,
  onMagnitudeChange,
  intensityType,
  onIntensityTypeChange,
  intensityValue,
  onIntensityValueChange,
}: SeismicParametersSectionProps) => {
  return (
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
                onValueChange={onMagnitudeChange}
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
                  onIntensityTypeChange(value as "cdi" | "mmi");
                  onIntensityValueChange(0);
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

              {intensityType && <ComboboxDemo value={intensityValue} setValue={onIntensityValueChange} />}
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
    </div>
  );
};
