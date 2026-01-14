'use client';

import { useState } from 'react';
import Link from 'next/link';
import Slide1 from '@/components/slides/templete1/Slide1';
import Slide2 from '@/components/slides/templete1/Slide2';
import Slide3 from '@/components/slides/templete1/Slide3';
import Slide4 from '@/components/slides/templete1/Slide4';
import Slide5 from '@/components/slides/templete1/Slide5';
import Slide6 from '@/components/slides/templete1/Slide6';
import Slide7 from '@/components/slides/templete1/Slide7';
import Slide8 from '@/components/slides/templete1/Slide8';
import Slide9 from '@/components/slides/templete1/Slide9';
import Slide10 from '@/components/slides/templete1/Slide10';

export default function Generate() {
  const [topic, setTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSlidePreview, setShowSlidePreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const templates = [
    { id: 'business', name: 'Business Professional', description: 'Clean and corporate design' },
    { id: 'creative', name: 'Creative Modern', description: 'Bold and artistic layout' },
    { id: 'academic', name: 'Academic Formal', description: 'Traditional educational style' },
    { id: 'tech', name: 'Tech Startup', description: 'Modern and innovative design' },
    { id: 'minimal', name: 'Minimal Clean', description: 'Simple and elegant' },
    { id: 'colorful', name: 'Colorful Vibrant', description: 'Bright and engaging' }
  ];

  const handleGenerate = () => {
    if (!topic.trim() || !selectedTemplate) {
      alert('Please enter a topic and select a template');
      return;
    }
    
    setIsGenerating(true);
    // Here you would typically make an API call to generate the PPT
    setTimeout(() => {
      setIsGenerating(false);
      alert(`PPT generated for topic: "${topic}" with template: "${selectedTemplate}"`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Generate Your Presentation
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your topic and choose a template to create your professional presentation
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <label htmlFor="topic" className="block text-lg font-semibold text-gray-900 mb-3">
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
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedTemplate === template.id
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedTemplate === template.id && (
                          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
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
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                View Slides
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 text-lg ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate PPT'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Preview Modal - Carousel */}
      {showSlidePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8">
          <div className="relative w-full max-w-6xl h-[85vh]">
            {/* Close button */}
            <button
              onClick={() => setShowSlidePreview(false)}
              className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0)}
              className="absolute -left-20 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide(currentSlide < 9 ? currentSlide + 1 : 9)}
              className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                  <Slide1 title={topic || "Slide Title"} />
                </div>
                
                {/* Slide 2 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide2 
                    title="Second Slide" 
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.."
                    imageLink=""
                  />
                </div>

                {/* Slide 3 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide3 
                    columns={[
                      {
                        title: "Title-1",
                        desc: "This is the first column description with detailed information about the topic being presented in the presentation.",
                        imageLink: ""
                      },
                      {
                        title: "Title-2", 
                        desc: "Second column contains additional relevant content that supports the main topic with comprehensive details and examples.",
                        imageLink: ""
                      },
                      {
                        title: "Title-3",
                        desc: "Third column provides supplementary information and key takeaways from the presentation content.",
                        imageLink: ""
                      }
                    ]}
                  />
                </div>

                {/* Slide 4 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide4 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    imageLink=""
                  />
                </div>

                {/* Slide 5 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide5 
                    title="Key Features"
                    intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    bullets={[
                      "Advanced analytics and real-time reporting.",
                      "Seamless integration with existing workflows.",
                      "Enterprise-grade security and compliance."
                    ]}
                  />
                </div>

                {/* Slide 6 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide6 
                    title="Slide Title"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    imageLink1=""
                    imageLink2=""
                  />
                </div>

                {/* Slide 7 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide7 
                    title="Slide Title"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    imageLink=""
                  />
                </div>

                {/* Slide 8 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide8
                    imageLink=""
                  />
                </div>

                {/* Slide 9 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide9 
                    title="Slide Title"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    imageLink=""
                  />
                </div>

                {/* Slide 10 */}
                <div className="w-full h-full flex-shrink-0">
                  <Slide10 
                    title="Slide Title"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    imageLink=""
                  />
                </div>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                onClick={() => setCurrentSlide(0)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 0 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(1)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 1 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(2)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 2 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(3)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 3 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(4)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 4 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(5)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 5 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(6)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 6 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(7)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 7 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(8)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 8 ? 'bg-white' : 'bg-white/50'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(9)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === 9 ? 'bg-white' : 'bg-white/50'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
