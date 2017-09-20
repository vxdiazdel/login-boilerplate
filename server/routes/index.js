const express = require('express');
const router = express.Router();

// Import route controllers
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');

// Import middleware
const { authenticate } = require('../middleware/userMiddleware');

// API routes
router.get('/', apiController.get);

// User routes
router.get('/users', userController.get);
router.get('/users/profile', authenticate, userController.getProfile);
router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);
router.post('/users/logout', authenticate, userController.logout);
router.post('/users/setup', userController.setup);

module.exports = router;
