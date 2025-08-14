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
    
    // Set up section 2 pinning
    setupSection2Pinning();
    
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
            
            // Create the master timeline with ScrollTrigger for the entire sequence
            const masterTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "section[data-section='2']",
                    scrub: true,
                    pin: true,
                    start: "top top",
                    end: "+=200%", // Extended for overlapping phases
                    onUpdate: (self) => {
                        // Log progress through the phases with overlap awareness
                        let phase, phaseProgress;
                        
                        if (self.progress < 0.25) {
                            // Phase 1A: Initial Drawing (0-25%)
                            phase = "1A - Initial Drawing";
                            phaseProgress = (self.progress / 0.25) * 100;
                        } else if (self.progress < 0.50) {
                            // Phase 1B: Extended Drawing (25-50%) + Initial drawing continues
                            phase = "1B - Extended Drawing";
                            phaseProgress = ((self.progress - 0.25) / 0.25) * 100;
                        } else if (self.progress < 0.55) {
                            // Phase 2: Rotation (50-55%) + Overlapping drawing continues
                            phase = "2 - Rotation + Drawing Overlap";
                            phaseProgress = ((self.progress - 0.50) / 0.05) * 100;
                        } else if (self.progress < 0.75) {
                            // Phase 3: Rotation + Grid Expansion (55-75%) - Both happening simultaneously
                            phase = "3 - Rotation + Grid Expansion Overlap";
                            phaseProgress = ((self.progress - 0.55) / 0.20) * 100;
                        } else {
                            // Phase 4: Grid Expansion continues (75-100%)
                            phase = "4 - Grid Expansion Final";
                            phaseProgress = ((self.progress - 0.75) / 0.25) * 100;
                        }
                        
                        if (Math.round(phaseProgress) % 10 === 0) { // Log every 10%
                            console.log(`${phase} progress: ${Math.round(phaseProgress)}%`);
                        }
                    }
                }
            });
            
            // Create all phases within the GSAP context - this ensures proper lifecycle management
            console.log('Stage 1: Creating phases within GSAP context for proper lifecycle management');
            
            // Phase 1: Overlapping Line Drawing (0-80% of timeline) - Multiple sub-phases
            const drawingPhase = createDrawingPhase();
            masterTimeline.add(drawingPhase, 0); // Start at 0%
            
            // Phase 2: Outward Expansion (25-50% of timeline) - Overlaps with drawing
            const outwardExpansionPhase = createOutwardExpansionPhase();
            masterTimeline.add(outwardExpansionPhase, 0.25); // Start at 25% for overlap
            
            // Phase 3: Rotation (50-75% of timeline) - Starts while lines are still drawing
            const rotationPhase = createRotationPhase(square);
            masterTimeline.add(rotationPhase, 0.5); // Start at 50% for overlap with drawing
            
            // Phase 4: Grid Expansion (55-100% of timeline) - Begins just after rotation starts
            const expansionPhase = createExpansionPhase();
            masterTimeline.add(expansionPhase, 0.55); // Start at 55% for overlap with rotation
            
            console.log('Master timeline with overlapping phases created successfully');
            console.log('Master timeline total duration:', masterTimeline.duration());
            console.log('Master timeline children count:', masterTimeline.getChildren().length);
            console.log('Phase overlap structure:');
            console.log('- Drawing: 0-80% (multiple sub-phases)');
            console.log('- Expansion: 25-50% (overlaps with drawing)');
            console.log('- Rotation: 50-75% (overlaps with drawing)');
            console.log('- Grid Expansion: 55-100% (overlaps with rotation, creates large grid)');
            console.log('- Expansion starts just after rotation begins for dynamic effect');
            
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

// Phase 1: Create sophisticated line drawing phase with 14 lines using only GSAP methods
function createDrawingPhase() {
    const drawingTimeline = gsap.timeline();
    
    // Get the SVG container
    const svg = document.getElementById('lines-svg');
    if (!svg) {
        console.error('SVG container not found for drawing phase');
        return drawingTimeline;
    }
    
    console.log('Stage 2: Refactoring SVG creation to use only canonical GSAP methods');
    
    // Calculate dynamic line length and SVG dimensions
    const lineLength = calculateLineLength();
    // Use a more reasonable SVG size that's closer to viewport dimensions
    const svgSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    
    console.log(`Phase 1: Setting up 14 lines with dynamic length: ${lineLength}px`);
    console.log(`SVG dimensions: ${svgSize}x${svgSize}px (more reasonable size)`);
    console.log(`Viewport dimensions: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Original calculated line length: ${lineLength}px`);
    
    // Use GSAP to set SVG dimensions and viewBox - canonical approach
    const halfSize = svgSize / 2;
    
    // Set SVG properties using GSAP instead of direct DOM manipulation
    gsap.set(svg, {
        attr: {
            viewBox: `-${halfSize} -${halfSize} ${svgSize} ${svgSize}`
        },
        width: svgSize,
        height: svgSize
    });
    
    // Use GSAP's canonical centering approach
    gsap.set(svg, {
        clearProps: "transform", // Clear any existing transforms
        x: "-50%", // Center horizontally using GSAP's percentage-based transforms
        y: "-50%"  // Center vertically using GSAP's percentage-based transforms
    });
    
    console.log('SVG centered using GSAP canonical approach');
    
    // Use GSAP to clear existing lines instead of innerHTML
    gsap.set(svg, { clearProps: "transform" }); // Clear transforms only
    // Remove all child elements using standard DOM method
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    
    // Calculate center point - now (0,0) in our centered coordinate system
    const center = 0; // In centered viewBox, (0,0) is the center
    
    console.log(`Center point is now at (0,0) in centered coordinate system`);
    console.log(`SVG viewBox: -${svgSize/2} -${svgSize/2} ${svgSize} ${svgSize}`);
    
    // Create 14 lines (7 horizontal + 7 vertical) with dynamic spacing
    const initialSpacing = 50;
    
    // Create horizontal lines (will be rotated 45° later)
    const horizontalLines = [
        { y: center, class: 'horizontal' },                    // Center line at (0,0)
        { y: center - initialSpacing, class: 'horizontal' },   // Above center
        { y: center + initialSpacing, class: 'horizontal' },   // Below center
        { y: center - initialSpacing * 2, class: 'horizontal' }, // Further above
        { y: center + initialSpacing * 2, class: 'horizontal' }, // Further below
        { y: center - initialSpacing * 3, class: 'horizontal' }, // Furthest above
        { y: center + initialSpacing * 3, class: 'horizontal' }  // Furthest below
    ];
    
    // Create vertical lines (will be rotated 45° later)
    const verticalLines = [
        { x: center, class: 'vertical' },                      // Center line at (0,0)
        { x: center - initialSpacing, class: 'vertical' },     // Left of center
        { x: center + initialSpacing, class: 'vertical' },     // Right of center
        { x: center - initialSpacing * 2, class: 'vertical' }, // Further left
        { x: center + initialSpacing * 2, class: 'vertical' }, // Further right
        { x: center - initialSpacing * 3, class: 'vertical' }, // Furthest left
        { x: center + initialSpacing * 3, class: 'vertical' }  // Furthest right
    ];
    
    console.log(`Center point is now at (0,0) in centered coordinate system`);
    console.log(`Horizontal lines Y positions:`, horizontalLines.map(l => l.y));
    console.log(`Vertical lines X positions:`, verticalLines.map(l => l.x));
    
    // Create all lines and organize into groups
    const lineGroups = {
        horizontal: [],
        vertical: [],
        all: []
    };
    
    // Add horizontal lines using GSAP element creation
    horizontalLines.forEach((lineData, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Use GSAP to set all attributes instead of setAttribute
        gsap.set(path, {
            attr: {
                class: `line ${lineData.class}`,
                d: `M${-svgSize/2} ${lineData.y} L${svgSize/2} ${lineData.y}`
            }
        });
        
        // Use standard DOM method to append the element - GSAP doesn't have appendChild
        svg.appendChild(path);
        
        lineGroups.horizontal.push(path);
        lineGroups.all.push(path);
    });
    
    // Add vertical lines using GSAP element creation
    verticalLines.forEach((lineData, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Use GSAP to set all attributes instead of setAttribute
        gsap.set(path, {
            attr: {
                class: `line ${lineData.class}`,
                d: `M${lineData.x} ${-svgSize/2} L${lineData.x} ${svgSize/2}`
            }
        });
        
        // Use standard DOM method to append the element - GSAP doesn't have appendChild
        svg.appendChild(path);
        
        lineGroups.vertical.push(path);
        lineGroups.all.push(path);
    });
    
    console.log(`Phase 1: Created ${lineGroups.all.length} SVG path elements using GSAP methods`);
    console.log('DrawSVGPlugin available:', !!gsap.DrawSVGPlugin);
    
    // Store line groups globally for use in later phases
    window.lineGroups = lineGroups;
    window.svgSize = svgSize;
    window.svgCenter = 0; // In centered coordinate system, center is always (0,0)
    
    console.log('Line groups stored globally:', {
        horizontal: lineGroups.horizontal.length,
        vertical: lineGroups.vertical.length,
        total: lineGroups.all.length
    });
    
    // Set up each line with standard GSAP properties since DrawSVG plugin is not available
    lineGroups.all.forEach((line, index) => {
        // Start with lines invisible and small
        gsap.set(line, { 
            opacity: 0,
            scale: 0.1,
            transformOrigin: "50% 50%"
        });
    });
    
    // Create overlapping animation phases using canonical GSAP timeline positioning
    
    // Phase 1A: Initial drawing of first 6 lines (0-40% of timeline)
    const initialDrawingPhase = gsap.timeline();
    initialDrawingPhase.to(lineGroups.all.slice(0, 6), {
        opacity: 1,   // Make lines visible
        scale: 1,     // Full size
        ease: "power2.out", // Smooth easing
        duration: 0.4, // This phase takes 40% of the total timeline
        stagger: {
            each: 0.05 + Math.random() * 0.03, // Slight randomization to stagger timing
            from: "center", // Start from center lines outward
            ease: "power1.out" // Slight easing for natural feel
        }
    });
    
    // Phase 1B: Drawing of remaining 8 lines (25-65% of timeline) - overlaps with initial phase
    const extendedDrawingPhase = gsap.timeline();
    extendedDrawingPhase.to(lineGroups.all.slice(6), {
        opacity: 1,   // Make lines visible
        scale: 1,     // Full size
        ease: "power2.out", // Smooth easing
        duration: 0.4, // This phase takes 40% of the total timeline
        stagger: {
            each: 0.08 + Math.random() * 0.04, // Slight randomization to stagger timing
            from: "center", // Start from center lines outward
            ease: "power2.out" // Different easing for variety
        }
    });
    
    // Phase 1C: Extended drawing of all lines with varied durations (40-80% of timeline)
    // This creates the overlap effect where some lines continue drawing during rotation
    const overlappingDrawingPhase = gsap.timeline();
    
    // Create randomized durations and start times for continued drawing
    lineGroups.all.forEach((line, index) => {
        // Randomize duration between 0.3 and 0.8 seconds for more variety
        const randomDuration = 0.3 + Math.random() * 0.5;
        // Randomize start time within the 40-80% range for overlap
        const randomStartTime = 0.4 + Math.random() * 0.3;
        // Randomize ease for variety
        const easeOptions = ["power1.inOut", "power2.inOut", "power3.inOut", "back.inOut"];
        const randomEase = easeOptions[Math.floor(Math.random() * easeOptions.length)];
        
        overlappingDrawingPhase.to(line, {
            opacity: 1, // Ensure line is fully visible
            scale: 1.1, // Slight scale increase for continued drawing effect
            ease: randomEase, // Random easing for variety
            duration: randomDuration
        }, randomStartTime);
    });
    
    console.log('Phase 1C: Enhanced overlapping drawing with randomization');
    console.log('- Duration range: 0.3-0.8 seconds per line');
    console.log('- Start time range: 40-70% of timeline');
    console.log('- Random easing for each line');
    console.log('- Creates organic overlap with rotation phase');
    
    // Add all phases to the main drawing timeline with proper positioning
    drawingTimeline.add(initialDrawingPhase, 0);           // Start at 0%
    drawingTimeline.add(extendedDrawingPhase, 0.25);       // Start at 25% (overlaps with initial)
    drawingTimeline.add(overlappingDrawingPhase, 0.4);     // Start at 40% (overlaps with extended)
    
    console.log('Phase 1: Overlapping drawing phases created with randomized staggering');
    console.log('- Initial phase: 0-40% (first 6 lines)');
    console.log('- Extended phase: 25-65% (remaining 8 lines)');
    console.log('- Overlapping phase: 40-80% (all lines with random timing)');
    console.log('Stage 2 complete: SVG creation now uses only canonical GSAP methods');
    
    return drawingTimeline;
}

// Phase 2: Create outward expansion phase with simultaneous rotation (lines travel outwards from center + grid rotates 45°)
function createOutwardExpansionPhase() {
    const outwardExpansionTimeline = gsap.timeline();
    
    // Ensure line groups are available
    if (!window.lineGroups || !window.svgSize) {
        console.error('Line groups not available for outward expansion phase');
        return outwardExpansionTimeline;
    }
    
    const { horizontal: horizontalLines, vertical: verticalLines, all: allLines } = window.lineGroups;
    const svgSize = window.svgSize;
    
    console.log('Phase 2: Setting up outward expansion + 45° rotation - lines travel outwards from center while grid rotates');
    
    // Set transform origin to SVG center for proper rotation
    // Use GSAP's canonical approach: "50% 50%" or "center center" for perfect centering
    gsap.set(allLines, { 
        transformOrigin: "50% 50%" // This centers the rotation axis perfectly
    });
    
    console.log('Transform origin set to "50% 50%" using GSAP canonical approach');
    
    // Calculate expansion factors for outward movement
    const outwardExpansionFactor = 1.8; // Lines will spread 1.8x further apart
    const newSpacing = 50 * outwardExpansionFactor; // New spacing between lines
    
    // DISABLED: Create outward expansion animation for horizontal lines
    // horizontalLines.forEach((line, index) => {
    //     // In centered coordinate system, lines are positioned relative to (0,0)
    //     const targetY = (index - 3) * newSpacing; // Target Y position from center (3 is middle index for 7 lines)
    //     
    //     outwardExpansionTimeline.to(line, {
    //         attr: { d: `M${-svgSize/2} ${targetY} L${svgSize/2} ${targetY}` },
    //         ease: "none",
    //         duration: 0.25 // This phase takes 25% of the total timeline
    //     }, 0);
    // });
    
    // DISABLED: Create outward expansion animation for vertical lines
    // verticalLines.forEach((line, index) => {
    //     // In centered coordinate system, lines are positioned relative to (0,0)
    //     const targetX = (index - 3) * newSpacing; // Target X position from center (3 is middle index for 7 lines)
    //     
    //     outwardExpansionTimeline.to(line, {
    //         attr: { d: `M${targetX} ${-svgSize/2} L${targetX} ${svgSize/2}` },
    //         ease: "none",
    //         duration: 0.25 // This phase takes 25% of the total timeline
    //     }, 0);
    // });
    
    // Add simultaneous rotation animation for the entire grid with randomized staggering
    // This creates a more organic feel as lines rotate at slightly different times
    outwardExpansionTimeline.to(allLines, {
        rotation: 45, // Rotate all lines 45° 
        ease: "power1.inOut", // Smooth easing for natural rotation
        duration: 0.25, // This phase takes 25% of the total timeline
        stagger: {
            each: 0.02 + Math.random() * 0.01, // Small stagger with slight randomization
            from: "center", // Start rotation from center lines outward
            ease: "power1.out" // Easing for the stagger timing
        }
    }, 0); // Same start time (0) for simultaneous animation
    
    console.log('Phase 2: Outward expansion + rotation phase timeline created successfully');
    console.log('- Rotation with randomized staggering for organic movement');
    console.log('- Duration: 0.25 (25% of total timeline)');
    console.log('- Stagger: 0.02s between lines, from center outward');
    return outwardExpansionTimeline;
}

// Phase 3: Create coordinated rotation phase
function createRotationPhase(square) {
    const rotationTimeline = gsap.timeline();
    
    // Debug: Check what's available globally
    console.log('Rotation phase - checking global variables:');
    console.log('window.lineGroups:', window.lineGroups);
    console.log('window.svgCenter:', window.svgCenter);
    
    // Ensure line groups are available
    if (!window.lineGroups || !window.svgCenter) {
        console.error('Line groups not available for rotation phase');
        console.error('Available globals:', {
            lineGroups: !!window.lineGroups,
            svgCenter: !!window.svgCenter
        });
        return rotationTimeline;
    }
    
    const { all: allLines } = window.lineGroups;
    const svgCenter = window.svgCenter;
    
    console.log('Phase 3: Setting up coordinated rotation for all lines');
    
    // Set transform origin to SVG center for proper rotation
    // Use GSAP's canonical approach: "50% 50%" or "center center" for perfect centering
    gsap.set(allLines, { 
        transformOrigin: "50% 50%" // This centers the rotation axis perfectly
    });
    
    console.log('Transform origin set to "50% 50%" using GSAP canonical approach');
    
    // Add square rotation to the rotation timeline
    rotationTimeline.to(square, {
        rotation: 1080, // 3 full rotations (3 * 360)
        ease: "none",
        duration: 0.25 // This phase takes 25% of the total timeline
    }, 0);
    
    // Add coordinated line rotation to the rotation timeline
    // Lines are already at 45° from previous phase, so rotate additional 45° to reach 90° total
    // Add randomized staggering for organic movement that overlaps with continued drawing
    rotationTimeline.to(allLines, {
        rotation: 90, // Rotate all lines to 90° total (45° + 45° additional)
        ease: "power1.inOut", // Smooth easing for natural rotation
        duration: 0.25, // This phase takes 25% of the total timeline
        stagger: {
            each: 0.03 + Math.random() * 0.02, // Slight randomization to stagger timing
            from: "center", // Start rotation from center lines outward
            ease: "power2.out" // Different easing for variety
        }
    }, 0);
    
    console.log('Phase 3: Rotation phase timeline created successfully');
    console.log('- Additional 45° rotation (total 90°) with randomized staggering');
    console.log('- Duration: 0.25 (25% of total timeline)');
    console.log('- Stagger: 0.03s between lines, from center outward');
    console.log('- Overlaps with continued drawing for dynamic effect');
    return rotationTimeline;
}

// Phase 4: Create grid expansion phase using canonical GSAP approach
function createExpansionPhase() {
    const expansionTimeline = gsap.timeline();
    
    // Debug: Check what's available globally
    console.log('Expansion phase - checking global variables:');
    console.log('window.lineGroups:', window.lineGroups);
    console.log('window.svgSize:', window.svgSize);
    console.log('window.svgCenter:', window.svgCenter);
    
    // Ensure line groups are available
    if (!window.lineGroups || !window.svgSize || !window.svgCenter) {
        console.error('Line groups not available for expansion phase');
        console.error('Available globals:', {
            lineGroups: !!window.lineGroups,
            svgSize: !!window.svgSize,
            svgCenter: !!window.svgCenter
        });
        return expansionTimeline;
    }
    
    // Debug: Check the actual structure of lineGroups
    console.log('LineGroups structure:', {
        keys: Object.keys(window.lineGroups),
        horizontal: window.lineGroups.horizontal,
        vertical: window.lineGroups.vertical,
        all: window.lineGroups.all
    });
    
    // Check if the properties exist and have the expected structure
    if (!window.lineGroups.horizontal || !window.lineGroups.vertical || !window.lineGroups.all) {
        console.error('LineGroups properties not found:', {
            hasHorizontal: !!window.lineGroups.horizontal,
            hasVertical: !!window.lineGroups.vertical,
            hasAll: !!window.lineGroups.all
        });
        return expansionTimeline;
    }
    
    const { horizontal: horizontalLines, vertical: verticalLines, all: allLines } = window.lineGroups;
    const svgSize = window.svgSize;
    const svgCenter = window.svgCenter;
    
    console.log('Phase 4: Setting up grid expansion using canonical GSAP transforms');
    console.log('Available lines:', { horizontal: horizontalLines.length, vertical: verticalLines.length, total: allLines.length });
    console.log('SVG size:', svgSize);
    console.log('SVG center:', svgCenter);
    
    // Calculate expansion factors for making the grid much larger
    const expansionFactor = 4.0; // Lines will spread 4x further apart (much larger grid)
    const newSpacing = 50 * expansionFactor; // New spacing between lines
    
    // Create expansion animation for horizontal lines using canonical GSAP approach
    horizontalLines.forEach((line, index) => {
        // Randomize start time to begin just after rotation starts (55-75% of timeline)
        const randomStartTime = 0.55 + Math.random() * 0.2;
        // Randomize duration for organic feel
        const randomDuration = 0.2 + Math.random() * 0.3;
        // Randomize ease for variety
        const easeOptions = ["power1.out", "power2.out", "power3.out", "back.out"];
        const randomEase = easeOptions[Math.floor(Math.random() * easeOptions.length)];
        
        // Calculate target Y position from center (index - 3 is middle for 7 lines)
        const targetY = (index - 3) * newSpacing;
        
        // Ensure proper transform origin for GSAP transforms
        gsap.set(line, { transformOrigin: "50% 50%" });
        
        console.log(`Horizontal line ${index}: moving from center to Y=${targetY}, start=${randomStartTime.toFixed(2)}, duration=${randomDuration.toFixed(2)}`);
        
        // Use canonical GSAP approach: add animation to timeline with proper positioning
        expansionTimeline.to(line, {
            y: targetY, // Move line to new Y position using GSAP transform
            ease: randomEase,
            duration: randomDuration
        }, randomStartTime);
        
        // Add scale effect for dramatic expansion
        expansionTimeline.to(line, {
            scale: 1.2, // Scale increase for dramatic effect
            ease: randomEase,
            duration: randomDuration * 0.8
        }, randomStartTime + randomDuration * 0.2);
        
        // Add opacity variation for organic feel
        const randomOpacity = 0.8 + Math.random() * 0.2;
        expansionTimeline.to(line, {
            opacity: randomOpacity,
            ease: randomEase,
            duration: randomDuration * 0.6
        }, randomStartTime + randomDuration * 0.3);
    });
    
    // Create expansion animation for vertical lines using canonical GSAP approach
    verticalLines.forEach((line, index) => {
        // Randomize start time to begin just after rotation starts (55-75% of timeline)
        const randomStartTime = 0.55 + Math.random() * 0.2;
        // Randomize duration for organic feel
        const randomDuration = 0.2 + Math.random() * 0.3;
        // Randomize ease for variety
        const easeOptions = ["power1.out", "power2.out", "power3.out", "back.out"];
        const randomEase = easeOptions[Math.floor(Math.random() * easeOptions.length)];
        
        // Calculate target X position from center (index - 3 is middle for 7 lines)
        const targetX = (index - 3) * newSpacing;
        
        // Ensure proper transform origin for GSAP transforms
        gsap.set(line, { transformOrigin: "50% 50%" });
        
        console.log(`Vertical line ${index}: moving from center to X=${targetX}, start=${randomStartTime.toFixed(2)}, duration=${randomDuration.toFixed(2)}`);
        
        // Use canonical GSAP approach: add animation to timeline with proper positioning
        expansionTimeline.to(line, {
            x: targetX, // Move line to new X position using GSAP transform
            ease: randomEase,
            duration: randomDuration
        }, randomStartTime);
        
        // Add scale effect for dramatic expansion
        expansionTimeline.to(line, {
            scale: 1.2, // Scale increase for dramatic effect
            ease: randomEase,
            duration: randomDuration * 0.8
        }, randomStartTime + randomDuration * 0.2);
        
        // Add opacity variation for organic feel
        const randomOpacity = 0.8 + Math.random() * 0.2;
        expansionTimeline.to(line, {
            opacity: randomOpacity,
            ease: randomEase,
            duration: randomDuration * 0.6
        }, randomStartTime + randomDuration * 0.3);
    });
    
    console.log('Phase 4: Grid expansion phase created successfully using canonical GSAP');
    console.log('- Expansion factor: 4x (much larger grid)');
    console.log('- Start time range: 55-75% of timeline (just after rotation starts)');
    console.log('- Duration range: 0.2-0.5 seconds per line');
    console.log('- Using GSAP transforms (x, y) instead of SVG attributes');
    console.log('- Scale effect: 1.2x increase for dramatic expansion');
    console.log('- Opacity variation: 0.8-1.0 for organic feel');
    console.log('- Creates organic expansion effect with proper GSAP transforms');
    
    // Add a simple test animation to verify GSAP transforms are working
    expansionTimeline.to(allLines, {
        opacity: 0.5,
        duration: 0.1,
        ease: "none"
    }, 0.54); // Just before expansion starts
    
    expansionTimeline.to(allLines, {
        opacity: 1,
        duration: 0.1,
        ease: "none"
    }, 0.55); // When expansion starts
    
    console.log('Added test animations to verify GSAP transforms are working');
    console.log('Expansion timeline duration:', expansionTimeline.duration());
    console.log('Expansion timeline children count:', expansionTimeline.getChildren().length);
    
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

 