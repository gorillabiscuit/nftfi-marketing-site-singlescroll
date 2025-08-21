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
    // Get only the desktop navigation elements (exclude mobile menu)
    const desktopNav = document.querySelector(".nav-items-desktop");
    const mobileNav = document.querySelector(".nav-items-mobile");
    
    if (!desktopNav) {
        console.warn('Desktop navigation not found, header animation disabled');
        return;
    }
    
    // Create a wrapper for just the desktop nav if it doesn't exist
    if (!desktopNav.parentElement.classList.contains('desktop-nav-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'desktop-nav-wrapper';
        desktopNav.parentNode.insertBefore(wrapper, desktopNav);
        wrapper.appendChild(desktopNav);
    }
    
    // Target only the desktop navigation wrapper
    header = document.querySelector(".desktop-nav-wrapper");

    // Create a single global watcher that tracks scroller velocity
    // Works across pinned regions and with ScrollSmoother
    const hide = () => {
        clearTimeout(hideDelay);
        if (!isVisible) return;
        isVisible = false;
        gsap.to(header, { y: -100, duration: 0.3, overwrite: true, ease: 'power2.out' });
    };
    const show = () => {
        clearTimeout(hideDelay);
        if (isVisible) return;
        isVisible = true;
        gsap.to(header, { y: 0, duration: 0.3, overwrite: true, ease: 'power2.out' });
    };

    if (watcher && watcher.kill) {
        try { watcher.kill(); } catch (_) {}
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

    console.log('Header hide/show animation initialized');
}

/**
 * Clean up header animation
 */
export function cleanupHeaderAnimation() {
    if (hideDelay) {
        clearTimeout(hideDelay);
    }
    if (watcher && watcher.kill) {
        try { watcher.kill(); } catch (_) {}
        watcher = null;
    }
    // Reset header position
    if (header) {
        gsap.set(header, { y: 0 });
    }
    
    console.log('Header animation cleaned up');
}
