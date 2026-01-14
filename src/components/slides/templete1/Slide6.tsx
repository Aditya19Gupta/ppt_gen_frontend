import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide6Props {
  title: string;
  desc: string;
  imageLink1?: string;
  imageLink2?: string;
}

export default function Slide6({ title, desc, imageLink1, imageLink2 }: Slide6Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      <div className="px-16 grid grid-cols-2 pt-20">
        <div>
          <h1 className="text-8xl font-bold text-blue-950 mb-8">{title}</h1>
            <p className="text-gray-700 leading-relaxed text-start text-lg mr-4">
          {desc}
        </p>
        </div>
         <div className="flex gap-0 flex-col">
          {/* Left side - first image */}
          <div className="grid grid-cols-2 gap-0">
              <div></div>
              <div className="w-full h-56 bg-lime-300 border-2 border-blue-950  overflow-hidden">
              {imageLink1 ? (
                <Image
                  src={imageLink1}
                  alt="First image"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              ) : (
                <span className="text-white text-xl font-medium flex items-center justify-center h-full">image here</span>
              )}
            </div>
          </div>
          
          {/* Right side - second image */}
          <div className="grid grid-cols-2">
            <div className="w-full h-56 bg-lime-300  border-2 border-blue-950  overflow-hidden">
              {imageLink2 ? (
                <Image
                  src={imageLink2}
                  alt="Second image"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              ) : (
                <span className="text-white text-xl font-medium flex items-center justify-center h-full">image here</span>
              )}
            </div>
            <div></div>
          </div>
        </div>
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
        <span className="text-gray-600 font-medium">05</span>
      </div>
    </div>
  );
}
