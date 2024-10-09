const Timer = require('../models/Timer');
const validator = require('../utils/validator');
    
// @desc    Submit a reaction time
// @route   POST /submit-reaction-time
// @access  Private
exports.submitReactionTime = async (req, res) => {
  try {
    const { time } = req.body;

    // Validate input
    const { valid, errors } = validator.validateReactionTime(time);
    if (!valid) {
      return res.status(400).json({ errors });
    }

    const timer = new Timer({
      user_id: req.user._id,
      time,
    });

    await timer.save();

    res.status(201).json({
      message: 'Reaction time submitted successfully',
      timer,
    });
  } catch (error) {
    console.error('Submit Reaction Time Error:', error.message);
    res.status(500).json({ message: 'Server error during submission' });
  }
};

// @desc    Retrieve reaction times for a user
// @route   GET /get-reaction-times/:userId
// @access  Private
exports.getReactionTimes = async (req, res) => {
  try {
    const { userId } = req.params;
    const { sort, filter } = req.query;

    // Authorization: Users can only access their own data unless admin
    if (req.user.role !== 0 && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden: Access is denied' });
    }

    // Build query
    let query = { user_id: userId };

    // Apply filtering if any (e.g., date range)
    if (filter) {
      // Example: filter by date range
      // Expected format: filter=startDate,endDate
      const [startDate, endDate] = filter.split(',');
      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
    }

    // Build sort
    let sortOption = {};
    if (sort === 'asc') {
      sortOption.time = 1;
    } else if (sort === 'desc') {
      sortOption.time = -1;
    } else {
      sortOption.createdAt = -1; // default
    }

    const timers = await Timer.find(query).sort(sortOption);

    res.status(200).json({
      count: timers.length,
      timers,
    });
  } catch (error) {
    console.error('Get Reaction Times Error:', error.message);
    res.status(500).json({ message: 'Server error during retrieval' });
  }
};