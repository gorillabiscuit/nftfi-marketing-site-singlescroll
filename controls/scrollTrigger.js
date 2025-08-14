// Scroll Trigger Module for NFTfi Marketing Site
// Handles all scroll-related animations and GSAP ScrollTrigger functionality

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MODEL_CONFIG, TARGET_CONFIG } from '../config.js';
import { onStateChange } from '../utils/breakpointManager.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

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
            // Re-enable scrolling using canonical ScrollSmoother control
            if (window.smoother) {
                window.smoother.paused(false);
                console.log('ScrollSmoother unpaused - normal scrolling enabled');
            }
            // Now that normal scrolling is enabled, set up Section 2 pinning
            setupSection2Pinning();
            // Force ScrollTrigger to recalc measurements after scroller is active
            try {
                ScrollTrigger.refresh();
                console.log('ScrollTrigger.refresh() called after unpausing and setup');
            } catch (e) {
                console.warn('ScrollTrigger.refresh() failed:', e);
            }
        });
    
    // Prevent scrolling during initial animation using canonical pause
    if (window.smoother) {
        window.smoother.paused(true);
        console.log('ScrollSmoother paused - scrolling prevented during mesh animation');
    }
    
    // Start the initial animation immediately
    initialAnimationTimeline.play();
    
    // Listen for state changes and recreate animation
    onStateChange((newState, oldState) => {
        console.log('ScrollTrigger: State changed, recreating animation', { from: oldState, to: newState });
        recreateScrollAnimation();
    });
    
    // Section 2 pinning will be initialized after initial animation completes
    
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
                    // Ensure we have valid scale values - only fallback if scale is undefined/null
                    const startScale = startPos.scale !== undefined && startPos.scale !== null ? startPos.scale : MODEL_CONFIG.startScale;
                    const targetScale = dynamicTarget.scale !== undefined && dynamicTarget.scale !== null ? dynamicTarget.scale : MODEL_CONFIG.targetScale;
                    
                    const currentScale = gsap.utils.interpolate(
                        startScale, 
                        targetScale, 
                        progress
                    );
                    
                    // Clamp scale to prevent extreme values
                    const clampedScale = gsap.utils.clamp(0.01, 10, currentScale);
                    wrapper.scale.setScalar(clampedScale);
                    
                    // Enhanced logging for scale debugging
                    if (Math.abs(currentScale - clampedScale) > 0.01) {
                        console.warn('Scale was clamped:', { original: currentScale, clamped: clampedScale, startScale, targetScale });
                    }
                    
                    console.log('Scroll animation progress:', progress, 'Scale:', clampedScale, 'Target:', dynamicTarget, 'Spin velocity:', scrollSpinVelocity);
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

// Set up Section 2 with sophisticated 4-phase animation sequence
function setupSection2Pinning() {
    console.log('Setting up Section 2 with 4-phase animation sequence');
    
    // The pinning is now handled by the master timeline's ScrollTrigger
    // No need for a separate pinning ScrollTrigger
    console.log('Section 2 pinning will be handled by master timeline');
    
    // Start the sophisticated animation sequence immediately
    startAdvancedAnimationSequence();
    
    // Function to start the advanced 3-phase animation sequence
    function startAdvancedAnimationSequence() {
        const square = document.querySelector('.test-square');
        if (!square) {
            console.error('Square element not found!');
            return;
        }
        
        console.log('Square found:', square);
        
        // Use GSAP context for proper lifecycle management - this is the canonical approach
        const ctx = gsap.context(() => {
            // Position the square in the center using GSAP
            gsap.set(square, {
                x: '-50%',
                y: '-50%'
            });
            
            // Resolve scroller element explicitly to avoid selector scoping issues
            const scrollerElement = document.getElementById('smooth-content') || document.querySelector('#smooth-content');

            // Create the master timeline with ScrollTrigger for the entire sequence
            console.log('Section 2: resolved scrollerElement =', scrollerElement);
            const section2El = document.querySelector("section[data-section='2']");
            console.log('Section 2: resolved trigger element =', section2El);
            let masterTimeline;
            try {
                masterTimeline = gsap.timeline({
                scrollTrigger: {
                    id: 'section2-master',
                    trigger: section2El || "section[data-section='2']",
                    scroller: scrollerElement || undefined,
                    scrub: true,
                    pin: true,
                    start: "top top",
                    end: "+=300%", // Extended for the new 3-phase structure (drawing 60% + rotation 40% + expansion 30%)
                    markers: true, // Enable markers for debugging
                    onUpdate: (self) => {
                        // Log progress through the new clean phases
                        let phase, phaseProgress;
                        
                        if (self.progress < 0.6) {
                            // Phase 1: Drawing (0-60%)
                            phase = "1 - Drawing";
                            phaseProgress = (self.progress / 0.6) * 100;
                        } else if (self.progress < 1.0) {
                            // Phase 2: Rotation (60-100%)
                            phase = "2 - Rotation";
                            phaseProgress = ((self.progress - 0.6) / 0.4) * 100;
                        } else {
                            // Phase 3: Expansion (100-130%)
                            phase = "3 - Expansion";
                            phaseProgress = ((self.progress - 1.0) / 0.3) * 100;
                        }
                        
                        if (Math.round(phaseProgress) % 20 === 0) { // Log every 20%
                            console.log(`${phase} progress: ${Math.round(phaseProgress)}%`);
                        }
                    },
                    onEnter: () => {
                        console.log('Section 2 ScrollTrigger entered - pinning should be active');
                    },
                    onLeave: () => {
                        console.log('Section 2 ScrollTrigger left - pinning should be inactive');
                    },
                    onRefresh: () => {
                        console.log('Section 2 ScrollTrigger refreshed - recalculated positions');
                    }
                }
            });
            } catch (e) {
                console.error('Failed to create Section 2 master ScrollTrigger timeline:', e);
                return;
            }
            console.log('Section 2: master timeline created. ScrollTrigger =', masterTimeline.scrollTrigger);
            
            // Add labels to the timeline at the correct positions
            masterTimeline.addLabel("draw", 0);
            masterTimeline.addLabel("rotate", 0.6);
            masterTimeline.addLabel("expand", 1.0);
            
            // Phase 1: Clean line drawing (0-60% of timeline)
            const drawingPhase = createDrawingPhase();
            masterTimeline.add(drawingPhase, "draw");
            
            // Phase 2: Clean rotation (60-100% of timeline)
            const rotationPhase = createRotationPhase(square);
            masterTimeline.add(rotationPhase, "rotate");
            
            // Phase 3: Clean expansion (100-130% of timeline - extends beyond 100%)
            const expansionPhase = createExpansionPhase();
            masterTimeline.add(expansionPhase, "expand");
            
            console.log('Stage 3: Master timeline setup complete');
            console.log('- Phase 1: Drawing (0-60%) - Clean opacity/scale animation');
            console.log('- Phase 2: Rotation (60-100%) - Simple 45° rotation with stagger');
            console.log('- Phase 3: Expansion (100-130%) - Clean x/y transforms for grid expansion');
            console.log('- No complex nested timelines or global variable dependencies');
            console.log('- All phases use canonical GSAP methods only');
            
        }, "section[data-section='2']"); // Scope the context to section 2
        
        // Store the context for cleanup if needed
        window.section2Context = ctx;
        
        console.log('Stage 1 complete: GSAP context created and phases added to master timeline');
    }
    
    // Function to stop animation monitoring (no longer needed with master timeline)
    function stopAnimationMonitoring() {
        // This is handled automatically by the master timeline
    }
    
    console.log('Section 2 3-phase animation setup complete');
}

// Phase 1: Create clean line drawing phase using canonical GSAP approach
function createDrawingPhase() {
    const drawingTimeline = gsap.timeline();
    
    // Get the SVG container
    const svg = document.getElementById('lines-svg');
    if (!svg) {
        console.error('SVG container not found for drawing phase');
        return drawingTimeline;
    }
    
    console.log('Stage 3: Refactoring animation phases to use only canonical GSAP methods');
    
    // Calculate dynamic line length and SVG dimensions
    const lineLength = calculateLineLength();
    // Use a more reasonable SVG size that's closer to viewport dimensions
    const svgSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    
    console.log('Phase 1: Setting up 14 lines with dynamic length:', lineLength + 'px');
    console.log('SVG dimensions:', svgSize + 'x' + svgSize + 'px (more reasonable size)');
    console.log('Viewport dimensions:', window.innerWidth + 'x' + window.innerHeight);
    console.log('Original calculated line length:', lineLength + 'px');
    
    // Store SVG dimensions globally for other phases to use
    window.svgSize = svgSize;
    
    // Center the SVG using GSAP canonical approach
    const svgCenter = { x: 0, y: 0 }; // Center point in centered coordinate system
    window.svgCenter = svgCenter;
    
    // Use GSAP to set SVG properties instead of setAttribute
    gsap.set(svg, {
        attr: { viewBox: `${-svgSize/2} ${-svgSize/2} ${svgSize} ${svgSize}` },
        width: svgSize,
        height: svgSize
    });
    
    console.log('SVG centered using GSAP canonical approach');
    console.log('Center point is now at (0,0) in centered coordinate system');
    console.log('SVG viewBox:', `${-svgSize/2} ${-svgSize/2} ${svgSize} ${svgSize}`);
    
    // Use GSAP to clear existing lines instead of innerHTML
    gsap.set(svg, { clearProps: "transform" }); // Clear transforms only
    // Remove all child elements using standard DOM method
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    
    // Create line groups for organization
    const lineGroups = {
        horizontal: [],
        vertical: [],
        all: []
    };
    
    // Calculate line positions in centered coordinate system
    const lineSpacing = 50; // Base spacing between lines
    const horizontalLinesY = [];
    const verticalLinesX = [];
    
    // Calculate horizontal line Y positions (7 lines, centered at 0)
    for (let i = 0; i < 7; i++) {
        horizontalLinesY.push((i - 3) * lineSpacing); // -150, -100, -50, 0, 50, 100, 150
    }
    
    // Calculate vertical line X positions (7 lines, centered at 0)
    for (let i = 0; i < 7; i++) {
        verticalLinesX.push((i - 3) * lineSpacing); // -150, -100, -50, 0, 50, 100, 150
    }
    
    console.log('Center point is now at (0,0) in centered coordinate system');
    console.log('Horizontal lines Y positions:', horizontalLinesY);
    console.log('Vertical lines X positions:', verticalLinesX);
    
    // Create horizontal lines using GSAP element creation
    horizontalLinesY.forEach((y, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Use GSAP to set all attributes instead of setAttribute
        gsap.set(path, {
            attr: {
                class: `line horizontal-line line-${index}`,
                d: `M${-svgSize/2} ${y} L${svgSize/2} ${y}`
            }
        });
        
        // Use standard DOM method to append the element - GSAP doesn't have appendChild
        svg.appendChild(path);
        
        lineGroups.horizontal.push(path);
        lineGroups.all.push(path);
    });
    
    // Create vertical lines using GSAP element creation
    verticalLinesX.forEach((x, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Use GSAP to set all attributes instead of setAttribute
        gsap.set(path, {
            attr: {
                class: `line vertical-line line-${index + 7}`,
                d: `M${x} ${-svgSize/2} L${x} ${svgSize/2}`
            }
        });
        
        // Use standard DOM method to append the element - GSAP doesn't have appendChild
        svg.appendChild(path);
        
        lineGroups.vertical.push(path);
        lineGroups.all.push(path);
    });
    
    console.log('Phase 1: Created 14 SVG path elements');
    console.log('DrawSVGPlugin available:', typeof gsap.plugins.DrawSVGPlugin !== 'undefined');
    
    // Store line groups globally for other phases to use
    window.lineGroups = lineGroups;
    console.log('Line groups stored globally:', lineGroups);
    
    // Set initial state for all lines using canonical GSAP approach
    gsap.set(lineGroups.all, {
        opacity: 0,
        scale: 0.1,
        transformOrigin: "50% 50%"
    });
    
    // Create simple, clean drawing animation using canonical GSAP approach
    // No complex nested timelines - just one clean animation
    drawingTimeline.to(lineGroups.all, {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 0.6, // 60% of total timeline
        stagger: {
            each: 0.05, // Simple, consistent stagger
            from: "center"
        }
    }, 0); // Start at beginning of timeline
    
    console.log('Stage 3: Phase 1 complete - Clean drawing animation using canonical GSAP methods');
    console.log('- Simple timeline structure with no nested complexity');
    console.log('- All lines animate from opacity 0 to 1 with scale 0.1 to 1');
    console.log('- Consistent stagger timing for organic feel');
    
    return drawingTimeline;
}

// Phase 2: Create clean rotation phase using canonical GSAP approach
function createRotationPhase(square) {
    const rotationTimeline = gsap.timeline();
    
    console.log('Stage 3: Phase 2 - Clean rotation using canonical GSAP methods');
    
    // Get line groups from the context - no global variable dependencies
    const lineGroups = window.lineGroups;
    if (!lineGroups || !lineGroups.all) {
        console.error('Line groups not available for rotation phase');
        return rotationTimeline;
    }
    
    const allLines = lineGroups.all;
    
    // Set transform origin using canonical GSAP approach
    gsap.set(allLines, { 
        transformOrigin: "50% 50%"
    });
    
    // Simple, clean rotation animation
    rotationTimeline.to(allLines, {
        rotation: 45, // Rotate 45 degrees
        ease: "power1.inOut",
        duration: 0.4, // 40% of total timeline
        stagger: {
            each: 0.02, // Simple stagger
            from: "center"
        }
    }, 0.6); // Start after drawing phase (at 60% of timeline)
    
    // Add square rotation for visual interest
    rotationTimeline.to(square, {
        rotation: 360, // One full rotation
        ease: "power1.inOut",
        duration: 0.4
    }, 0.6); // Same timing as line rotation
    
    console.log('Stage 3: Phase 2 complete - Clean rotation animation');
    console.log('- Simple 45° rotation with consistent stagger');
    console.log('- No complex nested timelines or global dependencies');
    
    return rotationTimeline;
}

// Phase 3: Create clean expansion phase using canonical GSAP approach
function createExpansionPhase() {
    const expansionTimeline = gsap.timeline();
    
    console.log('Stage 3: Phase 3 - Clean expansion using canonical GSAP methods');
    
    // Get line groups from the context
    const lineGroups = window.lineGroups;
    if (!lineGroups || !lineGroups.horizontal || !lineGroups.vertical) {
        console.error('Line groups not available for expansion phase');
        return expansionTimeline;
    }
    
    const horizontalLines = lineGroups.horizontal;
    const verticalLines = lineGroups.vertical;
    const svgSize = window.svgSize || 2205; // Fallback value
    
    console.log('Available lines:', { 
        horizontal: horizontalLines.length, 
        vertical: verticalLines.length 
    });
    
    // Calculate expansion factor for larger grid
    const expansionFactor = 3.0; // Lines spread 3x further apart
    const newSpacing = 50 * expansionFactor;
    
    // Create simple expansion for horizontal lines
    horizontalLines.forEach((line, index) => {
        const targetY = (index - 3) * newSpacing;
        
        // Ensure proper transform origin
        gsap.set(line, { transformOrigin: "50% 50%" });
        
        // Simple expansion animation using canonical GSAP transforms
        expansionTimeline.to(line, {
            y: targetY,
            scale: 1.1,
            ease: "power2.out",
            duration: 0.3
        }, 1.0 + (index * 0.02)); // Start at 100% of timeline with small stagger
    });
    
    // Create simple expansion for vertical lines
    verticalLines.forEach((line, index) => {
        const targetX = (index - 3) * newSpacing;
        
        // Ensure proper transform origin
        gsap.set(line, { transformOrigin: "50% 50%" });
        
        // Simple expansion animation using canonical GSAP transforms
        expansionTimeline.to(line, {
            x: targetX,
            scale: 1.1,
            ease: "power2.out",
            duration: 0.3
        }, 1.0 + (index * 0.02)); // Start at 100% of timeline with small stagger
    });
    
    console.log('Stage 3: Phase 3 complete - Clean expansion animation');
    console.log('- Simple x/y transforms using canonical GSAP methods');
    console.log('- No complex randomization or overlapping phases');
    console.log('- Clean, maintainable timeline structure');
    
    return expansionTimeline;
}

// Calculate dynamic line length that extends beyond any screen size
function calculateLineLength() {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate the diagonal distance from center to corner (hypotenuse)
    const diagonalDistance = Math.sqrt(viewportWidth * viewportWidth + viewportHeight * viewportHeight);
    
    // Add extra padding to ensure lines extend beyond screen edges
    const extraPadding = Math.max(viewportWidth, viewportHeight) * 0.5;
    
    // Return the total line length (diagonal + padding)
    return Math.ceil(diagonalDistance + extraPadding);
}

 