"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import "../ui/metric.css";

interface MetricProps {
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function Metric({ label, placeholder, min, max, step }: MetricProps) {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val !== "") {
      let numVal = Number(val);
      if (min !== undefined && numVal < min) numVal = min;
      if (max !== undefined && numVal > max) numVal = max;
      val = numVal.toString();
    }
    setValue(val);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="metric" className="text-white mb-2">{label}</Label>
      <Input
        type="number"
        inputMode="numeric"
        id="metric"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        step={step}
        className={cn(
          "w-[100px] bg-zinc-900 text-white border-gray-700 justify-start text-left font-normal"
        )}
      />
    </div>
  );
}
