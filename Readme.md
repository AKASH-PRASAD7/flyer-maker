# 🎨 AI-Powered Flyer Maker

<div align="center">
 <img width="1898" height="761" alt="image" src="https://github.com/user-attachments/assets/f5592dff-4451-4190-b12f-5d961410d9a0" />
</div>

> **Transform your ideas into stunning flyers with the power of AI** ✨

A modern, AI-driven flyer creation platform that combines the intelligence of Google Gemini with beautiful, professional design templates. Create compelling marketing materials in minutes, not hours.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-blue?logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Key Features

### 🧠 **AI-Powered Content Generation**
- **Smart Content Creation**: Transform simple descriptions into professional flyer content
- **Google Gemini Integration**: Powered by advanced AI for natural, engaging copy
- **Category-Specific Optimization**: Tailored content for Real Estate, Events, and Business
- **Intelligent Content Mapping**: AI automatically populates appropriate template sections

### 🎨 **Professional Design System**
- **Beautiful Templates**: Carefully crafted designs with modern aesthetics
- **High-Quality Visuals**: Stunning Unsplash images relevant to each category
- **Dynamic Theming**: Category-based color schemes and styling
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices

### ✏️ **Intuitive Editing Experience**
- **Real-Time Preview**: See changes instantly as you edit
- **Smart Text Editor**: Click any element to modify content
- **Typography Controls**: Adjust font sizes with precision sliders
- **Visual Feedback**: Professional selection indicators and hover effects

### 🎯 **Modern UI/UX**
- **SaaS-Grade Interface**: Clean, professional, and user-friendly
- **Gradient Backgrounds**: Beautiful visual depth with subtle animations
- **Component-Based Design**: Consistent styling across the entire platform
- **Smooth Interactions**: Polished hover effects and transitions

## 📸 Screenshots

<div align="center">
  <img width="1827" height="907" alt="image" src="https://github.com/user-attachments/assets/4e1398a1-a9fa-4682-8d14-7e426820f125" />
  <img width="1686" height="908" alt="image" src="https://github.com/user-attachments/assets/b187ccc7-6e8d-41bf-8089-545dbdb9e534" />
</div>

<div align="center">
  <p><em>Template Selection & AI-Powered Content Generation</em></p>
</div>

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.2.4** - React framework with App Router
- **React 19.0.0** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful SVG icons
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Gemini AI** - Advanced language model
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

### **Development Tools**
- **Turbopack** - Next.js bundler for faster development
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting and formatting

## ⚡ Quick Setup

### 1. Backend (AI Service)

```bash
# Navigate to AI service
cd server/flyer-ai-service

# Install dependencies (already done if following along)
npm install

# Configure environment
# Edit .env file and add your Gemini API key:
# GEMINI_API_KEY=your_actual_gemini_api_key_here

# Start the AI service
npm run dev
```

The AI service will run on `http://localhost:3004`

### 2. Frontend

```bash
# Navigate to client
cd client

# Install dependencies (if not already done)
npm install

# Start the frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key and add it to `server/flyer-ai-service/.env`

## Usage Workflow

### Step 1: Access AI Flyer Generator

- Open the frontend at `http://localhost:3000`
- Click "Try AI Flyer Generator" on the homepage
- You'll see the new AI-powered flyer generator interface

### Step 2: Select Template

- Choose from available templates:
  - **Modern Real Estate** - Clean design for property listings
  - **Luxury Real Estate** - Elegant design for high-end properties
  - **Modern Event** - Vibrant design for events and gatherings
  - **Professional Business** - Clean design for business promotions

### Step 3: AI Content Generation

- Enter basic information (example for real estate):
  ```
  Beautiful large 3 bedroom, and swimming pool, 3400 sq ft, home for sale at Albany 12034
  ```
- Click "Generate Flyer with AI"
- The AI will create professional content including:
  - Compelling headlines
  - Property highlights in bullet points
  - Location benefits
  - Strong call-to-action

### Step 4: Simple Editing

- Click on any text element in the preview to edit it
- Modify the text content as needed
- Adjust font sizes using the slider
- Save your changes

### Example AI Transformation

**Input:**

```
Beautiful large 3 bedroom, and swimming pool, 3400 sq ft, home for sale at Albany 12034
```

**AI Output:**

```
Beautiful 3-Bedroom Home with Swimming Pool – For Sale in Albany, NY 12034

Property Highlights:
• Spacious 3,400 sq. ft. of living space
• 3 Large Bedrooms designed for comfort
• Sparkling private swimming pool
• Modern kitchen with premium finishes
• Open floor plan with abundant natural light
• Beautifully landscaped yard, perfect for gatherings

Prime Location in Albany 12034 – Close to schools, shopping, and major highways.

Your Dream Home Awaits!
Don't miss this rare opportunity to own a stunning, move-in-ready property.
Call today to schedule a private showing!
```

## API Endpoints

The new AI service provides these endpoints:

- `GET /api/flyer/templates` - Get available templates
- `POST /api/flyer/generate` - Generate AI content only
- `POST /api/flyer/create` - Generate complete flyer with template


## 🎨 Design Enhancements

### **Visual Improvements**
- ✨ **High-Quality Images**: Replaced mock previews with beautiful Unsplash photos
- 🌈 **Gradient Backgrounds**: Subtle radial gradients for depth and sophistication
- 🎯 **Category Theming**: Color-coded templates (Blue for Real Estate, Red for Events, Purple for Business)
- 📱 **Responsive Design**: Optimized for all screen sizes with mobile-first approach
- 🖼️ **Background Integration**: Layered background images with smart opacity and blur effects

### **User Experience**
- 🔄 **Real-Time Preview**: Instant visual feedback during editing
- 🎪 **Hover Effects**: Smooth transitions and interactive elements
- 📍 **Visual Selection**: Clear indicators for selected elements
- 🎨 **Professional Styling**: SaaS-grade interface with consistent design language
- 📝 **Text Readability**: Enhanced contrast with shadows and background overlays



---

