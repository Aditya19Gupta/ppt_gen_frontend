import React from "react";

interface FontSizeEditorProps {
  textContent: { text: string; fontSize?: string; color?: string };
  onFontSizeChange: (newFontSize: string) => void;
  onColorChange: (newColor: string) => void;
}

export default function FontSizeEditor({ textContent, onFontSizeChange, onColorChange }: FontSizeEditorProps) {
  // Ensure textContent has default values
  const safeTextContent = {
    text: textContent?.text || '',
    fontSize: textContent?.fontSize || '',
    color: textContent?.color || ''
  };

  const fontSizes = [
    { value: "xs", label: "Extra Small" },
    { value: "sm", label: "Small" },
    { value: "base", label: "Base" },
    { value: "lg", label: "Large" },
    { value: "xl", label: "Extra Large" },
    { value: "2xl", label: "2XL" },
    { value: "3xl", label: "3XL" },
    { value: "4xl", label: "4XL" },
    { value: "5xl", label: "5XL" },
    { value: "6xl", label: "6XL" },
    { value: "7xl", label: "7XL" },
    { value: "8xl", label: "8XL" },
    { value: "9xl", label: "9XL" },
  ];

  const colors = [
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "gray", label: "Gray" },
    { value: "blue", label: "Blue" },
    { value: "blue-950", label: "Blue 950" },
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
    { value: "pink", label: "Pink" },
    { value: "indigo", label: "Indigo" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Text Styling</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size
        </label>
        <select
          value={safeTextContent.fontSize || "base"}
          onChange={(e) => onFontSizeChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fontSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <select
          value={safeTextContent.color || "gray"}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {colors.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-600">
        <p>Current text: &quot;{safeTextContent.text}&quot;</p>
        <p>Font size: {safeTextContent.fontSize || "default"}</p>
        <p>Color: {safeTextContent.color || "default"}</p>
      </div>
    </div>
  );
}
