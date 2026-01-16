import Image from "next/image";
import React from "react";

interface Slide10Props {
  thankYou?: string;
}

export default function Slide10({
  thankYou = "Thank You!",
}: Slide10Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-2 h-[85vh]">
        <div className="flex justify-start items-center h-full z-5 px-16">
          <h1 className="text-7xl font-extrabold text-[#2D3139]">Thank you</h1>
        </div>
        <div className="bg-gray-200 h-full"></div>
      </div>
      <div className="absolute z-10 bg-[#2D3139] h-2/3 w-3/5 bottom-28 right-0"></div>
    </div>
  );
}
