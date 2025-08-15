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
                end: "+=250%", // Extended to accommodate block reveal
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

        // Prepare cells' stroke draw (set initial states only)
        const cellsStrokePrep = prepareCellsStrokeDraw();
        masterTimeline.add(cellsStrokePrep, "draw");
        
        // Phase 2: Outward Expansion (25-50% of timeline)
        const outwardExpansionPhase = createOutwardExpansionPhase();
        masterTimeline.add(outwardExpansionPhase, "expand-outward");
        
        // Phase 3: Rotation (50-75% of timeline)
        const rotationPhase = createRotationPhase(square);
        masterTimeline.add(rotationPhase, "rotate");
        
        // Phase 4: Grid Expansion (75-100% of timeline)
        const expansionPhase = createExpansionPhase();
        masterTimeline.add(expansionPhase, "expand-grid");

        // Blocks Reveal: sequentially fade in blocks during the pinned scroll
        const revealPhase = createBlocksRevealPhase();
        // Start reveal around rotation phase so they appear as you scroll
        masterTimeline.add(revealPhase, "rotate");
        
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

// Phase 1: create static rounded rectangles at grid cell centers (no animation yet)
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
    const rectDefaults = rectState.rectDefaults || {};

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
    const explicit = Array.isArray(rectState.cells) ? rectState.cells : [];
    const hasExplicit = explicit.length > 0;
    const blocksCfg = Array.isArray(rectState.blocks) ? rectState.blocks : null;
    let visibleIdx = 0;
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
            // Start hidden; reveal during reveal phase
            gsap.set(cellNode, { opacity: 0 });

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            gsap.set(rect, { attr: { x: 0, y: 0, width: size, height: size, rx, ry: rx, class: 'cell-rect' } });
            gsap.set(rect, { transformOrigin: '50% 50%', transformBox: 'fill-box' });

            // Append rect first so that subsequent text elements render on top
            cellNode.appendChild(rect);

            const blockIndex = visibleIdx;
            const state = RECT_STATES[getCurrentAnimationState()] || RECT_STATES.desktop || {};
            const baseAmt = state.amount || {};
            const baseLbl = state.label || {};
            const bCfg = (blocksCfg && blocksCfg[blockIndex]) ? blocksCfg[blockIndex] : null;
            const amtCfg = bCfg && bCfg.amount ? { ...baseAmt, ...bCfg.amount } : baseAmt;
            const lblCfg = bCfg && bCfg.label ? { ...baseLbl, ...bCfg.label } : baseLbl;

            // Apply gradient/stroke per block (overriding defaults if provided)
            const rectCfg = (bCfg && bCfg.rect) ? { ...rectDefaults, ...bCfg.rect } : rectDefaults;
            const svg = document.getElementById('lines-svg');
            let defs = svg.querySelector('defs');
            if (!defs) {
                defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                svg.insertBefore(defs, svg.firstChild);
            }
            const gradId = `rect-grad-${blockIndex}`;
            let grad = svg.querySelector(`#${gradId}`);
            if (!grad) {
                grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                grad.setAttribute('id', gradId);
                const angle = Number(rectCfg.gradientAngle ?? 135);
                grad.setAttribute('gradientTransform', `rotate(${angle})`);
                const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop1.setAttribute('offset', '0%');
                stop1.setAttribute('stop-color', rectCfg.gradientStart ?? '#000000');
                const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop2.setAttribute('offset', '97.66%');
                // Support rgba end colors: if provided, split color/opacity; otherwise set color only
                const end = rectCfg.gradientEnd ?? 'rgba(0,0,0,0.5)';
                if (/rgba\(/i.test(end)) {
                    const m = end.match(/rgba\(([^)]+)\)/i);
                    if (m) {
                        const parts = m[1].split(',').map(s => s.trim());
                        const [r,g,b,a] = parts;
                        stop2.setAttribute('stop-color', `rgb(${r}, ${g}, ${b})`);
                        if (a != null) stop2.setAttribute('stop-opacity', `${a}`);
                    }
                } else {
                    stop2.setAttribute('stop-color', end);
                }
                grad.appendChild(stop1);
                grad.appendChild(stop2);
                defs.appendChild(grad);
            } else {
                // Update stops if gradient exists
                const stops = grad.querySelectorAll('stop');
                const startStop = stops[0];
                const endStop = stops[1];
                if (startStop) startStop.setAttribute('stop-color', rectCfg.gradientStart ?? '#000000');
                if (endStop) {
                    const end = rectCfg.gradientEnd ?? 'rgba(0,0,0,0.5)';
                    if (/rgba\(/i.test(end)) {
                        const m = end.match(/rgba\(([^)]+)\)/i);
                        if (m) {
                            const parts = m[1].split(',').map(s => s.trim());
                            const [r,g,b,a] = parts;
                            endStop.setAttribute('stop-color', `rgb(${r}, ${g}, ${b})`);
                            if (a != null) endStop.setAttribute('stop-opacity', `${a}`);
                        }
                    } else {
                        endStop.setAttribute('stop-color', end);
                        endStop.removeAttribute('stop-opacity');
                    }
                }
            }

            const rxOverride = Number(rectCfg.rxOverride ?? NaN);
            const rxFinal = Number.isFinite(rxOverride) ? rxOverride : rx;
            gsap.set(rect, { attr: { rx: rxFinal, ry: rxFinal, fill: `url(#${gradId})`, stroke: (rectCfg.strokeColor ?? '#FFFFFF'), 'stroke-opacity': (rectCfg.strokeOpacity ?? 0.38), 'stroke-width': (rectCfg.strokeWidth ?? 1) } });

            // If there is text config for this block, render amount/label
            if (amtCfg || lblCfg) {
                if (amtCfg) {
                    const amount = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    amount.textContent = (amtCfg.text ?? '$700M+');
                    amount.setAttribute('fill', (amtCfg.color ?? 'rgba(255, 255, 255, 0.90)'));
                    amount.setAttribute('font-family', (amtCfg.fontFamily ?? 'Roboto Mono, monospace'));
                    amount.setAttribute('font-weight', (amtCfg.fontWeight ?? '300'));
                    amount.setAttribute('font-size', String(amtCfg.fontSize ?? 36));
                    if (amtCfg.letterSpacing != null) amount.setAttribute('letter-spacing', String(amtCfg.letterSpacing));

                    const fontSize = Number(amtCfg.fontSize ?? 36);
                    const centerMode = (amtCfg.anchor === 'middle') || (amtCfg.center === true);
                    let ax, ay;
                    let anchorVal = (amtCfg.anchor != null) ? amtCfg.anchor : (centerMode ? 'middle' : 'start');
                    let baselineVal = (amtCfg.baseline != null) ? amtCfg.baseline : (centerMode ? 'middle' : 'alphabetic');
                    if (centerMode) {
                        const offX = Number(amtCfg.centerOffsetX ?? 0);
                        const offY = Number(amtCfg.centerOffsetY ?? 0);
                        ax = size / 2 + offX;
                        ay = size / 2 + offY;
                    } else {
                        const amtPadLeft = Number(amtCfg.padLeft ?? 8);
                        const amtPadTop = Number(amtCfg.padTop ?? 18);
                        ax = amtPadLeft;
                        ay = amtPadTop + fontSize;
                    }
                    amount.setAttribute('x', String(ax));
                    amount.setAttribute('y', String(ay));
                    amount.setAttribute('text-anchor', anchorVal);
                    amount.setAttribute('dominant-baseline', baselineVal);
                    const amtRot = (amtCfg.rotateDeg != null) ? Number(amtCfg.rotateDeg) : null;
                    if (amtRot != null) {
                        amount.setAttribute('transform', `rotate(${amtRot} ${ax} ${ay})`);
                    }
                    cellNode.appendChild(amount);
                }

                if (lblCfg) {
                    // Create a wrapper so label and highlight share the exact same transform
                    const labelWrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    labelWrap.setAttribute('class', 'label-wrap');

                    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    label.textContent = (lblCfg.text ?? 'LOAN VOLUME');
                    label.setAttribute('fill', (lblCfg.color ?? '#FFFFFF'));
                    if (lblCfg.opacity != null) label.setAttribute('opacity', String(lblCfg.opacity));
                    label.setAttribute('font-family', (lblCfg.fontFamily ?? 'Satoshi Variable, sans-serif'));
                    label.setAttribute('font-weight', (lblCfg.fontWeight ?? '500'));
                    label.setAttribute('font-size', String(lblCfg.fontSize ?? 16));
                    label.setAttribute('data-role', 'label');

                    const lblPadLeft = Number(lblCfg.padLeft ?? 8);
                    const lblPadBottom = Number(lblCfg.padBottom ?? 8);
                    const lblPadRight = (lblCfg.padRight != null) ? Number(lblCfg.padRight) : null;
                    const lblPadTop = (lblCfg.padTop != null) ? Number(lblCfg.padTop) : null;

                    let lx = lblPadLeft;
                    let ly = size - lblPadBottom;
                    let anchor = (lblCfg.anchor ?? 'start');
                    let baseline = (lblCfg.baseline ?? 'alphabetic');

                    if (lblPadRight != null) {
                        lx = size - lblPadRight;
                        ly = size - (lblCfg.padBottom ?? 8);
                        anchor = 'end';
                        baseline = 'alphabetic';
                    } else if (lblPadTop != null) {
                        lx = lblPadLeft;
                        ly = lblPadTop + (lblCfg.fontSize ?? 16);
                        anchor = 'start';
                        baseline = 'alphabetic';
                    }

                    label.setAttribute('x', String(lx));
                    label.setAttribute('y', String(ly));
                    label.setAttribute('text-anchor', anchor);
                    label.setAttribute('dominant-baseline', baseline);

                    const rot = (lblCfg.rotateDeg != null) ? Number(lblCfg.rotateDeg) : null;

                    // Insert a highlight wipe rect behind the label text (inspired by the CodePen effect)
                    const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    const fontSize = Number(lblCfg.fontSize ?? 16);
                    const padX = 4;
                    const padY = 2;
                    // Baseline y -> top = y - fontSize
                    const hlTop = ly - fontSize - padY;
                    const hlLeft = lx - (anchor === 'end' ? 0 : padX);
                    const hlHeight = fontSize + padY * 2;
                    // initial width 0; will animate to measured text width + padding
                    gsap.set(highlight, { attr: { x: hlLeft, y: hlTop, width: 0, height: hlHeight, fill: '#ffcc00', 'fill-opacity': 1 } });
                    highlight.setAttribute('class', 'label-highlight');
                    // Persist metadata for reveal-time measurement
                    highlight.dataset.padX = String(padX);
                    highlight.dataset.anchor = anchor;
                    highlight.dataset.lx = String(lx);
                    highlight.dataset.ly = String(ly);
                    // Append into wrapper (highlight first so label stays on top)
                    labelWrap.appendChild(highlight);
                    labelWrap.appendChild(label);
                    if (rot != null) {
                        labelWrap.setAttribute('transform', `rotate(${rot} ${lx} ${ly})`);
                    }
                    cellNode.appendChild(labelWrap);

                    // Measure text width and store target width for reveal
                    try {
                        const computedLen = label.getComputedTextLength ? label.getComputedTextLength() : 0;
                        const targetW = (computedLen > 0 ? computedLen : label.getBBox().width) + (anchor === 'end' ? 0 : padX * 2);
                        highlight.dataset.targetWidth = String(Math.max(0, targetW));
                    } catch (_) {}
                }
            }

            cellsGroup.appendChild(cellNode);
            visibleIdx++;
        }
    }

    // Expose ordered cell nodes for reveal phase
    window.visibleCellNodes = Array.from(cellsGroup.querySelectorAll('.cell-node'));

    return cellsTimeline;
}

// Prep: set initial stroke draw state (no tweens). Actual draw happens during reveal.
function prepareCellsStrokeDraw() {
    const tl = gsap.timeline();
    const cellsGroup = document.getElementById('grid-cells');
    if (!cellsGroup) return tl;
    const rects = Array.from(cellsGroup.querySelectorAll('rect.cell-rect'));
    rects.forEach((rect) => {
        gsap.set(rect, { drawSVG: "50% 50%" });
        gsap.set(rect, { attr: { 'fill-opacity': 0 } });
    });
    const highlights = Array.from(cellsGroup.querySelectorAll('rect.label-highlight'));
    highlights.forEach((hl) => {
        const y = hl.getAttribute('y');
        const h = hl.getAttribute('height');
        // ensure width starts at 0
        gsap.set(hl, { attr: { width: 0 } });
        // keep fully opaque to mimic wipe
        gsap.set(hl, { attr: { 'fill-opacity': 1 } });
    });
    return tl;
}

// Blocks Reveal Phase: sequentially fade in visible blocks
function createBlocksRevealPhase() {
    const tl = gsap.timeline();
    const nodes = (window.visibleCellNodes && window.visibleCellNodes.length)
        ? window.visibleCellNodes
        : Array.from((document.getElementById('grid-cells') || { querySelectorAll: () => [] }).querySelectorAll('.cell-node'));
    if (!nodes || nodes.length === 0) {
        console.warn('Reveal phase: no cell nodes to reveal');
        return tl;
    }
    // For each node, reveal node and draw its rect stroke, then fade in fill
    nodes.forEach((node, index) => {
        const rect = node.querySelector('rect.cell-rect');
        const highlight = node.querySelector('rect.label-highlight');
        const labelEl = node.querySelector('text[data-role="label"]');
        const pos = index * 0.15; // stagger each block
        // Reveal entire node (text + rect)
        tl.to(node, { opacity: 1, duration: 0.01 }, pos);
        if (rect) {
            tl.to(rect, { drawSVG: "0% 100%", ease: "none", duration: 0.25 }, pos);
            tl.to(rect, { attr: { 'fill-opacity': 1 }, duration: 0.1, ease: 'power1.out' }, pos + 0.22);
        }
        if (highlight) {
            const padX = Number(highlight.dataset.padX || 4);
            const anchor = highlight.dataset.anchor || 'start';
            const lx = Number(highlight.dataset.lx || 0);
            let w = Number(highlight.dataset.targetWidth || 0);

            const measure = () => {
                let measured = 0;
                if (labelEl && labelEl.getComputedTextLength) {
                    measured = labelEl.getComputedTextLength();
                } else if (labelEl) {
                    try { measured = labelEl.getBBox().width; } catch (_) {}
                }
                if (measured > 0) {
                    w = measured + (anchor === 'end' ? 0 : padX * 2);
                    // Adjust x for end-anchored labels so left edge aligns
                    if (anchor === 'end') {
                        gsap.set(highlight, { attr: { x: lx - w } });
                    }
                }
            };

            if (!w || w <= 1) {
                measure();
            }

            tl.to(highlight, { attr: { width: w }, ease: 'none', duration: 0.22 }, pos + 0.02);

            // If fonts load later, correct the width once
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    const before = w;
                    measure();
                    const after = w;
                    if (after && Math.abs(after - before) > 1) {
                        gsap.to(highlight, { attr: { width: after, x: anchor === 'end' ? (lx - after) : undefined }, duration: 0.15, overwrite: true });
                    }
                }).catch(() => {});
            }
        }
    });
    return tl;
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

 