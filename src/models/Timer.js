const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Référence au modèle User
  },
  time: {
    type: Number,
    required: true, // En millisecondes
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date de création par défaut
  },
});

const Timer = mongoose.model('Timer', timerSchema);
module.exports = Timer;
