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
  item4Title?: string;
  item4Desc?: string;
  item1Image?: { imagePrompt?: string; imageUrl?: string };
  item2Image?: { imagePrompt?: string; imageUrl?: string };
  item3Image?: { imagePrompt?: string; imageUrl?: string };
  item4Image?: { imagePrompt?: string; imageUrl?: string };
  leftImage?: { imagePrompt?: string; imageUrl?: string };
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
  item4Title,
  item4Desc,
  item1Image,
  item2Image,
  item3Image,
  item4Image,
  leftImage,
}: Slide9Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-2 h-[85vh]">
        <div className="h-full bg-gray-900 overflow-hidden">
          {leftImage?.imageUrl ? (
            <Image
              src={leftImage.imageUrl}
              alt={leftImage.imagePrompt || ""}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="py-20 px-10 h-full w-full">
          <h1 className="text-3xl font-bold text-[#2D3139]">{title}</h1>
          <p className="text-lg font-extralight text-[#2D3139] mt-10">
            {subtitle}
          </p>
          <Separator className="max-w-10 h-1 border border-[#2D3139] mt-4" />
          <div className="mt-16 grid-cols-2 grid gap-4">
            {[
              { title: item1Title, desc: item1Desc, image: item1Image, dark: false },
              { title: item2Title, desc: item2Desc, image: item2Image, dark: true },
              { title: item3Title, desc: item3Desc, image: item3Image, dark: false },
              { title: item4Title, desc: item4Desc, image: item4Image, dark: false },
            ].map((item, index) => (
              <div key={index} className={`flex flex-col items-start p-4 ${item.dark ? 'bg-[#2D3139] rounded-md' : ''}`}>
                {item.image?.imageUrl ? (
                  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${item.dark ? 'border-white' : 'border-[#2D3139]'} mb-2`}>
                    <Image
                      src={item.image.imageUrl}
                      alt={item.image.imagePrompt || ""}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-8 h-8 rounded-full border ${item.dark ? 'border-white' : 'border-[#2D3139]'} flex items-center justify-center mb-2`}>
                    <div className={`w-4 h-4 rounded-full ${item.dark ? 'bg-white' : 'bg-[#2D3139]'}`}></div>
                  </div>
                )}
                <h3 className={`text-sm font-bold ${item.dark ? 'text-white' : 'text-[#2D3139]'}`}>{item.title}</h3>
                <p className={`text-sm font-extralight ${item.dark ? 'text-white' : 'text-[#2D3139]'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
