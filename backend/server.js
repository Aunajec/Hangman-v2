const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// FIX: Add full CORS config to allow frontend to talk to backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to allow JSON and handle headers
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Mongo Model
const GameResult = require('./models/GameResult');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

//  API Route
app.post('/api/game', async (req, res) => {
  console.log('📥 Incoming POST to /api/game with:', req.body);

  try {
    const { playerName, didWin } = req.body;

    let record = await GameResult.findOne({ playerName });

    if (!record) {
      record = new GameResult({
        playerName,
        wins: didWin ? 1 : 0,
        losses: didWin ? 0 : 1,
      });
    } else {
      if (didWin) record.wins += 1;
      else record.losses += 1;
    }

    await record.save();
    res.status(200).json({ message: '✅ Game result saved.' });
  } catch (error) {
    console.error('❌ Save failed:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
