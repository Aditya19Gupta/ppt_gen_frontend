import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide4Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  description?: string | { text: string; fontSize?: number; color?: string };
  imageLink?: string;
  description2?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide4({
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  imageLink = "",
  description2 = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  onTextUpdate,
  onContentChange
}: Slide4Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16">
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

      {/* Blue horizontal lines at top */}
      <div className="flex flex-col w-full pb-8 pt-16">
        <InlineEditableText
          textContent={typeof description === 'string' ? { text: description } : description || { text: 'Description' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('description', updatedContent)}
          elementType="body"
          slideIndex={0}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-gray-600 text-sm font-medium leading-relaxed ${getFontSize(typeof description === 'string' ? { text: description } : description || {}, 'text-sm')} ${getColor(typeof description === 'string' ? { text: description } : description || {}, 'text-gray-600')}`}>
            {typeof description === 'string' ? description : description?.text || 'Description'}
          </p>
        </InlineEditableText>
      </div>
      <div className="flex-1 mb-10">
        <div className="w-full h-[30vh] bg-[#113029] flex items-center justify-start p-6 overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <span className="text-white text-sm font-light">Image Here</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-5">
        <InlineEditableText
          textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
          elementType="title"
          slideIndex={0}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`font-bold text-gray-900 mb-6 col-span-3 ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-7xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-gray-900')}`}>
            {typeof title === 'string' ? title : title?.text || 'Title'}
          </h1>
        </InlineEditableText>
        <InlineEditableText
          textContent={typeof description2 === 'string' ? { text: description2 } : description2 || { text: 'Description2' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('description2', updatedContent)}
          elementType="body"
          slideIndex={0}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-gray-600 text-sm leading-relaxed col-span-2 ${getFontSize(typeof description2 === 'string' ? { text: description2 } : description2 || {}, 'text-sm')} ${getColor(typeof description2 === 'string' ? { text: description2 } : description2 || {}, 'text-gray-600')}`}>
            {typeof description2 === 'string' ? description2 : description2?.text || 'Description2'}
          </p>
        </InlineEditableText>
      </div>
    </div>
  );
}
