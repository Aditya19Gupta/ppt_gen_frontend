import { Separator } from "@/components/ui/separator";
import { GraduationCap } from "lucide-react";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide2Props {
  headerText?: string | { text: string; fontSize?: number; color?: string };
  col1Title?: string | { text: string; fontSize?: number; color?: string };
  col1Desc?: string | { text: string; fontSize?: number; color?: string };
  col2Title?: string | { text: string; fontSize?: number; color?: string };
  col2Desc?: string | { text: string; fontSize?: number; color?: string };
  col3Title?: string | { text: string; fontSize?: number; color?: string };
  col3Desc?: string | { text: string; fontSize?: number; color?: string };
  col4Title?: string | { text: string; fontSize?: number; color?: string };
  col4Desc?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
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
  onTextUpdate,
  onContentChange,
}: Slide2Props) {
  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden px-16 py-20">

      {/* Background Image */}
    

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/70"></div>

      {/* Content Layer */}
      <div className="relative z-10">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <GraduationCap className="w-10 h-10 mx-auto mb-4 text-white" />
          <InlineEditableText
            textContent={
              typeof headerText === "string"
                ? { text: headerText }
                : headerText || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("headerText", updatedContent)
            }
            elementType="body"
            slideIndex={1}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`leading-relaxed max-w-4xl mx-auto ${getFontSize(
              typeof headerText === "string" ? { text: headerText } : headerText || { text: "" },
              "text-xl"
            )} ${getColor(
              typeof headerText === "string" ? { text: headerText } : headerText || { text: "" },
              "text-gray-200"
            )}`}>
              {typeof headerText === "string"
                ? headerText
                : headerText?.text || ""}
            </p>
          </InlineEditableText>
          <Separator className="max-w-10 h-1 border border-white mt-4" />
        </div>

        {/* Four Columns */}
        <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: col1Title, desc: col1Desc, key: "col1" },
            { title: col2Title, desc: col2Desc, key: "col2" },
            { title: col3Title, desc: col3Desc, key: "col3" },
            { title: col4Title, desc: col4Desc, key: "col4" },
          ].map((column, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-white text-sm font-bold text-[#113029]"></span>
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
                slideIndex={1}
                onContentChange={onContentChange || (() => {})}
              >
                <h3 className={`font-semibold text-white ${getFontSize(
                  typeof column.title === "string" ? { text: column.title } : column.title || { text: "" },
                  "text-2xl"
                )} ${getColor(
                  typeof column.title === "string" ? { text: column.title } : column.title || { text: "" },
                  "text-white"
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
                slideIndex={1}
                onContentChange={onContentChange || (() => {})}
              >
                <p className={`leading-relaxed ${getFontSize(
                  typeof column.desc === "string" ? { text: column.desc } : column.desc || { text: "" },
                  "text-base"
                )} ${getColor(
                  typeof column.desc === "string" ? { text: column.desc } : column.desc || { text: "" },
                  "text-gray-300"
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
    </div>
  );
}
