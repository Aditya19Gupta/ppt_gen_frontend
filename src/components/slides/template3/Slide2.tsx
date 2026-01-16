import { Separator } from "@/components/ui/separator";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Slide2Props {
  headerText?: string;
  col1Title?: string;
  col1Desc?: string;
  col2Title?: string;
  col2Desc?: string;
  col3Title?: string;
  col3Desc?: string;
  col4Title?: string;
  col4Desc?: string;
}

export default function Slide2({
  headerText,
  col1Title,
  col1Desc,
  col2Title,
  col2Desc,
  col3Title,
  col3Desc,
  col4Title,
  col4Desc,
}: Slide2Props) {
  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden px-16 py-20">

      {/* Background Image */}
      <Image
        src="https://img.freepik.com/free-psd/typography-photo-effect_23-2151562818.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Slide Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/70"></div>

      {/* Content Layer */}
      <div className="relative z-10">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <GraduationCap className="w-10 h-10 mx-auto mb-4 text-white" />
          <p className="text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
            {headerText}
          </p>
          <Separator className="max-w-10 h-1 border border-white mt-4" />
        </div>

        {/* Four Columns */}
        <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: col1Title, desc: col1Desc },
            { title: col2Title, desc: col2Desc },
            { title: col3Title, desc: col3Desc },
            { title: col4Title, desc: col4Desc },
          ].map((column, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-white text-sm font-bold text-[#113029]"></span>
              </div>
              <h3 className="text-2xl font-semibold text-white">
                {column.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {column.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
