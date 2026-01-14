import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface ColumnData {
  title: string;
  desc: string;
  imageLink: string;
}

interface Slide3Props {
  columns: ColumnData[];
}

export default function Slide3({ columns }: Slide3Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Three columns layout */}
      <div className="flex h-full px-12 py-16 gap-8 pt-20">
        {columns.map((column, index) => (
          <div key={index} className="flex-1 flex flex-col text-center">
            {/* Image at top of each column */}
            <div className={`w-52 h-52 ${index === 0 ? 'bg-sky-600' : index === 1 ? 'bg-lime-400' : 'bg-blue-950'} text-center flex items-center justify-center rounded-lg mb-6 overflow-hidden mx-auto`}>
              {column.imageLink ? (
                <Image
                  src={column.imageLink}
                  alt={`Column ${index + 1} content`}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              ) : (
                <span className="text-white text-xl font-medium">image here</span>
              )}
            </div>
            
            {/* Title */}
            <h3 className="text-4xl font-semibold text-blue-900 mb-4 mt-6">
              {column.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-700 leading-relaxed flex-1">
              {column.desc}
            </p>
          </div>
        ))}
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
        <span className="text-gray-600 font-medium">02</span>
      </div>
    </div>
  );
}
