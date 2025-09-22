// Main Application Entry Point for NFTfi Marketing Site
// Clean entry point that orchestrates all application components

import { loadingManager, updateLoadingProgress, completeLoadingStep, completeLoading, forceCompleteLoading, forceAllowScrolling, switchToScrollSmootherControl } from './utils/loadingManager.js';
import { init as initThreeJS, onWindowResize as onThreeJSResize } from './core/init.js';
import { animate, initializeAnimationLoop } from './core/loop.js';
import { initializeNavigation } from './controls/navigation.js';
import { loadLogoModel, mesh, wrapper, isModelReady } from './objects/logoModel.js';
import { loadPebbleModel, pebbleGroup } from './objects/pebbleModel.js';
import { loadRoundPebbleModel } from './objects/roundPebbleModel.js';
import { createBackgroundPlane, updatePlaneForViewport, updatePlaneTexture, captureHeroAsTexture, updatePlane, initializeVideoTextures } from './objects/backgroundPlane.js';
import { setupScrollAnimation, resetScrollAnimation, setupSection4PebbleFadePinned, setupSection5HorizontalScroll } from './controls/scrollTrigger.js';
import { initializeTestimonials } from './controls/testimonials.js';
import { initStatsScrambleReveal, initHeadingReveal, cleanupTextEffects } from './controls/textEffects.js';
import { initHeaderAnimation } from './controls/headerAnimation.js';
import { initializeViewport, worldToPosition, calculateTargetPosition, calculateStartPosition } from './utils/viewport.js';
import { createWindowResizeHandler, addEventListeners } from './utils/domUtils.js';
import { TARGET_CONFIG, MODEL_CONFIG } from './config/index.js';
import { initializeBreakpointDetection, getCurrentAnimationState, onStateChange, debugSetState, getAnimationState } from './utils/breakpointManager.js';
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
        // Deferred attach of round pebble once pebbleGroup is available
        const attachRound = () => {
            try {
                if (window.PEBBLE && window.PEBBLE.pebbleGroup) {
                    loadRoundPebbleModel(window.PEBBLE.pebbleGroup, scene);
                    updateLoadingProgress('Loading 3D models...', 100);
                } else if (pebbleGroup) {
                    loadRoundPebbleModel(pebbleGroup, scene);
                    updateLoadingProgress('Loading 3D models...', 100);
                } else {
                    setTimeout(attachRound, 100);
                    return;
                }
            } catch (err) {
                console.error('Failed to attach round pebble:', err);
            }
        };
        attachRound();
        // Hook pebble section 4 entrance once group is ready
        const hookPebble = () => {
            try {
                const grp = (window.PEBBLE && window.PEBBLE.pebbleGroup) ? window.PEBBLE.pebbleGroup : pebbleGroup;
                if (grp) {
                    // Use only the pinned fade-in timeline for S4
                    setupSection4PebbleFadePinned(grp);
                } else {
                    setTimeout(hookPebble, 100);
                }
            } catch (_) { setTimeout(hookPebble, 100); }
        };
        hookPebble();
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
    
    // Initialize video textures for Section 4 asset switching (async, non-blocking)
    initializeVideoTextures().catch(error => {
        console.warn('Failed to initialize video textures:', error);
    });
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
    

}); 