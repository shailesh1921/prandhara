/**
 * Database Handler for Prandhara
 * Connects to the Node.js/MongoDB Backend via API
 */

const API_BASE = '/api';

const DB = {
    // --- Save Data via API ---
    save: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (e) {
            console.error("API Save Error:", e);
            alert("Error connecting to server. Please try again.");
            return null;
        }
    },

    // --- Retrieve Data via API ---
    // Note: Since fetch is async, we need to handle this differently in the UI
    // We will create a specific render function in the dashboard instead of returning directly here
    getAllMessages: async () => {
        try {
            const response = await fetch(`${API_BASE}/messages`);
            const result = await response.json();
            return result.data || [];
        } catch (e) {
            console.error("API Fetch Error:", e);
            return [];
        }
    }
};

// --- Form Listeners ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Contact Page Form
    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm && window.location.pathname.includes('contact.html')) {
        contactForm.removeAttribute('onsubmit');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                source: 'Contact Page'
            };

            const result = await DB.save('contact', formData);

            if (result && result.success) {
                alert('Success! Your message has been saved to the MongoDB database.');
                contactForm.reset();
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // 2. Doctor Appointment Models (Naturopathy Page)
    const consultForms = document.querySelectorAll('.consult-form');
    consultForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;

            const isDhiresh = form.innerHTML.includes('d-name');
            const prefix = isDhiresh ? 'd-' : 's-';
            const doctorName = isDhiresh ? 'Dr. Dhiresh Singh' : 'Er. Shailesh Singh';

            const formData = {
                doctor: doctorName,
                patientName: document.getElementById(`${prefix}name`).value,
                age: document.getElementById(`${prefix}age`).value,
                gender: document.getElementById(`${prefix}gender`).value,
                history: document.getElementById(`${prefix}history`).value,
                time: document.getElementById(`${prefix}time`).value,
                source: 'Consultation Page'
            };

            const result = await DB.save('appointment', formData);

            if (result && result.success) {
                alert(`Appointment confirmed! Saved to database ID: ${result.data._id}`);
                form.reset();
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
});
