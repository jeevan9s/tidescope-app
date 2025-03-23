import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label?: string }
>(({ className, type, label, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm font-bold text-white mb-4">{label}</label>}
      <input
        type={type}
        className={cn(
          "flex flex-row h-9 w-full rounded-md border border-input bg-transparent px-0 py-0 text-xsm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-white file:text-sm file:font-medium placeholder:text-left pl-2 placeholder:text-white-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };

