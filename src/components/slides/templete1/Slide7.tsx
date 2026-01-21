import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide7Props {
  title: string | { text: string; fontSize?: string; color?: string };
  desc: string | { text: string; fontSize?: string; color?: string };
  imageLink?: string;
  caption?: string | { text: string; fontSize?: number; color?: string };
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: string; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide7({ title, desc, imageLink, caption, onTextUpdate, onContentChange }: Slide7Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-gray-100">
      {/* Ring graphic at top */}
      <div className="absolute top-0 right-0">
        <Image
          src="/assets/slide1_ring.png"
          alt="Ring graphic"
          className="w-[600px] h-[600px]"
          width={600}
          height={600}
        />
      </div>

      {/* Title and description on left */}
      <div className="relative z-10 px-14 pt-20 max-w-3/5">
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
          slideIndex={6}
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
          slideIndex={6}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`leading-relaxed text-start max-w-2xl ${getFontSize(
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

      {/* Image at bottom left */}
      <div className="absolute bottom-40 right-14">
        <div className="w-96 h-96 bg-sky-600  overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={400}
              height={300}
            />
          ) : (
            <span className="text-white text-xl font-medium flex items-center justify-center h-full">
              image here
            </span>
          )}
        </div>
      </div>
      {caption && (
        <div className="absolute border-4 border-blue-950 w-64 px-2 py-2 bg-white h-fit bottom-36 right-80">
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
            slideIndex={6}
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
        <span className="text-gray-600 font-medium">06</span>
      </div>
    </div>
  );
}
