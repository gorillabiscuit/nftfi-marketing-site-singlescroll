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
                end: "+=200%", // Extended for 3 phases
                onUpdate: (self) => {
                    // Log progress through the 4 phases
                    const phase = self.progress < 0.25 ? 1 : 
                                 self.progress < 0.50 ? 2 : 
                                 self.progress < 0.75 ? 3 : 4;
                    const phaseProgress = self.progress < 0.25 ? 
                        (self.progress / 0.25) * 100 : 
                        self.progress < 0.50 ? 
                            ((self.progress - 0.25) / 0.25) * 100 : 
                            self.progress < 0.75 ?
                                ((self.progress - 0.50) / 0.25) * 100 :
                                ((self.progress - 0.75) / 0.25) * 100;
                    
                    if (Math.round(phaseProgress) % 10 === 0) { // Log every 10%
                        console.log(`Phase ${phase} progress: ${Math.round(phaseProgress)}%`);
                    }
                }
            }
        });
        
        // Phase 1: Line Drawing (0-25% of timeline)
        const drawingPhase = createDrawingPhase();
        masterTimeline.add(drawingPhase, "draw");
        
        // Phase 2: Outward Expansion (25-50% of timeline)
        const outwardExpansionPhase = createOutwardExpansionPhase();
        masterTimeline.add(outwardExpansionPhase, "expand-outward");
        
        // Phase 3: Rotation (50-75% of timeline)
        const rotationPhase = createRotationPhase(square);
        masterTimeline.add(rotationPhase, "rotate");
        
        // Phase 4: Grid Expansion (75-100% of timeline)
        const expansionPhase = createExpansionPhase();
        masterTimeline.add(expansionPhase, "expand-grid");
        
        console.log('Master timeline with 4-phase animation created successfully');
    }
    
    // Function to stop animation monitoring (no longer needed with master timeline)
    function stopAnimationMonitoring() {
        // This is handled automatically by the master timeline
    }
    
    console.log('Section 2 3-phase animation setup complete');
}

// Phase 1: Create sophisticated line drawing phase with 12 lines
function createDrawingPhase() {
    const drawingTimeline = gsap.timeline();
    
    // Get the SVG container
    const svg = document.getElementById('lines-svg');
    if (!svg) {
        console.error('SVG container not found for drawing phase');
        return drawingTimeline;
    }
    
    // Calculate dynamic line length and SVG dimensions
    const lineLength = calculateLineLength();
    // Use a more reasonable SVG size that's closer to viewport dimensions
    // This should make centering more accurate and visually apparent
    const svgSize = Math.max(window.innerWidth, window.innerHeight) * 1.5; // 1.5x viewport size instead of 2x line length
    
    console.log(`Phase 1: Setting up ${14} lines with dynamic length: ${lineLength}px`);
    console.log(`SVG dimensions: ${svgSize}x${svgSize}px (more reasonable size)`);
    console.log(`Viewport dimensions: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Original calculated line length: ${lineLength}px`);
    
    // Set SVG dimensions and viewBox - centered coordinate system
    // This creates a coordinate system where (0,0) is at the center of the SVG
    const halfSize = svgSize / 2;
    svg.setAttribute('viewBox', `-${halfSize} -${halfSize} ${svgSize} ${svgSize}`);
    svg.style.width = `${svgSize}px`;
    svg.style.height = `${svgSize}px`;
    
    // Use GSAP's canonical centering approach instead of custom positioning
    // Reset any previous transforms and center the SVG using GSAP
    gsap.set(svg, {
        clearProps: "transform", // Clear any existing transforms
        x: "-50%", // Center horizontally using GSAP's percentage-based transforms
        y: "-50%"  // Center vertically using GSAP's percentage-based transforms
    });
    
    console.log('SVG centered using GSAP canonical approach');
    
    // Clear existing lines and create new ones with enhanced positioning
    svg.innerHTML = '';
    
    // Calculate center point - now (0,0) in our centered coordinate system
    const center = 0; // In centered viewBox, (0,0) is the center
    
    console.log(`Center point is now at (0,0) in centered coordinate system`);
    console.log(`SVG viewBox: -${svgSize/2} -${svgSize/2} ${svgSize} ${svgSize}`);
    
    // Create 12 lines (6 horizontal + 6 vertical) with dynamic spacing
    const initialSpacing = 50;
    
    // Create horizontal lines (will be rotated 45° later)
    // Position lines around the center (0,0) with proper spacing
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
    // Position lines around the center (0,0) with proper spacing
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
    
    // Add horizontal lines
    horizontalLines.forEach((lineData, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', `line ${lineData.class}`);
        // Horizontal lines go from left edge to right edge of SVG in centered coordinate system
        const leftEdge = -svgSize / 2;
        const rightEdge = svgSize / 2;
        path.setAttribute('d', `M${leftEdge} ${lineData.y} L${rightEdge} ${lineData.y}`);
        svg.appendChild(path);
        lineGroups.horizontal.push(path);
        lineGroups.all.push(path);
    });
    
    // Add vertical lines
    verticalLines.forEach((lineData, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', `line ${lineData.class}`);
        // Vertical lines go from top edge to bottom edge of SVG in centered coordinate system
        const topEdge = -svgSize / 2;
        const bottomEdge = svgSize / 2;
        path.setAttribute('d', `M${lineData.x} ${topEdge} L${lineData.x} ${bottomEdge}`);
        svg.appendChild(path);
        lineGroups.vertical.push(path);
        lineGroups.all.push(path);
    });
    
    console.log(`Phase 1: Created ${lineGroups.all.length} SVG path elements`);
    console.log('DrawSVGPlugin available:', !!gsap.DrawSVGPlugin);
    
    // Store line groups globally for use in later phases
    window.lineGroups = lineGroups;
    window.svgSize = svgSize;
    window.svgCenter = 0; // In centered coordinate system, center is always (0,0)
    
    // Set up each line with the world-class center-out drawSVG pattern
    lineGroups.all.forEach((line, index) => {
        // Start with lines invisible (center point only)
        gsap.set(line, { drawSVG: "50% 50%" });
        
        // Add to drawing timeline with staggered start for visual interest
        drawingTimeline.to(line, {
            drawSVG: "0% 100%",   // End: fully drawn from center outward
            ease: "none", // Linear animation for smooth scrub
            duration: 0.25 // This phase takes 25% of the total timeline
        }, index * 0.02); // Stagger each line by 0.02 seconds for visual effect
    });
    
    console.log('Phase 1: Drawing phase timeline created successfully');
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
    
    // Add simultaneous rotation animation for the entire grid
    outwardExpansionTimeline.to(allLines, {
        rotation: 45, // Rotate all lines 45° simultaneously with expansion
        ease: "none",
        duration: 0.25 // This phase takes 25% of the total timeline
    }, 0); // Same start time (0) for simultaneous animation
    
    console.log('Phase 2: Outward expansion + rotation phase timeline created successfully');
    return outwardExpansionTimeline;
}

// Phase 3: Create coordinated rotation phase
function createRotationPhase(square) {
    const rotationTimeline = gsap.timeline();
    
    // Ensure line groups are available
    if (!window.lineGroups || !window.svgCenter) {
        console.error('Line groups not available for rotation phase');
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
    rotationTimeline.to(allLines, {
        rotation: 90, // Rotate all lines to 90° total (45° + 45° additional)
        ease: "none",
        duration: 0.25 // This phase takes 25% of the total timeline
    }, 0);
    
    console.log('Phase 3: Rotation phase timeline created successfully');
    return rotationTimeline;
}

// Phase 4: Create grid expansion phase
function createExpansionPhase() {
    const expansionTimeline = gsap.timeline();
    
    // Ensure line groups are available
    if (!window.lineGroups || !window.svgSize || !window.svgCenter) {
        console.error('Line groups not available for expansion phase');
        return expansionTimeline;
    }
    
    const { horizontal: horizontalLines, vertical: verticalLines, all: allLines } = window.lineGroups;
    const svgSize = window.svgSize;
    const svgCenter = window.svgCenter;
    
    console.log('Phase 4: Setting up grid expansion while maintaining structure');
    
    // Calculate expansion factors for maintaining grid structure
    const expansionFactor = 2.5; // Lines will spread 2.5x further apart
    const newSpacing = 50 * expansionFactor; // New spacing between lines
    
    // DISABLED: Create expansion animation for horizontal lines
    // horizontalLines.forEach((line, index) => {
    //     // In centered coordinate system, lines are positioned relative to (0,0)
    //     const targetX = (index - 2.5) * newSpacing; // Target X position from center
    //     
    //     expansionTimeline.to(line, {
    //         attr: { d: `M${-svgSize/2} ${targetY} L${svgSize/2} ${targetY}` },
    //         ease: "none",
    //         duration: 0.25 // This phase takes 25% of the total timeline
    //     }, 0);
    // });
    
    // DISABLED: Create expansion animation for vertical lines
    // verticalLines.forEach((line, index) => {
    //     // In centered coordinate system, lines are positioned relative to (0,0)
    //     const targetX = (index - 2.5) * newSpacing; // Target X position from center
    //     
    //     expansionTimeline.to(line, {
    //         attr: { d: `M${targetX} ${-svgSize/2} L${targetX} ${svgSize/2}` },
    //         duration: 0.25 // This phase takes 25% of the total timeline
    //     }, 0);
    // });
    
    console.log('Phase 4: Expansion phase timeline created successfully');
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

 