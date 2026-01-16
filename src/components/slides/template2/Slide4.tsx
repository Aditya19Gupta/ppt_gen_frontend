import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide4Props {
  title?: string;
  description?: string;
  imageLink?: string;
  description2?: string;
}

export default function Slide4({
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  imageLink = "",
  description2 = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
}: Slide4Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16">
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

      {/* Blue horizontal lines at top */}
      <div className="flex flex-col w-full pb-8 pt-16">
        <p className="text-gray-600 text-sm font-medium leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-1 mb-10">
        <div className="w-full h-[30vh] bg-[#113029] flex items-center justify-start p-6 overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <span className="text-white text-sm font-light">Image Here</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-5">
        <h1 className="text-7xl font-bold text-gray-900 mb-6 col-span-3">
          {title}
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed col-span-2">
          {description2}
        </p>
      </div>
    </div>
  );
}
