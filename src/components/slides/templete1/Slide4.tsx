import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide4Props {
  imageLink?: string;
  description: string;
}

export default function Slide4({ imageLink, description }: Slide4Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Image placeholder in center */}
      <div className="flex items-center justify-center h-full pt-20">
        <div className="w-full mx-14 h-64 bg-sky-600 flex items-center justify-center rounded-lg overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={400}
              height={300}
            />
          ) : (
            <span className="text-white text-xl font-medium">image here</span>
          )}
        </div>
      </div>

      {/* Description text below image */}
      <div className="absolute mt-10 left-12 right-12">
        <p className="text-gray-700 leading-relaxed text-center">
          {description}
        </p>
      </div>

      {/* Blue line at bottom */}
      <Separator className="absolute bottom-14 left-0 right-0 h-2 border-2 border-blue-950 bg-blue-950" />
      
      {/* Logo and page number at bottom */}
      <div className="absolute bottom-4 left-12 right-8 flex items-center justify-between">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-40"
          width={1000}
          height={24}
        />
        <span className="text-gray-600 font-medium">03</span>
      </div>
    </div>
  );
}
