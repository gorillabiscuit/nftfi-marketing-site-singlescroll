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
import ParallaxSystem from './utils/parallax.js';

// Main initialization function
function init() {
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
    
    // Initialize parallax system
    const parallaxSystem = new ParallaxSystem();
    
    // Register parallax layers (include buttons with proper transform handling)
    const gradientsBg = document.querySelector('.gradients-bg');
    const heroSection = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroActions = document.querySelector('.hero-actions'); // Include buttons
    
    if (gradientsBg) parallaxSystem.registerLayer('background', gradientsBg);
    if (heroSection) parallaxSystem.registerLayer('hero', heroSection);
    if (heroText) parallaxSystem.registerLayer('text', heroText);
    if (heroActions) parallaxSystem.registerLayer('buttons', heroActions);
    
    // Store parallax system globally for cleanup if needed
    window.parallaxSystem = parallaxSystem;
    
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