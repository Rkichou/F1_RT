const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/f1_reaction_timer';
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('La connexion à MongoDB a bien été établie !');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
    process.exit(1); // Quitte le processus en cas d'erreur
  }
};

module.exports = connectDB;
