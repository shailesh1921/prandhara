/**
 * Vital Flow Controller
 * Handles the river-like horizontal scrolling, categories, and content generation.
 */

class VitalFlow {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return; // Guard clause

        this.categories = [
            { id: 'kids', title: 'Yoga for Children', icon: '🎈', theme: 'Playful & Focus' },
            { id: 'pregnant', title: 'Prenatal Yoga', icon: '🤰', theme: 'Gentle & Support' },
            { id: 'senior', title: 'Yoga for Seniors', icon: '👴', theme: 'Mobility & Balance' },
            { id: 'therapeutic', title: 'Therapeutic Yoga', icon: '🌿', theme: 'Healing & Relief' },
            { id: 'wellness', title: 'Daily Wellness', icon: '☀️', theme: 'Energy & Flow' },
            { id: 'stress', title: 'Stress Relief', icon: '🧘', theme: 'Calm & Peace' }
        ];

        this.init();
    }

    init() {
        this.renderStructure();
        this.attachEvents();
    }

    renderStructure() {
        this.container.innerHTML = `
            <div class="vf-header">
                <h2>Vital Flow</h2>
                <p>Select a path to explore the river of wellness.</p>
            </div>
            <div class="vf-category-container" id="vf-categories">
                <!-- Categories injected here -->
            </div>
        `;

        const catContainer = document.getElementById('vf-categories');
        this.categories.forEach(cat => {
            const catEl = document.createElement('div');
            catEl.className = 'vf-category-card';
            catEl.dataset.id = cat.id;
            
            catEl.innerHTML = `
                <div class="vf-category-header">
                    <span class="vf-cat-title"><span class="vf-icon">${cat.icon}</span> ${cat.title}</span>
                    <span class="vf-arrow">▼</span>
                </div>
                <div class="vf-feed-wrapper">
                    <div class="vf-river-track-container" id="track-container-${cat.id}">
                        <div class="vf-river-track" id="track-${cat.id}">
                            <!-- Cards will flow here -->
                        </div>
                    </div>
                </div>
            `;
            catContainer.appendChild(catEl);
            
            // Generate content for this category
            this.generatecontent(cat.id, cat.theme);
        });
    }

    generatecontent(catId, theme) {
        const track = document.getElementById(`track-${catId}`);
        const slogans = [
            "Breathe Deeply", "Find Balance", "Gentle Movement", "Inner Peace", 
            "Nature's Rhythm", "Healing Flow", "Mindful Moment", "Soft Strength", 
            "Root to Rise", "Quiet Mind"
        ];
        
        // Generate 10 cards + 5 duplicates for infinite loop illusion
        for (let i = 1; i <= 15; i++) {
            const card = document.createElement('div');
            card.className = 'vf-card';
            // Slight randomness in float delay
            card.style.animationDelay = `${Math.random() * 2}s`;
            
            card.innerHTML = `
                <div class="vf-card-icon">🍃</div>
                <h3 class="vf-card-title">${theme} • Tip ${i > 10 ? i - 10 : i}</h3>
                <p class="vf-card-desc">${slogans[(i-1)%10]}. Consistent practice nurtures the soul and heals the body.</p>
            `;
            track.appendChild(card);
        }
    }

    attachEvents() {
        const headers = document.querySelectorAll('.vf-category-header');
        headers.forEach(header => {
            header.addEventListener('click', (e) => {
                const card = header.parentElement;
                const isActive = card.classList.contains('active');
                
                // Close all
                document.querySelectorAll('.vf-category-card').forEach(c => {
                    c.classList.remove('active');
                    this.stopScroll(c.dataset.id); // Stop animation for closed
                });

                // Toggle current
                if (!isActive) {
                    card.classList.add('active');
                    this.startScroll(card.dataset.id);
                }
            });
        });
    }

    // --- Animation Logic ---
    // Instead of complex JS animation frame which is heavy, we'll use a smart CSS transform 
    // manipulation or requestAnimationFrame for the "active" list only.
    
    startScroll(catId) {
        const track = document.getElementById(`track-${catId}`);
        const container = document.getElementById(`track-container-${catId}`);
        
        // Reset position
        let pos = 0;
        let isPaused = false;
        let animationId;

        // Mouse Hover Pause
        container.addEventListener('mouseenter', () => isPaused = true);
        container.addEventListener('mouseleave', () => isPaused = false);

        const step = () => {
            if (!document.querySelector(`.vf-category-card[data-id="${catId}"]`).classList.contains('active')) {
                cancelAnimationFrame(animationId);
                return;
            }

            if (!isPaused) {
                pos -= 0.5; // Speed
                // Infinite Loop Reset Logic (Simplified)
                // Assuming cards width ~ 300px * 10 = 3000px.
                // Reset when we've scrolled past the first batch
                if (Math.abs(pos) > 3000) { 
                    pos = 0;
                }
                track.style.transform = `translateX(${pos}px)`;
            }
            animationId = requestAnimationFrame(step);
        };

        // Only start if not mobile (mobile uses native scroll)
        if (window.innerWidth > 768) {
            animationId = requestAnimationFrame(step);
        }
    }

    stopScroll(catId) {
        // IDs handled inside step() check
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Look for the hook
    const hook = document.getElementById('feed-view');
    if (hook) {
        console.log("Vital Flow Initializing...");
        // Clear existing feed content from script.js
        hook.innerHTML = '<div id="vital-flow-section"></div>';
        new VitalFlow('vital-flow-section');
    }
});
