// Scroll Trigger Module for NFTfi Marketing Site
// Handles all scroll-related animations and GSAP ScrollTrigger functionality

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MODEL_CONFIG, TARGET_CONFIG, GRID_STATES, RECT_STATES, SECTION2_TIMINGS, SECTION2_SCROLL, SECTION4_LAYOUT, SECTION4_PEBBLE, SECTION4_TIMINGS, SECTION4_SCROLL, SECTION4_PEBBLE_SPIN, SECTION5_CONFIG, SECTION5_LAYOUT, SECTION6_TIMINGS, SECTION6_SCROLL } from '../config/index.js';
import { BREAKPOINT_NAMES } from '../config/breakpoints.js';
import { onStateChange, getCurrentAnimationState, getCurrentBreakpoint } from '../utils/breakpointManager.js';
import { updatePlaneTextureForSection, setupSectionPreCapture, switchToVideoTexture, switchToHeroTexture } from '../objects/backgroundPlane.js';
// Blur plugin registration for GSAP
(function () {
    const blurProperty = gsap.utils.checkPrefix("filter"),
        blurExp = /blur\((.+)?px\)/,
        getBlurMatch = (target) => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];
    gsap.registerPlugin({
        name: "blur",
        get(target) { return Number(getBlurMatch(target)[1]) || 0; },
        init(target, endValue) {
            let data = this,
                filter = gsap.getProperty(target, blurProperty),
                endBlur = "blur(" + endValue + "px)",
                match = getBlurMatch(target)[0],
                index;
            if (filter === "none") { filter = ""; }
            if (match) {
                index = filter.indexOf(match);
                endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
            } else {
                endValue = filter + endBlur;
                filter += filter ? " blur(0px)" : "blur(0px)";
            }
            data.target = target;
            data.interp = gsap.utils.interpolate(filter, endValue);
        },
        render(progress, data) { data.target.style[blurProperty] = data.interp(progress); }
    });
})();

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
    
    // Enable scroll-based positioning immediately (no initial animation blocking)
    window.isInitialLoadComplete = true;
    window.scrollScaleActive = true;
    
    // Create the ScrollTrigger animation immediately
    createScrollTimeline();
    
    // Listen for state changes and recreate animation
    onStateChange((newState, oldState) => {
        console.log('ScrollTrigger: State changed, recreating animation', { from: oldState, to: newState });
        recreateScrollAnimation();
    });
    
    // Set up section 2 pinning
    setupSection2Pinning();
    
    // console.log('Scroll animation setup complete');
}

/**
 * Reveal the pebble (and its child plane) only when Section 4 comes into view.
 * The pebble should start offscreen and rise from the bottom as Section 4 enters.
 */
// Removed non-pinned S4 entrance trigger in favor of a single pinned controller

/**
 * Create a pinned, scrubbed Section 4 timeline that fades in the pebble
 * while lifting it from offscreen. Opacity is applied to all child materials.
 */
export function setupSection4PebbleFadePinned(pebbleGroup) {
    if (!pebbleGroup) return;
    try { gsap.killTweensOf([pebbleGroup.position]); } catch (_) { void 0; }
    // Collect all non-shader materials (e.g., plane) for fading
    const materials = [];
    pebbleGroup.traverse((obj) => {
        if (obj && obj.isMesh && obj.material) {
            const mat = obj.material;
            // Support arrays of materials as well
            if (Array.isArray(mat)) {
                mat.forEach((m) => { if (m && !m.isShaderMaterial) materials.push(m); });
            } else {
                if (!mat.isShaderMaterial) materials.push(mat);
            }
        }
    });
    // Prepare materials for fading
    materials.forEach((m) => { try { m.transparent = true; m.opacity = 0; } catch (_) { void 0; } });
    // Ensure starting state: hidden and offscreen
    gsap.set(pebbleGroup, { visible: false });
    const startY = (typeof pebbleGroup.position?.y === 'number') ? pebbleGroup.position.y : -20;
    gsap.set(pebbleGroup.position, { y: startY });

    // Build timeline first (without ScrollTrigger) so we can scale scroll distance to its duration
    const tl = gsap.timeline();
    // Apply center-anchored offsets from config per breakpoint
    const titleEl = document.getElementById('section4-title');
    const panelEl = document.getElementById('section4-panel');
    try {
        const bp = getCurrentBreakpoint();
        const cfg = (SECTION4_LAYOUT && SECTION4_LAYOUT[bp]) ? SECTION4_LAYOUT[bp] : SECTION4_LAYOUT[BREAKPOINT_NAMES.DESKTOP];
        if (titleEl) {
            titleEl.style.setProperty('--x', cfg.title.x);
            titleEl.style.setProperty('--y', cfg.title.y);
            titleEl.style.willChange = 'transform, filter, opacity';
        }
        if (panelEl) {
            panelEl.style.setProperty('--x', cfg.panel?.x ?? '0%');
            panelEl.style.setProperty('--y', cfg.panel?.y ?? '0%');
            panelEl.style.willChange = 'transform, filter, opacity';
        }
    } catch (_) { void 0; }

    // Pre-capture Section 4 content before pin; mark success to skip onEnter capture
    setupSectionPreCapture(".section[data-section='4']", '500px');

    // Tie title blur/opacity/scale into this pinned, scrubbed timeline
    const title = document.querySelector('.section4-title');
    if (title) {
        const t = SECTION4_TIMINGS;
        let cursor = 0;
        // period
        cursor += (t.periodA ?? 0.05);
        // h2 fade in
        tl.from(title, { blur: 15, alpha: 0.0, scale: 0.95, ease: 'power2.inOut', duration: (t.h2FadeIn ?? 0.15) }, cursor);
        cursor += (t.h2FadeIn ?? 0.15);
        // h2 show period
        tl.to(title, { opacity: 1, duration: 0.001 }, cursor);
        cursor += (t.h2Show ?? 0.15);
        // h2 fade out
        tl.to(title, { opacity: 0, ease: 'power2.in', duration: (t.h2FadeOut ?? 0.10) }, cursor);
        cursor += (t.h2FadeOut ?? 0.10);
        // store the cursor for later phases
        title._s4CursorAfterTitle = cursor;
    }
    // Fade in materials via a proxy for reliable onUpdate
    const proxy = { v: 0 };
    tl.to(proxy, {
        v: 1,
        ease: 'none',
        onUpdate: () => {
            const val = proxy.v;
            for (let i = 0; i < materials.length; i += 1) {
                const m = materials[i];
                if (m && typeof m.opacity === 'number') { m.opacity = val; }
            }
        }
    }, 0);
    // Lift from offscreen and position/scale per breakpoint settings
    try {
        const bp = getCurrentBreakpoint();
        const pcfg = (SECTION4_PEBBLE && SECTION4_PEBBLE[bp]) ? SECTION4_PEBBLE[bp] : SECTION4_PEBBLE[BREAKPOINT_NAMES.DESKTOP];
        const t = SECTION4_TIMINGS; let cursor = (title && title._s4CursorAfterTitle) ? title._s4CursorAfterTitle : 0.4;
        // After title fade-out, wait period, then animate pebble in, then another period, then first item
        cursor += (t.periodB ?? 0.05);
        // pebble animates in
        tl.to(pebbleGroup.position, { y: 0 + (pcfg.position?.y ?? 0), x: (pcfg.position?.x ?? -3.5), z: (pcfg.position?.z ?? 0), ease: 'none', duration: (t.pebbleIn ?? 0.20) }, cursor);
        // scale relative: multiply baseline by factor; using additive on each axis
        const s = (pcfg.scale ?? 1.75) - 1.0;
        tl.to(pebbleGroup.scale, { x: `+=${s}`, y: `+=${s}`, z: `+=${s}`, ease: 'none', duration: (t.pebbleIn ?? 0.20) }, cursor);
        cursor += (t.pebbleIn ?? 0.20);
        // hold after entrance before first item begins
        cursor += (t.periodC ?? 0.05);
        // mark the start time for continuous Y spin
        const spinStart = cursor;
        // list items appear sequentially
        const items = Array.from(document.querySelectorAll('.section4-list li'));
        if (items.length) {
            items.forEach((li, i) => {
                tl.to(li, { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: (t.listItem ?? 0.08) }, cursor);
                cursor += (t.listItem ?? 0.08) + (t.periodBetweenItems ?? 0.04);
            });
            // bold cycling
            items.forEach((li, i) => {
                tl.to(li, { fontWeight: 700, duration: (t.boldHold ?? 0.06) }, cursor);
                const prev = items[i - 1];
                if (prev) tl.to(prev, { fontWeight: 500, duration: 0.001 }, cursor);
                cursor += (t.boldHold ?? 0.06) + (t.periodBetweenBolds ?? 0.02);
            });
        }
    } catch (_) {
        tl.to(pebbleGroup.position, { y: 0, x: -3.5, ease: 'none' }, 0.4);
        tl.to(pebbleGroup.scale, { x: '+=0.75', y: '+=0.75', z: '+=0.75', ease: 'none' }, 0.4);
    }

    // Define items (title + body). Placeholder copy per request.
    const s4Items = [
        { title: 'Digital Art', body: 'Unique, scarce, and truly ownable digital artworks, from generative masterpieces to AI and networked creativity.' },
        { title: 'PFPs', body: 'Profile-picture collections powering digital identity, and online community networks.' },
        { title: 'Real-World Assets (RWAs)', body: 'Tokenized real estate, land, and fine art, moving billion-dollar markets on-chain.' },
        { title: 'DeFi tokens', body: 'Liquidity positions and protocol tokens, enabling composable, on-chain finance.' }
    ];

    // Initialize single panel pre-state
    const itemTitleEl = document.getElementById('section4-item-title');
    const itemBodyEl = document.getElementById('section4-item-body');
    if (itemTitleEl) gsap.set(itemTitleEl, { opacity: 0, y: 10, filter: 'blur(6px)' });
    if (itemBodyEl) gsap.set(itemBodyEl, { opacity: 0, y: 10, filter: 'blur(6px)' });
    
    // Initialize content with first item to ensure proper initial state
    if (itemTitleEl && s4Items[0]) itemTitleEl.textContent = s4Items[0].title;
    if (itemBodyEl && s4Items[0]) itemBodyEl.textContent = s4Items[0].body;

    // For each item: title in (splt-like), body in, hold, fade both out, swap content
    try {
        const t = SECTION4_TIMINGS;
        let cursor = (title && title._s4CursorAfterTitle) ? title._s4CursorAfterTitle : 0.4;
        cursor += (t.periodC ?? 0.2);
        
        // Store timeline positions for progress-based content switching
        const itemPositions = [];
        
        s4Items.forEach((it, idx) => {
            // Record the timeline position where this item should be active
            itemPositions.push({
                startTime: cursor - 0.001,
                item: it,
                index: idx
            });
            
            // Remove the problematic tl.add() function call
            // Content will be managed by progress-based system instead
            // title in (fire spin boost onStart reliably)
            tl.to(itemTitleEl, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                rotationY: 0,
                ease: 'power2.out',
                duration: (t.itemTitleIn ?? 1.0),
                // Removed onStart spin boost - now handled in content update callback for bidirectional support
            }, cursor);
            // Pebble spin boost now handled in content update callback for bidirectional support
            // body in after title
            tl.to(itemBodyEl, { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: (t.itemBodyIn ?? 1.0) }, cursor + (t.itemTitleIn ?? 1.0) * 0.6);
            // hold
            cursor += (t.itemTitleIn ?? 1.0) + (t.itemBodyIn ?? 1.0) + (t.itemHold ?? 2.0);
            // fade out both
            tl.to([itemTitleEl, itemBodyEl], { opacity: 0, y: 10, filter: 'blur(6px)', ease: 'power2.in', duration: (t.itemFadeOut ?? 0.8) }, cursor);
            cursor += (t.itemFadeOut ?? 0.8) + (t.periodBetweenItems ?? 0.4);
        });
        
        // Add progress-based content management to handle bidirectional scrubbing
        let lastActiveIndex = -1;
        tl.eventCallback('onUpdate', () => {
            const currentTime = tl.time();
            const totalDuration = tl.totalDuration();
            
            // Find which item should be active based on timeline progress
            let activeIndex = -1;
            for (let i = itemPositions.length - 1; i >= 0; i--) {
                if (currentTime >= itemPositions[i].startTime) {
                    activeIndex = i;
                    break;
                }
            }
            
            // Edge case: if we're before all items, show the first item
            if (activeIndex === -1 && itemPositions.length > 0) {
                activeIndex = 0;
            }
            
            // Only update content when the active item changes and we have a valid index
            if (activeIndex !== lastActiveIndex && activeIndex >= 0 && activeIndex < s4Items.length) {
                const activeItem = s4Items[activeIndex];
                if (itemTitleEl && activeItem) itemTitleEl.textContent = activeItem.title;
                if (itemBodyEl && activeItem) itemBodyEl.textContent = activeItem.body;
                
                // Switch to corresponding video texture when pebble spins fast
                if (activeItem && activeItem.title) {
                    switchToVideoTexture(activeItem.title);
                }
                
                // Trigger pebble spin boost for EVERY content change (forward AND backward)
                if (pebbleGroup) {
                    if (!pebbleGroup.userData) pebbleGroup.userData = {};
                    const add = (SECTION4_PEBBLE_SPIN?.boostDegPerSecond ?? 180);
                    pebbleGroup.userData.spinBoostDegPerSec = (pebbleGroup.userData.spinBoostDegPerSec || 0) + add;
                    console.log('[S4] Pebble spin boost triggered:', {
                        index: activeIndex,
                        title: activeItem.title,
                        direction: activeIndex > lastActiveIndex ? 'forward' : 'backward',
                        add,
                        newBoost: pebbleGroup.userData.spinBoostDegPerSec
                    });
                }
                
                lastActiveIndex = activeIndex;
                
                // Debug logging to track content changes (can be removed for production)
                console.log('[S4] Content updated:', {
                    index: activeIndex,
                    title: activeItem.title,
                    time: currentTime.toFixed(3),
                    progress: (currentTime / totalDuration * 100).toFixed(1) + '%'
                });
            }
        });

        // Note: continuous spin handled per-frame (not scrubbed) in core/loop.js
    } catch (_) { void 0; }

    // Create ScrollTrigger bound to this timeline with end based on timeline totalDuration
    ScrollTrigger.create({
        trigger: ".section[data-section='4']",
        start: 'top top',
        end: () => '+=' + Math.round(tl.totalDuration() * (SECTION4_SCROLL?.pxPerUnit ?? 1400)),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        onEnter: () => {
            // Avoid heavy capture onEnter; rely on pre-capture
            try { if (!window.__s4PreCaptured) { /* fallback disabled */ } } catch (_) { void 0; }
            gsap.set(pebbleGroup, { visible: true });
        },
        onEnterBack: () => {
            try { /* no capture on enterBack */ } catch (_) { void 0; }
            gsap.set(pebbleGroup, { visible: true });
        },
        onLeaveBack: () => { 
            gsap.set(pebbleGroup, { visible: false }); 
            // Switch back to Art.mp4 only when leaving backward (going back to Section 3)
            switchToHeroTexture();
        },
        onLeave: () => {
            // When leaving forward (going to Section 5), keep the last video playing
            // Don't call switchToHeroTexture() - maintain current video
        }
    });

    // Defensive: refresh ScrollTrigger after layout settles to ensure pin engages
    try {
        setTimeout(() => { try { ScrollTrigger.refresh(); } catch (_) { void 0; } }, 100);
    } catch (_) { void 0; }
    
    // Add separate ScrollTrigger for pebble exit animation when transitioning to Section 5
    setupPebbleExitAnimation(pebbleGroup);
}

/**
 * Create a dedicated ScrollTrigger for animating the pebble upward when transitioning from Section 4 to Section 5
 * This is separate from the Section 4 pinned timeline to avoid bidirectional scrubbing issues
 */
function setupPebbleExitAnimation(pebbleGroup) {
    if (!pebbleGroup) return;
    
    ScrollTrigger.create({
        trigger: ".section[data-section='5']",
        start: 'top bottom', // When Section 5 starts entering viewport from bottom
        end: 'top center',   // Until Section 5 reaches center of viewport
        markers: false,
        id: 'pebble-exit-animation',
        onEnter: () => {
            // Only animate upward when scrolling forward (not when coming back from Section 5)
            console.log('[Pebble Exit] Starting upward animation to Section 5');
            
            // Kill any existing pebble position tweens to avoid conflicts
            try { gsap.killTweensOf(pebbleGroup.position); } catch (_) { void 0; }
            
            // Animate pebble upward with smooth acceleration
            gsap.to(pebbleGroup.position, {
                y: 25, // Move well above viewport (positive Y = upward)
                duration: 1.8,
                ease: 'power2.in',
                onComplete: () => {
                    console.log('[Pebble Exit] Upward animation completed');
                }
            });
            
            // Optional: Add slight scale reduction for depth effect
            gsap.to(pebbleGroup.scale, {
                x: '-=0.3',
                y: '-=0.3', 
                z: '-=0.3',
                duration: 1.8,
                ease: 'power2.in'
            });
        },
        onLeaveBack: () => {
            // When scrolling back from Section 5 to Section 4, restore pebble position
            console.log('[Pebble Exit] Restoring pebble position from Section 5 back to Section 4');
            
            try { gsap.killTweensOf([pebbleGroup.position, pebbleGroup.scale]); } catch (_) { void 0; }
            
            // Get current breakpoint configuration for proper restoration
            const bp = getCurrentBreakpoint();
            const pcfg = (SECTION4_PEBBLE && SECTION4_PEBBLE[bp]) ? SECTION4_PEBBLE[bp] : SECTION4_PEBBLE[BREAKPOINT_NAMES.DESKTOP];
            
            // Restore to Section 4 position smoothly
            gsap.to(pebbleGroup.position, {
                y: 0 + (pcfg.position?.y ?? 0),
                x: (pcfg.position?.x ?? -3.5),
                z: (pcfg.position?.z ?? 0),
                duration: 1.2,
                ease: 'power2.out'
            });
            
            // Restore scale (baseline 2.0 + additional scale from config)
            const baselineScale = 2.0; // From pebbleModel.js initial scale
            const additionalScale = (pcfg.scale ?? 1.75) - 1.0; // Same calculation as Section 4 entrance
            const finalScale = baselineScale + additionalScale;
            
            gsap.to(pebbleGroup.scale, {
                x: finalScale,
                y: finalScale,
                z: finalScale,
                duration: 1.2,
                ease: 'power2.out'
            });
        }
    });
}

// Create or recreate the scroll timeline
function createScrollTimeline() {
    // Kill existing timeline if it exists
    if (scrollTimeline) {
        scrollTimeline.kill();
    }
    // Ensure no competing tweens are acting on wrapper.scale
    try { gsap.killTweensOf(wrapper?.scale); } catch (_) { void 0; }
    
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
                    const scrollDirection = self.direction;
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
                    
                    // Hide mesh just before reaching final position and show logo accent paths
                    if (progress > 0.99) {
                        wrapper.visible = false;
                        // Show the accent paths in the logo when mesh disappears
                        const accentPath1 = document.getElementById('logo-accent-1');
                        const accentPath2 = document.getElementById('logo-accent-2');
                        if (accentPath1) accentPath1.style.opacity = '1';
                        if (accentPath2) accentPath2.style.opacity = '1';
                        console.log('[Mesh] Hidden and logo accents shown at scroll progress:', progress.toFixed(3));
                    } else {
                        wrapper.visible = true;
                        // Hide the accent paths when mesh is visible
                        const accentPath1 = document.getElementById('logo-accent-1');
                        const accentPath2 = document.getElementById('logo-accent-2');
                        if (accentPath1) accentPath1.style.opacity = '0';
                        if (accentPath2) accentPath2.style.opacity = '0';
                    }
                    
                    // debug (disabled): S1 scroll state
                    // console.log('S1 scroll debug', { progress, startScale: startPos.scale, targetScale: dynamicTarget.scale, currentScale, wrapperScale: wrapper.scale.x, meshOpacity, at: Date.now() });
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
            try { ScrollTrigger.refresh(); } catch (_) { void 0; }
            isRebuilding = false;
        });
    };

    const mm = gsap.matchMedia();
    mm.add("(max-width: 600px)", () => rebuildFor('mobile'));
    mm.add("(min-width: 601px) and (max-width: 900px)", () => rebuildFor('tablet'));
    mm.add("(min-width: 901px)", () => rebuildFor('desktop'));
    
    // Function to start the advanced 3-phase animation sequence
    function startAdvancedAnimationSequence(triggerEl, scrollerEl) {
        // Build the Section 2 master timeline (pinned) without relying on any external anchor element
        if (section2Timeline && section2Timeline.scrollTrigger) {
            try { section2Timeline.scrollTrigger.kill(); } catch (_) { void 0; }
        }
        if (section2Timeline) {
            try { section2Timeline.kill(); } catch (_) { void 0; }
        }

        section2Timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerEl || "section[data-section='2']",
                start: 'top top',
                // Scale scroll distance in proportion to the timeline's total duration
                end: () => '+=' + Math.round((section2Timeline ? section2Timeline.totalDuration() : 4) * (SECTION2_SCROLL?.pxPerSecond || 600)),
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                scrub: true
            }
        });

        // No absolute labels; use relative sequencing only
 
        // Rebuild SVG & globals and create separate vertical/horizontal draw timelines
        const initialBuildTL = createDrawingPhase();
        section2Timeline.add(initialBuildTL, 0);

        const verticalDrawTL = gsap.timeline();
        const horizontalDrawTL = gsap.timeline();
        // Target lines by axis
        const vLines = () => (window.lineGroups?.vertical ?? []);
        const hLines = () => (window.lineGroups?.horizontal ?? []);
        // Vertical draw using totals if provided
        verticalDrawTL.addLabel('start', 0);
        verticalDrawTL.add(() => {
            const vCountLocal = vLines().length;
            if (!vCountLocal) return;
            if (typeof SECTION2_TIMINGS.lineDrawSingle !== 'number') {
                console.error('Missing SECTION2_TIMINGS.lineDrawSingle');
                return;
            }
            const vEach = Math.max(0.01, SECTION2_TIMINGS.lineDrawSingle);
            const vStagger = vCountLocal > 1
                ? Math.max(0, ((SECTION2_TIMINGS.drawVerticalLinesTotal ?? (vEach + (vCountLocal - 1) * (SECTION2_TIMINGS.lineStagger))) - vEach) / (vCountLocal - 1))
                : 0;
            vLines().forEach((line, index) => {
                verticalDrawTL.to(line, {
                    drawSVG: '0% 100%',
                    ease: 'none',
                    duration: vEach
                }, index * vStagger);
            });
        }, 'start');
        section2Timeline.add(verticalDrawTL, `+=${SECTION2_TIMINGS.drawVerticalLinesOffset}`);

        // Horizontal draw using totals and offset; allow negative offset to overlap
        section2Timeline.add(horizontalDrawTL, `>+=${SECTION2_TIMINGS.drawHorizontalLinesOffset}`);
        horizontalDrawTL.add(() => {
            const hCountLocal = hLines().length;
            if (!hCountLocal) return;
            if (typeof SECTION2_TIMINGS.lineDrawSingle !== 'number') {
                console.error('Missing SECTION2_TIMINGS.lineDrawSingle');
                return;
            }
            const hEach = Math.max(0.01, SECTION2_TIMINGS.lineDrawSingle);
            const hStagger = hCountLocal > 1
                ? Math.max(0, ((SECTION2_TIMINGS.drawHorizontalLinesTotal ?? (hEach + (hCountLocal - 1) * (SECTION2_TIMINGS.lineStagger))) - hEach) / (hCountLocal - 1))
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

        // Outward expansion after drawing completes using explicit offset
        const outwardExpansionPhase = createOutwardExpansionPhase();
        section2Timeline.add(outwardExpansionPhase, `>+=${SECTION2_TIMINGS.delayAfterGridDraw}`);

        // Additional rotation after outward using explicit offset
        const rotationPhase = createRotationPhase();
        section2Timeline.add(rotationPhase, `>+=${SECTION2_TIMINGS.delayAfterRotation}`);

        // Final expansion after rotation with optional offset
        const expansionPhase = createExpansionPhase();
        section2Timeline.add(expansionPhase, `>+=${SECTION2_TIMINGS.delayAfterRotationOLDNOW}`);

        // Title reveal (Key Metrics) with label-like wipe effect
        try {
            const titleEl = document.querySelector('.key-metrics-title');
            if (titleEl) {
                const cs = getComputedStyle(titleEl);
                // Force highlight color to pure white regardless of title computed color
                const color = '#FFFFFF';
                const fontSizePx = parseFloat(cs.fontSize);
                const padX = 4;
                const padY = 20;

                // Store original transform to restore later
                const originalTransform = cs.transform;
                
                // Temporarily remove transform to get accurate text width measurement
                gsap.set(titleEl, { transform: 'none' });
                
                // Measure the text width without any transforms applied
                const rect = titleEl.getBoundingClientRect();
                const textWidth = Math.max(padX * 2, rect.width + padX * 2);
                
                // Restore original transform and ensure positioned context and initial invisibility
                gsap.set(titleEl, { 
                    transform: originalTransform,
                    opacity: 0, 
                    position: cs.position === 'static' ? 'relative' : cs.position 
                });

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
                    return textWidth;
                };

                // 1) Wipe expand (schedule after rotation)
                section2Timeline.to(hl, {
                    width: () => measure(),
                    duration: SECTION2_TIMINGS.highlightExpand,
                    ease: 'none'
                }, `>+=${SECTION2_TIMINGS.delayBeforeTitle}`);

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
        } catch (_) { void 0; }

        // Blocks: add each visible block as its own TL sequentially after title using blockGap
        const blocksTL = createBlocksRevealPhase();
        // Instead of adding the entire phase at once, we reuse its internal per-node logic by
        // constructing a per-node TL chain using the same timings and stagger parameters.
        // For minimal code change, keep existing function but add as a group right after title delay.
        section2Timeline.add(blocksTL, `>+=${SECTION2_TIMINGS.delayBeforeFirstBlock}`);

        // Fade out only the grid lines (not rectangles or title) as we transition toward Section 3
        try {
            let lineNodes = [];
            if (window.lineGroups && window.lineGroups.all && typeof window.lineGroups.all.length === 'number' && window.lineGroups.all.length > 0) {
                lineNodes = window.lineGroups.all;
            } else {
                const svgEl = document.getElementById('lines-svg');
                if (svgEl && typeof svgEl.querySelectorAll === 'function') {
                    const nodeList = svgEl.querySelectorAll('path.line');
                    lineNodes = Array.prototype.slice.call(nodeList);
                }
            }
            if (lineNodes && typeof lineNodes.length === 'number' && lineNodes.length > 0) {
                section2Timeline.to(lineNodes, {
                    attr: { 'stroke-opacity': 0 },
                    duration: (typeof SECTION2_TIMINGS.fadeOutDuration === 'number') ? SECTION2_TIMINGS.fadeOutDuration : 2.0,
                    ease: 'power1.out'
                }, `>+=${(typeof SECTION2_TIMINGS.fadeOutDelay === 'number') ? SECTION2_TIMINGS.fadeOutDelay : 0}`);
            }
        } catch (e) { (void e); }
        // Add an explicit tail gap before unpinning
        section2Timeline.add(gsap.timeline().to({}, { duration: SECTION2_TIMINGS.delayBeforeUnpin }), ">");

        console.log('Master timeline with 4-phase animation created successfully');
        try { ScrollTrigger.refresh(); } catch (_) { void 0; }
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
    const gridStateKey = getCurrentAnimationState();
    const gridState = GRID_STATES[gridStateKey];
    if (!gridState) {
        console.error('Grid state missing for', gridStateKey);
        return drawingTimeline;
    }
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
    });
    
    console.log('Phase 1: Grid built and initial draw state set (actual drawing handled by vertical/horizontal timelines)');
    // Force ST to re-measure after dynamic SVG rebuild
    try { ScrollTrigger.refresh(); } catch (_) { void 0; }
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
        const level = Number(line.dataset.level);
        const targetY = level * newSpacing; // map by logical level
        outwardExpansionTimeline.to(line, {
            y: targetY,
            ease: "none",
            duration: SECTION2_TIMINGS.outward
        }, 0); // simultaneous with rotation
    });

    verticalLines.forEach((line) => {
        const level = Number(line.dataset.level);
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
        const rectStateKey1 = getCurrentAnimationState();
        const rectStateCfg = RECT_STATES[rectStateKey1];
        if (!rectStateCfg) {
            console.error('Rect state missing for', rectStateKey1);
            return outwardExpansionTimeline;
        }
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
                const i = Number(node.dataset.i);
                const j = Number(node.dataset.j);
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
    

    
    // Move and resize cells in lockstep with spacing over this phase (update group transform)
    const cellsGroup = document.getElementById('grid-cells');
    if (cellsGroup) {
        const cellNodes = Array.from(cellsGroup.querySelectorAll('.cell-node'));
        const rectStateKey2 = getCurrentAnimationState();
        const rectStateCfg2 = RECT_STATES[rectStateKey2];
        if (!rectStateCfg2) {
            console.error('Rect state missing for', rectStateKey2);
            return expansionTimeline;
        }
        const sfStart = (typeof rectStateCfg2.sizeFactorFinalStart === 'number') ? rectStateCfg2.sizeFactorFinalStart : (rectStateCfg2.sizeFactor ?? 0.5);
        const sfEnd = (typeof rectStateCfg2.sizeFactorFinalEnd === 'number') ? rectStateCfg2.sizeFactorFinalEnd : (rectStateCfg2.sizeFactor ?? 0.5);
        const pmStart = (typeof rectStateCfg2.positionFinalMultiplierStart === 'number') ? rectStateCfg2.positionFinalMultiplierStart : 1;
        const pmEnd = (typeof rectStateCfg2.positionFinalMultiplierEnd === 'number') ? rectStateCfg2.positionFinalMultiplierEnd : 1;
        expansionTimeline.eventCallback('onUpdate', () => {
            const tl = expansionTimeline;
            const t = tl.totalProgress();
            const spacingBase = gsap.utils.interpolate(baseSpacing, newSpacing, t);
            const sizeF = gsap.utils.interpolate(sfStart, sfEnd, t);
            const posMult = gsap.utils.interpolate(pmStart, pmEnd, t);
            const size = Math.max(2, spacingBase * sizeF);
            const rx = size * (rectStateCfg2.cornerRadiusFactor ?? 0.15);
            cellNodes.forEach((node) => {
                const i = Number(node.dataset.i);
                const j = Number(node.dataset.j);
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

    const rectStateKey = getCurrentAnimationState();
    const rectState = RECT_STATES[rectStateKey];
    if (!rectState) {
        console.error('Rect state missing for', rectStateKey);
        return cellsTimeline;
    }
    if (!rectState.enabled) {
        return cellsTimeline;
    }

    const { horizontal, vertical } = window.lineGroups;
    const levels = new Set([...horizontal, ...vertical].map(el => Number(el.dataset.level)));
    const maxLevel = Math.max(...levels);
    const minLevel = Math.min(...levels);

    if (typeof window.gridInitialSpacing !== 'number') {
        console.error('gridInitialSpacing missing');
        return cellsTimeline;
    }
    const baseSpacing = window.gridInitialSpacing;
    const size = Math.max(2, baseSpacing * (rectState.sizeFactor ?? 0.5));
    const rx = size * (rectState.cornerRadiusFactor ?? 0.15);
    const group = window.gridGroup;
    const rectDefaults = rectState.rectDefaults;

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
    let nodes = [];
    if (window.visibleCellNodes && window.visibleCellNodes.length) {
        nodes = window.visibleCellNodes;
    } else {
        const grp = document.getElementById('grid-cells');
        if (grp) nodes = Array.from(grp.querySelectorAll('.cell-node'));
    }
    if (!nodes.length) {
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
            const anchor = labelEl.getAttribute('text-anchor');
            const labelXAttr = labelEl.getAttribute('x');
            const labelX = labelXAttr != null ? Number(labelXAttr) : 0;

            const measure = () => {
                let width = 0;
                if (typeof labelEl.getComputedTextLength === 'function') {
                    try { width = labelEl.getComputedTextLength(); } catch (_) { void 0; }
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
            const original = amountEl.textContent ?? '';
            const m = original.match(/(-?[\d,]+(?:\.[\d]+)?)/);
            if (m && m.index != null) {
                const numStr = m[1];
                const prefix = original.slice(0, m.index);
                const suffix = original.slice(m.index + numStr.length);
                const decimals = (numStr.split('.')[1] ?? '').length;
                const target = parseFloat(numStr.replace(/,/g, ''));
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
} catch (_) { void 0; }

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

/**
 * Setup Section 5 pinned horizontal scroll animation
 * Pure scroll-driven animation without fixed tweens
 */
export function setupSection5HorizontalScroll() {
    const section5El = document.querySelector(".section[data-section='5']");
    if (!section5El) {
        console.warn('[Section5] Section 5 element not found');
        return;
    }

    const topRow = section5El.querySelector('.tiles-row-1');
    const bottomRow = section5El.querySelector('.tiles-row-2');

    if (!topRow || !bottomRow) {
        console.warn('[Section5] Tile rows not found');
        return;
    }

    console.log('[Section5] Setting up pure scroll-driven horizontal animation');

    // Apply config values to CSS and positioning
    const config = SECTION5_CONFIG;
    
    // Apply breakpoint-specific layout settings
    const applySection5Layout = () => {
        const breakpointKey = getCurrentBreakpoint();
        const layoutConfig = SECTION5_LAYOUT[breakpointKey];
        
        if (!layoutConfig) {
            console.warn('[Section5] No layout config found for breakpoint:', breakpointKey);
            return;
        }
        
        console.log('[Section5] Applying layout for breakpoint:', breakpointKey, layoutConfig);
        
        // Get the content container for CSS custom properties
        const contentEl = section5El.querySelector('.section5-content');
        if (contentEl) {
            // Apply responsive positioning and sizing via CSS custom properties
            contentEl.style.setProperty('--section5-y-offset', layoutConfig.yOffset);
            contentEl.style.setProperty('--section5-row-gap', layoutConfig.rowGap);
            contentEl.style.setProperty('--section5-top-tile-size', layoutConfig.topRowTileSize + 'px');
            contentEl.style.setProperty('--section5-bottom-tile-size', layoutConfig.bottomRowTileSize + 'px');
            contentEl.style.setProperty('--section5-title-y-offset', layoutConfig.titleYOffset);
        }
        
        // Also set the legacy tile size properties for backward compatibility
        topRow.style.setProperty('--tile-size', layoutConfig.topRowTileSize + 'px');
        bottomRow.style.setProperty('--tile-size', layoutConfig.bottomRowTileSize + 'px');
        
        // Update travel distances for new tile sizes
        return layoutConfig;
    };
    
    // Apply initial layout
    const currentLayoutConfig = applySection5Layout();
    
    // Set initial row positions (vertical offsets)
    gsap.set(topRow, { 
        y: config.topRowPosition.y,
        x: config.topRowPosition.x 
    });
    gsap.set(bottomRow, { 
        y: config.bottomRowPosition.y,
        x: config.bottomRowPosition.x 
    });

    // Calculate travel distances dynamically using current layout config
    const calculateTravelDistances = () => {
        const viewportWidth = window.innerWidth;
        const layoutConfig = currentLayoutConfig || applySection5Layout();
        
        if (!layoutConfig) {
            console.warn('[Section5] No layout config available for travel distance calculation');
            return { topTravelDistance: 0, bottomTravelDistance: 0 };
        }
        
        // Use explicit counts and responsive tile sizes from layout config
        const topTileWidth = layoutConfig.topRowTileSize;
        const bottomTileWidth = layoutConfig.bottomRowTileSize;
        const topRowCount = layoutConfig.topRowCount || 8;
        const bottomRowCount = layoutConfig.bottomRowCount || 8;
        const gapWidth = 32; // 2rem from CSS
        
        const topRowWidth = (topTileWidth * topRowCount) + (gapWidth * (topRowCount - 1));
        const bottomRowWidth = (bottomTileWidth * bottomRowCount) + (gapWidth * (bottomRowCount - 1));
        
        // Calculate full travel distances with multipliers
        const topTravelDistance = (viewportWidth + topRowWidth) * config.travelMultipliers.topRow;
        const bottomTravelDistance = (viewportWidth + bottomRowWidth) * config.travelMultipliers.bottomRow;
        
        return { topTravelDistance, bottomTravelDistance };
    };

    // Create pure scrubbed timeline (no fixed tweens, no function calls)
    const tl = gsap.timeline();
    
    // Add Section 4-style title animation
    const title = section5El.querySelector('.section5-title');
    if (title) {
        const t = config.titleTimings;
        let cursor = 0;
        
        // Initial period
        cursor += (t.periodA ?? 0.5);
        
        // Title fade in (same as Section 4)
        tl.from(title, { 
            blur: 15, 
            alpha: 0.0, 
            scale: 0.95, 
            ease: 'power2.inOut', 
            duration: (t.h2FadeIn ?? 0.5) 
        }, cursor);
        cursor += (t.h2FadeIn ?? 0.5);
        
        // Title show period
        tl.to(title, { opacity: 1, duration: 0.001 }, cursor);
        cursor += (t.h2Show ?? 1.0);
        
        // Title fade out
        tl.to(title, { 
            opacity: 0, 
            ease: 'power2.in', 
            duration: (t.h2FadeOut ?? 0.5) 
        }, cursor);
        cursor += (t.h2FadeOut ?? 0.5);
        
        // Store cursor position for tile animations to start after title
        title._s5CursorAfterTitle = cursor;
        
        console.log('[Section5] Title animation added:', {
            fadeInAt: (t.periodA ?? 0.5),
            showDuration: (t.h2Show ?? 1.0),
            fadeOutAt: cursor - (t.h2FadeOut ?? 0.5),
            tilesStartAt: cursor
        });
    }
    
    // Calculate initial and final positions based on config
    const getPositions = () => {
        const { topTravelDistance, bottomTravelDistance } = calculateTravelDistances();
        
        // Apply synchronized initial offset multiplier to both rows
        const adjustedTopDistance = topTravelDistance * config.initialOffsetMultiplier;
        const adjustedBottomDistance = bottomTravelDistance * config.initialOffsetMultiplier;
        
        // Starting positions based on config (using synchronized offset)
        const topStart = config.startPositions.topRow === 'right' ? adjustedTopDistance : -adjustedTopDistance;
        const bottomStart = config.startPositions.bottomRow === 'left' ? -adjustedBottomDistance : adjustedBottomDistance;
        
        // Ending positions based on scroll direction (using exit offset multiplier)
        const adjustedTopExitDistance = topTravelDistance * config.exitOffsetMultiplier;
        const adjustedBottomExitDistance = bottomTravelDistance * config.exitOffsetMultiplier;
        
        const topEnd = config.scrollDirection.topRow === 'left' ? -adjustedTopExitDistance : adjustedTopExitDistance;
        const bottomEnd = config.scrollDirection.bottomRow === 'right' ? adjustedBottomExitDistance : -adjustedBottomExitDistance;
        
        console.log('[Section5] Calculated positions:', {
            topStart: topStart.toFixed(0) + 'px',
            bottomStart: bottomStart.toFixed(0) + 'px',
            topEnd: topEnd.toFixed(0) + 'px',
            bottomEnd: bottomEnd.toFixed(0) + 'px',
            initialOffsetMultiplier: config.initialOffsetMultiplier,
            exitOffsetMultiplier: config.exitOffsetMultiplier
        });
        
        return { topStart, bottomStart, topEnd, bottomEnd };
    };

    // Pure scrubbed animations - no function calls, no fixed tweens
    const positions = getPositions();
    
    // Calculate when tile animations should start (after title sequence)
    const tilesStartTime = title && title._s5CursorAfterTitle ? title._s5CursorAfterTitle : 0;
    
    // Top row: scroll-driven horizontal movement (starts after title)
    tl.fromTo(topRow, 
        { x: () => positions.topStart },
        { x: () => positions.topEnd, ease: 'none', duration: 3 }, // Longer duration for smooth scroll
        tilesStartTime
    );
    
    // Bottom row: scroll-driven horizontal movement (synchronized with top row)
    tl.fromTo(bottomRow,
        { x: () => positions.bottomStart },
        { x: () => positions.bottomEnd, ease: 'none', duration: 3 }, // Same duration for sync
        tilesStartTime
    );

    // Create ScrollTrigger with config-driven scroll speed
    ScrollTrigger.create({
        trigger: section5El,
        start: 'top top',
        end: () => '+=' + config.scrollSpeed + 'vh', // Use viewport height units for consistent speed
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tl,
        markers: false,
        id: 'section5-horizontal-scroll',
        onEnter: () => {
            console.log('[Section5] Pure scroll-driven animation started');
        },
        onLeave: () => {
            console.log('[Section5] Animation completed - section unpinned');
        },
        onUpdate: (self) => {
            // Optional: Add any scroll progress-based effects here
            const progress = self.progress;
            // Could add effects like opacity, scale, rotation based on progress
        }
    });

    // Add responsive handling for breakpoint changes
    const handleBreakpointChange = () => {
        console.log('[Section5] Breakpoint changed, updating layout');
        applySection5Layout();
        // Refresh ScrollTrigger to recalculate with new dimensions
        ScrollTrigger.refresh();
    };
    
    // Listen for breakpoint changes using the existing breakpoint manager
    onStateChange(handleBreakpointChange);
    
    // Refresh ScrollTrigger after setup
    try {
        setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    } catch (_) { void 0; }

    console.log('[Section5] Pure scroll-driven animation setup complete');
}

/**
 * Setup Section 6 title animation (matches Section 3 pattern)
 * Simple fade in/out animation for "Our Investors" title
 */
export function setupSection6TitleAnimation() {
    const section6El = document.querySelector(".section[data-section='6']");
    if (!section6El) {
        console.warn('[Section6] Section 6 element not found');
        return;
    }

    const title = section6El.querySelector('.section6-title');
    const tilesContainer = section6El.querySelector('.section6-tiles');
    const tiles = section6El.querySelectorAll('.investor-tile');
    
    if (!title) {
        console.warn('[Section6] Section 6 title element not found');
        return;
    }
    
    if (!tilesContainer || tiles.length === 0) {
        console.warn('[Section6] Section 6 tiles not found');
        return;
    }

    console.log('[Section6] Setting up title and tiles animation');

    // Prepare elements for animation (start hidden)
    gsap.set(title, { opacity: 0 });
    gsap.set(tilesContainer, { opacity: 0 });
    gsap.set(tiles, { opacity: 0, scale: 0.8, y: 20 });

    // PRE-CALCULATE total timeline duration from Section 6 timings
    // This fixes the circular dependency issue where ScrollTrigger end calculation
    // tried to use tl.totalDuration() before any animations were added to the timeline
    const t = SECTION6_TIMINGS;
    const calculatedDuration = 
        (t.periodA ?? 0.5) +                                                    // Initial delay
        (t.titleFadeIn ?? 0.35) +                                              // Title fade in
        (t.titleShow ?? 2.0) +                                                 // Title show period  
        (t.titleFadeOut ?? 0.35) +                                             // Title fade out
        (t.tilesDelay ?? 0.3) +                                                // Delay before tiles
        (t.tilesFadeIn ?? 0.8) + (tiles.length * (t.tilesStagger ?? 0.05)) +  // Tiles animation + stagger
        (t.tilesShow ?? 3.0) +                                                 // Tiles show period
        (t.tilesHold ?? 3.0) +                                                 // HOLD period after tiles appear
        (t.postTilesDelay ?? 8.0) +                                            // Extra time after all logos appeared
        (t.periodB ?? 3.5);                                                    // Final delay

    // Calculate scroll distance using simple approach (like other sections)
    const scrollDistance = Math.round(calculatedDuration * (SECTION6_SCROLL?.pxPerUnit || 300));

    console.log('[Section6] Timeline calculation', {
        totalDuration: calculatedDuration.toFixed(2) + ' timeline units',
        totalScrollDistance: scrollDistance + 'px',
        pxPerUnit: (SECTION6_SCROLL?.pxPerUnit || 300) + 'px per unit',
        postTilesDelay: (t.postTilesDelay ?? 8.0) + ' units ← Extra time after logos appear',
        breakdown: {
            periodA: (t.periodA ?? 0.5),
            titleFadeIn: (t.titleFadeIn ?? 0.35),
            titleShow: (t.titleShow ?? 2.0),
            titleFadeOut: (t.titleFadeOut ?? 0.35),
            tilesDelay: (t.tilesDelay ?? 0.3),
            tilesFadeIn: (t.tilesFadeIn ?? 0.8),
            tilesStagger: tiles.length * (t.tilesStagger ?? 0.05),
            tilesShow: (t.tilesShow ?? 3.0),
            tilesHold: (t.tilesHold ?? 3.0),
            postTilesDelay: (t.postTilesDelay ?? 8.0),
            periodB: (t.periodB ?? 3.5)
        }
    });

    // Create timeline with ScrollTrigger using PRE-CALCULATED duration
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section6El,
            start: 'top top',
            end: '+=' + scrollDistance,  // Use pre-calculated scroll distance
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: true,
            markers: false,
            id: 'section6-title-animation'
        }
    });

    // Build timeline using same timing logic (cursor tracking)
    let cursor = 0;

    // Initial delay
    cursor += (t.periodA ?? 0.5);

    // Title fade in
    tl.to(title, { 
        opacity: 1, 
        ease: 'power1.out', 
        duration: (t.titleFadeIn ?? 0.35) 
    }, cursor);
    cursor += (t.titleFadeIn ?? 0.35);

    // Title show period (title stays visible during this time)
    cursor += (t.titleShow ?? 2.0);

    // Title fade out (starts after show period)
    tl.to(title, { 
        opacity: 0, 
        ease: 'power1.in', 
        duration: (t.titleFadeOut ?? 0.35) 
    }, cursor);
    cursor += (t.titleFadeOut ?? 0.35);

    // Delay before tiles appear
    cursor += (t.tilesDelay ?? 0.3);

    // Tiles container fade in
    tl.to(tilesContainer, { 
        opacity: 1, 
        duration: 0.1 
    }, cursor);

    // Individual tiles staggered animation
    tl.to(tiles, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: (t.tilesFadeIn ?? 0.8),
        stagger: (t.tilesStagger ?? 0.05),
        ease: 'back.out(1.2)'
    }, cursor);
    cursor += (t.tilesFadeIn ?? 0.8) + (tiles.length * (t.tilesStagger ?? 0.05));

    // Tiles show period
    cursor += (t.tilesShow ?? 3.0);

    // Additional hold period after tiles are fully visible
    // This is now properly accounted for in the ScrollTrigger end calculation
    cursor += (t.tilesHold ?? 3.0);

    // Extra time period after all logo blocks have fully appeared
    cursor += (t.postTilesDelay ?? 8.0);

    // Final delay
    cursor += (t.periodB ?? 3.5);

    // Verify that our pre-calculated duration matches the actual timeline duration
    const actualDuration = tl.totalDuration();
    console.log('[Section6] Duration verification', {
        preCalculated: calculatedDuration.toFixed(2) + 's',
        actualTimeline: actualDuration.toFixed(2) + 's',
        match: Math.abs(calculatedDuration - actualDuration) < 0.01 ? '✅' : '❌',
        tilesHoldActive: (t.tilesHold ?? 2.0) + 's hold period included'
    });
}

 