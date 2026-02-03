// Vital Feed Logic
// Handles fetching posts from API and infinite scrolling

let currentPage = 1;
let isLoading = false;
let hasMore = true;

const feedContainer = document.getElementById('feed-stream');
const loadingIndicator = document.getElementById('loading-indicator');
const endMessage = document.getElementById('end-message');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupInfiniteScroll();
});

// --- Fetch Posts ---
async function loadPosts() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    loadingIndicator.classList.remove('hidden');

    try {
        const response = await fetch(`/api/vital-feed?page=${currentPage}`);
        const data = await response.json();

        if (data.success) {
            if (data.data.length > 0) {
                renderPosts(data.data);
                currentPage++;
            }

            hasMore = data.hasMore;

            if (!hasMore) {
                endMessage.classList.remove('hidden');
            }
        }
    } catch (err) {
        console.error("Error loading feed:", err);
    } finally {
        isLoading = false;
        loadingIndicator.classList.add('hidden');
    }
}

// --- Render Logic ---
function renderPosts(posts) {
    posts.forEach((post, index) => {
        const card = document.createElement('article');
        card.className = 'feed-card';

        // Format Date
        const date = new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric'
        });

        card.innerHTML = `
            <div class="feed-card-header">
                <span class="feed-category">${post.category}</span>
                <span class="post-time">${date}</span>
            </div>
            <div class="feed-image-wrapper">
                <img src="${post.image}" alt="${post.title}" class="feed-image" loading="lazy">
            </div>
            <div class="feed-content">
                <h2 class="feed-title">${post.title}</h2>
                <p class="feed-desc">${post.description}</p>
            </div>
        `;

        feedContainer.appendChild(card); // Append to bottom

        // Trigger animation after brief delay
        // We use requestAnimationFrame or simple timeout
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * (index % 5)); // Stagger effect
    });
}

// --- Infinite Scroll ---
function setupInfiniteScroll() {
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        // Check if we are near bottom (within 100px)
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadPosts();
        }
    });
}
