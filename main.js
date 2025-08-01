// Main JavaScript file for NFTfi Marketing Site - Single Scroll
// Three.js scene with glass shader and scroll/mouse interactions

import * as THREE from 'three';
import { init as initThreeJS, onWindowResize as onThreeJSResize } from './core/init.js';
import vertexShader from './shaders/glass.vert.js';
import fragmentShader from './shaders/glass.frag.js';
import { loadLogoModel, mesh, wrapper, isModelReady } from './objects/logoModel.js';
import { createBackgroundPlane, captureHeroAsTexture, backgroundPlane, updatePlane, updatePlaneForViewport, updatePlaneTexture, showBackgroundPlane, hideBackgroundPlane, calculatePlanePosition } from './objects/backgroundPlane.js';
import { initializeControls } from './controls/controlPanel.js';
import { setupScrollAnimation, resetScrollAnimation, updateScrollSpin, getScrollSpinVelocity } from './controls/scrollTrigger.js';
import { initializeViewport, worldToPosition, calculateTargetPosition, calculateStartPosition } from './utils/viewport.js';
import { debouncedTextureUpdate, createWindowResizeHandler, addEventListeners } from './utils/domUtils.js';

// Navigation functionality - Simple and effective
function initializeNavigation() {
    // Desktop dropdowns - Simple and working
    const dropdowns = document.querySelectorAll('.dropdown-container');
    
    dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!trigger || !menu) {
            console.error('Missing trigger or menu element');
            return;
        }
        
        // Toggle dropdown on click
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = menu.classList.contains('open');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu.open').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('open');
                    const otherTrigger = otherMenu.parentElement.querySelector('.dropdown-trigger');
                    if (otherTrigger) {
                        otherTrigger.classList.remove('open');
                    }
                }
            });
            
            if (isOpen) {
                menu.classList.remove('open');
                trigger.classList.remove('open');
            } else {
                menu.classList.add('open');
                trigger.classList.add('open');
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                menu.classList.remove('open');
                trigger.classList.remove('open');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                menu.classList.remove('open');
                trigger.classList.remove('open');
            }
        });
    });
    
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenuOverlay && mobileMenuClose) {
        // Open mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
        
        // Close mobile menu
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });
        
        // Close on overlay click
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Mobile dropdowns
        const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
        
        mobileDropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.mobile-dropdown-trigger');
            const menu = dropdown.querySelector('.mobile-dropdown-menu');
            
            if (trigger && menu) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isOpen = menu.classList.contains('active');
                    
                    // Close all other mobile dropdowns
                    document.querySelectorAll('.mobile-dropdown-menu.active').forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            otherMenu.classList.remove('active');
                            const otherTrigger = otherMenu.parentElement.querySelector('.mobile-dropdown-trigger');
                            if (otherTrigger) {
                                otherTrigger.classList.remove('active');
                            }
                        }
                    });
                    
                    if (isOpen) {
                        menu.classList.remove('active');
                        trigger.classList.remove('active');
                    } else {
                        menu.classList.add('active');
                        trigger.classList.add('active');
                    }
                });
            }
        });
    }
}

// Control initialization is now handled by the controlPanel.js module

// Initialize controls when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Three.js to initialize
    setTimeout(() => {
        // Initialize controls with camera and uniforms from the init function
        if (camera && uniforms) {
            initializeControls(camera, uniforms, updatePlane);
        }
        // Set initial plane position to -8.9
        // Note: updatePlane is now handled by the control panel module
    }, 1000);
});

// GSAP and ScrollTrigger are now handled by controls/scrollTrigger.js

// Scene variables
let scene, camera, renderer, canvas;
// Model variables imported from objects/logoModel.js
let mainRenderTarget, backRenderTarget;
// backgroundPlane imported from objects/backgroundPlane.js
let uniforms;
let startTime = Date.now(); // For time-based rotation calculations

// Scroll animation variables are now handled by controls/scrollTrigger.js

// Direct world space positioning configuration
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

// Model positioning configuration - EASY TO TWEAK!
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

// Shader code moved to separate files: shaders/glass.vert.js and shaders/glass.frag.js

// Initialize Three.js scene
function init() {
    // Initialize Three.js components using modular structure
    const { scene: threeScene, camera: threeCamera, renderer: threeRenderer, mainRenderTarget: threeMainTarget, backRenderTarget: threeBackTarget, uniforms: threeUniforms } = initThreeJS();
    
    // Assign to global variables for compatibility
    scene = threeScene;
    camera = threeCamera;
    renderer = threeRenderer;
    mainRenderTarget = threeMainTarget;
    backRenderTarget = threeBackTarget;
    uniforms = threeUniforms;
    
    // Get canvas reference
    canvas = document.getElementById('three-canvas');
    
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
}

// Hero capture logic moved to objects/backgroundPlane.js

// Background plane logic moved to objects/backgroundPlane.js

// Load GLTF model
// Model loading logic moved to objects/logoModel.js


// Event listeners are now handled by utils/domUtils.js

// Calculate optimal plane position based on viewport
// Update plane texture with fresh hero capture
// Viewport and texture utilities are now handled by utils/viewport.js and utils/textureCapture.js
// DOM utilities are now handled by utils/domUtils.js

    // Animation loop with proper parent-child rotation, mouse-controlled axes, and floating animation
    function animate() {
        requestAnimationFrame(animate);
        
        if (wrapper && isModelReady) {
            const time = (Date.now() - startTime) * 0.001; // Convert to seconds from start
            
            // Decay mouse influence over time (slower decay like working example)
            if (window.mouseInfluence) {
                window.mouseInfluence.x *= 0.98; // Slower decay
                window.mouseInfluence.y *= 0.98;
            }
            
            // Apply rotation to wrapper (parent) with varying rates and mouse influence
            // X-axis: varying rate with sine wave modulation + mouse Y influence (up/down mouse = tilt)
            const xRate = 0.2 + Math.sin(time * 0.1) * 0.15;
            const mouseY = window.mouseInfluence ? window.mouseInfluence.y : 0;
            wrapper.rotation.x += xRate * 0.02 + mouseY * 0.05; // Mouse Y affects X rotation
            
            // Y-axis: varying rate with cosine wave modulation + mouse X influence (left/right mouse = turn)
            const yRate = 0.3 + Math.cos(time * 0.08) * 0.2;
            const mouseX = window.mouseInfluence ? window.mouseInfluence.x : 0;
            wrapper.rotation.y += yRate * 0.02 + mouseX * 0.05; // Mouse X affects Y rotation
            
            // Z-axis: varying rate with sine wave modulation at different frequency (no mouse control)
            const zRate = 0.15 + Math.sin(time * 0.12) * 0.1;
            wrapper.rotation.z += zRate * 0.02;
            
            // Add scroll spin to Y rotation (upward spin)
            wrapper.rotation.y += getScrollSpinVelocity();
            
            // Floating animation - gentle up and down movement
            // Scale amplitude based on current mesh scale for consistent visual effect
            const currentScale = wrapper.scale.x; // Use X scale as reference
            const scaledAmplitude = MODEL_CONFIG.floatAmplitude * currentScale;
            const floatOffset = Math.sin(time * MODEL_CONFIG.floatSpeed) * scaledAmplitude;
            
            // Apply floating movement - works with both static and scroll animation
            if (wrapper.userData.targetY !== undefined) {
                // Scroll animation active - add floating offset to target Y position
                wrapper.position.y = wrapper.userData.targetY + floatOffset;
            } else {
                // No scroll animation - use base position with floating
                const startPos = calculateStartPosition();
                wrapper.position.y = startPos.y + floatOffset;
            }
        }
    
    // Glass refraction rendering with temporal plane and sphere visibility control
    if (mesh) {
        
        // Temporarily make background plane and sphere visible for render target sampling
        showBackgroundPlane();
        
        // Find sphere in scene for render target sampling
        let whiteSphere = null;
        scene.traverse((object) => {
            if (object.isMesh && object.material && object.material.color && 
                object.material.color.getHexString() === 'ffffff') {
                whiteSphere = object;
            }
        });
        
        if (whiteSphere) {
            whiteSphere.visible = true;
            // console.log('Sphere made visible for render target');
        } else {
            // console.log('White sphere not found in scene');
        }
        
        mesh.visible = false;
        
        // Back side render
        renderer.setRenderTarget(backRenderTarget);
        renderer.render(scene, camera);
        
        mesh.material.uniforms.uTexture.value = backRenderTarget.texture;
        mesh.material.side = THREE.BackSide;
        
        mesh.visible = true;
        
        // Front side render
        renderer.setRenderTarget(mainRenderTarget);
        renderer.render(scene, camera);
        
        mesh.material.uniforms.uTexture.value = mainRenderTarget.texture;
        mesh.material.side = THREE.FrontSide;
        
        // Hide background plane and sphere again for final render
        hideBackgroundPlane();
        
        // Hide sphere for final render
        if (whiteSphere) {
            whiteSphere.visible = false; // Hide sphere but keep it for refraction
            // console.log('Sphere hidden for final render');
        }
        
        renderer.setRenderTarget(null);
    }
    
    renderer.render(scene, camera);
}

// Scroll spin tracking is now handled by controls/scrollTrigger.js

// Scroll animation functions are now handled by controls/scrollTrigger.js

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
    
    // Force texture update after everything is loaded
    setTimeout(() => {
        if (window.DEBUG && window.DEBUG.updatePlaneTexture) {
            window.DEBUG.updatePlaneTexture();
            // console.log('Forced texture update after DOM load');
        }
    }, 500); // Wait for all styles and layouts to be applied
}); 


// Check if DOM is ready, if not wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeNavigation();
    });
} else {
    initializeNavigation();
} 