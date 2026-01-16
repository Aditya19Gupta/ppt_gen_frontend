import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide3Props {
  leftHeader?: string;
  leftBody?: string;
  title?: string;
  image?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
}

export default function Slide3({
  leftHeader,
  leftBody,
  title,
  image,
}: Slide3Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-5 gap-5 h-[85vh]">
        <div className="col-span-2 h-full pl-16 pt-16">
          {/* Header Text */}
          <p className="text-xl text-gray-600 font-light max-w-4xl mx-auto">
            {leftHeader}
          </p>
          <Separator className="max-w-10 h-1 border border-black text-center mb-12" />

          {/* Body Text */}
          <p className="text-sm font-light text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
            {leftBody}
          </p>
          <h1 className="text-6xl font-bold text-[#545A61] leading-tight mb-8">
            {title}
          </h1>
        </div>
        <div className="col-span-3 h-full">
          {/* Image */}
          {image?.imageUrl ? (
            <div className="w-full max-w-4xl mx-auto h-full overflow-hidden mb-16">
              <Image
                src={image.imageUrl}
                alt={image.imagePrompt || "Slide image"}
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-16">
              <p className="text-gray-500 text-lg">Image Placeholder</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
