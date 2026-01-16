import { GraduationCap } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Slide6Props {
  companyName?: string;
  tagline?: string;
  col1Title?: string;
  col1Desc?: string;
  col2Title?: string;
  col2Desc?: string;
  col3Title?: string;
  col3Desc?: string;
  col4Title?: string;
  col4Desc?: string;
  image1?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
  image2?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
  image3?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
  image4?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
}

export default function Slide6({
  companyName,
  tagline,
  col1Title,
  col1Desc,
  col2Title,
  col2Desc,
  col3Title,
  col3Desc,
  col4Title,
  col4Desc,
  image1,
  image2,
  image3,
  image4,
}: Slide6Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16 py-28">
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col gap-2 text-center items-center">
          <Image
            src={image1?.imageUrl || ""}
            alt={image1?.imagePrompt || ""}
            width={200}
            height={200}
            className="w-full h-56"
          />
          <GraduationCap className="w-12 h-12 bg-gray-200 p-2 rounded-full -mt-7" />
          <h3 className="text-2xl font-semibold text-gray-900">{col1Title}</h3>
          <p className="text-gray-600">{col1Desc}</p>
        </div>
        <div className="flex flex-col gap-2 text-center items-center">
          <Image
            src={image2?.imageUrl || ""}
            alt={image2?.imagePrompt || ""}
            width={200}
            height={200}
            className="w-full h-56"
          />
          <GraduationCap className="w-12 h-12 bg-gray-200 p-2 rounded-full -mt-7" />
          <h3 className="text-2xl font-semibold text-gray-900">{col2Title}</h3>
          <p className="text-gray-600">{col2Desc}</p>
        </div>
        <div className="flex flex-col gap-2 text-center items-center">
          <Image
            src={image3?.imageUrl || ""}
            alt={image3?.imagePrompt || ""}
            width={200}
            height={200}
            className="w-full h-56"
          />
          <GraduationCap className="w-12 h-12 bg-gray-200 p-2 rounded-full -mt-7" />
          <h3 className="text-2xl font-semibold text-gray-900">{col2Title}</h3>
          <p className="text-gray-600">{col2Desc}</p>
        </div>
        <div className="flex flex-col gap-2 text-center items-center">
          <Image
            src={image4?.imageUrl || ""}
            alt={image4?.imagePrompt || ""}
            width={200}
            height={200}
            className="w-full h-56"
          />
          <GraduationCap className="w-12 h-12 bg-gray-200 p-2 rounded-full -mt-7" />
          <h3 className="text-2xl font-semibold text-gray-900">{col4Title}</h3>
          <p className="text-gray-600">{col4Desc}</p>
        </div>
      </div>
    </div>
  );
}
