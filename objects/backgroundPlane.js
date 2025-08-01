import * as THREE from 'three';
import { gsap } from 'gsap';
import { MODEL_CONFIG } from '../config.js';

// Global reference
export let backgroundPlane = null;

/**
 * Capture hero div and create dynamic texture
 */
export function captureHeroAsTexture() {
    return new Promise((resolve, reject) => {
        const heroElement = document.querySelector('.hero');
        if (!heroElement) {
            reject(new Error('Hero element not found'));
            return;
        }
        
        // Wait for any pending layout calculations
        requestAnimationFrame(() => {
            // Capture the hero div using html2canvas
            html2canvas(heroElement, { 
                backgroundColor: null, // Transparent background
                scale: 2, // Higher resolution for better quality
                useCORS: true, // Allow cross-origin images
                allowTaint: true, // Allow tainted canvas
                logging: false, // Disable logging for performance
                width: heroElement.offsetWidth, // Use actual element width
                height: heroElement.offsetHeight, // Use actual element height
                scrollX: window.scrollX, // Account for scroll position
                scrollY: window.scrollY
            }).then(canvas => {
                // Create Three.js texture from canvas
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                
                // console.log('Hero captured successfully:', {
                //     canvasWidth: canvas.width,
                //     canvasHeight: canvas.height,
                //     elementWidth: heroElement.offsetWidth,
                //     elementHeight: heroElement.offsetHeight,
                //     texture: texture
                // });
                
                // Mark texture as ready and trigger mesh scale animation
                window.textureReady = true;
                if (window.wrapper) {
                    // Animate mesh scale from tiny to target scale
                    gsap.to(window.wrapper.scale, {
                        x: MODEL_CONFIG.startScale,
                        y: MODEL_CONFIG.startScale,
                        z: MODEL_CONFIG.startScale,
                        duration: 1.5,
                        ease: "power2.out",
                        onUpdate: () => {
                            // Ensure scale is applied
                            window.wrapper.scale.needsUpdate = true;
                        }
                    });
                }
                
                resolve(texture);
            }).catch(error => {
                console.error('Error capturing hero:', error);
                
                // Even if texture fails, still scale up the mesh
                window.textureReady = true;
                if (window.wrapper) {
                    gsap.to(window.wrapper.scale, {
                        x: MODEL_CONFIG.startScale,
                        y: MODEL_CONFIG.startScale,
                        z: MODEL_CONFIG.startScale,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                }
                
                reject(error);
            });
        });
    });
}

/**
 * Create background plane and white sphere for refraction effects
 */
export function createBackgroundPlane(scene, uniforms) {
    const backgroundGroup = new THREE.Group();
    backgroundGroup.visible = true; // Make visible to see all objects
    
    // Background group is now empty - removed the four white icosahedrons
    scene.add(backgroundGroup);
    
    // Create plane geometry - exact GitHub dimensions
    const planeScale = 1; // GitHub default
    const width = 20 * planeScale; // 20 units
    const height = width * (591 / 1325); // 8.92 units based on 1325:591 ratio
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    
    // Create material with dynamic texture (will be updated)
    const planeMaterial = new THREE.MeshBasicMaterial({ 
        transparent: true,
        opacity: 0.8, // GitHub opacity
        side: THREE.DoubleSide
    });
    
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -10); // Position behind camera for invisibility
    
    // NEW: Make plane invisible to camera but still available for shader sampling
    plane.visible = false; // Invisible to camera
    plane.renderOrder = -1; // Render first (before the main mesh)
    
    scene.add(plane); // Add directly to scene, not to background group
    
    // Store reference for potential future use
    backgroundPlane = plane;
    
    // Set global reference
    window.backgroundPlane = plane;
    
    // Capture hero and apply as texture with delay to ensure DOM is ready
    setTimeout(() => {
        captureHeroAsTexture().then(texture => {
            plane.material.map = texture;
            plane.material.needsUpdate = true;
            // console.log('Dynamic texture applied to plane');
        }).catch(error => {
            console.error('Failed to apply dynamic texture, using fallback:', error);
            // Fallback to static texture if capture fails
            const textureLoader = new THREE.TextureLoader();
            const headerTexture = textureLoader.load('/images/header.png');
            plane.material.map = headerTexture;
            plane.material.needsUpdate = true;
        });
    }, 100); // Small delay to ensure DOM is fully rendered
    
    // Safety timeout to ensure mesh scales up even if html2canvas takes too long
    setTimeout(() => {
        if (!window.textureReady && window.wrapper) {
            window.textureReady = true;
            gsap.to(window.wrapper.scale, {
                x: MODEL_CONFIG.startScale,
                y: MODEL_CONFIG.startScale,
                z: MODEL_CONFIG.startScale,
                duration: 1.5,
                ease: "power2.out"
            });
        }
    }, 3000); // 3 second safety timeout
    
    // Add white sphere at the same position as the plane
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true,
        opacity: 1
    });
    
    const whiteSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    whiteSphere.position.set(-11.15, 5.35, -7); // Same position as plane
    whiteSphere.scale.setScalar(1.25); // Make it visible
    
    // Make sphere invisible to camera but available for shader sampling (like plane)
    whiteSphere.visible = false; // Visible for positioning reference
    whiteSphere.renderOrder = -2; // Render before plane
    
    scene.add(whiteSphere);
    
    // Store reference to sphere for potential future use
    if (!window.DEBUG) {
        window.DEBUG = {};
    }
    window.DEBUG.whiteSphere = whiteSphere;
    // console.log('Sphere added to DEBUG object:', whiteSphere);
}

/**
 * Update plane position and scale from UI controls
 */
export function updatePlane() {
    // Get values from UI controls
    const x = parseFloat(document.getElementById('planeX').value);
    const y = parseFloat(document.getElementById('planeY').value);
    const z = parseFloat(document.getElementById('planeZ').value);
    const scale = parseFloat(document.getElementById('planeScale').value);
    
    // Update plane position and scale using direct reference
    if (backgroundPlane) {
        backgroundPlane.position.set(x, y, z);
        backgroundPlane.scale.setScalar(scale);
        
        // Update plane geometry dimensions
        const width = 20 * scale;
        const height = width * (591 / 1325);
        backgroundPlane.geometry.dispose();
        backgroundPlane.geometry = new THREE.PlaneGeometry(width, height);
    }
}

/**
 * Update plane position based on viewport
 */
export function updatePlaneForViewport() {
    if (backgroundPlane) {
        const position = calculatePlanePosition();
        backgroundPlane.position.set(position.x, position.y, position.z);
        
        // Update the UI controls to reflect the new position
        if (document.getElementById('planeX')) {
            document.getElementById('planeX').value = position.x;
            document.getElementById('planeXValue').textContent = position.x.toFixed(1);
        }
        if (document.getElementById('planeY')) {
            document.getElementById('planeY').value = position.y;
            document.getElementById('planeYValue').textContent = position.y.toFixed(1);
        }
        if (document.getElementById('planeZ')) {
            document.getElementById('planeZ').value = position.z;
            document.getElementById('planeZValue').textContent = position.z.toFixed(1);
        }
    }
}

/**
 * Update plane texture with fresh hero capture
 */
export function updatePlaneTexture() {
    if (backgroundPlane) {
        captureHeroAsTexture().then(texture => {
            // Dispose old texture to prevent memory leaks
            if (backgroundPlane.material.map) {
                backgroundPlane.material.map.dispose();
            }
            
            backgroundPlane.material.map = texture;
            backgroundPlane.material.needsUpdate = true;
            // console.log('Plane texture updated with fresh hero capture');
        }).catch(error => {
            console.error('Failed to update plane texture:', error);
        });
    }
}

/**
 * Show background plane for render target sampling
 */
export function showBackgroundPlane() {
    if (backgroundPlane) {
        backgroundPlane.visible = true;
    }
}

/**
 * Hide background plane for final render
 */
export function hideBackgroundPlane() {
    if (backgroundPlane) {
        backgroundPlane.visible = false;
    }
}

/**
 * Calculate plane position based on viewport
 */
export function calculatePlanePosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // X offset constant for easy tweaking
    const X_OFFSET = -4; // Adjust this value to move plane left/right
    
    // Calculate the center of the viewport in normalized coordinates (-1 to 1)
    const centerX = 0; // Center of viewport
    const centerY = 0; // Center of viewport
    
    // Convert viewport center to world coordinates
    // The plane should be positioned to match the visible content area
    let worldX = centerX * 10; // Scale factor for world coordinates
    let worldY = centerY * 10;
    const worldZ = -5; // Keep behind the camera
    
    // Apply X offset
    worldX += X_OFFSET;
    
    // Adjust based on viewport aspect ratio
    const aspectRatio = viewportWidth / viewportHeight;
    if (aspectRatio > 1) {
        // Wide screen - adjust X position
        worldX += (aspectRatio - 1) * 5; // Move plane right for wide screens
    } else {
        // Tall screen - adjust Y position
        worldY += (1 - aspectRatio) * 5; // Move plane up for tall screens
    }
    
    return { x: worldX, y: worldY, z: worldZ };
} 