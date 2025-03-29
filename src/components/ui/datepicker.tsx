"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "@/app/styles/prediction.css";

interface DatepickerProps {
  onDateChange: (yearMonth: string) => void; // callback to pass the selected year and month to the parent
}

export default function Datepicker({ onDateChange }: DatepickerProps) {
  const [date, setDate] = React.useState<Date | undefined>();

  React.useEffect(() => {
    setDate((prev) => prev);
  }, []);

  React.useEffect(() => {
    if (date) {
      // Extract year and month in "yyyy-MM" format and send to parent
      const yearMonth = format(date, "yyyy-MM");
      onDateChange(yearMonth);
    }
  }, [date, onDateChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[170px] bg-zinc-300 text-gray-900 font-md text-sm justify-start text-left placeholder:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors hover-animate hover:bg-zinc-400",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-700" />
          {date ? format(date, "MMMM yyyy") : <span className="text-gray-900">Set Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-zinc-300 text-gray-800 shadow-lg">
        <Calendar
          className="bg-zinc-300 text-gray-800 border-gray-700"
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
