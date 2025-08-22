"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TemplateSelector({ onTemplateSelect }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('http://localhost:3004/api/flyer/templates');
      const result = await response.json();
      
      if (result.success) {
        setTemplates(result.data);
      } else {
        console.error('Failed to fetch templates');
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Templates', color: 'bg-gray-100 text-gray-800' },
    { id: 'real-estate', name: 'Real Estate', color: 'bg-blue-100 text-blue-800' },
    { id: 'event', name: 'Events', color: 'bg-green-100 text-green-800' },
    { id: 'business', name: 'Business', color: 'bg-purple-100 text-purple-800' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTemplates.map((template, index) => (
          <div key={template.id} className="group">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Template Preview Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundColor: template.layout.backgroundColor,
                    backgroundImage: `linear-gradient(45deg, ${template.layout.backgroundColor}22 25%, transparent 25%), 
                                    linear-gradient(-45deg, ${template.layout.backgroundColor}22 25%, transparent 25%), 
                                    linear-gradient(45deg, transparent 75%, ${template.layout.backgroundColor}22 75%), 
                                    linear-gradient(-45deg, transparent 75%, ${template.layout.backgroundColor}22 75%)`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                ></div>
                
                {/* Mock template content */}
                <div className="relative h-full p-6 flex flex-col justify-center items-center">
                  <div className="w-full max-w-32">
                    <div className={`h-4 rounded mb-3 ${
                      template.category === 'real-estate' ? 'bg-blue-200' :
                      template.category === 'event' ? 'bg-red-200' : 'bg-purple-200'
                    }`}></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div className={`h-3 rounded mt-4 w-2/3 ${
                      template.category === 'real-estate' ? 'bg-blue-300' :
                      template.category === 'event' ? 'bg-red-300' : 'bg-purple-300'
                    }`}></div>
                  </div>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <Badge 
                    className={`${
                      template.category === 'real-estate' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      template.category === 'event' ? 'bg-red-100 text-red-800 border-red-200' : 
                      'bg-purple-100 text-purple-800 border-purple-200'
                    } border`}
                  >
                    {template.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium text-gray-800">Click to select</p>
                  </div>
                </div>
              </div>
              
              {/* Template Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {template.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-gray-500 font-mono">
                    {template.layout.width} × {template.layout.height}px
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1 h-1 rounded-full ${
                        i < 4 ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}></div>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">4.0</span>
                  </div>
                </div>

                <Button 
                  onClick={() => onTemplateSelect(template)}
                  className={`w-full font-semibold transition-all duration-300 ${
                    template.category === 'real-estate' ? 'bg-blue-600 hover:bg-blue-700' :
                    template.category === 'event' ? 'bg-red-600 hover:bg-red-700' : 
                    'bg-purple-600 hover:bg-purple-700'
                  } group-hover:shadow-lg`}
                >
                  Use This Template
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No templates found for the selected category.</p>
        </div>
      )}
    </div>
  );
}
