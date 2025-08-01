import * as THREE from 'three';
import { createScene } from './scene.js';
import { createCamera } from './camera.js';
import { createRenderer, createRenderTargets } from './renderer.js';

// Global references
export let scene = null;
export let camera = null;
export let renderer = null;
export let mainRenderTarget = null;
export let backRenderTarget = null;

// Shader uniforms
export let uniforms = null;

/**
 * Initialize all Three.js components
 */
export function init() {
    // Get canvas
    const canvas = document.getElementById('three-canvas');
    
    // Create scene and lighting
    scene = createScene();
    
    // Create camera
    camera = createCamera();
    
    // Create renderer
    renderer = createRenderer(canvas);
    
    // Create render targets
    const renderTargets = createRenderTargets();
    mainRenderTarget = renderTargets.mainRenderTarget;
    backRenderTarget = renderTargets.backRenderTarget;
    
    // Initialize uniforms
    uniforms = {
        uIorR: { value: 1.15 },
        uIorY: { value: 1.16 },
        uIorG: { value: 1.18 },
        uIorC: { value: 1.22 },
        uIorB: { value: 1.22 },
        uIorP: { value: 1.22 },
        uSaturation: { value: 1.01 },
        uChromaticAberration: { value: 0.28 },
        uRefractPower: { value: 0.5 },
        uFresnelPower: { value: 12.7 },
        uShininess: { value: 28.2 },
        uDiffuseness: { value: 0.07 },
        uLight: { value: new THREE.Vector3(-1.3, 1.5, -0.6) },
        winResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(Math.min(window.devicePixelRatio, 2)) },
        uTexture: { value: null }
    };
    
    return {
        scene,
        camera,
        renderer,
        mainRenderTarget,
        backRenderTarget,
        uniforms
    };
}

/**
 * Handle window resize for all components
 */
export function onWindowResize() {
    // Update camera
    if (camera) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    
    // Update renderer
    if (renderer) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    // Update render targets
    if (mainRenderTarget && backRenderTarget) {
        const width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
        const height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
        
        mainRenderTarget.setSize(width, height);
        backRenderTarget.setSize(width, height);
    }
    
    // Update uniforms
    if (uniforms && uniforms.winResolution) {
        uniforms.winResolution.value.set(
            window.innerWidth * Math.min(window.devicePixelRatio, 2),
            window.innerHeight * Math.min(window.devicePixelRatio, 2)
        );
    }
} 