const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import your controller
const User = require('../models/User'); // Import the User model

// Register a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Example route for getting all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users); // Return the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;