/**
 * Vital Feed Controller
 * Handles vertical scrolling, lazy loading, and calm educational content generation.
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('vital-feed-container');
    if (!container) return;

    // --- Content Data ---
    const feedPosts = [
        {
            category: 'Morning Routine',
            title: 'Sunlight & Circadian Rhythms',
            description: 'Exposing your eyes to natural sunlight within 30 minutes of waking triggers cortisol release, setting your body clock for better sleep tonight.',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop',
            author: 'Dr. Dhiresh Singh',
            location: 'Nature\'s Light',
            avatar: 'assets/dr_dhiresh_profile.jpg'
        },
        {
            category: 'Yoga',
            title: 'Child’s Pose (Balasana)',
            description: 'A gentle resting pose that stretches the hips, thighs, and ankles while reducing stress and fatigue. Return to nature\'s embrace.',
            image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1000&auto=format&fit=crop',
            author: 'Er. Shailesh Singh',
            location: 'Inner Peace Studio',
            avatar: 'assets/er_shailesh_profile.jpg'
        },
        {
            category: 'Diet & Nutrition',
            title: 'The Power of Hydration',
            description: 'Water is the essence of life. Starting your day with warm lemon water can kickstart digestion and flush out toxins accumulated overnight.',
            image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1000&auto=format&fit=crop',
            author: 'Nutritionist Vihaan',
            location: 'Wellness Kitchen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vihaan'
        },
        {
            category: 'Mindfulness',
            title: 'Box Breathing Technique',
            description: 'Inhale for 4, hold for 4, exhale for 4, hold for 4. A simple technique to effecticely reset your nervous system during high stress.',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop', // Reusing nature img for calm
            author: 'Dr. Aarya',
            location: 'Mindful Space',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarya'
        },
        {
            category: 'Herbal Wisdom',
            title: 'Tulsi: The Queen of Herbs',
            description: 'Holy Basil (Tulsi) is an adaptogen that helps the body adapt to stress and promotes mental balance. Enjoy as a warm tea.',
            image: 'https://images.unsplash.com/photo-1515595967223-f9fa59af5a3b?q=80&w=1000&auto=format&fit=crop',
            author: 'Herbalist Tara',
            location: 'Herb Garden',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tara'
        },
        {
            category: 'Sleep Hygiene',
            title: 'Digital Sunset',
            description: 'Turn off screens 1 hour before bed. Blue light suppresses melatonin, the hormone that tells your body it is time to sleep.',
            image: 'https://images.unsplash.com/photo-1511295742362-92c96b504809?q=80&w=1000&auto=format&fit=crop',
            author: 'Sleep Coach Joe',
            location: 'Dream Lab',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joe'
        },
        {
            category: 'Movement',
            title: 'Earthing / Grounding',
            description: 'Walking barefoot on grass or soil allows free electrons from the earth to neutralize free radicals in the body, reducing inflammation.',
            image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000&auto=format&fit=crop',
            author: 'Dr. Dhiresh Singh',
            location: 'Park Ground',
            avatar: 'assets/dr_dhiresh_profile.jpg'
        },
        {
            category: 'Detox',
            title: 'Intermittent Fasting',
            description: 'Giving your digestive system a 12-16 hour break allows your body to focus on cellular repair and autophagy.',
            image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1000&auto=format&fit=crop',
            author: 'Er. Shailesh Singh',
            location: 'Prandhara Clinic',
            avatar: 'assets/er_shailesh_profile.jpg'
        },
        {
            category: 'Mental Health',
            title: 'Journaling for Clarity',
            description: 'Writing down your thoughts can declutter your mind and reduce anxiety. Try simply listing 3 things you are grateful for today.',
            image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop',
            author: 'Wellness Coach',
            location: 'Study',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coach'
        },
        {
            category: 'Therapy',
            title: 'Hydrotherapy: Contrast Showers',
            description: 'Alternating between hot and cold water boosts circulation, immunity, and energy levels. Always end with cold!',
            image: 'https://images.unsplash.com/photo-1570539126305-64d1f2b23a96?q=80&w=1000&auto=format&fit=crop',
            author: 'Dr. Vihaan',
            location: 'Spa Center',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vihaan'
        }
    ];

    // --- Render Logic ---
    let observer;

    function init() {
        // Observer for fade-in animation
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        renderFeed();
    }

    function renderFeed() {
        feedPosts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'vf-feed-item';

            article.innerHTML = `
                <div class="vf-post-header">
                    <img src="${post.avatar}" class="vf-avatar" alt="${post.author}">
                    <div class="vf-author-info">
                        <h4>${post.author}</h4>
                        <div class="vf-location">${post.location}</div>
                    </div>
                </div>
                
                <div class="vf-post-img-wrapper">
                    <img src="${post.image}" class="vf-post-img" loading="lazy" alt="${post.title}">
                </div>
                
                <div class="vf-post-content">
                    <div class="vf-tags">
                        <span class="vf-tag">${post.category}</span>
                    </div>
                    <h3 class="vf-post-title">${post.title}</h3>
                    <p class="vf-post-desc">${post.description}</p>
                    
                    <div class="vf-actions">
                        <span class="vf-read-more">Read Insight &rarr;</span>
                        <div class="vf-icons">
                            <span>💚</span>
                            <span>🔖</span>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(article);
            observer.observe(article);
        });

        // Add infinite scroll loader indicator
        const loader = document.createElement('div');
        loader.className = 'vf-loader';
        loader.innerHTML = 'All caught up with wellness.';
        container.appendChild(loader);
    }

    init();
});
