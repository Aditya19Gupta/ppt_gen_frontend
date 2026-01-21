import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide5Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  sampleText?: string | { text: string; fontSize?: number; color?: string };
  description?: string | { text: string; fontSize?: number; color?: string };
  imageLink?: string;
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide5({
  title = "Slide Title",
  sampleText = "This is a sample text to tell story for audience is written here",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  imageLink,
  onTextUpdate,
  onContentChange,
}: Slide5Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      {/* BrainStrata Logo - Top Right */}
      <div className="absolute top-4 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto invert"
          width={160}
          height={32}
        />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col gap-0">
        <div className="bg-[#113029] w-full h-[40vh] p-0 overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <p className="text-white text-sm font-light">Image Here</p>
          )}
        </div>
        <div className="grid grid-cols-5 pt-10 px-16">
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
            slideIndex={4}
            onContentChange={onContentChange || (() => {})}
          >
            <h1 className={`font-extrabold mb-6 col-span-3 ${getFontSize(
              typeof title === "string" ? { text: title } : title || {},
              "text-7xl"
            )} ${getColor(
              typeof title === "string" ? { text: title } : title || {},
              "text-gray-900"
            )}`}>
              {typeof title === "string" ? title : title?.text || "Slide Title"}
            </h1>
          </InlineEditableText>
          <div className="flex flex-col col-span-2">
            <InlineEditableText
              textContent={
                typeof sampleText === "string"
                  ? { text: sampleText }
                  : sampleText || { text: "" }
              }
              onTextUpdate={(updatedContent) =>
                onTextUpdate?.("sampleText", updatedContent)
              }
              elementType="body"
              slideIndex={4}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`mb-6 font-light ${getFontSize(
                typeof sampleText === "string" ? { text: sampleText } : sampleText || {},
                "text-2xl"
              )} ${getColor(
                typeof sampleText === "string" ? { text: sampleText } : sampleText || {},
                "text-gray-900"
              )}`}>
                {typeof sampleText === "string"
                  ? sampleText
                  : sampleText?.text || ""}
              </h3>
            </InlineEditableText>
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
              slideIndex={4}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`leading-relaxed ${getFontSize(
                typeof description === "string" ? { text: description } : description || {},
                "text-sm"
              )} ${getColor(
                typeof description === "string" ? { text: description } : description || {},
                "text-gray-600"
              )}`}>
                {typeof description === "string"
                  ? description
                  : description?.text || ""}
              </p>
            </InlineEditableText>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
