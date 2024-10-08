const express = require('express');
const userRoutes = require('./routes/userRoutes');
const timerRoutes = require('./routes/timerRoutes');
const connectDB = require('./config/db');

const app = express();

app.use(express.json()); // Middleware pour parser le JSON

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/timer', timerRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

module.exports = app;
