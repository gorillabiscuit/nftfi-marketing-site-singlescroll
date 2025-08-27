// Main Application Entry Point for NFTfi Marketing Site
// Clean entry point that orchestrates all application components

import { init as initThreeJS, onWindowResize as onThreeJSResize } from './core/init.js';
import { animate, initializeAnimationLoop } from './core/loop.js';
import { initializeNavigation } from './controls/navigation.js';
import { loadLogoModel, mesh, wrapper, isModelReady } from './objects/logoModel.js';
import { loadPebbleModel, pebbleGroup } from './objects/pebbleModel.js';
import { loadRoundPebbleModel } from './objects/roundPebbleModel.js';
import { createBackgroundPlane, updatePlaneForViewport, updatePlaneTexture, captureHeroAsTexture, updatePlane } from './objects/backgroundPlane.js';
import { setupScrollAnimation, resetScrollAnimation, setupSection4PebbleEntrance, setupSection4PebbleFadePinned } from './controls/scrollTrigger.js';
import { initStatsScrambleReveal, initHeadingReveal, cleanupTextEffects } from './controls/textEffects.js';
import { initHeaderAnimation } from './controls/headerAnimation.js';
import { initializeViewport, worldToPosition, calculateTargetPosition, calculateStartPosition } from './utils/viewport.js';
import { createWindowResizeHandler, addEventListeners } from './utils/domUtils.js';
import { TARGET_CONFIG, MODEL_CONFIG } from './config.js';
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

// Main initialization function
function init() {
    try { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } } catch (e) { (void 0); }
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
    
    // Initialize header hide/show animation after ScrollSmoother is ready
    initHeaderAnimation();
    
    // Initialize Three.js components using modular structure
    const { scene, camera, renderer, mainRenderTarget, backRenderTarget, uniforms } = initThreeJS();
    
    // Get canvas reference
    const canvas = document.getElementById('three-canvas');
    
    // Create background plane for refraction
    createBackgroundPlane(scene, uniforms);
    
    // Load GLTF model
    loadLogoModel(scene, uniforms, calculateStartPosition, updatePlaneForViewport, setupScrollAnimation, resetScrollAnimation, updatePlaneTexture, captureHeroAsTexture, worldToPosition, calculateTargetPosition);

    // Load Pebble model (as-is). Uses shared uniforms for same material/lighting
    try {
        loadPebbleModel(scene, uniforms);
        // Deferred attach of round pebble once pebbleGroup is available
        const attachRound = () => {
            try {
                if (window.PEBBLE && window.PEBBLE.pebbleGroup) {
                    loadRoundPebbleModel(window.PEBBLE.pebbleGroup, scene);
                } else if (pebbleGroup) {
                    loadRoundPebbleModel(pebbleGroup, scene);
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
                    setupSection4PebbleEntrance(grp);
                    // Also add the pinned fade-in timeline for S4
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
    // Embed Section 3 dashboard SVG, then initialize pin+scrub timeline
    initSection3Dashboard().then((ok) => {
        console.log('Section 3 dashboard embed:', ok ? 'success' : 'skipped');
        if (ok) {
            try { initSection3Scroll(); } catch (e) { console.error(e); }
            try { window.scrollTo(0, 0); } catch (e) { (void 0); }
        }
    });
    
    // Initialize animation loop when model is ready
    const checkModelReady = () => {
        if (isModelReady && mesh && wrapper) {
            initializeAnimationLoop(mesh, wrapper, isModelReady);
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
            try { if (e && e.persisted) { window.scrollTo(0, 0); } else { window.scrollTo(0, 0); } } catch (err) { (void 0); }
        });
    } catch (e) { (void 0); }
    

}); 