# AI Flyer Generator Service

A simplified AI-powered flyer generation service that uses Google's Gemini AI to create compelling flyer content from basic user input.

## Features

- **AI Content Generation**: Transform simple text input into professional flyer content
- **Template System**: Pre-defined flyer templates for different categories (Real Estate, Events, Business)
- **RESTful API**: Clean REST endpoints for frontend integration
- **Gemini AI Integration**: Leverages Google's Gemini AI for natural language processing

## Quick Start

### Prerequisites

- Node.js 16+ installed
- Google Gemini API key

### Installation

1. Navigate to the service directory:
```bash
cd server/flyer-ai-service
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env` and update with your Gemini API key:
```bash
PORT=3004
GEMINI_API_KEY=your_actual_gemini_api_key_here
NODE_ENV=development
```

4. Start the service:
```bash
npm start
# or for development
npm run dev
```

The service will be available at `http://localhost:3004`

## API Endpoints

### Get Templates
```http
GET /api/flyer/templates
```
Returns available flyer templates.

### Generate Content
```http
POST /api/flyer/generate
```
Generate AI-enhanced content from user input.

Request body:
```json
{
  "userInput": "Beautiful large 3 bedroom, and swimming pool, 3400 sq ft, home for sale at Albany 12034",
  "flyerType": "real-estate"
}
```

### Create Complete Flyer
```http
POST /api/flyer/create
```
Generate a complete flyer with template and AI content.

Request body:
```json
{
  "userInput": "Your property description here...",
  "templateId": "real-estate-1",
  "flyerType": "real-estate"
}
```

## Example Usage

1. **Real Estate Flyer**:
   - Input: "Beautiful large 3 bedroom, and swimming pool, 3400 sq ft, home for sale at Albany 12034"
   - AI generates professional real estate copy with headlines, features, and call-to-action

2. **Event Flyer**:
   - Input: "Community BBQ this Saturday at Central Park, 2-6 PM, live music and games"
   - AI creates engaging event content with details and registration info

3. **Business Flyer**:
   - Input: "Local plumbing services, emergency repairs, licensed and insured"
   - AI develops professional service descriptions and contact information

## Template Categories

- **real-estate**: Property listings, open houses, real estate services
- **event**: Community events, parties, conferences, workshops  
- **business**: Service promotions, product launches, business announcements

## Architecture

```
├── src/
│   ├── server.js              # Main Express server
│   ├── controllers/           # Request handlers
│   ├── routes/               # API route definitions
│   └── config/               # Template configurations
├── package.json
└── .env
```

## Integration with Frontend

The service is designed to work with the React frontend flyer generator at `/flyer-generator`. The frontend:

1. Fetches available templates
2. Sends user input to AI generation endpoint
3. Displays generated flyer in a simplified editor
4. Allows text editing and font size adjustments (no positioning)

## Limitations (Simplified Version)

This is a simplified version with the following constraints:
- No text positioning/alignment editing
- No image uploads or complex graphics
- Text-only content generation
- Basic template system
- Simple download functionality (text export)

## Error Handling

The service includes comprehensive error handling for:
- Invalid API keys
- Malformed requests
- AI generation failures
- Template not found scenarios

## Health Check

```http
GET /health
```
Returns service status for monitoring.
