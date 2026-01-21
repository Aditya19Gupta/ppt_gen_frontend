import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide9Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  subtitle?: string | { text: string; fontSize?: number; color?: string };
  contact?: string | { text: string; fontSize?: number; color?: string };
  imageLink?: string;
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide9({
  title = "Thank You!",
  subtitle = "Presentation title",
  contact = "contact@yourmail.com",
  imageLink,
  onTextUpdate,
  onContentChange
}: Slide9Props) {
  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden flex">
      {/* Left Side - White Background with Image */}
      <div className="w-2/3 bg-white relative">
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

        {/* Image Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="w-full h-full bg-gray-300 rounded-lg overflow-hidden">
            {imageLink ? (
              <Image
                src={imageLink}
                alt="Slide content"
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">Image Here</div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Yellow Background with Text */}
      <div className="w-1/3 bg-[#FFF8E7] flex items-center justify-center px-8 relative">
        <div className="text-center">
          <InlineEditableText
            textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
            elementType="title"
            slideIndex={8}
            onContentChange={onContentChange || (() => {})}
          >
            <h1 className={`text-5xl font-bold mb-6 ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-5xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-black')}`}>
              {typeof title === 'string' ? title : title?.text || 'Title'}
            </h1>
          </InlineEditableText>

          <InlineEditableText
            textContent={typeof subtitle === 'string' ? { text: subtitle } : subtitle || { text: 'Subtitle' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('subtitle', updatedContent)}
            elementType="body"
            slideIndex={8}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-black text-lg mb-4 ${getFontSize(typeof subtitle === 'string' ? { text: subtitle } : subtitle || {}, 'text-lg')} ${getColor(typeof subtitle === 'string' ? { text: subtitle } : subtitle || {}, 'text-black')}`}>
              {typeof subtitle === 'string' ? subtitle : subtitle?.text || 'Subtitle'}
            </p>
          </InlineEditableText>

          <InlineEditableText
            textContent={typeof contact === 'string' ? { text: contact } : contact || { text: 'Contact' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('contact', updatedContent)}
            elementType="body"
            slideIndex={8}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-black text-sm ${getFontSize(typeof contact === 'string' ? { text: contact } : contact || {}, 'text-sm')} ${getColor(typeof contact === 'string' ? { text: contact } : contact || {}, 'text-black')}`}>
              {typeof contact === 'string' ? contact : contact?.text || 'Contact'}
            </p>
          </InlineEditableText>
        </div>
      </div>
    </div>
  );
}

