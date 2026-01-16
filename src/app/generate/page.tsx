"use client";

import { useState } from "react";
import Link from "next/link";
import { presentationData } from "@/config/presentationData";
import { template2Data } from "@/config/template2Data";
import { template3Data } from "@/config/template3Data";
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

// Template mapping: maps template IDs to their template folder names
const TEMPLATE_MAP: Record<string, "template1" | "template2" | "template3"> = {
  business: "template1",
  creative: "template2",
  tech: "template3",
  academic: "template1",
  minimal: "template1",
  colorful: "template1",
};

export default function Generate() {
  const [topic, setTopic] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSlidePreview, setShowSlidePreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const templates = [
    {
      id: "business",
      name: "Business Professional",
      description: "Clean and corporate design",
    },
    {
      id: "creative",
      name: "Creative Modern",
      description: "Bold and artistic layout",
    },
    {
      id: "academic",
      name: "Academic Formal",
      description: "Traditional educational style",
    },
    {
      id: "tech",
      name: "Tech Startup",
      description: "Modern and innovative design",
    },
    { id: "minimal", name: "Minimal Clean", description: "Simple and elegant" },
    {
      id: "colorful",
      name: "Colorful Vibrant",
      description: "Bright and engaging",
    },
  ];

  const handleGenerate = () => {
    if (!topic.trim() || !selectedTemplate) {
      alert("Please enter a topic and select a template");
      return;
    }

    setIsGenerating(true);
    // Show generation screen for 10 seconds
    setTimeout(() => {
      setIsGenerating(false);
      setShowSlidePreview(true);
      setCurrentSlide(0);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Generate Your Presentation
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your topic and choose a template to create your professional
            presentation
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <label
                htmlFor="topic"
                className="block text-lg font-semibold text-gray-900 mb-3"
              >
                Presentation Topic
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your presentation topic here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 text-gray-700"
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Choose Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedTemplate === template.id
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedTemplate === template.id && (
                          <svg
                            className="w-full h-full text-white"
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
                      <h3 className="font-semibold text-gray-900">
                        {template.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSlidePreview(true)}
                disabled={!selectedTemplate}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg ${
                  !selectedTemplate
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                }`}
              >
                View Slides
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 text-lg ${
                  isGenerating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center">
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
                  </span>
                ) : (
                  "Generate PPT"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Screen */}
      {isGenerating && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-8">
              <svg
                className="animate-spin mx-auto h-16 w-16 text-white mb-4"
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
            <h2 className="text-4xl font-bold mb-4">
              Generating Your Presentation
            </h2>
            <p className="text-xl mb-8">
              Please wait while we create your amazing slides...
            </p>
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full animate-pulse"
                style={{ animation: "slide 10s linear infinite" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Slide Preview Modal - Carousel */}
      {showSlidePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8">
          <div className="relative w-full max-w-6xl h-[85vh]">
            {/* Close button */}
            <button
              onClick={() => setShowSlidePreview(false)}
              className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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

            {/* Navigation buttons */}
            <button
              onClick={() =>
                setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0)
              }
              className="absolute -left-20 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
              className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide1Template2 
                      title={template2Data.presentation.slides["00"].title}
                      subtitle={template2Data.presentation.slides["00"].subtitle}
                      imageLink={template2Data.presentation.slides["00"].image?.imageUrl}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide1Template3 
                      title={template3Data.presentation.slides["01"].title}
                      description={template3Data.presentation.slides["01"].subtitle}
                    />
                  ) : (
                    <Slide1 title={topic || "Slide Title"} />
                  )}
                </div>

                {/* Slide 2 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide2Template2 
                      tagline={template2Data.presentation.slides["01"].tagline}
                      title={template2Data.presentation.slides["01"].title}
                      description={template2Data.presentation.slides["01"].bodyLeft}
                      contentTitle={template2Data.presentation.slides["01"].rightTitle}
                      contentDescription={template2Data.presentation.slides["01"].bodyRight}
                      imageLink={template2Data.presentation.slides["01"].image?.imageUrl}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide2Template3 
                      headerText={template3Data.presentation.slides["02"].headerText}
                      col1Title={template3Data.presentation.slides["02"].col1Title}
                      col1Desc={template3Data.presentation.slides["02"].col1Desc}
                      col2Title={template3Data.presentation.slides["02"].col2Title}
                      col2Desc={template3Data.presentation.slides["02"].col2Desc}
                      col3Title={template3Data.presentation.slides["02"].col3Title}
                      col3Desc={template3Data.presentation.slides["02"].col3Desc}
                      col4Title={template3Data.presentation.slides["02"].col4Title}
                      col4Desc={template3Data.presentation.slides["02"].col4Desc}
                    />
                  ) : (
                    <Slide2
                      title={presentationData.presentation.slides["01"].title}
                      desc={presentationData.presentation.slides["01"].body}
                      imageLink=""
                    />
                  )}
                </div>

                {/* Slide 3 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide3Template2 
                      title={template2Data.presentation.slides["02"].title}
                      description={template2Data.presentation.slides["02"].subtitle}
                      items={[
                        template2Data.presentation.slides["02"].item1,
                        template2Data.presentation.slides["02"].item2,
                        template2Data.presentation.slides["02"].item3,
                        template2Data.presentation.slides["02"].item4
                      ]}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide3Template3 
                      leftHeader={template3Data.presentation.slides["03"].leftHeader}
                      leftBody={template3Data.presentation.slides["03"].leftBody}
                      title={template3Data.presentation.slides["03"].title}
                      image={template3Data.presentation.slides["03"].image}
                    />
                  ) : (
                    <Slide3
                      columns={[
                        {
                          title:
                            presentationData.presentation.slides["02"].column1
                              .title,
                          desc: presentationData.presentation.slides["02"]
                            .column1.desc,
                          imageLink: "",
                        },
                        {
                          title:
                            presentationData.presentation.slides["02"].column2
                              .title,
                          desc: presentationData.presentation.slides["02"]
                            .column2.desc,
                          imageLink: "",
                        },
                        {
                          title:
                            presentationData.presentation.slides["02"].column3
                              .title,
                          desc: presentationData.presentation.slides["02"]
                            .column3.desc,
                          imageLink: "",
                        },
                      ]}
                    />
                  )}
                </div>

                {/* Slide 4 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide4Template2 
                      title={template2Data.presentation.slides["03"].title}
                      description={template2Data.presentation.slides["03"].topText}
                      imageLink=""
                      description2={template2Data.presentation.slides["03"].bodyRight}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide4Template3 
                      title={template3Data.presentation.slides["04"].title}
                      subtitle={template3Data.presentation.slides["04"].subtitle}
                      col1Title={template3Data.presentation.slides["04"].col1Title}
                      col1Desc={template3Data.presentation.slides["04"].col1Desc}
                      col2Title={template3Data.presentation.slides["04"].col2Title}
                      col2Desc={template3Data.presentation.slides["04"].col2Desc}
                      col3Title={template3Data.presentation.slides["04"].col3Title}
                      col3Desc={template3Data.presentation.slides["04"].col3Desc}
                      col4Title={template3Data.presentation.slides["04"].col4Title}
                      col4Desc={template3Data.presentation.slides["04"].col4Desc}
                    />
                  ) : (
                    <Slide4
                      description={
                        presentationData.presentation.slides["03"].body
                      }
                      imageLink=""
                    />
                  )}
                </div>

                {/* Slide 5 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide5Template2 
                      title={template2Data.presentation.slides["04"].title}
                      sampleText={template2Data.presentation.slides["04"].subtitle}
                      description={template2Data.presentation.slides["04"].body}
                      imageLink=""
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide5Template3 
                      title={template3Data.presentation.slides["05"].title}
                      subtitle={template3Data.presentation.slides["05"].subtitle}
                      bar1Title={template3Data.presentation.slides["05"].bar1Title}
                      bar1Value={template3Data.presentation.slides["05"].bar1Value}
                      bar2Title={template3Data.presentation.slides["05"].bar2Title}
                      bar2Value={template3Data.presentation.slides["05"].bar2Value}
                      bar3Title={template3Data.presentation.slides["05"].bar3Title}
                      bar3Value={template3Data.presentation.slides["05"].bar3Value}
                      item1Title={template3Data.presentation.slides["05"].item1Title}
                      item1Desc={template3Data.presentation.slides["05"].item1Desc}
                      item2Title={template3Data.presentation.slides["05"].item2Title}
                      item2Desc={template3Data.presentation.slides["05"].item2Desc}
                      item3Title={template3Data.presentation.slides["05"].item3Title}
                      item3Desc={template3Data.presentation.slides["05"].item3Desc}
                      item4Title={template3Data.presentation.slides["05"].item4Title}
                      item4Desc={template3Data.presentation.slides["05"].item4Desc}
                      imageLink1={template3Data.presentation.slides["05"].imageLink1}
                      imageLink2={template3Data.presentation.slides["05"].imageLink2}
                      imageLink3={template3Data.presentation.slides["05"].imageLink3}
                    />
                  ) : (
                    <Slide5
                      title={presentationData.presentation.slides["04"].title}
                      intro={presentationData.presentation.slides["04"].intro}
                      bullets={
                        presentationData.presentation.slides["04"].bullets
                      }
                    />
                  )}
                </div>

                {/* Slide 6 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide6Template2 
                      title={template2Data.presentation.slides["05"].title}
                      description={template2Data.presentation.slides["05"].body}
                      numbersTitle="Key Statistics"
                      numberItems={[
                        `${template2Data.presentation.slides["05"].stat1Title}: ${template2Data.presentation.slides["05"].stat1Desc}`,
                        `${template2Data.presentation.slides["05"].stat2Title}: ${template2Data.presentation.slides["05"].stat2Desc}`,
                        `${template2Data.presentation.slides["05"].stat3Title}: ${template2Data.presentation.slides["05"].stat3Desc}`
                      ]}
                      imageLink=""
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide6Template3 
                      companyName={template3Data.presentation.slides["06"].companyName}
                      tagline={template3Data.presentation.slides["06"].tagline}
                      col1Title={template3Data.presentation.slides["06"].col1Title}
                      col1Desc={template3Data.presentation.slides["06"].col1Desc}
                      col2Title={template3Data.presentation.slides["06"].col2Title}
                      col2Desc={template3Data.presentation.slides["06"].col2Desc}
                      col3Title={template3Data.presentation.slides["06"].col3Title}
                      col3Desc={template3Data.presentation.slides["06"].col3Desc}
                      col4Title={template3Data.presentation.slides["06"].col4Title}
                      col4Desc={template3Data.presentation.slides["06"].col4Desc}
                      image1={template3Data.presentation.slides["06"].image1}
                      image2={template3Data.presentation.slides["06"].image2}
                      image3={template3Data.presentation.slides["06"].image3}
                      image4={template3Data.presentation.slides["06"].image4}
                    />
                  ) : (
                    <Slide6
                      title={presentationData.presentation.slides["05"].title}
                      desc={presentationData.presentation.slides["05"].body}
                      imageLink1=""
                      imageLink2=""
                    />
                  )}
                </div>

                {/* Slide 7 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide7Template2 
                      tagline={template2Data.presentation.slides["06"].tagline}
                      title={template2Data.presentation.slides["06"].title}
                      items={[
                        {
                          title: template2Data.presentation.slides["06"].point1Title,
                          description: template2Data.presentation.slides["06"].point1Desc
                        },
                        {
                          title: template2Data.presentation.slides["06"].point2Title,
                          description: template2Data.presentation.slides["06"].point2Desc
                        },
                        {
                          title: template2Data.presentation.slides["06"].point3Title,
                          description: template2Data.presentation.slides["06"].point3Desc
                        }
                      ]}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide7Template3 
                      title={template3Data.presentation.slides["07"].title}
                      subtitle={template3Data.presentation.slides["07"].subtitle}
                      stat1Title={template3Data.presentation.slides["07"].stat1Title}
                      stat1Value={template3Data.presentation.slides["07"].stat1Value}
                      stat2Title={template3Data.presentation.slides["07"].stat2Title}
                      stat2Value={template3Data.presentation.slides["07"].stat2Value}
                      stat3Title={template3Data.presentation.slides["07"].stat3Title}
                      stat3Value={template3Data.presentation.slides["07"].stat3Value}
                      image={template3Data.presentation.slides["07"].image}
                    />
                  ) : (
                    <Slide7
                      title={presentationData.presentation.slides["06"].title}
                      desc={presentationData.presentation.slides["06"].body}
                      imageLink={presentationData.presentation.slides["06"].caption}
                    />
                  )}
                </div>

                {/* Slide 8 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide8Template2 
                      mainText={template2Data.presentation.slides["07"].headline}
                      description={template2Data.presentation.slides["07"].body}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide8Template3 
                      box1Title={template3Data.presentation.slides["08"].box1Title}
                      box1Desc={template3Data.presentation.slides["08"].box1Desc}
                      box2Title={template3Data.presentation.slides["08"].box2Title}
                      box2Desc={template3Data.presentation.slides["08"].box2Desc}
                      image={template3Data.presentation.slides["08"].image}
                    />
                  ) : (
                    <Slide8 imageLink="" />
                  )}
                </div>
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide9Template2 
                      title={template2Data.presentation.slides["08"].headline}
                      description={template2Data.presentation.slides["08"].body}
                      items={[]}
                    />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide9Template3 
                      title={template3Data.presentation.slides["09"].title}
                      subtitle={template3Data.presentation.slides["09"].subtitle}
                      item1Title={template3Data.presentation.slides["09"].item1Title}
                      item1Desc={template3Data.presentation.slides["09"].item1Desc}
                      item2Title={template3Data.presentation.slides["09"].item2Title}
                      item2Desc={template3Data.presentation.slides["09"].item2Desc}
                      item3Title={template3Data.presentation.slides["09"].item3Title}
                      item3Desc={template3Data.presentation.slides["09"].item3Desc}
                      highlightTitle={template3Data.presentation.slides["09"].highlightTitle}
                      highlightDesc={template3Data.presentation.slides["09"].highlightDesc}
                      image={template3Data.presentation.slides["09"].image}
                    />
                  ) : (
                    <Slide9
                      title={presentationData.presentation.slides["08"].title}
                      desc={presentationData.presentation.slides["08"].body}
                    />
                  )}
                </div>

                {/* Slide 10 */}
                <div className="w-full h-full flex-shrink-0">
                  {TEMPLATE_MAP[selectedTemplate] === "template2" ? (
                    <Slide10Template2 />
                  ) : TEMPLATE_MAP[selectedTemplate] === "template3" ? (
                    <Slide10Template3 
                      thankYou={template3Data.presentation.slides["09"].title}
                    />
                  ) : (
                     <Slide10
                    title={presentationData.presentation.slides["08"].title}
                    desc={presentationData.presentation.slides["08"].body}
                    imageLink=""
                  />
                  )}
                </div>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                onClick={() => setCurrentSlide(0)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 0 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(1)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 1 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(2)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 2 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(3)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 3 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(4)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 4 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(5)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 5 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(6)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 6 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(7)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 7 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(8)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 8 ? "bg-white" : "bg-white/50"
                }`}
              />
              <button
                onClick={() => setCurrentSlide(9)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 9 ? "bg-white" : "bg-white/50"
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
