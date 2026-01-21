import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide7Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  col1Title?: string | { text: string; fontSize?: number; color?: string };
  col1Desc?: string | { text: string; fontSize?: number; color?: string };
  col2Title?: string | { text: string; fontSize?: number; color?: string };
  col2Desc?: string | { text: string; fontSize?: number; color?: string };
  col3Title?: string | { text: string; fontSize?: number; color?: string };
  col3Desc?: string | { text: string; fontSize?: number; color?: string };
  imageLink1?: string;
  imageLink2?: string;
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide7({
  title = "Three Points And Text",
  col1Title = "Subtitle",
  col1Desc = "Description text here",
  col2Title = "Subtitle",
  col2Desc = "Description text here",
  col3Title = "Subtitle",
  col3Desc = "Description text here",
  imageLink1,
  imageLink2,
  onTextUpdate,
  onContentChange
}: Slide7Props) {
  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden flex flex-col">
      {/* Top Section - White Background */}
      <div className="flex-1 bg-white px-16 pt-20 pb-8 relative">
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

        <div className="flex h-full">
          {/* Left Side - Title */}
          <div className="flex-1">
            <InlineEditableText
              textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
              elementType="title"
              slideIndex={6}
              onContentChange={onContentChange || (() => {})}
            >
              <h1 className={`text-5xl font-bold ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-5xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-black')}`}>
                {typeof title === 'string' ? title : title?.text || 'Title'}
              </h1>
            </InlineEditableText>
          </div>

          {/* Right Side - Images */}
          <div className="w-64 flex flex-col gap-4">
            <div className="flex-1 bg-gray-300 rounded overflow-hidden">
              {imageLink1 ? (
                <Image
                  src={imageLink1}
                  alt="Image 1"
                  className="w-full h-full object-cover"
                  width={256}
                  height={200}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">Image 1</div>
              )}
            </div>
            <div className="flex-1 bg-gray-300 rounded overflow-hidden">
              {imageLink2 ? (
                <Image
                  src={imageLink2}
                  alt="Image 2"
                  className="w-full h-full object-cover"
                  width={256}
                  height={200}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">Image 2</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Yellow Background with Three Columns */}
      <div className="bg-[#FFF8E7] px-16 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <InlineEditableText
              textContent={typeof col1Title === 'string' ? { text: col1Title } : col1Title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('col1Title', updatedContent)}
              elementType="title"
              slideIndex={6}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`font-bold mb-4 ${getFontSize(typeof col1Title === 'string' ? { text: col1Title } : col1Title || {}, 'text-xl')} ${getColor(typeof col1Title === 'string' ? { text: col1Title } : col1Title || {}, 'text-black')}`}>
                {typeof col1Title === 'string' ? col1Title : col1Title?.text || 'Title'}
              </h3>
            </InlineEditableText>
            <InlineEditableText
              textContent={typeof col1Desc === 'string' ? { text: col1Desc } : col1Desc || { text: 'Description' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('col1Desc', updatedContent)}
              elementType="body"
              slideIndex={6}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`text-black text-sm leading-relaxed ${getFontSize(typeof col1Desc === 'string' ? { text: col1Desc } : col1Desc || {}, 'text-sm')} ${getColor(typeof col1Desc === 'string' ? { text: col1Desc } : col1Desc || {}, 'text-black')}`}>
                {typeof col1Desc === 'string' ? col1Desc : col1Desc?.text || 'Description'}
              </p>
            </InlineEditableText>
          </div>

          {/* Column 2 */}
          <div>
            <InlineEditableText
              textContent={typeof col2Title === 'string' ? { text: col2Title } : col2Title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('col2Title', updatedContent)}
              elementType="title"
              slideIndex={6}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`font-bold mb-4 ${getFontSize(typeof col2Title === 'string' ? { text: col2Title } : col2Title || {}, 'text-xl')} ${getColor(typeof col2Title === 'string' ? { text: col2Title } : col2Title || {}, 'text-black')}`}>
                {typeof col2Title === 'string' ? col2Title : col2Title?.text || 'Title'}
              </h3>
            </InlineEditableText>
            <InlineEditableText
              textContent={typeof col2Desc === 'string' ? { text: col2Desc } : col2Desc || { text: 'Description' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('col2Desc', updatedContent)}
              elementType="body"
              slideIndex={6}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`text-black text-sm leading-relaxed ${getFontSize(typeof col2Desc === 'string' ? { text: col2Desc } : col2Desc || {}, 'text-sm')} ${getColor(typeof col2Desc === 'string' ? { text: col2Desc } : col2Desc || {}, 'text-black')}`}>
                {typeof col2Desc === 'string' ? col2Desc : col2Desc?.text || 'Description'}
              </p>
            </InlineEditableText>
          </div>

          {/* Column 3 */}
          <div>
            <InlineEditableText
              textContent={typeof col3Title === 'string' ? { text: col3Title } : col3Title || { text: 'Title' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('col3Title', updatedContent)}
              elementType="title"
              slideIndex={6}
              onContentChange={onContentChange || (() => {})}
            >
              <h3 className={`font-bold mb-4 ${getFontSize(typeof col3Title === 'string' ? { text: col3Title } : col3Title || {}, 'text-xl')} ${getColor(typeof col3Title === 'string' ? { text: col3Title } : col3Title || {}, 'text-black')}`}>
                {typeof col3Title === 'string' ? col3Title : col3Title?.text || 'Title'}
              </h3>
            </InlineEditableText>
            <InlineEditableText
              textContent={typeof col3Desc === 'string' ? { text: col3Desc } : col3Desc || { text: 'Description' }}
              onTextUpdate={(updatedContent) => onTextUpdate?.('col3Desc', updatedContent)}
              elementType="body"
              slideIndex={6}
              onContentChange={onContentChange || (() => {})}
            >
              <p className={`text-black text-sm leading-relaxed ${getFontSize(typeof col3Desc === 'string' ? { text: col3Desc } : col3Desc || {}, 'text-sm')} ${getColor(typeof col3Desc === 'string' ? { text: col3Desc } : col3Desc || {}, 'text-black')}`}>
                {typeof col3Desc === 'string' ? col3Desc : col3Desc?.text || 'Description'}
              </p>
            </InlineEditableText>
          </div>
        </div>
      </div>
    </div>
  );
}

