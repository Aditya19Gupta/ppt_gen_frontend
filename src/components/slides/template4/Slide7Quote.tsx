import React from "react";
import Image from "next/image";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide7QuoteProps {
  quote?: string | { text: string; fontSize?: number; color?: string };
  author?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide7Quote({
  quote = "This Should Be A Short Text Or Phrase That Brings Great Value To The Presentation.",
  author = "Author Name",
  onTextUpdate,
  onContentChange
}: Slide7QuoteProps) {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#FFF8E7] overflow-hidden flex items-center justify-center px-16 py-20">
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

      {/* Content - Centered */}
      <div className="text-center max-w-5xl">
        <InlineEditableText
          textContent={typeof quote === 'string' ? { text: quote } : quote || { text: 'Quote' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('quote', updatedContent)}
          elementType="title"
          slideIndex={6}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`text-5xl font-bold leading-tight mb-8 ${getFontSize(typeof quote === 'string' ? { text: quote } : quote || {}, 'text-5xl')} ${getColor(typeof quote === 'string' ? { text: quote } : quote || {}, 'text-black')}`}>
            "{typeof quote === 'string' ? quote : quote?.text || 'Quote'}"
          </h1>
        </InlineEditableText>

        <InlineEditableText
          textContent={typeof author === 'string' ? { text: author } : author || { text: 'Author' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('author', updatedContent)}
          elementType="body"
          slideIndex={6}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-black text-lg ${getFontSize(typeof author === 'string' ? { text: author } : author || {}, 'text-lg')} ${getColor(typeof author === 'string' ? { text: author } : author || {}, 'text-black')}`}>
            — {typeof author === 'string' ? author : author?.text || 'Author'}
          </p>
        </InlineEditableText>
      </div>
    </div>
  );
}


