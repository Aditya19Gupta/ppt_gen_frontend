import React from "react";
import Image from "next/image";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide6Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  body?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide6({
  title = "Title & Text",
  body = "You can have a short summary of the content you want to add to the presentation. Add more paragraphs to explain something else, if you need more than one paragraph.",
  onTextUpdate,
  onContentChange
}: Slide6Props) {
  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden flex">
      {/* Left Side - Pink Background */}
      <div className="w-1/2 bg-[#FFE0E6]"></div>
      
      {/* Right Side - White Background with Content */}
      <div className="w-1/2 bg-white px-16 py-20 relative">
      {/* Logo - Top Right */}
      <div className="absolute top-4 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto"
          width={160}
          height={32}
        />
      </div>

        {/* Content */}
        <div className="max-w-2xl">
          <InlineEditableText
            textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
            elementType="title"
            slideIndex={5}
            onContentChange={onContentChange || (() => {})}
          >
            <h1 className={`text-5xl font-bold mb-8 ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-5xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-black')}`}>
              {typeof title === 'string' ? title : title?.text || 'Title'}
            </h1>
          </InlineEditableText>

          <InlineEditableText
            textContent={typeof body === 'string' ? { text: body } : body || { text: 'Body' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('body', updatedContent)}
            elementType="body"
            slideIndex={5}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-black leading-relaxed mb-4 ${getFontSize(typeof body === 'string' ? { text: body } : body || {}, 'text-base')} ${getColor(typeof body === 'string' ? { text: body } : body || {}, 'text-black')}`}>
              {typeof body === 'string' ? body : body?.text || 'Body'}
            </p>
          </InlineEditableText>
        </div>
      </div>
    </div>
  );
}

