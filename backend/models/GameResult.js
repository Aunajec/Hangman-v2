const mongoose = require('mongoose');

const GameResultSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
});

module.exports = mongoose.model('GameResult', GameResultSchema);


