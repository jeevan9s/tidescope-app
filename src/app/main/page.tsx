import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "../styles/main.css";

export default function Main() {
  return (
    <TooltipProvider>
      <div id="page" className=" flex flex-col items-center justify-center min-h-screen text-center">
        <div id="title-cntr">
          <h1 id="title" className="text-white text-center mb-2">
            <span className="text-sky-700 ">Tide</span>
            <span className="text-zinc-100">Scope</span>
          </h1>
          <p id="subtitle" className="text-stone-200 text-center max-w-2xl">
          TideScope predicts <b>tsunami occurence</b> using <b>earthquake data</b> and utilizes an <b>ESP32-powered sensor system</b> to classify <b>risk levels</b> in real time.</p>

        </div>

        <div id="navigation" className="flex flex-col items-center gap-4 mt-2 mb-3">
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/prediction">
                <Button id = "button1" className="w-80 h-11 bg-zinc-100 rounded-xl font-thin text-black transition hover:bg-sky-700 hover:font-bold hover:text-white">
                  Prediction Model
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View and analyze the prediction model for tsunami risks.</p>
            </TooltipContent>
          </Tooltip>

          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/liveclassification">
                <Button id = "button3" className="w-80 h-11 bg-zinc-100 rounded-xl font-thin text-black transition transform hover:scale-2 hover:font-bold hover:bg-sky-700 hover:text-white">
                  Live-Classification Model
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Access real-time classification of simulation.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
