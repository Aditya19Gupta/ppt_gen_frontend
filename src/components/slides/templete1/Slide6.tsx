import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide6Props {
  title: string | { text: string; fontSize?: string; color?: string };
  desc: string | { text: string; fontSize?: string; color?: string };
  imageLink1?: string;
  imageLink2?: string;
  caption?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: string; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide6({ title, desc, imageLink1, imageLink2, caption, onTextUpdate, onContentChange }: Slide6Props) {
  console.log('Slide6 received props:', { title, desc, imageLink1, imageLink2 });
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      <div className="px-16 grid grid-cols-2 pt-20">
        <div className="max-w-full">
          <InlineEditableText
            textContent={
              typeof title === "string"
                ? { text: title }
                : title || { text: "Title" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("title", updatedContent)
            }
            elementType="subtitle"
            slideIndex={5}
            onContentChange={onContentChange || (() => {})}
          >
            <h1 className={`text-8xl font-bold mb-8 ${getFontSize(
              typeof title === "string" ? { text: title } : title || {},
              "text-8xl"
            )} ${getColor(
              typeof title === "string" ? { text: title } : title || {},
              "text-blue-950"
            )}`}>
              {typeof title === 'string' ? title : title?.text || 'Title'}
            </h1>
          </InlineEditableText>
          <InlineEditableText
            textContent={
              typeof desc === "string"
                ? { text: desc }
                : desc || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("desc", updatedContent)
            }
            elementType="body"
            slideIndex={5}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`leading-relaxed text-start mr-4 ${getFontSize(
              typeof desc === "string" ? { text: desc } : desc || {},
              "text-lg"
            )} ${getColor(
              typeof desc === "string" ? { text: desc } : desc || {},
              "text-gray-700"
            )}`}>
              {typeof desc === 'string' ? desc : desc?.text || ''}
            </p>
          </InlineEditableText>
        </div>
         <div className="flex gap-0 flex-col">
          {/* Left side - first image */}
          <div className="grid grid-cols-2 gap-0">
              <div></div>
              <div className="w-full h-56 -ml-4 bg-lime-300 border-2 border-blue-950  overflow-hidden">
              {imageLink1 ? (
                <Image
                  src={imageLink1}
                  alt="First image"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              ) : (
                <span className="text-white text-xl font-medium flex items-center justify-center h-full">image here</span>
              )}
            </div>
          </div>
          
          {/* Right side - second image */}
          <div className="grid grid-cols-2">
            <div className="w-full h-56 -mt-4 bg-lime-300  border-2 border-blue-950  overflow-hidden">
              {imageLink2 ? (
                <Image
                  src={imageLink2}
                  alt="Second image"
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              ) : (
                <span className="text-white text-xl font-medium flex items-center justify-center h-full">image here</span>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Caption box */}
      {caption && (
        <div className="absolute border-4 border-blue-950 w-60 bg-white h-12 bottom-36 right-80">
          <InlineEditableText
            textContent={
              typeof caption === "string"
                ? { text: caption }
                : caption || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("caption", updatedContent)
            }
            elementType="body"
            slideIndex={5}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-blue-950 text-xl font-medium flex items-center justify-center h-full ${getFontSize(
              typeof caption === "string" ? { text: caption } : caption || {},
              "text-xl"
            )} ${getColor(
              typeof caption === "string" ? { text: caption } : caption || {},
              "text-blue-950"
            )}`}>
              {typeof caption === 'string' ? caption : caption?.text || ''}
            </p>
          </InlineEditableText>
        </div>
      )}

      {/* Blue line at bottom */}
      <Separator className="absolute bottom-14 left-0 right-0 h-2 border-2 border-blue-950 bg-blue-950" />
      
      {/* Logo and page number at bottom */}
      <div className="absolute bottom-4 left-12 right-8 flex items-center justify-between">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-40"
          width={1000}
          height={24}
        />
        <span className="text-gray-600 font-medium">05</span>
      </div>
    </div>
  );
}
