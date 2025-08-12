// Text Effects Module for NFTfi Marketing Site
// Handles scroll-triggered text animations using proper GSAP functionality

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Store original text content
const originalTexts = new Map();

/**
 * Initialize scroll-triggered scramble reveal for stats numbers
 */
export function initStatsScrambleReveal() {
    const statsNumbers = document.querySelectorAll('.stats .number');
    const statsLabels = document.querySelectorAll('.stats .label');
    
    if (!statsNumbers.length) {
        console.warn('No stats numbers found for scramble reveal');
        return;
    }

    // Store original text content and set initial state
    statsNumbers.forEach((number, index) => {
        originalTexts.set(number, number.textContent);
        
        // Set initial state - invisible
        number.style.opacity = '0';
        number.style.visibility = 'hidden';
    });

    // Hide labels initially with bottom offset
    statsLabels.forEach((label) => {
        label.style.opacity = '0';
        label.style.visibility = 'hidden';
        label.style.transform = 'translateY(10px)';
    });

    // Create a single scroll trigger for the stats container
    const statsContainer = document.querySelector('.stats');
    if (statsContainer) {
        ScrollTrigger.create({
            trigger: statsContainer,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => revealAllStatsSequentially(statsNumbers, statsLabels),
            onEnterBack: () => revealAllStatsSequentially(statsNumbers, statsLabels),
            onLeave: () => hideAllStats(statsNumbers, statsLabels),
            onLeaveBack: () => hideAllStats(statsNumbers, statsLabels)
        });
    }

    console.log('Stats scramble reveal initialized');
}

/**
 * Reveal all stats sequentially using proper GSAP timeline
 */
function revealAllStatsSequentially(statsNumbers, statsLabels) {
    // Create a master timeline
    const tl = gsap.timeline();
    
    statsNumbers.forEach((number, index) => {
        const originalText = originalTexts.get(number);
        const label = statsLabels[index];
        if (!originalText) return;

        // Step 1: Show label first
        tl.to(label, {
            duration: 0.5,
            opacity: 1,
            visibility: 'visible',
            y: 0,
            ease: 'power2.out'
        })
        // Step 2: Make number visible and animate it in with scramble effect
        .set(number, {
            opacity: 1,
            visibility: 'visible',
            text: generateRandomText(originalText.length),
            delay:0.5

            
        })
        .to(number, {
            duration: 1.5,
            text: originalText,
            ease: 'none',
            onUpdate: function() {
                const progress = this.progress();
                const currentIndex = Math.floor(progress * originalText.length);
                
                if (currentIndex < originalText.length) {
                    const revealedPart = originalText.substring(0, currentIndex + 1);
                    const remainingLength = originalText.length - currentIndex - 1;
                    const randomPart = generateRandomText(remainingLength);
                    number.textContent = revealedPart + randomPart;
                } else {
                    number.textContent = originalText;
                }
            }
        })
        // Step 3: Add delay before next label (except for the last one)
        .to({}, {
            duration: 0.25,
            ease: 'none'
        });
    });
}

/**
 * Generate random text of specified length
 */
function generateRandomText(length) {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Hide all stats
 */
function hideAllStats(statsNumbers, statsLabels) {
    // Hide numbers
    statsNumbers.forEach((number) => {
        gsap.to(number, {
            duration: 0.3,
            opacity: 0,
            visibility: 'hidden',
            ease: 'power2.in'
        });
    });

    // Hide labels
    statsLabels.forEach((label) => {
        gsap.to(label, {
            duration: 0.3,
            opacity: 0,
            visibility: 'hidden',
            ease: 'power2.in'
        });
    });
}

/**
 * Initialize text reveal effect for section headings
 */
export function initHeadingReveal() {
    const headings = document.querySelectorAll('h1, h2, h3');
    
    headings.forEach((heading, index) => {
        // Store original text
        originalTexts.set(heading, heading.textContent);
        
        // Set initial state
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(30px)';
        
        // Create scroll trigger
        ScrollTrigger.create({
            trigger: heading,
            start: 'top 85%',
            onEnter: () => revealHeading(heading, index),
            onEnterBack: () => revealHeading(heading, index)
        });
    });
}

/**
 * Reveal a heading with fade and slide effect
 */
function revealHeading(heading, index) {
    gsap.to(heading, {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: index * 0.1
    });
}

/**
 * Clean up all text effects
 */
export function cleanupTextEffects() {
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.onEnter || trigger.vars.onEnterBack) {
            trigger.kill();
        }
    });
    
    // Reset all elements to their original state
    originalTexts.forEach((originalText, element) => {
        if (element && element.textContent !== originalText) {
            element.textContent = originalText;
            element.style.opacity = '';
            element.style.transform = '';
        }
    });
    
    originalTexts.clear();
    console.log('Text effects cleaned up');
} 