import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide4Props {
  title?: string;
  subtitle?: string;
  col1Title?: string;
  col1Desc?: string;
  col2Title?: string;
  col2Desc?: string;
  col3Title?: string;
  col3Desc?: string;
  col4Title?: string;
  col4Desc?: string;
}

export default function Slide4({
  title,
  subtitle,
  col1Title,
  col1Desc,
  col2Title,
  col2Desc,
  col3Title,
  col3Desc,
  col4Title,
  col4Desc,
}: Slide4Props) {
   return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16 py-20">
      {/* Header Text */}
      <div className="flex flex-col items-start mb-20">
        <h1 className="text-4xl font-extrabold text-[#545A61] leading-relaxed max-w-4xl mb-5">
          {title}
        </h1>
        <p className="text-sm text-[#545A61] font-light mb-3">{subtitle}</p>
        <Separator className="max-w-10 h-1 border border-[#545A61] text-center"/>

      </div>

      {/* Four Columns */}
      <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          { title: col1Title, desc: col1Desc },
          { title: col2Title, desc: col2Desc },
          { title: col3Title, desc: col3Desc },
          { title: col4Title, desc: col4Desc },
        ].map((column, index) => (
          <div key={index} className="flex flex-col items-center gap-4 text-center">
            <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full border-2 border-[#545A61] flex items-center justify-center">
              <span className="text-center w-6 h-6 rounded-full text-sm font-bold bg-[#545A61] text-[#545A61]"></span>
            </div>
            <h3 className="text-2xl font-semibold text-[#545A61]">
              {column.title}
            </h3>
            <p className="text-gray-600 leading-relaxed font-light">{column.desc}</p>
          </div>
        ))}
      </div>
    </div>
   )
}
