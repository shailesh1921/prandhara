const mongoose = require('mongoose');

const VitalFeedSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VitalFeed', VitalFeedSchema);
