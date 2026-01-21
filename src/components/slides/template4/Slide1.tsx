import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide1Props {
  title?: string | { text: string; fontSize?: number; color?: string };
  tagline?: string | { text: string; fontSize?: number; color?: string };
  contact?: string | { text: string; fontSize?: number; color?: string };
  imageLink?: string;
  onTextUpdate?: (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void;
  onContentChange?: () => void;
}

export default function Slide1({
  title = "Presentation Title",
  tagline = "short description",
  contact = "contact: name@email.com",
  imageLink,
  onTextUpdate,
  onContentChange
}: Slide1Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#FFF8E7] overflow-hidden">
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

      {/* Main Content */}
      <div className="flex items-center h-full px-16 py-20">
        {/* Left Side - Text Content */}
        <div className="flex-1 z-10">
          <InlineEditableText
            textContent={typeof tagline === 'string' ? { text: tagline } : tagline || { text: 'Tagline' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('tagline', updatedContent)}
            elementType="body"
            slideIndex={0}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-black text-sm mb-4 ${getFontSize(typeof tagline === 'string' ? { text: tagline } : tagline || {}, 'text-sm')} ${getColor(typeof tagline === 'string' ? { text: tagline } : tagline || {}, 'text-black')}`}>
              {typeof tagline === 'string' ? tagline : tagline?.text || 'Tagline'}
            </p>
          </InlineEditableText>
          
          <InlineEditableText
            textContent={typeof title === 'string' ? { text: title } : title || { text: 'Title' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('title', updatedContent)}
            elementType="title"
            slideIndex={0}
            onContentChange={onContentChange || (() => {})}
          >
            <h1 className={`text-7xl font-bold leading-tight mb-8 ${getFontSize(typeof title === 'string' ? { text: title } : title || {}, 'text-7xl')} ${getColor(typeof title === 'string' ? { text: title } : title || {}, 'text-black')}`}>
              {typeof title === 'string' ? title : title?.text || 'Title'}
            </h1>
          </InlineEditableText>

          <InlineEditableText
            textContent={typeof contact === 'string' ? { text: contact } : contact || { text: 'Contact' }}
            onTextUpdate={(updatedContent) => onTextUpdate?.('contact', updatedContent)}
            elementType="body"
            slideIndex={0}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-black text-sm ${getFontSize(typeof contact === 'string' ? { text: contact } : contact || {}, 'text-sm')} ${getColor(typeof contact === 'string' ? { text: contact } : contact || {}, 'text-black')}`}>
              {typeof contact === 'string' ? contact : contact?.text || 'Contact'}
            </p>
          </InlineEditableText>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="flex-1 flex items-center justify-center pl-12">
          <div className="w-[400px] h-[400px] bg-[#C8E6C9] rounded-lg flex items-center justify-center">
            {imageLink ? (
              <Image
                src={imageLink}
                alt="Slide content"
                className="w-full h-full object-cover rounded-lg"
                width={400}
                height={400}
              />
            ) : (
              <p className="text-gray-600 text-sm font-light">Image Here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

