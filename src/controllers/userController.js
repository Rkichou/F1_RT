const User = require('../models/User');

// Enregistrement d'un utilisateur
exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    // Générer un token JWT ici (optionnel)
    res.status(200).json({ message: 'Connexion réussie' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
