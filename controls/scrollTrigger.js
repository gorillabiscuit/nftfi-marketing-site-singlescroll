// Scroll Trigger Module for NFTfi Marketing Site
// Handles all scroll-related animations and GSAP ScrollTrigger functionality

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MODEL_CONFIG, TARGET_CONFIG, GRID_STATES, RECT_STATES } from '../config.js';
import { onStateChange, getCurrentAnimationState } from '../utils/breakpointManager.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Scroll animation variables
let scrollTimeline;
let originalWrapperPosition = { x: 0, y: 0, z: 0 };
let originalWrapperScale = { x: 3, y: 3, z: 3 };

// Section 2 timeline reference for safe teardown/rebuild on breakpoint changes
let section2Timeline;

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
            x: () => calculateStartPosition().scale,
            y: () => calculateStartPosition().scale,
            z: () => calculateStartPosition().scale,
            duration: 1.5,
            ease: "power2.out"
        })
        .add(() => {
            console.log('Initial GSAP scale animation complete - mesh now at START scale', {
                at: Date.now(),
                startScale: calculateStartPosition().scale,
                wrapperScale: wrapper.scale.x
            });
            // Enable scroll-based positioning for future scroll interactions
            window.isInitialLoadComplete = true;
            // Prevent any other tweens from controlling wrapper.scale from here on
            window.scrollScaleActive = true;
            try { gsap.killTweensOf(wrapper.scale); } catch (_) {}
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
    // Ensure no competing tweens are acting on wrapper.scale
    try { gsap.killTweensOf(wrapper?.scale); } catch (_) {}
    
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
                    
                    console.log('S1 scroll debug', {
                        progress,
                        startScale: startPos.scale,
                        targetScale: dynamicTarget.scale,
                        currentScale,
                        wrapperScale: wrapper.scale.x,
                        at: Date.now()
                    });
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
    
    // Resolve scope & scroller elements once
    const section2El = document.querySelector("section[data-section='2']");
    const scrollerEl = document.getElementById('smooth-content');

    // Start the sophisticated animation sequence immediately, scoped to Section 2
    if (section2El) {
        gsap.context(() => {
            startAdvancedAnimationSequence(section2El, scrollerEl);
        }, section2El);
    } else {
        // Fallback without context if element not found
        startAdvancedAnimationSequence(section2El, scrollerEl);
    }

    // Minimal gsap.matchMedia integration for responsive rebuilds
    let isRebuilding = false;
    let lastBpLabel = null;
    const rebuildFor = (label) => {
        // Avoid duplicate work when the same label fires repeatedly
        if (isRebuilding || (label && label === lastBpLabel)) return;
        isRebuilding = true;
        if (label) lastBpLabel = label;
        try {
            if (section2Timeline) {
                if (section2Timeline.scrollTrigger) section2Timeline.scrollTrigger.kill();
                section2Timeline.kill();
                section2Timeline = null;
            }
        } catch (e) {
            console.warn('Section 2 teardown warning (matchMedia):', e);
        }
        const el = document.querySelector("section[data-section='2']");
        if (el) {
            gsap.context(() => {
                startAdvancedAnimationSequence(el, document.getElementById('smooth-content'));
            }, el);
        } else {
            startAdvancedAnimationSequence(el, document.getElementById('smooth-content'));
        }
        requestAnimationFrame(() => {
            try { ScrollTrigger.refresh(); } catch (_) {}
            isRebuilding = false;
        });
    };

    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => rebuildFor('mobile'));
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => rebuildFor('tablet'));
    mm.add("(min-width: 1024px)", () => rebuildFor('desktop'));
    
    // Function to start the advanced 3-phase animation sequence
    function startAdvancedAnimationSequence(triggerEl, scrollerEl) {
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
                trigger: triggerEl || "section[data-section='2']",
                scrub: true,
                pin: true,
				invalidateOnRefresh: true,
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

        // Expose for teardown/rebuild
        section2Timeline = masterTimeline;
        
        // Phase 1: Line Drawing (0-25% of timeline)
        const drawingPhase = createDrawingPhase();
        masterTimeline.add(drawingPhase, "draw");
        
        // Build cells early so Phase 2/4 can attach tweens to them
        const staticCellsPhase = createStaticCellsPhase();
        masterTimeline.add(staticCellsPhase, "draw");

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

    // Responsive rebuilds are handled via gsap.matchMedia above.
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
    
    // Calculate dynamic SVG dimensions based on breakpoint-aware grid settings
    const lineLength = calculateLineLength();
    const gridState = (GRID_STATES && GRID_STATES[getCurrentAnimationState()]) || GRID_STATES?.desktop || {};
    const svgSizeMultiplier = typeof gridState.svgSizeMultiplier === 'number' ? gridState.svgSizeMultiplier : 1.5;
    const svgSize = Math.max(window.innerWidth, window.innerHeight) * svgSizeMultiplier;
    
    console.log(`Phase 1: Setting up ${14} lines with dynamic length: ${lineLength}px`);
    console.log(`SVG dimensions: ${svgSize}x${svgSize}px (more reasonable size)`);
    console.log(`Viewport dimensions: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Original calculated line length: ${lineLength}px`);
    
    // Set SVG dimensions and viewBox - centered coordinate system
    // This creates a coordinate system where (0,0) is at the center of the SVG
    const halfSize = svgSize / 2;
    // Use GSAP to set SVG attributes and dimensions (canonical approach)
    gsap.set(svg, {
        attr: { viewBox: `-${halfSize} -${halfSize} ${svgSize} ${svgSize}` },
        width: svgSize,
        height: svgSize
    });
    
    // Use GSAP's canonical centering approach instead of custom positioning
    // Reset any previous transforms and center the SVG using GSAP
    gsap.set(svg, {
        clearProps: "transform", // Clear any existing transforms
        x: "-50%", // Center horizontally using GSAP's percentage-based transforms
        y: "-50%"  // Center vertically using GSAP's percentage-based transforms
    });
    
    console.log('SVG centered using GSAP canonical approach');
    
    // Clear existing lines without innerHTML (avoid direct manipulation)
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    // Create a group container to hold all grid lines (rotate the group, not individual lines)
    const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gsap.set(gridGroup, { attr: { id: 'grid-lines' } });
    svg.appendChild(gridGroup);
    
    // Calculate center point - now (0,0) in our centered coordinate system
    const center = 0; // In centered viewBox, (0,0) is the center
    
    console.log(`Center point is now at (0,0) in centered coordinate system`);
    console.log(`SVG viewBox: -${svgSize/2} -${svgSize/2} ${svgSize} ${svgSize}`);
    
    // Create lines with dynamic spacing and count per breakpoint using logical levels
    const initialSpacing = typeof gridState.initialSpacing === 'number' ? gridState.initialSpacing : 50;
    const levels = Number.isInteger(gridState.levels) ? gridState.levels : 3; // levels per axis -> total lines = (2*levels+1)
    console.log(`Center point is now at (0,0) in centered coordinate system`);
    
    // Create all lines and organize into groups
    const lineGroups = {
        horizontal: [],
        vertical: [],
        all: []
    };
    
    // Add horizontal lines (levels -N..N, increasing order)
    for (let level = -levels; level <= levels; level++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // Horizontal lines go from left edge to right edge of SVG in centered coordinate system
        const leftEdge = -svgSize / 2;
        const rightEdge = svgSize / 2;
        const y = center + level * initialSpacing;
        gsap.set(path, {
            attr: {
                class: `line horizontal`,
                d: `M${leftEdge} ${y} L${rightEdge} ${y}`,
                'vector-effect': 'non-scaling-stroke',
                fill: 'none',
                stroke: gridState.lineColor ?? '#FFFFFF',
                'stroke-opacity': gridState.lineOpacity ?? 0.8
            },
            strokeWidth: (gridState.lineWidth ?? 1)
        });
        // Store logical position for future transforms
        path.dataset.axis = 'h';
        path.dataset.level = String(level);
        gridGroup.appendChild(path);
        lineGroups.horizontal.push(path);
        lineGroups.all.push(path);
    }
    
    // Add vertical lines (levels -N..N, increasing order)
    for (let level = -levels; level <= levels; level++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // Vertical lines go from top edge to bottom edge of SVG in centered coordinate system
        const topEdge = -svgSize / 2;
        const bottomEdge = svgSize / 2;
        const x = center + level * initialSpacing;
        gsap.set(path, {
            attr: {
                class: `line vertical`,
                d: `M${x} ${topEdge} L${x} ${bottomEdge}`,
                'vector-effect': 'non-scaling-stroke',
                fill: 'none',
                stroke: gridState.lineColor ?? '#FFFFFF',
                'stroke-opacity': gridState.lineOpacity ?? 0.8
            },
            strokeWidth: (gridState.lineWidth ?? 1)
        });
        // Store logical position for future transforms
        path.dataset.axis = 'v';
        path.dataset.level = String(level);
        gridGroup.appendChild(path);
        lineGroups.vertical.push(path);
        lineGroups.all.push(path);
    }
    
    console.log(`Phase 1: Created ${lineGroups.all.length} SVG path elements`);
    console.log('DrawSVGPlugin available:', typeof DrawSVGPlugin !== 'undefined');
    
    // Store line groups and group container globally for use in later phases
    window.lineGroups = lineGroups;
    window.svgSize = svgSize;
    window.svgCenter = 0; // In centered coordinate system, center is always (0,0)
    window.gridGroup = gridGroup;
    window.gridInitialSpacing = initialSpacing;
    window.gridState = gridState;

    // Ensure group rotates around center
    gsap.set(gridGroup, { transformOrigin: "50% 50%" });
    
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
    // Force ST to re-measure after dynamic SVG rebuild
    try { ScrollTrigger.refresh(); } catch (_) {}
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
    const gridGroup = window.gridGroup;
    const svgSize = window.svgSize;
    
    console.log('Phase 2: Setting up outward expansion + 45° rotation - lines travel outwards from center while grid rotates');
    
    // Set transform origin on the group and rotate the group as a whole
    gsap.set(gridGroup, { transformOrigin: "50% 50%" });
    
    console.log('Transform origin set to "50% 50%" using GSAP canonical approach');
    
    // Calculate expansion spacing for outward movement (breakpoint-aware)
    const baseSpacing = typeof window.gridInitialSpacing === 'number' ? window.gridInitialSpacing : 50;
    const outwardExpansionFactor = (window.gridState && typeof window.gridState.outwardFactor === 'number') ? window.gridState.outwardFactor : 1.8;
    const newSpacing = baseSpacing * outwardExpansionFactor;
    
    // Canonical transforms: move lines using x/y transforms instead of mutating SVG path data
    horizontalLines.forEach((line) => {
        const level = Number(line.dataset.level || 0);
        const targetY = level * newSpacing; // map by logical level
        outwardExpansionTimeline.to(line, {
            y: targetY,
            ease: "none",
            duration: 0.25
        }, 0); // simultaneous with rotation
    });

    verticalLines.forEach((line) => {
        const level = Number(line.dataset.level || 0);
        const targetX = level * newSpacing; // map by logical level
        outwardExpansionTimeline.to(line, {
            x: targetX,
            ease: "none",
            duration: 0.25
        }, 0); // simultaneous with rotation
    });
    
    // Rotate the entire group (preserves ordering/spacing). Avoid rotating individual lines.
    outwardExpansionTimeline.to(gridGroup, {
        rotation: 45,
        ease: "none",
        duration: 0.25
    }, 0);
    
    // Move and resize cells in lockstep with spacing over this phase (update group transform)
    const cellsGroup = document.getElementById('grid-cells');
    if (cellsGroup) {
        const cellNodes = Array.from(cellsGroup.querySelectorAll('.cell-node'));
        const rectStateCfg = (RECT_STATES && RECT_STATES[getCurrentAnimationState()]) || RECT_STATES?.desktop || {};
        const sfStart = (typeof rectStateCfg.sizeFactorOutStart === 'number') ? rectStateCfg.sizeFactorOutStart : (rectStateCfg.sizeFactor ?? 0.5);
        const sfEnd = (typeof rectStateCfg.sizeFactorOutEnd === 'number') ? rectStateCfg.sizeFactorOutEnd : (rectStateCfg.sizeFactor ?? 0.5);
        const pmStart = (typeof rectStateCfg.positionOutMultiplierStart === 'number') ? rectStateCfg.positionOutMultiplierStart : 1;
        const pmEnd = (typeof rectStateCfg.positionOutMultiplierEnd === 'number') ? rectStateCfg.positionOutMultiplierEnd : 1;
        outwardExpansionTimeline.eventCallback('onUpdate', () => {
            const tl = outwardExpansionTimeline;
            const t = tl.totalProgress();
            const spacingBase = gsap.utils.interpolate(baseSpacing, newSpacing, t);
            const sizeF = gsap.utils.interpolate(sfStart, sfEnd, t);
            const posMult = gsap.utils.interpolate(pmStart, pmEnd, t);
            const size = Math.max(2, spacingBase * sizeF);
            const rx = size * (rectStateCfg.cornerRadiusFactor ?? 0.15);
            cellNodes.forEach((node) => {
                const i = Number(node.dataset.i || 0);
                const j = Number(node.dataset.j || 0);
                const cx = i * (spacingBase * posMult) + (spacingBase * posMult) / 2;
                const cy = j * (spacingBase * posMult) + (spacingBase * posMult) / 2;
                const x = cx - size / 2;
                const y = cy - size / 2;
                node.setAttribute('transform', `translate(${x} ${y})`);
                const rect = node.querySelector('.cell-rect');
                if (rect) gsap.set(rect, { attr: { width: size, height: size, rx, ry: rx } });
            });
        });
    }

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
    const gridGroup = window.gridGroup;
    
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
    
    // Rotate the whole grid group to preserve relative ordering and spacing
    rotationTimeline.to(gridGroup, {
        rotation: 90, // Rotate to 90° total relative to initial (Phase 2 adds first 45° over group too)
        ease: "none",
        duration: 0.25
    }, 0);

    // Subtle per-line micro-rotation with stagger for organic feel (does not affect final angle)
    // Keeps gridGroup rotation as the authoritative rotation to preserve alignment
    rotationTimeline.fromTo(allLines, {
        rotation: -2 // degrees
    }, {
        rotation: 0,
        ease: "none",
        duration: 0.25,
        stagger: { each: 0.01, from: "center" }
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
    
    // Calculate expansion spacing for maintaining grid structure (breakpoint-aware)
    const baseSpacing = typeof window.gridInitialSpacing === 'number' ? window.gridInitialSpacing : 50;
    const expansionFactor = (window.gridState && typeof window.gridState.finalFactor === 'number') ? window.gridState.finalFactor : 2.5;
    const newSpacing = baseSpacing * expansionFactor;
    
    // Canonical transforms: continue expanding via x/y, avoid mutating path data
    horizontalLines.forEach((line) => {
        const level = Number(line.dataset.level || 0);
        const targetY = level * newSpacing; // keep symmetry via logical level
        expansionTimeline.to(line, {
            y: targetY,
            ease: "none",
            duration: 0.25
        }, 0);
    });

    verticalLines.forEach((line) => {
        const level = Number(line.dataset.level || 0);
        const targetX = level * newSpacing;
        expansionTimeline.to(line, {
            x: targetX,
            ease: "none",
            duration: 0.25
        }, 0);
    });
    
    // Move and resize cells in lockstep with spacing over this phase (update group transform)
    const cellsGroup = document.getElementById('grid-cells');
    if (cellsGroup) {
        const cellNodes = Array.from(cellsGroup.querySelectorAll('.cell-node'));
        const rectStateCfg = (RECT_STATES && RECT_STATES[getCurrentAnimationState()]) || RECT_STATES?.desktop || {};
        const sfStart = (typeof rectStateCfg.sizeFactorFinalStart === 'number') ? rectStateCfg.sizeFactorFinalStart : (rectStateCfg.sizeFactor ?? 0.5);
        const sfEnd = (typeof rectStateCfg.sizeFactorFinalEnd === 'number') ? rectStateCfg.sizeFactorFinalEnd : (rectStateCfg.sizeFactor ?? 0.5);
        const pmStart = (typeof rectStateCfg.positionFinalMultiplierStart === 'number') ? rectStateCfg.positionFinalMultiplierStart : 1;
        const pmEnd = (typeof rectStateCfg.positionFinalMultiplierEnd === 'number') ? rectStateCfg.positionFinalMultiplierEnd : 1;
        expansionTimeline.eventCallback('onUpdate', () => {
            const tl = expansionTimeline;
            const t = tl.totalProgress();
            const spacingBase = gsap.utils.interpolate(baseSpacing, newSpacing, t);
            const sizeF = gsap.utils.interpolate(sfStart, sfEnd, t);
            const posMult = gsap.utils.interpolate(pmStart, pmEnd, t);
            const size = Math.max(2, spacingBase * sizeF);
            const rx = size * (rectStateCfg.cornerRadiusFactor ?? 0.15);
            cellNodes.forEach((node) => {
                const i = Number(node.dataset.i || 0);
                const j = Number(node.dataset.j || 0);
                const cx = i * (spacingBase * posMult) + (spacingBase * posMult) / 2;
                const cy = j * (spacingBase * posMult) + (spacingBase * posMult) / 2;
                const x = cx - size / 2;
                const y = cy - size / 2;
                node.setAttribute('transform', `translate(${x} ${y})`);
                const rect = node.querySelector('.cell-rect');
                if (rect) gsap.set(rect, { attr: { width: size, height: size, rx, ry: rx } });
            });
        });
    }

    console.log('Phase 4: Expansion phase timeline created successfully');
    return expansionTimeline;
}

// Stage 1: create static rounded rectangles at grid cell centers (no animation yet)
function createStaticCellsPhase() {
    const cellsTimeline = gsap.timeline();

    if (!window.lineGroups || !window.gridState || !window.gridInitialSpacing || !window.gridGroup) {
        console.warn('Cells: prerequisites not met, skipping');
        return cellsTimeline;
    }

    const rectState = (RECT_STATES && RECT_STATES[getCurrentAnimationState()]) || RECT_STATES?.desktop || { enabled: false };
    if (!rectState.enabled) {
        return cellsTimeline;
    }

    const { horizontal, vertical } = window.lineGroups;
    const levels = new Set([...horizontal, ...vertical].map(el => Number(el.dataset.level)));
    const maxLevel = Math.max(...levels);
    const minLevel = Math.min(...levels);

    const baseSpacing = Number(window.gridInitialSpacing) || 50;
    const size = Math.max(2, baseSpacing * (rectState.sizeFactor ?? 0.5));
    const rx = size * (rectState.cornerRadiusFactor ?? 0.15);
    const group = window.gridGroup;

    // Remove previous cells group if exists
    const old = document.getElementById('grid-cells');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    // Reset primary-cell flag for fresh build
    window._primaryCellPlaced = false;

    const cellsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gsap.set(cellsGroup, { attr: { id: 'grid-cells' } });
    group.appendChild(cellsGroup);
    gsap.set(cellsGroup, { transformOrigin: '50% 50%' }); // inherit rotation with gridGroup

    // Build rects for each inner cell (between grid lines)
    // Logical centers at (i * baseSpacing, j * baseSpacing) for i,j in [minLevel..maxLevel]
    // We place cells for pairs where both exist; avoid edges by requiring neighbors
    const explicit = Array.isArray(rectState.cells) ? rectState.cells : [];
    const hasExplicit = explicit.length > 0;
    let primaryPlaced = false;
    for (let i = minLevel; i <= maxLevel - 1; i++) {
        for (let j = minLevel; j <= maxLevel - 1; j++) {
            let include = false;
            if (hasExplicit) {
                include = explicit.some(([ci, cj]) => ci === i && cj === j);
            } else {
                include = rectState.pattern === 'all' ? true : rectState.pattern === 'checker' ? ((i + j) % 2 === 0) : false;
            }
            if (!include) continue;

            const cx = i * baseSpacing + baseSpacing / 2;
            const cy = j * baseSpacing + baseSpacing / 2;
            const x = cx - size / 2;
            const y = cy - size / 2;

            const cellNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            cellNode.setAttribute('class', 'cell-node');
            cellNode.dataset.i = String(i);
            cellNode.dataset.j = String(j);
            cellNode.setAttribute('transform', `translate(${x} ${y})`);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            gsap.set(rect, { attr: { x: 0, y: 0, width: size, height: size, rx, ry: rx, class: 'cell-rect', fill: '#000000', 'fill-opacity': 0.5, stroke: '#000000', 'stroke-opacity': 1, 'stroke-width': 1 } });
            gsap.set(rect, { transformOrigin: '50% 50%', transformBox: 'fill-box' });

            if (!primaryPlaced && getCurrentAnimationState() === 'desktop') {
                primaryPlaced = true;
                // gradient defs
                const svg = document.getElementById('lines-svg');
                let defs = svg.querySelector('defs');
                if (!defs) {
                    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    svg.insertBefore(defs, svg.firstChild);
                }
                let grad = svg.querySelector('#rect-primary-grad');
                if (!grad) {
                    grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    grad.setAttribute('id', 'rect-primary-grad');
                    grad.setAttribute('gradientTransform', 'rotate(135)');
                    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop1.setAttribute('offset', '0%');
                    stop1.setAttribute('stop-color', '#6D3E58');
                    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop2.setAttribute('offset', '97.66%');
                    stop2.setAttribute('stop-color', '#6D3E58');
                    stop2.setAttribute('stop-opacity', '0.45');
                    grad.appendChild(stop1);
                    grad.appendChild(stop2);
                    defs.appendChild(grad);
                }
                gsap.set(rect, { attr: { rx: 15, ry: 15, fill: 'url(#rect-primary-grad)', stroke: '#FFFFFF', 'stroke-opacity': 0.38, 'stroke-width': 0.5 } });
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.textContent = 'LOAN VOLUME';
                label.setAttribute('fill', '#FFFFFF');
                label.setAttribute('opacity', '0.5');
                label.setAttribute('font-family', 'Satoshi Variable, sans-serif');
                label.setAttribute('font-weight', '500');
                label.setAttribute('font-size', '16');
                const pad = 16;
                label.setAttribute('x', String(pad*4 ));
                label.setAttribute('y', String(size*2.2));
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('dominant-baseline', 'alphabetic');
                label.setAttribute('transform', `rotate(-90, ${size}, ${size - pad})`);
                cellNode.appendChild(label);
            }

            cellNode.appendChild(rect);
            cellsGroup.appendChild(cellNode);
        }
    }

    return cellsTimeline;
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

 