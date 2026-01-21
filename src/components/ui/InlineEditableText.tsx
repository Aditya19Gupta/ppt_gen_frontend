import React, { useState, useRef, useCallback, useEffect, cloneElement, isValidElement } from "react";
import { getColor } from "@/handlers/ppt";

interface InlineEditableTextProps {
  children: React.ReactNode;
  textContent: { text: string; fontSize?: number; color?: string };
  onTextUpdate: (updatedContent: {
    text: string;
    fontSize?: number;
    color?: string;
  }) => void;
  elementType: "title" | "body" | "intro" | "bullet" | "subtitle" | "mini-title";
  slideIndex: number;
  onContentChange: () => void;
}

const fontSizes = [
  { value: 8, label: "8px" },
  { value: 10, label: "10px" },
  { value: 12, label: "12px" },
  { value: 14, label: "14px" },
  { value: 16, label: "16px" },
  { value: 18, label: "18px" },
  { value: 20, label: "20px" },
  { value: 22, label: "22px" },
  { value: 24, label: "24px" },
  { value: 28, label: "28px" },
  { value: 32, label: "32px" },
  { value: 36, label: "36px" },
  { value: 40, label: "40px" },
  { value: 48, label: "48px" },
  { value: 54, label: "54px" },
  {value: 60, label: "60px"},
  {value: 72, label: "72px"},
  {value: 80, label: "80px"},
];

export default function InlineEditableText({
  children,
  textContent,
  onTextUpdate,
  elementType,
  slideIndex,
  onContentChange,
}: InlineEditableTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localFontSize, setLocalFontSize] = useState<number | undefined>(textContent?.fontSize);
  const [localText, setLocalText] = useState<string>(textContent?.text || "");
  const textRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLSelectElement>(null);
  const editableRef = useRef<HTMLElement | null>(null);

  // Update local fontSize and text when textContent prop changes
  useEffect(() => {
    if (textContent?.fontSize !== undefined) {
      setLocalFontSize(textContent.fontSize);
    }
    if (textContent?.text !== undefined && !isEditing) {
      setLocalText(textContent.text);
    }
  }, [textContent?.fontSize, textContent?.text, isEditing]);

  // Sync contentEditable element's content when text changes externally (only when not editing)
  useEffect(() => {
    if (!isEditing && editableRef.current && textContent?.text !== undefined) {
      const currentText = editableRef.current.textContent || editableRef.current.innerText || "";
      if (currentText !== textContent.text && currentText !== localText) {
        editableRef.current.textContent = textContent.text;
        setLocalText(textContent.text);
      }
    }
  }, [textContent?.text, isEditing, localText]);

  // Get current font size, defaulting based on element type
  const getDefaultFontSize = (): number => {
    switch (elementType) {
      case "title":
        return 60;
      case "subtitle":
        return 54;
      case "intro":
        return 14;
      case "mini-title":
          return 22;  
      case "body":
        return 14;
      case "bullet":
        return 16;
      default:
        return 12;
    }
  };

  const currentFontSize = localFontSize || textContent?.fontSize || getDefaultFontSize();

  const handleFontSizeChange = useCallback(
    (newFontSize: string) => {
      // Convert string to number
      const fontSizeNumber = parseInt(newFontSize, 10);
      
      // Update local state immediately for instant visual feedback
      setLocalFontSize(fontSizeNumber);
      
      const updatedContent = {
        ...textContent,
        fontSize: fontSizeNumber,
      };
      onTextUpdate(updatedContent);
      onContentChange();
    },
    [textContent, onTextUpdate, onContentChange]
  );

  const handleTextChange = useCallback(
    (newText: string) => {
      // Update local state immediately for instant visual feedback
      setLocalText(newText);
      
      const updatedContent = {
        ...textContent,
        text: newText,
      };
      onTextUpdate(updatedContent);
      onContentChange();
    },
    [textContent, onTextUpdate, onContentChange]
  );

  const handleTextBlur = useCallback(() => {
    setIsEditing(false);
    // Use setTimeout to access ref after blur event completes
    setTimeout(() => {
      if (editableRef.current) {
        const newText = editableRef.current.textContent || editableRef.current.innerText || "";
        if (newText !== textContent?.text) {
          handleTextChange(newText);
        }
      }
    }, 0);
  }, [handleTextChange, textContent?.text]);

  // Handle input during editing - only update local state, don't trigger parent updates
  const handleInput = useCallback((e: React.FormEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const newText = target.textContent || target.innerText || "";
    // Only update local state during editing, don't trigger parent updates
    // Parent updates will happen on blur via handleTextBlur
    setLocalText(newText);
  }, []);

  const handleTextKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        editableRef.current?.blur();
      } else if (e.key === "Escape") {
        setIsEditing(false);
        // Restore original text
        if (editableRef.current && textContent?.text) {
          editableRef.current.textContent = textContent.text;
          setLocalText(textContent.text);
        }
        editableRef.current?.blur();
      }
    },
    [textContent?.text]
  );

  const handleTextClick = useCallback((e: React.MouseEvent) => {
    if (!isEditing) {
      e.stopPropagation();
      setIsEditing(true);
      // Focus and select text after a brief delay to ensure element is rendered
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
          const range = document.createRange();
          range.selectNodeContents(editableRef.current);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    }
  }, [isEditing]);

  // Apply fontSize and color styles to the child element
  const applyStylesToChild = (child: React.ReactNode): React.ReactNode => {
    if (!isValidElement(child)) return child;

    const childElement = child as React.ReactElement<{ 
      className?: string; 
      style?: React.CSSProperties;
      onClick?: (e: React.MouseEvent) => void;
      onInput?: (e: React.FormEvent) => void;
      onBlur?: () => void;
      onKeyDown?: (e: React.KeyboardEvent) => void;
    }>;
    const currentClassName = childElement.props.className || "";
    const currentStyle = childElement.props.style || {};
    
    // Use localFontSize (for instant updates) or fontSize from textContent, or default based on element type
    const fontSizeToUse = localFontSize || textContent?.fontSize || getDefaultFontSize();
    const colorClass = getColor(textContent, "");
    
    // Build className with color class (fontSize is applied via inline style, not Tailwind classes)
    const newClassName = [currentClassName, colorClass]
      .filter(Boolean)
      .join(" ")
      .trim();

    // Apply fontSize as inline style instead of class
    const newStyle: React.CSSProperties = {
      ...currentStyle,
      fontSize: `${fontSizeToUse}px`,
    };

    // handleInput is now defined above as useCallback

    const propsToAdd: Record<string, unknown> = {
      className: newClassName,
      style: newStyle,
      contentEditable: isEditing ? true : false,
      suppressContentEditableWarning: true,
      onClick: handleTextClick,
      onInput: handleInput,
      onBlur: handleTextBlur,
      onKeyDown: handleTextKeyDown,
    };

    // Type assertion needed because cloneElement doesn't properly handle contentEditable and ref props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cloneElement(childElement, {
      ...propsToAdd,
      ref: (node: HTMLElement | null) => {
        editableRef.current = node;
      },
    } as any);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      textRef.current &&
      !textRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      editableRef.current &&
      !editableRef.current.contains(e.target as Node)
    ) {
      setIsHovered(false);
      // If editing, blur the editable element
      if (isEditing && editableRef.current) {
        editableRef.current.blur();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    if (isHovered || isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isHovered, isEditing, handleClickOutside]);

  // Determine if child is a block-level element
  const isBlockElement = isValidElement(children) && 
    (typeof children.type === 'string' && 
     ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'].includes(children.type));

  return (
    <span
      ref={textRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        // Don't hide if mouse is moving to dropdown
        if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
          setIsHovered(false);
        }
      }}
      style={{ 
        position: "relative", 
        display: isBlockElement ? "block" : "inline-block",
        width: isBlockElement ? "100%" : "auto"
      }}
    >
      {/* Dashed bounding box on hover - wraps tightly around content */}
      {isHovered && (
        <div 
          className="absolute border-2 border-dashed border-blue-500 pointer-events-none z-10 rounded-sm"
          style={{
            inset: "-2px",
          }}
        />
      )}

      {/* Font size dropdown inside the bounding box at top-right */}
      {isHovered && (
        <div className="absolute top-1 right-1 z-20">
          <select
            ref={dropdownRef}
            value={currentFontSize.toString()}
            onChange={(e) => {
              e.stopPropagation();
              handleFontSizeChange(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-white border-2 border-blue-500 text-xs px-2 py-1 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-semibold min-w-[80px]"
          >
            {fontSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* eslint-disable-next-line react-hooks/exhaustive-deps */}
      {applyStylesToChild(children)}
    </span>
  );
}
