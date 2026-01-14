import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide9Props {
  title: string;
  desc: string;
  imageLink?: string;
}

export default function Slide9({ title, desc, imageLink }: Slide9Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Title at top */}
      <div className="w-96 h-96 rounded-full absolute -right-30 -top-30 bg-white border-2 border-black"></div>
      {/* Description paragraph */}
      <div className="grid grid-cols-2 pt-16 px-16">
        <div className="mb-12">
          <div className="text-start">
            <h1 className="text-7xl font-semibold text-blue-950 mb-8">{title}</h1>
          </div>
          <p className="text-gray-700 leading-relaxed text-start text-lg mr-5">
            {desc}
          </p>
        </div>
        <div className="w-full h-[50vh] bg-sky-600 rounded-lg overflow-hidden mt-10">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <span className="text-white text-xl font-medium flex items-center justify-center h-full">
              image here
            </span>
          )}
        </div>
      </div>
      {/* Image at bottom */}

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
        <span className="text-gray-600 font-medium">07</span>
      </div>
    </div>
  );
}
