import * as THREE from 'three';

// Global camera reference
export let camera = null;

/**
 * Create the Three.js camera with proper settings
 */
export function createCamera() {
    // Get canvas dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create camera with full viewport aspect ratio
    camera = new THREE.PerspectiveCamera(18, width / height, 0.1, 1000); // FOV 18, full viewport aspect
    camera.position.set(0, 0, 33.6); // Match UI defaults
    
    return camera;
}

/**
 * Update camera position based on UI controls
 */
export function updateCameraPosition(x, y, z) {
    if (camera) {
        camera.position.set(x, y, z);
    }
}

/**
 * Update camera field of view
 */
export function updateCameraFOV(fov) {
    if (camera) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
    }
}

/**
 * Handle window resize for camera
 */
export function onWindowResize() {
    if (camera) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
} 