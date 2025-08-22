// Predefined flyer templates
const flyerTemplates = [
  {
    id: 'real-estate-1',
    name: 'Modern Real Estate',
    category: 'real-estate',
    description: 'Clean, modern template perfect for property listings',
    thumbnail: '/templates/real-estate-1.png',
    layout: {
      width: 850,
      height: 1100,
      backgroundColor: '#ffffff',
      elements: [
        {
          type: 'text',
          id: 'headline',
          content: 'Your Dream Home Awaits',
          style: {
            fontSize: 32,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: '#2c3e50',
            textAlign: 'center'
          },
          position: { x: 425, y: 80 }
        },
        {
          type: 'text',
          id: 'highlights',
          content: '• Feature 1\n• Feature 2\n• Feature 3',
          style: {
            fontSize: 18,
            fontFamily: 'Arial, sans-serif',
            color: '#34495e',
            lineHeight: 1.6
          },
          position: { x: 60, y: 200 }
        },
        {
          type: 'text',
          id: 'location',
          content: 'Prime Location Details',
          style: {
            fontSize: 16,
            fontFamily: 'Arial, sans-serif',
            color: '#7f8c8d'
          },
          position: { x: 60, y: 400 }
        },
        {
          type: 'text',
          id: 'cta',
          content: 'Call Today!',
          style: {
            fontSize: 24,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: '#e74c3c',
            textAlign: 'center'
          },
          position: { x: 425, y: 950 }
        }
      ]
    }
  },
  {
    id: 'real-estate-2',
    name: 'Luxury Real Estate',
    category: 'real-estate',
    description: 'Elegant template for high-end properties',
    thumbnail: '/templates/real-estate-2.png',
    layout: {
      width: 850,
      height: 1100,
      backgroundColor: '#f8f9fa',
      elements: [
        {
          type: 'text',
          id: 'headline',
          content: 'Luxury Living',
          style: {
            fontSize: 36,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#8b4513',
            textAlign: 'center'
          },
          position: { x: 425, y: 100 }
        },
        {
          type: 'text',
          id: 'highlights',
          content: '• Premium Feature 1\n• Premium Feature 2\n• Premium Feature 3',
          style: {
            fontSize: 18,
            fontFamily: 'Georgia, serif',
            color: '#5d4e75',
            lineHeight: 1.8
          },
          position: { x: 80, y: 250 }
        },
        {
          type: 'text',
          id: 'location',
          content: 'Exclusive Neighborhood',
          style: {
            fontSize: 16,
            fontFamily: 'Georgia, serif',
            color: '#8b7355'
          },
          position: { x: 80, y: 450 }
        },
        {
          type: 'text',
          id: 'cta',
          content: 'Schedule Private Showing',
          style: {
            fontSize: 20,
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#8b4513',
            textAlign: 'center'
          },
          position: { x: 425, y: 980 }
        }
      ]
    }
  },
  {
    id: 'event-1',
    name: 'Modern Event',
    category: 'event',
    description: 'Vibrant template for events and gatherings',
    thumbnail: '/templates/event-1.png',
    layout: {
      width: 850,
      height: 1100,
      backgroundColor: '#ffffff',
      elements: [
        {
          type: 'text',
          id: 'headline',
          content: 'Amazing Event',
          style: {
            fontSize: 38,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: '#e74c3c',
            textAlign: 'center'
          },
          position: { x: 425, y: 120 }
        },
        {
          type: 'text',
          id: 'details',
          content: 'Event Details Here',
          style: {
            fontSize: 20,
            fontFamily: 'Arial, sans-serif',
            color: '#2c3e50',
            textAlign: 'center'
          },
          position: { x: 425, y: 250 }
        },
        {
          type: 'text',
          id: 'highlights',
          content: '• Why Attend 1\n• Why Attend 2\n• Why Attend 3',
          style: {
            fontSize: 18,
            fontFamily: 'Arial, sans-serif',
            color: '#34495e',
            lineHeight: 1.6
          },
          position: { x: 60, y: 400 }
        },
        {
          type: 'text',
          id: 'cta',
          content: 'Register Now!',
          style: {
            fontSize: 28,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: '#27ae60',
            textAlign: 'center'
          },
          position: { x: 425, y: 950 }
        }
      ]
    }
  },
  {
    id: 'business-1',
    name: 'Professional Business',
    category: 'business',
    description: 'Clean template for business promotions',
    thumbnail: '/templates/business-1.png',
    layout: {
      width: 850,
      height: 1100,
      backgroundColor: '#f7f9fc',
      elements: [
        {
          type: 'text',
          id: 'headline',
          content: 'Professional Services',
          style: {
            fontSize: 32,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: '#2c3e50',
            textAlign: 'center'
          },
          position: { x: 425, y: 100 }
        },
        {
          type: 'text',
          id: 'services',
          content: '• Service 1\n• Service 2\n• Service 3',
          style: {
            fontSize: 18,
            fontFamily: 'Arial, sans-serif',
            color: '#34495e',
            lineHeight: 1.6
          },
          position: { x: 60, y: 250 }
        },
        {
          type: 'text',
          id: 'benefits',
          content: 'Why Choose Us',
          style: {
            fontSize: 16,
            fontFamily: 'Arial, sans-serif',
            color: '#7f8c8d'
          },
          position: { x: 60, y: 450 }
        },
        {
          type: 'text',
          id: 'cta',
          content: 'Contact Us Today',
          style: {
            fontSize: 24,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: '#3498db',
            textAlign: 'center'
          },
          position: { x: 425, y: 950 }
        }
      ]
    }
  }
];

module.exports = flyerTemplates;
