// Animation Loop Module for NFTfi Marketing Site
// Handles the main animation loop and rendering

import * as THREE from 'three';
import { scene, camera, renderer, mainRenderTarget, backRenderTarget } from './init.js';
import { showBackgroundPlane, hideBackgroundPlane } from '../objects/backgroundPlane.js';
import { getScrollSpinVelocity } from '../controls/scrollTrigger.js';
import { calculateStartPosition } from '../utils/viewport.js';

// Global references (will be set by main.js)
let mesh, wrapper, isModelReady;
let MODEL_CONFIG;
let startTime;

// Initialize animation loop
export function initializeAnimationLoop(meshInstance, wrapperInstance, isModelReadyFlag, modelConfig) {
    mesh = meshInstance;
    wrapper = wrapperInstance;
    isModelReady = isModelReadyFlag;
    MODEL_CONFIG = modelConfig;
    startTime = Date.now();
}

// Main animation loop
export function animate() {
    requestAnimationFrame(animate);
    
    if (wrapper && isModelReady) {
        const time = (Date.now() - startTime) * 0.001; // Convert to seconds from start
        
        // Decay mouse influence over time (slower decay like working example)
        if (window.mouseInfluence) {
            window.mouseInfluence.x *= 0.98; // Slower decay
            window.mouseInfluence.y *= 0.98;
        }
        
        // Apply rotation to wrapper (parent) with varying rates and mouse influence
        // X-axis: varying rate with sine wave modulation + mouse Y influence (up/down mouse = tilt)
        const xRate = 0.2 + Math.sin(time * 0.1) * 0.15;
        const mouseY = window.mouseInfluence ? window.mouseInfluence.y : 0;
        wrapper.rotation.x += xRate * 0.02 + mouseY * 0.05; // Mouse Y affects X rotation
        
        // Y-axis: varying rate with cosine wave modulation + mouse X influence (left/right mouse = turn)
        const yRate = 0.3 + Math.cos(time * 0.08) * 0.2;
        const mouseX = window.mouseInfluence ? window.mouseInfluence.x : 0;
        wrapper.rotation.y += yRate * 0.02 + mouseX * 0.05; // Mouse X affects Y rotation
        
        // Z-axis: varying rate with sine wave modulation at different frequency (no mouse control)
        const zRate = 0.15 + Math.sin(time * 0.12) * 0.1;
        wrapper.rotation.z += zRate * 0.02;
        
        // Add scroll spin to Y rotation (upward spin)
        wrapper.rotation.y += getScrollSpinVelocity();
        
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
        showBackgroundPlane();
        
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
        hideBackgroundPlane();
        
        // Hide sphere for final render
        if (whiteSphere) {
            whiteSphere.visible = false; // Hide sphere but keep it for refraction
            // console.log('Sphere hidden for final render');
        }
        
        renderer.setRenderTarget(null);
    }
    
    renderer.render(scene, camera);
} 