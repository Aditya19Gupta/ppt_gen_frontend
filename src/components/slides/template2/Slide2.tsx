import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import InlineEditableText from "@/components/ui/InlineEditableText";
import { getFontSize, getColor } from "@/handlers/ppt";

interface Slide2Props {
  tagline?: string | { text: string; fontSize?: number; color?: string };
  title?: string | { text: string; fontSize?: number; color?: string };
  description?: string | { text: string; fontSize?: number; color?: string };
  contentTitle?: string | { text: string; fontSize?: number; color?: string };
  contentDescription?: string | { text: string; fontSize?: number; color?: string };
  imageLink?: string;
  onTextUpdate?: (
    elementType: string,
    updatedContent: { text: string; fontSize?: number; color?: string }
  ) => void;
  onContentChange?: () => void;
}

export default function Slide2({
  tagline = "Tagline",
  title = "Slide Title",
  description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  contentTitle = "We start take off in 2019",
  contentDescription = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut ad enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam ut enim ad minima veniam, quis.",
  imageLink = "",
  onTextUpdate,
  onContentChange,
}: Slide2Props) {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#113029]  overflow-hidden">
      {/* BrainStrata Logo - Top Right */}
      <div className="absolute top-4 right-8 z-10">
        <Image
          src="/assets/logo.png"
          alt="BrainStrata Logo"
          className="h-8 w-auto invert"
          width={160}
          height={32}
        />
      </div>
      <div className="flex flex-col pt-16 px-16 w-1/2">
        <InlineEditableText
          textContent={
            typeof tagline === "string"
              ? { text: tagline }
              : tagline || { text: "Tagline" }
          }
          onTextUpdate={(updatedContent) =>
            onTextUpdate?.("tagline", updatedContent)
          }
          elementType="body"
          slideIndex={1}
          onContentChange={onContentChange || (() => {})}
        >
          <p className={`text-gray-300 font-light mb-2 ${getFontSize(
            typeof tagline === "string" ? { text: tagline } : tagline || {},
            "text-sm"
          )} ${getColor(
            typeof tagline === "string" ? { text: tagline } : tagline || {},
            "text-gray-300"
          )}`}>
            {typeof tagline === "string" ? tagline : tagline?.text || "Tagline"}
          </p>
        </InlineEditableText>
        <div>
          <InlineEditableText
            textContent={
              typeof title === "string"
                ? { text: title }
                : title || { text: "Slide Title" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("title", updatedContent)
            }
            elementType="title"
            slideIndex={1}
            onContentChange={onContentChange || (() => {})}
          >
            <h1 className={`font-bold text-white mb-1 ${getFontSize(
              typeof title === "string" ? { text: title } : title || {},
              "text-6xl"
            )} ${getColor(
              typeof title === "string" ? { text: title } : title || {},
              "text-white"
            )}`}>
              {typeof title === "string" ? title : title?.text || "Slide Title"}
            </h1>
          </InlineEditableText>
          <Separator className="h-2 border-2 border-[#2d6b56] bg-[#2d6b56]" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-12 px-16">
        <div className="flex flex-col col-span-3">
          <InlineEditableText
            textContent={
              typeof description === "string"
                ? { text: description }
                : description || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("description", updatedContent)
            }
            elementType="body"
            slideIndex={1}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-gray-300 font-light mt-28 ${getFontSize(
              typeof description === "string" ? { text: description } : description || {},
              "text-sm"
            )} ${getColor(
              typeof description === "string" ? { text: description } : description || {},
              "text-gray-300"
            )}`}>
              {typeof description === "string"
                ? description
                : description?.text || ""}
            </p>
          </InlineEditableText>
        </div>
        <div className="flex flex-col -mt-5 col-span-2">
          <InlineEditableText
            textContent={
              typeof contentTitle === "string"
                ? { text: contentTitle }
                : contentTitle || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("contentTitle", updatedContent)
            }
            elementType="title"
            slideIndex={1}
            onContentChange={onContentChange || (() => {})}
          >
            <h3 className={`font-bold text-white mb-1 ${getFontSize(
              typeof contentTitle === "string" ? { text: contentTitle } : contentTitle || {},
              "text-2xl"
            )} ${getColor(
              typeof contentTitle === "string" ? { text: contentTitle } : contentTitle || {},
              "text-white"
            )}`}>
              {typeof contentTitle === "string"
                ? contentTitle
                : contentTitle?.text || ""}
            </h3>
          </InlineEditableText>
          <InlineEditableText
            textContent={
              typeof contentDescription === "string"
                ? { text: contentDescription }
                : contentDescription || { text: "" }
            }
            onTextUpdate={(updatedContent) =>
              onTextUpdate?.("contentDescription", updatedContent)
            }
            elementType="body"
            slideIndex={1}
            onContentChange={onContentChange || (() => {})}
          >
            <p className={`text-gray-300 font-light mt-5 ${getFontSize(
              typeof contentDescription === "string" ? { text: contentDescription } : contentDescription || {},
              "text-sm"
            )} ${getColor(
              typeof contentDescription === "string" ? { text: contentDescription } : contentDescription || {},
              "text-gray-300"
            )}`}>
              {typeof contentDescription === "string"
                ? contentDescription
                : contentDescription?.text || ""}
            </p>
          </InlineEditableText>
        </div>
      </div>
      {/* Two Column Layout */}
      <div className="absolute bottom-0 w-full">
        {/* Image Placeholder */}
        <div className="w-full h-[35vh] bg-[#2d6b56]  rounded-sm flex items-center justify-start p-0overflow-hidden">
          {imageLink ? (
            <Image
              src={imageLink}
              alt="Slide content"
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          ) : (
            <span className="text-white text-sm font-light">Image Here</span>
          )}
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
