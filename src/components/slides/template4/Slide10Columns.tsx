import React from "react";
import Image from "next/image";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide10ColumnsProps {
  title?: string | { text: string; fontSize?: number; color?: string };
  sub1Title?: string | { text: string; fontSize?: number; color?: string };
  sub1Desc?: string | { text: string; fontSize?: number; color?: string };
  sub2Title?: string | { text: string; fontSize?: number; color?: string };
  sub2Desc?: string | { text: string; fontSize?: number; color?: string };
  sub3Title?: string | { text: string; fontSize?: number; color?: string };
  sub3Desc?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide10Columns({
  title = "Title",
  sub1Title = "Subtitle 1",
  sub1Desc = "Description 1",
  sub2Title = "Subtitle 2",
  sub2Desc = "Description 2",
  sub3Title = "Subtitle 3",
  sub3Desc = "Description 3",
  onTextUpdate,
  onContentChange
}: Slide10ColumnsProps) {
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
      <div className="max-w-6xl">
        <InlineEditableText
          textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
          onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
          elementType="title"
          slideIndex={9}
          onContentChange={onContentChange || (() => {})}
        >
          <h1 className={`text-5xl font-bold mb-12 ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-5xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-black')}`}>
            {typeof title === 'string' ? title : title?.text || 'Title'}
          </h1>
        </InlineEditableText>

        <div className="grid grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <InlineEditableText
              textContent={typeof sub1Title === 'string' ? { text: sub1Title } : sub1Title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('sub1Title', updatedContent)}
              elementType="title"
              slideIndex={9}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`font-bold mb-4 ${getFontSize(typeof sub1Title === 'string' ? { text: sub1Title } : sub1Title || {}, 'text-xl')} ${getColor(typeof sub1Title === 'string' ? { text: sub1Title } : sub1Title || {}, 'text-black')}`}>
                {typeof sub1Title === 'string' ? sub1Title : sub1Title?.text || 'Title'}
              </h3>
            </InlineEditableText>
            <InlineEditableText
              textContent={typeof sub1Desc === 'string' ? { text: sub1Desc } : sub1Desc || { text: 'Description' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('sub1Desc', updatedContent)}
              elementType="body"
              slideIndex={9}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`text-black text-sm leading-relaxed ${getFontSize(typeof sub1Desc === 'string' ? { text: sub1Desc } : sub1Desc || {}, 'text-sm')} ${getColor(typeof sub1Desc === 'string' ? { text: sub1Desc } : sub1Desc || {}, 'text-black')}`}>
                {typeof sub1Desc === 'string' ? sub1Desc : sub1Desc?.text || 'Description'}
              </p>
            </InlineEditableText>
          </div>

          {/* Column 2 */}
          <div>
            <InlineEditableText
              textContent={typeof sub2Title === 'string' ? { text: sub2Title } : sub2Title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('sub2Title', updatedContent)}
              elementType="title"
              slideIndex={9}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`font-bold mb-4 ${getFontSize(typeof sub2Title === 'string' ? { text: sub2Title } : sub2Title || {}, 'text-xl')} ${getColor(typeof sub2Title === 'string' ? { text: sub2Title } : sub2Title || {}, 'text-black')}`}>
                {typeof sub2Title === 'string' ? sub2Title : sub2Title?.text || 'Title'}
              </h3>
            </InlineEditableText>
            <InlineEditableText
              textContent={typeof sub2Desc === 'string' ? { text: sub2Desc } : sub2Desc || { text: 'Description' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('sub2Desc', updatedContent)}
              elementType="body"
              slideIndex={9}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`text-black text-sm leading-relaxed ${getFontSize(typeof sub2Desc === 'string' ? { text: sub2Desc } : sub2Desc || {}, 'text-sm')} ${getColor(typeof sub2Desc === 'string' ? { text: sub2Desc } : sub2Desc || {}, 'text-black')}`}>
                {typeof sub2Desc === 'string' ? sub2Desc : sub2Desc?.text || 'Description'}
              </p>
            </InlineEditableText>
          </div>

          {/* Column 3 */}
          <div>
            <InlineEditableText
              textContent={typeof sub3Title === 'string' ? { text: sub3Title } : sub3Title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('sub3Title', updatedContent)}
              elementType="title"
              slideIndex={9}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`font-bold mb-4 ${getFontSize(typeof sub3Title === 'string' ? { text: sub3Title } : sub3Title || {}, 'text-xl')} ${getColor(typeof sub3Title === 'string' ? { text: sub3Title } : sub3Title || {}, 'text-black')}`}>
                {typeof sub3Title === 'string' ? sub3Title : sub3Title?.text || 'Title'}
              </h3>
            </InlineEditableText>
            <InlineEditableText
              textContent={typeof sub3Desc === 'string' ? { text: sub3Desc } : sub3Desc || { text: 'Description' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('sub3Desc', updatedContent)}
              elementType="body"
              slideIndex={9}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`text-black text-sm leading-relaxed ${getFontSize(typeof sub3Desc === 'string' ? { text: sub3Desc } : sub3Desc || {}, 'text-sm')} ${getColor(typeof sub3Desc === 'string' ? { text: sub3Desc } : sub3Desc || {}, 'text-black')}`}>
                {typeof sub3Desc === 'string' ? sub3Desc : sub3Desc?.text || 'Description'}
              </p>
            </InlineEditableText>
          </div>
        </div>
      </div>
    </div>
  );
}


