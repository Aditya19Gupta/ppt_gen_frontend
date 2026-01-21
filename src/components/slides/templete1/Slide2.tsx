import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide2Props {
  title: string | { text: string; fontSize?: number; color?: string };
  desc: string | { text: string; fontSize?: number; color?: string };
  imageLink: string;
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide2({
  title,
  desc,
  imageLink,
  onTextUpdate,
  onContentChange,
}: Slide2Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Main content - left side with title and description */}
      <div className="absolute top-24 left-12 right-1/2 mr-4 pr-4">
        <div className="mb-6">
          <InlineEditableText
            textContent={
              typeof title === "string"
                ? { text: title }
                : title || { text: "Title" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("title", updatedContent)
            }
            elementType="subtitle"
            slideIndex={1}
            onContentChange={onContentChange || (() => {})}
          >
            <h1
              className={`text-2xl font-extrabold block ${getFontSize(
                typeof title === "string" ? { text: title } : title || { text: "" },
                "text-2xl"
              )} ${getColor(
                typeof title === "string" ? { text: title } : title || { text: "" },
                "text-blue-950"
              )}`}
            >
              {typeof title === "string" ? title : title?.text || "Title"}
            </h1>
          </InlineEditableText>
        </div>
        <div>
          <InlineEditableText
            textContent={
              typeof desc === "string"
                ? { text: desc }
                : desc || { text: "Description" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("desc", updatedContent)
            }
            elementType="body"
            slideIndex={1}
            onContentChange={onContentChange || (() => {})}
          >
            <p
              className={`text-lg leading-relaxed block ${getFontSize(
                typeof desc === "string" ? { text: desc } : desc || { text: "" },
                "text-lg"
              )} ${getColor(
                typeof desc === "string" ? { text: desc } : desc || { text: "" },
                "text-gray-700"
              )}`}
            >
              {typeof desc === "string" ? desc : desc?.text || ""}
            </p>
          </InlineEditableText>
        </div>
      </div>

      {/* Right side - image */}
      <div className="absolute top-16 right-12 left-1/2">
        <div className="w-full h-[65vh] bg-blue-900 flex items-center justify-center rounded-lg overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={500}
              height={400}
            />
          ) : (
            <span className="text-white text-xl font-medium">image here</span>
          )}
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
        <span className="text-gray-600 font-medium">01</span>
      </div>
    </div>
  );
}
