// Configuration Constants for NFTfi Marketing Site
// Centralized configuration for all application settings

import * as THREE from 'three';

// Target position configuration for scroll animations
export const TARGET_CONFIG = {
    // Target position in world coordinates (-1 to 1 range)
    targetWorldX: -0.92,    // 80% left in world space
    targetWorldY: 0.84,     // 50% up in world space
    targetWorldZ: 0,        // Z depth
    scaleRatio: 1.2,        // Scale ratio
    
    // Starting position in world coordinates (-1 to 1 range)
    startWorldX: 0.55,      // 80% right in world space
    startWorldY: -0.15,     // Center vertically
    startWorldZ: 0          // Z depth
};

// Animation states for different breakpoints
// Each breakpoint can have different start and target positions/scales
export const ANIMATION_STATES = {
    mobile: {
        start: { x: 0.8, y: -0.2, z: 0, scale: 100.5 },
        target: { x: -0.8, y: 0.6, z: 0, scale: 0.4 }
    },
    tablet: {
        start: { x: 0.6, y: -0.1, z: 0, scale: 2.8 },
        target: { x: -0.7, y: 0.7, z: 0, scale: 0.3 }
    },
    desktop: {
        start: { x: 0.55, y: -0.15, z: 0, scale: 3.0 },
        target: { x: -0.92, y: 0.84, z: 0, scale: 0.265 }
    }
};

// Model animation and behavior configuration
export const MODEL_CONFIG = {
    // Scale configuration
    startScale: 3.0,        // Starting scale
    targetScale: 0.265,     // Target scale (much smaller)
    
    // Animation timing
    scrubDuration: 1,       // Smooth transition duration
    
    // Floating animation settings
    floatAmplitude: 0.3,    // Small amplitude for subtle movement
    floatSpeed: 0.8,        // Slow, gentle speed
    
    // Scroll spin settings
    spinIntensity: 0.05,    // How much spin per scroll unit
    spinDecay: 0.1          // How quickly spin decays (0.95 = slow decay)
};

// Shader uniform default values
export const SHADER_DEFAULTS = {
    // Index of Refraction (IOR) values for different colors
    uIorR: 1.15,            // Red channel IOR
    uIorY: 1.16,            // Yellow channel IOR
    uIorG: 1.18,            // Green channel IOR
    uIorC: 1.22,            // Cyan channel IOR
    uIorB: 1.22,            // Blue channel IOR
    uIorP: 1.22,            // Purple channel IOR
    
    // Post-processing effects
    uSaturation: 1.01,      // Color saturation
    uChromaticAberration: 0.28, // Chromatic aberration intensity
    uRefractPower: 0.5,     // Refraction power
    
    // Material properties
    uFresnelPower: 12.7,    // Fresnel effect power
    uShininess: 28.2,       // Material shininess
    uDiffuseness: 0.07,     // Material diffuseness
    
    // Lighting
    uLight: new THREE.Vector3(-1.3, 1.5, -0.6), // Light position
    
    // Resolution (will be updated dynamically)
    winResolution: new THREE.Vector2(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    ),
    
    // Texture (will be set dynamically)
    uTexture: null
};

// Camera configuration
export const CAMERA_CONFIG = {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: {
        x: 0,
        y: 0,
        z: 5
    }
};

// Renderer configuration
export const RENDERER_CONFIG = {
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
};

// Animation configuration
export const ANIMATION_CONFIG = {
    // Mouse influence decay
    mouseDecayRate: 0.98,
    
    // Rotation rates
    xRotationRate: {
        base: 0.2,
        modulation: 0.15,
        frequency: 0.1,
        mouseInfluence: 0.05
    },
    yRotationRate: {
        base: 0.3,
        modulation: 0.2,
        frequency: 0.08,
        mouseInfluence: 0.05
    },
    zRotationRate: {
        base: 0.15,
        modulation: 0.1,
        frequency: 0.12,
        mouseInfluence: 0
    }
};

// Plane configuration for background
export const PLANE_CONFIG = {
    scale: 1,
    width: 20,
    height: 20 * (591 / 1325), // Based on 1325:591 ratio
    position: {
        x: 0,
        y: 0,
        z: -10
    }
}; 