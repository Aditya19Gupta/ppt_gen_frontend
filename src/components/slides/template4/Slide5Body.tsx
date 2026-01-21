import React from "react";
import Image from "next/image";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide5BodyProps {
  title?: string | { text: string; fontSize?: number; color?: string };
  body1?: string | { text: string; fontSize?: number; color?: string };
  body2?: string | { text: string; fontSize?: number; color?: string };
  body3?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide5Body({
  title = "Title",
  body1 = "Body text 1",
  body2 = "Body text 2",
  body3 = "Body text 3",
  onTextUpdate,
  onContentChange
}: Slide5BodyProps) {
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
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`text-5xl font-bold mb-8 ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-5xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-black')}`}>
            {typeof title === 'string' ? title : title?.text || 'Title'}
          </h1>
        </InlineEditableText>

        <InlineEditableText
          textContent={typeof body1 === 'string' ? { text: body1 } : body1 || { text: 'Body 1' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('body1', updatedContent)}
          elementType="body"
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-black leading-relaxed mb-4 ${getFontSize(typeof body1 === 'string' ? { text: body1 } : body1 || {}, 'text-base')} ${getColor(typeof body1 === 'string' ? { text: body1 } : body1 || {}, 'text-black')}`}>
            {typeof body1 === 'string' ? body1 : body1?.text || 'Body 1'}
          </p>
        </InlineEditableText>

        <InlineEditableText
          textContent={typeof body2 === 'string' ? { text: body2 } : body2 || { text: 'Body 2' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('body2', updatedContent)}
          elementType="body"
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-black leading-relaxed mb-4 ${getFontSize(typeof body2 === 'string' ? { text: body2 } : body2 || {}, 'text-base')} ${getColor(typeof body2 === 'string' ? { text: body2 } : body2 || {}, 'text-black')}`}>
            {typeof body2 === 'string' ? body2 : body2?.text || 'Body 2'}
          </p>
        </InlineEditableText>

        <InlineEditableText
          textContent={typeof body3 === 'string' ? { text: body3 } : body3 || { text: 'Body 3' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('body3', updatedContent)}
          elementType="body"
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-black leading-relaxed mb-4 ${getFontSize(typeof body3 === 'string' ? { text: body3 } : body3 || {}, 'text-base')} ${getColor(typeof body3 === 'string' ? { text: body3 } : body3 || {}, 'text-black')}`}>
            {typeof body3 === 'string' ? body3 : body3?.text || 'Body 3'}
          </p>
        </InlineEditableText>
      </div>
    </div>
  );
}


