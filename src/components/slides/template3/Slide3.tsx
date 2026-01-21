import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide3Props {
  leftHeader?: string | { text: string; fontSize?: number; color?: string };
  leftBody?: string | { text: string; fontSize?: number; color?: string };
  title?: string | { text: string; fontSize?: number; color?: string };
  image?: {
    imagePrompt?: string;
    imageUrl?: string;
  };
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide3({
  leftHeader,
  leftBody,
  title,
  image,
  onTextUpdate,
  onContentChange,
}: Slide3Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
      <div className="grid grid-cols-5 gap-5 h-[85vh]">
        <div className="col-span-2 h-full pl-16 pt-16">
          {/* Header Text */}
          <InlineEditableText
            textContent={
              typeof leftHeader === "string"
                ? { text: leftHeader }
                : leftHeader || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("leftHeader", updatedContent)
            }
            elementType="body"
            slideIndex={2}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`font-light max-w-4xl mx-auto ${getFontSize(
              typeof leftHeader === "string" ? { text: leftHeader } : leftHeader || { text: "" },
              "text-xl"
            )} ${getColor(
              typeof leftHeader === "string" ? { text: leftHeader } : leftHeader || { text: "" },
              "text-gray-600"
            )}`}>
              {typeof leftHeader === "string"
                ? leftHeader
                : leftHeader?.text || ""}
            </p>
          </InlineEditableText>
          <Separator className="max-w-10 h-1 border border-black text-center mb-12" />

          {/* Body Text */}
          <InlineEditableText
            textContent={
              typeof leftBody === "string"
                ? { text: leftBody }
                : leftBody || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("leftBody", updatedContent)
            }
            elementType="body"
            slideIndex={2}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`font-light mb-16 max-w-4xl mx-auto leading-relaxed ${getFontSize(
              typeof leftBody === "string" ? { text: leftBody } : leftBody || { text: "" },
              "text-sm"
            )} ${getColor(
              typeof leftBody === "string" ? { text: leftBody } : leftBody || { text: "" },
              "text-gray-700"
            )}`}>
              {typeof leftBody === "string"
                ? leftBody
                : leftBody?.text || ""}
            </p>
          </InlineEditableText>
          <InlineEditableText
            textContent={
              typeof title === "string"
                ? { text: title }
                : title || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("title", updatedContent)
            }
            elementType="subtitle"
            slideIndex={2}
            onContentChange={onContentChange || (() => {})}
          >
            <h1 className={`font-bold leading-tight mb-8 ${getFontSize(
              typeof title === "string" ? { text: title } : title || { text: "" },
              "text-6xl"
            )} ${getColor(
              typeof title === "string" ? { text: title } : title || { text: "" },
              "text-[#545A61]"
            )}`}>
              {typeof title === "string" ? title : title?.text || ""}
            </h1>
          </InlineEditableText>
        </div>
        <div className="col-span-3 h-full">
          {/* Image */}
          {image?.imageUrl ? (
            <div className="w-full max-w-4xl mx-auto h-full overflow-hidden mb-16">
              <Image
                src={image.imageUrl}
                alt={image.imagePrompt || "Slide image"}
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-16">
              <p className="text-gray-500 text-lg">Image Placeholder</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
