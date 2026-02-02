document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    const state = {
        isLoggedIn: false,
        user: null
    };

    // --- DOM Elements ---
    const loginSection = document.querySelector('.login-container');
    const dashboardSection = document.querySelector('.social-dashboard');
    const loginBtn = document.getElementById('login-btn');
    const feedContainer = document.getElementById('feed-container');
    const storiesContainer = document.querySelector('.stories-bar');
    const sidebarProfileImg = document.getElementById('sidebar-profile-img');

    // Nav Elements
    const navFeed = document.getElementById('nav-feed');
    const navPlan = document.getElementById('nav-plan');
    const navConsult = document.getElementById('nav-consult');
    const feedView = document.getElementById('feed-view');
    const planView = document.getElementById('plan-view');
    const planGrid = document.getElementById('plan-grid');

    // --- Data Generators ---
    // Plan Data
    const yogaPlans = [
        {
            title: "Yoga for Adults",
            img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=600",
            desc: "Daily flow to maintain flexibility, strength, and mental clarity. Includes Surya Namaskar and Warrior poses."
        },
        {
            title: "Yoga for Children",
            img: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=600",
            desc: "Fun and engaging poses like Tree, Cat-Cow, and Lion breath to improve focus and coordination."
        },
        {
            title: "Prenatal Yoga",
            img: "https://images.unsplash.com/photo-1552196527-bffef41ef674?auto=format&fit=crop&q=80&w=600",
            desc: "Gentle movements to support pregnancy, reduce back pain, and prepare the body for labor."
        },
        {
            title: "Senior Citizens",
            img: "https://images.unsplash.com/photo-1552248524-10d2396b0f7b?auto=format&fit=crop&q=80&w=600",
            desc: "Chair yoga and slow movements to improve balance, joint mobility, and circulation safely."
        }
    ];

    const doctors = [
        { name: "Dr. Dhiresh Singh", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dhiresh", title: "Naturopath" },
        { name: "Er. Shailesh Singh", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shailesh", title: "Fitness Trainer" },
        { name: "Dr. Aarya", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarya", title: "Yoga Expert" },
        { name: "Dr. Vihaan", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vihaan", title: "Dietician" }
    ];

    // --- Init ---
    function init() {
        // Check session (mock)
        if (localStorage.getItem('vitalUser')) {
            showDashboard();
        } else {
            showLogin();
        }

        // Generate Content
        generateStories();
        generatePosts(30);
        generatePlan();
    }

    // --- Navigation Logic ---
    navFeed.addEventListener('click', () => {
        switchView('feed');
    });

    navPlan.addEventListener('click', () => {
        switchView('plan');
    });

    navConsult.addEventListener('click', () => {
        window.location.href = 'naturopathy.html'; // Direct to main consultation page
    });

    function switchView(viewName) {
        if (viewName === 'feed') {
            feedView.classList.remove('hidden');
            planView.classList.add('hidden');
            navFeed.classList.add('active');
            navPlan.classList.remove('active');
        } else if (viewName === 'plan') {
            feedView.classList.add('hidden');
            planView.classList.remove('hidden');
            navFeed.classList.remove('active');
            navPlan.classList.add('active');
        }
    }

    function generatePlan() {
        planGrid.innerHTML = '';
        yogaPlans.forEach(plan => {
            const card = document.createElement('div');
            card.className = 'yoga-card';
            card.innerHTML = `
                <div class="yoga-img-wrapper">
                    <img src="${plan.img}" class="yoga-img" alt="${plan.title}">
                </div>
                <div class="yoga-info">
                    <div class="yoga-title">${plan.title}</div>
                    <div class="yoga-desc">${plan.desc}</div>
                </div>
            `;
            planGrid.appendChild(card);
        });
    }

    // --- Actions ---
    loginBtn.addEventListener('click', (e) => {
        // Animation fake delay
        e.target.innerHTML = 'Authenticating...';
        setTimeout(() => {
            localStorage.setItem('vitalUser', 'true');
            showDashboard();
        }, 1500);
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('vitalUser');
        window.location.reload();
    });

    // --- View Switchers ---
    function showLogin() {
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }

    function showDashboard() {
        loginSection.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            // Animate feed entering
        }, 500);

        // Set Profile
        sidebarProfileImg.src = "assets/er_shailesh.jpg"; // Default user
    }

    // --- Content Generators ---
    function generateStories() {
        storiesContainer.innerHTML = '';
        doctors.forEach(doc => {
            const story = document.createElement('div');
            story.className = 'story-circle-wrapper';
            story.innerHTML = `
                <div class="story-circle">
                    <img src="${doc.img}" class="story-img" alt="${doc.name}">
                </div>
                <p class="story-name">${doc.name.split(' ')[1] || doc.name}</p>
            `;
            storiesContainer.appendChild(story);
        });

        // Add some randoms
        for (let i = 0; i < 5; i++) {
            const name = `Member ${i + 1}`;
            const story = document.createElement('div');
            story.innerHTML = `
                <div class="story-circle">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${i}" class="story-img" alt="User">
                </div>
                <p class="story-name">User ${i + 1}</p>
            `;
            storiesContainer.appendChild(story);
        }
    }

    // --- Content Database (30 Authentic Posts) ---
    const feedData = [
        { user: "Dr. Dhiresh Singh", location: "Prandhara Wellness Center", img: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=600&auto=format", caption: "Surya Namaskar at sunrise sets the rhythm for your entire day. It aligns your biological clock and boosts metabolism. ☀️ #Yoga #MorningRoutine", likes: 1240 },
        { user: "Er. Shailesh Singh", location: "Nature's Gym", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format", caption: "Eat the rainbow! 🥗 A colorful salad ensures you get a variety of phytonutrients. This bowl is packed with antioxidants. #HealthyEating #Nutrition", likes: 890 },
        { user: "Dr. Aarya", location: "Himalayan Retreat", img: "https://images.unsplash.com/photo-1599447421405-c7e73d320498?w=600&auto=format", caption: "Ashwagandha: The king of Ayurvedic herbs for stress relief. A teaspoon in warm milk before bed works wonders. 🌿 #Ayurveda #Herbs", likes: 2100 },
        { user: "Dr. Vihaan", location: "Kerala Ayurveda", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format", caption: "Meditation isn't about silencing your thoughts; it's about not engaging with them. 5 minutes today? 🧘‍♂️ #Mindfulness #Peace", likes: 1543 },
        { user: "Naturopath_Tara", location: "Wellness Studio", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format", caption: "Spinal twist for digestion and flexibility. Keeps the spine young! #YogaPose #Flexibility", likes: 760 },
        { user: "GreenLife_Daily", location: "Organic Farm", img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format", caption: "Start your day with warm lemon water. It flushes toxins and aids digestion. 🍋 #Detox #NaturalCures", likes: 3200 },
        { user: "Dr. Dhiresh Singh", location: "Clinic", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600", caption: "Knowing your body type (Dosha) is key to health. Are you Vata, Pitta, or Kapha? Comment below! 🔥💧💨 #Dosha #Ayurveda", likes: 980 },
        { user: "YogaWithRiya", location: "Goa Beach", img: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&q=80&w=600", caption: "Inversions change your perspective and improve blood flow to the brain. Headstand practice. 🤸‍♀️ #Inversion #Focus", likes: 1100 },
        { user: "Herbalist_Joe", location: "Herbal Garden", img: "https://images.unsplash.com/photo-1515595967223-f9fa59af5a3b?auto=format&fit=crop&q=80&w=600", caption: "Fresh Mint and Tulsi tea. The ultimate immunity booster for this season. 🍵 #Tea #Immunity", likes: 650 },
        { user: "Mindful_Moments", location: "Silence Valley", img: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=600", caption: "Nature is the best healer. A walk in the woods (Shinrin-yoku) lowers cortisol instantly. 🌲 #NatureTherapy #StressRelief", likes: 1800 },
        { user: "Er. Shailesh Singh", location: "Home Kitchen", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600", caption: "Protein doesn't just come from meat. Lentils, chickpeas, and quinoa are powerhouses! 💪 #Vegan #Protein", likes: 780 },
        { user: "Holistic_Hanna", location: "Spa", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600", caption: "Self-care Sunday. An oil massage (Abhyanga) nourishes the skin and calms the nerves. 💆‍♀️ #SelfCare #Massage", likes: 1300 },
        { user: "Dr. Aarya", location: "Yoga Studio", img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=600", caption: "Breath is life. Pranayama teaches us to control our life force. Inhale peace, exhale stress. #Pranayama #Breathing", likes: 2500 },
        { user: "Organic_Roots", location: "Farmers Market", img: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=600", caption: "Turmeric (Curcumin) is a potent anti-inflammatory. Add black pepper to boost absorption! 🧡 #Turmeric #Spices", likes: 1600 },
        { user: "Sleep_Well", location: "Bedroom", img: "https://images.unsplash.com/photo-1511295742362-92c96b504809?auto=format&fit=crop&q=80&w=600", caption: "Digital Detox before bed. Blue light disrupts melatonin. Read a book instead. 📖 #SleepHygiene #Detox", likes: 900 },
        { user: "Fit_Fusion", location: "Outdoors", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600", caption: "Movement is medicine. Our bodies are designed to move, not sit. Get up and stretch! 🏃‍♂️ #Fitness #Active", likes: 1200 },
        { user: "Raw_Vegan_Love", location: "Kitchen", img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=600", caption: "Green smoothies are the easiest way to get your daily greens. Spinach, apple, ginger, lemon. 🍏 #Smoothie #Green", likes: 1450 },
        { user: "Dr. Vihaan", location: "Library", img: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=600", caption: "Knowledge cancels fear. Understanding your body empowers you to heal yourself. 📚 #Wellness #Education", likes: 2000 },
        { user: "Zen_Garden", location: "Backyard", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600", caption: "Gardening connects you to the earth. Touching soil boosts your microbiome. 🌱 #Gardening #Microbiome", likes: 850 },
        { user: "Hydation_Nation", location: "Mountain", img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=600", caption: "Water is the element of flow. Are you drinking enough? 8 glasses is just a guideline, listen to your body. 💧 #Water #Health", likes: 3100 },
        { user: "Chakra_Balance", location: "Temple", img: "https://images.unsplash.com/photo-1507120410856-1f35574c3b45?auto=format&fit=crop&q=80&w=600", caption: "Balancing the Root Chakra. Ground yourself with red foods and bare feet on the earth. ❤️ #Chakras #Energy", likes: 1150 },
        { user: "Dr. Dhiresh Singh", location: "Forest", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600", caption: "Sunlight is essential for Vitamin D and mood regulation. 20 minutes a day keeps the blues away. ☀️ #Sunlight #VitaminD", likes: 1900 },
        { user: "Er. Shailesh Singh", location: "Gym", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600", caption: "Strength training builds bone density and metabolic health. It's never too late to start lifting. 🏋️‍♂️ #Strength #AgingWell", likes: 950 },
        { user: "Essential_Oils", location: "Home", img: "https://images.unsplash.com/photo-1608514142638-d469797287ce?auto=format&fit=crop&q=80&w=600", caption: "Lavender for relaxation, Peppermint for focus, Eucalyptus for breathing. The power of scent. 🌸 #Aromatherapy #Oils", likes: 1350 },
        { user: "Healthy_Gut", location: "Kitchen", img: "https://images.unsplash.com/photo-1563189140-a6aed881a249?auto=format&fit=crop&q=80&w=600", caption: "Fermented foods like Kimchi and Sauerkraut feed your good gut bacteria. Happy gut, happy brain. 🧠 #GutHealth #Probiotics", likes: 1700 },
        { user: "Dr. Aarya", location: "Studio", img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600", caption: "Restorative Yoga allows the body to heal in stillness. Use props and let go. 🛌 #Rest #Healing", likes: 2200 },
        { user: "Crystal_Clear", location: "Altar", img: "https://images.unsplash.com/photo-1567225557-fff965d96300?auto=format&fit=crop&q=80&w=600", caption: "Quartz crystals amplify energy. Use them in meditation to clarity your intentions. 💎 #Crystals #EnergyWork", likes: 800 },
        { user: "Barefoot_Walker", location: "Grass", img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600", caption: "Earthing: Direct contact with the earth's surface neutralizes free radicals. Take off your shoes! 👣 #Earthing #Grounding", likes: 2600 },
        { user: "Fasting_Focus", location: "Home", img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=600", caption: "Intermittent Fasting gives your digestive system a break and boosts cellular repair (autophagy). 🕰️ #Fasting #Health", likes: 1400 },
        { user: "Prandhara_Official", location: "Headquarters", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600", caption: "At Prandhara, we believe in the wisdom of the body. Trust the process of natural healing. 🌿 #Prandhara #Philosophy", likes: 5000 }
    ];

    function generatePosts(count) { // count is ignored, we use full feedData
        feedContainer.innerHTML = '';

        feedData.forEach((data, index) => {
            const post = document.createElement('article');
            post.className = 'post-card';
            // post.style.visibility = 'hidden'; // Removed to ensure visibility
            post.style.animationName = 'fadeInUp';
            post.style.animationDuration = '0.5s';
            post.style.animationDelay = `${index * 0.1}s`;
            post.style.animationFillMode = 'forwards';

            // Random user seed for avatar if not matched
            const avatarSeed = data.user.replace(/ /g, '');

            post.innerHTML = `
                <div class="post-header">
                    <div class="post-header-left">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}" class="post-avatar" alt="${data.user}">
                        <div>
                            <a href="#" class="post-username">${data.user}</a>
                            <div class="post-location">${data.location}</div>
                        </div>
                    </div>
                    <div class="post-options">•••</div>
                </div>
                
                <div class="post-image-container">
                    <img src="${data.img}" class="post-img" loading="lazy">
                </div>
                
                <div class="post-actions">
                    <div class="post-actions-left">
                        <svg aria-label="Like" class="action-icon like-btn" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                        
                        <svg aria-label="Comment" class="action-icon" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                        
                        <svg aria-label="Share Post" class="action-icon" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                    </div>
                    
                    <svg aria-label="Save" class="action-icon" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                </div>
                
                <div class="post-content">
                    <div class="likes-count">${data.likes.toLocaleString()} likes</div>
                    <div class="caption">
                        <span class="caption-username post-username">${data.user}</span> ${data.caption}
                    </div>
                    <div class="post-time">${Math.floor(Math.random() * 23) + 1} HOURS AGO</div>
                </div>
            `;

            // Like Logic
            const likeBtn = post.querySelector('.like-btn');
            likeBtn.addEventListener('click', function () {
                this.classList.toggle('liked');
                if (this.classList.contains('liked')) {
                    this.setAttribute('fill', '#ed4956');
                    this.setAttribute('color', '#ed4956');
                    const path = this.querySelector('path');
                    // Simple SVG switch usually needs path change, but simpler here:
                    this.innerHTML = '<path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" fill="#ed4956"></path>';
                    // Just using fill change, CSS handles the rest usually
                } else {
                    this.setAttribute('fill', '#262626');
                    this.setAttribute('color', '#262626');
                }
            });

            feedContainer.appendChild(post);
        });
    }
});

// Helper for fading out
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
    to { opacity: 0; transform: scale(0.9); }
}
`;
document.head.appendChild(style);
