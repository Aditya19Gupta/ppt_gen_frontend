import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface BulletPoint {
  text: string;
}

interface Slide5Props {
  title: string;
  intro: string;
  bullets: string[];
}

export default function Slide5({ title, intro, bullets }: Slide5Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Title at top */}
      <div className="text-left px-14 pt-16">
        <h1 className="text-8xl font-bold text-blue-950 mb-8">{title}</h1>
      </div>

      {/* Introduction paragraph */}
      <div className="px-16 mb-12">
        <p className="text-gray-700 leading-relaxed text-start text-lg">
          {intro}
        </p>
      </div>

      {/* Three colored circles with content */}
      <div className="flex justify-between items-center gap-12 px-20 mb-12">
        <div className="flex flex-col">
          {bullets.map((bullet, index) => (
            <div key={index}>
              <li className="text-gray-700 leading-relaxed text-start text-lg">{bullet}</li>
            </div>
          ))}
        </div>
        {/* Blue circle */}
        <div className="w-40 h-40 bg-blue-900 rounded-full flex items-center justify-center text-white">
          <span className="text-sm font-medium">Image</span>
        </div>

        {/* Lime green circle */}
        <div className="w-40 h-40 bg-lime-400 rounded-full flex items-center justify-center text-white">
          <span className="text-sm font-medium">numbers</span>
        </div>

        {/* Dark blue circle */}
        <div className="w-40 h-40 bg-blue-950 rounded-full flex items-center justify-center text-white">
          <span className="text-sm font-medium">text</span>
        </div>
      </div>

      {/* Blue line at bottom */}
      <Separator className="absolute bottom-14 left-0 right-0 h-2 border-2 border-blue-950 bg-blue-950" />

      {/* Logo and page number at bottom */}
      <div className="absolute bottom-4 left-12 right-8 flex items-center justify-between">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-40"
          width={1000}
          height={24}
        />
        <span className="text-gray-600 font-medium">04</span>
      </div>
    </div>
  );
}

// Example usage:
<Slide5
  title="Example Title"
  intro="Example intro"
  bullets={[
    { text: "Advanced analytics and real-time reporting." },
    { text: "Seamless integration with existing workflows." },
    { text: "Enterprise-grade security and compliance." },
  ]}
/>;
