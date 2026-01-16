import Image from "next/image";
import React from "react";

interface Slide5Props {
  title?: string;
  sampleText?: string;
  description?: string;
  imageLink?: string;
}

export default function Slide5({
  title = "Slide Title",
  sampleText = "This is a sample text to tell story for audience is written here",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  imageLink,
}: Slide5Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      {/* BrainStrata Logo - Top Right */}
      <div className="absolute top-4 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto invert"
          width={160}
          height={32}
        />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col gap-0">
        <div className="bg-[#113029] w-full h-[40vh] p-0 overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <p className="text-white text-sm font-light">Image Here</p>
          )}
        </div>
        <div className="grid grid-cols-5 pt-10 px-16">
          <h1 className="text-7xl font-extrabold text-gray-900 mb-6 col-span-3">
            {title}
          </h1>
          <div className="flex flex-col col-span-2">
            <h3 className="text-2xl  text-gray-900 mb-6 font-light">
              {sampleText}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
