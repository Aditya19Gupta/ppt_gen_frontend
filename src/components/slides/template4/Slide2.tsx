import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";
import Image from "next/image";

interface Slide2Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  body?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide2({
  title = "Introduction",
  body = "This should have short summary of the presentation or topic here. You may provide the presentation's purpose or its relevance. You may also include a brief overview of the key points or sections that will be covered to help set the stage.",
  onTextUpdate,
  onContentChange
}: Slide2Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden px-16 py-20">
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
      <div className="max-w-4xl">
        <InlineEditableText
          textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
          elementType="title"
          slideIndex={1}
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
          slideIndex={1}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-black leading-relaxed ${getFontSize(typeof body === 'string' ? { text: body } : body || {}, 'text-base')} ${getColor(typeof body === 'string' ? { text: body } : body || {}, 'text-black')}`}>
            {typeof body === 'string' ? body : body?.text || 'Body'}
          </p>
        </InlineEditableText>
      </div>
    </div>
  );
}

