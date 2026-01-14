import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide7Props {
  title: string;
  desc: string;
  imageLink?: string;
}

export default function Slide7({ title, desc, imageLink }: Slide7Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Ring graphic at top */}
      <div className="absolute top-0 right-0">
        <Image
          src="/assets/slide1_ring.png"
          alt="Ring graphic"
          className="w-[600px] h-[600px]"
          width={600}
          height={600}
        />
      </div>

      {/* Title and description on left */}
      <div className="relative z-10 px-14 pt-20">
        <h1 className="text-8xl font-bold text-blue-950 mb-8">{title}</h1>
        <p className="text-gray-700 leading-relaxed text-start text-lg max-w-2xl">
          {desc}
        </p>
      </div>

      {/* Image at bottom left */}
      <div className="absolute bottom-40 right-14">
        <div className="w-96 h-96 bg-sky-600  overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={400}
              height={300}
            />
          ) : (
            <span className="text-white text-xl font-medium flex items-center justify-center h-full">image here</span>
          )}
        </div>
      </div>
      <div className="absolute border-4 border-blue-950 w-60 bg-white h-12 bottom-36 right-80">
        <p className="text-blue-950 text-xl font-medium flex items-center justify-center h-full">Image caption here!</p>
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
        <span className="text-gray-600 font-medium">06</span>
      </div>
    </div>
  );
}
