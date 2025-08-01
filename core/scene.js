import * as THREE from 'three';

// Global scene reference
export let scene = null;

// Lighting references
export let ambientLight = null;
export let directionalLight = null;
export let fillLight = null;
export let rimLight = null;
export let pointLight = null;

/**
 * Create the Three.js scene with comprehensive lighting setup
 */
export function createScene() {
    // Create scene
    scene = new THREE.Scene();
    // Set transparent background instead of black
    scene.background = null;
    
    // Add comprehensive lighting setup
    // Ambient light for overall illumination
    ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Main directional light
    directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Secondary directional light for fill
    fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, 5);
    scene.add(fillLight);
    
    // Rim light for edge highlighting
    rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, -5, 5);
    scene.add(rimLight);
    
    // Point light for dynamic highlights
    pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);
    
    return scene;
}

/**
 * Update lighting based on UI controls
 */
export function updateLighting(lightX, lightY, lightZ) {
    if (directionalLight) {
        directionalLight.position.set(lightX, lightY, lightZ);
    }
} 