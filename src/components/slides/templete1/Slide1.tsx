import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import { getFontSize, getColor } from "@/handlers/ppt";
import InlineEditableText from "@/components/ui/InlineEditableText";

interface Slide1Props {
  title: string | { text: string; fontSize?: number; color?: string };
  subtitle?: string | { text: string; fontSize?: number; color?: string };
  imageLink?: string;
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide1({
  title,
  subtitle,
  imageLink,
  onTextUpdate,
  onContentChange,
}: Slide1Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Colored squares in top-left */}
      <div className="absolute top-16 left-12 flex gap-2">
        <div className="w-24 h-24 bg-purple-600"></div>
        <div className="w-24 h-24 bg-lime-400"></div>
        <div className="w-24 h-24 bg-blue-900"></div>
      </div>

      {/* Ring graphic in top-right */}
      <div className="absolute top-0 right-0">
        <Image
          src="/assets/slide1_ring.png"
          alt="Ring decoration"
          className="w-[400px] h-[400px]"
          width={1000}
          height={1000}
        />
      </div>
      <div className="absolute top-3/4 -mt-8 left-12 transform -translate-y-1/2">
        <InlineEditableText
          textContent={
            typeof title === "string"
              ? { text: title }
              : title || { text: "Title" }
          }
          onTextUpdate={(updatedContent) =>
            onTextUpdate?.("title", updatedContent)
          }
          elementType="title"
          slideIndex={0}
          onContentChange={onContentChange || (() => {})}
        >
          <h1
            className={`py-0 font-bold ${getFontSize(
              typeof title === "string" ? { text: title } : title || {},
              "text-9xl"
            )} ${getColor(
              typeof title === "string" ? { text: title } : title || {},
              "text-blue-950"
            )}`}
          >
            {typeof title === "string" ? title : title?.text || "Title"}
          </h1>
        </InlineEditableText>
        {subtitle && (
          <InlineEditableText
            textContent={
              typeof subtitle === "string"
                ? { text: subtitle }
                : subtitle || { text: "Subtitle" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("subtitle", updatedContent)
            }
            elementType="subtitle"
            slideIndex={0}
            onContentChange={onContentChange || (() => {})}
          >
            <h2
              className={`font-semibold ${getFontSize(
                typeof subtitle === "string"
                  ? { text: subtitle }
                  : subtitle || {},
                "text-6xl"
              )} ${getColor(
                typeof subtitle === "string"
                  ? { text: subtitle }
                  : subtitle || {},
                "text-gray-600"
              )} mt-4`}
            >
              {typeof subtitle === "string"
                ? subtitle
                : subtitle?.text || "Subtitle"}
            </h2>
          </InlineEditableText>
        )}
      </div>
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
        <span className="text-gray-600 font-medium">00</span>
      </div>
    </div>
  );
}
