import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide9Props {
  title?: string;
  subtitle?: string;
  item1Title?: string;
  item1Desc?: string;
  item2Title?: string;
  item2Desc?: string;
  item3Title?: string;
  item3Desc?: string;
  highlightTitle?: string;
  highlightDesc?: string;
  image?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
}

export default function Slide9({
  title,
  subtitle,
  item1Title,
  item1Desc,
  item2Title,
  item2Desc,
  item3Title,
  item3Desc,
  highlightTitle,
  highlightDesc,
  image,
}: Slide9Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-2 h-[85vh]">
        <div className="h-full bg-gray-900">
          
        </div>
        <div className="py-20 px-10 h-full w-full">
          <h1 className="text-3xl font-bold text-[#2D3139]">{title}</h1>
          <p className="text-lg font-extralight text-[#2D3139] mt-10">
            {subtitle}
          </p>
          <Separator className="max-w-10 h-1 border border-[#2D3139] mt-4" />
          <div className="mt-16 grid-cols-2 grid gap-4">
            <div className="flex flex-col items-start p-4">
              <div className="w-8 h-8 rounded-full border border-[#2D3139] flex items-center justify-center mb-2">
                <div className="w-4 h-4 rounded-full bg-[#2D3139]"></div>
              </div>
              <h3 className="text-sm font-bold text-[#2D3139]">{item1Title}</h3>
              <p className="text-sm font-extralight text-[#2D3139]">
                {item1Desc}
              </p>
            </div>
            <div className="flex flex-col items-start bg-[#2D3139] rounded-md p-4">
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
              <h3 className="text-sm font-bold text-white">{item2Title}</h3>
              <p className="text-sm font-extralight text-white">{item2Desc}</p>
            </div>
            <div className="flex flex-col items-start p-4">
              <div className="w-8 h-8 rounded-full border border-[#2D3139] flex items-center justify-center mb-2">
                <div className="w-4 h-4 rounded-full bg-[#2D3139]"></div>
              </div>
              <h3 className="text-sm font-bold text-[#2D3139]">{item3Title}</h3>
              <p className="text-sm font-extralight text-[#2D3139]">
                {item3Desc}
              </p>
            </div>
            <div className="flex flex-col items-start p-4">
              <div className="w-8 h-8 rounded-full border border-[#2D3139] flex items-center justify-center mb-2">
                <div className="w-4 h-4 rounded-full bg-[#2D3139]"></div>
              </div>
              <h3 className="text-sm font-bold text-[#2D3139]">{item3Title}</h3>
              <p className="text-sm font-extralight text-[#2D3139]">
                {item3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
