// Animation Loop Module for NFTfi Marketing Site
// Handles the main animation loop and rendering

import * as THREE from 'three';
import { scene, camera, renderer, mainRenderTarget, backRenderTarget } from './init.js';
import { showBackgroundPlane, hideBackgroundPlane } from '../objects/backgroundPlane.js';
import { getScrollSpinVelocity } from '../controls/scrollTrigger.js';
import { calculateStartPosition } from '../utils/viewport.js';
import { ANIMATION_CONFIG, MODEL_CONFIG, SECTION4_PEBBLE_SPIN, SECTION4_PEBBLE_WOBBLE } from '../config/index.js';
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
    
    // Pebble per-frame rotation: continuous Y spin independent of scroll (when enabled)
    if (pebbleGroup && isPebbleReady && SECTION4_PEBBLE_SPIN?.enabled) {
        const degPerSecBase = SECTION4_PEBBLE_SPIN.degPerSecond ?? 24;
        // Allow a transient boost stored on userData that decays over time
        const now = Date.now() * 0.001;
        if (pebbleGroup.userData.spinBoostDegPerSec == null) pebbleGroup.userData.spinBoostDegPerSec = 0;
        const boost = pebbleGroup.userData.spinBoostDegPerSec;
        const degPerSec = degPerSecBase + boost;
        const radPerSec = degPerSec * Math.PI / 180;
        pebbleGroup.rotation.y += radPerSec * 0.016; // ~60fps
        // decay boost
        const decay = (SECTION4_PEBBLE_SPIN.boostDecayPerSecond ?? 1.2) * 0.016;
        pebbleGroup.userData.spinBoostDegPerSec = Math.max(0, boost - decay);
        // optional X wobble
        if (SECTION4_PEBBLE_WOBBLE?.enabled) {
            const amp = (SECTION4_PEBBLE_WOBBLE.xAmplitudeDeg ?? 3) * Math.PI / 180;
            const freq = SECTION4_PEBBLE_WOBBLE.xFrequencyHz ?? 0.2;
            pebbleGroup.rotation.x = Math.sin(now * Math.PI * 2 * freq) * amp;
        }
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
            
            // Find sphere by name for render target sampling (more robust than color match)
            const whiteSphere = scene.getObjectByName('whiteLightSphere');
            if (whiteSphere) {
                // Enable color contribution only for offscreen captures
                whiteSphere.visible = true;
                if (whiteSphere.material) {
                    whiteSphere.material.colorWrite = true;
                    whiteSphere.material.depthWrite = true;
                }
            }
            
           for (let i = 0; i < refractiveMeshes.length; i += 1) {
                const m = refractiveMeshes[i];
                if (!m || !m.material || !m.material.uniforms || !m.material.uniforms.uTexture) {
                    continue;
                }
                
                // Hide all refractive meshes during back capture
                for (let j = 0; j <  refractiveMeshes.length; j += 1) {
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
            
            // Restore background plane and disable sphere contribution for onscreen render
            hideBackgroundPlane();
            if (whiteSphere) {
                whiteSphere.visible = false;
                if (whiteSphere.material) {
                    whiteSphere.material.colorWrite = false;
                    whiteSphere.material.depthWrite = true; // keep depth behavior consistent if needed later
                }
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