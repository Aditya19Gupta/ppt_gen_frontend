import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide4Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  subtitle?: string | { text: string; fontSize?: number; color?: string };
  col1Title?: string | { text: string; fontSize?: number; color?: string };
  col1Desc?: string | { text: string; fontSize?: number; color?: string };
  col2Title?: string | { text: string; fontSize?: number; color?: string };
  col2Desc?: string | { text: string; fontSize?: number; color?: string };
  col3Title?: string | { text: string; fontSize?: number; color?: string };
  col3Desc?: string | { text: string; fontSize?: number; color?: string };
  col4Title?: string | { text: string; fontSize?: number; color?: string };
  col4Desc?: string | { text: string; fontSize?: number; color?: string };
  col1Image?: { imagePrompt?: string; imageUrl?: string };
  col2Image?: { imagePrompt?: string; imageUrl?: string };
  col3Image?: { imagePrompt?: string; imageUrl?: string };
  col4Image?: { imagePrompt?: string; imageUrl?: string };
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
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
  col1Image,
  col2Image,
  col3Image,
  col4Image,
  onTextUpdate,
  onContentChange,
}: Slide4Props) {
   return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16 py-20">
      {/* Header Text */}
      <div className="flex flex-col items-start mb-20">
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
          slideIndex={3}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`font-extrabold leading-relaxed max-w-4xl mb-5 ${getFontSize(
            typeof title === "string" ? { text: title } : title || { text: "" },
            "text-4xl"
          )} ${getColor(
            typeof title === "string" ? { text: title } : title || { text: "" },
            "text-[#545A61]"
          )}`}>
            {typeof title === "string" ? title : title?.text || ""}
          </h1>
        </InlineEditableText>
        <InlineEditableText
          textContent={
            typeof subtitle === "string"
              ? { text: subtitle }
              : subtitle || { text: "" }
          }
          onTextUpdate={(updatedContent) =>
            onTextUpdate?.("subtitle", updatedContent)
          }
          elementType="body"
          slideIndex={3}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`font-light mb-3 ${getFontSize(
            typeof subtitle === "string" ? { text: subtitle } : subtitle || { text: "" },
            "text-sm"
          )} ${getColor(
            typeof subtitle === "string" ? { text: subtitle } : subtitle || { text: "" },
            "text-[#545A61]"
          )}`}>
            {typeof subtitle === "string" ? subtitle : subtitle?.text || ""}
          </p>
        </InlineEditableText>
        <Separator className="max-w-10 h-1 border border-[#545A61] text-center"/>

      </div>

      {/* Four Columns */}
      <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          { title: col1Title, desc: col1Desc, key: "col1", image: col1Image },
          { title: col2Title, desc: col2Desc, key: "col2", image: col2Image },
          { title: col3Title, desc: col3Desc, key: "col3", image: col3Image },
          { title: col4Title, desc: col4Desc, key: "col4", image: col4Image },
        ].map((column, index) => (
          <div key={index} className="flex flex-col items-center gap-4 text-center">
           
              <div className="shrink-0 mt-1 w-12 h-12 rounded-full border-2 border-[#545A61] flex items-center justify-center">
                <span className="text-center w-6 h-6 rounded-full text-sm font-bold bg-[#545A61] text-[#545A61]"></span>
              </div>
            <InlineEditableText
              textContent={
                typeof column.title === "string"
                  ? { text: column.title }
                  : column.title || { text: "" }
              }
              onTextUpdate={(updatedContent) =>
                onTextUpdate?.(`${column.key}Title`, updatedContent)
              }
              elementType="body"
              slideIndex={3}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`font-semibold ${getFontSize(
                typeof column.title === "string" ? { text: column.title } : column.title || { text: "" },
                "text-2xl"
              )} ${getColor(
                typeof column.title === "string" ? { text: column.title } : column.title || { text: "" },
                "text-[#545A61]"
              )}`}>
                {typeof column.title === "string"
                  ? column.title
                  : column.title?.text || ""}
              </h3>
            </InlineEditableText>
            <InlineEditableText
              textContent={
                typeof column.desc === "string"
                  ? { text: column.desc }
                  : column.desc || { text: "" }
              }
              onTextUpdate={(updatedContent) =>
                onTextUpdate?.(`${column.key}Desc`, updatedContent)
              }
              elementType="body"
              slideIndex={3}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`leading-relaxed font-light ${getFontSize(
                typeof column.desc === "string" ? { text: column.desc } : column.desc || { text: "" },
                "text-base"
              )} ${getColor(
                typeof column.desc === "string" ? { text: column.desc } : column.desc || { text: "" },
                "text-gray-600"
              )}`}>
                {typeof column.desc === "string"
                  ? column.desc
                  : column.desc?.text || ""}
              </p>
            </InlineEditableText>
          </div>
        ))}
      </div>
    </div>
   )
}
