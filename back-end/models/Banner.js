const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    $oid: {
        type: String
    },
    id: {
        type: String,
        required: true
    },
    Link: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    start_date: {
        type: String
    },
    end_date: {
        type: String
    },
    status: {
        type: String,
        default: 'active'
    },
    imageURL: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'banner'
});

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner; 