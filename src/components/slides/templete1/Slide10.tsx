import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide10Props {
  title: string;
  desc: string;
  imageLink?: string;
}

export default function Slide10({ title, desc, imageLink }: Slide10Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* White circle at top */}
      <div className="w-32 h-32 rounded-full bg-white border-2 border-black absolute -right-30 -top-30"></div>

      {/* Title and description in grid */}
      <div className="flex justify-between items-center pt-16 px-16">
        <div className="w-1/2">
          <Image
            src="/assets/chess.png"
            alt="Slide content"
            className="w-full h-full object-cover"
            width={800}
            height={400}
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-9xl font-bold text-start ml-20 text-blue-950">
            Thank You!
          </h1>
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
        <span className="text-gray-600 font-medium">08</span>
      </div>
    </div>
  );
}
