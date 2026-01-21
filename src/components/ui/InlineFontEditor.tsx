import React from "react";

interface InlineFontEditorProps {
  textContent: { text: string; fontSize?: string; color?: string };
  onFontSizeChange: (newFontSize: string) => void;
  onColorChange: (newColor: string) => void;
  isVisible: boolean;
  position?: { top: number; left: number };
}

const fontSizes = [
  { value: "text-xs", label: "Extra Small" },
  { value: "text-sm", label: "Small" },
  { value: "text-base", label: "Base" },
  { value: "text-lg", label: "Large" },
  { value: "text-xl", label: "Extra Large" },
  { value: "text-2xl", label: "2XL" },
  { value: "text-3xl", label: "3XL" },
  { value: "text-4xl", label: "4XL" },
  { value: "text-5xl", label: "5XL" },
  { value: "text-6xl", label: "6XL" },
  { value: "text-7xl", label: "7XL" },
  { value: "text-8xl", label: "8XL" },
  { value: "text-9xl", label: "9XL" },
];

const colors = [
  { value: "text-gray-900", label: "Black" },
  { value: "text-white", label: "White" },
  { value: "text-blue-600", label: "Blue" },
  { value: "text-red-600", label: "Red" },
  { value: "text-green-600", label: "Green" },
  { value: "text-purple-600", label: "Purple" },
  { value: "text-yellow-600", label: "Yellow" },
  { value: "text-pink-600", label: "Pink" },
];

export default function InlineFontEditor({ 
  textContent, 
  onFontSizeChange, 
  onColorChange, 
  isVisible, 
  position 
}: InlineFontEditorProps) {
  if (!isVisible) return null;

  // Ensure textContent has default values
  const safeTextContent = {
    text: textContent?.text || '',
    fontSize: textContent?.fontSize || 'text-base',
    color: textContent?.color || 'text-gray-900'
  };

  const editorStyle: React.CSSProperties = {
    position: 'absolute',
    top: position?.top || 0,
    left: position?.left || 0,
    zIndex: 1000,
  };

  return (
    <div 
      id="inline-font-editor"
      className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]"
      style={editorStyle}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <select
            value={safeTextContent.fontSize}
            onChange={(e) => onFontSizeChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {fontSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Color
          </label>
          <select
            value={safeTextContent.color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
