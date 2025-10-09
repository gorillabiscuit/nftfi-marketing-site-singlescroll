import * as THREE from 'three';
import { GLTFLoader } from '../libs/GLTFLoader.js';
// Import model via Vite asset handling
import pebbleUrl from '../models/pebble_45.glb?url';
// Previous: round-pebble.glb, pebble.glb
import vertexShader from '../shaders/glass.vert.js';
import fragmentShader from '../shaders/glass.frag.js';

export let pebbleMesh3 = null;
export let pebbleGroup3 = null;
export let isPebble3Ready = false;

/**
 * Load third Pebble model and add to scene with shared glass shader uniforms
 * Leaves transform "as is" so we can adjust after preview
 */
export function loadPebbleModel3(scene, sharedUniforms) {
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
                pebbleMesh3 = child;
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
        pebbleGroup3 = new THREE.Group();
        // Center original mesh by offsetting by its bounding box center
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        pebbleGroup3.add(gltf.scene);
        
        // Default: keep pebble offscreen and hidden until section 4
        // Position it well below the viewport; we'll animate it up on section 4
        pebbleGroup3.position.set(0, -20, 0);
        pebbleGroup3.rotation.y = Math.PI / 2; // 90 degrees on Y axis
        pebbleGroup3.scale.setScalar(2.0);  // Keep at 2.0 (no scaling animation)
        pebbleGroup3.visible = false;
        scene.add(pebbleGroup3);

        isPebble3Ready = true;
        // Expose readiness flag for debugging
        window.isPebble3Ready = isPebble3Ready;
        // Expose for debugging/adjustment
        window.PEBBLE3 = { pebbleGroup3, pebbleMesh3, gltf: gltf.scene };
    }, undefined, (error) => {
        console.error('Error loading second pebble model:', error);
    });
}


