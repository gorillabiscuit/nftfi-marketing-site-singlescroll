// Main Application Entry Point for NFTfi Marketing Site
// Clean entry point that orchestrates all application components

import { loadingManager, updateLoadingProgress, completeLoadingStep, completeLoading, forceCompleteLoading, forceAllowScrolling, switchToScrollSmootherControl } from './utils/loadingManager.js';
import { init as initThreeJS, onWindowResize as onThreeJSResize } from './core/init.js';
import { animate, initializeAnimationLoop } from './core/loop.js';
import { initializeNavigation } from './controls/navigation.js';
import { loadLogoModel, mesh, wrapper, isModelReady } from './objects/logoModel.js';
import { loadPebbleModel, pebbleGroup } from './objects/pebbleModel.js';
import { loadRoundPebbleModel } from './objects/roundPebbleModel.js';
import { loadPebbleModel2, pebbleGroup2 } from './objects/pebbleModel2.js';
import { loadRoundPebbleModel2 } from './objects/roundPebbleModel2.js';
import { loadPebbleModel3, pebbleGroup3 } from './objects/pebbleModel3.js';
import { loadRoundPebbleModel3 } from './objects/roundPebbleModel3.js';
import { loadPebbleModel4, pebbleGroup4 } from './objects/pebbleModel4.js';
import { loadRoundPebbleModel4 } from './objects/roundPebbleModel4.js';
import { createBackgroundPlane, updatePlaneForViewport, updatePlaneTexture, captureHeroAsTexture, updatePlane, initializeVideoTextures } from './objects/backgroundPlane.js';
import { setupScrollAnimation, resetScrollAnimation, setupSection4PebbleFadePinned, setupSection5HorizontalScroll, setupSection6TitleAnimation, setupSection7Pin } from './controls/scrollTrigger.js';
import { initializeTestimonials } from './controls/testimonials.js';
import { initStatsScrambleReveal, initHeadingReveal, cleanupTextEffects } from './controls/textEffects.js';
import { initHeaderAnimation } from './controls/headerAnimation.js';
import { initializeViewport, worldToPosition, calculateTargetPosition, calculateStartPosition } from './utils/viewport.js';
import { createWindowResizeHandler, addEventListeners } from './utils/domUtils.js';
import { TARGET_CONFIG, MODEL_CONFIG } from './config/index.js';
import { initializeBreakpointDetection, getCurrentAnimationState, onStateChange, debugSetState, getAnimationState, toggleDebugMode, enableDebugMode, disableDebugMode } from './utils/breakpointManager.js';
// NEW: Import ScrollSmoother synchronization layer
import { 
    initializeScrollSmoother, 
    enableScrollSmoother, 
    disableScrollSmoother, 
    getScrollSmootherStatus, 
    testScrollSmoother,
    emergencyDisable 
} from './controls/scrollSynchronizer.js';
// NEW: Section 3 dashboard embed + scroll
import { initSection3Dashboard, initSection3Scroll } from './controls/section3Dashboard.js';
// NEW: Hero button stroke effects
import { initHeroButtonEffects } from './controls/heroButtonEffects.js';
// NEW: Scroll Speed Manager
import scrollSpeedManager from './controls/scrollSpeedManager.js';
// NEW: Unified Pinning System
import unifiedPinningSystem from './controls/unifiedPinningSystem.js';
// NEW: Pebble Interaction
import { initPebbleInteraction } from './controls/pebbleInteraction.js';

// Main initialization function
async function init() {
    try { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } } catch (e) { void 0; }
    
    // Start loading process
    updateLoadingProgress('Initializing Three.js...', 0);
    
    // Robust scroll-to-top: initial, next tick, after Section 3 embed, and on pageshow (bfcache)
    window.scrollTo(0, 0);
    setTimeout(() => { window.scrollTo(0, 0); }, 0);
    
    // ScrollSmoother will handle scrolling prevention during initial animation
    console.log('App initialized - ScrollSmoother will manage scrolling during animation');
    
    // Initialize breakpoint detection first
    initializeBreakpointDetection();
    
    // NEW: Initialize ScrollSmoother safely (will be paused initially)
    const scrollSmootherStatus = initializeScrollSmoother();
    console.log('ScrollSmoother initialization result:', scrollSmootherStatus ? 'success' : 'skipped');
    
    // NEW: Initialize Scroll Speed Manager with ScrollSmoother reference
    if (scrollSmootherStatus && window.smoother) {
        scrollSpeedManager.initialize(window.smoother);
        console.log('Scroll Speed Manager initialized with ScrollSmoother');
    } else {
        console.log('Scroll Speed Manager initialized without ScrollSmoother');
    }
    
    // NEW: Initialize Unified Pinning System
    unifiedPinningSystem.initialize();
    console.log('Unified Pinning System initialized');
    
    // CRITICAL: Switch loading manager to ScrollSmoother control now that it's initialized
    if (scrollSmootherStatus) {
        switchToScrollSmootherControl();
    }
    
    // Initialize header hide/show animation after ScrollSmoother is ready
    initHeaderAnimation();
    
    // Complete Three.js initialization
    completeLoadingStep('Initializing Three.js...');
    
    // Initialize Three.js components using modular structure
    updateLoadingProgress('Loading 3D models...', 0);
    const { scene, camera, renderer, mainRenderTarget, backRenderTarget, uniforms } = initThreeJS();
    
    // Get canvas reference
    const canvas = document.getElementById('three-canvas');
    
    // Create background plane for refraction
    createBackgroundPlane(scene, uniforms);
    
    // Load GLTF model with progress tracking
    updateLoadingProgress('Loading 3D models...', 20);
    loadLogoModel(scene, uniforms, calculateStartPosition, updatePlaneForViewport, setupScrollAnimation, resetScrollAnimation, updatePlaneTexture, captureHeroAsTexture, worldToPosition, calculateTargetPosition);

        // Load Pebble model (as-is). Uses shared uniforms for same material/lighting
        try {
            updateLoadingProgress('Loading 3D models...', 60);
            loadPebbleModel(scene, uniforms);
            loadPebbleModel2(scene, uniforms);
            loadPebbleModel3(scene, uniforms);
            loadPebbleModel4(scene, uniforms);
            // Deferred attach of round pebbles once pebbleGroups are available
            const attachRounds = () => {
                try {
                    let attachedCount = 0;
                    
                    // Attach first round pebble
                    if (window.PEBBLE && window.PEBBLE.pebbleGroup) {
                        loadRoundPebbleModel(window.PEBBLE.pebbleGroup, scene);
                        attachedCount++;
                    } else if (pebbleGroup) {
                        loadRoundPebbleModel(pebbleGroup, scene);
                        attachedCount++;
                    }
                    
                    // Attach second round pebble
                    if (window.PEBBLE2 && window.PEBBLE2.pebbleGroup2) {
                        loadRoundPebbleModel2(window.PEBBLE2.pebbleGroup2, scene);
                        attachedCount++;
                    } else if (pebbleGroup2) {
                        loadRoundPebbleModel2(pebbleGroup2, scene);
                        attachedCount++;
                    }
                    
                    // Attach third round pebble
                    if (window.PEBBLE3 && window.PEBBLE3.pebbleGroup3) {
                        loadRoundPebbleModel3(window.PEBBLE3.pebbleGroup3, scene);
                        attachedCount++;
                    } else if (pebbleGroup3) {
                        loadRoundPebbleModel3(pebbleGroup3, scene);
                        attachedCount++;
                    }
                    
                    // Attach fourth round pebble
                    if (window.PEBBLE4 && window.PEBBLE4.pebbleGroup4) {
                        loadRoundPebbleModel4(window.PEBBLE4.pebbleGroup4, scene);
                        attachedCount++;
                    } else if (pebbleGroup4) {
                        loadRoundPebbleModel4(pebbleGroup4, scene);
                        attachedCount++;
                    }
                    
                    if (attachedCount === 4) {
                        updateLoadingProgress('Loading 3D models...', 100);
                    } else {
                        setTimeout(attachRounds, 100);
                        return;
                    }
                } catch (err) {
                    console.error('Failed to attach round pebbles:', err);
                }
            };
            attachRounds();
            // Hook pebble section 4 entrance once groups are ready
            const hookPebbles = () => {
                try {
                    const grp1 = (window.PEBBLE && window.PEBBLE.pebbleGroup) ? window.PEBBLE.pebbleGroup : pebbleGroup;
                    const grp2 = (window.PEBBLE2 && window.PEBBLE2.pebbleGroup2) ? window.PEBBLE2.pebbleGroup2 : pebbleGroup2;
                    const grp3 = (window.PEBBLE3 && window.PEBBLE3.pebbleGroup3) ? window.PEBBLE3.pebbleGroup3 : pebbleGroup3;
                    const grp4 = (window.PEBBLE4 && window.PEBBLE4.pebbleGroup4) ? window.PEBBLE4.pebbleGroup4 : pebbleGroup4;
                    
                    if (grp1 && grp2 && grp3 && grp4) {
                        // Call once with all 4 pebble groups - creates a single unified ScrollTrigger
                        setupSection4PebbleFadePinned(grp1, grp2, grp3, grp4);
                        
                        // Initialize pebble interaction (hover/tap to spin)
                        // Get camera from Three.js init
                        import('./core/init.js').then(({ camera }) => {
                            if (camera) {
                                initPebbleInteraction(camera, [grp1, grp2, grp3, grp4]);
                            }
                        });
                    } else {
                        setTimeout(hookPebbles, 100);
                    }
                } catch (_) { setTimeout(hookPebbles, 100); }
            };
            hookPebbles();
            
            // Listen for breakpoint changes and recreate Section 4 animations
            onStateChange((newState, oldState) => {
                try {
                    const grp1 = (window.PEBBLE && window.PEBBLE.pebbleGroup) ? window.PEBBLE.pebbleGroup : pebbleGroup;
                    const grp2 = (window.PEBBLE2 && window.PEBBLE2.pebbleGroup2) ? window.PEBBLE2.pebbleGroup2 : pebbleGroup2;
                    const grp3 = (window.PEBBLE3 && window.PEBBLE3.pebbleGroup3) ? window.PEBBLE3.pebbleGroup3 : pebbleGroup3;
                    const grp4 = (window.PEBBLE4 && window.PEBBLE4.pebbleGroup4) ? window.PEBBLE4.pebbleGroup4 : pebbleGroup4;
                    
                    if (grp1 && grp2 && grp3 && grp4) {
                        // Recreate Section 4 animations with new breakpoint-specific config
                        setupSection4PebbleFadePinned(grp1, grp2, grp3, grp4);
                    }
                } catch (e) {
                    console.error('Failed to recreate Section 4 on breakpoint change:', e);
                }
            });
        } catch (e) {
            console.error('Failed to load Pebble model:', e);
        }
    
    // Create window resize handler
    const onWindowResize = createWindowResizeHandler(onThreeJSResize, updatePlaneForViewport, updatePlaneTexture);
    
    // Add event listeners
    addEventListeners(onWindowResize);
    
    // Initialize global mouse influence variables
    window.mouseInfluence = { x: 0, y: 0 };
    window.lastMousePos = { x: 0, y: 0 };
    
    // Initialize viewport utilities
    initializeViewport(camera);
    

    
    // Initialize text effects
    initStatsScrambleReveal();
    initHeadingReveal();
    
    // Defer initialization of heavy video textures until Section 4 nears viewport
    try {
        const s4 = document.querySelector('.section[data-section="4"]');
        if ('IntersectionObserver' in window && s4) {
            let started = false;
            const obs = new IntersectionObserver((entries) => {
                const e = entries[0];
                if (!started && e && e.isIntersecting) {
                    started = true;
                    try { initializeVideoTextures().catch(() => {}); } catch (_) { }
                    try { obs.disconnect(); } catch (_) { }
                }
            }, { root: null, rootMargin: '800px', threshold: 0 });
            obs.observe(s4);
        } else {
            initializeVideoTextures().catch(() => {});
        }
    } catch (_) { try { initializeVideoTextures().catch(() => {}); } catch (_) { } }
    // Embed Section 3 dashboard SVG, then initialize pin+scrub timeline
    initSection3Dashboard().then((ok) => {
        console.log('Section 3 dashboard embed:', ok ? 'success' : 'skipped');
        if (ok) {
            try { initSection3Scroll(); } catch (e) { console.error(e); }
            try { window.scrollTo(0, 0); } catch (e) { void 0; }
        }
    });
    
    // Initialize Section 5 testimonials and horizontal scroll animation
    try {
        // First initialize testimonials (this populates the DOM with cards)
        const testimonialsInitialized = await initializeTestimonials();
        if (testimonialsInitialized) {
            console.log('[App] Testimonials initialized successfully');
        } else {
            console.warn('[App] Testimonials initialization failed');
        }
        
        // Then setup the horizontal scroll animation (this animates the cards)
        setupSection5HorizontalScroll();
    } catch (e) {
        console.error('Failed to setup Section 5:', e);
    }
    
    // Setup Section 6 title animation
    try {
        setupSection6TitleAnimation();
    } catch (e) {
        console.error('Failed to setup Section 6:', e);
    }
    
    // Setup Section 7 pin
    try {
        setupSection7Pin();
    } catch (e) {
        console.error('Failed to setup Section 7:', e);
    }
    
    // Start and complete images loading step (most images are loaded via CSS)
    updateLoadingProgress('Loading images...', 0);
    completeLoadingStep('Loading images...');
    
    // Warm-up shaders/materials to avoid first-frame compile hitches near Section 4
    updateLoadingProgress('Initializing shaders...', 0);
    try {
        // Attempt to compile shaders with current scene/camera
        if (renderer && scene && camera && typeof renderer.compile === 'function') {
            renderer.compile(scene, camera);
        }
        // Render a quick frame to prime pipelines
        requestAnimationFrame(() => { try { renderer.render(scene, camera); } catch (e) { void 0; } });
    } catch (e) { void 0; }
    completeLoadingStep('Initializing shaders...');
    
    // Initialize animation loop when model is ready
    updateLoadingProgress('Preparing animations...', 0);
    const checkModelReady = () => {
        if (isModelReady && mesh && wrapper) {
            initializeAnimationLoop(mesh, wrapper, isModelReady);
            completeLoadingStep('Preparing animations...');
            // Complete loading after a short delay to ensure everything is ready
            setTimeout(() => {
                completeLoading();
            }, 300);
        } else {
            setTimeout(checkModelReady, 100);
        }
    };
    checkModelReady();
    
    // Log current animation state for debugging
    console.log('Current animation state:', getCurrentAnimationState());
    
    // Expose debug functions globally
    window.debugSetState = debugSetState;
    window.getCurrentAnimationState = getCurrentAnimationState;
    window.forceCompleteLoading = forceCompleteLoading;
    window.forceAllowScrolling = forceAllowScrolling;
    window.switchToScrollSmootherControl = switchToScrollSmootherControl;
    window.scrollSpeedManager = scrollSpeedManager; // Expose for debugging
    window.unifiedPinningSystem = unifiedPinningSystem; // Expose for debugging
    

    
    // Add debug functions for testing animation states
    window.debugAnimationStates = {
        // Test different states
        testMobile: () => debugSetState('mobile'),
        testTablet: () => debugSetState('tablet'),
        testDesktop: () => debugSetState('desktop'),
        
        // Get current positions
        getCurrentPositions: () => {
            const startPos = calculateStartPosition();
            const targetPos = calculateTargetPosition();
            console.log('Current positions:', {
                state: getCurrentAnimationState(),
                start: startPos,
                target: targetPos
            });
            return { start: startPos, target: targetPos };
        },
        
        // Test all states
        testAllStates: () => {
            console.log('Testing all animation states...');
            ['mobile', 'tablet', 'desktop'].forEach(state => {
                debugSetState(state);
                setTimeout(() => {
                    const positions = window.debugAnimationStates.getCurrentPositions();
                    console.log(`${state} state:`, positions);
                }, 100);
            });
        }
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize hero button stroke effects
    initHeroButtonEffects();
    
    // Initialize application
    init();
    
    // Start animation loop
    animate();
    
    // Force texture update after everything is loaded
    setTimeout(() => {
        if (window.DEBUG && window.DEBUG.updatePlaneTexture) {
            window.DEBUG.updatePlaneTexture();
        }
    }, 500);
    try {
        window.addEventListener('pageshow', function (e) {
            try { if (e && e.persisted) { window.scrollTo(0, 0); } else { window.scrollTo(0, 0); } } catch (err) { void 0; }
        });
    } catch (e) { void 0; }

    // Bullet-proof viewport and header sizing for hero
    (function setupDynamicViewportAndHeaderSizing() {
        const docEl = document.documentElement;
        const headerEl = document.querySelector('nav.custom-navbar') || document.querySelector('header');

        function setViewportVars() {
            try {
                const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                docEl.style.setProperty('--app-viewport-height', vh + 'px');
            } catch (_) {
                docEl.style.setProperty('--app-viewport-height', window.innerHeight + 'px');
            }
        }

        function setHeaderHeight() {
            if (!headerEl) { docEl.style.setProperty('--header-height', '0px'); return; }
            try {
                const h = headerEl.offsetHeight;
                docEl.style.setProperty('--header-height', h + 'px');
            } catch (_) {
                docEl.style.setProperty('--header-height', '0px');
            }
        }

        setViewportVars();
        setHeaderHeight();

        // Update on viewport changes (mobile browser chrome show/hide)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', setViewportVars, { passive: true });
        }
        window.addEventListener('resize', setViewportVars, { passive: true });

        // Observe header height changes robustly
        try {
            const ro = new ResizeObserver(setHeaderHeight);
            if (headerEl) ro.observe(headerEl);
        } catch (_) {
            window.addEventListener('resize', setHeaderHeight, { passive: true });
        }
    })();
});

// Expose debug functions globally for easy console access
window.debugBreakpoint = toggleDebugMode;
window.enableBreakpointDebug = enableDebugMode;
window.disableBreakpointDebug = disableDebugMode;

console.log('💡 Debug commands available:');
console.log('  - debugBreakpoint()          Toggle breakpoint debug label');
console.log('  - enableBreakpointDebug()    Enable breakpoint debug label');
console.log('  - disableBreakpointDebug()   Disable breakpoint debug label'); 