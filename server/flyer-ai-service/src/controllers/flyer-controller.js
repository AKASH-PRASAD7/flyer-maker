const { GoogleGenerativeAI } = require("@google/generative-ai");
const flyerTemplates = require("../config/flyer-templates");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Generate AI-enhanced flyer content
exports.generateFlyerContent = async (req, res) => {
  try {
    const { userInput, flyerType = "real-estate" } = req.body;

    if (!userInput || userInput.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please provide meaningful input text (at least 5 characters)",
      });
    }

    // Create a specific prompt based on the flyer type
    const prompt = createPromptForFlyerType(userInput, flyerType);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();

    // Parse the enhanced text to structure it properly
    const structuredContent = parseEnhancedContent(enhancedText, flyerType);

    res.json({
      success: true,
      data: {
        originalInput: userInput,
        enhancedContent: structuredContent,
        flyerType: flyerType,
      },
    });
  } catch (error) {
    console.error("Error generating flyer content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate flyer content",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// Get available flyer templates
exports.getFlyerTemplates = async (req, res) => {
  try {
    res.json({
      success: true,
      data: flyerTemplates,
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
    });
  }
};

// Create complete flyer with template and content
exports.createFlyer = async (req, res) => {
  try {
    const { userInput, templateId, flyerType = "real-estate" } = req.body;

    if (!userInput || !templateId) {
      return res.status(400).json({
        success: false,
        message: "User input and template ID are required",
      });
    }

    // Find the selected template
    const selectedTemplate = flyerTemplates.find(
      (template) => template.id === templateId
    );
    if (!selectedTemplate) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    // Generate AI content
    const prompt = createPromptForFlyerType(userInput, flyerType);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();

    const structuredContent = parseEnhancedContent(enhancedText, flyerType);

    // Create the complete flyer data
    const flyerData = {
      template: selectedTemplate,
      content: structuredContent,
      originalInput: userInput,
      flyerType: flyerType,
      createdAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: flyerData,
    });
  } catch (error) {
    console.error("Error creating flyer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create flyer",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// Helper function to create prompts based on flyer type
function createPromptForFlyerType(userInput, flyerType) {
  const prompts = {
    "real-estate": `
You are a professional real estate marketing expert. Transform the following basic property information into compelling, professional flyer content.

Input: "${userInput}"

Create a well-structured real estate flyer with the following sections:
1. **Main Headline** - Catchy, attention-grabbing title
2. **Property Highlights** - Key features in bullet points (3-5 points)
3. **Location Benefits** - Advantages of the location
4. **Call to Action** - Compelling closing statement

Guidelines:
- Use professional, enthusiastic language
- Focus on benefits and lifestyle
- Include relevant details from the input
- Make it scannable and easy to read
- Keep the total length under 300 words
- Use emotional triggers and power words

Format the response as clean, readable text sections.`,

    event: `
You are an event marketing specialist. Transform the following event information into an exciting, compelling flyer content.

Input: "${userInput}"

Create an engaging event flyer with:
1. **Event Title** - Exciting, memorable headline
2. **Event Details** - Key information (date, time, location if provided)
3. **Why Attend** - Benefits and highlights in bullet points
4. **Call to Action** - Encouraging action statement

Make it exciting, clear, and action-oriented. Keep under 250 words.`,

    business: `
You are a business marketing expert. Transform the following business information into professional promotional content.

Input: "${userInput}"

Create compelling business flyer content with:
1. **Business Headline** - Professional, benefit-focused title
2. **Key Services/Products** - Main offerings in bullet points
3. **Why Choose Us** - Unique value propositions
4. **Contact Call to Action** - Professional closing

Keep it professional, benefit-focused, and under 300 words.`,
  };

  return prompts[flyerType] || prompts["real-estate"];
}

// Helper function to parse enhanced content into structured format
function parseEnhancedContent(enhancedText, flyerType) {
  // Basic parsing to structure the content
  const lines = enhancedText.split("\n").filter((line) => line.trim());

  const structuredContent = {
    headline: "",
    sections: [],
    callToAction: "",
  };

  let currentSection = null;
  let sectionContent = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Check for section headers (marked with ** or #)
    if (line.includes("**") && line.includes("**")) {
      // Save previous section if exists
      if (currentSection && sectionContent.length > 0) {
        structuredContent.sections.push({
          title: currentSection,
          content: sectionContent.join("\n"),
        });
      }

      // Start new section
      currentSection = line.replace(/\*\*/g, "").replace(/#{1,}/g, "").trim();
      sectionContent = [];
    } else if (currentSection) {
      sectionContent.push(line);
    } else if (!structuredContent.headline && line.length > 10) {
      // First meaningful line becomes headline
      structuredContent.headline = line;
    }
  }

  // Save last section
  if (currentSection && sectionContent.length > 0) {
    structuredContent.sections.push({
      title: currentSection,
      content: sectionContent.join("\n"),
    });
  }

  // Extract call to action from the last section if it looks like one
  const lastSection =
    structuredContent.sections[structuredContent.sections.length - 1];
  if (
    lastSection &&
    (lastSection.title.toLowerCase().includes("call") ||
      lastSection.title.toLowerCase().includes("action") ||
      lastSection.title.toLowerCase().includes("contact"))
  ) {
    structuredContent.callToAction = lastSection.content;
    structuredContent.sections.pop(); // Remove it from sections
  }

  return structuredContent;
}
