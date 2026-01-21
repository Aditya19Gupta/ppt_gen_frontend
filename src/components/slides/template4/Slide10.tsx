import React from "react";
import Image from "next/image";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide10Props {
  thankYou?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide10({
  thankYou = "Thank You!",
  onTextUpdate,
  onContentChange
}: Slide10Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#FFF8E7] overflow-hidden flex items-center justify-center">
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
      <div className="text-center">
        <InlineEditableText
          textContent={typeof thankYou === 'string' ? { text: thankYou } : thankYou || { text: 'Thank You!' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('thankYou', updatedContent)}
          elementType="title"
          slideIndex={9}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`text-7xl font-bold ${getFontSize(typeof thankYou === 'string' ? { text: thankYou } : thankYou || {}, 'text-7xl')} ${getColor(typeof thankYou === 'string' ? { text: thankYou } : thankYou || {}, 'text-black')}`}>
            {typeof thankYou === 'string' ? thankYou : thankYou?.text || 'Thank You!'}
          </h1>
        </InlineEditableText>
      </div>
    </div>
  );
}

