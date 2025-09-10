// Header Animation Module for NFTfi Marketing Site
// Handles hiding/showing the top navigation menu based on scroll direction

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Header animation variables
let header = null;
let hideDelay;
let watcher; // global ScrollTrigger watcher
let isVisible = true; // track state to avoid redundant tweens

/**
 * Initialize header hide/show animation
 */
export function initHeaderAnimation() {
    // Get desktop navigation elements and CTA button (exclude mobile menu)
    const desktopNav = document.querySelector(".nav-items-desktop");
    const ctaButton = document.querySelector(".nav-cta-btn-wrapper");
    const mobileNav = document.querySelector(".nav-items-mobile");
    
    if (!desktopNav) {
        console.warn('Desktop navigation not found, header animation disabled');
        return;
    }
    
    // Target both desktop nav and CTA button for animation
    const elementsToAnimate = [desktopNav];
    if (ctaButton) {
        elementsToAnimate.push(ctaButton);
        console.log('CTA button found and added to header animation');
    } else {
        console.warn('CTA button not found for header animation');
    }
    
    header = elementsToAnimate;

    // Create a single global watcher that tracks scroller velocity
    // Works across pinned regions and with ScrollSmoother
    const hide = () => {
        clearTimeout(hideDelay);
        if (!isVisible) return;
        isVisible = false;
        // Animate all elements in the header array
        header.forEach(element => {
            gsap.to(element, { y: -100, duration: 0.3, overwrite: true, ease: 'power2.out' });
        });
    };
    const show = () => {
        clearTimeout(hideDelay);
        if (isVisible) return;
        isVisible = true;
        // Animate all elements in the header array
        header.forEach(element => {
            gsap.to(element, { y: 0, duration: 0.3, overwrite: true, ease: 'power2.out' });
        });
    };

    if (watcher && watcher.kill) {
        try { watcher.kill(); } catch (_) {
            // Ignore watcher kill errors
        }
        watcher = null;
    }

    watcher = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
            const v = self.getVelocity(); // >0 down, <0 up
            // Lower threshold to account for ScrollSmoother easing
            if (v > 1) hide();
            else if (v < -1) show();
        }
    });

    console.log(`Header hide/show animation initialized for ${header.length} elements`);
}

/**
 * Clean up header animation
 */
export function cleanupHeaderAnimation() {
    if (hideDelay) {
        clearTimeout(hideDelay);
    }
    if (watcher && watcher.kill) {
        try { watcher.kill(); } catch (_) {
            // Ignore watcher kill errors
        }
        watcher = null;
    }
    // Reset header position
    if (header) {
        gsap.set(header, { y: 0 });
    }
    
    console.log('Header animation cleaned up');
}
