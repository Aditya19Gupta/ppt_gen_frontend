import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide1Props {
  title: string;
}

export default function Slide1({ title }: Slide1Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Colored squares in top-left */}
      <div className="absolute top-16 left-12 flex gap-2">
        <div className="w-24 h-24 bg-purple-600"></div>
        <div className="w-24 h-24 bg-lime-400"></div>
        <div className="w-24 h-24 bg-blue-900"></div>
      </div>

      {/* Ring graphic in top-right */}
      <div className="absolute top-0 right-0">
        <Image
          src="/assets/slide1_ring.png"
          alt="Ring decoration"
          className="w-[600px] h-[600px]"
          width={1000}
          height={1000}
        />
      </div>

      {/* Main title in center-left */}
      <div className="absolute top-3/4 left-12 transform -translate-y-1/2">
        <h1 className="text-9xl font-bold text-blue-900">{title}</h1>
      </div>
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
        <span className="text-gray-600 font-medium">00</span>
      </div>
    </div>
  );
}
