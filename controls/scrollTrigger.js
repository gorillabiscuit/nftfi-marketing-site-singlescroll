// Scroll Trigger Module for NFTfi Marketing Site
// Handles all scroll-related animations and GSAP ScrollTrigger functionality

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MODEL_CONFIG, TARGET_CONFIG } from '../config.js';
import { onStateChange } from '../utils/breakpointManager.js';

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
    
    // Prevent browser scroll restoration and ensure mesh starts at initial position
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top to prevent any scroll-based positioning
    window.scrollTo(0, 0);
    
    // Set flag to prevent ScrollTrigger from updating mesh position until initial GSAP animation is complete
    window.isInitialLoadComplete = false;
    
    // Create initial animation timeline that ONLY animates mesh scale
    // This is a regular GSAP animation, NOT a ScrollTrigger animation
    const initialAnimationTimeline = gsap.timeline()
        .to(wrapper.scale, {
            x: () => calculateTargetPosition().scale,
            y: () => calculateTargetPosition().scale,
            z: () => calculateTargetPosition().scale,
            duration: 1.5,
            ease: "power2.out"
        })
        .add(() => {
            console.log('Initial GSAP scale animation complete - mesh now at target scale');
            // Enable scroll-based positioning for future scroll interactions
            window.isInitialLoadComplete = true;
            // Create the ScrollTrigger animation now that initial animation is complete
            createScrollTimeline();
            // Re-enable scrolling by restoring normal ScrollSmoother effects
            if (window.smoother) {
                window.smoother.effects("body", { speed: 1 }); // Normal speed = normal scrolling
                console.log('ScrollSmoother effects restored - normal scrolling enabled');
            }
        });
    
    // Prevent scrolling during initial animation while keeping scrollbars visible
    if (window.smoother) {
        // Keep scrollbars visible but prevent scrolling
        window.smoother.effects("body", { speed: 0 }); // Zero speed = no scrolling
        console.log('ScrollSmoother effects disabled - scrolling prevented during mesh animation');
    }
    
    // Start the initial animation immediately
    initialAnimationTimeline.play();
    
    // Listen for state changes and recreate animation
    onStateChange((newState, oldState) => {
        console.log('ScrollTrigger: State changed, recreating animation', { from: oldState, to: newState });
        recreateScrollAnimation();
    });
    
    console.log('Scroll animation setup complete');
}

// Create or recreate the scroll timeline
function createScrollTimeline() {
    // Kill existing timeline if it exists
    if (scrollTimeline) {
        scrollTimeline.kill();
    }
    
    // Create new scroll timeline
    scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".section[data-section='1']",
            start: "top top",
            end: "bottom 30%",
            scrub: MODEL_CONFIG.scrubDuration, // Smooth scrubbing
            onUpdate: (self) => {
                // Only update mesh position if scroll-based positioning is enabled
                if (window.isInitialLoadComplete) {
                    // Update Three.js wrapper position and scale based on scroll progress
                    const progress = self.progress;
                    
                    // Track scroll direction for spin animation
                    const scrollDirection = self.direction || 0;
                    updateScrollSpin(scrollDirection);
                    
                    // Calculate dynamic target position based on current viewport and state
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
                        startPos.scale || MODEL_CONFIG.startScale, 
                        dynamicTarget.scale, 
                        progress
                    );
                    wrapper.scale.setScalar(currentScale);
                    
                    console.log('Scroll animation progress:', progress, 'Scale:', currentScale, 'Target:', dynamicTarget, 'Spin velocity:', scrollSpinVelocity);
                }
            }
        }
    });
}

// Recreate scroll animation when state changes
function recreateScrollAnimation() {
    if (wrapper && calculateStartPosition && calculateTargetPosition) {
        // Kill existing timeline
        if (scrollTimeline) {
            scrollTimeline.kill();
        }
        
        // Create new timeline with updated state
        createScrollTimeline();
        
        console.log('Scroll animation recreated for new state');
    }
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
        console.log('Scroll animation reset to original position');
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

// Enable scroll-based mesh positioning after initial load is complete
export function enableScrollBasedPositioning() {
    window.isInitialLoadComplete = true;
    console.log('Scroll-based mesh positioning enabled');
} 