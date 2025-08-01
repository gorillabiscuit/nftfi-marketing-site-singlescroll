// Scroll Trigger Module for NFTfi Marketing Site
// Handles all scroll-related animations and GSAP ScrollTrigger functionality

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MODEL_CONFIG, TARGET_CONFIG } from '../config.js';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Scroll animation variables
let scrollTimeline;
let originalWrapperPosition = { x: 0, y: 0, z: 0 };
let originalWrapperScale = { x: 3, y: 3, z: 3 };

// Scroll spin tracking variables
let scrollSpinVelocity = 0;
let lastScrollDirection = 0;
let lastScrollTime = 0;

// Wrapper reference
let wrapper;

// Position calculation functions (will be passed from main.js)
let calculateStartPosition;
let calculateTargetPosition;

// Set up scroll-triggered animation
export function setupScrollAnimation(wrapperInstance, startPositionFn, targetPositionFn) {
    // Store references
    wrapper = wrapperInstance;
    calculateStartPosition = startPositionFn;
    calculateTargetPosition = targetPositionFn;
    
    if (!wrapper) return;
    
    // Store original position and scale
    originalWrapperPosition = {
        x: wrapper.position.x,
        y: wrapper.position.y,
        z: wrapper.position.z
    };
    originalWrapperScale = {
        x: wrapper.scale.x,
        y: wrapper.scale.y,
        z: wrapper.scale.z
    };
    
    // Create scroll timeline
    scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".section[data-section='1']",
            start: "top top",
            end: "bottom top",
            scrub: MODEL_CONFIG.scrubDuration, // Smooth scrubbing
            onUpdate: (self) => {
                // Update Three.js wrapper position and scale based on scroll progress
                const progress = self.progress;
                
                // Track scroll direction for spin animation
                const scrollDirection = self.direction || 0;
                updateScrollSpin(scrollDirection);
                
                // Calculate dynamic target position based on current viewport
                const dynamicTarget = calculateTargetPosition();
                
                // Calculate starting position for interpolation
                const startPos = calculateStartPosition();
                
                // Interpolate position using dynamic target values
                wrapper.position.x = gsap.utils.interpolate(
                    startPos.x, 
                    dynamicTarget.x, 
                    progress
                );
                
                // Store the target Y position for scroll animation (floating will add offset)
                wrapper.userData.targetY = gsap.utils.interpolate(
                    startPos.y, 
                    dynamicTarget.y, 
                    progress
                );
                
                wrapper.position.z = gsap.utils.interpolate(
                    startPos.z, 
                    dynamicTarget.z, // Use Z from calculateTargetPosition()
                    progress
                );
                
                // Interpolate scale using dynamic target scale
                const currentScale = gsap.utils.interpolate(
                    MODEL_CONFIG.startScale, 
                    dynamicTarget.scale, 
                    progress
                );
                wrapper.scale.setScalar(currentScale);
                
                // console.log('Scroll animation progress:', progress, 'Scale:', currentScale, 'Target:', dynamicTarget, 'Spin velocity:', scrollSpinVelocity);
            }
        }
    });
    
    // console.log('Scroll animation setup complete');
}

// Reset scroll animation to original position
export function resetScrollAnimation() {
    if (wrapper && scrollTimeline) {
        wrapper.position.set(
            originalWrapperPosition.x,
            originalWrapperPosition.y,
            originalWrapperPosition.z
        );
        wrapper.scale.set(
            originalWrapperScale.x,
            originalWrapperScale.y,
            originalWrapperScale.z
        );
        // Clear the target Y data to stop scroll animation influence
        delete wrapper.userData.targetY;
        // console.log('Scroll animation reset to original position');
    }
}

// Track scroll events for spin animation
export function updateScrollSpin(direction) {
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime;
    
    // Update spin velocity based on scroll direction
    if (direction !== 0) {
        scrollSpinVelocity += direction * MODEL_CONFIG.spinIntensity;
        lastScrollDirection = direction;
    }
    
    // Apply decay over time
    if (timeDelta > 16) { // Only decay every ~16ms (60fps)
        scrollSpinVelocity *= MODEL_CONFIG.spinDecay;
        lastScrollTime = currentTime;
    }
}

// Get current scroll spin velocity for use in animation loop
export function getScrollSpinVelocity() {
    return scrollSpinVelocity;
}

// Clean up ScrollTrigger when needed
export function cleanupScrollTrigger() {
    if (scrollTimeline) {
        scrollTimeline.kill();
        scrollTimeline = null;
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
} 