import Image from "next/image";
import React from "react";

interface Slide1Props {
  title?: string;
  subtitle?: string;
  imageLink?:string;
}

export default function Slide1({
  title = "Slide Title",
  subtitle = "Clean Presentation Templates",
  imageLink,
}: Slide1Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#113029] overflow-hidden">
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
      <div className="relative h-full flex items-center px-16 py-20">
        {/* Left Side - Text Content */}
        <div className="flex-1 z-10">
          <h1 className="absolute bottom-16 left-14 text-9xl font-extrabold text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-2xl text-gray-300 font-light absolute bottom-16 left-16">
            {subtitle}
          </p>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="flex-1 flex items-center justify-center pl-12">
          <div className="w-[550px] h-[65vh] bg-[#2d6b56] rounded-sm border-2 border-[#3a7d66] flex items-start justify-baseline p-0">
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
        </div>
      </div>

      {/* Decorative gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
