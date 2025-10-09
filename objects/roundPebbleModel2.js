import * as THREE from 'three';
import { GLTFLoader } from '../libs/GLTFLoader.js';
// Import model via Vite asset handling
import roundPebbleUrl from '../models/plane_45.glb?url';
// Import PFP video for second pebble
import videoUrl from '../images/PFP.mp4?url';

export let roundPebbleMesh2 = null;
export let roundPebbleGroup2 = null;

/**
 * Load the second round pebble GLB with PFP video, and attach to the given parent group.
 * If parentGroup is provided (expected: pebbleGroup2), the round pebble inherits its transforms.
 */
export function loadRoundPebbleModel2(parentGroup, scene) {
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
        
        // Rotate texture by 45 degrees (π/4 radians)
        videoTexture.rotation = Math.PI / 4; // 45 degrees
        videoTexture.center.set(0.5, 0.5); // Rotate around center

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
                roundPebbleMesh2 = child;
                if (child.geometry) {
                    child.geometry.computeVertexNormals();
                }
                child.material = planeMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Group wrapper for alignment and future control
        roundPebbleGroup2 = new THREE.Group();
        
        // Debug: Log the bounding box info
        console.log('[RoundPebble2] Bounding box info:', {
            center: center,
            size: box.getSize(new THREE.Vector3())
        });
        
        // Recenter original to origin so it matches parent's origin
        // The plane_45.glb might have a different center due to the 45° rotation
        // For now, let's try centering it at origin (0, 0, 0) to see if that helps
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        
        // Rotate the plane to face the camera properly
        gltf.scene.rotation.x = -Math.PI / 2; // Rotate to face camera
        // gltf.scene.rotation.y = Math.PI / 2;  // 90 degrees on Y axis to make it parallel to pebble
        roundPebbleGroup2.add(gltf.scene);
        roundPebbleGroup2.position.set(0, 0, 0);
        // Remove group rotation since we're rotating the plane directly
        roundPebbleGroup2.scale.setScalar(1);
        roundPebbleGroup2.visible = true;
        
        console.log('[RoundPebble2] Final plane position within pebble:', {
            scenePosition: gltf.scene.position,
            groupPosition: roundPebbleGroup2.position
        });

        if (parentGroup && parentGroup.add) {
            parentGroup.add(roundPebbleGroup2);
        } else if (scene && scene.add) {
            // Fallback: add to scene if parentGroup not available
            scene.add(roundPebbleGroup2);
        }

        // Expose for debugging
        window.ROUND_PEBBLE2 = { roundPebbleGroup2, roundPebbleMesh2, gltf: gltf.scene };

        // Attempt autoplay; if blocked, user interaction will be required
        const tryPlay = () => { try { video.play(); } catch (_) { void 0; } };
        if (video.readyState >= 2) { tryPlay(); }
        else { video.addEventListener('canplay', tryPlay, { once: true }); }
    }, undefined, (error) => {
        console.error('Error loading second round pebble model:', error);
    });
}


