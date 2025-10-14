import * as THREE from 'three';
import { createScene } from './scene.js';
import { createCamera } from './camera.js';
import { createRenderer, createRenderTargets } from './renderer.js';
import { SHADER_DEFAULTS } from '../config/index.js';

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
    
    // Make camera globally accessible for viewport calculations
    window.camera = camera;
    
    // Create renderer
    renderer = createRenderer(canvas);
    
    // Create render targets
    const renderTargets = createRenderTargets();
    mainRenderTarget = renderTargets.mainRenderTarget;
    backRenderTarget = renderTargets.backRenderTarget;
    
    // Initialize uniforms using defaults from config
    uniforms = {
        uIorR: { value: SHADER_DEFAULTS.uIorR },
        uIorY: { value: SHADER_DEFAULTS.uIorY },
        uIorG: { value: SHADER_DEFAULTS.uIorG },
        uIorC: { value: SHADER_DEFAULTS.uIorC },
        uIorB: { value: SHADER_DEFAULTS.uIorB },
        uIorP: { value: SHADER_DEFAULTS.uIorP },
        uSaturation: { value: SHADER_DEFAULTS.uSaturation },
        uChromaticAberration: { value: SHADER_DEFAULTS.uChromaticAberration },
        uRefractPower: { value: SHADER_DEFAULTS.uRefractPower },
        uFresnelPower: { value: SHADER_DEFAULTS.uFresnelPower },
        uShininess: { value: SHADER_DEFAULTS.uShininess },
        uDiffuseness: { value: SHADER_DEFAULTS.uDiffuseness },
        uLight: { value: SHADER_DEFAULTS.uLight.clone() },
        winResolution: { value: SHADER_DEFAULTS.winResolution.clone() },
        uTexture: { value: SHADER_DEFAULTS.uTexture }
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