import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface BulletPoint {
  text: string;
}

interface Slide5Props {
  title: string | { text: string; fontSize?: string; color?: string };
  intro: string | { text: string; fontSize?: string; color?: string };
  bullets: string[];
  imageLink1?: string;
  imageLink2?: string;
  imageLink3?: string;
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: string; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide5({ title, intro, bullets, imageLink1, imageLink2, imageLink3, onTextUpdate, onContentChange }: Slide5Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Title at top */}
      <div className="text-left px-14 pt-16">
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
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`text-7xl font-bold mb-8 ${getFontSize(
            typeof title === "string" ? { text: title } : title || {},
            "text-7xl"
          )} ${getColor(
            typeof title === "string" ? { text: title } : title || {},
            "text-blue-950"
          )}`}>
            {typeof title === 'string' ? title : title?.text || 'Title'}
          </h1>
        </InlineEditableText>
      </div>

      {/* Introduction paragraph */}
      <div className="px-16 mb-12">
        <InlineEditableText
          textContent={
            typeof intro === "string"
              ? { text: intro }
              : intro || { text: "" }
          }
          onTextUpdate={(updatedContent) =>
            onTextUpdate?.("intro", updatedContent)
          }
          elementType="intro"
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`leading-relaxed text-start ${getFontSize(
            typeof intro === "string" ? { text: intro } : intro || {},
            "text-lg"
          )} ${getColor(
            typeof intro === "string" ? { text: intro } : intro || {},
            "text-gray-700"
          )}`}>
            {typeof intro === 'string' ? intro : intro?.text || ''}
          </p>
        </InlineEditableText>
      </div>

      {/* Three colored circles with content */}
      <div className="flex justify-between items-center gap-12 px-14 mb-12">
        <div className="flex flex-col">
          {bullets.map((bullet, index) => (
            <div key={index}>
              <InlineEditableText
                textContent={{ text: bullet }}
                onTextUpdate={(updatedContent) =>
                  onTextUpdate?.(`bullet${index}`, updatedContent)
                }
                elementType="bullet"
                slideIndex={4}
                onContentChange={onContentChange || (() => {})}
              >
                <li className={`leading-relaxed font-bold text-start ${getFontSize(
                  { text: bullet },
                  "text-xl"
                )} ${getColor(
                  { text: bullet },
                  "text-gray-700"
                )}`}>{bullet}</li>
              </InlineEditableText>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          {/* Image 1 */}
        {imageLink1 ? (
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={imageLink1}
              alt="Slide image 1"
              className="w-full h-full object-cover"
              width={224}
              height={160}
            />
          </div>
        ) : (
          <div className="w-40 h-40 bg-blue-900 rounded-full flex items-center justify-center text-white">
            <span className="text-sm font-medium">Image</span>
          </div>
        )}

        {/* Image 2 */}
        {imageLink2 ? (
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={imageLink2}
              alt="Slide image 2"
              className="w-full h-full object-cover"
              width={160}
              height={160}
            />
          </div>
        ) : (
          <div className="w-40 h-40 bg-lime-400 rounded-full flex items-center justify-center text-white">
            <span className="text-sm font-medium">numbers</span>
          </div>
        )}

        {/* Image 3 */}
        {imageLink3 ? (
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={imageLink3}
              alt="Slide image 3"
              className="w-full h-full object-cover"
              width={224}
              height={160}
            />
          </div>
        ) : (
          <div className="w-40 h-40 bg-blue-950 rounded-full flex items-center justify-center text-white">
            <span className="text-sm font-medium">text</span>
          </div>
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
        <span className="text-gray-600 font-medium">04</span>
      </div>
    </div>
  );
}
