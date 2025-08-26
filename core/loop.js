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
import { pebbleMesh, pebbleGroup, isPebbleReady } from '../objects/pebbleModel.js';

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
        const xMouseGain = mouseY >= 0
            ? (ANIMATION_CONFIG.xRotationRate.mouseInfluenceDown != null ? ANIMATION_CONFIG.xRotationRate.mouseInfluenceDown : ANIMATION_CONFIG.xRotationRate.mouseInfluence)
            : (ANIMATION_CONFIG.xRotationRate.mouseInfluenceUp != null ? ANIMATION_CONFIG.xRotationRate.mouseInfluenceUp : ANIMATION_CONFIG.xRotationRate.mouseInfluence);
        wrapper.rotation.x += xRate * 0.02 + mouseY * xMouseGain;
        
        // Y-axis: varying rate with cosine wave modulation + mouse X influence (left/right mouse = turn)
        const yRate = ANIMATION_CONFIG.yRotationRate.base + Math.cos(time * ANIMATION_CONFIG.yRotationRate.frequency) * ANIMATION_CONFIG.yRotationRate.modulation;
        const mouseX = window.mouseInfluence ? window.mouseInfluence.x : 0;
        const yMouseGain = mouseX >= 0
            ? (ANIMATION_CONFIG.yRotationRate.mouseInfluenceRight != null ? ANIMATION_CONFIG.yRotationRate.mouseInfluenceRight : ANIMATION_CONFIG.yRotationRate.mouseInfluence)
            : (ANIMATION_CONFIG.yRotationRate.mouseInfluenceLeft != null ? ANIMATION_CONFIG.yRotationRate.mouseInfluenceLeft : ANIMATION_CONFIG.yRotationRate.mouseInfluence);
        wrapper.rotation.y += yRate * 0.02 + mouseX * yMouseGain;
        
        // Z-axis: varying rate with sine wave modulation at different frequency (no mouse control)
        const zRate = ANIMATION_CONFIG.zRotationRate.base + Math.sin(time * ANIMATION_CONFIG.zRotationRate.frequency) * ANIMATION_CONFIG.zRotationRate.modulation;
        wrapper.rotation.z += zRate * 0.02;
        
        // Add scroll spin to Y rotation (upward spin) only after texture/model reveal
        if (window.textureReady === true && wrapper.visible === true) {
            wrapper.rotation.y += getScrollSpinVelocity();
        }
        
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
    
    // Pebble rotation animation - gentle multi-axis rotation independent from wrapper
    if (pebbleGroup && isPebbleReady) {
        const time = (Date.now() - startTime) * 0.001;
        const xRatePebble = ANIMATION_CONFIG.xRotationRate.base * 0.6 + Math.sin(time * (ANIMATION_CONFIG.xRotationRate.frequency * 0.8)) * (ANIMATION_CONFIG.xRotationRate.modulation * 0.5);
        const yRatePebble = ANIMATION_CONFIG.yRotationRate.base * 0.7 + Math.cos(time * (ANIMATION_CONFIG.yRotationRate.frequency * 1.1)) * (ANIMATION_CONFIG.yRotationRate.modulation * 0.6);
        const zRatePebble = ANIMATION_CONFIG.zRotationRate.base * 0.8 + Math.sin(time * (ANIMATION_CONFIG.zRotationRate.frequency * 1.3)) * (ANIMATION_CONFIG.zRotationRate.modulation * 0.6);
        pebbleGroup.rotation.x += xRatePebble * 0.02;
        pebbleGroup.rotation.y += yRatePebble * 0.02;
        pebbleGroup.rotation.z += zRatePebble * 0.02;
    }
    
    // Glass refraction rendering with temporal plane and sphere visibility control
    {
        // Multi-mesh refraction capture: process each refractive mesh
        const refractiveMeshes = [];
        if (mesh) refractiveMeshes.push(mesh);
        if (pebbleMesh) refractiveMeshes.push(pebbleMesh);
        
        if (refractiveMeshes.length > 0) {
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
            }
            
            for (let i = 0; i < refractiveMeshes.length; i += 1) {
                const m = refractiveMeshes[i];
                if (!m || !m.material || !m.material.uniforms || !m.material.uniforms.uTexture) {
                    continue;
                }
                
                // Hide all refractive meshes during back capture
                for (let j = 0; j < refractiveMeshes.length; j += 1) {
                    const other = refractiveMeshes[j];
                    if (other) other.visible = false;
                }
                
                // Back side render
                renderer.setRenderTarget(backRenderTarget);
                renderer.render(scene, camera);
                m.material.uniforms.uTexture.value = backRenderTarget.texture;
                m.material.side = THREE.BackSide;
                
                // Front side render: show only current mesh
                m.visible = true;
                renderer.setRenderTarget(mainRenderTarget);
                renderer.render(scene, camera);
                m.material.uniforms.uTexture.value = mainRenderTarget.texture;
                m.material.side = THREE.FrontSide;
            }
            
            // Restore background plane and sphere
            hideBackgroundPlane();
            if (whiteSphere) {
                whiteSphere.visible = false;
            }
            renderer.setRenderTarget(null);
            
            // Ensure final render has all refractive meshes visible
            for (let k = 0; k < refractiveMeshes.length; k += 1) {
                const m = refractiveMeshes[k];
                if (m) m.visible = true;
            }
        }
    }
    
    // Render the scene
    renderer.render(scene, camera);
} 