"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { autocomplete } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { useEffect, useState } from "react";

export default function Locselect() {
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (input.trim() === "") {
        setPredictions([]); // Clear predictions if input is empty
        return;
      }
      
      setLoading(true);
      try {
        const predictions = await autocomplete(input);
        setPredictions(predictions ?? []);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictions([]); // Clear predictions on error
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchPredictions(), 300); // Debouncing
    return () => clearTimeout(timer); // Clean up timeout
  }, [input]);

  return (
    <Command className="flex flex-col items-center h-15 justify-center bg-zinc-900 text-white border border-gray-700 w-[250px] text-left font-normal">
      <CommandInput
        value={input}
        onValueChange={setInput}
        className="w-full p-2 bg-zinc-900 text-white rounded-md focus:outline-none resize-none overflow-auto"
        placeholder="Type a command or search..."
      />
      <CommandList className="w-full bg-zinc-900 text-white mt-2">
        {loading ? (
          <CommandEmpty>Loading...</CommandEmpty>
        ) : predictions.length === 0 ? (
          <CommandEmpty>Search...</CommandEmpty>
        ) : (
          <CommandGroup heading="Suggestions">
            {predictions.map((prediction) => (
              <CommandItem key={prediction.place_id}>
                {prediction.description}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
