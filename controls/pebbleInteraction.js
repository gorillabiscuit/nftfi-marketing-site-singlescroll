// Pebble Interaction Controls
// Handles mouse hover and touch interactions for Section 4 pebbles

import { gsap } from 'gsap';
import * as THREE from 'three';

// Track which pebbles are currently animating to prevent overlapping animations
const animatingPebbles = new Set();

// Raycaster for detecting mouse/touch intersections with 3D objects
let raycaster = null;
let mouse = new THREE.Vector2();
let camera = null;
let pebbleGroups = [];
let currentHoveredPebble = null;

// Set mouse to an off-screen position initially
mouse.x = -100000;
mouse.y = -100000;

/**
 * Initialize pebble interaction system
 * @param {THREE.Camera} sceneCamera - The Three.js camera
 * @param {Array} pebbles - Array of pebble group objects to make interactive
 */
export function initPebbleInteraction(sceneCamera, pebbles) {
    camera = sceneCamera;
    pebbleGroups = pebbles.filter(p => p !== null && p !== undefined);
    
    if (!raycaster) {
        raycaster = new THREE.Raycaster();
    }
    
    // Set up event listeners
    setupEventListeners();
}

/**
 * Update function to be called in the animation loop
 * This checks for intersections and updates hover state
 */
export function updatePebbleInteraction() {
    if (!camera || !raycaster || pebbleGroups.length === 0) {
        return;
    }
    
    // Update raycaster with current mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Check each pebble group for intersections
    let hoveredPebble = null;
    
    for (let i = 0; i < pebbleGroups.length; i++) {
        const pebbleGroup = pebbleGroups[i];
        if (!pebbleGroup || !pebbleGroup.visible) {
            continue;
        }
        
        // Get all meshes in the pebble group
        const meshes = [];
        pebbleGroup.traverse((child) => {
            if (child.isMesh) {
                meshes.push(child);
            }
        });
        
        // Check for intersections
        const intersects = raycaster.intersectObjects(meshes, false);
        if (intersects.length > 0) {
            hoveredPebble = pebbleGroup;
            break; // Found intersection, no need to check other pebbles
        }
    }
    
    // Update cursor based on hover state
    const canvas = document.getElementById('three-canvas');
    if (hoveredPebble && canvas) {
        canvas.style.cursor = 'pointer';
    } else if (canvas) {
        canvas.style.cursor = 'default';
    }
    
    // Trigger spin animation on hover (when entering hover state)
    if (hoveredPebble && hoveredPebble !== currentHoveredPebble) {
        spinPebble(hoveredPebble);
    }
    
    // Track hover state changes
    currentHoveredPebble = hoveredPebble;
}

/**
 * Set up mouse and touch event listeners
 */
function setupEventListeners() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) {
        return;
    }
    
    // Mouse events for desktop - attach to WINDOW, not canvas
    // This ensures we capture all mouse movement across the page
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onMouseClick);
    
    // Touch events for mobile/tablet
    window.addEventListener('touchstart', onTouchStart, { passive: false });
}

/**
 * Update mouse position for raycasting
 */
function onMouseMove(event) {
    if (!camera) return;
    
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    // X: left edge = -1, right edge = +1
    // Y: top edge = +1, bottom edge = -1 (inverted for Three.js)
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

/**
 * Handle mouse click on pebbles
 */
function onMouseClick(event) {
    // Use the currently hovered pebble from the update loop
    if (currentHoveredPebble) {
        spinPebble(currentHoveredPebble);
    }
}

/**
 * Handle touch events for mobile/tablet
 */
function onTouchStart(event) {
    if (!camera || event.touches.length === 0) return;
    
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    
    // Update mouse position for raycasting
    mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Use the currently hovered pebble from the update loop
    // Note: We need to wait a frame for the update loop to process the new mouse position
    setTimeout(() => {
        if (currentHoveredPebble) {
            event.preventDefault(); // Prevent scrolling when tapping pebble
            spinPebble(currentHoveredPebble);
        }
    }, 0);
}

/**
 * Spin a pebble 360 degrees and return to original position
 * @param {THREE.Group} pebbleGroup - The pebble group to spin
 */
function spinPebble(pebbleGroup) {
    if (!pebbleGroup || animatingPebbles.has(pebbleGroup)) {
        return; // Already animating or invalid
    }
    
    // Mark as animating
    animatingPebbles.add(pebbleGroup);
    
    // Store original rotation
    const originalRotationY = pebbleGroup.rotation.y;
    
    // Create spin animation
    gsap.to(pebbleGroup.rotation, {
        y: originalRotationY + Math.PI * 2, // Full 360-degree rotation
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
            // Return to original rotation (normalize to prevent rotation drift)
            pebbleGroup.rotation.y = originalRotationY;
            animatingPebbles.delete(pebbleGroup);
        }
    });
    
    // Add a subtle scale pulse for extra feedback
    const originalScale = pebbleGroup.scale.x;
    gsap.timeline()
        .to(pebbleGroup.scale, {
            x: originalScale * 1.1,
            y: originalScale * 1.1,
            z: originalScale * 1.1,
            duration: 0.2,
            ease: 'power2.out'
        })
        .to(pebbleGroup.scale, {
            x: originalScale,
            y: originalScale,
            z: originalScale,
            duration: 0.6,
            ease: 'power2.inOut'
        });
}

/**
 * Clean up event listeners (call when destroying the interaction system)
 */
export function cleanupPebbleInteraction() {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('click', onMouseClick);
    window.removeEventListener('touchstart', onTouchStart);
    
    pebbleGroups = [];
    animatingPebbles.clear();
}

