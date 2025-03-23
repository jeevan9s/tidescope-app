import { Slider } from "./slider";
import { Label } from "./label";
import "../ui/sliderfull.css";

interface sliderprops {
    label:string;
    range: number;
}


export default function ({ label, range }:sliderprops) {  
    return (
        <div>
            <Label className="text-white mb-5">{label}</Label>  
            <div className="flex h-9 w-full rounded-md bg-zinc-900 text-white border-gray-700 px-3 py-3 mt-2 text-base shadow-sm">
            <Slider  range = {range} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer" />
            </div>
        </div>
    );
}
