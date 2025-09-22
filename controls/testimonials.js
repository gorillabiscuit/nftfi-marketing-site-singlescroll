// Testimonials Module for Section 5
// Handles loading and rendering of testimonial cards from JSON data

import { getCurrentBreakpoint } from '../utils/breakpointManager.js';
import { SECTION5_LAYOUT } from '../config/index.js';

/**
 * Fetch random profile pictures from randomuser.me API
 */
async function fetchRandomProfilePictures(count) {
    if (count === undefined) count = 18;
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch profile pictures: ${response.status}`);
        }
        const data = await response.json();
        console.log('[Testimonials] Fetched profile pictures:', data.results.map(u => u.picture.large));
        return data.results.map(user => ({
            large: user.picture.large,
            medium: user.picture.medium,
            thumbnail: user.picture.thumbnail
        }));
    } catch (error) {
        console.error('Error fetching profile pictures:', error);
        return [];
    }
}

/**
 * Load testimonials data from JSON file and populate with random profile pictures
 */
async function loadTestimonials() {
    try {
        // Load testimonials data
        const response = await fetch('/data/testimonials.json');
        if (!response.ok) {
            throw new Error(`Failed to load testimonials: ${response.status}`);
        }
        const data = await response.json();
        
        // Fetch random profile pictures
        const profilePictures = await fetchRandomProfilePictures(data.testimonials.length);
        
        // Combine testimonials with random profile pictures
        const testimonialsWithPictures = data.testimonials.map((testimonial, index) => ({
            ...testimonial,
            profilePicture: profilePictures[index]?.large || testimonial.profilePicture,
            profilePictureSet: profilePictures[index] || null
        }));
        
        return testimonialsWithPictures;
    } catch (error) {
        console.error('Error loading testimonials:', error);
        return [];
    }
}

/**
 * Generate user initials from name for avatar fallback
 */
function generateInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Create a testimonial card element
 */
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.setAttribute('data-testimonial-id', testimonial.id);
    
    // Generate initials for avatar fallback
    const initials = generateInitials(testimonial.name);
    
    card.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar" data-initials="${initials}">
                <!-- Avatar image will be loaded if available -->
            </div>
            <div class="testimonial-info">
                <div class="testimonial-name">${testimonial.name}</div>
                <div class="testimonial-handle">${testimonial.handle}</div>
            </div>
        </div>
        <div class="testimonial-content">${testimonial.tweet}</div>
    `;
    
    // Try to load avatar image (prioritize random profile picture)
    const avatarEl = card.querySelector('.testimonial-avatar');
    const img = new Image();
    
    // Add loading class for better UX
    avatarEl.classList.add('loading');
    
    img.onload = () => {
        avatarEl.classList.remove('loading');
        avatarEl.innerHTML = '';
        avatarEl.appendChild(img);
        console.log(`[Testimonials] Loaded avatar for ${testimonial.name}`);
    };
    
    img.onerror = () => {
        avatarEl.classList.remove('loading');
        console.log(`[Testimonials] Avatar image failed for ${testimonial.name}, using initials fallback`);
    };
    
    // Use the random profile picture if available, otherwise fall back to original
    img.src = testimonial.profilePicture;
    img.alt = `${testimonial.name} avatar`;
    
    return card;
}

/**
 * Distribute testimonials across two rows
 */
function distributeTestimonials(testimonials) {
    // Shuffle testimonials for variety
    const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
    
    // Get current breakpoint to determine card count
    const breakpointKey = getCurrentBreakpoint();
    const layoutConfig = SECTION5_LAYOUT[breakpointKey];
    
    // Determine how many cards to show based on tile sizes and viewport
    const viewportWidth = window.innerWidth;
    const topTileSize = layoutConfig?.topRowTileSize || 320;
    const bottomTileSize = layoutConfig?.bottomRowTileSize || 240;
    const gapSize = 32; // 2rem gap from CSS
    
    // Calculate how many cards fit per row (with generous overflow for scrolling effect)
    // Use a higher multiplier to ensure enough cards for smooth scrolling
    const scrollMultiplier = 3.0; // Increased from 1.5 to ensure more cards
    const topRowCount = Math.max(8, Math.ceil((viewportWidth * scrollMultiplier) / (topTileSize + gapSize)));
    const bottomRowCount = Math.max(8, Math.ceil((viewportWidth * scrollMultiplier) / (bottomTileSize + gapSize)));
    
    console.log('[Testimonials] Card distribution:', {
        viewportWidth,
        topTileSize,
        bottomTileSize,
        topRowCount,
        bottomRowCount,
        breakpointKey
    });
    
    // Ensure we have enough testimonials by cycling through them
    const topRowTestimonials = [];
    const bottomRowTestimonials = [];
    
    for (let i = 0; i < topRowCount; i++) {
        topRowTestimonials.push(shuffled[i % shuffled.length]);
    }
    
    for (let i = 0; i < bottomRowCount; i++) {
        bottomRowTestimonials.push(shuffled[(i + topRowCount) % shuffled.length]);
    }
    
    return {
        topRow: topRowTestimonials,
        bottomRow: bottomRowTestimonials
    };
}

/**
 * Render testimonials in the specified container
 */
function renderTestimonials(testimonials, container) {
    // Clear existing content
    container.innerHTML = '';
    
    // Create and append testimonial cards
    testimonials.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        container.appendChild(card);
    });
}

/**
 * Initialize testimonials in Section 5
 */
export async function initializeTestimonials() {
    console.log('[Testimonials] Initializing testimonials system');
    
    // Find testimonial containers
    const topRowContainer = document.querySelector('.tiles-row-1');
    const bottomRowContainer = document.querySelector('.tiles-row-2');
    
    if (!topRowContainer || !bottomRowContainer) {
        console.error('[Testimonials] Testimonial containers not found');
        return false;
    }
    
    try {
        // Load testimonials data
        const testimonials = await loadTestimonials();
        
        if (testimonials.length === 0) {
            console.warn('[Testimonials] No testimonials loaded');
            return false;
        }
        
        console.log(`[Testimonials] Loaded ${testimonials.length} testimonials`);
        
        // Distribute testimonials across rows
        const distribution = distributeTestimonials(testimonials);
        
        // Render testimonials
        renderTestimonials(distribution.topRow, topRowContainer);
        renderTestimonials(distribution.bottomRow, bottomRowContainer);
        
        console.log('[Testimonials] Testimonials rendered successfully');
        
        // Set up responsive handling
        setupResponsiveTestimonials(testimonials);
        
        return true;
        
    } catch (error) {
        console.error('[Testimonials] Failed to initialize testimonials:', error);
        return false;
    }
}

/**
 * Handle responsive updates for testimonials
 */
function setupResponsiveTestimonials(testimonials) {
    let resizeTimeout;
    
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('[Testimonials] Handling responsive update');
            
            const topRowContainer = document.querySelector('.tiles-row-1');
            const bottomRowContainer = document.querySelector('.tiles-row-2');
            
            if (topRowContainer && bottomRowContainer) {
                const distribution = distributeTestimonials(testimonials);
                renderTestimonials(distribution.topRow, topRowContainer);
                renderTestimonials(distribution.bottomRow, bottomRowContainer);
            }
        }, 250); // Debounce resize events
    };
    
    window.addEventListener('resize', handleResize);
    
    // Also listen for breakpoint changes if available
    if (window.onStateChange) {
        window.onStateChange(handleResize);
    }
}

/**
 * Update testimonials for new breakpoint
 */
export function updateTestimonialsForBreakpoint() {
    // This function can be called externally when breakpoints change
    const event = new Event('resize');
    window.dispatchEvent(event);
}

// Export for external access
export { loadTestimonials, createTestimonialCard, distributeTestimonials };
