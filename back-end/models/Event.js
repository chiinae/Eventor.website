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
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'event'  // Chỉ định rõ tên collection
});

module.exports = mongoose.model('Event', eventSchema); 