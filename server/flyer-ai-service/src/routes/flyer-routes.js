const express = require('express');
const router = express.Router();
const flyerController = require('../controllers/flyer-controller');

// Generate AI-enhanced flyer content
router.post('/generate', flyerController.generateFlyerContent);

// Get available flyer templates
router.get('/templates', flyerController.getFlyerTemplates);

// Generate flyer with template and AI content
router.post('/create', flyerController.createFlyer);

module.exports = router;
