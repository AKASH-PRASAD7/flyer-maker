"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Function to get appropriate Unsplash images for each template category
const getUnsplashImageForTemplate = (category, index) => {
  const imageCollections = {
    "real-estate": [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Modern house exterior
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Luxury home interior
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Beautiful home front
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Real estate sign
    ],
    event: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Event celebration
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Party balloons
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Concert/event
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Business conference
    ],
    business: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Business office
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Business meeting
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Modern office building
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=400&fit=crop&crop=center&auto=format&q=80", // Team working
    ],
  };

  const categoryImages =
    imageCollections[category] || imageCollections["business"];
  return categoryImages[index % categoryImages.length];
};

export default function TemplateSelector({ onTemplateSelect }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch("http://localhost:3004/api/flyer/templates");
      const result = await response.json();

      if (result.success) {
        setTemplates(result.data);
      } else {
        console.error("Failed to fetch templates");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Templates", color: "bg-gray-100 text-gray-800" },
    {
      id: "real-estate",
      name: "Real Estate",
      color: "bg-blue-100 text-blue-800",
    },
    { id: "event", name: "Events", color: "bg-green-100 text-green-800" },
    {
      id: "business",
      name: "Business",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

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
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                {/* Unsplash Image */}
                <img
                  src={getUnsplashImageForTemplate(template.category, index)}
                  alt={`${template.name} template preview`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

                {/* Template content overlay */}

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`${
                      template.category === "real-estate"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : template.category === "event"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-purple-100 text-purple-800 border-purple-200"
                    } border`}
                  >
                    {template.category
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                </div>

                {/* Hover overlay */}
                {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium text-gray-800">Click to select</p>
                  </div>
                </div> */}
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
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          i < 4 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">4.0</span>
                  </div>
                </div>

                <Button
                  onClick={() => onTemplateSelect(template)}
                  className={`w-full cursor-pointer font-semibold transition-all duration-300 ${
                    template.category === "real-estate"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : template.category === "event"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-purple-600 hover:bg-purple-700"
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
          <p className="text-gray-500">
            No templates found for the selected category.
          </p>
        </div>
      )}
    </div>
  );
}
