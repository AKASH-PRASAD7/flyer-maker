"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Download, Save, Type } from "lucide-react";

// Helper function to get accent colors based on template category
const getTemplateAccentColor = (category) => {
  const colors = {
    'real-estate': '#3B82F6', // Blue
    'event': '#EF4444', // Red  
    'business': '#8B5CF6', // Purple
  };
  return colors[category] || colors['business'];
};

export default function FlyerEditor({ flyerData, onSave }) {
  const [editedContent, setEditedContent] = useState({});
  const [selectedElement, setSelectedElement] = useState(null);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    if (flyerData) {
      // Initialize edited content with AI-generated content
      const initialContent = {};
      
      // Map AI content to template elements
      flyerData.template.layout.elements.forEach(element => {
        switch (element.id) {
          case 'headline':
            initialContent[element.id] = flyerData.content.headline || element.content;
            break;
          case 'highlights':
            const highlights = flyerData.content.sections
              .find(section => section.title.toLowerCase().includes('highlight') || 
                             section.title.toLowerCase().includes('feature'))?.content || 
              element.content;
            initialContent[element.id] = highlights;
            break;
          case 'location':
          case 'benefits':
            const locationSection = flyerData.content.sections
              .find(section => section.title.toLowerCase().includes('location') ||
                             section.title.toLowerCase().includes('benefit') ||
                             section.title.toLowerCase().includes('choose'))?.content || 
              element.content;
            initialContent[element.id] = locationSection;
            break;
          case 'cta':
            initialContent[element.id] = flyerData.content.callToAction || element.content;
            break;
          case 'details':
          case 'services':
            const detailsSection = flyerData.content.sections
              .find(section => section.title.toLowerCase().includes('detail') ||
                             section.title.toLowerCase().includes('service'))?.content || 
              element.content;
            initialContent[element.id] = detailsSection;
            break;
          default:
            initialContent[element.id] = element.content;
        }
      });
      
      setEditedContent(initialContent);
    }
  }, [flyerData]);

  const handleTextChange = (elementId, newText) => {
    setEditedContent(prev => ({
      ...prev,
      [elementId]: newText
    }));
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
    setFontSize(element.style.fontSize || 16);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize[0]);
    if (selectedElement) {
      setSelectedElement(prev => ({
        ...prev,
        style: { ...prev.style, fontSize: newSize[0] }
      }));
    }
  };

  const handleSave = () => {
    const updatedData = {
      ...flyerData,
      editedContent,
      selectedElement
    };
    onSave(updatedData);
  };

  const handleDownload = () => {
    // Simple download as text - in a real app, you'd generate PDF/image
    const content = Object.entries(editedContent).map(([key, value]) => 
      `${key.toUpperCase()}:\n${value}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flyer-content.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!flyerData) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Flyer Preview */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Preview Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Type className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Flyer Preview</h3>
                      <p className="text-blue-100 text-sm">{flyerData.template.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleDownload} className="bg-white text-blue-600 hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex justify-center">
                  <div 
                    className="relative shadow-2xl rounded-xl overflow-hidden border-4 border-white transform hover:scale-105 transition-all duration-300"
                    style={{
                      width: Math.min(flyerData.template.layout.width * 0.7, 595),
                      height: Math.min(flyerData.template.layout.height * 0.7, 770),
                      backgroundColor: flyerData.template.layout.backgroundColor,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, ${getTemplateAccentColor(flyerData.template.category)}22 0%, transparent 50%), 
                                        radial-gradient(circle at 80% 20%, ${getTemplateAccentColor(flyerData.template.category)}15 0%, transparent 50%),
                                        radial-gradient(circle at 40% 80%, ${getTemplateAccentColor(flyerData.template.category)}10 0%, transparent 50%)`,
                      }}></div>
                    </div>
                    
                    {/* Professional Border Design */}
                    <div className="absolute inset-0 border-2 border-gray-200/30 rounded-xl pointer-events-none"></div>
                    
                    {/* Corner Accents */}
                    <div className={`absolute top-0 left-0 w-32 h-32 opacity-10`} style={{
                      background: `linear-gradient(135deg, ${getTemplateAccentColor(flyerData.template.category)} 0%, transparent 70%)`
                    }}></div>
                    <div className={`absolute bottom-0 right-0 w-24 h-24 opacity-10`} style={{
                      background: `linear-gradient(315deg, ${getTemplateAccentColor(flyerData.template.category)} 0%, transparent 70%)`
                    }}></div>
                    
                    {flyerData.template.layout.elements.map((element) => {
                      const isHeadline = element.id === 'headline';
                      const isCTA = element.id === 'cta';
                      const isHighlights = element.id === 'highlights';
                      
                      return (
                        <div
                          key={element.id}
                          className={`absolute cursor-pointer transition-all duration-200 ${
                            selectedElement?.id === element.id 
                              ? 'ring-2 ring-blue-500 shadow-lg z-10' 
                              : 'hover:ring-2 hover:ring-blue-300'
                          } ${
                            isHeadline ? 'p-4 rounded-2xl' : 
                            isCTA ? 'p-3 rounded-xl' :
                            isHighlights ? 'p-3 rounded-lg' : 'p-2 rounded-lg'
                          }`}
                          style={{
                            left: (element.position.x * 0.7),
                            top: (element.position.y * 0.7),
                            fontSize: selectedElement?.id === element.id 
                              ? (fontSize * 0.7) 
                              : (element.style.fontSize * 0.7),
                            fontFamily: element.style.fontFamily,
                            fontWeight: isHeadline ? 'bold' : element.style.fontWeight,
                            color: element.style.color,
                            textAlign: element.style.textAlign || 'left',
                            lineHeight: isHeadline ? 1.2 : (element.style.lineHeight || 1.4),
                            maxWidth: isHeadline ? '400px' : '350px',
                            whiteSpace: 'pre-line',
                            textShadow: isHeadline ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                            background: selectedElement?.id === element.id 
                              ? 'rgba(59, 130, 246, 0.1)' 
                              : isCTA 
                              ? `linear-gradient(135deg, ${getTemplateAccentColor(flyerData.template.category)}15, ${getTemplateAccentColor(flyerData.template.category)}08)`
                              : 'transparent',
                            border: isCTA ? `2px solid ${getTemplateAccentColor(flyerData.template.category)}40` : 'none',
                            borderRadius: isCTA ? '12px' : '8px'
                          }}
                          onClick={() => handleElementSelect(element)}
                          title={`Click to edit ${element.id}`}
                        >
                          {/* Add visual enhancements based on element type */}
                          {isHeadline && (
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-2xl opacity-60"></div>
                          )}
                          
                          {isHighlights && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full opacity-60"></div>
                          )}
                          
                          <div className={`relative ${
                            isHeadline ? 'drop-shadow-sm' : ''
                          }`}>
                            {editedContent[element.id] || element.content}
                          </div>
                          
                          {selectedElement?.id === element.id && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                          )}
                        </div>
                      );
                    })}
                    
                    {/* Professional Footer */}
                    <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
                  </div>
                </div>
                
                {/* Preview Footer */}
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">Click on any text element to edit • Real-time preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Text Editor Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Type className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Text Editor</h3>
                    <p className="text-purple-100 text-sm">Edit content & styling</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {selectedElement ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-semibold text-gray-800">
                          Editing: {selectedElement.id.charAt(0).toUpperCase() + selectedElement.id.slice(1)}
                        </label>
                        <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Active
                        </div>
                      </div>
                      <Textarea
                        value={editedContent[selectedElement.id] || ''}
                        onChange={(e) => handleTextChange(selectedElement.id, e.target.value)}
                        placeholder="Enter your text here..."
                        className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg"
                      />
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Font Size: <span className="text-blue-600">{fontSize}px</span>
                      </label>
                      <Slider
                        value={[fontSize]}
                        onValueChange={handleFontSizeChange}
                        max={72}
                        min={8}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>8px</span>
                        <span>72px</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Type className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium mb-2">No Element Selected</p>
                    <p className="text-gray-400 text-sm">Click on any text element in the preview to edit it</p>
                  </div>
                )}
              </div>
            </div>

            {/* Template Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Template Details</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Name</span>
                    <span className="text-gray-900">{flyerData.template.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Category</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      {flyerData.template.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="font-medium text-gray-700">Dimensions</span>
                    <span className="text-gray-900 font-mono text-sm">
                      {flyerData.template.layout.width} × {flyerData.template.layout.height}px
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Content Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">AI Generated Content</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Original Input</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-violet-500">
                      <p className="text-gray-700 italic text-sm">"{flyerData.originalInput}"</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Generated Sections</h4>
                    <div className="space-y-2">
                      {flyerData.content.sections.map((section, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 text-sm font-medium">{section.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
