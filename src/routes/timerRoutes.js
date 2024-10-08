const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController'); // Import your controller
const Timer = require('../models/Timer'); // Import the Timer model

// Submit a reaction time
router.post('/submit-reaction-time', timerController.submitReactionTime);

// Retrieve reaction times for a user
router.get('/get-reaction-times/:userId', timerController.getReactionTimes);

// Example route for getting all timers (if needed)
router.get('/timers', async (req, res) => {
    try {
        const timers = await Timer.find(); // Fetch all timers from the database
        res.json(timers); // Return the list of timers
    } catch (error) {
        console.error('Error fetching timers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Example route for creating a timer (if you want to have a separate route)
router.post('/timers', async (req, res) => {
    try {
        const { user_id, time } = req.body;

        // Create a new timer
        const timer = new Timer({ user_id, time });
        await timer.save();

        res.status(201).json({
            message: 'Timer created successfully',
            timer,
        });
    } catch (error) {
        console.error('Error creating timer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;