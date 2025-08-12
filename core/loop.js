// Animation Loop Module for NFTfi Marketing Site
// Handles the main animation loop and rendering

import * as THREE from 'three';
import { scene, camera, renderer, mainRenderTarget, backRenderTarget } from './init.js';
import { showBackgroundPlane, hideBackgroundPlane } from '../objects/backgroundPlane.js';
import { getScrollSpinVelocity } from '../controls/scrollTrigger.js';
import { calculateStartPosition } from '../utils/viewport.js';
import { ANIMATION_CONFIG, MODEL_CONFIG } from '../config.js';
// NEW: Import ScrollSmoother performance monitoring
import { startPerformanceFrame, recordScrollEvent } from '../controls/scrollSynchronizer.js';

// Global references (will be set by main.js)
let mesh, wrapper, isModelReady;
let startTime;

// Initialize animation loop
export function initializeAnimationLoop(meshInstance, wrapperInstance, isModelReadyFlag) {
    mesh = meshInstance;
    wrapper = wrapperInstance;
    isModelReady = isModelReadyFlag;
    startTime = Date.now();
}

// Main animation loop
export function animate() {
    requestAnimationFrame(animate);

    // NEW: Start performance monitoring for this frame
    startPerformanceFrame();

    // ANIMATION LOOP RE-ENABLED
    if (wrapper && isModelReady) {
        const time = (Date.now() - startTime) * 0.001; // Convert to seconds from start
        
        // Decay mouse influence over time (slower decay like working example)
        if (window.mouseInfluence) {
            window.mouseInfluence.x *= ANIMATION_CONFIG.mouseDecayRate;
            window.mouseInfluence.y *= ANIMATION_CONFIG.mouseDecayRate;
        }
        
        // Apply rotation to wrapper (parent) with varying rates and mouse influence
        // X-axis: varying rate with sine wave modulation + mouse Y influence (up/down mouse = tilt)
        const xRate = ANIMATION_CONFIG.xRotationRate.base + Math.sin(time * ANIMATION_CONFIG.xRotationRate.frequency) * ANIMATION_CONFIG.xRotationRate.modulation;
        const mouseY = window.mouseInfluence ? window.mouseInfluence.y : 0;
        wrapper.rotation.x += xRate * 0.02 + mouseY * ANIMATION_CONFIG.xRotationRate.mouseInfluence;
        
        // Y-axis: varying rate with cosine wave modulation + mouse X influence (left/right mouse = turn)
        const yRate = ANIMATION_CONFIG.yRotationRate.base + Math.cos(time * ANIMATION_CONFIG.yRotationRate.frequency) * ANIMATION_CONFIG.yRotationRate.modulation;
        const mouseX = window.mouseInfluence ? window.mouseInfluence.x : 0;
        wrapper.rotation.y += yRate * 0.02 + mouseX * ANIMATION_CONFIG.yRotationRate.mouseInfluence;
        
        // Z-axis: varying rate with sine wave modulation at different frequency (no mouse control)
        const zRate = ANIMATION_CONFIG.zRotationRate.base + Math.sin(time * ANIMATION_CONFIG.zRotationRate.frequency) * ANIMATION_CONFIG.zRotationRate.modulation;
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
            // Use dynamic start position that adapts to current breakpoint
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
    
    // Render the scene
    renderer.render(scene, camera);
} 