import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide3Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  items?: string[] | { text: string; fontSize?: number; color?: string }[];
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide3({
  title = "Table Of Contents",
  items = ["1. The first point", "2. The first second point", "3. The third one", "4. And so on"],
  onTextUpdate,
  onContentChange
}: Slide3Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-white overflow-hidden">
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
      <div className="flex h-full">
        {/* Left Side - Leaves Image with Text Overlay */}
        <div className="relative w-2/5 h-full overflow-hidden">
          <Image
            src="/assets/leaves.png"
            alt="Leaves decoration"
            fill
            className="object-cover"
            priority
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <InlineEditableText
              textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
              elementType="title"
              slideIndex={2}
              onContentChange={onContentChange || (() => {})}
            >
              <h1 className={`text-4xl font-bold text-black ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-4xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-black')}`}>
                {typeof title === 'string' ? title : title?.text || 'Title'}
              </h1>
            </InlineEditableText>
          </div>
        </div>

        {/* Right Side - Numbered List */}
        <div className="flex-1 flex items-center px-16 py-20">
          <div className="w-full">
            {items.map((item, index) => {
              const itemText = typeof item === 'string' ? item : item?.text || '';
              return (
                <InlineEditableText
                  key={index}
                  textContent={typeof item === 'string' ? { text: item } : item || { text: '' }}
                  onTextUpdate={(updatedContent) => onTextUpdate?.(`item${index}`, updatedContent)}
                  elementType="body"
                  slideIndex={2}
                  onContentChange={onContentChange || (() => {})}
                >
                  <p className={`text-black text-xl mb-6 ${getFontSize(typeof item === 'string' ? { text: item } : item || {}, 'text-xl')} ${getColor(typeof item === 'string' ? { text: item } : item || {}, 'text-black')}`}>
                    {itemText}
                  </p>
                </InlineEditableText>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

