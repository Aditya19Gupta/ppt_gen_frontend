import Image from "next/image";
import React from "react";

interface Slide8Props {
  imageLink?: string;
}

export default function Slide8({
  imageLink
}: Slide8Props) {
  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden flex">
      {/* Left Side - White Background with Image */}
      <div className="w-2/3 bg-white flex items-center justify-center p-16 relative">
        {/* Logo - Top Right */}
        <div className="absolute top-4 right-8 z-10">
          <Image
            src="/assets/logo.png"
            alt="BrainStrata Logo"
            className="h-8 w-auto"
            width={160}
            height={32}
          />
        </div>

        {/* Image Placeholder */}
        <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">Image Here</div>
          )}
        </div>
      </div>

      {/* Right Side - Light Grey Background */}
      <div className="w-1/3 bg-gray-200"></div>
    </div>
  );
}

