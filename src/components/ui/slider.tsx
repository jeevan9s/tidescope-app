"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Input } from "@/components/ui/input";

interface SliderProps {
  label: string;
  max: number;
  min: number;
  className?: string;
  value: number; // Value passed from parent
  onValueChange: (value: number) => void; // Callback to update parent state
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & SliderProps
>(({ className, label, max, min, value, onValueChange, ...props }, ref) => {
  const [inputValue, setInputValue] = React.useState<string>(String(value));

  // Sync input field whenever the value changes
  React.useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleSliderChange = (val: number[]) => {
    if (val.length === 0) return;
    const newValue = Math.max(min, Math.min(max, val[0])); // Clamp value
    onValueChange(newValue); // Update parent state
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setInputValue(""); // Allow users to clear the input temporarily
      return;
    }

    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue)) {
      const clampedValue = Math.max(min, Math.min(max, parsedValue)); // Clamp within bounds
      setInputValue(newValue); // Temporarily store string version
    }
  };

  const handleBlur = () => {
    let numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      numValue = min;
    }
    numValue = Math.max(min, Math.min(max, numValue)); // Clamp value
    onValueChange(numValue); // Update parent state
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-gray-800 font-normal">{label}</Label>
      <div className="flex items-center gap-3 bg-zinc-300 rounded-lg p-3">
        <SliderPrimitive.Root
          ref={ref}
          className={cn("relative flex w-full touch-none select-none items-center", className)}
          value={[value]} // Controlled by parent
          onValueChange={handleSliderChange} // Pass to parent callback
          min={min}
          max={max}
          step={0.01} // Ensure decimal precision
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-400">
            {/* Slided section with darker grey */}
            <SliderPrimitive.Range className="absolute h-full bg-sky-600" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="m-2 block h-4 w-4 rounded-full bg-background shadow" />
        </SliderPrimitive.Root>
        <Input
          type="number"
          className="w-14 h-8 text-sm text-center text-gray-700 font-normal bg-zinc-300 rounded-md border-none"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          step="0.01" // Allow decimal steps
        />
      </div>
    </div>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;
export { Slider };