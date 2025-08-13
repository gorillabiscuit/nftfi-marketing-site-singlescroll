// Header Animation Module for NFTfi Marketing Site
// Handles hiding/showing the top navigation menu based on scroll direction

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Header animation variables
let header = null;
let lastY = 0;
let ticking = false;
let hideDelay;

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

    // Get ScrollSmoother instance
    const smoother = window.smoother;
    
    if (!smoother) {
        console.warn('ScrollSmoother not available, header animation disabled');
        return;
    }

    // Initialize last scroll position
    lastY = smoother.scrollTop();

    // Create ScrollTrigger for header animation
    ScrollTrigger.create({
        onUpdate: () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentY = smoother.scrollTop();
                    const direction = currentY > lastY ? "down" : "up";
                    lastY = currentY;

                    clearTimeout(hideDelay);

                    if (direction === "down") {
                        // Hide header by sliding up - use absolute Y value
                        gsap.to(header, { 
                            y: -100, // Move 100px up (adjust this value as needed)
                            duration: 0.3, 
                            overwrite: true,
                            ease: "power2.out"
                        });
                    } else {
                        // Show header by sliding down
                        gsap.to(header, { 
                            y: 0, // Return to original position
                            duration: 0.3, 
                            overwrite: true,
                            ease: "power2.out"
                        });
                    }

                    // Debounce so tiny scroll jiggles don't trigger toggling
                    hideDelay = setTimeout(() => {
                        ticking = false;
                    }, 100);

                    ticking = true;
                });
            }
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
    
    // Reset header position
    if (header) {
        gsap.set(header, { y: 0 });
    }
    
    console.log('Header animation cleaned up');
}
