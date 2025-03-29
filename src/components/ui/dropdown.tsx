import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import "@/app/styles/prediction.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define the intensity options as numbers
const frameworks = [
  { value: 1, label: "1 - Weak" },
  { value: 2, label: "2 - Light" },
  { value: 3, label: "3 - Moderate" },
  { value: 4, label: "4 - Rather Strong" },
  { value: 5, label: "5 - Strong" },
  { value: 6, label: "6 - Very Strong" },
  { value: 7, label: "7 - Severe" },
  { value: 8, label: "8 - Violent" },
  { value: 9, label: "9 - Extreme" },
];

export function ComboboxDemo({
  value,
  setValue,
}: {
  value: number;
  setValue: (val: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between text-gray-700 ml-8 w-30 bg-zinc-300 text-gray-800 mb-6 hover-animate hover:bg-zinc-400"
        >
          {value ? frameworks.find((framework) => framework.value === value)?.label : "Select"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-45 p-0">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>No intensity found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={() => {
                    console.log('Selected value:', framework.value); // Add this log to debug
                    setValue(framework.value); // Ensure it's setting correctly
                    setOpen(false); // Close the dropdown after selection
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
