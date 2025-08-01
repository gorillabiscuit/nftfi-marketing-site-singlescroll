// Main JavaScript file for NFTfi Marketing Site - Single Scroll
// Three.js scene with glass shader and scroll/mouse interactions

import * as THREE from 'three';
import { GLTFLoader } from './libs/GLTFLoader.js';
import { init as initThreeJS, onWindowResize as onThreeJSResize } from './core/init.js';
import vertexShader from './shaders/glass.vert.js';
import fragmentShader from './shaders/glass.frag.js';
import { loadLogoModel, mesh, wrapper, isModelReady } from './objects/logoModel.js';

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

// Initialize controls
function initializeControls() {
    // Accordion functionality
    initializeAccordion();
    
    // Light controls
    document.getElementById('lightX').addEventListener('input', updateLight);
    document.getElementById('lightY').addEventListener('input', updateLight);
    document.getElementById('lightZ').addEventListener('input', updateLight);
    
    // Material controls
    document.getElementById('diffuseness').addEventListener('input', updateMaterial);
    document.getElementById('shininess').addEventListener('input', updateMaterial);
    document.getElementById('fresnelPower').addEventListener('input', updateMaterial);
    
    // IOR controls
    document.getElementById('iorR').addEventListener('input', updateIOR);
    document.getElementById('iorY').addEventListener('input', updateIOR);
    document.getElementById('iorG').addEventListener('input', updateIOR);
    document.getElementById('iorC').addEventListener('input', updateIOR);
    document.getElementById('iorB').addEventListener('input', updateIOR);
    document.getElementById('iorP').addEventListener('input', updateIOR);
    
    // Effect controls
    document.getElementById('saturation').addEventListener('input', updateEffects);
    document.getElementById('chromaticAberration').addEventListener('input', updateEffects);
    document.getElementById('refraction').addEventListener('input', updateEffects);
    
    // Plane controls
    document.getElementById('planeX').addEventListener('input', updatePlane);
    document.getElementById('planeY').addEventListener('input', updatePlane);
    document.getElementById('planeZ').addEventListener('input', updatePlane);
    document.getElementById('planeScale').addEventListener('input', updatePlane);
    
    // Camera controls
    document.getElementById('cameraX').addEventListener('input', updateCamera);
    document.getElementById('cameraY').addEventListener('input', updateCamera);
    document.getElementById('cameraZ').addEventListener('input', updateCamera);
    document.getElementById('cameraFOV').addEventListener('input', updateCamera);
    
    // Sync UI with actual camera position
    if (camera) {
        // Set slider values to match camera position
        document.getElementById('cameraX').value = camera.position.x;
        document.getElementById('cameraY').value = camera.position.y;
        document.getElementById('cameraZ').value = camera.position.z;
        document.getElementById('cameraFOV').value = camera.fov; // Direct FOV value
        
        // Update display values
        updateCamera();
    }
}

// Initialize accordion functionality
function initializeAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', toggleAccordionSection);
    });
}

// Toggle accordion section
function toggleAccordionSection(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    const isExpanded = header.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        header.classList.remove('expanded');
        content.classList.remove('expanded');
    } else {
        // Expand
        header.classList.add('expanded');
        content.classList.add('expanded');
    }
}

function updateLight() {
    const x = parseFloat(document.getElementById('lightX').value);
    const y = parseFloat(document.getElementById('lightY').value);
    const z = parseFloat(document.getElementById('lightZ').value);
    
    document.getElementById('lightXValue').textContent = x.toFixed(1);
    document.getElementById('lightYValue').textContent = y.toFixed(1);
    document.getElementById('lightZValue').textContent = z.toFixed(1);
    
    if (uniforms && uniforms.uLight) {
        uniforms.uLight.value.set(x, y, z);
    }
}

function updateMaterial() {
    const diffuseness = parseFloat(document.getElementById('diffuseness').value);
    const shininess = parseFloat(document.getElementById('shininess').value);
    const fresnelPower = parseFloat(document.getElementById('fresnelPower').value);
    
    document.getElementById('diffusenessValue').textContent = diffuseness.toFixed(2);
    document.getElementById('shininessValue').textContent = shininess.toFixed(1);
    document.getElementById('fresnelPowerValue').textContent = fresnelPower.toFixed(1);
    
    if (uniforms) {
        if (uniforms.uDiffuseness) uniforms.uDiffuseness.value = diffuseness;
        if (uniforms.uShininess) uniforms.uShininess.value = shininess;
        if (uniforms.uFresnelPower) uniforms.uFresnelPower.value = fresnelPower;
    }
}

function updateIOR() {
    const iorR = parseFloat(document.getElementById('iorR').value);
    const iorY = parseFloat(document.getElementById('iorY').value);
    const iorG = parseFloat(document.getElementById('iorG').value);
    const iorC = parseFloat(document.getElementById('iorC').value);
    const iorB = parseFloat(document.getElementById('iorB').value);
    const iorP = parseFloat(document.getElementById('iorP').value);
    
    document.getElementById('iorRValue').textContent = iorR.toFixed(3);
    document.getElementById('iorYValue').textContent = iorY.toFixed(3);
    document.getElementById('iorGValue').textContent = iorG.toFixed(3);
    document.getElementById('iorCValue').textContent = iorC.toFixed(3);
    document.getElementById('iorBValue').textContent = iorB.toFixed(3);
    document.getElementById('iorPValue').textContent = iorP.toFixed(3);
    
    if (uniforms) {
        if (uniforms.uIorR) uniforms.uIorR.value = iorR;
        if (uniforms.uIorY) uniforms.uIorY.value = iorY;
        if (uniforms.uIorG) uniforms.uIorG.value = iorG;
        if (uniforms.uIorC) uniforms.uIorC.value = iorC;
        if (uniforms.uIorB) uniforms.uIorB.value = iorB;
        if (uniforms.uIorP) uniforms.uIorP.value = iorP;
    }
}

function updateEffects() {
    const saturation = parseFloat(document.getElementById('saturation').value);
    const chromaticAberration = parseFloat(document.getElementById('chromaticAberration').value);
    const refraction = parseFloat(document.getElementById('refraction').value);
    
    document.getElementById('saturationValue').textContent = saturation.toFixed(2);
    document.getElementById('chromaticAberrationValue').textContent = chromaticAberration.toFixed(2);
    document.getElementById('refractionValue').textContent = refraction.toFixed(2);
    
    if (uniforms) {
        if (uniforms.uSaturation) uniforms.uSaturation.value = saturation;
        if (uniforms.uChromaticAberration) uniforms.uChromaticAberration.value = chromaticAberration;
        if (uniforms.uRefractPower) uniforms.uRefractPower.value = refraction;
    }
}

function updatePlane() {
    const x = parseFloat(document.getElementById('planeX').value);
    const y = parseFloat(document.getElementById('planeY').value);
    const z = parseFloat(document.getElementById('planeZ').value);
    const scale = parseFloat(document.getElementById('planeScale').value);
    
    document.getElementById('planeXValue').textContent = x.toFixed(1);
    document.getElementById('planeYValue').textContent = y.toFixed(1);
    document.getElementById('planeZValue').textContent = z.toFixed(1);
    document.getElementById('planeScaleValue').textContent = scale.toFixed(1);
    
    // Update plane position and scale using direct reference
    if (backgroundPlane) {
        backgroundPlane.position.set(x, y, z);
        backgroundPlane.scale.setScalar(scale);
        
        // Update plane geometry dimensions
        const width = 20 * scale;
        const height = width * (591 / 1325);
        backgroundPlane.geometry.dispose();
        backgroundPlane.geometry = new THREE.PlaneGeometry(width, height);
    }
}

function updateCamera() {
    const x = parseFloat(document.getElementById('cameraX').value);
    const y = parseFloat(document.getElementById('cameraY').value);
    const z = parseFloat(document.getElementById('cameraZ').value);
    const fovSlider = parseFloat(document.getElementById('cameraFOV').value);
    
    document.getElementById('cameraXValue').textContent = x.toFixed(1);
    document.getElementById('cameraYValue').textContent = y.toFixed(1);
    document.getElementById('cameraZValue').textContent = z.toFixed(1);
    document.getElementById('cameraFOVValue').textContent = fovSlider.toFixed(0);
    
    // Update camera position and FOV
    if (camera) {
        // Update position
        camera.position.set(x, y, z);
        
        // FOV logic: slider value directly sets the FOV
        camera.fov = fovSlider;
        
        // Force projection matrix update
        camera.updateProjectionMatrix();
        
        // console.log('Camera updated:', {
        //     position: camera.position,
        //     fov: camera.fov,
        //     sliderValue: fovSlider,
        //     aspect: camera.aspect
        // });
    }
}

// Initialize controls when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Three.js to initialize
    setTimeout(() => {
        initializeControls();
        // Set initial plane position to -8.9
        updatePlane();
    }, 1000);
});

// Import GSAP and ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Scene variables
let scene, camera, renderer, canvas;
// Model variables imported from objects/logoModel.js
let mainRenderTarget, backRenderTarget;
let backgroundPlane; // Reference to background plane for render target control
let uniforms;
let mouseInfluence = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let startTime = Date.now(); // For time-based rotation calculations

// Scroll animation variables
let scrollTimeline;
let originalWrapperPosition = { x: 0, y: 0, z: 0 };
let originalWrapperScale = { x: 3, y: 3, z: 3 };

// Scroll spin tracking variables
let scrollSpinVelocity = 0;
let lastScrollDirection = 0;
let lastScrollTime = 0;

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
    
    // Create background geometry for refraction
    createBackgroundGeometry();
    
    // Load GLTF model
    loadLogoModel(scene, uniforms, calculateStartPosition, updatePlaneForViewport, setupScrollAnimation, resetScrollAnimation, originalWrapperPosition, originalWrapperScale, MODEL_CONFIG, scrollSpinVelocity, updateScrollSpin, updatePlaneTexture, captureHeroAsTexture, worldToPosition, calculateTargetPosition, TARGET_CONFIG);
    
    // Add event listeners
    addEventListeners();
}

// Capture hero div and create dynamic texture
function captureHeroAsTexture() {
    return new Promise((resolve, reject) => {
        const heroElement = document.querySelector('.hero');
        if (!heroElement) {
            reject(new Error('Hero element not found'));
            return;
        }
        
        // Wait for any pending layout calculations
        requestAnimationFrame(() => {
            // Capture the hero div using html2canvas
            html2canvas(heroElement, { 
                backgroundColor: null, // Transparent background
                scale: 2, // Higher resolution for better quality
                useCORS: true, // Allow cross-origin images
                allowTaint: true, // Allow tainted canvas
                logging: false, // Disable logging for performance
                width: heroElement.offsetWidth, // Use actual element width
                height: heroElement.offsetHeight, // Use actual element height
                scrollX: window.scrollX, // Account for scroll position
                scrollY: window.scrollY
            }).then(canvas => {
                // Create Three.js texture from canvas
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                
                // console.log('Hero captured successfully:', {
                //     canvasWidth: canvas.width,
                //     canvasHeight: canvas.height,
                //     elementWidth: heroElement.offsetWidth,
                //     elementHeight: heroElement.offsetHeight,
                //     texture: texture
                // });
                
                // Mark texture as ready and trigger mesh scale animation
                window.textureReady = true;
                if (window.wrapper) {
                    // Animate mesh scale from tiny to target scale
                    gsap.to(window.wrapper.scale, {
                        x: MODEL_CONFIG.startScale,
                        y: MODEL_CONFIG.startScale,
                        z: MODEL_CONFIG.startScale,
                        duration: 1.5,
                        ease: "power2.out",
                        onUpdate: () => {
                            // Ensure scale is applied
                            window.wrapper.scale.needsUpdate = true;
                        }
                    });
                }
                
                resolve(texture);
                    }).catch(error => {
            console.error('Error capturing hero:', error);
            
            // Even if texture fails, still scale up the mesh
            window.textureReady = true;
            if (window.wrapper) {
                gsap.to(window.wrapper.scale, {
                    x: MODEL_CONFIG.startScale,
                    y: MODEL_CONFIG.startScale,
                    z: MODEL_CONFIG.startScale,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
            
            reject(error);
        });
        });
    });
}

// Create background geometry for refraction effects
function createBackgroundGeometry() {
    const backgroundGroup = new THREE.Group();
    backgroundGroup.visible = true; // Make visible to see all objects
    
    // Background group is now empty - removed the four white icosahedrons
    scene.add(backgroundGroup);
    
    // Create plane geometry - exact GitHub dimensions
    const planeScale = 1; // GitHub default
    const width = 20 * planeScale; // 20 units
    const height = width * (591 / 1325); // 8.92 units based on 1325:591 ratio
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    
    // Create material with dynamic texture (will be updated)
    const planeMaterial = new THREE.MeshBasicMaterial({ 
        transparent: true,
        opacity: 0.8, // GitHub opacity
        side: THREE.DoubleSide
    });
    
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -10); // Position behind camera for invisibility
    
    // NEW: Make plane invisible to camera but still available for shader sampling
    plane.visible = false; // Invisible to camera
    plane.renderOrder = -1; // Render first (before the main mesh)
    
    scene.add(plane); // Add directly to scene, not to background group
    
    // Store reference for potential future use
    backgroundPlane = plane;
    
    // Capture hero and apply as texture with delay to ensure DOM is ready
    setTimeout(() => {
        captureHeroAsTexture().then(texture => {
            plane.material.map = texture;
            plane.material.needsUpdate = true;
                            // console.log('Dynamic texture applied to plane');
        }).catch(error => {
            console.error('Failed to apply dynamic texture, using fallback:', error);
            // Fallback to static texture if capture fails
            const textureLoader = new THREE.TextureLoader();
            const headerTexture = textureLoader.load('/images/header.png');
            plane.material.map = headerTexture;
            plane.material.needsUpdate = true;
        });
    }, 100); // Small delay to ensure DOM is fully rendered
    
    // Safety timeout to ensure mesh scales up even if html2canvas takes too long
    setTimeout(() => {
        if (!window.textureReady && window.wrapper) {
            window.textureReady = true;
            gsap.to(window.wrapper.scale, {
                x: MODEL_CONFIG.startScale,
                y: MODEL_CONFIG.startScale,
                z: MODEL_CONFIG.startScale,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    }, 3000); // 3 second safety timeout
    
    // Add white sphere at the same position as the plane
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true,
        opacity: 1
    });
    
    const whiteSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    whiteSphere.position.set(-11.15, 5.35, -7); // Same position as plane
    whiteSphere.scale.setScalar(1.25); // Make it visiblepro
    
    // Make sphere invisible to camera but available for shader sampling (like plane)
    whiteSphere.visible = false; // Visible for positioning reference
    whiteSphere.renderOrder = -2; // Render before plane
    
    scene.add(whiteSphere);
    
    // Store reference to sphere for potential future use
    if (!window.DEBUG) {
        window.DEBUG = {};
    }
    window.DEBUG.whiteSphere = whiteSphere;
    // console.log('Sphere added to DEBUG object:', whiteSphere);
}

// Load GLTF model
// Model loading logic moved to objects/logoModel.js


// Add event listeners
function addEventListeners() {
    // Mouse move handler with sophisticated tracking
    // Use window events since canvas has pointer-events: none
    window.addEventListener('mousemove', (e) => {
        // Initialize lastMousePos if it hasn't been set yet
        if (lastMousePos.x === 0 && lastMousePos.y === 0) {
            lastMousePos.x = e.clientX;
            lastMousePos.y = e.clientY;
            return;
        }
        
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;
        
        // Add mouse movement to influence (normalized to screen size)
        // Enhanced mouse influence calculation like the working example
        mouseInfluence.x += deltaX / window.innerWidth * 2.0;
        mouseInfluence.y += deltaY / window.innerHeight * 2.0;
        
        lastMousePos.x = e.clientX;
        lastMousePos.y = e.clientY;
    });
    
    // Window resize handler
    window.addEventListener('resize', onWindowResize);
}

// Calculate optimal plane position based on viewport
function calculatePlanePosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // X offset constant for easy tweaking
    const X_OFFSET = -4; // Adjust this value to move plane left/right
    
    // Calculate the center of the viewport in normalized coordinates (-1 to 1)
    const centerX = 0; // Center of viewport
    const centerY = 0; // Center of viewport
    
    // Convert viewport center to world coordinates
    // The plane should be positioned to match the visible content area
    let worldX = centerX * 10; // Scale factor for world coordinates
    let worldY = centerY * 10;
    const worldZ = -5; // Keep behind the camera
    
    // Apply X offset
    worldX += X_OFFSET;
    
    // Adjust based on viewport aspect ratio
    const aspectRatio = viewportWidth / viewportHeight;
    if (aspectRatio > 1) {
        // Wide screen - adjust X position
        worldX += (aspectRatio - 1) * 5; // Move plane right for wide screens
    } else {
        // Tall screen - adjust Y position
        worldY += (1 - aspectRatio) * 5; // Move plane up for tall screens
    }
    
    return { x: worldX, y: worldY, z: worldZ };
}

// Update plane position based on viewport
function updatePlaneForViewport() {
    if (backgroundPlane) {
        const position = calculatePlanePosition();
        backgroundPlane.position.set(position.x, position.y, position.z);
        
        // Update the UI controls to reflect the new position
        if (document.getElementById('planeX')) {
            document.getElementById('planeX').value = position.x;
            document.getElementById('planeXValue').textContent = position.x.toFixed(1);
        }
        if (document.getElementById('planeY')) {
            document.getElementById('planeY').value = position.y;
            document.getElementById('planeYValue').textContent = position.y.toFixed(1);
        }
        if (document.getElementById('planeZ')) {
            document.getElementById('planeZ').value = position.z;
            document.getElementById('planeZValue').textContent = position.z.toFixed(1);
        }
        
        // console.log('Plane position updated for viewport:', position);
    }
}

// Update plane texture with fresh hero capture
function updatePlaneTexture() {
    if (backgroundPlane) {
        captureHeroAsTexture().then(texture => {
            // Dispose old texture to prevent memory leaks
            if (backgroundPlane.material.map) {
                backgroundPlane.material.map.dispose();
            }
            
            backgroundPlane.material.map = texture;
            backgroundPlane.material.needsUpdate = true;
            // console.log('Plane texture updated with fresh hero capture');
        }).catch(error => {
            console.error('Failed to update plane texture:', error);
        });
    }
}

// Convert world space coordinates to actual world positions
function worldToPosition(worldX, worldY) {
    // Convert from -1 to 1 range to actual world coordinates
    const aspect = window.innerWidth / window.innerHeight;
    const fov = camera.fov * Math.PI / 180;
    const distance = Math.abs(camera.position.z);
    
    const actualWorldX = worldX * distance * Math.tan(fov/2) * aspect;
    const actualWorldY = worldY * distance * Math.tan(fov/2);
    
    return { x: actualWorldX, y: actualWorldY };
}

// Calculate target position using direct world coordinates
function calculateTargetPosition() {
    const worldPos = worldToPosition(TARGET_CONFIG.targetWorldX, TARGET_CONFIG.targetWorldY);
    
    // Apply scale factor based on current viewport
    const viewportScale = Math.min(window.innerWidth, window.innerHeight) / 1000; // Normalize to 1000px baseline
    const scaleFactor = Math.max(0.5, Math.min(1.5, viewportScale)); // Clamp between 0.5 and 1.5
    
    return {
        x: worldPos.x,
        y: worldPos.y,
        z: TARGET_CONFIG.targetWorldZ, // Use Z from TARGET_CONFIG
        scale: MODEL_CONFIG.targetScale * TARGET_CONFIG.scaleRatio * scaleFactor
    };
}

// Calculate starting position using direct world coordinates
function calculateStartPosition() {
    const worldPos = worldToPosition(TARGET_CONFIG.startWorldX, TARGET_CONFIG.startWorldY);
    
    // Apply scale factor based on current viewport
    const viewportScale = Math.min(window.innerWidth, window.innerHeight) / 1000; // Normalize to 1000px baseline
    const scaleFactor = Math.max(0.5, Math.min(1.5, viewportScale)); // Clamp between 0.5 and 1.5
    
    return {
        x: worldPos.x,
        y: worldPos.y,
        z: TARGET_CONFIG.startWorldZ // Use Z from TARGET_CONFIG
    };
}

// Debounced texture update function
let textureUpdateTimeout;
function debouncedTextureUpdate() {
    clearTimeout(textureUpdateTimeout);
    textureUpdateTimeout = setTimeout(() => {
        updatePlaneTexture();
    }, 250); // Wait 250ms after resize stops
}

// Window resize handler
function onWindowResize() {
    // Use modular resize handler
    onThreeJSResize();
    
    // Update plane position for new viewport
    updatePlaneForViewport();
    
    // Debounced texture update
    debouncedTextureUpdate();
}

    // Animation loop with proper parent-child rotation, mouse-controlled axes, and floating animation
    function animate() {
        requestAnimationFrame(animate);
        
        if (wrapper && isModelReady) {
            const time = (Date.now() - startTime) * 0.001; // Convert to seconds from start
            
            // Decay mouse influence over time (slower decay like working example)
            mouseInfluence.x *= 0.98; // Slower decay
            mouseInfluence.y *= 0.98;
            
            // Apply rotation to wrapper (parent) with varying rates and mouse influence
            // X-axis: varying rate with sine wave modulation + mouse Y influence (up/down mouse = tilt)
            const xRate = 0.2 + Math.sin(time * 0.1) * 0.15;
            wrapper.rotation.x += xRate * 0.02 + mouseInfluence.y * 0.05; // Mouse Y affects X rotation
            
            // Y-axis: varying rate with cosine wave modulation + mouse X influence (left/right mouse = turn)
            const yRate = 0.3 + Math.cos(time * 0.08) * 0.2;
            wrapper.rotation.y += yRate * 0.02 + mouseInfluence.x * 0.05; // Mouse X affects Y rotation
            
            // Z-axis: varying rate with sine wave modulation at different frequency (no mouse control)
            const zRate = 0.15 + Math.sin(time * 0.12) * 0.1;
            wrapper.rotation.z += zRate * 0.02;
            
            // Add scroll spin to Y rotation (upward spin)
            wrapper.rotation.y += scrollSpinVelocity;
            
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
        if (backgroundPlane) {
            backgroundPlane.visible = true;
        }
        
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
        if (backgroundPlane) {
            backgroundPlane.visible = false;
        }
        
        // Hide sphere for final render
        if (whiteSphere) {
            whiteSphere.visible = false; // Hide sphere but keep it for refraction
            // console.log('Sphere hidden for final render');
        }
        
        renderer.setRenderTarget(null);
    }
    
    renderer.render(scene, camera);
}

// Track scroll events for spin animation
function updateScrollSpin(direction) {
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

// Set up scroll-triggered animation
function setupScrollAnimation() {
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
    
        // Create scroll timeline
    scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".section[data-section='1']",
            start: "top top",
            end: "bottom top",
            scrub: MODEL_CONFIG.scrubDuration, // Smooth scrubbing
            onUpdate: (self) => {
                // Update Three.js wrapper position and scale based on scroll progress
                const progress = self.progress;
                
                // Track scroll direction for spin animation
                const scrollDirection = self.direction || 0;
                updateScrollSpin(scrollDirection);
                
                // Calculate dynamic target position based on current viewport
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
                    MODEL_CONFIG.startScale, 
                    dynamicTarget.scale, 
                    progress
                );
                wrapper.scale.setScalar(currentScale);
                
                // console.log('Scroll animation progress:', progress, 'Scale:', currentScale, 'Target:', dynamicTarget, 'Spin velocity:', scrollSpinVelocity);
            }
        }
    });
    
    // console.log('Scroll animation setup complete');
}

// Reset scroll animation to original position
function resetScrollAnimation() {
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
        // console.log('Scroll animation reset to original position');
    }
}

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