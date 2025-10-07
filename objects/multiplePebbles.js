// Multiple Pebbles Manager for Section 4
// Handles creation and management of 4 separate pebble instances (one per asset category)

import * as THREE from 'three';
import { GLTFLoader } from '../libs/GLTFLoader.js';
import pebbleUrl from '../models/pebble_45.glb?url';
import planeUrl from '../models/plane_45.glb?url';
import vertexShader from '../shaders/glass.vert.js';
import fragmentShader from '../shaders/glass.frag.js';

// Asset categories and their videos
const ASSET_CATEGORIES = [
    { title: 'Digital Art', video: 'Art.mp4', body: 'Unique, scarce, and truly ownable digital artworks, from generative masterpieces to AI and networked creativity.' },
    { title: 'PFPs', video: 'PFP.mp4', body: 'Profile-picture collections powering digital identity, and online community networks.' },
    { title: 'Real-World Assets (RWAs)', video: 'RWA.mp4', body: 'Tokenized real estate, land, and fine art, moving billion-dollar markets on-chain.' },
    { title: 'DeFi tokens', video: 'token.mp4', body: 'Liquidity positions and protocol tokens, enabling composable, on-chain finance.' }
];

export let pebbleInstances = [];
export let arePebblesReady = false;

/**
 * Load and create 4 pebble instances, each with its own video
 * @param {THREE.Scene} scene - Three.js scene
 * @param {Object} sharedUniforms - Shared shader uniforms for glass effect
 * @returns {Promise} Promise that resolves when all pebbles are loaded
 */
export function loadMultiplePebbles(scene, sharedUniforms) {
    const loader = new GLTFLoader();
    const promises = [];

    ASSET_CATEGORIES.forEach((category, index) => {
        const promise = new Promise((resolve, reject) => {
            // Load pebble model
            loader.load(pebbleUrl, (pebbleGltf) => {
                // Calculate bounding box to center the model
                const box = new THREE.Box3().setFromObject(pebbleGltf.scene);
                const center = new THREE.Vector3();
                box.getCenter(center);

                // Apply glass shader to pebble meshes
                pebbleGltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry.computeVertexNormals();
                        
                        const originalMap = child.material.map;
                        child.material = new THREE.ShaderMaterial({
                            uniforms: {
                                ...sharedUniforms,
                                uTexture: { value: originalMap }
                            },
                            vertexShader: vertexShader,
                            fragmentShader: fragmentShader,
                            transparent: true,
                            side: THREE.DoubleSide
                        });
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                // Create group for this pebble
                const pebbleGroup = new THREE.Group();
                pebbleGltf.scene.position.set(-center.x, -center.y, -center.z);
                pebbleGroup.add(pebbleGltf.scene);
                
                // Load plane for this pebble
                loader.load(planeUrl, (planeGltf) => {
                    // Create video element for this category
                    const video = document.createElement('video');
                    const videoUrl = new URL(`../images/${category.video}`, import.meta.url).href;
                    video.src = videoUrl;
                    video.crossOrigin = 'anonymous';
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;

                    const videoTexture = new THREE.VideoTexture(video);
                    videoTexture.colorSpace = THREE.SRGBColorSpace;
                    videoTexture.minFilter = THREE.LinearFilter;
                    videoTexture.magFilter = THREE.LinearFilter;
                    videoTexture.generateMipmaps = false;
                    
                    // Rotate texture by 45 degrees
                    videoTexture.rotation = Math.PI / 4;
                    videoTexture.center.set(0.5, 0.5);

                    const planeMaterial = new THREE.MeshStandardMaterial({
                        map: videoTexture,
                        metalness: 0.2,
                        roughness: 0.5,
                        side: THREE.DoubleSide,
                        transparent: true,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false
                    });

                    planeGltf.scene.traverse((child) => {
                        if (child.isMesh) {
                            child.geometry.computeVertexNormals();
                            child.material = planeMaterial;
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    // Create plane group
                    const planeBox = new THREE.Box3().setFromObject(planeGltf.scene);
                    const planeCenter = new THREE.Vector3();
                    planeBox.getCenter(planeCenter);
                    
                    const planeGroup = new THREE.Group();
                    planeGltf.scene.position.set(-planeCenter.x, -planeCenter.y, -planeCenter.z);
                    planeGltf.scene.rotation.x = -Math.PI / 2;
                    planeGroup.add(planeGltf.scene);
                    planeGroup.scale.setScalar(1);
                    
                    // Add plane to pebble
                    pebbleGroup.add(planeGroup);

                    // Store reference to video for later control
                    planeGroup.userData.video = video;
                    planeGroup.userData.videoTexture = videoTexture;

                    // Start video playback
                    video.play().catch(err => console.warn('Video autoplay blocked:', err));

                    // Set initial state - hidden and offscreen
                    pebbleGroup.position.set(0, -20, 0);
                    pebbleGroup.scale.setScalar(1.0);
                    pebbleGroup.visible = false;
                    
                    // Add to scene
                    scene.add(pebbleGroup);

                    // Store pebble instance with metadata
                    pebbleInstances[index] = {
                        group: pebbleGroup,
                        planeGroup: planeGroup,
                        video: video,
                        videoTexture: videoTexture,
                        category: category,
                        index: index
                    };

                    console.log(`[MultiplePebbles] Loaded pebble ${index + 1}/4:`, category.title);
                    resolve();
                }, (error) => {
                    console.error(`[MultiplePebbles] Failed to load plane for ${category.title}:`, error);
                    reject(error);
                });
            }, (error) => {
                console.error(`[MultiplePebbles] Failed to load pebble for ${category.title}:`, error);
                reject(error);
            });
        });

        promises.push(promise);
    });

    return Promise.all(promises).then(() => {
        arePebblesReady = true;
        window.pebbleInstances = pebbleInstances; // Expose for debugging
        console.log('[MultiplePebbles] All 4 pebbles loaded successfully');
        return pebbleInstances;
    });
}

/**
 * Get a specific pebble instance by index or category name
 */
export function getPebbleInstance(indexOrName) {
    if (typeof indexOrName === 'number') {
        return pebbleInstances[indexOrName];
    }
    return pebbleInstances.find(p => p.category.title === indexOrName);
}

/**
 * Show/hide a specific pebble
 */
export function setPebbleVisibility(index, visible) {
    if (pebbleInstances[index]) {
        pebbleInstances[index].group.visible = visible;
    }
}

/**
 * Play/pause a specific pebble's video
 */
export function setPebbleVideoPlaying(index, playing) {
    if (pebbleInstances[index] && pebbleInstances[index].video) {
        if (playing) {
            pebbleInstances[index].video.play().catch(err => console.warn('Video play failed:', err));
        } else {
            pebbleInstances[index].video.pause();
        }
    }
}

