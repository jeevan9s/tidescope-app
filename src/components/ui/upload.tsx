"use client";  // Use client-side rendering for this component
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    // Trigger the file input click event when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file selection
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`${file.name} successfully uploaded!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="grid w-10 max-w-sm items-center gap-1.5">
      <button
        type="button"
        className="bg-zinc-300 mt-2 text-gray-700 p-2.5 px-3 rounded flex items-center justify-center hover:bg-zinc-400 hover:font-bold"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 11.25L12 16.5m0 0l-4.5-5.25m4.5 5.25V3"
          />
        </svg>
        <span className="sr-only">Upload</span>
      </button>
      <Input
        ref={fileInputRef}
        id="picture"
        type="file"
        className="hidden" // Hide the default file input element
        onChange={handleFileChange} // Handle file changes
      />
      <ToastContainer />
    </div>
  );
}
