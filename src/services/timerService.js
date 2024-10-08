const Timer = require('../models/Timer');

const timerService = {
  submitReactionTime: async (userId, time) => {
    const timer = new Timer({ user_id: userId, time });
    return await timer.save();
  },

  getReactionTimes: async (userId) => {
    return await Timer.find({ user_id: userId }).sort({ time: 1 }); // Trie par temps croissant
  }
};

module.exports = timerService;
