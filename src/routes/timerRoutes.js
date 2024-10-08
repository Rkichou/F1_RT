const express = require('express');
const timerService = require('../services/timerService');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware d'authentification

// Route pour soumettre un temps de réaction
router.post('/submit-reaction-time', authMiddleware, async (req, res) => {
  const { time } = req.body;
  const userId = req.user.id; // Récupère l'ID utilisateur depuis le middleware d'authentification
  try {
    const reactionTime = await timerService.submitReactionTime(userId, time);
    res.status(201).json({ message: 'Reaction time submitted', reactionTime });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer les temps de réaction d'un utilisateur
router.get('/get-reaction-times/:userId', authMiddleware, async (req, res) => {
  const userId = req.params.userId; // Récupère l'ID utilisateur depuis les paramètres
  try {
    const reactionTimes = await timerService.getReactionTimes(userId);
    res.status(200).json(reactionTimes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
