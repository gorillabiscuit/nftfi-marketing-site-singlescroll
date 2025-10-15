import * as THREE from 'three';

// Global renderer references
export let renderer = null;
export let mainRenderTarget = null;
export let backRenderTarget = null;

/**
 * Create the Three.js renderer with proper settings
 */
export function createRenderer(canvas) {
    // Get canvas dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true, // Enable transparency
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent clear color
    
    // Set full viewport dimensions
    renderer.setSize(width, height);
    {
        const dpr = window.devicePixelRatio || 1;
        const isMobile = window.innerWidth <= 900;
        const targetPR = Math.min(dpr, isMobile ? 1.5 : 2);
        renderer.setPixelRatio(targetPR);
    }
    
    // Set clear color to transparent
    renderer.setClearColor(0x000000, 0);
    
    // Color management / tone mapping
    if (renderer.outputColorSpace !== undefined) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    if (renderer.toneMapping !== undefined) {
        renderer.toneMapping = THREE.NoToneMapping;
    }
    
    return renderer;
}

/**
 * Create render targets for refraction effects
 */
export function createRenderTargets() {
    // Create render targets with full window resolution like GitHub version
    mainRenderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );
    backRenderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );
    
    return { mainRenderTarget, backRenderTarget };
}

/**
 * Handle window resize for renderer and render targets
 */
export function onWindowResize() {
    if (renderer) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        renderer.setSize(width, height);
        const dpr = window.devicePixelRatio || 1;
        const isMobile = window.innerWidth <= 900;
        const targetPR = Math.min(dpr, isMobile ? 1.5 : 2);
        renderer.setPixelRatio(targetPR);
    }
    
    // Update render targets
    if (mainRenderTarget && backRenderTarget) {
        const width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
        const height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
        
        mainRenderTarget.setSize(width, height);
        backRenderTarget.setSize(width, height);
    }
}

/**
 * Dispose renderer and render targets
 */
export function dispose() {
    if (renderer) {
        renderer.dispose();
    }
    
    if (mainRenderTarget) {
        mainRenderTarget.dispose();
    }
    
    if (backRenderTarget) {
        backRenderTarget.dispose();
    }
} 