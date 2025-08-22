"use client";

import { useState } from "react";
import TemplateSelector from "@/components/flyer/template-selector";
import FlyerEditor from "@/components/flyer/flyer-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wand2 } from "lucide-react";
import Link from "next/link";

export default function FlyerGeneratorPage() {
  const [step, setStep] = useState(1); // 1: Template Selection, 2: Text Input & AI Generation, 3: Editor
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [flyerData, setFlyerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setStep(2);
  };

  const handleGenerateFlyer = async () => {
    if (!userInput.trim() || !selectedTemplate) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3004/api/flyer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: userInput.trim(),
          templateId: selectedTemplate.id,
          flyerType: selectedTemplate.category
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setFlyerData(result.data);
        setStep(3);
      } else {
        alert('Failed to generate flyer: ' + result.message);
      }
    } catch (error) {
      console.error('Error generating flyer:', error);
      alert('Error generating flyer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTemplates = () => {
    setStep(1);
    setSelectedTemplate(null);
    setUserInput("");
    setFlyerData(null);
  };

  const handleBackToInput = () => {
    setStep(2);
    setFlyerData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    AI Flyer Generator
                  </h1>
                  <p className="text-sm text-gray-600">Create stunning flyers with AI</p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Step indicator */}
            <div className="flex items-center space-x-3">
              {[
                { num: 1, label: 'Template' },
                { num: 2, label: 'Generate' },
                { num: 3, label: 'Edit' }
              ].map((stepInfo) => (
                <div key={stepInfo.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg ${
                        stepInfo.num === step
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200 scale-110'
                          : stepInfo.num < step
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {stepInfo.num < step ? '✓' : stepInfo.num}
                    </div>
                    <span className={`text-xs mt-1 font-medium ${
                      stepInfo.num === step ? 'text-blue-600' :
                      stepInfo.num < step ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {stepInfo.label}
                    </span>
                  </div>
                  {stepInfo.num < 3 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      stepInfo.num < step ? 'bg-green-400' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Flyer Template
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select a template that best fits your needs. Each template is optimized for different purposes.
              </p>
            </div>
            <TemplateSelector onTemplateSelect={handleTemplateSelect} />
          </div>
        )}

        {step === 2 && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                ✨ Selected: {selectedTemplate?.name}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Tell Us About Your {selectedTemplate?.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Enter some basic information and our AI will create compelling flyer content for you.
                The more details you provide, the better your flyer will be!
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Content Generator</h3>
                    <p className="text-indigo-100 text-sm">Powered by Google Gemini</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Input Section */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <label className="block text-lg font-bold text-gray-900 mb-4">
                        📝 Your Input
                      </label>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-600 mb-2"><strong>Example for Real Estate:</strong></p>
                        <p className="text-sm text-gray-500 italic">
                          "Beautiful large 3 bedroom, and swimming pool, 3400 sq ft, home for sale at Albany 12034"
                        </p>
                      </div>
                      <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your basic information here..."
                        className="w-full h-40 px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg resize-none"
                        maxLength={500}
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-sm text-gray-500">
                          💡 Tip: Include key details like size, features, location, and purpose
                        </div>
                        <div className={`text-sm font-medium ${
                          userInput.length > 400 ? 'text-orange-600' : 
                          userInput.length > 300 ? 'text-yellow-600' : 'text-gray-500'
                        }`}>
                          {userInput.length}/500 characters
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Section */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 h-full">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">🎯 What AI Will Generate</h4>
                      <div className="space-y-4 text-sm">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold text-xs">1</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Compelling Headlines</p>
                            <p className="text-gray-600">Eye-catching titles that grab attention</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold text-xs">2</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Key Features</p>
                            <p className="text-gray-600">Organized bullet points of highlights</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-purple-600 font-bold text-xs">3</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Persuasive Copy</p>
                            <p className="text-gray-600">Professional marketing language</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-bold text-xs">4</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Call-to-Action</p>
                            <p className="text-gray-600">Strong closing statements</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={handleBackToTemplates}
                    className="px-6 py-3 text-lg font-medium"
                  >
                    ← Back to Templates
                  </Button>
                  <Button 
                    onClick={handleGenerateFlyer}
                    disabled={!userInput.trim() || loading}
                    className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Generating with AI...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 mr-3" />
                        Generate Flyer with AI ✨
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && flyerData && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Edit Your Flyer
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fine-tune your flyer by editing text content and adjusting font sizes.
              </p>
            </div>

            <div className="flex justify-center mb-4">
              <Button variant="outline" onClick={handleBackToInput} className="mr-4">
                Back to Input
              </Button>
            </div>

            <FlyerEditor 
              flyerData={flyerData}
              onSave={(updatedData) => {
                setFlyerData(updatedData);
                // Could add save functionality here
                alert('Flyer saved successfully!');
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
