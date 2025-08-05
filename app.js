// Main Application Entry Point for NFTfi Marketing Site
// Clean entry point that orchestrates all application components

import { init as initThreeJS, onWindowResize as onThreeJSResize } from './core/init.js';
import { animate, initializeAnimationLoop } from './core/loop.js';
import { initializeControls } from './controls/controlPanel.js';
import { initializeNavigation } from './controls/navigation.js';
import { loadLogoModel, mesh, wrapper, isModelReady } from './objects/logoModel.js';
import { createBackgroundPlane, updatePlaneForViewport, updatePlaneTexture, captureHeroAsTexture, updatePlane } from './objects/backgroundPlane.js';
import { setupScrollAnimation, resetScrollAnimation } from './controls/scrollTrigger.js';
import { initializeViewport, worldToPosition, calculateTargetPosition, calculateStartPosition } from './utils/viewport.js';
import { createWindowResizeHandler, addEventListeners } from './utils/domUtils.js';
import { TARGET_CONFIG, MODEL_CONFIG } from './config.js';
import { initializeBreakpointDetection, getCurrentAnimationState, onStateChange, debugSetState, getAnimationState } from './utils/breakpointManager.js';

// Main initialization function
function init() {
    // Reset scroll position to top to prevent animation conflicts
    window.scrollTo(0, 0);
    // Also reset on next tick to ensure it takes effect
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
    
    // Disable scrolling initially until animation completes
    document.body.style.overflow = 'hidden';
    console.log('App initialized - scrolling disabled until animation completes');
    
    // Fallback timer to enable scrolling after 3 seconds in case animation fails
    setTimeout(() => {
        if (!window.isAnimationComplete || !window.isAnimationComplete()) {
            console.log('Fallback: Enabling scrolling after timeout');
            document.body.style.overflow = 'auto';
        }
    }, 3000);
    
    // Initialize breakpoint detection first
    initializeBreakpointDetection();
    
    // Initialize Three.js components using modular structure
    const { scene, camera, renderer, mainRenderTarget, backRenderTarget, uniforms } = initThreeJS();
    
    // Get canvas reference
    const canvas = document.getElementById('three-canvas');
    
    // Create background plane for refraction
    createBackgroundPlane(scene, uniforms);
    
    // Load GLTF model
    loadLogoModel(scene, uniforms, calculateStartPosition, updatePlaneForViewport, setupScrollAnimation, resetScrollAnimation, updatePlaneTexture, captureHeroAsTexture, worldToPosition, calculateTargetPosition);
    
    // Create window resize handler
    const onWindowResize = createWindowResizeHandler(onThreeJSResize, updatePlaneForViewport, updatePlaneTexture);
    
    // Add event listeners
    addEventListeners(onWindowResize);
    
    // Initialize global mouse influence variables
    window.mouseInfluence = { x: 0, y: 0 };
    window.lastMousePos = { x: 0, y: 0 };
    
    // Initialize viewport utilities
    initializeViewport(camera);
    
    // Initialize controls after Three.js setup is complete
    initializeControls(camera, uniforms, updatePlane);
    
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
}); 