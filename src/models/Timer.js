const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time: {
    type: Number,
    required: [true, 'Reaction time is required'],
    min: [0, 'Reaction time cannot be negative'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Timer', timerSchema);