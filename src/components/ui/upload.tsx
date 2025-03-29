// "use client";  

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/styles/prediction.css";

export default function FileUpload() {
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [uploading, setUploading] = useState(false);

  // const handleClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (!file) return;

  //   // Check for valid file types
  //   const allowedTypes = ["text/csv", "application/json"];
  //   if (!allowedTypes.includes(file.type)) {
  //     toast.error("Invalid file type! Please upload a CSV or JSON.", { theme: "dark" });
  //     return;
  //   }

  //   setUploading(true);

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await fetch("http://localhost:5000/predict", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       toast.success(`${file.name} successfully uploaded!`, { theme: "dark" });
  //     } else {
  //       toast.error(`Upload failed: ${data.error}`, { theme: "dark" });
  //     }
  //   } catch (error) {
  //     toast.error("Error uploading file!", { theme: "dark" });
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <div className="grid w-10 max-w-sm items-center gap-1.5">
      <button
        type="button"
        className="bg-zinc-300 mt-2 text-gray-700 p-2.5 px-3 rounded flex items-center justify-center hover-animate hover:bg-zinc-400 hover:font-bold"
        // onClick={handleClick}
        // disabled={uploading}
      >
        {/* {uploading ? "Uploading..." : ( */}
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
        {/* )} */}
        <span className="sr-only">Upload</span>
      </button>
      <Input
        // ref={fileInputRef}
        id="file"
        type="file"
        className="hidden"
        // onChange={handleFileChange}
      />
      <ToastContainer />
    </div>
  );
}
