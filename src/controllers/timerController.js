const Timer = require('../models/Timer');

// Soumettre un temps de réaction
exports.submitReactionTime = async (req, res) => {
    const { userId, time } = req.body;


  try {
    const timer = new Timer({ user_id: userId, time });
    await timer.save();
    res.status(201).json({ message: 'Temps de réaction enregistré' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer les temps de réaction d'un utilisateur
exports.getReactionTimes = async (req, res) => {
  const userId = req.params.userId;

  try {
    const times = await Timer.find({ user_id: userId }).sort({ createdAt: -1 });
    res.status(200).json(times);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
