import Image from "next/image";
import React from "react";

interface Slide8Props {
  box1Title?: string;
  box1Desc?: string;
  box2Title?: string;
  box2Desc?: string;
  image?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
}

export default function Slide8({
  box1Title,
  box1Desc,
  box2Title,
  box2Desc,
  image,
}: Slide8Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16 py-20">
      <div className="grid grid-cols-4 h-[63vh] grid-rows-2">
        <div className="col-span-2 bg-black    h-full border border-white"></div>
        <div className="col-span-1 bg-black h-full border border-white"></div>
        <div className="col-span-1 row-span-2 bg-black h-full border border-white"></div>
        <div className="col-span-1 row-span-2 p-4 text-center bg-black h-full border border-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <p className="text-white text-sm font-extralight">{box1Title}</p>
            <p className="text-white text-sm">{box1Desc}</p>
          </div>
        </div>
        <div className="col-span-1 row-span-2 bg-black h-full border border-white"></div>
        <div className="col-span-1 row-span-2 bg-black h-full border p-4 text-center border-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <p className="text-white text-sm font-extralight">{box2Title}</p>
            <p className="text-white text-sm">{box2Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
