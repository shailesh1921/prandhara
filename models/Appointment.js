const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    doctor: { type: String, required: true },
    patientName: { type: String, required: true },
    age: Number,
    gender: String,
    history: String,
    time: String,
    source: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
