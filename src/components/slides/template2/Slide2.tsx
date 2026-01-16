import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide2Props {
  tagline?: string;
  title?: string;
  description?: string;
  contentTitle?: string;
  contentDescription?: string;
  imageLink?: string;
}

export default function Slide2({
  tagline = "Tagline",
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  contentTitle = "We start take off in 2019",
  contentDescription = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam ut enim ad minima veniam, quis.",
  imageLink = "",
}: Slide2Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#113029]  overflow-hidden">
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
      <div className="flex flex-col pt-16 px-16 w-1/2">
        <p className="text-gray-300 text-sm font-light mb-2">{tagline}</p>
        <div>
          <h1 className="text-6xl font-bold text-white mb-1">{title}</h1>
          <Separator className="h-2 border-2 border-[#2d6b56] bg-[#2d6b56]" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-12 px-16">
        <div className="flex flex-col col-span-3">
          <p className="text-gray-300 text-sm font-light mt-28">
            {contentDescription}
          </p>
        </div>
        <div className="flex flex-col -mt-5 col-span-2">
          <h3 className="text-2xl font-bold text-white mb-1">{contentTitle}</h3>
          <p className="text-gray-300 text-sm font-light mt-5">
            {contentDescription}
          </p>
        </div>
      </div>
      {/* Two Column Layout */}
      <div className="absolute bottom-0 w-full">
        {/* Image Placeholder */}
        <div className="w-full h-[35vh] bg-[#2d6b56]  rounded-sm flex items-center justify-start p-0overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <span className="text-white text-sm font-light">Image Here</span>
          )}
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
