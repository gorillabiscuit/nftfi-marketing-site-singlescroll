import * as THREE from 'three';
import { GLTFLoader } from '../libs/GLTFLoader.js';
// Import model via Vite asset handling to ensure it’s emitted to dist and path resolved
import nftfiLogoUrl from '../models/nftfi_logo.glb?url';
import vertexShader from '../shaders/glass.vert.js';
import fragmentShader from '../shaders/glass.frag.js';

// Global references
export let mesh = null;
export let wrapper = null;
export let isModelReady = false;

/**
 * Load and setup the GLTF logo model with glass shader material
 */
export function loadLogoModel(scene, uniforms, calculateStartPosition, updatePlaneForViewport, setupScrollAnimation, resetScrollAnimation, updatePlaneTexture, captureHeroAsTexture, worldToPosition, calculateTargetPosition) {
    
    const loader = new GLTFLoader();
    
    loader.load(nftfiLogoUrl, (gltf) => {
        
        // Calculate bounding box FIRST (before any geometry modifications)
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        
        // console.log('Bounding box calculated:', {
        //     center: center.toArray(),
        //     size: size.toArray(),
        //     min: box.min.toArray(),
        //     max: box.max.toArray()
        // });
        
        // Apply material to all meshes
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                mesh = child;
                
                // Apply smoothing
                if (child.geometry) {
                    child.geometry.computeVertexNormals();
                }
                
                // Create glass shader material
                child.material = new THREE.ShaderMaterial({
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    uniforms: uniforms,
                    side: THREE.DoubleSide
                });
            
            // Check for shader compilation errors
            if (child.material.program && child.material.program.error) {
                console.error('Shader compilation error:', child.material.program.error);
            } else {
                // console.log('Shader compiled successfully');
            }
            }
        });
        
        // Create wrapper group (parent object for rotation)
        wrapper = new THREE.Group();
        
        // Center the original mesh by moving it
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        
        // Add centered mesh to wrapper
        wrapper.add(gltf.scene);
        
        // Set starting position using viewport coordinates
        const startPos = calculateStartPosition();
        wrapper.position.set(
            startPos.x,
            startPos.y,
            startPos.z
        );
        
        // Set initial scale - nearly invisible to start (will be animated by GSAP)
        wrapper.scale.setScalar(0.0001); // Start tiny, GSAP will animate to correct scale
        // Keep model hidden until hero capture/texture is ready to avoid visual pop
        wrapper.visible = false;
        // Ensure canvas starts hidden (CSS sets opacity:0)
        const canvasEl = document.getElementById('three-canvas');
        if (canvasEl) canvasEl.style.opacity = '0';
        
        // Flag to track if texture is ready
        window.textureReady = false;
        
        // Add to scene
        scene.add(wrapper);
        
        // Expose wrapper globally for texture ready callback
        window.wrapper = wrapper;
        
        // Expose debug objects to console for debugging (like working example)
        window.DEBUG = {
            gltf: gltf.scene,
            wrapper: wrapper,
            originalPosition: gltf.scene.position.clone(),
            center: center.clone(),
            size: size.clone(),
            box: box,
            // Helper functions
            setWrapperPosition: (x, y, z) => {
                wrapper.position.set(x, y, z);
                // console.log('Wrapper position set to:', [x, y, z]);
            },
            setOriginalPosition: (x, y, z) => {
                gltf.scene.position.set(x, y, z);
                // console.log('Original position set to:', [x, y, z]);
            },
            resetPositions: () => {
                wrapper.position.set(0, 0, 0);
                gltf.scene.position.set(-center.x, -center.y, -center.z);
                // console.log('Positions reset to calculated center');
            },
            logPositions: () => {
                // console.log('Current positions:', {
                //     wrapper: wrapper.position.toArray(),
                //     original: gltf.scene.position.toArray(),
                //     center: center.toArray(),
                //     size: size.toArray()
                // });
            },
            // Scroll animation helpers
            resetScrollAnimation: resetScrollAnimation,
            // Texture debugging
            updatePlaneTexture: () => updatePlaneTexture(),
            captureHeroAsTexture,
            // World space positioning debugging
            worldToPosition,
            calculateTargetPosition
        };
        
        // console.log('Debug objects exposed! Use window.DEBUG to access them.');
        isModelReady = true;
        
        // Set initial plane position based on viewport
        updatePlaneForViewport();
        
        // Set up scroll-triggered animation after model is ready
        setupScrollAnimation(wrapper, calculateStartPosition, calculateTargetPosition);
    
   
        
    }, (progress) => {
        // console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    }, (error) => {
        console.error('Error loading model:', error);
        // Fallback to icosahedron if model fails to load
    });
} 