import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide3Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  description?: string | { text: string; fontSize?: number; color?: string };
  items?: string[];
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide3({
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad",
  items = [
    "Ut enim ad minima",
    "Ut enim ad minima",
    "Ut enim ad minima",
    "Ut enim ad minima",
  ],
  onTextUpdate,
  onContentChange,
}: Slide3Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100 overflow-hidden">
      {/* BrainStrata Logo - Top Right */}
      <div className="absolute top-8 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto"
          width={160}
          height={32}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative h-full px-16 py-16">
        {/* Title */}
        <InlineEditableText
          textContent={
            typeof title === "string"
              ? { text: title }
              : title || { text: "Slide Title" }
          }
          onTextUpdate={(updatedContent) =>
            onTextUpdate?.("title", updatedContent)
          }
          elementType="title"
          slideIndex={2}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`font-bold mb-6 ${getFontSize(
            typeof title === "string" ? { text: title } : title || {},
            "text-6xl"
          )} ${getColor(
            typeof title === "string" ? { text: title } : title || {},
            "text-gray-900"
          )}`}>
            {typeof title === "string" ? title : title?.text || "Slide Title"}
          </h1>
        </InlineEditableText>

        {/* Description */}
        <InlineEditableText
          textContent={
            typeof description === "string"
              ? { text: description }
              : description || { text: "" }
          }
          onTextUpdate={(updatedContent) =>
            onTextUpdate?.("description", updatedContent)
          }
          elementType="body"
          slideIndex={2}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`mb-12 max-w-3xl leading-relaxed ${getFontSize(
            typeof description === "string" ? { text: description } : description || {},
            "text-base"
          )} ${getColor(
            typeof description === "string" ? { text: description } : description || {},
            "text-gray-600"
          )}`}>
            {typeof description === "string"
              ? description
              : description?.text || ""}
          </p>
        </InlineEditableText>

        {/* Numbered List */}
        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6 flex-col w-fit mr-10"
            >
              <div className="flex flex-row items-center gap-5">
                <span className="text-5xl font-bold text-gray-400 leading-none tracking-wide">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <InlineEditableText
                  textContent={{ text: item }}
                  onTextUpdate={(updatedContent) =>
                    onTextUpdate?.(`item${index}`, updatedContent)
                  }
                  elementType="bullet"
                  slideIndex={2}
                  onContentChange={onContentChange || (() => {})}
                >
                  <p className={`font-light pt-2 tracking-wide ${getFontSize(
                    { text: item },
                    "text-2xl"
                  )} ${getColor(
                    { text: item },
                    "text-gray-700"
                  )}`}>
                    {item}
                  </p>
                </InlineEditableText>
              </div>
              <Separator className="h-1 border border-gray-400 bg-gray-400 -mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
