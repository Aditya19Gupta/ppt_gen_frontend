import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide1Props {
  title?: string | { text: string; fontSize?: string; color?: string };
  description?: string | { text: string; fontSize?: string; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: string; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide1({
  title = "Slide Title",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  onTextUpdate,
  onContentChange
}: Slide1Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white p-10 overflow-hidden">
      <div className="flex items-center justify-center h-[75vh]">
        <div className="bg-[#2D3139] flex items-center justify-center h-full w-full">
          <div className="text-center">
            <InlineEditableText
              textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
              elementType="title"
              slideIndex={0}
              onContentChange={onContentChange || (() => {})}
            >
              <h1 className={`text-6xl font-bold leading-tight mb-8 ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-6xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-white')}`}>
                {typeof title === 'string' ? title : title?.text || 'Title'}
              </h1>
            </InlineEditableText>
            <InlineEditableText
              textContent={typeof description === 'string' ? { text: description } : description || { text: 'Description' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('description', updatedContent)}
              elementType="body"
              slideIndex={0}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`text-lg px-32 font-light ${getFontSize(typeof description === 'string' ? { text: description } : description || {}, 'text-lg')} ${getColor(typeof description === 'string' ? { text: description } : description || {}, 'text-gray-400')}`}>
                {typeof description === 'string' ? description : description?.text || 'Description'}
              </p>
            </InlineEditableText>
          </div>
        </div>
      </div>
    </div>
  );
}
