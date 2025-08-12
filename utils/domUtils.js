// DOM Utilities Module for NFTfi Marketing Site
// Handles DOM-related utilities and event binding

import { recordScrollEvent } from '../controls/scrollSynchronizer.js';

// Debounced texture update function
let textureUpdateTimeout;

export function debouncedTextureUpdate(updatePlaneTexture) {
    clearTimeout(textureUpdateTimeout);
    textureUpdateTimeout = setTimeout(() => {
        updatePlaneTexture();
    }, 250); // Wait 250ms after resize stops
}

// Window resize handler
export function createWindowResizeHandler(onThreeJSResize, updatePlaneForViewport, updatePlaneTexture) {
    return function onWindowResize() {
        // Use modular resize handler
        onThreeJSResize();
        
        // Update plane position for new viewport
        updatePlaneForViewport();
        
        // Debounced texture update
        debouncedTextureUpdate(updatePlaneTexture);
    };
}

/**
 * Add event listeners for the application
 */
export function addEventListeners(onWindowResize) {
    // Window resize event
    window.addEventListener('resize', onWindowResize);
    
    // NEW: Add scroll event monitoring for performance tracking
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Record scroll event for performance monitoring
        recordScrollEvent();
        
        // Debounce scroll events to prevent excessive performance monitoring
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Additional scroll processing can go here if needed
        }, 16); // ~60fps
    }, { passive: true }); // Use passive listener for better performance
    
    // Mouse movement for 3D model interaction
    window.addEventListener('mousemove', (event) => {
        if (!window.mouseInfluence) return;
        
        // Calculate normalized mouse position (-1 to 1)
        const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;
        
        // Apply influence with smoothing
        window.mouseInfluence.x += (normalizedX - window.mouseInfluence.x) * 0.1;
        window.mouseInfluence.y += (normalizedY - window.mouseInfluence.y) * 0.1;
        
        // Store last mouse position
        window.lastMousePos = { x: event.clientX, y: event.clientY };
    });
    
    // Touch events for mobile devices
    window.addEventListener('touchmove', (event) => {
        if (!window.mouseInfluence || event.touches.length === 0) return;
        
        const touch = event.touches[0];
        const normalizedX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = (touch.clientY / window.innerHeight) * 2 - 1;
        
        // Apply touch influence with different sensitivity
        window.mouseInfluence.x += (normalizedX - window.mouseInfluence.x) * 0.05;
        window.mouseInfluence.y += (normalizedY - window.mouseInfluence.y) * 0.05;
        
        // Store last touch position
        window.lastMousePos = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    
    // Keyboard events for debugging
    window.addEventListener('keydown', (event) => {
        // Debug key: 'S' to toggle ScrollSmoother
        if (event.key.toLowerCase() === 's' && event.ctrlKey) {
            event.preventDefault();
            if (window.scrollSmoother) {
                const status = window.scrollSmoother.status();
                if (status.isEnabled) {
                    window.scrollSmoother.disable();
                    console.log('🔄 ScrollSmoother disabled via keyboard shortcut');
                } else {
                    window.scrollSmoother.enable();
                    console.log('🔄 ScrollSmoother enabled via keyboard shortcut');
                }
            }
        }
        
        // Debug key: 'T' to test ScrollSmoother
        if (event.key.toLowerCase() === 't' && event.ctrlKey) {
            event.preventDefault();
            if (window.scrollSmoother) {
                window.scrollSmoother.test();
            }
        }
        
        // Debug key: 'E' for emergency disable
        if (event.key.toLowerCase() === 'e' && event.ctrlKey) {
            event.preventDefault();
            if (window.scrollSmoother) {
                window.scrollSmoother.emergency();
                console.log('🚨 Emergency ScrollSmoother disable triggered');
            }
        }
    });
    
    console.log('Event listeners added successfully');
} 