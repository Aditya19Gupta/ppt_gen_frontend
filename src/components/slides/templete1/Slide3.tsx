import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface ColumnData {
  title: string | { text: string; fontSize?: number; color?: string };
  desc: string | { text: string; fontSize?: number; color?: string };
  imageLink: string;
}

interface Slide3Props {
  columns: ColumnData[];
  onTextUpdate?: (
    columnIndex: number,
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide3({
  columns,
  onTextUpdate,
  onContentChange,
}: Slide3Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Three columns layout */}
      <div className="flex h-full px-12 py-16 gap-8 pt-20">
        {columns.map((column, index) => (
          <div key={index} className="flex-1 flex flex-col text-center">
            {/* Image at top of each column */}
            <div
              className={`w-72 h-72 ${
                index === 0
                  ? "bg-sky-600"
                  : index === 1
                  ? "bg-lime-400"
                  : "bg-blue-950"
              } text-center flex items-center justify-center rounded-lg mb-6 overflow-hidden mx-auto`}
            >
              {column.imageLink ? (
                <Image
                  src={column.imageLink}
                  alt={`Column ${index + 1} content`}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                  onError={(e) => console.error(`Image failed to load:`, e)}
                  onLoad={() =>
                    console.log(`Image loaded successfully:`, column.imageLink)
                  }
                />
              ) : (
                <span className="text-white text-xl font-medium">
                  No image ({column.imageLink})
                </span>
              )}
            </div>

            {/* Title */}
            <InlineEditableText
              textContent={
                typeof column.title === "string"
                  ? { text: column.title }
                  : column.title || { text: "Untitled" }
              }
              onTextUpdate={(updatedContent) =>
                onTextUpdate?.(index, "title", updatedContent)
              }
              elementType="mini-title"
              slideIndex={2}
              onContentChange={onContentChange || (() => {})}
            >
              <h1
                className={`font-bold mb-4 mt-6 ${getFontSize(
                  typeof column.title === "string"
                    ? { text: column.title }
                    : column.title || { text: "" },
                  "text-4xl"
                )} ${getColor(
                  typeof column.title === "string"
                    ? { text: column.title }
                    : column.title || { text: "" },
                  "text-blue-950"
                )}`}
              >
                {typeof column.title === "string"
                  ? column.title
                  : column.title?.text || "Untitled"}
              </h1>
            </InlineEditableText>

            {/* Description */}
            <InlineEditableText
              textContent={
                typeof column.desc === "string"
                  ? { text: column.desc }
                  : column.desc || { text: "Description" }
              }
              onTextUpdate={(updatedContent) =>
                onTextUpdate?.(index, "desc", updatedContent)
              }
              elementType="body"
              slideIndex={2}
              onContentChange={onContentChange || (() => {})}
            >
              <p
                className={`leading-relaxed flex-1 ${getFontSize(
                  typeof column.desc === "string"
                    ? { text: column.desc }
                    : column.desc || { text: "" },
                  "text-base"
                )} ${getColor(
                  typeof column.desc === "string"
                    ? { text: column.desc }
                    : column.desc || { text: "" },
                  "text-gray-700"
                )}`}
              >
                {typeof column.desc === "string"
                  ? column.desc
                  : column.desc?.text || ""}
              </p>
            </InlineEditableText>
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
