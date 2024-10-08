const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.log('Token manquant');
    return res.status(403).json({ error: 'Accès refusé' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token décodé:', decoded);
    
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      console.log('Utilisateur non trouvé');
      return res.status(403).json({ error: 'Accès refusé' });
    }

    console.log('Utilisateur trouvé:', req.user);
    next();
  } catch (error) {
    console.error('Erreur de token:', error);
    return res.status(403).json({ error: 'Token invalide' });
  }
};
