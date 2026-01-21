import Image from "next/image";
import React from "react";

interface Slide10Props {
  thankYou?: string;
  rightImage?: { imagePrompt?: string; imageUrl?: string };
}

export default function Slide10({
  thankYou = "Thank You!",
  rightImage,
}: Slide10Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-2 h-[85vh]">
        <div className="flex justify-start items-center h-full z-5 px-16">
          <h1 className="text-7xl font-extrabold text-[#2D3139]">{thankYou}</h1>
        </div>
        <div className="bg-gray-200 h-full overflow-hidden">
          {rightImage?.imageUrl ? (
            <Image
              src={rightImage.imageUrl}
              alt={rightImage.imagePrompt || ""}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </div>
      <div className="absolute z-10 bg-[#2D3139] h-2/3 w-3/5 bottom-28 right-0"></div>
    </div>
  );
}
