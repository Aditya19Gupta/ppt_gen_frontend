import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide7Props {
  title?: string;
  subtitle?: string;
  stat1Title?: string;
  stat1Value?: string;
  stat2Title?: string;
  stat2Value?: string;
  stat3Title?: string;
  stat3Value?: string;
  image?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
}

export default function Slide7({
  title,
  subtitle,
  stat1Title,
  stat1Value,
  stat2Title,
  stat2Value,
  stat3Title,
  stat3Value,
  image,
}: Slide7Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-5 h-[85vh]">
        <div className="col-span-2 py-20 pl-16">
            <h1 className="text-5xl font-bold text-black">{title}</h1>
            <p className="text-lg font-extralight text-black mt-10">{subtitle}</p>
            <Separator className="max-w-10 h-1 border border-black mt-4" />

        </div>
        <div className="col-span-3 h-full bg-black relative">
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0 p-0">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`${i === 4 ? "border-b-0": ""} ${i === 7 ? "border-t-0": ""} bg-gray-900 border border-white`}>
              </div>
            ))}
          </div>

          {/* Central Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center mt-32">
            {/* Title Number Elements */}
            <div className="flex flex-col items-center space-y-6 mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                  </div>
                  <p className="text-white text-sm font-extralight">Title</p>
                  <p className="text-white text-sm">Number</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
