import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide8Props {
  mainText?: string;
  description?: string;
}

export default function Slide8({
  mainText = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
}: Slide8Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16 py-16">
      {/* BrainStrata Logo - Top Right */}
      <div className="absolute top-4 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto"
          width={160}
          height={32}
        />
      </div>

      {/* Main Content Container */}
      <div className="grid grid-cols-5 h-[70vh] gap-5">
        {/* Left Side - White Background with Text */}
        <div className="flex flex-col justify-start col-span-2">
          {/* Main Text */}
          <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {mainText}
          </h2>
          <div className="flex flex-row h-full gap-4 mb-10 items-end">
            <Separator
              orientation="vertical"
              className="h-24 w-2 border-2 border-gray-300"
            />
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mt-20">
              {description}
            </p>
          </div>
        </div>

        {/* Right Side - Dark Green Area */}
        <div className="bg-[#2d6b56] flex items-start p-6 justify-start col-span-3 overflow-hidden">
          <span className="text-white text-sm font-light">Image Here</span>
        </div>
      </div>
    </div>
  );
}
