import * as THREE from 'three';
import { GLTFLoader } from '../libs/GLTFLoader.js';
// Import model via Vite asset handling
import pebbleUrl from '../models/round-pebble.glb?url';
// import pebbleUrl from '../models/pebble.glb?url';
import vertexShader from '../shaders/glass.vert.js';
import fragmentShader from '../shaders/glass.frag.js';

export let pebbleMesh = null;
export let pebbleGroup = null;
export let isPebbleReady = false;

/**
 * Load Pebble model and add to scene with shared glass shader uniforms
 * Leaves transform "as is" so we can adjust after preview
 */
export function loadPebbleModel(scene, sharedUniforms) {
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
                pebbleMesh = child;
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
        pebbleGroup = new THREE.Group();
        // Center original mesh by offsetting by its bounding box center
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        pebbleGroup.add(gltf.scene);
        
        // Position pebble directly in Section 4 (visible from start)
        // Default Section 4 position (will be overridden by scroll trigger setup)
        pebbleGroup.position.set(-3.5, 0, 0);
        pebbleGroup.scale.setScalar(2.0);
        pebbleGroup.visible = true;
        scene.add(pebbleGroup);

        isPebbleReady = true;
        // Expose readiness flag for debugging
        window.isPebbleReady = isPebbleReady;
        // Expose for debugging/adjustment
        window.PEBBLE = { pebbleGroup, pebbleMesh, gltf: gltf.scene };
    }, undefined, (error) => {
        console.error('Error loading pebble model:', error);
    });
}


