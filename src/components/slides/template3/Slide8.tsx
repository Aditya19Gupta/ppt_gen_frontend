import Image from "next/image";
import React from "react";

interface Slide8Props {
  box1Title?: string;
  box1Desc?: string;
  box2Title?: string;
  box2Desc?: string;
  image1?: { imagePrompt?: string; imageUrl?: string };
  image2?: { imagePrompt?: string; imageUrl?: string };
  image3?: { imagePrompt?: string; imageUrl?: string };
  image4?: { imagePrompt?: string; imageUrl?: string };
  image5?: { imagePrompt?: string; imageUrl?: string };
  box1Image?: { imagePrompt?: string; imageUrl?: string };
  box2Image?: { imagePrompt?: string; imageUrl?: string };
}

export default function Slide8({
  box1Title,
  box1Desc,
  box2Title,
  box2Desc,
  image1,
  image2,
  image3,
  image4,
  image5,
  box1Image,
  box2Image,
}: Slide8Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16 py-20">
      <div className="grid grid-cols-4 h-[63vh] grid-rows-2 gap-0">
        {/* Row 1 */}
        {/* Top-left: image2 */}
        {image2?.imageUrl ? (
          <div className="col-span-1 bg-black border border-white overflow-hidden">
            <Image
              src={image2.imageUrl}
              alt={image2.imagePrompt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="col-span-1 bg-black border border-white"></div>
        )}
        
        {/* Top-middle: image3 */}
        {image3?.imageUrl ? (
          <div className="col-span-1 bg-black border border-white overflow-hidden">
            <Image
              src={image3.imageUrl}
              alt={image3.imagePrompt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="col-span-1 bg-black border border-white"></div>
        )}
        
        {/* Top-right: image4 */}
        {image4?.imageUrl ? (
          <div className="col-span-1 bg-black border border-white overflow-hidden">
            <Image
              src={image4.imageUrl}
              alt={image4.imagePrompt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="col-span-1 bg-black border border-white"></div>
        )}
        
        {/* Top-rightmost: image5 */}
        {image5?.imageUrl ? (
          <div className="col-span-1 bg-black border border-white overflow-hidden">
            <Image
              src={image5.imageUrl}
              alt={image5.imagePrompt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="col-span-1 bg-black border border-white"></div>
        )}
        
        {/* Row 2 */}
        {/* Bottom-left: Box 1 with text (first position) */}
        <div className="col-span-1 p-4 text-center bg-black border border-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <p className="text-white text-sm font-extralight">{box1Title}</p>
            <p className="text-white text-sm">{box1Desc}</p>
          </div>
        </div>
        
        {/* Bottom-second: image1 (second position) */}
        {image1?.imageUrl ? (
          <div className="col-span-1 bg-black border border-white overflow-hidden">
            <Image
              src={image1.imageUrl}
              alt={image1.imagePrompt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="col-span-1 bg-black border border-white"></div>
        )}
        
        {/* Bottom-third: Box 2 with text */}
        <div className="col-span-1 bg-black border p-4 text-center border-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <p className="text-white text-sm font-extralight">{box2Title}</p>
            <p className="text-white text-sm">{box2Desc}</p>
          </div>
        </div>
        
        {/* Bottom-right: Use box2Image if available */}
        {box2Image?.imageUrl ? (
          <div className="col-span-1 bg-black border border-white overflow-hidden">
            <Image
              src={box2Image.imageUrl}
              alt={box2Image.imagePrompt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : box1Image?.imageUrl ? (
          <div className="col-span-1 bg-black border border-white overflow-hidden">
            <Image
              src={box1Image.imageUrl}
              alt={box1Image.imagePrompt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="col-span-1 bg-black border border-white"></div>
        )}
      </div>
    </div>
  );
}
