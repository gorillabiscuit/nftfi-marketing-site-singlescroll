// Viewport Utility Module for NFTfi Marketing Site
// Handles world space coordinate calculations and viewport positioning

// Global reference to camera (will be set by main.js)
let camera;

// Configuration objects (will be passed from main.js)
let TARGET_CONFIG;
let MODEL_CONFIG;

// Initialize viewport utilities
export function initializeViewport(threeCamera, targetConfig, modelConfig) {
    camera = threeCamera;
    TARGET_CONFIG = targetConfig;
    MODEL_CONFIG = modelConfig;
}

// Convert world space coordinates to actual world positions
export function worldToPosition(worldX, worldY) {
    // Convert from -1 to 1 range to actual world coordinates
    const aspect = window.innerWidth / window.innerHeight;
    const fov = camera.fov * Math.PI / 180;
    const distance = Math.abs(camera.position.z);
    
    const actualWorldX = worldX * distance * Math.tan(fov/2) * aspect;
    const actualWorldY = worldY * distance * Math.tan(fov/2);
    
    return { x: actualWorldX, y: actualWorldY };
}

// Calculate target position using direct world coordinates
export function calculateTargetPosition() {
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
export function calculateStartPosition() {
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