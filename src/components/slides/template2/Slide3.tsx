import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide3Props {
  title?: string;
  description?: string;
  items?: string[];
}

export default function Slide3({
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad",
  items = [
    "Ut enim ad minima",
    "Ut enim ad minima",
    "Ut enim ad minima",
    "Ut enim ad minima",
  ],
}: Slide3Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100 overflow-hidden">
      {/* BrainStrata Logo - Top Right */}
      <div className="absolute top-8 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto"
          width={160}
          height={32}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative h-full px-16 py-16">
        {/* Title */}
        <h1 className="text-6xl font-bold text-gray-900 mb-6">{title}</h1>

        {/* Description */}
        <p className="text-gray-600 text-base mb-12 max-w-3xl leading-relaxed">
          {description}
        </p>

        {/* Numbered List */}
        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6 flex-col w-fit mr-10"
            >
              <div className="flex flex-row items-center gap-5">
                <span className="text-5xl font-bold text-gray-400 leading-none tracking-wide">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-2xl text-gray-700 font-light pt-2 tracking-wide">
                  {item}
                </p>
              </div>
              <Separator className="h-1 border border-gray-400 bg-gray-400 -mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
