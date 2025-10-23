// User model for MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    bestTime: {
        type: Number,
        default: null
    },
    bestMoves: {
        type: Number,
        default: null
    },
    totalGames: {
        type: Number,
        default: 0
    },
    gamesWon: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create indexes for better performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ bestTime: 1 });

module.exports = mongoose.model('User', userSchema);
