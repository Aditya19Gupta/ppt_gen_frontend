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
  stat1Image?: { imagePrompt?: string; imageUrl?: string };
  stat2Image?: { imagePrompt?: string; imageUrl?: string };
  stat3Image?: { imagePrompt?: string; imageUrl?: string };
  image1?: { imagePrompt?: string; imageUrl?: string };
  image2?: { imagePrompt?: string; imageUrl?: string };
  image3?: { imagePrompt?: string; imageUrl?: string };
  image4?: { imagePrompt?: string; imageUrl?: string };
  image5?: { imagePrompt?: string; imageUrl?: string };
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
  stat1Image,
  stat2Image,
  stat3Image,
  image1,
  image2,
  image3,
  image4,
  image5,
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
          {/* Grid Background with Images */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0 p-0">
            {[
              image1, image2, image3,
              image4, null, image5,
              stat1Image, null, stat2Image
            ].map((img, i) => {
              const isCenter = i === 4;
              const isBottomCenter = i === 7;
              return (
                <div 
                  key={i} 
                  className={`${isCenter ? "border-b-0": ""} ${isBottomCenter ? "border-t-0": ""} bg-gray-900 border border-white overflow-hidden relative`}
                >
                  {img?.imageUrl ? (
                    <Image
                      src={img.imageUrl}
                      alt={img.imagePrompt || ""}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Central Content - Stats Overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center mt-32">
            {/* Title Number Elements */}
            <div className="flex flex-col items-center space-y-6 mb-8">
              {[
                { title: stat1Title, value: stat1Value },
                { title: stat2Title, value: stat2Value },
                { title: stat3Title, value: stat3Value },
              ].map((stat, num) => (
                <div key={num} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mb-2">
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                  </div>
                  <p className="text-white text-sm font-extralight">{stat.title}</p>
                  <p className="text-white text-sm">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
