import * as THREE from 'three';
import { GLTFLoader } from '../libs/GLTFLoader.js';
// Import model via Vite asset handling
import pebbleUrl from '../models/pebble_45.glb?url';
// Previous: round-pebble.glb, pebble.glb
import vertexShader from '../shaders/glass.vert.js';
import fragmentShader from '../shaders/glass.frag.js';

export let pebbleMesh4 = null;
export let pebbleGroup4 = null;
export let isPebble4Ready = false;

/**
 * Load fourth Pebble model and add to scene with shared glass shader uniforms
 * Leaves transform "as is" so we can adjust after preview
 */
export function loadPebbleModel4(scene, sharedUniforms) {
    const loader = new GLTFLoader();

    loader.load(pebbleUrl, (gltf) => {
        // Calculate bounding box to center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        // Apply glass shader material to meshes, using shared uniforms but with per-mesh uTexture
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                pebbleMesh4 = child;
                if (child.geometry) {
                    child.geometry.computeVertexNormals();
                }
                const uniforms = {
                    ...sharedUniforms,
                    uTexture: { value: null }
                };
                child.material = new THREE.ShaderMaterial({
                    vertexShader,
                    fragmentShader,
                    uniforms,
                    side: THREE.DoubleSide
                });
            }
        });

        // Group for later animation control; add "as is"
        pebbleGroup4 = new THREE.Group();
        // Center original mesh by offsetting by its bounding box center
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        pebbleGroup4.add(gltf.scene);
        
        // Default: keep pebble offscreen and hidden until section 4
        // Position it well below the viewport; we'll animate it up on section 4
        pebbleGroup4.position.set(0, -20, 0);
        pebbleGroup4.rotation.y = Math.PI / 2; // 90 degrees on Y axis
        pebbleGroup4.scale.setScalar(2.0);  // Keep at 2.0 (no scaling animation)
        pebbleGroup4.visible = false;
        scene.add(pebbleGroup4);

        isPebble4Ready = true;
        // Expose readiness flag for debugging
        window.isPebble4Ready = isPebble4Ready;
        // Expose for debugging/adjustment
        window.PEBBLE4 = { pebbleGroup4, pebbleMesh4, gltf: gltf.scene };
    }, undefined, (error) => {
        console.error('Error loading second pebble model:', error);
    });
}


