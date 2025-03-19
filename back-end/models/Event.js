const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    max_participant: {
        type: Number,
        required: true
    },
    current_participant: {
        type: Number,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    hour_start: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    location: {
        name: String,
        address: String,
        city: String
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    event_image: {
        type: String,
        required: true
    },
    tickets: [
        {
            tier: String,
            price: Number,
            quantity: Number
        }
    ]
}, {
    timestamps: true,
    collection: 'event'  // Chỉ định rõ tên collection
});

module.exports = mongoose.model('Event', eventSchema); 