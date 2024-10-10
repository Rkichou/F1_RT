const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const timerRoutes = require('./routes/timerRoutes');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
//
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join('/app', 'public', 'index.html')); // Serve index.html file
});
app.use('/api', userRoutes);
app.use('/api', timerRoutes);

// Error Handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Function to start the server
const startServer = async () => {
  try {
    console.log('Connecting to the database...');
    await connectDB();
    console.log('Database connected successfully.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app; // Export app for testing