const timerService = require('../../services/timerService');

// @desc    Submit a reaction time
// @route   POST /submit-reaction-time
// @access  Private
exports.submitReactionTime = async (req, res) => {
  try {
    const timer = await timerService.submitReactionTime(req.user._id, req.body.time);
    res.status(201).json({
      message: 'Reaction time submitted successfully',
      timer,
    });
  } catch (error) {
    if (error.status === 400 && error.message) {
      // Handle validation errors
      return res.status(400).json({ errors: error.message });
    }
    
    console.error('Submit Reaction Time Error:', error.message);
    res.status(error.status || 500).json({ message: error.message || 'Server error during submission' });
  }
};

// @desc    Retrieve reaction times for a user
// @route   GET /get-reaction-times/:userId
// @access  Private
exports.getReactionTimes = async (req, res) => {
  try {
    const { userId } = req.params;
    const { sort, filter } = req.query;

    // Check if the user is authorized to access this data (admin or self)
    if (req.user.role !== 0 && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden: Access is denied' });
    }

    const timers = await timerService.getReactionTimes(userId, sort, filter);
    res.status(200).json({
      count: timers.length,
      timers,
    });
  } catch (error) {
    console.error('Get Reaction Times Error:', error.message);
    res.status(500).json({ message: 'Server error during retrieval' });
  }
};
