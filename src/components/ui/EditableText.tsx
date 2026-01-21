import React, { useState, useRef, useEffect, useCallback } from "react";
import InlineFontEditor from "./InlineFontEditor";

interface EditableTextProps {
  children: React.ReactNode;
  textContent: { text: string; fontSize?: string; color?: string };
  onTextUpdate: (updatedContent: { text: string; fontSize?: string; color?: string }) => void;
  elementType: 'title' | 'body' | 'intro' | 'bullet' | 'subtitle';
  slideIndex: number;
  onContentChange: () => void; // Trigger save button visibility
}

export default function EditableText({ 
  children, 
  textContent, 
  onTextUpdate, 
  elementType,
  slideIndex,
  onContentChange
}: EditableTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editorPosition, setEditorPosition] = useState({ top: 0, left: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setEditorPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX
      });
    }
    setShowEditor(true);
  };

  const handleFontSizeChange = (newFontSize: string) => {
    const updatedContent = {
      ...textContent,
      fontSize: newFontSize
    };
    onTextUpdate(updatedContent);
    onContentChange(); // Trigger save button
  };

  const handleColorChange = (newColor: string) => {
    const updatedContent = {
      ...textContent,
      color: newColor
    };
    onTextUpdate(updatedContent);
    onContentChange(); // Trigger save button
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (showEditor && textRef.current && !textRef.current.contains(e.target as Node)) {
      const editorElement = document.getElementById('inline-font-editor');
      if (editorElement && !editorElement.contains(e.target as Node)) {
        setShowEditor(false);
      }
    }
  }, [showEditor]);

  useEffect(() => {
    if (showEditor) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showEditor, handleClickOutside]);

  return (
    <div 
      ref={textRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Edit button that appears on hover */}
      {isHovered && (
        <button
          onClick={handleEditClick}
          className="absolute top-0 right-0 transform translate-x-full -translate-y-1 ml-2 bg-blue-600 text-white p-1 rounded shadow-lg hover:bg-blue-700 transition-colors z-10"
          title="Edit font"
        >
          <svg 
            className="w-3 h-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )}

      {/* Inline font editor */}
      <InlineFontEditor
        textContent={textContent}
        onFontSizeChange={handleFontSizeChange}
        onColorChange={handleColorChange}
        isVisible={showEditor}
        position={editorPosition}
      />
    </div>
  );
}
