import * as THREE from 'three';
import { GLTFLoader } from '../libs/GLTFLoader.js';
// Import model via Vite asset handling
import roundPebbleUrl from '../models/pebble-plane.glb?url';
// Import default video (Art.mp4 for Digital Art category)
import videoUrl from '../images/Art.mp4?url';

export let roundPebbleMesh = null;
export let roundPebbleGroup = null;

/**
 * Load the round pebble GLB, give it a blue material, and attach to the given parent group.
 * If parentGroup is provided (expected: pebbleGroup), the round pebble inherits its transforms.
 */
export function loadRoundPebbleModel(parentGroup, scene) {
    const loader = new GLTFLoader();

    loader.load(roundPebbleUrl, (gltf) => {
        // Compute bounds and center the model so pivots align with parent origin
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Create HTMLVideoElement and THREE.VideoTexture
        const video = document.createElement('video');
        try { video.src = videoUrl; } catch (_) { void 0; }
        video.crossOrigin = 'anonymous';
        video.muted = true; // Required for autoplay on mobile
        video.loop = true;
        video.playsInline = true;

        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.generateMipmaps = false;

        // Additive so black is transparent-ish
        const planeMaterial = new THREE.MeshStandardMaterial({
            map: videoTexture,
            metalness: 0.2,
            roughness: 0.5,
            side: THREE.DoubleSide,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                roundPebbleMesh = child;
                if (child.geometry) {
                    child.geometry.computeVertexNormals();
                }
                child.material = planeMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Group wrapper for alignment and future control
        roundPebbleGroup = new THREE.Group();
        // Recenter original to origin so it matches parent's origin
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        // Rotate the video plane by 90° around X (flip between facing up vs facing camera)
        // Try X vs Y to correct orientation:
        //  - rotation.x = ±Math.PI/2 tilts the plane forward/backward
        //  - rotation.y = ±Math.PI/2 spins it left/right
        // Use radians; tweak sign (+/-) if mirrored.
        try { gltf.scene.rotation.x = -Math.PI / 2; } catch (_) { void 0; }
        roundPebbleGroup.add(gltf.scene);
        roundPebbleGroup.position.set(0, 0, 0);
        roundPebbleGroup.scale.setScalar(1);
        roundPebbleGroup.visible = true;

        if (parentGroup && parentGroup.add) {
            parentGroup.add(roundPebbleGroup);
        } else if (scene && scene.add) {
            // Fallback: add to scene if parentGroup not available
            scene.add(roundPebbleGroup);
        }

        // Expose for debugging
        window.ROUND_PEBBLE = { roundPebbleGroup, roundPebbleMesh, gltf: gltf.scene };

        // Attempt autoplay; if blocked, user interaction will be required
        const tryPlay = () => { try { video.play(); } catch (_) { void 0; } };
        if (video.readyState >= 2) { tryPlay(); }
        else { video.addEventListener('canplay', tryPlay, { once: true }); }
    }, undefined, (error) => {
        console.error('Error loading round pebble model:', error);
    });
}


