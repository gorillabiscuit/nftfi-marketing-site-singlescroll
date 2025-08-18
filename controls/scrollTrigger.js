// Scroll Trigger Module for NFTfi Marketing Site
// Handles all scroll-related animations and GSAP ScrollTrigger functionality

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MODEL_CONFIG, TARGET_CONFIG, GRID_STATES, RECT_STATES, SECTION2_TIMINGS } from '../config.js';
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
        // Build the Section 2 master timeline (pinned) without relying on any external anchor element
        if (section2Timeline && section2Timeline.scrollTrigger) {
            try { section2Timeline.scrollTrigger.kill(); } catch (_) {}
        }
        if (section2Timeline) {
            try { section2Timeline.kill(); } catch (_) {}
        }

        section2Timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerEl || "section[data-section='2']",
                start: 'top top',
                end: '+=2500',
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                scrub: true
            }
        });

        // Labels to control overlaps between phases
        section2Timeline.addLabel('draw', 0);
        section2Timeline.addLabel('outward', 0.25 + SECTION2_TIMINGS.delayBeforeOutward + SECTION2_TIMINGS.delayAfterDrawing);
        const rotateDelay = (SECTION2_TIMINGS.rotateStartDelay != null)
            ? SECTION2_TIMINGS.rotateStartDelay
            : (SECTION2_TIMINGS.delayBeforeOutward + SECTION2_TIMINGS.delayBeforeRotateStep);
        section2Timeline.addLabel('rotate', 0.5 + rotateDelay);
        section2Timeline.addLabel('expand', 0.55);
        // Compute a 'title' point after rotation completes (max of rotateStep and microRotate)
        const postRotateOffset = Math.max(SECTION2_TIMINGS.rotateStep, SECTION2_TIMINGS.microRotate);
        section2Timeline.addLabel('title', `rotate+=${postRotateOffset + SECTION2_TIMINGS.titleDelayAfterRotate}`);

        // Rebuild SVG & globals and create separate vertical/horizontal draw timelines
        const initialBuildTL = createDrawingPhase();
        section2Timeline.add(initialBuildTL, 0);

        const verticalDrawTL = gsap.timeline();
        const horizontalDrawTL = gsap.timeline();
        // Target lines by axis
        const vLines = () => (window.lineGroups?.vertical || []);
        const hLines = () => (window.lineGroups?.horizontal || []);
        // Vertical draw using totals if provided
        verticalDrawTL.addLabel('start', 0);
        verticalDrawTL.add(() => {
            const vCountLocal = vLines().length || 1;
            const vEach = Math.max(0.01, SECTION2_TIMINGS.lineDrawSingle || SECTION2_TIMINGS.draw);
            const vStagger = vCountLocal > 1
                ? Math.max(0, ((SECTION2_TIMINGS.drawVerticalLinesTotal ?? (vEach + (vCountLocal - 1) * (SECTION2_TIMINGS.lineStagger || 0))) - vEach) / (vCountLocal - 1))
                : 0;
            vLines().forEach((line, index) => {
                verticalDrawTL.to(line, {
                    drawSVG: '0% 100%',
                    ease: 'none',
                    duration: vEach
                }, index * vStagger);
            });
        }, 'start');
        section2Timeline.add(verticalDrawTL, `+=${SECTION2_TIMINGS.drawVerticalLinesOffset || 0}`);

        // Horizontal draw using totals and offset; allow negative offset to overlap
        section2Timeline.add(horizontalDrawTL, `>+=${SECTION2_TIMINGS.drawHorizontalLinesOffset || 0}`);
        horizontalDrawTL.add(() => {
            const hCountLocal = hLines().length || 1;
            const hEach = Math.max(0.01, SECTION2_TIMINGS.lineDrawSingle || SECTION2_TIMINGS.draw);
            const hStagger = hCountLocal > 1
                ? Math.max(0, ((SECTION2_TIMINGS.drawHorizontalLinesTotal ?? (hEach + (hCountLocal - 1) * (SECTION2_TIMINGS.lineStagger || 0))) - hEach) / (hCountLocal - 1))
                : 0;
            hLines().forEach((line, index) => {
                horizontalDrawTL.to(line, {
                    drawSVG: '0% 100%',
                    ease: 'none',
                    duration: hEach
                }, index * hStagger);
            });
        }, 0);

        // Build cells and prep strokes immediately after drawing starts
        const staticCellsPhase = createStaticCellsPhase();
        section2Timeline.add(staticCellsPhase, ">-");
        const cellsStrokePrep = prepareCellsStrokeDraw();
        section2Timeline.add(cellsStrokePrep, ">-");

        // Outward expansion after drawing completes using explicit offset if set
        const outwardExpansionPhase = createOutwardExpansionPhase();
        section2Timeline.add(outwardExpansionPhase, `>+=${(SECTION2_TIMINGS.outwardOffset ?? (SECTION2_TIMINGS.delayAfterDrawing + SECTION2_TIMINGS.delayBeforeOutward))}`);

        // Additional rotation after outward using explicit rotateOffset/rotateStartDelay
        const rotationPhase = createRotationPhase();
        section2Timeline.add(rotationPhase, `>+=${((SECTION2_TIMINGS.rotateOffset ?? SECTION2_TIMINGS.rotateStartDelay) || 0)}`);

        // Final expansion after rotation with optional expandOffset
        const expansionPhase = createExpansionPhase();
        section2Timeline.add(expansionPhase, `>+=${(SECTION2_TIMINGS.expandOffset || 0)}`);

        // Title reveal (Key Metrics) with label-like wipe effect
        try {
            const titleEl = document.querySelector('.key-metrics-title');
            if (titleEl) {
                const cs = getComputedStyle(titleEl);
                // Force highlight color to pure white regardless of title computed color
                const color = '#FFFFFF';
                const fontSizePx = parseFloat(cs.fontSize) || 16;
                const padX = 4;
                const padY = 20;

                // Ensure positioned context and initial invisibility
                gsap.set(titleEl, { opacity: 0, position: cs.position === 'static' ? 'relative' : cs.position });

                // Create highlight overlay on top of the title
                const hl = document.createElement('div');
                hl.className = 'key-metrics-highlight';
                titleEl.appendChild(hl);
                gsap.set(hl, {
                    position: 'absolute',
                    left: `${-padX}px`,
                    top: `${-padY}px`,
                    height: `${fontSizePx + padY * 2}px`,
                    width: 0,
                    backgroundColor: color,
                    zIndex: 1,
                    pointerEvents: 'none'
                });

                const measure = () => {
                    const rect = titleEl.getBoundingClientRect();
                    return Math.max(padX * 2, rect.width + padX * 2);
                };

                // 1) Wipe expand (schedule after rotation)
                section2Timeline.to(hl, {
                    width: () => measure(),
                    duration: SECTION2_TIMINGS.highlightExpand,
                    ease: 'none'
                }, `>+=${((SECTION2_TIMINGS.titleOffset ?? SECTION2_TIMINGS.titleDelayAfterRotate) || 0)}`);

                // 2) Title visible (full opacity for title, unlike labels)
                section2Timeline.to(titleEl, {
                    opacity: 1,
                    duration: SECTION2_TIMINGS.labelReveal,
                    ease: 'none'
                }, ">");

                // 3) Wipe shrink left-to-right (move left edge right while width goes to 0)
                section2Timeline.to(hl, {
                    width: 0,
                    left: () => `${-padX + measure()}px`,
                    duration: SECTION2_TIMINGS.highlightShrink,
                    ease: 'none'
                }, ">");
            }
        } catch (_) {}

        // Blocks: add each visible block as its own TL sequentially after title using blockGap
        const blocksTL = createBlocksRevealPhase();
        // Instead of adding the entire phase at once, we reuse its internal per-node logic by
        // constructing a per-node TL chain using the same timings and stagger parameters.
        // For minimal code change, keep existing function but add as a group right after title delay.
        section2Timeline.add(blocksTL, `>+=${((SECTION2_TIMINGS.blocksFirstOffset ?? SECTION2_TIMINGS.blocksStartAfterTitle) || 0)}`);

        console.log('Master timeline with 4-phase animation created successfully');
        try { ScrollTrigger.refresh(); } catch (_) {}
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
 
     // Initialize lines to undrawn state; drawing is handled by dedicated draw timelines
     lineGroups.all.forEach((line) => {
         gsap.set(line, { drawSVG: "50% 50%" });
     });
 
     console.log('Phase 1: Grid built and initial states set (drawing handled by dedicated timelines)');
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
            duration: SECTION2_TIMINGS.outward
        }, 0); // simultaneous with rotation
    });

    verticalLines.forEach((line) => {
        const level = Number(line.dataset.level || 0);
        const targetX = level * newSpacing; // map by logical level
        outwardExpansionTimeline.to(line, {
            x: targetX,
            ease: "none",
            duration: SECTION2_TIMINGS.outward
        }, 0); // simultaneous with rotation
    });
    
    // Rotate the entire group (preserves ordering/spacing). Avoid rotating individual lines.
    outwardExpansionTimeline.to(gridGroup, {
        rotation: 45,
        ease: "none",
        duration: SECTION2_TIMINGS.outward
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
function createRotationPhase() {
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
    rotationTimeline.to(gridGroup, {
        rotation: 45,
        ease: "none",
        duration: SECTION2_TIMINGS.outward
    }, 0);
    
    // Rotate the whole grid group to preserve relative ordering and spacing
    rotationTimeline.to(gridGroup, {
        rotation: 90, // Rotate to 90° total relative to initial (Phase 2 adds first 45° over group too)
        ease: "none",
        duration: SECTION2_TIMINGS.outward
    }, 0);

    // Subtle per-line micro-rotation with stagger for organic feel (does not affect final angle)
    // Keeps gridGroup rotation as the authoritative rotation to preserve alignment
    rotationTimeline.fromTo(allLines, {
        rotation: -2 // degrees
    }, {
        rotation: 0,
        ease: "none",
        duration: SECTION2_TIMINGS.microRotate,
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
                    amount.setAttribute('data-role', 'amount');

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
                    // Start hidden; will appear after label reveal completes
                    gsap.set(amount, { opacity: 0 });
                }

                if (lblCfg) {
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
                    if (rot != null) {
                        label.setAttribute('transform', `rotate(${rot} ${lx} ${ly})`);
                    }

                    // Insert a highlight wipe rect (above the text): append after label so it sits on top visually
                    const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    const fontSize = Number(lblCfg.fontSize ?? 16);
                    const padX = 4;
                    const padY = 2;
                    const hlTop = ly - fontSize - padY;
                    const hlLeft = lx - (anchor === 'end' ? 0 : padX);
                    const hlHeight = fontSize + padY * 2;
                    const labelFill = (lblCfg.color ?? '#FFFFFF');
                    gsap.set(highlight, { attr: { x: hlLeft, y: hlTop, width: 0, height: hlHeight, fill: labelFill, 'fill-opacity': 1 } });
                    highlight.setAttribute('class', 'label-highlight');
                    if (rot != null) {
                        highlight.setAttribute('transform', `rotate(${rot} ${lx} ${ly})`);
                    }

                    // Append label first (below), then highlight (above)
                    cellNode.appendChild(label);
                    cellNode.appendChild(highlight);

                    // Make label initially invisible; will reveal after highlight expansion
                    gsap.set(label, { opacity: 0 });

                    // Defer width measurement to reveal phase via function-based values
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
        const gap = (SECTION2_TIMINGS.blockGap != null) ? SECTION2_TIMINGS.blockGap : 0.25;
        const pos = index * gap;
        // Reveal entire node (text + rect)
        tl.to(node, { opacity: 1, duration: 0.01 }, pos);
        if (rect) {
            tl.to(rect, { drawSVG: "0% 100%", ease: "none", duration: SECTION2_TIMINGS.rectDraw }, pos);
            tl.to(rect, { attr: { 'fill-opacity': 1 }, duration: SECTION2_TIMINGS.rectFillFade, ease: 'power1.out' }, pos + (SECTION2_TIMINGS.rectDraw - 0.03));
        }
        if (highlight && labelEl) {
            const padding = 8;
            const anchor = (labelEl.getAttribute('text-anchor')) || 'start';
            const labelXAttr = labelEl.getAttribute('x');
            const labelX = labelXAttr != null ? Number(labelXAttr) : 0;

            const measure = () => {
                let width = 0;
                if (typeof labelEl.getComputedTextLength === 'function') {
                    try { width = labelEl.getComputedTextLength(); } catch (_) {}
                }
                if (!width || width <= 0) {
                    try { width = labelEl.getBBox().width; } catch (_) { width = 0; }
                }
                // Include padding on start-anchor; end-anchor handled via x shift
                return Math.max(padding, width + (anchor === 'end' ? 0 : padding));
            };

            // 1) Expand highlight to cover text
            if (anchor === 'end') {
                tl.to(
                    highlight,
                    {
                        attr: {
                            width: () => measure(),
                            x: () => (labelX - measure())
                        },
                        ease: 'none',
                        duration: SECTION2_TIMINGS.highlightExpand
                    },
                    pos + 0.02
                );
            } else {
                tl.to(
                    highlight,
                    {
                        attr: { width: () => measure() },
                        ease: 'none',
                        duration: SECTION2_TIMINGS.highlightExpand
                    },
                    pos + 0.02
                );
            }

            // 2) Make label visible once fully covered
            tl.to(labelEl, { opacity: 0.5, duration: SECTION2_TIMINGS.labelReveal, ease: 'none' }, 
                 pos + 0.02 + SECTION2_TIMINGS.highlightExpand);

            // 3) Disappear highlight left-to-right
            if (anchor === 'end') {
                // Keep right edge at labelX; left edge moves right
                tl.to(
                    highlight,
                    {
                        attr: { width: 0, x: () => labelX },
                        ease: 'none',
                        duration: SECTION2_TIMINGS.highlightShrink
                    },
                    pos + 0.02 + SECTION2_TIMINGS.highlightExpand + SECTION2_TIMINGS.labelReveal
                );
            } else {
                // Move left edge right while shrinking to 0
                tl.to(
                    highlight,
                    {
                        attr: { width: 0, x: () => (labelX + measure()) },
                        ease: 'none',
                        duration: SECTION2_TIMINGS.highlightShrink
                    },
                    pos + 0.02 + SECTION2_TIMINGS.highlightExpand + SECTION2_TIMINGS.labelReveal
                );
            }
        }

        // 4) Amount number-only counting effect (e.g., "$700M+" => count 0 -> 700)
        const amountEl = node.querySelector('text[data-role="amount"]');
        if (amountEl) {
            const original = amountEl.textContent || '';
            const m = original.match(/(-?[\d,]+(?:\.[\d]+)?)/);
            if (m && m.index != null) {
                const numStr = m[1];
                const prefix = original.slice(0, m.index);
                const suffix = original.slice(m.index + numStr.length);
                const decimals = (numStr.split('.')[1] || '').length;
                const target = parseFloat(numStr.replace(/,/g, '')) || 0;
                const monthLike = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(prefix + suffix);
                const formatter = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                    useGrouping: monthLike ? false : true
                });
                const counter = { value: 0 };

                // Timings
                const expandStart = pos + 0.02;
                const expandDur = SECTION2_TIMINGS.highlightExpand;
                const labelRevealDur = SECTION2_TIMINGS.labelReveal;
                const labelRevealEnd = expandStart + expandDur + labelRevealDur;

                // Appear amount right after label is fully visible
                const amountAppearStart = labelRevealEnd + SECTION2_TIMINGS.amountDelayAfterLabel;
                const amountAppearDur = SECTION2_TIMINGS.amountAppear;
                tl.to(amountEl, { opacity: 1, duration: amountAppearDur, ease: 'power1.out' }, amountAppearStart);

                // Initialize display at 0
                amountEl.textContent = prefix + formatter.format(0) + suffix;

                // Start counting immediately after it appears
                const countStart = amountAppearStart + amountAppearDur;
                tl.to(counter, {
                    value: target,
                    duration: SECTION2_TIMINGS.amountCount,
                    ease: 'power2.out',
                    onUpdate: () => {
                        amountEl.textContent = prefix + formatter.format(counter.value) + suffix;
                    },
                    onComplete: () => {
                        amountEl.textContent = prefix + formatter.format(target) + suffix;
                    }
                }, countStart);
            }
        }
    });
    return tl;
}

// Ensure ScrollTrigger refreshes once fonts are ready so text metrics are stable
try {
    if (document && document.fonts && typeof document.fonts.ready?.then === 'function') {
        document.fonts.ready.then(() => {
            if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger?.refresh) {
                ScrollTrigger.refresh();
            }
        }).catch(() => {});
    }
} catch (_) {}

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

 