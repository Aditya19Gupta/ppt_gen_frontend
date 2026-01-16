import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide7Props {
  tagline?: string;
  title?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
}

export default function Slide7({
  tagline = "Tagline",
  title = "Slide Title",
  items = [
    {
      title: "Title 1",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
    {
      title: "Title 2",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
    {
      title: "Title 3",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
  ],
}: Slide7Props) {
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
      <div className="grid grid-cols-9 gap-5 px-16 py-16 h-[85vh]">
        {/* Left Side - Content */}
        <div className="flex flex-col col-span-5">
          {/* Tagline */}
          <p className="text-gray-300 text-sm font-light mb-2">{tagline}</p>

          {/* Title */}
          <h1 className="text-6xl font-bold text-white mb-1">{title}</h1>
          <Separator className="mb-20" />
          {/* Numbered Items */}
          <div className="space-y-8">
            {items.map((item, index) => (
              <div key={index} className="flex shrink-0 items-start gap-4">
                {/* Number Circle */}
                <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-center w-5 h-5 rounded-full text-sm font-bold bg-white text-[#113029]"></span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-white text-lg font-bold mb-0">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4">
          <div className="w-full h-full bg-[#2d6b56] rounded-sm flex items-start justify-start p-6 overflow-hidden">
            <span className="text-white text-sm font-light">Image Here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
