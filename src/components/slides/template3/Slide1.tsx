import Image from "next/image";
import React from "react";

interface Slide1Props {
  title?: string;
  description?: string;
}

export default function Slide1({
  title = "Slide Title",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}: Slide1Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white p-10 overflow-hidden">
      <div className="flex items-center justify-center h-[75vh]">
        <div className="bg-[#2D3139] flex items-center justify-center h-full w-full">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white leading-tight mb-8">
              {title}
            </h1>
            <p className="text-lg px-32 font-light text-gray-400">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
