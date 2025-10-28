// Scroll Trigger Module for NFTfi Marketing Site
// Handles all scroll-related animations and GSAP ScrollTrigger functionality

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import unifiedPinningSystem from './unifiedPinningSystem.js';
import { MODEL_CONFIG, TARGET_CONFIG, GRID_STATES, RECT_STATES, SECTION2_TIMINGS, SECTION2_SCROLL, SECTION4_PEBBLE, SECTION4_PEBBLE2, SECTION4_PEBBLE3, SECTION4_PEBBLE4, SECTION4_PEBBLE_SCROLL_PARAMS, SECTION4_CONTAINER_HEIGHT, SECTION4_TIMINGS, SECTION4_SCROLL, SECTION4_PEBBLE_SPIN, SECTION4_MOBILE_VIDEOS, SECTION5_CONFIG, SECTION5_LAYOUT, SECTION6_TIMINGS, SECTION6_SCROLL } from '../config/index.js';
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
    
    // Ensure Section 2 initializes on mobile even if the logo mesh is skipped
    try {
        if (typeof window !== 'undefined' && window.innerWidth <= 600) {
            setupSection2Pinning();
        }
    } catch (_) { /* no-op */ }
    
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
 * Create a pinned, scrubbed Section 4 timeline that fades in the pebbles
 * while lifting them from offscreen. Opacity is applied to all child materials.
 * Now supports 4 pebbles with different positioning.
 */
// Store Section 4 ScrollTrigger for cleanup
let section4ScrollTrigger = null;

export function setupSection4PebbleFadePinned(pebbleGroup1, pebbleGroup2, pebbleGroup3, pebbleGroup4) {
    if (!pebbleGroup1) return;
    
    // Kill existing Section 4 ScrollTrigger if it exists
    if (section4ScrollTrigger) {
        try { 
            section4ScrollTrigger.kill(); 
            section4ScrollTrigger = null;
        } catch (_) { void 0; }
    }
    
    // Kill any existing tweens for all pebbles
    try { gsap.killTweensOf([pebbleGroup1.position]); } catch (_) { void 0; }
    if (pebbleGroup2) {
        try { gsap.killTweensOf([pebbleGroup2.position]); } catch (_) { void 0; }
    }
    if (pebbleGroup3) {
        try { gsap.killTweensOf([pebbleGroup3.position]); } catch (_) { void 0; }
    }
    if (pebbleGroup4) {
        try { gsap.killTweensOf([pebbleGroup4.position]); } catch (_) { void 0; }
    }
    
    // Collect materials from all pebbles for fading
    const materials = [];
    
    // Helper function to collect materials from a pebble group
    const collectMaterials = (pebbleGroup) => {
        if (!pebbleGroup) return;
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
    };
    
    collectMaterials(pebbleGroup1);
    collectMaterials(pebbleGroup2);
    collectMaterials(pebbleGroup3);
    collectMaterials(pebbleGroup4);
    
    // Prepare materials for fading
    materials.forEach((m) => { try { m.transparent = true; m.opacity = 0; } catch (_) { void 0; } });
    
    // Ensure starting state for all pebbles: hidden and offscreen
    gsap.set(pebbleGroup1, { visible: false });
    const startY1 = (typeof pebbleGroup1.position?.y === 'number') ? pebbleGroup1.position.y : -20;
    gsap.set(pebbleGroup1.position, { y: startY1 });
    
    if (pebbleGroup2) {
        gsap.set(pebbleGroup2, { visible: false });
        const startY2 = (typeof pebbleGroup2.position?.y === 'number') ? pebbleGroup2.position.y : -20;
        gsap.set(pebbleGroup2.position, { y: startY2 });
    }
    
    if (pebbleGroup3) {
        gsap.set(pebbleGroup3, { visible: false });
        const startY3 = (typeof pebbleGroup3.position?.y === 'number') ? pebbleGroup3.position.y : -20;
        gsap.set(pebbleGroup3.position, { y: startY3 });
    }
    
    if (pebbleGroup4) {
        gsap.set(pebbleGroup4, { visible: false });
        const startY4 = (typeof pebbleGroup4.position?.y === 'number') ? pebbleGroup4.position.y : -20;
        gsap.set(pebbleGroup4.position, { y: startY4 });
    }

    // Build timeline first (without ScrollTrigger) so we can scale scroll distance to its duration
    const tl = gsap.timeline();
    // OLD SYSTEM REMOVED - title positioning now handled by new config-driven system below

    // Pre-capture Section 4 content before pin; mark success to skip onEnter capture
    setupSectionPreCapture(".section[data-section='4']", '500px');

    // OLD TIMELINE SYSTEM REMOVED - Section 4 now uses scroll-driven positioning

    // Section 4 is no longer pinned - use scroll-driven parallax positioning
    // Get breakpoint-specific configs
        const bp = getCurrentBreakpoint();
    const pcfg1 = (SECTION4_PEBBLE && SECTION4_PEBBLE[bp]) ? SECTION4_PEBBLE[bp] : SECTION4_PEBBLE[BREAKPOINT_NAMES.DESKTOP];
    const pcfg2 = (SECTION4_PEBBLE2 && SECTION4_PEBBLE2[bp]) ? SECTION4_PEBBLE2[bp] : SECTION4_PEBBLE2[BREAKPOINT_NAMES.DESKTOP];
    const pcfg3 = (SECTION4_PEBBLE3 && SECTION4_PEBBLE3[bp]) ? SECTION4_PEBBLE3[bp] : SECTION4_PEBBLE3[BREAKPOINT_NAMES.DESKTOP];
    const pcfg4 = (SECTION4_PEBBLE4 && SECTION4_PEBBLE4[bp]) ? SECTION4_PEBBLE4[bp] : SECTION4_PEBBLE4[BREAKPOINT_NAMES.DESKTOP];
    
    // Get breakpoint-specific scroll params from config
    const params = (SECTION4_PEBBLE_SCROLL_PARAMS && SECTION4_PEBBLE_SCROLL_PARAMS[bp]) 
        ? SECTION4_PEBBLE_SCROLL_PARAMS[bp] 
        : SECTION4_PEBBLE_SCROLL_PARAMS[BREAKPOINT_NAMES.DESKTOP];

    // Apply container height per breakpoint (in vh)
    try {
        const heightVh = SECTION4_CONTAINER_HEIGHT && SECTION4_CONTAINER_HEIGHT[bp];
        if (typeof heightVh !== 'number') {
            console.error('[Section4] Missing SECTION4_CONTAINER_HEIGHT for breakpoint', bp);
        } else {
            const containerEl = document.querySelector('.section4-content');
            if (containerEl) {
                containerEl.style.minHeight = `${heightVh}vh`;
            }
        }
    } catch (e) {
        console.error('[Section4] Failed to apply container height', e);
    }
    
    // Title config loaded from breakpoint-specific SECTION4_PEBBLE_SCROLL_PARAMS
    
    // Calculate pebble X positions to match the content container width
    // The content is max-width constrained (1400px), but pebbles are in full-viewport world space
    // We need to scale pebble positions to align with the content container
    const calculatePebbleX = (configX) => {
        // Get the content container width (max 1400px, centered)
        const container = document.querySelector('.section4-content');
        if (!container) return configX;
        
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width; // Actual rendered width (max 1400px)
        
        // Get the camera to calculate world-space scaling
        const camera = window.camera || { fov: 75, position: { z: 33.6 } };
        const aspect = window.innerWidth / window.innerHeight;
        const fov = camera.fov * Math.PI / 180;
        const distance = Math.abs(camera.position.z);
        
        // Calculate how much world space corresponds to the full viewport width
        const viewportWidthInWorldUnits = 2 * distance * Math.tan(fov / 2) * aspect;
        
        // Calculate the scale factor: container width / viewport width
        // This scales pebbles to match the content container instead of full viewport
        const scaleFactor = containerWidth / window.innerWidth;
        
        // Apply scaling to config X position
        return configX * scaleFactor;
    };
    
    // Set initial positions and scales - start offscreen (below viewport)
    // These will be immediately overridden by the ScrollTrigger onUpdate
    gsap.set(pebbleGroup1, { visible: false });
    gsap.set(pebbleGroup1.position, { 
        x: calculatePebbleX(pcfg1.position?.x ?? -2.5),
        y: params.pebbleStartY, // Start offscreen (from config)
        z: pcfg1.position?.z ?? 0
    });
    gsap.set(pebbleGroup1.scale, { 
        x: pcfg1.scale ?? 1.0,
        y: pcfg1.scale ?? 1.0,
        z: pcfg1.scale ?? 1.0
    });
    
    if (pebbleGroup2) {
        gsap.set(pebbleGroup2, { visible: false });
        gsap.set(pebbleGroup2.position, { 
            x: calculatePebbleX(pcfg2.position?.x ?? 2.5),
            y: params.pebbleStartY, // Start offscreen (from config)
            z: pcfg2.position?.z ?? 0
        });
        gsap.set(pebbleGroup2.scale, { 
            x: pcfg2.scale ?? 1.0,
            y: pcfg2.scale ?? 1.0,
            z: pcfg2.scale ?? 1.0
        });
    }
    
    if (pebbleGroup3) {
        gsap.set(pebbleGroup3, { visible: false });
        gsap.set(pebbleGroup3.position, { 
            x: calculatePebbleX(pcfg3.position?.x ?? -2.5),
            y: params.pebbleStartY, // Start offscreen (from config)
            z: pcfg3.position?.z ?? 0
        });
        gsap.set(pebbleGroup3.scale, { 
            x: pcfg3.scale ?? 1.0,
            y: pcfg3.scale ?? 1.0,
            z: pcfg3.scale ?? 1.0
        });
    }
    
    if (pebbleGroup4) {
        gsap.set(pebbleGroup4, { visible: false });
        gsap.set(pebbleGroup4.position, { 
            x: calculatePebbleX(pcfg4.position?.x ?? 2.5),
            y: params.pebbleStartY, // Start offscreen (from config)
            z: pcfg4.position?.z ?? 0
        });
        gsap.set(pebbleGroup4.scale, { 
            x: pcfg4.scale ?? 1.0,
            y: pcfg4.scale ?? 1.0,
            z: pcfg4.scale ?? 1.0
        });
    }
    
    // Use params from above (already defined)
    const startY = params.pebbleStartY;
    const totalTravel = params.pebbleTotalTravel;
    const scrollSpeed = params.pebbleScrollSpeed;
    
    // Get text panels and title element
    const panel0 = document.getElementById('section4-panel-0');
    const panel1 = document.getElementById('section4-panel-1');
    const panel2 = document.getElementById('section4-panel-2');
    const panel3 = document.getElementById('section4-panel-3');
    const panels = [panel0, panel1, panel2, panel3];
    
    // Get title element for new scroll-driven positioning
    const title = document.getElementById('section4-title');
    
    // Set up title element to override .center-anchored CSS positioning
    if (title) {
        // Remove the center-anchored class to prevent CSS conflicts
        title.classList.remove('center-anchored');
        // Set initial positioning to allow GSAP to take control
        gsap.set(title, {
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'none',
            width: (typeof params.titleMaxWidthPx === 'number') ? `${params.titleMaxWidthPx}px` : undefined
        });
    }
    
    // Calculate pixel positions for text panels and title
    // Uses independent text spacing control from config
    const getPanelYPixels = (panelIndex, progress) => {
        // Handle title (index -1) - uses its own scroll parameters
        if (panelIndex === -1) {
            // Title has its own starting position and scroll speed
            const titleStartYPixels = window.innerHeight + (params.titleStartOffset || 0);
            const titleTravelPixels = window.innerHeight * (params.titleTravelMultiplier || params.textTravelMultiplier);
            const titleBaseY = titleStartYPixels - (progress * titleTravelPixels);
            // Add the title Y offset to position it relative to the first panel
            return titleBaseY + (params.titleYOffset || 0);
        }
        
        // Text panels - use standard text travel parameters
        // Start at bottom of screen + offset
        const startYPixels = window.innerHeight + params.textStartOffset;
        // Total travel distance in pixels (move up through viewport) - from config
        const totalTravelPixels = window.innerHeight * params.textTravelMultiplier;
        // Calculate current position based on scroll progress
        const baseY = startYPixels - (progress * totalTravelPixels);
        
        // Add panel-specific offset based on index and text spacing
        // INVERTED: panel 0 (Digital Art) should be at TOP, so add offset
        const panelOffset = panelIndex * params.textSpacingPixels;
        return baseY + panelOffset; // Changed from - to + to invert the order
    };
    
    // Mobile-only: render a static final layout (no pinning, no scrub) to avoid layout regressions
    const isMobileBp = bp === BREAKPOINT_NAMES.MOBILE;
    if (isMobileBp) {
        // Reveal pebbles and set final positions/scales from config
        const revealMat = () => materials.forEach((m) => { try { m.opacity = 1; m.transparent = false; } catch (_) { /* no-op */ } });
        try { revealMat(); } catch (_) { /* no-op */ }
        try {
            if (pebbleGroup1) {
                gsap.set(pebbleGroup1, { visible: true });
                gsap.set(pebbleGroup1.position, { x: calculatePebbleX(pcfg1.position?.x ?? -2.5), y: (pcfg1.position?.y ?? 0), z: pcfg1.position?.z ?? 0 });
                gsap.set(pebbleGroup1.scale, { x: pcfg1.scale ?? 1.0, y: pcfg1.scale ?? 1.0, z: pcfg1.scale ?? 1.0 });
            }
            if (pebbleGroup2) {
                gsap.set(pebbleGroup2, { visible: true });
                gsap.set(pebbleGroup2.position, { x: calculatePebbleX(pcfg2.position?.x ?? 2.5), y: (pcfg2.position?.y ?? -4.0), z: pcfg2.position?.z ?? 0 });
                gsap.set(pebbleGroup2.scale, { x: pcfg2.scale ?? 1.0, y: pcfg2.scale ?? 1.0, z: pcfg2.scale ?? 1.0 });
            }
            if (pebbleGroup3) {
                gsap.set(pebbleGroup3, { visible: true });
                gsap.set(pebbleGroup3.position, { x: calculatePebbleX(pcfg3.position?.x ?? -2.5), y: (pcfg3.position?.y ?? -8.0), z: pcfg3.position?.z ?? 0 });
                gsap.set(pebbleGroup3.scale, { x: pcfg3.scale ?? 1.0, y: pcfg3.scale ?? 1.0, z: pcfg3.scale ?? 1.0 });
            }
            if (pebbleGroup4) {
                gsap.set(pebbleGroup4, { visible: true });
                gsap.set(pebbleGroup4.position, { x: calculatePebbleX(pcfg4.position?.x ?? 2.5), y: (pcfg4.position?.y ?? -12.0), z: pcfg4.position?.z ?? 0 });
                gsap.set(pebbleGroup4.scale, { x: pcfg4.scale ?? 1.0, y: pcfg4.scale ?? 1.0, z: pcfg4.scale ?? 1.0 });
            }
        } catch (_) { /* no-op */ }

        // Inject inline videos for mobile (absolute within section4-content)
        try {
            const container = document.querySelector('.section4-content');
            if (container && Array.isArray(SECTION4_MOBILE_VIDEOS)) {
                // Safety net to avoid accidental horizontal scroll
                try { container.style.overflowX = 'hidden'; document.documentElement.style.overflowX = 'hidden'; document.body.style.overflowX = 'hidden'; } catch (_) { /* no-op */ }
                // Remove existing injected videos/frames to avoid duplicates
                Array.from(container.querySelectorAll('video[data-s4-mobile], div[data-s4-mobile-frame]')).forEach((el) => el.remove());
                SECTION4_MOBILE_VIDEOS.forEach((cfg) => {
                    try {
                        // Frame (diamond) wrapper
                        const frame = document.createElement('div');
                        frame.setAttribute('data-s4-mobile-frame', '');
                        frame.style.position = 'absolute';
                        // Clamp left to container bounds to avoid horizontal overflow
                        const cRect = container.getBoundingClientRect();
                        const frameSize = (cfg.width || 200);
                        const rawX = (cfg.x || 0);
                        const clampedX = Math.min(Math.max(rawX, 0), Math.max(0, cRect.width - frameSize));
                        frame.style.left = clampedX + 'px';
                        frame.style.top = (cfg.y || 0) + 'px';
                        frame.style.width = frameSize + 'px';
                        frame.style.height = frameSize + 'px';
                        frame.style.overflow = 'hidden';
                        frame.style.transform = 'rotate(45deg)';
                        frame.style.transformOrigin = '50% 50%';
                        frame.style.borderRadius = '12px';
                        frame.style.zIndex = '5';
                        container.appendChild(frame);

                        const v = document.createElement('video');
                        // Set properties BEFORE setting src for iOS autoplay behavior
                        v.muted = true;
                        v.autoplay = true;
                        v.loop = true;
                        v.playsInline = true; // camelCase property
                        // Mirror as attributes for broader compatibility
                        v.setAttribute('playsinline', '');
                        v.setAttribute('webkit-playsinline', '');
                        v.setAttribute('muted', '');
                        v.setAttribute('autoplay', '');
                        v.setAttribute('loop', '');
                        v.preload = 'auto';
                        v.setAttribute('data-s4-mobile', '');
                        v.src = cfg.src;
                        v.style.position = 'absolute';
                        v.style.left = '50%';
                        v.style.top = '50%';
                        // Scale ~sqrt(2) to fully cover the diamond mask
                        const scale = 1.42;
                        v.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(${scale})`;
                        v.style.transformOrigin = '50% 50%';
                        v.style.width = '100%';
                        v.style.height = '100%';
                        v.style.objectFit = 'cover';
                        v.style.borderRadius = '0px';
                        if (cfg.blendMode) v.style.mixBlendMode = cfg.blendMode;
                        if (typeof cfg.opacity === 'number') v.style.opacity = String(cfg.opacity);
                        frame.appendChild(v);

                        // Attempt autoplay once appended (required by some browsers)
                        const tryPlay = () => {
                            try {
                                const p = v.play();
                                if (p && typeof p.then === 'function') {
                                    p.catch(() => {
                                        // If blocked, show controls to allow tap-to-play
                                        v.controls = true;
                                    });
                                }
                            } catch (_) {
                                v.controls = true;
                            }
                        };
                        v.addEventListener('canplay', tryPlay, { once: true });
                        v.addEventListener('loadeddata', tryPlay, { once: true });
                        // Fallback attempt
                        setTimeout(tryPlay, 0);
                    } catch (_) { /* no-op */ }
                });
            }
        } catch (_) { /* no-op */ }

        // Position title and text panels relative to projected pebble positions
        try {
            const container = document.querySelector('.section4-content');
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const containerWidth = containerRect.width;
                const containerLeft = containerRect.left;

                const projectPebbleToScreen = (pebbleGroup) => {
                    if (!pebbleGroup || !window.camera) return null;
                    const worldPosition = new THREE.Vector3();
                    pebbleGroup.getWorldPosition(worldPosition);
                    const projected = worldPosition.clone().project(window.camera);
                    const screenX = (projected.x * 0.5 + 0.5) * window.innerWidth;
                    const screenY = (-(projected.y * 0.5) + 0.5) * window.innerHeight;
                    return { x: screenX, y: screenY };
                };

                const legacy = params.textHorizontalOffset;
                const offsetLeft = (typeof params.textHorizontalOffsetLeft === 'number') ? params.textHorizontalOffsetLeft : (typeof legacy === 'number' ? legacy : 0.8);
                const offsetRight = (typeof params.textHorizontalOffsetRight === 'number') ? params.textHorizontalOffsetRight : (typeof legacy === 'number' ? legacy : 0.8);
                const panelDims = (panelEl) => {
                    const rect = panelEl.getBoundingClientRect();
                    const minW = typeof params.textPanelMinWidthPx === 'number' ? params.textPanelMinWidthPx : rect.width;
                    const maxW = typeof params.textPanelMaxWidthPx === 'number' ? params.textPanelMaxWidthPx : rect.width;
                    const gutter = typeof params.textPanelGutterPx === 'number' ? params.textPanelGutterPx : 24;
                    return { minW, maxW, gutter };
                };
                const clampToContainer = (xViewport, panelEl, forcedWidthPx) => {
                    const halfForced = forcedWidthPx * 0.5;
                    const rightEdge = containerLeft + containerWidth;
                    const clampedViewportX = Math.min(Math.max(xViewport, containerLeft + halfForced), rightEdge - halfForced);
                    const x = clampedViewportX - containerLeft;
                    return { x };
                };

                // Title near top-center of visible area
                if (title) {
                    gsap.set(title, {
                        x: (window.innerWidth * 0.5) - containerLeft,
                        y: 120,
                        xPercent: -50,
                        yPercent: 0,
                    });
                }

                const applyPanel = (panelEl, pebbleGroup, side, idx) => {
                    if (!panelEl || !pebbleGroup) return;
                    const dims = panelDims(panelEl);
                    const pebbleScreen = projectPebbleToScreen(pebbleGroup);
                    if (!pebbleScreen) return;
                    // Determine Y: allow independent control via config
                    let yTarget = pebbleScreen.y;
                    const yArray = params.textRowYPositionsPxMobile;
                    if (Array.isArray(yArray) && typeof yArray[idx] === 'number') {
                        yTarget = yArray[idx];
                    } else {
                        const baseOffset = typeof params.textRowOffsetYPxMobile === 'number' ? params.textRowOffsetYPxMobile : 0;
                        const spacing = typeof params.textRowSpacingPxMobile === 'number' ? params.textRowSpacingPxMobile : 0;
                        yTarget = pebbleScreen.y + baseOffset + idx * spacing;
                    }
                    // Determine X: optional per-row absolute override (container-relative center)
                    const xArray = params.textRowXPositionsPxMobile;
                    const half = dims.minW * 0.5;
                    const rightEdge = containerLeft + containerWidth;
                    const leftEdge = containerLeft;
                    // Optional per-row width override
                    const wArray = params.textRowWidthsPxMobile;
                    if (side === 'right') {
                        const availableRight = Math.max(0, rightEdge - pebbleScreen.x - half - dims.gutter);
                        let desiredWidth = Math.min(Math.max(availableRight * 2, dims.minW), dims.maxW);
                        if (Array.isArray(wArray) && typeof wArray[idx] === 'number') {
                            desiredWidth = Math.max(1, Math.min(wArray[idx], containerWidth));
                        }
                        let x;
                        if (Array.isArray(xArray) && typeof xArray[idx] === 'number') {
                            // Absolute container-relative center X provided
                            x = Math.min(Math.max(xArray[idx], half), containerWidth - half);
                        } else {
                            const offset = availableRight * offsetRight;
                            const xViewport = pebbleScreen.x + half + dims.gutter + offset;
                            x = clampToContainer(xViewport, panelEl, desiredWidth).x;
                        }
                        gsap.set(panelEl, { width: desiredWidth, x, y: yTarget, xPercent: -50, yPercent: -50, opacity: 1, backgroundColor: 'rgba(33,22,22,0.2)', padding: '10px', boxSizing: 'border-box' });
                    } else {
                        const availableLeft = Math.max(0, pebbleScreen.x - leftEdge - half - dims.gutter);
                        let desiredWidth = Math.min(Math.max(availableLeft * 2, dims.minW), dims.maxW);
                        if (Array.isArray(wArray) && typeof wArray[idx] === 'number') {
                            desiredWidth = Math.max(1, Math.min(wArray[idx], containerWidth));
                        }
                        let x;
                        if (Array.isArray(xArray) && typeof xArray[idx] === 'number') {
                            x = Math.min(Math.max(xArray[idx], half), containerWidth - half);
                        } else {
                            const offset = availableLeft * offsetLeft;
                            const xViewport = pebbleScreen.x - half - dims.gutter - offset;
                            x = clampToContainer(xViewport, panelEl, desiredWidth).x;
                        }
                        gsap.set(panelEl, { width: desiredWidth, x, y: yTarget, xPercent: -50, yPercent: -50, opacity: 1, backgroundColor: 'rgba(33,22,22,0.2)', padding: '30px', boxSizing: 'border-box' });
                    }
                };

                applyPanel(panel0, pebbleGroup1, 'right', 0);
                applyPanel(panel1, pebbleGroup2, 'left', 1);
                applyPanel(panel2, pebbleGroup3, 'right', 2);
                applyPanel(panel3, pebbleGroup4, 'left', 3);
            }
        } catch (_) { /* no-op */ }

        // Nothing else to do on mobile; no ScrollTrigger created
        return;
    }

    // Create and store ScrollTrigger for cleanup on breakpoint changes
    // Explicitly ensure no pinning on mobile
    section4ScrollTrigger = ScrollTrigger.create({
        trigger: ".section[data-section='4']",
        start: "top bottom", // Animation starts when section top enters viewport bottom
        end: "bottom top",   // Animation ends when section bottom exits viewport top
        scrub: true,
        pin: undefined,
        pinSpacing: undefined,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            const progress = self.progress;
            
            // Calculate scroll-driven Y offset
            // As we scroll down (progress 0 → 1), move pebbles upward (Y increases from -20 to 0+)
            const scrollOffset = startY + (progress * totalTravel * scrollSpeed);
            
            // Apply scroll offset to each pebble while maintaining their relative spacing
            // Also apply viewport-aware X positioning for consistent alignment with text
            if (pebbleGroup1) {
                pebbleGroup1.position.x = calculatePebbleX(pcfg1.position?.x ?? -2.5);
                pebbleGroup1.position.y = scrollOffset + (pcfg1.position?.y ?? 0);
            }
            if (pebbleGroup2) {
                pebbleGroup2.position.x = calculatePebbleX(pcfg2.position?.x ?? 2.5);
                pebbleGroup2.position.y = scrollOffset + (pcfg2.position?.y ?? -4.0);
            }
            if (pebbleGroup3) {
                pebbleGroup3.position.x = calculatePebbleX(pcfg3.position?.x ?? -2.5);
                pebbleGroup3.position.y = scrollOffset + (pcfg3.position?.y ?? -8.0);
            }
            if (pebbleGroup4) {
                pebbleGroup4.position.x = calculatePebbleX(pcfg4.position?.x ?? 2.5);
                pebbleGroup4.position.y = scrollOffset + (pcfg4.position?.y ?? -12.0);
            }
            
            // Get container dimensions for relative positioning
            const container = document.querySelector('.section4-content');
            const containerRect = container.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerLeft = containerRect.left; // Distance from viewport left edge
            
            // Helper function to project 3D pebble position to 2D screen coordinates
            // This ensures perfect alignment between 3D pebbles and 2D text regardless of viewport size
            const projectPebbleToScreen = (pebbleGroup) => {
                if (!pebbleGroup || !window.camera) return null;
                
                // Get world position of pebble
                const worldPosition = new THREE.Vector3();
                pebbleGroup.getWorldPosition(worldPosition);
                
                // Project to normalized device coordinates (-1 to +1)
                const projected = worldPosition.clone().project(window.camera);
                
                // Convert to screen pixels
                const screenX = (projected.x * 0.5 + 0.5) * window.innerWidth;
                const screenY = (-(projected.y * 0.5) + 0.5) * window.innerHeight;
                
                return { x: screenX, y: screenY };
            };
            
            // Synchronize title and text panels with scroll progress (independent from pebbles)
            // Title - appears first at the top center
            if (title) {
                const titleY = getPanelYPixels(-1, progress); // Use index -1 for title (appears first)
                // Center title within the viewport, then convert to container-relative coordinates
                const titleXViewport = window.innerWidth * 0.5;
                const titleX = titleXViewport - containerLeft; // Convert to container-relative
                
                gsap.set(title, {
                    x: titleX,
                    y: titleY,
                    xPercent: -50, // Center horizontally
                    yPercent: -50, // Center vertically
                    width: (typeof params.titleMaxWidthPx === 'number') ? `${params.titleMaxWidthPx}px` : '90vw',
                    opacity: progress > 0.01 && progress < 0.8 ? 1 : 0, // Show early, fade before panels
                    scale: progress > 0.01 && progress < 0.8 ? 1 : 0.9,
                    filter: progress > 0.8 || progress <= 0.01 ? 'blur(5px)' : 'none'
                });
            }
            
            // Get side-specific horizontal offsets from config (fractions of available space)
            // If side-specific values are missing, optionally fall back to legacy textHorizontalOffset (explicitly)
            const legacy = params.textHorizontalOffset;
            const offsetLeft = (typeof params.textHorizontalOffsetLeft === 'number')
                ? params.textHorizontalOffsetLeft
                : (typeof legacy === 'number' ? legacy : undefined);
            const offsetRight = (typeof params.textHorizontalOffsetRight === 'number')
                ? params.textHorizontalOffsetRight
                : (typeof legacy === 'number' ? legacy : undefined);
            if (typeof offsetLeft !== 'number' || typeof offsetRight !== 'number') {
                console.error('[Section4] Missing textHorizontalOffsetLeft/Right (or legacy textHorizontalOffset)');
                return;
            }
            
            // Helper to compute a clamped X position inside the content container
            const clampToContainer = (xViewport, panelEl, forcedWidthPx) => {
                const panelRect = panelEl.getBoundingClientRect();
                const width = typeof forcedWidthPx === 'number' ? forcedWidthPx : panelRect.width;
                const half = width * 0.5;
                const min = containerLeft + half;
                const max = containerLeft + containerWidth - half;
                const clamped = Math.min(Math.max(xViewport, min), max);
                return clamped - containerLeft; // convert to container-relative X
            };

            // Panel 0 (Digital Art) - pairs with pebble 1 (left), text on right
            if (panel0 && pebbleGroup1) {
                const yPos = getPanelYPixels(0, progress);
                const pebbleScreen = projectPebbleToScreen(pebbleGroup1);
                
                if (pebbleScreen) {
                    // Position text to the right of the pebble using a fraction of available space
                    const panelRect = panel0.getBoundingClientRect();
                    const minW = typeof params.textPanelMinWidthPx === 'number' ? params.textPanelMinWidthPx : panelRect.width;
                    const maxW = typeof params.textPanelMaxWidthPx === 'number' ? params.textPanelMaxWidthPx : panelRect.width;
                    const gutter = typeof params.textPanelGutterPx === 'number' ? params.textPanelGutterPx : 24;
                    // Stable baseline to avoid feedback oscillation (don't use current width)
                    const half = (minW) * 0.5;
                    const rightEdge = containerLeft + containerWidth;
                    const availableRight = Math.max(0, rightEdge - pebbleScreen.x - half - (typeof gutter === 'number' ? gutter : 0));
                    const desiredWidth = Math.min(Math.max(availableRight * 2, minW), maxW);
                    const offset = availableRight * offsetRight;
                    const xPosViewport = pebbleScreen.x + offset;
                    const xPos = clampToContainer(xPosViewport, panel0, desiredWidth);
                    const xRounded = Math.round(xPos);
                    const yRounded = Math.round(yPos);
                    
                    gsap.set(panel0, { 
                        x: xRounded,
                        y: yRounded,
                        width: desiredWidth,
                        xPercent: -50, // Center the panel on its x position
                        yPercent: -50, // Center the panel on its y position
                        opacity: progress > 0.05 && progress < 0.95 ? 1 : 0,
                        force3D: true
                    });
                }
            }
            
            // Panel 1 (PFPs) - pairs with pebble 2 (right), text on left
            if (panel1 && pebbleGroup2) {
                const yPos = getPanelYPixels(1, progress);
                const pebbleScreen = projectPebbleToScreen(pebbleGroup2);
                
                if (pebbleScreen) {
                    // Position text to the left of the pebble using a fraction of available space
                    const panelRect = panel1.getBoundingClientRect();
                    const minW = typeof params.textPanelMinWidthPx === 'number' ? params.textPanelMinWidthPx : panelRect.width;
                    const maxW = typeof params.textPanelMaxWidthPx === 'number' ? params.textPanelMaxWidthPx : panelRect.width;
                    const gutter = typeof params.textPanelGutterPx === 'number' ? params.textPanelGutterPx : 24;
                    const half = (minW) * 0.5;
                    const leftEdge = containerLeft;
                    const availableLeft = Math.max(0, pebbleScreen.x - leftEdge - half - (typeof gutter === 'number' ? gutter : 0));
                    const desiredWidth = Math.min(Math.max(availableLeft * 2, minW), maxW);
                    const offset = availableLeft * offsetLeft;
                    const xPosViewport = pebbleScreen.x - offset;
                    const xPos = clampToContainer(xPosViewport, panel1, desiredWidth);
                    const xRounded = Math.round(xPos);
                    const yRounded = Math.round(yPos);
                    
                    gsap.set(panel1, { 
                        x: xRounded,
                        y: yRounded,
                        width: desiredWidth,
                        xPercent: -50,
                        yPercent: -50,
                        opacity: progress > 0.05 && progress < 0.95 ? 1 : 0,
                        force3D: true
                    });
                }
            }
            
            // Panel 2 (RWAs) - pairs with pebble 3 (left), text on right
            if (panel2 && pebbleGroup3) {
                const yPos = getPanelYPixels(2, progress);
                const pebbleScreen = projectPebbleToScreen(pebbleGroup3);
                
                if (pebbleScreen) {
                    // Position text to the right of the pebble using a fraction of available space
                    const panelRect = panel2.getBoundingClientRect();
                    const minW = typeof params.textPanelMinWidthPx === 'number' ? params.textPanelMinWidthPx : panelRect.width;
                    const maxW = typeof params.textPanelMaxWidthPx === 'number' ? params.textPanelMaxWidthPx : panelRect.width;
                    const gutter = typeof params.textPanelGutterPx === 'number' ? params.textPanelGutterPx : 24;
                    const half = (minW) * 0.5;
                    const rightEdge = containerLeft + containerWidth;
                    const availableRight = Math.max(0, rightEdge - pebbleScreen.x - half - (typeof gutter === 'number' ? gutter : 0));
                    const desiredWidth = Math.min(Math.max(availableRight * 2, minW), maxW);
                    const offset = availableRight * offsetRight;
                    const xPosViewport = pebbleScreen.x + offset;
                    const xPos = clampToContainer(xPosViewport, panel2, desiredWidth);
                    const xRounded = Math.round(xPos);
                    const yRounded = Math.round(yPos);
                    
                    gsap.set(panel2, { 
                        x: xRounded,
                        y: yRounded,
                        width: desiredWidth,
                        xPercent: -50,
                        yPercent: -50,
                        opacity: progress > 0.05 && progress < 0.95 ? 1 : 0,
                        force3D: true
                    });
                }
            }
            
            // Panel 3 (DeFi tokens) - pairs with pebble 4 (right), text on left
            if (panel3 && pebbleGroup4) {
                const yPos = getPanelYPixels(3, progress);
                const pebbleScreen = projectPebbleToScreen(pebbleGroup4);
                
                if (pebbleScreen) {
                    // Position text to the left of the pebble using a fraction of available space
                    const panelRect = panel3.getBoundingClientRect();
                    const minW = typeof params.textPanelMinWidthPx === 'number' ? params.textPanelMinWidthPx : panelRect.width;
                    const maxW = typeof params.textPanelMaxWidthPx === 'number' ? params.textPanelMaxWidthPx : panelRect.width;
                    const gutter = typeof params.textPanelGutterPx === 'number' ? params.textPanelGutterPx : 24;
                    const half = (minW) * 0.5;
                    const leftEdge = containerLeft;
                    const availableLeft = Math.max(0, pebbleScreen.x - leftEdge - half - (typeof gutter === 'number' ? gutter : 0));
                    const desiredWidth = Math.min(Math.max(availableLeft * 2, minW), maxW);
                    const offset = availableLeft * offsetLeft;
                    const xPosViewport = pebbleScreen.x - offset;
                    const xPos = clampToContainer(xPosViewport, panel3, desiredWidth);
                    const xRounded = Math.round(xPos);
                    const yRounded = Math.round(yPos);
                    
                    gsap.set(panel3, { 
                        x: xRounded,
                        y: yRounded,
                        width: desiredWidth,
                        xPercent: -50,
                        yPercent: -50,
                        opacity: progress > 0.05 && progress < 0.95 ? 1 : 0,
                        force3D: true
                    });
                }
            }
            
        },
        onEnter: () => {
            // Ensure Section 4 gradient texture is applied
            try {
                updatePlaneTextureForSection(".section[data-section='4']").catch(() => {});
    } catch (_) { void 0; }

            gsap.set(pebbleGroup1, { visible: true });
            if (pebbleGroup2) gsap.set(pebbleGroup2, { visible: true });
            if (pebbleGroup3) gsap.set(pebbleGroup3, { visible: true });
            if (pebbleGroup4) gsap.set(pebbleGroup4, { visible: true });
        },
        onEnterBack: () => {
            // Ensure Section 4 gradient texture is applied when scrolling back
            try {
                updatePlaneTextureForSection(".section[data-section='4']").catch(() => {});
            } catch (_) { void 0; }
            
            gsap.set(pebbleGroup1, { visible: true });
            if (pebbleGroup2) gsap.set(pebbleGroup2, { visible: true });
            if (pebbleGroup3) gsap.set(pebbleGroup3, { visible: true });
            if (pebbleGroup4) gsap.set(pebbleGroup4, { visible: true });
        },
        onLeaveBack: () => { 
            gsap.set(pebbleGroup1, { visible: false });
            if (pebbleGroup2) gsap.set(pebbleGroup2, { visible: false });
            if (pebbleGroup3) gsap.set(pebbleGroup3, { visible: false });
            if (pebbleGroup4) gsap.set(pebbleGroup4, { visible: false });
            switchToHeroTexture();
        },
        onLeave: () => {
            // Keep last video playing
        }
    });

    // Defensive: refresh ScrollTrigger after layout settles
    try {
        setTimeout(() => { try { ScrollTrigger.refresh(); } catch (_) { void 0; } }, 100);
    } catch (_) { void 0; }
}

// setupPebbleExitAnimation function removed - no longer needed since Section 4 is not pinned

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
                        try { if (window.mesh) window.mesh.visible = false; } catch (_) { }
                        // Show the accent paths in the logo when mesh disappears
                        const accentPath1 = document.getElementById('logo-accent-1');
                        const accentPath2 = document.getElementById('logo-accent-2');
                        if (accentPath1) accentPath1.style.opacity = '1';
                        if (accentPath2) accentPath2.style.opacity = '1';
                    } else {
                        wrapper.visible = true;
                        try { if (window.mesh) window.mesh.visible = true; } catch (_) { }
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
}

// Set up Section 2 with sophisticated 4-phase animation sequence using Unified Pinning System
function setupSection2Pinning() {
    console.log('Setting up Section 2 with unified pinning system');
    
    // Resolve scope & scroller elements once
    const section2El = document.querySelector("section[data-section='2']");
    const scrollerEl = document.getElementById('smooth-content');

    if (!section2El) {
        console.warn('Section 2 element not found');
        return;
    }

    // Start the sophisticated animation sequence immediately, scoped to Section 2
        gsap.context(() => {
            startAdvancedAnimationSequence(section2El, scrollerEl);
        }, section2El);

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
                // Use unified pinning system to kill the section
                unifiedPinningSystem.killSection(2);
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
            try { 
                // Use unified pinning system refresh
                unifiedPinningSystem.refreshAllSections();
            } catch (_) { void 0; }
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

        // Create timeline without ScrollTrigger first
        section2Timeline = gsap.timeline();

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

        // MOBILE/TABLET: set final state and skip creating a pin (defer until fonts/layout are ready)
        try {
            if (window.innerWidth <= 900) {
                const finalize = () => {
                    // Prevent duplicate work
                    if (window.__s2MobileFinalizing) return;
                    window.__s2MobileFinalizing = true;

                    const attempt = () => {
                        try {
                            // Ensure DOM is built (lines and cells exist)
                            const svg = document.getElementById('lines-svg');
                            const cellsGroup = document.getElementById('grid-cells');
                            if (!svg || !cellsGroup) {
                                // Wait a frame for createDrawingPhase/createStaticCellsPhase
                                requestAnimationFrame(attempt);
                                return;
                            }

                            // Drive the master timeline to its end
                            try { section2Timeline && section2Timeline.progress && section2Timeline.progress(1, false); } catch (_) { /* no-op */ }

                            // Title fully visible
                            try {
                                const titleEl = document.querySelector('.key-metrics-title');
                                if (titleEl) gsap.set(titleEl, { opacity: 1, clearProps: 'transform,filter' });
                            } catch (_) { /* no-op */ }

                            // Hide lines to avoid overflow on mobile, but keep SVG measurable
                            try {
                                const paths = svg.querySelectorAll('path.line');
                                paths.forEach((p) => {
                                    try { gsap.set(p, { drawSVG: '0% 0%', attr: { 'stroke-opacity': 0 }, opacity: 0, visibility: 'hidden' }); } catch (_) { /* no-op */ }
                                });
                            } catch (_) { /* no-op */ }

                            // Apply final geometry directly without timelines (robust on mobile/tablet)
                            try {
                                const gridGroup = window.gridGroup;
                                if (gridGroup) {
                                    gsap.set(gridGroup, { transformOrigin: '50% 50%', rotation: 45 });
                                }
                                const baseSpacing = typeof window.gridInitialSpacing === 'number' ? window.gridInitialSpacing : 50;
                                const rectStateKey = getCurrentAnimationState();
                                const rectStateCfg = RECT_STATES[rectStateKey] || {};
                                const posMult = (typeof rectStateCfg.positionFinalMultiplierEnd === 'number') ? rectStateCfg.positionFinalMultiplierEnd : 1;
                                const sizeF = (typeof rectStateCfg.sizeFactorFinalEnd === 'number') ? rectStateCfg.sizeFactorFinalEnd : (rectStateCfg.sizeFactor ?? 0.5);
                                const finalFactor = (window.gridState && typeof window.gridState.finalFactor === 'number') ? window.gridState.finalFactor : 2.5;
                                const spacingBase = baseSpacing * finalFactor;
                                const size = Math.max(2, spacingBase * sizeF);
                                const rx = size * (rectStateCfg.cornerRadiusFactor ?? 0.15);

                                const cellNodes = Array.from(cellsGroup.querySelectorAll('.cell-node'));
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
                            } catch (_) { /* no-op */ }

                            // Force-visible final state for cells/text regardless of tween side-effects
                            try {
                                const cellNodes = Array.from(cellsGroup.querySelectorAll('.cell-node'));
                                const rects = Array.from(cellsGroup.querySelectorAll('rect.cell-rect'));
                                const labels = Array.from(cellsGroup.querySelectorAll('text[data-role="label"]'));
                                const amounts = Array.from(cellsGroup.querySelectorAll('text[data-role="amount"]'));
                                const highlights = Array.from(cellsGroup.querySelectorAll('rect.label-highlight'));
                                if (cellNodes.length) gsap.set(cellNodes, { opacity: 1 });
                                if (rects.length) gsap.set(rects, { attr: { 'fill-opacity': 1 } });
                                if (labels.length) gsap.set(labels, { opacity: 0.5 });
                                if (amounts.length) gsap.set(amounts, { opacity: 1 });
                                if (highlights.length) gsap.set(highlights, { attr: { width: 0 } });
                            } catch (_) { /* no-op */ }

                            try { ScrollTrigger.refresh(); } catch (_) { /* no-op */ }
                        } finally {
                            window.__s2MobileFinalizing = false;
                        }
                    };

                    attempt();
                };
                // Expose a manual hook for debugging from DevTools
                try { window.section2Finalize = finalize; } catch (_) { /* no-op */ }

                if (document && document.fonts && typeof document.fonts.ready?.then === 'function') {
                    document.fonts.ready.then(() => {
                        requestAnimationFrame(() => requestAnimationFrame(finalize));
                    }).catch(() => finalize());
                } else {
                    requestAnimationFrame(finalize);
                }
                return;
            }
        } catch (_) { /* no-op */ }

        // NON-MOBILE: create the pin trigger using unified system
        const originalDistance = (section2Timeline ? section2Timeline.totalDuration() : 4) * (SECTION2_SCROLL?.pxPerSecond || 600);
        const scrollTrigger = unifiedPinningSystem.createAnimatedPin(
            2, // sectionNumber
            triggerEl || document.querySelector("section[data-section='2']"), // triggerElement
            section2Timeline, // animation
            originalDistance, // originalDistance
            {
                onUpdate: (self) => {
                    // Additional custom logic if needed
                    console.log('Section 2 scroll progress:', self.progress);
                }
            }
        );
        
        // Store the ScrollTrigger reference for cleanup
        if (scrollTrigger) {
            section2Timeline.scrollTrigger = scrollTrigger;
        }

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
        
        // Ensure title is visible immediately (no fade-in)
        gsap.set(title, { opacity: 1, scale: 1, blur: 0 });

        // Keep initial delay timing consistent
        cursor += (t.periodA ?? 0.5);
        
        // Preserve original fade-in duration as idle time to keep fade-out schedule
        cursor += (t.h2FadeIn ?? 0.5);
        
        // Title show period
        // (Title already visible; maintain timeline cursor to keep fade-out timing)
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
        
        console.log('[Section5] Title animation adjusted for immediate visibility:', {
            initialVisible: true,
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

    // Calculate original scroll distance
    // Section 5 uses viewport height units (scrollSpeed: 10000vh in config)
    // The old system used this as viewport percentage, which created extremely long distances
    // Use a fixed large base for proper speed control (like Sections 3 & 4)
    const originalDistance = 5000; // Large base for proper speed control
    
    // Use Unified Pinning System to create the ScrollTrigger with consistent speed
    const scrollTrigger = unifiedPinningSystem.createAnimatedPin(
        5, // sectionNumber
        section5El, // triggerElement
        tl, // animation
        originalDistance, // originalDistance
        {
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
        }
    );

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

    // Get config
    const t = SECTION6_TIMINGS;
    const holdScrollDistance = t.holdAfterAnimation || 3000;

    // Create timeline without ScrollTrigger (will be added by unified system)
    const tl = gsap.timeline();

    // Build timeline using same timing logic (cursor tracking)
    // NOTE: Timeline ends when tiles are visible - hold happens AFTER timeline completes
    let cursor = 0;

    // Initial delay
    cursor += (t.periodA ?? 0.01);

    // Title fade in
    tl.to(title, { 
        opacity: 1, 
        ease: 'power1.out', 
        duration: (t.titleFadeIn ?? 0.15) 
    }, cursor);
    cursor += (t.titleFadeIn ?? 0.15);

    // Title show period (title stays visible during this time)
    cursor += (t.titleShow ?? 0.25);

    // Title fade out (starts after show period)
    tl.to(title, { 
        opacity: 0, 
        ease: 'power1.in', 
        duration: (t.titleFadeOut ?? 0.15) 
    }, cursor);
    cursor += (t.titleFadeOut ?? 0.15);

    // Delay before tiles appear
    cursor += (t.tilesDelay ?? 0.1);

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
        duration: (t.tilesFadeIn ?? 0.4),
        stagger: (t.tilesStagger ?? 0.05),
        ease: 'back.out(1.2)'
    }, cursor);
    cursor += (t.tilesFadeIn ?? 0.4) + (tiles.length * (t.tilesStagger ?? 0.05));

    // Tiles show period (tiles stay visible)
    cursor += (t.tilesShow ?? 3.0);

    // ADD DUMMY TWEEN FOR HOLD PERIOD
    // This is the brilliant simple solution: animate a dummy property for the hold duration
    // This adds real timeline duration that gets scrubbed, creating the hold effect naturally
    // We convert the holdScrollDistance (pixels) to timeline units using the inverse of pxPerUnit
    const holdDurationInTimelineUnits = holdScrollDistance / (SECTION6_SCROLL?.pxPerUnit || 300);
    
    // Create a dummy object to animate (has no visual effect, just adds timeline duration)
    const dummyHoldObject = { value: 0 };
    tl.to(dummyHoldObject, {
        value: 1,
        duration: holdDurationInTimelineUnits,
        ease: 'none'  // Linear, no easing needed for invisible tween
    }, cursor);
    
    // NOW calculate scroll distance based on ACTUAL timeline duration (which includes dummy tween)
    const totalTimelineDuration = tl.totalDuration();
    const totalScrollDistance = Math.round(totalTimelineDuration * (SECTION6_SCROLL?.pxPerUnit || 300));
    
    console.log('[Section6] SIMPLE HOLD SOLUTION', {
        holdScrollDistance: holdScrollDistance + 'px',
        holdDurationInTimelineUnits: holdDurationInTimelineUnits.toFixed(2) + ' units',
        totalTimelineDuration: totalTimelineDuration.toFixed(2) + ' units',
        totalScrollDistance: totalScrollDistance + 'px',
        explanation: 'Dummy tween adds ' + holdDurationInTimelineUnits.toFixed(2) + ' timeline units = ' + 
                     holdScrollDistance + 'px of scroll hold'
    });
    
    // Use Unified Pinning System to create the ScrollTrigger with consistent speed
    // No need for animationEndProgress - the timeline naturally includes the hold period
    const scrollTrigger = unifiedPinningSystem.createAnimatedPin(
        6, // sectionNumber
        section6El, // triggerElement
        tl, // animation (includes dummy hold tween)
        totalScrollDistance, // originalDistance (calculated from full timeline)
        {
            // No special handling needed - timeline duration naturally includes hold
        }
    );
}

/**
 * Setup Section 7 simple pin for 2 seconds
 * Final CTA section with basic pin to hold it in view
 */
export function setupSection7Pin() {
    const section7El = document.querySelector(".section[data-section='7']");
    if (!section7El) {
        console.warn('[Section7] Section 7 element not found');
        return;
    }

    console.log('[Section7] Setting up 2-second pin');

    // Create a simple timeline (can be empty or have fade-in animation)
    const tl = gsap.timeline();
    
    // Optional: Add a subtle fade-in effect
    const ctaElements = section7El.querySelectorAll('.section7-content, .section7-circles');
    if (ctaElements.length > 0) {
        tl.fromTo(ctaElements, 
            { opacity: 0.8 },
            { opacity: 1, duration: 0.5, ease: 'power1.out', stagger: 0.1 }
        );
    }

    // 2 seconds = 2000 pixels base (will be adjusted by speed manager)
    const originalDistance = 2000;
    
    // Use Unified Pinning System to create the ScrollTrigger with consistent speed
    const scrollTrigger = unifiedPinningSystem.createAnimatedPin(
        7, // sectionNumber
        section7El, // triggerElement
        tl, // animation
        originalDistance, // originalDistance
        {
            onEnter: () => {
                console.log('[Section7] Pin started - holding for ~2 seconds');
            },
            onLeave: () => {
                console.log('[Section7] Pin released');
            }
        }
    );

    console.log('[Section7] Pin setup complete');
}

/**
 * Setup Section 4 with multiple pebbles (4 instances, one per asset category)
 * Each pebble shows simultaneously, arranged vertically
 */
export function setupSection4MultiplePebbles(pebbleInstances) {
    console.log('[Section4] setupSection4MultiplePebbles called with:', pebbleInstances);
    
    if (!pebbleInstances || pebbleInstances.length === 0) {
        console.error('[Section4] No pebble instances provided, got:', pebbleInstances);
        return;
    }
    
    // For debugging: just work with the first pebble
    const pebble = pebbleInstances[0];
    if (!pebble) {
        console.error('[Section4] No pebble found in instances');
        return;
    }

    const section4El = document.querySelector(".section[data-section='4']");
    if (!section4El) {
        console.warn('[Section4] Section 4 element not found');
        return;
    }

    console.log('[Section4] Setting up single pebble for debugging');

    // Get the single pebble
    const group = pebble.group;
    
    // Using SECTION4_PEBBLE config as base
    const bp = getCurrentBreakpoint();
    const baseConfig = (SECTION4_PEBBLE && SECTION4_PEBBLE[bp]) ? SECTION4_PEBBLE[bp] : SECTION4_PEBBLE[BREAKPOINT_NAMES.DESKTOP];
    
    console.log('[Section4] Single pebble positioning:', {
        baseConfig: baseConfig.position,
        group: group
    });
    
    // Set final position immediately (no animation for now)
    gsap.set(group.position, { 
        x: baseConfig.position.x || -3.5,
        y: baseConfig.position.y || 0,
        z: baseConfig.position.z || 0
    });
    
    // Set scale (already at 1.0, plus config multiplier)
    const finalScale = 1.0 * (baseConfig.scale || 0.875);
    gsap.set(group.scale, { x: finalScale, y: finalScale, z: finalScale });
    
    // Make visible immediately
    gsap.set(group, { visible: true });
    
    // Check if group is actually in the scene
    console.log('[Section4] Single pebble group details:', {
        visible: group.visible,
        position: group.position,
        scale: group.scale,
        parent: group.parent,
        children: group.children.length
    });
    
    // Prepare materials for visibility
    const materials = [];
    group.traverse((obj) => {
        if (obj && obj.isMesh && obj.material) {
            const mat = obj.material;
            if (Array.isArray(mat)) {
                mat.forEach((m) => { if (m && !m.isShaderMaterial) materials.push(m); });
            } else {
                if (!mat.isShaderMaterial) materials.push(mat);
            }
        }
    });
    materials.forEach((m) => { try { m.transparent = true; m.opacity = 1; } catch (_) { void 0; } });
    
    console.log('[Section4] Single pebble set to visible at position:', {
        x: baseConfig.position.x || -3.5,
        y: baseConfig.position.y || 0,
        z: baseConfig.position.z || 0,
        scale: finalScale,
        materialsCount: materials.length
    });

    // Make first text panel visible
    const panelEl = document.getElementById(`section4-panel-0`);
    if (panelEl) {
        gsap.set(panelEl, { opacity: 1, y: 0, filter: 'blur(0px)' });
    }

    console.log('[Section4] Single pebble set to visible immediately - check 3D scene');
    
    // Debug: Check if pebble is actually in the scene
    const scene = group.parent;
    if (scene) {
        console.log('[Section4] Scene found, checking pebble visibility in scene');
        console.log('Scene children count:', scene.children.length);
        const isInScene = scene.children.includes(group);
        console.log('Single pebble in scene:', isInScene);
    } else {
        console.error('[Section4] Could not find scene - pebble may not be added to scene');
    }
}

 