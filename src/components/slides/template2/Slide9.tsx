import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface Slide9Props {
  title?: string;
  description?: string;
  items?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function Slide9({
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  items = [
    {
      icon: "📊",
      title: "Title 1",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
    {
      icon: "📈",
      title: "Title 2",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
    {
      icon: "💡",
      title: "Title 3",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
    {
      icon: "🎯",
      title: "Title 4",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
  ],
}: Slide9Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      {/* BrainStrata Logo - Top Right */}
      <div className="absolute top-4 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto"
          width={160}
          height={32}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative h-full px-16 pt-16 grid grid-cols-2">
        {/* Title */}
        <h1 className="text-7xl font-extrabold text-gray-900 mb-6">{title}</h1>

        <div className="flex flex-row h-full gap-4 items-center">
          <Separator
            orientation="vertical"
            className="h-24 w-2 border-2 border-gray-300"
          />
          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed ">
            {description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 px-16">
        {/* Icon Items Grid */}
        <div className="grid grid-cols-4 gap-8 mt-16">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-100 pt-16 p-3 rounded-md"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-200 rounded-sm flex items-center justify-center mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
