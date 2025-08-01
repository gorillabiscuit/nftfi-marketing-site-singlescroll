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

// Configuration objects
const TARGET_CONFIG = {
    // Target position in world coordinates (-1 to 1 range)
    targetWorldX: -0.92,    // 80% left in world space
    targetWorldY: 0.84,     // 50% up in world space
    targetWorldZ: 0,       // Z depth
    scaleRatio: 1.2,       // Scale ratio
    
    // Starting position in world coordinates (-1 to 1 range)
    startWorldX: 0.55,      // 80% right in world space
    startWorldY: -0.15,        // Center vertically
    startWorldZ: 0         // Z depth
};

const MODEL_CONFIG = {
    // Scale configuration
    startScale: 3.0,    // Starting scale
    targetScale: 0.265,   // Target scale (much smaller)
    
    // Animation timing
    scrubDuration: 1,    // Smooth transition duration
    
    // Floating animation settings
    floatAmplitude: 0.3, // Small amplitude for subtle movement
    floatSpeed: 0.8, // Slow, gentle speed
    
    // Scroll spin settings
    spinIntensity: 0.05, // How much spin per scroll unit
    spinDecay: 0.1 // How quickly spin decays (0.95 = slow decay)
};

// Main initialization function
function init() {
    // Initialize Three.js components using modular structure
    const { scene, camera, renderer, mainRenderTarget, backRenderTarget, uniforms } = initThreeJS();
    
    // Get canvas reference
    const canvas = document.getElementById('three-canvas');
    
    // Create background plane for refraction
    createBackgroundPlane(scene, uniforms, MODEL_CONFIG);
    
    // Load GLTF model
    loadLogoModel(scene, uniforms, calculateStartPosition, updatePlaneForViewport, setupScrollAnimation, resetScrollAnimation, MODEL_CONFIG, updatePlaneTexture, captureHeroAsTexture, worldToPosition, calculateTargetPosition, TARGET_CONFIG);
    
    // Create window resize handler
    const onWindowResize = createWindowResizeHandler(onThreeJSResize, updatePlaneForViewport, updatePlaneTexture, MODEL_CONFIG);
    
    // Add event listeners
    addEventListeners(onWindowResize);
    
    // Initialize global mouse influence variables
    window.mouseInfluence = { x: 0, y: 0 };
    window.lastMousePos = { x: 0, y: 0 };
    
    // Initialize viewport utilities
    initializeViewport(camera, TARGET_CONFIG, MODEL_CONFIG);
    
    // Initialize controls after Three.js setup is complete
    initializeControls(camera, uniforms, updatePlane);
    
    // Initialize animation loop when model is ready
    const checkModelReady = () => {
        if (isModelReady && mesh && wrapper) {
            initializeAnimationLoop(mesh, wrapper, isModelReady, MODEL_CONFIG);
        } else {
            setTimeout(checkModelReady, 100);
        }
    };
    checkModelReady();
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

// Check if DOM is ready, if not wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeNavigation();
    });
} else {
    initializeNavigation();
} 