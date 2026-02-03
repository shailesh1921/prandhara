const mongoose = require('mongoose');

// Connect to the same DB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prandhara_db';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB for Seeding'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

const VitalFeed = require('../models/VitalFeed');

// Sample Data
const samplePosts = [
    {
        title: "Morning Sun Salutations",
        category: "Yoga",
        description: "Start your day with Surya Namaskar to energize your body and calm your mind. This ancient practice improves flexibility and blood circulation.",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "The Power of Green Juice",
        category: "Detox",
        description: "A simple blend of spinach, cucumber, and ginger can reset your digestive system. Natural detoxification starts with what you consume.",
        image: "https://images.unsplash.com/photo-1615485925694-a031e6639d4e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Mindful Breathing for Stress",
        category: "Stress Relief",
        description: "When anxiety hits, return to your breath. The 4-7-8 breathing technique is a powerful natural tranquilizer for the nervous system.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Prenatal Yoga Benefits",
        category: "Prenatal",
        description: "Gentle movements helps expectant mothers reduce back pain and prepare the body for childbirth. Connecting with your baby starts with connecting with yourself.",
        image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Ayurvedic Sleep Routine",
        category: "Daily Habits",
        description: "Drinking warm milk with turmeric and ashwagandha before bed can dramatically improve sleep quality according to ancient texts.",
        image: "https://images.unsplash.com/photo-1512069772995-ec65ed456d32?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Yoga for Seniors",
        category: "Seniors",
        description: "It is never too late to start. Chair yoga offers significant benefits for mobility and balance without the strain of floor exercises.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Hydration & Skin Health",
        category: "Natural Beauty",
        description: "True radiance comes from within. Proper hydration flushes out toxins and leaves your skin glowing naturally.",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Meditation in Nature",
        category: "Mental Health",
        description: "Spend 20 minutes a day under a tree. known as 'Forest Bathing' (Shinrin-yoku), it lowers cortisol levels instantly.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Plant-Based Protein Sources",
        category: "Diet",
        description: "Lentils, chickpeas, and quinoa. You don't need meat to build strength. Nature provides all the building blocks we need.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Gratitude Journaling",
        category: "Lifestyle",
        description: "Writing down three things you are grateful for every morning shifts your mindset from scarcity to abundance.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop"
    }
];

// Seed Function
const seedDB = async () => {
    try {
        await VitalFeed.deleteMany({}); // Clear existing
        console.log('🗑️  Cleared existing feed');

        await VitalFeed.insertMany(samplePosts);
        console.log('🌱 Seeded 10 new posts successfully');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
