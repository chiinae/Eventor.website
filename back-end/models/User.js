const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
    createdAt: { type: Date, default: Date.now },
    membershipType: { type: String, default: 'standard' },
    membershipExpiry: { type: Date },
    eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    first_name: { type: String },
    last_name: { type: String },
    gender: { type: String },
    avatar: { type: String },
    status: { type: String },
    role: { type: String, default: 'user' }
}, { 
    collection: 'user',
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
