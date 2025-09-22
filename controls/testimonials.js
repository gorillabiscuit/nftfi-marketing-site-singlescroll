// Testimonials Module for Section 5
// Handles loading and rendering of testimonial cards from JSON data

import { getCurrentBreakpoint } from '../utils/breakpointManager.js';
import { SECTION5_LAYOUT } from '../config/index.js';

/**
 * Load testimonials data from JSON file
 */
async function loadTestimonials() {
    try {
        const response = await fetch('/data/testimonials.json');
        if (!response.ok) {
            throw new Error(`Failed to load testimonials: ${response.status}`);
        }
        const data = await response.json();
        return data.testimonials;
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
        <div class="testimonial-date">${testimonial.dateTime}</div>
    `;
    
    // Try to load avatar image
    const avatarEl = card.querySelector('.testimonial-avatar');
    const img = new Image();
    img.onload = () => {
        avatarEl.innerHTML = '';
        avatarEl.appendChild(img);
    };
    img.onerror = () => {
        // Keep initials fallback if image fails to load
        console.log(`Avatar image not found for ${testimonial.name}, using initials`);
    };
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
    
    // Calculate how many cards fit per row (with some overflow for scrolling effect)
    const topRowCount = Math.ceil((viewportWidth * 1.5) / (topTileSize + gapSize));
    const bottomRowCount = Math.ceil((viewportWidth * 1.5) / (bottomTileSize + gapSize));
    
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
