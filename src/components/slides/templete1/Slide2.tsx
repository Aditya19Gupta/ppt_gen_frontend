import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide2Props {
  title: string;
  desc: string;
  imageLink: string;
}

export default function Slide2({ title, desc, imageLink }: Slide2Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Main content - left side with title and description */}
      <div className="absolute top-24 left-12 right-1/2 mr-4">
        <h1 className="text-7xl font-semibold text-blue-900 mb-6">
          {title}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Right side - image */}
      <div className="absolute top-16 right-12 left-1/2">
        <div className="w-full h-[65vh] bg-blue-900 flex items-center justify-center rounded-lg overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={500}
              height={400}
            />
          ) : (
            <span className="text-white text-xl font-medium">image here</span>
          )}
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
        <span className="text-gray-600 font-medium">01</span>
      </div>
    </div>
  );
}
