import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide6Props {
  title?: string;
  description?: string;
  numbersTitle?: string;
  numberItems?: string[];
  imageLink?: string;
}

export default function Slide6({
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  numbersTitle = "Numbers",
  numberItems = ["Ut enim ad minima", "Ut enim ad minima", "Ut enim ad minima"],
  imageLink = "",
}: Slide6Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
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
      <div className="grid grid-cols-2 gap-10 px-16 py-16 h-[85vh]">
        <div>
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <h1 className="text-7xl font-extrabold text-gray-900 mb-6">
              {title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-5 mt-16">
              {description}
            </p>

            {/* Numbers Section */}
            <div className="border-l-4 border-gray-900 pl-6">
              <div className="space-y-6">
                {numberItems.map((item, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-0">
                      {numbersTitle}
                    </h2>
                    <p className="text-gray-700 text-base font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-start justify-end">
          <div className="w-full h-full bg-[#113029] rounded-sm flex items-start justify-start p-6 overflow-hidden">
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
      </div>
    </div>
  );
}
