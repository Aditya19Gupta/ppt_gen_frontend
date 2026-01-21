import axios from "axios";

// Text content interface
export interface TextContent {
  text: string;
  fontSize?: number;
  color?: string;
}

// Image data interface
export interface ImageData {
  imagePrompt: string;
  imageUrl?: string;
  photographer?: string;
  creditUrl?: string;
}

// Column data interface (for slides like Slide2)
export interface ColumnData {
  title: TextContent;
  desc: TextContent;
  imageLink?: string;
}

// Bullet point interface (for slides like Slide4, Slide5)
export interface BulletPoint {
  text: TextContent;
}

// Slide 01 interface (title + body + image)
export interface Slide01 {
  title: TextContent;
  body: TextContent;
  image?: ImageData;
}

// Slide 02 interface (3 columns with images)
export interface Slide02 {
  column1: ColumnData;
  column2: ColumnData;
  column3: ColumnData;
  image1: ImageData;
  image2: ImageData;
  image3: ImageData;
}

// Slide 03 interface (body + image)
export interface Slide03 {
  body: TextContent;
  image?: ImageData;
}

// Slide 04 interface (3 bullet points + 3 images)
export interface Slide04 {
  bullet1: BulletPoint;
  bullet2: BulletPoint;
  bullet3: BulletPoint;
  image1: ImageData;
  image2: ImageData;
  image3: ImageData;
}

// Slide 05 interface (intro + 3 images)
export interface Slide05 {
  intro: TextContent;
  image1: ImageData;
  image2: ImageData;
  image3: ImageData;
}

// Slide 06 interface (body + image)
export interface Slide06 {
  body: TextContent;
  image?: ImageData;
}

// Slide 07 interface (image + caption)
export interface Slide07 {
  image: ImageData;
  caption: TextContent;
}

// Slide 08 interface (body + image)
export interface Slide08 {
  body: TextContent;
  image?: ImageData;
}

// Slide 09 interface (body + image)
export interface Slide09 {
  body: TextContent;
  image?: ImageData;
}

// Slide 10 interface (thank you)
export interface Slide10 {
  thankYou: TextContent;
}

// Complete slide data interface
export interface SlideData {
  "00": Slide01;
  "01": Slide02;
  "02": Slide03;
  "03": Slide04;
  "04": Slide05;
  "05": Slide06;
  "06": Slide07;
  "07": Slide08;
  "08": Slide09;
  "09": Slide10;
}

// Presentation metadata interface
export interface PresentationMetadata {
  date?: TextContent;
  author?: TextContent;
  company?: TextContent;
}

// Main presentation interface
export interface Presentation {
  metadata: PresentationMetadata;
  slides: {
    [slideKey: string]: SlideData;
  };
}

// API response interface
export interface PresentationResponse {
  presentation: Presentation;
}

export interface OutlineRequest {
  topic: string;
  template_id: string;
  user_id: string;
}

// generate ppt outline with streaming support
export const generatePPTOutline = async (
  data: OutlineRequest,
  onChunk?: (chunk: string) => void,
  onComplete?: (fullData: string) => void
) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://ppt-be.onrender.com";

    const response = await fetch(`${baseUrl}/api/outline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullData = "";

    if (!reader) {
      throw new Error("No response body reader available");
    }

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      fullData += chunk;
      
      // Call onChunk callback if provided
      if (onChunk) {
        onChunk(chunk);
      }
    }

    // Call onComplete callback if provided
    if (onComplete) {
      onComplete(fullData);
    }

    return { data: fullData };
  } catch (error) {
    console.error("Error generating PPT outline:", error);
    throw error;
  }
};

export const generatePPTContent = async (
  presentationId: string,
  onChunk?: (chunk: string, partialData?: Presentation | { presentation: Presentation }) => void,
  onComplete?: (fullData: Presentation | { presentation: Presentation }) => void
) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://ppt-be.onrender.com";

    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        presentation_id: presentationId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullData = "";
    let buffer = "";

    if (!reader) {
      throw new Error("No response body reader available");
    }

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      fullData += chunk;
      buffer += chunk;

      // Try to parse complete JSON objects from the buffer
      // Handle both JSON objects and markdown code blocks
      try {
        // Try to extract JSON from markdown code blocks
        const jsonMatches = buffer.match(/```json\n([\s\S]*?)\n```/g);
        if (jsonMatches) {
          for (const match of jsonMatches) {
            const jsonString = match.replace(/```json\n/, "").replace(/\n```/, "");
            try {
              const parsed: Presentation | { presentation: Presentation } = JSON.parse(jsonString);
              if (onChunk) {
                onChunk(chunk, parsed);
              }
              // Clear the matched part from buffer
              buffer = buffer.replace(match, "");
            } catch {
              // Continue if parsing fails
            }
          }
        }

        // Try to parse complete JSON objects directly
        const jsonObjectMatch = buffer.match(/\{[\s\S]*\}/);
        if (jsonObjectMatch) {
          try {
            const parsed: Presentation | { presentation: Presentation } = JSON.parse(jsonObjectMatch[0]);
            if (onChunk) {
              onChunk(chunk, parsed);
            }
            buffer = "";
          } catch {
            // Continue if parsing fails - might be incomplete JSON
          }
        } else {
          // If no complete JSON found, just pass the chunk
          if (onChunk) {
            onChunk(chunk);
          }
        }
      } catch {
        // If parsing fails, just pass the chunk
        if (onChunk) {
          onChunk(chunk);
        }
      }
    }

    // Parse final data
    let presentationData: Presentation | { presentation: Presentation } | string = fullData;

    // Extract JSON from markdown code blocks if present
    if (typeof presentationData === "string") {
      const jsonMatch = presentationData.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        const jsonString = jsonMatch[1];
            try {
              presentationData = JSON.parse(jsonString) as Presentation | { presentation: Presentation };
            } catch (error) {
              console.error("Failed to parse JSON from markdown:", error);
            }
      } else {
        // Try to parse the entire string as JSON
        try {
          presentationData = JSON.parse(presentationData) as Presentation | { presentation: Presentation };
        } catch (error) {
          console.error("Failed to parse JSON from response:", error);
        }
      }
    }

    // Extract the presentation object from the nested structure
    let finalPresentationData: Presentation | { presentation: Presentation };
    if (typeof presentationData === "string") {
      // If still a string, we couldn't parse it - return as is
      finalPresentationData = presentationData as unknown as Presentation;
    } else if ('presentation' in presentationData && presentationData.presentation) {
      finalPresentationData = presentationData;
    } else {
      finalPresentationData = presentationData as Presentation;
    }

    // Call onComplete callback if provided
    if (onComplete) {
      onComplete(finalPresentationData);
    }

    return { data: typeof finalPresentationData === "string" ? finalPresentationData : ('presentation' in finalPresentationData ? finalPresentationData.presentation : finalPresentationData) };
  } catch (error) {
    console.error("Error generating PPT content:", error);
    throw error;
  }
};

export async function getUnsplashImage(imagePrompt: string) {
  try {
    if (!imagePrompt || imagePrompt.trim() === "") {
      console.warn("Empty image prompt provided");
      return null;
    }

    const UNSPLASH_ACCESS_KEY = "5NZG6-powJK6F4QyjHqPJFqlOlES1FGe4NymZsb4_OI";
    // Convert prompt to search query
    const query = imagePrompt
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(" ")
      .slice(0, 5)
      .join(" ");

    if (!query || query.trim() === "") {
      console.warn(`Invalid query generated from prompt: "${imagePrompt}"`);
      return null;
    }

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`;

    console.log(`Fetching image from Unsplash for query: "${query}"`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      console.error(`Unsplash API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.log(`No images found for query: "${query}"`);
      return null;
    }

    const result = {
      imageUrl: data.results[0].urls.regular,
      photographer: data.results[0].user.name,
      creditUrl: data.results[0].links.html,
    };

    console.log(`Successfully fetched image for query: "${query}"`);
    return result;
  } catch (error) {
    console.error(`Error fetching image for prompt "${imagePrompt}":`, error);
    return null;
  }
}

//export 
export const downloadPPT = async (presentation_id: string) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://ppt-be.onrender.com";

    const response = await axios.post(`${baseUrl}/api/export`, {
      presentation_id: presentation_id,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// Process outline data and generate images for slides
export async function processOutlineWithImages(presentationData: Presentation) {
  const processedData = { ...presentationData };

  console.log("Starting image processing for presentation...");
  console.log("Total slides to process:", Object.keys(presentationData.slides).length);

  // Process each slide to generate images
  for (const [slideKey, slide] of Object.entries(presentationData.slides)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slideData = slide as any;
    console.log(`\nProcessing slide ${slideKey}...`);

    // Get all keys in the slide data
    const slideKeys = Object.keys(slideData);
    console.log(`Slide ${slideKey} keys:`, slideKeys);

    // Process all image objects dynamically (handles image, image1, col1Image, stat1Image, etc.)
    for (const key of slideKeys) {
      const value = slideData[key];
      
      // Check if this key contains an image object with imagePrompt
      if (value && typeof value === 'object' && !Array.isArray(value) && value.imagePrompt) {
        console.log(
          `Processing ${key} for slide ${slideKey}:`,
          value.imagePrompt,
        );
        
        // Skip if imageUrl already exists
        if (value.imageUrl) {
          console.log(`Slide ${slideKey} ${key} already has an image URL, skipping generation`);
          continue;
        }

        const imageData = await getUnsplashImage(value.imagePrompt);
        if (imageData) {
          slideData[key] = {
            ...value,
            imageUrl: imageData.imageUrl,
            photographer: imageData.photographer,
            creditUrl: imageData.creditUrl,
          };
          console.log(`✓ Successfully generated ${key} for slide ${slideKey}`);
        } else {
          console.warn(`✗ Failed to generate ${key} for slide ${slideKey}`);
        }
      }
    }

    // Also handle nested image objects (for backward compatibility with image.imagePrompt structure)
    if (slideData.image && typeof slideData.image === 'object' && slideData.image.imagePrompt) {
      if (!slideData.image.imageUrl) {
        console.log(
          `Processing nested main image for slide ${slideKey}:`,
          slideData.image.imagePrompt,
        );
        const imageData = await getUnsplashImage(slideData.image.imagePrompt);
        if (imageData) {
          slideData.image = {
            ...slideData.image,
            imageUrl: imageData.imageUrl,
            photographer: imageData.photographer,
            creditUrl: imageData.creditUrl,
          };
          console.log(`✓ Successfully generated nested main image for slide ${slideKey}`);
        } else {
          console.warn(`✗ Failed to generate nested main image for slide ${slideKey}`);
        }
      }
    }

    processedData.slides[slideKey] = slideData;
  }

  console.log("\n✓ Image processing completed");
  return processedData;
}

// Helper function to get font size from TextContent
export const getFontSize = (textContent: TextContent, defaultSize: string = "text-base"): string => {
  if (textContent.fontSize === undefined || textContent.fontSize === null) return defaultSize;
  
  // Map font size numbers to Tailwind classes
  const fontSizeMap: { [key: number]: string } = {
    8: "text-xs",
    10: "text-sm",
    12: "text-base",
    14: "text-lg",
    16: "text-xl",
    18: "text-2xl",
    20: "text-3xl",
    24: "text-4xl",
    28: "text-5xl",
    32: "text-6xl",
    36: "text-7xl",
    40: "text-8xl",
    48: "text-9xl",
    // Legacy support for string values
    72: "text-9xl", // 9xl equivalent
  };
  
  // Handle both number and string (for backward compatibility)
  const fontSize = typeof textContent.fontSize === "string" 
    ? parseInt(textContent.fontSize) 
    : textContent.fontSize;
  
  return fontSizeMap[fontSize] || defaultSize;
};

// Helper function to get color from TextContent
export const getColor = (textContent: TextContent, defaultColor: string = "text-gray-700"): string => {
  if (!textContent.color) return defaultColor;
  
  // Map color names to Tailwind classes
  const colorMap: { [key: string]: string } = {
    "black": "text-black",
    "white": "text-white",
    "gray": "text-gray-700",
    "red": "text-red-600",
    "blue": "text-blue-600",
    "green": "text-green-600",
    "yellow": "text-yellow-600",
    "purple": "text-purple-600",
    "pink": "text-pink-600",
    "indigo": "text-indigo-600",
    "blue-950": "text-blue-950"
  };
  
  return colorMap[textContent.color] || defaultColor;
};

// Helper function to update font size in TextContent
export const updateTextFontSize = (textContent: TextContent, newFontSize: number | string): TextContent => {
  // Convert string to number if needed (for backward compatibility)
  const fontSizeNumber = typeof newFontSize === "string" ? parseInt(newFontSize, 10) : newFontSize;
  return {
    ...textContent,
    fontSize: fontSizeNumber
  };
};

// Helper function to update color in TextContent
export const updateTextColor = (textContent: TextContent, newColor: string): TextContent => {
  return {
    ...textContent,
    color: newColor
  };
};

export const updateFontSize = async (presentationId: string, updatedContent: { presentation: Presentation }) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://ppt-be.onrender.com";

    const response = await axios.patch(`${baseUrl}/api/update-content`, {
      presentation_id: presentationId,
      updated_content: updatedContent
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
};