import React from "react";
import Image from "next/image";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide5Props {
  quote?: string | { text: string; fontSize?: number; color?: string };
  subtitle?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide5({
  quote = "This Should Be A Short Text Or Phrase That Brings Great Value To The Presentation.",
  subtitle = "YOUR SUBTITLE",
  onTextUpdate,
  onContentChange
}: Slide5Props) {
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
          textContent={typeof subtitle === 'string' ? { text: subtitle } : subtitle || { text: 'Subtitle' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('subtitle', updatedContent)}
          elementType="body"
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-black text-sm mb-8 ${getFontSize(typeof subtitle === 'string' ? { text: subtitle } : subtitle || {}, 'text-sm')} ${getColor(typeof subtitle === 'string' ? { text: subtitle } : subtitle || {}, 'text-black')}`}>
            {typeof subtitle === 'string' ? subtitle : subtitle?.text || 'Subtitle'}
          </p>
        </InlineEditableText>

        <InlineEditableText
          textContent={typeof quote === 'string' ? { text: quote } : quote || { text: 'Quote' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('quote', updatedContent)}
          elementType="title"
          slideIndex={4}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`text-5xl font-bold leading-tight ${getFontSize(typeof quote === 'string' ? { text: quote } : quote || {}, 'text-5xl')} ${getColor(typeof quote === 'string' ? { text: quote } : quote || {}, 'text-black')}`}>
            "{typeof quote === 'string' ? quote : quote?.text || 'Quote'}"
          </h1>
        </InlineEditableText>
      </div>
    </div>
  );
}

