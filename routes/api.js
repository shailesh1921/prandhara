const express = require('express');
const router = express.Router();

// Import Models
const Contact = require('../models/Contact');
const Appointment = require('../models/Appointment');
const VitalFeed = require('../models/VitalFeed');

// --- 1. Contact Routes ---
router.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const saved = await newContact.save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/contact', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- 2. Appointment Routes ---
router.post('/appointment', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const saved = await newAppointment.save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- 3. Vital Feed Routes ---
router.get('/vital-feed', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const posts = await VitalFeed.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await VitalFeed.countDocuments();

        res.json({
            success: true,
            data: posts,
            hasMore: skip + posts.length < total
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- 4. Admin Combined Messages (Dashboard) ---
router.get('/messages', async (req, res) => {
    try {
        const contacts = await Contact.find().lean();
        const appointments = await Appointment.find().lean();

        // Add type identifier
        const formattedContacts = contacts.map(c => ({ ...c, type: 'message' }));
        const formattedAppointments = appointments.map(a => ({ ...a, type: 'appointment' }));

        const all = [...formattedContacts, ...formattedAppointments].sort((a, b) => b.createdAt - a.createdAt);

        res.json({ success: true, data: all });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
