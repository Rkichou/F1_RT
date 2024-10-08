const express = require('express');
const userService = require('../services/userService');
const User = require('../models/User'); // Assure-toi d'importer le modèle User
const { generateToken } = require('../config/auth'); // Assure-toi que le chemin est correct

const router = express.Router();

// Route pour l'enregistrement des utilisateurs
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.register(email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour la connexion des utilisateurs
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token } = await userService.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Récupérer tous les utilisateurs de la base de données
      res.json(users); // Retourner la liste des utilisateurs
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
