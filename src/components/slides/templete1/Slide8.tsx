import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import React from "react";

interface Slide8Props {
  imageLink?: string;
}

export default function Slide8({ imageLink }: Slide8Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      <div className="p-16">
        <div className="w-full h-[60vh] bg-sky-600  overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={400}
              height={300}
            />
          ) : (
            <span className="text-white text-xl font-medium flex items-center justify-center h-full">
              image here
            </span>
          )}
        </div>
      </div>
      <div className="absolute border-4 border-blue-950 w-60 bg-white h-12 bottom-28 left-[450px]">
        <p className="text-blue-950 text-xl font-medium flex items-center justify-center h-full">
          Image caption here!
        </p>
      </div>
      {/* Blue line at bottom */}
      <Separator className="absolute bottom-14 left-0 right-0 h-1 border-2 border-blue-950 bg-blue-950" />

      {/* Logo and page number at bottom */}
      <div className="absolute bottom-4 left-12 right-8 flex items-center justify-between">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-40"
          width={1000}
          height={24}
        />
        <span className="text-gray-600 font-medium">07</span>
      </div>
    </div>
  );
}
