"use client";

import { useState, useEffect } from "react";
import "@/styles/animations.css";
import Link from "next/link";
import {
  getAllTemplate,
  UNIVERSAL_USER_ID,
  TemplateResponse,
} from "@/handlers/template";
import {
  generatePPTOutline,
  generatePPTContent,
  processOutlineWithImages,
  downloadPPT,
  updateTextFontSize,
  updateTextColor,
  updateFontSize,
  Presentation,
  TextContent,
} from "@/handlers/ppt";
import Slide1 from "@/components/slides/templete1/Slide1";
import Slide2 from "@/components/slides/templete1/Slide2";
import Slide3 from "@/components/slides/templete1/Slide3";
import Slide4 from "@/components/slides/templete1/Slide4";
import Slide5 from "@/components/slides/templete1/Slide5";
import Slide6 from "@/components/slides/templete1/Slide6";
import Slide7 from "@/components/slides/templete1/Slide7";
import Slide8 from "@/components/slides/templete1/Slide8";
import Slide9 from "@/components/slides/templete1/Slide9";
import Slide10 from "@/components/slides/templete1/Slide10";
import FontSizeEditor from "@/components/ui/FontSizeEditor";
import Slide1Template2 from "@/components/slides/template2/Slide1";
import Slide2Template2 from "@/components/slides/template2/Slide2";
import Slide3Template2 from "@/components/slides/template2/Slide3";
import Slide4Template2 from "@/components/slides/template2/Slide4";
import Slide5Template2 from "@/components/slides/template2/Slide5";
import Slide6Template2 from "@/components/slides/template2/Slide6";
import Slide7Template2 from "@/components/slides/template2/Slide7";
import Slide8Template2 from "@/components/slides/template2/Slide8";
import Slide9Template2 from "@/components/slides/template2/Slide9";
import Slide10Template2 from "@/components/slides/template2/Slide10";
import Slide1Template3 from "@/components/slides/template3/Slide1";
import Slide2Template3 from "@/components/slides/template3/Slide2";
import Slide3Template3 from "@/components/slides/template3/Slide3";
import Slide4Template3 from "@/components/slides/template3/Slide4";
import Slide5Template3 from "@/components/slides/template3/Slide5";
import Slide6Template3 from "@/components/slides/template3/Slide6";
import Slide7Template3 from "@/components/slides/template3/Slide7";
import Slide8Template3 from "@/components/slides/template3/Slide8";
import Slide9Template3 from "@/components/slides/template3/Slide9";
import Slide10Template3 from "@/components/slides/template3/Slide10";
import Slide1Template4 from "@/components/slides/template4/Slide1";
import Slide2Template4 from "@/components/slides/template4/Slide2";
import Slide3Template4 from "@/components/slides/template4/Slide3";
import Slide4Template4 from "@/components/slides/template4/Slide4";
import Slide5BodyTemplate4 from "@/components/slides/template4/Slide5Body";
import Slide6Template4 from "@/components/slides/template4/Slide6";
import Slide7QuoteTemplate4 from "@/components/slides/template4/Slide7Quote";
import Slide8ColumnsTemplate4 from "@/components/slides/template4/Slide8Columns";
import Slide9Template4 from "@/components/slides/template4/Slide9";
import Slide10ColumnsTemplate4 from "@/components/slides/template4/Slide10Columns";
import TypewriterText from "@/components/ui/TypewriterText";
import AnimatedSlide from "@/components/ui/AnimatedSlide";

// Template mapping: maps template IDs to their template folder names
// First template (Corporate Elegant) -> template1
// Second template (Corporate Modern) -> template3
// Third template (Corporate Nature) -> template4
const TEMPLATE_MAP: Record<string, "template1" | "template2" | "template3" | "template4"> = {
  "0f9b9aac-267d-4c1c-9916-567a87bc5bc9": "template1", // Corporate Elegant
  "fffe0c7c-02ff-4a9e-ba7b-936381948f75": "template3", // Corporate Modern
  "56b48bd5-317b-47ec-963c-2ad23b753495": "template4", // Corporate Nature
};

export default function Generate() {
  const [topic, setTopic] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSlidePreview, setShowSlidePreview] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [outlineData, setOutlineData] = useState<{ [slideKey: string]: Record<string, unknown> } | null>(null);
  const [presentationId, setPresentationId] = useState<string>("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFontEditor, setShowFontEditor] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingTextElement, setEditingTextElement] = useState<{ slideKey: string; field: string; path: string[]; textContent?: TextContent; type?: string } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Fetch templates from API on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templateData = await getAllTemplate();
        if (templateData && Array.isArray(templateData)) {
          setTemplates(templateData);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
        // Fallback to default templates if API fails
        setTemplates([
          {
            id: "0f9b9aac-267d-4c1c-9916-567a87bc5bc9",
            name: "Corporate Elegant",
            createdAt: "2026-01-16T09:37:02.696Z",
          },
        ]);
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleGenerateOutline = async () => {
    if (!topic.trim() || !selectedTemplate) {
      alert("Please enter a topic and select a template");
      return;
    }

    // Show outline container immediately
    setShowOutline(true);
    setIsGenerating(true);
    setIsDataLoaded(false);
    setOutlineData({}); // Initialize with empty object to show container
    let accumulatedData = "";

    try {
      // Call the API to generate PPT outline with streaming support
      await generatePPTOutline(
        {
          topic,
          template_id: selectedTemplate,
          user_id: UNIVERSAL_USER_ID,
        },
        // onChunk callback - called for each chunk of data
        (chunk: string) => {
          accumulatedData += chunk;
          console.log("Received outline chunk:", chunk.substring(0, 100));
          
          // Try to extract presentation ID from accumulated data as it streams
          const presentationIdMatch = accumulatedData.match(
            /"presentation_id"\s*:\s*"([^"]+)"/
          );
          if (presentationIdMatch && !presentationId) {
            setPresentationId(presentationIdMatch[1]);
          }

          // Function to extract and update slides from JSON string
          const extractAndUpdateSlides = (jsonStr: string) => {
            try {
              // Try to parse as complete JSON first
              const parsed = JSON.parse(jsonStr);
              const slides = parsed.slides || parsed;
              
              if (slides && typeof slides === 'object' && !Array.isArray(slides)) {
                // We have complete slides object
                const slidesObj: { [slideKey: string]: Record<string, unknown> } = {};
                Object.keys(slides).forEach((key) => {
                  if (slides[key] && typeof slides[key] === 'object') {
                    slidesObj[key] = slides[key] as Record<string, unknown>;
                  }
                });
                
                if (Object.keys(slidesObj).length > 0) {
                  setOutlineData(slidesObj);
                  setIsDataLoaded(true);
                  setIsGenerating(false);
                  return true;
                }
              }
            } catch {
              // JSON is incomplete, try to extract individual slides
              try {
                // Find slide entries: "00": {...}, "01": {...}
                // Match pattern: "XX": { ... } where XX is two digits
                const slideRegex = /"(\d{2})"\s*:\s*(\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})/g;
                const matches = Array.from(jsonStr.matchAll(slideRegex));
                
                if (matches.length > 0) {
                  const partialOutline: { [key: string]: Record<string, unknown> } = {};
                  
                  matches.forEach((match) => {
                    try {
                      const slideKey = match[1];
                      const slideJsonStr = match[2];
                      // Try to parse individual slide
                      const slideData = JSON.parse(slideJsonStr);
                      partialOutline[slideKey] = slideData as Record<string, unknown>;
                    } catch {
                      // Skip invalid slide entries
                    }
                  });
                  
                  if (Object.keys(partialOutline).length > 0) {
                    setOutlineData((prev) => {
                      const updated = prev ? { ...prev } : {};
                      Object.keys(partialOutline).forEach((key) => {
                        updated[key] = partialOutline[key];
                      });
                      return updated as { [slideKey: string]: Record<string, unknown> };
                    });
                    setIsDataLoaded(true);
                    setIsGenerating(false);
                    return true;
                  }
                }
              } catch {
                // Continue waiting for more data
              }
            }
            return false;
          };

          // Try to parse and extract slides incrementally
          try {
            // Check for markdown code blocks first
            const jsonBlockStart = accumulatedData.indexOf("```json");
            if (jsonBlockStart !== -1) {
              const afterJsonStart = accumulatedData.substring(jsonBlockStart + 7);
              const jsonBlockEnd = afterJsonStart.indexOf("\n```");
              
              if (jsonBlockEnd !== -1) {
                // Complete JSON block
                const jsonContent = afterJsonStart.substring(0, jsonBlockEnd).trim();
                extractAndUpdateSlides(jsonContent);
              } else {
                // Partial JSON block - try to extract what we can
                const jsonContent = afterJsonStart.trim();
                if (jsonContent.length > 10) { // Only try if we have substantial content
                  extractAndUpdateSlides(jsonContent);
                }
              }
            } else {
              // Try direct JSON parsing
              const jsonStart = accumulatedData.indexOf("{");
              if (jsonStart !== -1) {
                const jsonContent = accumulatedData.substring(jsonStart).trim();
                if (jsonContent.length > 10) {
                  extractAndUpdateSlides(jsonContent);
                }
              }
            }
          } catch {
            // Continue processing as more chunks arrive
            console.log("Waiting for more data chunks...");
          }
        },
        // onComplete callback - called when streaming is complete
        (fullData: string) => {
          console.log("PPT Outline generation complete:", fullData);

          // Extract outline data and presentation ID from complete response
          if (fullData) {
            // Parse the JSON response to extract outline
            const jsonMatch = fullData.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch) {
              const jsonString = jsonMatch[1];
              try {
                const parsed = JSON.parse(jsonString);
                const outline = parsed.slides || parsed;
                setOutlineData(outline);
                setIsDataLoaded(true);
              } catch (e) {
                console.error("Failed to parse outline JSON:", e);
              }
            } else {
              // Try direct JSON parse
              try {
                const parsed = JSON.parse(fullData);
                const outline = parsed.slides || parsed;
                setOutlineData(outline);
                setIsDataLoaded(true);
              } catch (e) {
                console.error("Failed to parse outline JSON:", e);
              }
            }

            // Extract presentation ID
            const presentationIdMatch = fullData.match(
              /"presentation_id"\s*:\s*"([^"]+)"/
            );
            if (presentationIdMatch) {
              setPresentationId(presentationIdMatch[1]);
            }
          }

          setIsGenerating(false);
        }
      );
    } catch (error) {
      console.error("Failed to generate outline:", error);
      setIsGenerating(false);
      alert("Failed to generate outline. Please try again.");
    }
  };

  const handleGeneratePPT = async () => {
    if (!presentationId) {
      alert("No presentation ID available");
      return;
    }

    // Show slide preview immediately - no loading screen
    setShowOutline(false);
    setShowSlidePreview(true);
    setCurrentSlide(0);
    setIsGenerating(false); // Don't show generating state
    setIsDataLoaded(false);

    try {
      // Call the API to generate PPT content with streaming support
      await generatePPTContent(
        presentationId,
        // onChunk callback - called for each chunk of data
        (chunk: string, partialData?: Presentation | { presentation: Presentation }) => {
          console.log("Received content chunk:", chunk.substring(0, 100));
          
          // If we have parsed partial data, update the UI incrementally
          if (partialData) {
            // Extract presentation object if nested
            let presentationData: Presentation = partialData as Presentation;
            if ('presentation' in partialData && partialData.presentation) {
              presentationData = partialData.presentation;
            }

            // Update outline data as it streams in - this will update slides live
            if (presentationData?.slides) {
              setOutlineData(presentationData.slides as unknown as { [slideKey: string]: Record<string, unknown> });
              setIsDataLoaded(true);
              setIsGenerating(false); // Ensure generating state is off
            }
          }
        },
        // onComplete callback - called when streaming is complete
        async (fullData: Presentation | { presentation: Presentation }) => {
          console.log("PPT Content generation complete:", fullData);

          let presentationData: Presentation = fullData as Presentation;

          // Extract the presentation object from the nested structure
          if ('presentation' in fullData && fullData.presentation) {
            presentationData = fullData.presentation;
          }

          if (presentationData && presentationData.slides) {
            // Process outline with images using actual API data
            console.log("Generating images for slides...");
            console.log("Presentation data structure:", {
              hasSlides: !!presentationData.slides,
              slideKeys: Object.keys(presentationData.slides || {}),
              firstSlide: presentationData.slides[Object.keys(presentationData.slides)[0]]
            });
            
            try {
              const processedPresentation = await processOutlineWithImages(
                presentationData
              );

              // Update outline data with processed presentation
              const processedSlides = processedPresentation.slides as unknown as { [slideKey: string]: Record<string, unknown> };
              setOutlineData(processedSlides);
              setIsDataLoaded(true);
              setIsGenerating(false);
              console.log("✓ Images processed successfully");

              // Collect all image URLs from processed slides
              const imageUrls = getAllImageUrls(processedSlides);
              
              if (imageUrls.length > 0) {
                // Wait for all images to load in the browser
                await waitForImagesToLoad(imageUrls);
                
                // Small delay to ensure DOM has updated with images
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Automatically call update API after images are loaded
                console.log("All images loaded, calling update API...");
                const updatedContent = {
                  presentation: {
                    metadata: {
                      date: { text: "2023-10-15" },
                      author: { text: "Dr. Emily Carter" },
                      company: { text: "Maritime History Institute" },
                    },
                    slides: processedSlides as unknown as Presentation['slides'],
                  },
                };

                try {
                  const response = await updateFontSize(presentationId, updatedContent);
                  console.log(`✓ Presentation updated successfully with ${imageUrls.length} images`);
                  
                  if (response?.downloadUrl) {
                    setDownloadUrl(response.downloadUrl);
                  }
                } catch (updateError) {
                  console.error("Failed to auto-update presentation:", updateError);
                  // Don't show alert, just log - user can manually save if needed
                }
              } else {
                console.warn("No images found to wait for");
              }
            } catch (imageError) {
              console.error("Error processing images:", imageError);
              // Still set the data even if images fail, so user can see the slides
              setOutlineData(presentationData.slides as unknown as { [slideKey: string]: Record<string, unknown> });
              setIsDataLoaded(true);
              setIsGenerating(false);
              alert("Presentation generated but some images may not have loaded. Check console for details.");
            }
          } else {
            console.error(
              "No slides found in presentation data:",
              presentationData
            );
            setIsGenerating(false);
          }
        }
      );
    } catch (error) {
      console.error("Failed to generate PPT:", error);
      setIsGenerating(false);
      alert("Failed to generate presentation. Please try again.");
    }
  };

  // Download PPT handler
  const handleDownloadPPT = async () => {
    // If we have a stored download URL, use it directly
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "presentation.pptx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Otherwise, fetch from API
    if (!presentationId) {
      alert("No presentation ID available");
      return;
    }

    setIsDownloading(true);
    try {
      const response = await downloadPPT(presentationId);
      if (response?.downloadUrl) {
        // Store the download URL for future use
        setDownloadUrl(response.downloadUrl);
        
        // Create a temporary link and trigger download
        const link = document.createElement("a");
        link.href = response.downloadUrl;
        link.download = "presentation.pptx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Failed to get download URL");
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download presentation");
    } finally {
      setIsDownloading(false);
    }
  };

  // Helper function to extract text from text content objects
  const getText = (content: string | { text: string; fontSize?: number; color?: string } | undefined | null): string => {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (typeof content === "object" && "text" in content) return content.text;
    return "";
  };

  // Helper function to safely get image URL from image data
  const getImageUrl = (imageData: unknown): string => {
    if (!imageData || typeof imageData !== "object") return "";
    if ('imageUrl' in imageData && typeof imageData.imageUrl === "string") {
      return imageData.imageUrl;
    }
    return "";
  };

  // Helper function to safely get a property from slide data
  const getSlideProperty = (slideData: Record<string, unknown>, property: string): unknown => {
    return slideData[property];
  };

  // Helper function to safely get text from slide data property
  const getSlideText = (slideIndex: number, property: string): string => {
    return getText(getSlideProperty(getCurrentSlideData(slideIndex) as Record<string, unknown>, property) as string | TextContent | undefined);
  };

  // Helper function to get TextContent object (or string) from slide data property
  const getSlideContent = (slideIndex: number, property: string): string | TextContent | undefined => {
    const content = getSlideProperty(getCurrentSlideData(slideIndex) as Record<string, unknown>, property);
    if (!content) return undefined;
    if (typeof content === "string") return content;
    if (typeof content === "object" && "text" in content) {
      const textContent = content as { text: string; fontSize?: number | null; color?: string | null };
      // Convert null to undefined for fontSize and color
      return {
        text: textContent.text,
        fontSize: textContent.fontSize ?? undefined,
        color: textContent.color ?? undefined
      } as TextContent;
    }
    return undefined;
  };

  // Helper function to get TextContent with string fontSize (for Slide1Template3)
  const getSlideContentStringFontSize = (slideIndex: number, property: string): string | { text: string; fontSize?: string; color?: string } | undefined => {
    const content = getSlideProperty(getCurrentSlideData(slideIndex) as Record<string, unknown>, property);
    if (!content) return undefined;
    if (typeof content === "string") return content;
    if (typeof content === "object" && "text" in content) {
      const textContent = content as { text: string; fontSize?: number | null; color?: string | null };
      return {
        text: textContent.text,
        fontSize: textContent.fontSize != null ? String(textContent.fontSize) : undefined,
        color: textContent.color ?? undefined
      };
    }
    return undefined;
  };

  // Helper function to normalize onTextUpdate callback for components that expect string fontSize (template3, some template1 slides)
  const createTextUpdateHandlerForStringFontSize = (
    slideKey: string,
    updateCallback: (slideKey: string, elementType: string, content: string | TextContent) => void
  ) => {
    return (elementType: string, updatedContent: { text: string; fontSize?: string; color?: string }) => {
      // Convert to TextContent format (with number fontSize)
      const normalizedContent: TextContent = {
        text: updatedContent.text,
        fontSize: updatedContent.fontSize ? parseInt(updatedContent.fontSize, 10) : undefined,
        color: updatedContent.color
      };
      updateCallback(slideKey, elementType, normalizedContent);
    };
  };

  // Helper function to normalize onTextUpdate callback for components that expect number fontSize (template1 Slide1, template2, template4)
  const createTextUpdateHandlerForNumberFontSize = (
    slideKey: string,
    updateCallback: (slideKey: string, elementType: string, content: string | TextContent) => void
  ) => {
    return (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => {
      // Convert to TextContent format
      const normalizedContent: TextContent = {
        text: updatedContent.text,
        fontSize: updatedContent.fontSize,
        color: updatedContent.color
      };
      updateCallback(slideKey, elementType, normalizedContent);
    };
  };

  // Helper function to create text update handler that accepts number fontSize (for template3 Slide2, Slide3, Slide4)
  // Note: InlineEditableText may output string fontSize, but components expect number, so we handle both
  const createTextUpdateHandlerForTemplate3 = (
    slideKey: string,
    updateCallback: (slideKey: string, elementType: string, content: string | TextContent) => void
  ): (elementType: string, updatedContent: { text: string; fontSize?: number; color?: string }) => void => {
    return (elementType: string, updatedContent: { text: string; fontSize?: number | string; color?: string }) => {
      // Convert to TextContent format (with number fontSize)
      const normalizedContent: TextContent = {
        text: updatedContent.text,
        fontSize: typeof updatedContent.fontSize === "string" 
          ? (updatedContent.fontSize ? parseInt(updatedContent.fontSize, 10) : undefined)
          : updatedContent.fontSize,
        color: updatedContent.color
      };
      updateCallback(slideKey, elementType, normalizedContent);
    };
  };

  // Helper function to get current slide data
  const getCurrentSlideData = (slideIndex: number) => {
    // For template3 and template4, slide keys are "01" to "10" instead of "00" to "09"
    const slideKey = (TEMPLATE_MAP[selectedTemplate] === "template3" || TEMPLATE_MAP[selectedTemplate] === "template4")
      ? (slideIndex + 1).toString().padStart(2, "0")
      : slideIndex.toString().padStart(2, "0");
    const slideData = outlineData?.[slideKey] || {};
    console.log(
      `Getting slide data for index ${slideIndex} (key: ${slideKey}):`,
      slideData
    );

    // Debug: Log image data specifically for Slide3
    if (slideIndex === 2) {
      const slideRecord = slideData as Record<string, unknown>;
      console.log("Slide3 image data:", {
        image1: (slideRecord.image1 as { imageUrl?: string })?.imageUrl,
        image2: (slideRecord.image2 as { imageUrl?: string })?.imageUrl,
        image3: (slideRecord.image3 as { imageUrl?: string })?.imageUrl,
      });
    }

    return slideData;
  };

  // Font editing functions
  const handleFontSizeChange = (newFontSize: string | number) => {
    if (!editingTextElement || !editingTextElement.type) return;

    const updatedSlideData = { ...outlineData };
    if (!updatedSlideData) return;
    
    const slideKey = currentSlide.toString().padStart(2, "0");
    const slide = updatedSlideData[slideKey];
    if (!slide) return;

    // Convert to number if string
    const fontSizeNumber = typeof newFontSize === "string" ? parseInt(newFontSize, 10) : newFontSize;

    // Update the specific text element with proper type checking
    const slideRecord = slide as Record<string, unknown>;
    if (editingTextElement.type === "title" && slideRecord.title) {
      slideRecord.title = updateTextFontSize(slideRecord.title as TextContent, fontSizeNumber);
    } else if (editingTextElement.type === "body" && slideRecord.body) {
      slideRecord.body = updateTextFontSize(slideRecord.body as TextContent, fontSizeNumber);
    } else if (editingTextElement.type === "intro" && slideRecord.intro) {
      slideRecord.intro = updateTextFontSize(slideRecord.intro as TextContent, fontSizeNumber);
    }

    setOutlineData(updatedSlideData);
    // Mark as having unsaved changes
    setHasUnsavedChanges(true);
  };

  const handleColorChange = (newColor: string) => {
    if (!editingTextElement || !editingTextElement.type) return;

    const updatedSlideData = { ...outlineData };
    if (!updatedSlideData) return;
    
    const slideKey = currentSlide.toString().padStart(2, "0");
    const slide = updatedSlideData[slideKey];
    if (!slide) return;

    // Update the specific text element with proper type checking
    const slideRecord = slide as Record<string, unknown>;
    if (editingTextElement.type === "title" && slideRecord.title) {
      slideRecord.title = updateTextColor(slideRecord.title as TextContent, newColor);
    } else if (editingTextElement.type === "body" && slideRecord.body) {
      slideRecord.body = updateTextColor(slideRecord.body as TextContent, newColor);
    } else if (editingTextElement.type === "intro" && slideRecord.intro) {
      slideRecord.intro = updateTextColor(slideRecord.intro as TextContent, newColor);
    }

    setOutlineData(updatedSlideData);
    // Mark as having unsaved changes
    setHasUnsavedChanges(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openFontEditor = (_type: string, _textContent: TextContent) => {
    // Function kept for potential future use
    // setEditingTextElement({ slideKey: "", field: _type, path: [], textContent: _textContent, type: _type });
    // setShowFontEditor(true);
  };

  // Helper function to collect all image URLs from outlineData
  const getAllImageUrls = (data: { [slideKey: string]: Record<string, unknown> }): string[] => {
    const imageUrls: string[] = [];
    
    Object.entries(data).forEach(([slideKey, slide]) => {
      Object.entries(slide).forEach(([key, value]) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // Check if this is an image object with imageUrl
          if ('imageUrl' in value && typeof value.imageUrl === 'string' && value.imageUrl) {
            imageUrls.push(value.imageUrl);
            console.log(`Found image URL: slide ${slideKey}, key: ${key}`);
          }
        }
      });
    });
    
    console.log(`Total image URLs collected: ${imageUrls.length}`);
    return imageUrls;
  };

  // Function to wait for all images to load in the browser
  const waitForImagesToLoad = (imageUrls: string[]): Promise<void> => {
    return new Promise((resolve) => {
      if (imageUrls.length === 0) {
        console.log("No images to wait for");
        resolve();
        return;
      }

      console.log(`Waiting for ${imageUrls.length} images to load in browser...`);
      const loadedImages = new Set<string>();
      const failedImages = new Set<string>();
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        console.warn(`Timeout waiting for images. Loaded: ${loadedImages.size}/${imageUrls.length}`);
        resolve(); // Resolve anyway to not block the update
      }, 30000);

      const checkComplete = () => {
        if (loadedImages.size + failedImages.size === imageUrls.length) {
          clearTimeout(timeoutId);
          if (failedImages.size > 0) {
            console.warn(`Failed to load ${failedImages.size} images:`, Array.from(failedImages));
          }
          console.log(`✓ ${loadedImages.size} images loaded successfully in browser`);
          resolve();
        }
      };

      imageUrls.forEach((url) => {
        const img = new Image();
        
        img.onload = () => {
          loadedImages.add(url);
          console.log(`✓ Image loaded: ${url.substring(0, 50)}...`);
          checkComplete();
        };
        
        img.onerror = () => {
          failedImages.add(url);
          console.warn(`✗ Failed to load image: ${url.substring(0, 50)}...`);
          checkComplete();
        };
        
        img.src = url;
      });
    });
  };

  // Save updated presentation to API
  const saveUpdatedPresentation = async () => {
    if (!presentationId || !outlineData) return;

    try {
      const updatedContent = {
        presentation: {
          metadata: {
            date: { text: "2023-10-15" },
            author: { text: "Dr. Emily Carter" },
            company: { text: "Maritime History Institute" },
          },
          slides: outlineData as unknown as Presentation['slides'],
        },
      };

      const response = await updateFontSize(presentationId, updatedContent);
      console.log("Presentation updated successfully");
      
      // Store the download URL from the response
      if (response?.downloadUrl) {
        setDownloadUrl(response.downloadUrl);
      }
      
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to update presentation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-all duration-300 hover:scale-105 group"
        >
          <svg
            className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-slide-up">
              Generate Your Presentation
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-slide-up animation-delay-200">
              Transform your ideas into stunning presentations with AI-powered
              content generation
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-up animation-delay-400">
            <div className="mb-8">
              <label
                htmlFor="topic"
                className="text-lg font-semibold text-gray-900 mb-3 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
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
                Presentation Topic
              </label>
              <div className="relative">
                <textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your presentation topic here..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-32 text-gray-700 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {topic.length}/500 characters
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                Choose Template
              </label>
              {loadingTemplates ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600 animate-pulse">
                    Loading amazing templates...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template, index) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`group relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-xl ring-2 ring-blue-200"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            selectedTemplate === template.id
                              ? "bg-blue-500 border-blue-500 scale-110 shadow-lg"
                              : "border-gray-300 bg-white group-hover:border-blue-400 group-hover:bg-blue-50"
                          }`}
                        >
                          {selectedTemplate === template.id && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pr-8">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          selectedTemplate === template.id
                            ? "bg-linear-to-br from-blue-500 to-purple-600 shadow-lg"
                            : "bg-linear-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200"
                        }`}>
                          <svg
                            className={`w-7 h-7 ${
                              selectedTemplate === template.id
                                ? "text-white"
                                : "text-blue-600"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg mb-2 ${
                            selectedTemplate === template.id
                              ? "text-blue-700"
                              : "text-gray-900"
                          }`}>
                            {template.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <svg
                              className="w-4 h-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Professional Design</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setShowSlidePreview(true)}
                disabled={!selectedTemplate}
                className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-base transform hover:scale-105 min-w-[200px] ${
                  !selectedTemplate
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 shadow-lg hover:shadow-xl border border-slate-300"
                }`}
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Preview Templates
                </span>
              </button>

              <button
                onClick={handleGenerateOutline}
                disabled={isGenerating || !selectedTemplate || !topic.trim()}
                className={`group relative px-10 py-4 rounded-xl font-semibold transition-all duration-300 text-base transform hover:scale-105 min-w-[200px] ${
                  isGenerating || !selectedTemplate || !topic.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                }`}
              >
                <span className="flex items-center justify-center">
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Generate Outline
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Screen - Only show for PPT content generation, not outline */}
      {isGenerating && !showOutline && (
        <div className="fixed inset-0 bg-linear-to-br from-blue-600 to-indigo-800 z-50 flex items-center justify-center overflow-hidden">
          {/* Animated Slides Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `slide-left ${3 + index * 0.5}s linear infinite`,
                    animationDelay: `${index * 0.8}s`,
                    opacity: 0.1 + index * 0.05,
                    left: `${50 + index * 15}%`,
                  }}
                >
                  <div className="w-48 h-32 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-2xl">
                    <div className="p-4">
                      <div className="h-3 bg-white/20 rounded mb-2"></div>
                      <div className="h-2 bg-white/10 rounded mb-1 w-3/4"></div>
                      <div className="h-2 bg-white/10 rounded mb-1 w-1/2"></div>
                      <div className="h-2 bg-white/10 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center text-white">
            <div className="mb-8">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                <svg
                  className="relative animate-spin h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-4 animate-slide-up">
              {showOutline ? "Generating Images" : "Generating Your Outline"}
            </h2>
            <p className="text-xl mb-8 animate-slide-up animation-delay-200">
              {showOutline
                ? "Finding the perfect images for your slides..."
                : "Please wait while we create your presentation outline..."}
            </p>

            {/* Progress Bar with Slide Animation */}
            <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm animate-slide-up animation-delay-400">
              <div className="relative h-full">
                <div
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-full"
                  style={{
                    animation: `slide-progress ${
                      showOutline ? "3s" : "10s"
                    } ease-out forwards`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-white/60 rounded-full"
                        style={{
                          animation: `pulse-dot 1.5s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Status Messages */}
            <div className="mt-8 space-y-2">
              {showOutline ? (
                <>
                  <div className="text-sm text-white/70 animate-fade-in animation-delay-600">
                    📸 Searching for relevant images...
                  </div>
                  <div className="text-sm text-white/50 animate-fade-in animation-delay-1000">
                    🎨 Matching images to slide content...
                  </div>
                  <div className="text-sm text-white/30 animate-fade-in animation-delay-1400">
                    ✨ Adding professional visuals to your presentation...
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-white/70 animate-fade-in animation-delay-600">
                    Analyzing your topic...
                  </div>
                  <div className="text-sm text-white/50 animate-fade-in animation-delay-1000">
                    Creating presentation structure...
                  </div>
                  <div className="text-sm text-white/30 animate-fade-in animation-delay-1400">
                    Generating content for each slide...
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Outline Display Modal - Show immediately when generation starts */}
      {showOutline && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden transform animate-scale-in">
            {/* Close button */}
            <button
              onClick={() => {
                setShowOutline(false);
                setOutlineData(null);
                setPresentationId("");
              }}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              title="Close"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 md:p-8 relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 animate-pulse animation-delay-2000"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold">Presentation Outline</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-100">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="font-medium">Topic: {topic}</span>
                  </div>
                  {presentationId && (
                    <div className="flex items-center gap-2 text-blue-100/80 text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      <span className="font-mono text-xs">
                        ID: {presentationId.slice(0, 8)}...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Outline Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-280px)] custom-scrollbar">
              {isGenerating && (!outlineData || Object.keys(outlineData).length === 0) && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl animate-pulse"></div>
                    <svg
                      className="relative animate-spin h-12 w-12 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium animate-pulse">
                    Generating outline...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Content will appear as it&apos;s generated
                  </p>
                </div>
              )}
              <div className="space-y-4">
                {outlineData && Object.keys(outlineData).length > 0 &&
                  Object.entries(outlineData)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(
                    ([slideNumber, slide]: [string, Record<string, unknown>], index: number) => (
                      <AnimatedSlide
                        key={slideNumber}
                        slideIndex={index}
                        delay={index * 150}
                        className="group relative bg-linear-to-r from-white to-gray-50 border-l-4 border-blue-500 pl-6 pr-4 py-5 rounded-r-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-x-1 hover:scale-[1.01]"
                      >
                        {/* Slide number badge */}
                        <div className="flex items-start gap-4">
                          <div className="shrink-0">
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              {parseInt(slideNumber) + 1}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                              <TypewriterText
                                text={(() => {
                                  const title = slide.title;
                                  if (typeof title === "string") return title;
                                  if (title && typeof title === "object" && 'text' in title) {
                                    return (title as TextContent).text || "Untitled";
                                  }
                                  return "Untitled";
                                })()}
                                speed={20}
                                startDelay={index * 150}
                                showCursor={false}
                              />
                            </h3>
                            {slide.body && (typeof slide.body === "string" || (typeof slide.body === "object" && slide.body !== null && 'text' in slide.body)) ? (
                              <p className="text-gray-600 mb-3 leading-relaxed">
                                <TypewriterText
                                  text={(() => {
                                    const body = slide.body;
                                    if (typeof body === "string") return body;
                                    if (body && typeof body === "object" && 'text' in body) {
                                      return (body as TextContent).text || "";
                                    }
                                    return "";
                                  })()}
                                  speed={15}
                                  startDelay={index * 150 + 500}
                                  showCursor={false}
                                />
                              </p>
                            ) : null}
                            {slide.points && Array.isArray(slide.points) ? (
                              <ul className="space-y-2.5">
                                {(slide.points as Array<string | TextContent>).map(
                                  (point: string | TextContent, pointIndex: number) => {
                                    const pointText = typeof point === "string" ? point : (point?.text || "");
                                    return (
                                      <li
                                        key={pointIndex}
                                        className="flex items-start gap-3 group/item"
                                      >
                                        <span className="shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full group-hover/item:bg-blue-600 transition-colors duration-300"></span>
                                        <span className="text-gray-700 leading-relaxed">
                                          <TypewriterText
                                            text={pointText}
                                            speed={15}
                                            startDelay={index * 150 + 800 + pointIndex * 200}
                                            showCursor={false}
                                          />
                                        </span>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                        {/* Hover effect line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </AnimatedSlide>
                    )
                  )}
                {isGenerating && outlineData && Object.keys(outlineData).length > 0 && (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-2 text-blue-600">
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium">Generating more slides...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-linear-to-r from-gray-50 to-gray-100 px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowOutline(false);
                  setOutlineData(null);
                  setPresentationId("");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back to Edit</span>
              </button>
              <button
                onClick={handleGeneratePPT}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Generate Full PPT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide Preview Modal - Carousel */}
      {showSlidePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8">
          <div className="relative w-full max-w-6xl h-[85vh]">
            {/* Top Action Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-4">
              {/* Download button - only show when data is completely loaded */}
              {isDataLoaded && (
                <button
                  onClick={handleDownloadPPT}
                  disabled={isDownloading}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isDownloading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-linear-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-xl"
                  }`}
                  title="Download PPT"
                >
                  {isDownloading ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Download</span>
                    </>
                  )}
                </button>
              )}

              {/* Right side buttons */}
              <div className="flex items-center gap-3">
                {/* Save Changes button - only show when there are unsaved changes */}
                {hasUnsavedChanges && (
                  <button
                    onClick={saveUpdatedPresentation}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    title="Save Changes"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Save Changes</span>
                  </button>
                )}

                {/* Close button */}
                <button
                  onClick={() => setShowSlidePreview(false)}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                  title="Close"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={() =>
                setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0)
              }
              disabled={currentSlide === 0}
              className={`absolute -left-16 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 ${
                currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white"
              }`}
              title="Previous Slide"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentSlide(currentSlide < 9 ? currentSlide + 1 : 9)
              }
              disabled={currentSlide === 9}
              className={`absolute -right-16 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 ${
                currentSlide === 9
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white"
              }`}
              title="Next Slide"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Carousel container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Slide 1 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide1Template2
                      title={getText(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'title') as string | TextContent | undefined)}
                      subtitle={getText(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'body') as string | TextContent | undefined)}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'image'))}
                      onTextUpdate={createTextUpdateHandlerForNumberFontSize("00", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "subtitle") {
                          slide.body = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide1Template3
                      title={getSlideContentStringFontSize(0, 'title')}
                      description={getSlideContentStringFontSize(0, 'subtitle')}
                      onTextUpdate={(elementType: string, updatedContent: { text: string; fontSize?: string; color?: string }) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slideKey = "01";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;
                        // Convert to TextContent format (with number fontSize)
                        const normalizedContent: TextContent = {
                          text: updatedContent.text,
                          fontSize: updatedContent.fontSize ? parseInt(updatedContent.fontSize, 10) : undefined,
                          color: updatedContent.color
                        };
                        if (elementType === "title") {
                          slide.title = normalizedContent;
                        } else if (elementType === "description") {
                          slide.subtitle = normalizedContent;
                        }
                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide1Template4
                      title={getText(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'title') as string | TextContent | undefined) || topic || "Presentation Title"}
                      tagline={getText(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'tagline') as string | TextContent | undefined) || "short description"}
                      contact={getText(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'contact') as string | TextContent | undefined) || "contact: name@email.com"}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'image'))}
                      onTextUpdate={createTextUpdateHandlerForNumberFontSize("01", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "tagline") {
                          slide.tagline = updatedContent;
                        } else if (elementType === "contact") {
                          slide.contact = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide1
                      title={getText(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'title') as string | TextContent | undefined) || topic || "Slide Title"}
                      subtitle={getText(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'body') as string | TextContent | undefined) || ""}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(0) as Record<string, unknown>, 'image'))}
                      onTextUpdate={createTextUpdateHandlerForNumberFontSize("00", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "subtitle") {
                          slide.body = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 2 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide2Template2
                      tagline={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'tagline') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'title') as string | TextContent | undefined)}
                      title={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'title') as string | TextContent | undefined)}
                      description={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'bodyLeft') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'body') as string | TextContent | undefined)}
                      contentTitle={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'rightTitle') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'title') as string | TextContent | undefined)}
                      contentDescription={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'bodyRight') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'body') as string | TextContent | undefined)}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'image'))}
                      onTextUpdate={createTextUpdateHandlerForNumberFontSize("01", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "tagline") {
                          slide.tagline = updatedContent;
                        } else if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "description") {
                          slide.bodyLeft = updatedContent;
                        } else if (elementType === "contentTitle") {
                          slide.rightTitle = updatedContent;
                        } else if (elementType === "contentDescription") {
                          slide.bodyRight = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide2Template3
                      headerText={getSlideContent(1, 'headerText')}
                      col1Title={getSlideContent(1, 'col1Title')}
                      col1Desc={getSlideContent(1, 'col1Desc')}
                      col2Title={getSlideContent(1, 'col2Title')}
                      col2Desc={getSlideContent(1, 'col2Desc')}
                      col3Title={getSlideContent(1, 'col3Title')}
                      col3Desc={getSlideContent(1, 'col3Desc')}
                      col4Title={getSlideContent(1, 'col4Title')}
                      col4Desc={getSlideContent(1, 'col4Desc')}
                      col1Image={getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'col1Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      col2Image={getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'col2Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      col3Image={getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'col3Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      col4Image={getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'col4Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      onTextUpdate={createTextUpdateHandlerForTemplate3("02", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "headerText") {
                          slide.headerText = updatedContent;
                        } else if (elementType.includes("Title")) {
                          const colKey = elementType.replace("Title", "");
                          slide[`${colKey}Title`] = updatedContent;
                        } else if (elementType.includes("Desc")) {
                          const colKey = elementType.replace("Desc", "");
                          slide[`${colKey}Desc`] = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide2Template4
                      title={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'title') as string | TextContent | undefined) || "Introduction"}
                      body={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'body') as string | TextContent | undefined)}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "01";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "body") {
                          slide.body = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide2
                      title={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'title') as string | TextContent | undefined) || "Slide Title"}
                      desc={getText(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'body') as string | TextContent | undefined) || ""}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(1) as Record<string, unknown>, 'image'))}
                      onTextUpdate={createTextUpdateHandlerForStringFontSize("01", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "desc") {
                          slide.body = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 3 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide3Template2
                      title={getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'title') as string | TextContent | undefined)}
                      description={getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'subtitle') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'body') as string | TextContent | undefined)}
                      items={[
                        getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'item1') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'bullet1') as string | TextContent | undefined) || "",
                        getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'item2') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'bullet2') as string | TextContent | undefined) || "",
                        getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'item3') as string | TextContent | undefined) || getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'bullet3') as string | TextContent | undefined) || "",
                        getText(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'item4') as string | TextContent | undefined) || "",
                      ]}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "02";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "description") {
                          slide.subtitle = updatedContent;
                        } else if (elementType.startsWith("item")) {
                          const itemIndex = parseInt(elementType.replace("item", ""));
                          slide[`item${itemIndex}`] = typeof updatedContent === "string" ? updatedContent : updatedContent.text;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide3Template3
                      leftHeader={getSlideContent(2, 'leftHeader')}
                      leftBody={getSlideContent(2, 'leftBody')}
                      title={getSlideContent(2, 'title')}
                      image={getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'rightImage') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      onTextUpdate={createTextUpdateHandlerForTemplate3("03", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "leftHeader") {
                          slide.leftHeader = updatedContent;
                        } else if (elementType === "leftBody") {
                          slide.leftBody = updatedContent;
                        } else if (elementType === "title") {
                          slide.title = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide3Template4
                      title={getSlideText(2, 'title') || "Table Of Contents"}
                      items={[
                        getSlideText(2, 'bullet1') || "1. The first point",
                        getSlideText(2, 'bullet2') || "2. The first second point",
                        getSlideText(2, 'bullet3') || "3. The third one",
                        getSlideText(2, 'bullet4') || "4. And so on",
                      ]}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "02";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType.startsWith("item")) {
                          const itemIndex = parseInt(elementType.replace("item", ""));
                          slide[`bullet${itemIndex + 1}`] = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide3
                      columns={[
                        {
                          title: (() => {
                            const col1 = getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'column1');
                            if (col1 && typeof col1 === 'object' && 'title' in col1) {
                              return getText(col1.title as string | TextContent | undefined);
                            }
                            return "";
                          })(),
                          desc: (() => {
                            const col1 = getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'column1');
                            if (col1 && typeof col1 === 'object' && 'desc' in col1) {
                              return getText(col1.desc as string | TextContent | undefined);
                            }
                            return "";
                          })(),
                          imageLink: getImageUrl(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'image1')),
                        },
                        {
                          title: (() => {
                            const col2 = getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'column2');
                            if (col2 && typeof col2 === 'object' && 'title' in col2) {
                              return getText(col2.title as string | TextContent | undefined);
                            }
                            return "";
                          })(),
                          desc: (() => {
                            const col2 = getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'column2');
                            if (col2 && typeof col2 === 'object' && 'desc' in col2) {
                              return getText(col2.desc as string | TextContent | undefined);
                            }
                            return "";
                          })(),
                          imageLink: getImageUrl(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'image2')),
                        },
                        {
                          title: (() => {
                            const col3 = getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'column3');
                            if (col3 && typeof col3 === 'object' && 'title' in col3) {
                              return getText(col3.title as string | TextContent | undefined);
                            }
                            return "";
                          })(),
                          desc: (() => {
                            const col3 = getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'column3');
                            if (col3 && typeof col3 === 'object' && 'desc' in col3) {
                              return getText(col3.desc as string | TextContent | undefined);
                            }
                            return "";
                          })(),
                          imageLink: getImageUrl(getSlideProperty(getCurrentSlideData(2) as Record<string, unknown>, 'image3')),
                        },
                      ]}
                      onTextUpdate={(
                        columnIndex,
                        elementType,
                        updatedContent
                      ) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slideKey = "02";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          if (columnIndex === 0)
                            slide.column1 = {
                              ...(slide.column1 && typeof slide.column1 === 'object' ? slide.column1 as Record<string, unknown> : {}),
                              title: updatedContent,
                            };
                          else if (columnIndex === 1)
                            slide.column2 = {
                              ...(slide.column2 && typeof slide.column2 === 'object' ? slide.column2 as Record<string, unknown> : {}),
                              title: updatedContent,
                            };
                          else if (columnIndex === 2)
                            slide.column3 = {
                              ...(slide.column3 && typeof slide.column3 === 'object' ? slide.column3 as Record<string, unknown> : {}),
                              title: updatedContent,
                            };
                        } else if (elementType === "desc") {
                          if (columnIndex === 0)
                            slide.column1 = {
                              ...(slide.column1 && typeof slide.column1 === 'object' ? slide.column1 as Record<string, unknown> : {}),
                              desc: updatedContent,
                            };
                          else if (columnIndex === 1)
                            slide.column2 = {
                              ...(slide.column2 && typeof slide.column2 === 'object' ? slide.column2 as Record<string, unknown> : {}),
                              desc: updatedContent,
                            };
                          else if (columnIndex === 2)
                            slide.column3 = {
                              ...(slide.column3 && typeof slide.column3 === 'object' ? slide.column3 as Record<string, unknown> : {}),
                              desc: updatedContent,
                            };
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 4 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide4Template2
                      title={getText(getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'title') as string | TextContent | undefined)}
                      description={getSlideText(3, 'topText') || getSlideText(3, 'body')}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'image'))}
                      description2={getSlideText(3, 'bodyRight') || getSlideText(3, 'body')}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "03";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "description") {
                          slide.topText = updatedContent;
                        } else if (elementType === "description2") {
                          slide.bodyRight = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide4Template3
                      title={getSlideContent(3, 'title')}
                      subtitle={getSlideContent(3, 'subtitle')}
                      col1Title={getSlideContent(3, 'col1Title')}
                      col1Desc={getSlideContent(3, 'col1Desc')}
                      col2Title={getSlideContent(3, 'col2Title')}
                      col2Desc={getSlideContent(3, 'col2Desc')}
                      col3Title={getSlideContent(3, 'col3Title')}
                      col3Desc={getSlideContent(3, 'col3Desc')}
                      col4Title={getSlideContent(3, 'col4Title')}
                      col4Desc={getSlideContent(3, 'col4Desc')}
                      col1Image={getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'col1Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      col2Image={getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'col2Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      col3Image={getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'col3Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      col4Image={getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'col4Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      onTextUpdate={createTextUpdateHandlerForTemplate3("04", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "subtitle") {
                          slide.subtitle = updatedContent;
                        } else if (elementType.includes("Title")) {
                          const colKey = elementType.replace("Title", "");
                          slide[`${colKey}Title`] = updatedContent;
                        } else if (elementType.includes("Desc")) {
                          const colKey = elementType.replace("Desc", "");
                          slide[`${colKey}Desc`] = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide4Template4
                      title={getSlideText(3, 'title') || "Title & Text"}
                      body={getSlideText(3, 'body')}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "03";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "body") {
                          slide.body = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide4
                      description={getText(getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'body') as string | TextContent | undefined) || ""}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(3) as Record<string, unknown>, 'image'))}
                      onTextUpdate={createTextUpdateHandlerForStringFontSize("03", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        const currentSlideKey = "03";
                        const slide = updatedSlideData[currentSlideKey] ? { ...(updatedSlideData[currentSlideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;
                        if (elementType === "description") {
                          slide.body = updatedContent;
                        }
                        updatedSlideData[currentSlideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 5 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide5Template2
                      title={getSlideText(4, 'title')}
                      sampleText={getSlideText(4, 'subtitle') || getSlideText(4, 'intro')}
                      description={getSlideText(4, 'body')}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'image'))}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "04";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "sampleText") {
                          slide.subtitle = updatedContent;
                        } else if (elementType === "description") {
                          slide.body = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide5Template3
                      title={getSlideText(4, 'title')}
                      subtitle={getSlideText(4, 'subtitle')}
                      bar1Title={getSlideText(4, 'bar1Title')}
                      bar1Value={getSlideText(4, 'bar1Value')}
                      bar2Title={getSlideText(4, 'bar2Title')}
                      bar2Value={getSlideText(4, 'bar2Value')}
                      bar3Title={getSlideText(4, 'bar3Title')}
                      bar3Value={getSlideText(4, 'bar3Value')}
                      item1Title={getSlideText(4, 'item1Title')}
                      item1Desc={getSlideText(4, 'item1Desc')}
                      item2Title={getSlideText(4, 'item2Title')}
                      item2Desc={getSlideText(4, 'item2Desc')}
                      item3Title={getSlideText(4, 'item3Title')}
                      item3Desc={getSlideText(4, 'item3Desc')}
                      item4Title={getSlideText(4, 'item4Title')}
                      item4Desc={getSlideText(4, 'item4Desc')}
                      imageLink1={getImageUrl(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'image1'))}
                      imageLink2={getImageUrl(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'image2'))}
                      imageLink3={getImageUrl(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'image3'))}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide5BodyTemplate4
                      title={getSlideText(4, 'title') || "Title"}
                      body1={getSlideText(4, 'body1')}
                      body2={getSlideText(4, 'body2')}
                      body3={getSlideText(4, 'body3')}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "05";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "body1") {
                          slide.body1 = updatedContent;
                        } else if (elementType === "body2") {
                          slide.body2 = updatedContent;
                        } else if (elementType === "body3") {
                          slide.body3 = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide5
                      title={getText(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'title') as string | TextContent | undefined) || ""}
                      intro={
                        getText(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'intro') as string | TextContent | undefined) ||
                        getText(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'body') as string | TextContent | undefined) ||
                        ""
                      }
                      bullets={(() => {
                        const slideData = getCurrentSlideData(4) as Record<string, unknown>;
                        console.log("Slide5 data:", slideData);
                        // Extract bullets from bullet1, bullet2, bullet3 format
                        const bullets: string[] = [];
                        for (let i = 1; i <= 10; i++) {
                          const bulletKey = `bullet${i}`;
                          const bulletData = slideData[bulletKey];
                          if (bulletData) {
                            if (typeof bulletData === "string") {
                              bullets.push(bulletData);
                            } else if (bulletData && typeof bulletData === "object" && 'text' in bulletData) {
                              bullets.push((bulletData as TextContent).text);
                            }
                          }
                        }
                        // Fallback to other formats if no bullets found
                        if (bullets.length === 0) {
                          const bodyData = slideData.body;
                          if (bodyData && typeof bodyData === "string") {
                            const fallbackBullets = bodyData.split("\n").filter((b: string) => b.trim());
                            bullets.push(...fallbackBullets);
                          } else if (bodyData && typeof bodyData === "object" && 'text' in bodyData) {
                            const bodyText = (bodyData as TextContent).text;
                            if (bodyText) {
                              const fallbackBullets = bodyText.split("\n").filter((b: string) => b.trim());
                              bullets.push(...fallbackBullets);
                            }
                          }
                        }
                        console.log("Slide5 bullets:", bullets);
                        return bullets;
                      })()}
                      imageLink1={getImageUrl(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'image1'))}
                      imageLink2={getImageUrl(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'image2'))}
                      imageLink3={getImageUrl(getSlideProperty(getCurrentSlideData(4) as Record<string, unknown>, 'image3'))}
                      onTextUpdate={createTextUpdateHandlerForStringFontSize("04", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;
                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "intro") {
                          slide.intro = updatedContent;
                        }
                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 6 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide6Template2
                      title={getSlideText(5, 'title')}
                      description={getSlideText(5, 'body')}
                      numbersTitle="Key Statistics"
                      numberItems={[
                        getSlideText(5, 'stat1Title') && getSlideText(5, 'stat1Desc') 
                          ? `${getSlideText(5, 'stat1Title')}: ${getSlideText(5, 'stat1Desc')}`
                          : getSlideText(5, 'bullet1') || "",
                        getSlideText(5, 'stat2Title') && getSlideText(5, 'stat2Desc') 
                          ? `${getSlideText(5, 'stat2Title')}: ${getSlideText(5, 'stat2Desc')}`
                          : getSlideText(5, 'bullet2') || "",
                        getSlideText(5, 'stat3Title') && getSlideText(5, 'stat3Desc') 
                          ? `${getSlideText(5, 'stat3Title')}: ${getSlideText(5, 'stat3Desc')}`
                          : getSlideText(5, 'bullet3') || "",
                      ]}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'image'))}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide6Template3
                      companyName={getSlideText(5, 'companyName')}
                      tagline={getSlideText(5, 'tagline')}
                      col1Title={getSlideText(5, 'col1Title')}
                      col1Desc={getSlideText(5, 'col1Desc')}
                      col2Title={getSlideText(5, 'col2Title')}
                      col2Desc={getSlideText(5, 'col2Desc')}
                      col3Title={getSlideText(5, 'col3Title')}
                      col3Desc={getSlideText(5, 'col3Desc')}
                      col4Title={getSlideText(5, 'col4Title')}
                      col4Desc={getSlideText(5, 'col4Desc')}
                      image1={getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'col1Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image2={getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'col2Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image3={getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'col3Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image4={getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'col4Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide6Template4
                      title={getText(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'title') as string | TextContent | undefined) || "Title & Text"}
                      body={getText(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'body') as string | TextContent | undefined)}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "05";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "body") {
                          slide.body = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide6
                      title={getText(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'title') as string | TextContent | undefined) || ""}
                      desc={getText(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'body') as string | TextContent | undefined) || ""}
                      imageLink1={
                        getImageUrl(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'image1')) ||
                        getImageUrl(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'image')) ||
                        ""
                      }
                      imageLink2={getImageUrl(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'image2'))}
                      caption={getText(getSlideProperty(getCurrentSlideData(5) as Record<string, unknown>, 'caption') as string | TextContent | undefined)}
                      onTextUpdate={createTextUpdateHandlerForStringFontSize("05", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;
                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "desc") {
                          slide.body = updatedContent;
                        } else if (elementType === "caption") {
                          slide.caption = updatedContent;
                        }
                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 7 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide7Template2
                      tagline={getSlideText(6, 'tagline') || getSlideText(6, 'title')}
                      title={getSlideText(6, 'title')}
                      items={[
                        {
                          title: getSlideText(6, 'point1Title') || getSlideText(6, 'bullet1') || "",
                          description: getSlideText(6, 'point1Desc') || getSlideText(6, 'bullet1') || "",
                        },
                        {
                          title: getSlideText(6, 'point2Title') || getSlideText(6, 'bullet2') || "",
                          description: getSlideText(6, 'point2Desc') || getSlideText(6, 'bullet2') || "",
                        },
                        {
                          title: getSlideText(6, 'point3Title') || getSlideText(6, 'bullet3') || "",
                          description: getSlideText(6, 'point3Desc') || getSlideText(6, 'bullet3') || "",
                        },
                      ]}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide7Template3
                      title={getSlideText(6, 'title')}
                      subtitle={getSlideText(6, 'subtitle')}
                      stat1Title={getSlideText(6, 'stat1Title')}
                      stat1Value={getSlideText(6, 'stat1Value')}
                      stat2Title={getSlideText(6, 'stat2Title')}
                      stat2Value={getSlideText(6, 'stat2Value')}
                      stat3Title={getSlideText(6, 'stat3Title')}
                      stat3Value={getSlideText(6, 'stat3Value')}
                      stat1Image={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'stat1Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      stat2Image={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'stat2Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      stat3Image={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'stat3Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image1={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'image1') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image2={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'image2') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image3={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'image3') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image4={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'image4') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image5={getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'image5') as { imagePrompt?: string; imageUrl?: string } | undefined}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide7QuoteTemplate4
                      quote={getSlideText(6, 'quote') || "Quote text"}
                      author={getSlideText(6, 'author') || "Author Name"}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "07";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "quote") {
                          slide.quote = updatedContent;
                        } else if (elementType === "author") {
                          slide.author = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide7
                      title={getText(getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'title') as string | TextContent | undefined) || ""}
                      desc={getText(getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'body') as string | TextContent | undefined) || ""}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'image'))}
                      caption={getText(getSlideProperty(getCurrentSlideData(6) as Record<string, unknown>, 'caption') as string | TextContent | undefined)}
                      onTextUpdate={createTextUpdateHandlerForStringFontSize("06", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;
                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "desc") {
                          slide.body = updatedContent;
                        } else if (elementType === "caption") {
                          slide.caption = updatedContent;
                        }
                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 8 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide8Template2
                      mainText={getSlideText(7, 'headline') || getSlideText(7, 'title')}
                      description={getSlideText(7, 'body')}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide8Template3
                      box1Title={getSlideText(7, 'box1Title')}
                      box1Desc={getSlideText(7, 'box1Desc')}
                      box2Title={getSlideText(7, 'box2Title')}
                      box2Desc={getSlideText(7, 'box2Desc')}
                      image1={getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'image1') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image2={getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'image2') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image3={getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'image3') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image4={getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'image4') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      image5={getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'image5') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      box1Image={getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'box1Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      box2Image={getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'box2Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide8ColumnsTemplate4
                      title={getSlideText(7, 'title') || "Title"}
                      sub1Title={getSlideText(7, 'sub1Title')}
                      sub1Desc={getSlideText(7, 'sub1Desc')}
                      sub2Title={getSlideText(7, 'sub2Title')}
                      sub2Desc={getSlideText(7, 'sub2Desc')}
                      sub3Title={getSlideText(7, 'sub3Title')}
                      sub3Desc={getSlideText(7, 'sub3Desc')}
                      sub4Title={getSlideText(7, 'sub4Title')}
                      sub4Desc={getSlideText(7, 'sub4Desc')}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "08";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType.startsWith("sub")) {
                          slide[elementType] = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide8
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(7) as Record<string, unknown>, 'image'))}
                    />
                  )}
                </div>
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide9Template2
                      title={getSlideText(8, 'headline') || getSlideText(8, 'title')}
                      description={getSlideText(8, 'body')}
                      items={[]}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide9Template3
                      title={getSlideText(8, 'title')}
                      subtitle={getSlideText(8, 'subtitle')}
                      item1Title={getSlideText(8, 'item1Title')}
                      item1Desc={getSlideText(8, 'item1Desc')}
                      item2Title={getSlideText(8, 'item2Title')}
                      item2Desc={getSlideText(8, 'item2Desc')}
                      item3Title={getSlideText(8, 'item3Title')}
                      item3Desc={getSlideText(8, 'item3Desc')}
                      item4Title={getSlideText(8, 'item4Title')}
                      item4Desc={getSlideText(8, 'item4Desc')}
                      item1Image={getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'item1Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      item2Image={getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'item2Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      item3Image={getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'item3Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      item4Image={getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'item4Image') as { imagePrompt?: string; imageUrl?: string } | undefined}
                      leftImage={getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'leftImage') as { imagePrompt?: string; imageUrl?: string } | undefined}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide9Template4
                      title={getSlideText(8, 'title') || "Thank You!"}
                      subtitle={getSlideText(8, 'body') || "Presentation title"}
                      contact={getSlideText(8, 'body') || "contact@yourmail.com"}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'image'))}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "09";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;
                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "subtitle") {
                          slide.body = updatedContent;
                        } else if (elementType === "contact") {
                          slide.body = updatedContent;
                        }
                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide9
                      title={getText(getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'title') as string | TextContent | undefined) || ""}
                      desc={getText(getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'body') as string | TextContent | undefined) || ""}
                      imageLink={getImageUrl(getSlideProperty(getCurrentSlideData(8) as Record<string, unknown>, 'image'))}
                      onTextUpdate={createTextUpdateHandlerForStringFontSize("08", (slideKey, elementType, updatedContent) => {
                        const updatedSlideData = { ...outlineData };
                        if (!updatedSlideData) return;
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;
                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType === "desc") {
                          slide.body = updatedContent;
                        }
                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      })}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  )}
                </div>

                {/* Slide 10 */}
                <div className="w-full h-full shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide10Template2 />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide10Template3
                      thankYou={getSlideText(9, 'title')}
                      rightImage={getSlideProperty(getCurrentSlideData(9) as Record<string, unknown>, 'rightImage') as { imagePrompt?: string; imageUrl?: string } | undefined}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template4" ? (
                    <Slide10ColumnsTemplate4
                      title={getSlideText(9, 'title') || "Title"}
                      sub1Title={getSlideText(9, 'sub1Title')}
                      sub1Desc={getSlideText(9, 'sub1Desc')}
                      sub2Title={getSlideText(9, 'sub2Title')}
                      sub2Desc={getSlideText(9, 'sub2Desc')}
                      sub3Title={getSlideText(9, 'sub3Title')}
                      sub3Desc={getSlideText(9, 'sub3Desc')}
                      onTextUpdate={(elementType: string, updatedContent: string | TextContent) => {
                        const updatedSlideData = { ...outlineData };
                        const slideKey = "10";
                        const slide = updatedSlideData[slideKey] ? { ...(updatedSlideData[slideKey] as Record<string, unknown>) } : {} as Record<string, unknown>;

                        if (elementType === "title") {
                          slide.title = updatedContent;
                        } else if (elementType.startsWith("sub")) {
                          slide[elementType] = updatedContent;
                        }

                        updatedSlideData[slideKey] = slide;
                        setOutlineData(updatedSlideData);
                        setHasUnsavedChanges(true);
                      }}
                      onContentChange={() => setHasUnsavedChanges(true)}
                    />
                  ) : (
                    <Slide10/>
                  )}
                </div>
              </div>
            </div>
            {/* Slide indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              {Array.from({ length: 10 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 h-2 bg-white shadow-lg"
                      : "w-2 h-2 bg-white/50 hover:bg-white/70 hover:w-3"
                  }`}
                  title={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Font Editor Modal */}
      {showFontEditor && editingTextElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Font Style</h3>
                <button
                  onClick={() => setShowFontEditor(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {editingTextElement.textContent && (
                <FontSizeEditor
                  textContent={{
                    text: editingTextElement.textContent.text,
                    fontSize: editingTextElement.textContent.fontSize?.toString(),
                    color: editingTextElement.textContent.color,
                  }}
                  onFontSizeChange={handleFontSizeChange}
                  onColorChange={handleColorChange}
                />
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowFontEditor(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowFontEditor(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
