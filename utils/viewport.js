// Viewport Utility Module for NFTfi Marketing Site
// Handles world space coordinate calculations and viewport positioning

import { TARGET_CONFIG, MODEL_CONFIG } from '../config.js';
import { getCurrentAnimationState, getAnimationState } from './breakpointManager.js';

// Global reference to camera (will be set by main.js)
let camera;

// Initialize viewport utilities
export function initializeViewport(threeCamera) {
    camera = threeCamera;
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

// Calculate target position using current animation state
export function calculateTargetPosition() {
    const currentState = getCurrentAnimationState();
    const animationState = getAnimationState(currentState);
    
    // Use animation state target values instead of hardcoded TARGET_CONFIG
    const worldPos = worldToPosition(animationState.target.x, animationState.target.y);
    
    return {
        x: worldPos.x,
        y: worldPos.y,
        z: animationState.target.z, // Use Z from animation state
        scale: animationState.target.scale // Use scale directly without scaleFactor
    };
}

// Calculate starting position using current animation state
export function calculateStartPosition() {
    const currentState = getCurrentAnimationState();
    const animationState = getAnimationState(currentState);
    
    // Use animation state start values instead of hardcoded TARGET_CONFIG
    const worldPos = worldToPosition(animationState.start.x, animationState.start.y);
    
    return {
        x: worldPos.x,
        y: worldPos.y,
        z: animationState.start.z, // Use Z from animation state
        scale: animationState.start.scale // Use scale directly without scaleFactor
    };
} 