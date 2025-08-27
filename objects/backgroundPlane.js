import * as THREE from 'three';
import { gsap } from 'gsap';
import { MODEL_CONFIG } from '../config.js';

// Animation completion tracking
let isInitialAnimationComplete = false;

// Export the completion status for other modules to check
export function isAnimationComplete() {
    return isInitialAnimationComplete;
}

// Expose globally for other modules to check
window.isAnimationComplete = isAnimationComplete;

// Function to calculate correct scale based on current scroll position
function calculateCorrectScaleForScroll() {
    // Import the viewport functions dynamically
    return import('../utils/viewport.js').then(({ calculateStartPosition, calculateTargetPosition }) => {
        const startPos = calculateStartPosition();
        const targetPos = calculateTargetPosition();
        
        // Get the ScrollTrigger element (section 1)
        const triggerElement = document.querySelector(".section[data-section='1']");
        if (!triggerElement) {
            console.log('Trigger element not found, using start scale');
            return startPos.scale || MODEL_CONFIG.startScale;
        }
        
        // Calculate progress based on ScrollTrigger's bounds (section 1 only)
        const triggerRect = triggerElement.getBoundingClientRect();
        const triggerHeight = triggerRect.height;
        const triggerTop = triggerRect.top;
        
        // Progress is 0 when section 1 is at top, 1 when section 1 is at bottom
        let progress = 0;
        
        if (triggerTop <= 0) {
            // Section 1 is above or at top of viewport
            progress = Math.min(Math.abs(triggerTop) / triggerHeight, 1);
        } else {
            // Section 1 is below top of viewport (not started yet)
            progress = 0;
        }
        
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));
        
        // Interpolate scale based on ScrollTrigger progress
        const currentScale = gsap.utils.interpolate(
            startPos.scale || MODEL_CONFIG.startScale,
            targetPos.scale,
            progress
        );
        
        console.log('Calculated scale for ScrollTrigger position:', {
            triggerTop: triggerTop,
            triggerHeight: triggerHeight,
            progress: progress,
            startScale: startPos.scale,
            targetScale: targetPos.scale,
            currentScale: currentScale
        });
        
        return currentScale;
    });
}

// Global reference
export let backgroundPlane = null;

/**
 * Capture hero div and create dynamic texture
 */
export function captureHeroAsTexture() {
    return new Promise((resolve, reject) => {
        const heroElement = document.querySelector('.section[data-section="1"] .hero');
        if (!heroElement) {
            reject(new Error('Hero element not found'));
            return;
        }
        
        // Wait for fonts and layout to settle before capture to avoid reflow pop
        const doCapture = () => {
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
                if (window.wrapper && !window.scrollScaleActive) {
                    // Calculate correct scale based on current scroll position
                    calculateCorrectScaleForScroll().then(targetScale => {
                        // Animate mesh scale from tiny to calculated target scale
                        gsap.to(window.wrapper.scale, {
                            x: targetScale,
                            y: targetScale,
                            z: targetScale,
                            duration: 1.5,
                            ease: "power2.out",
                            onStart: () => {
                                console.log('Initial scale animation started with scroll-adjusted scale:', targetScale);
                                // Fade in canvas and reveal model together to avoid pop
                                const canvasEl = document.getElementById('three-canvas');
                                if (canvasEl) {
                                    gsap.to(canvasEl, { opacity: 1, duration: 0.4, ease: 'power1.out' });
                                }
                                if (window.wrapper) window.wrapper.visible = true;
                            },
                            onUpdate: () => {
                                // Ensure scale is applied
                                window.wrapper.scale.needsUpdate = true;
                            },
                            onComplete: () => {
                                isInitialAnimationComplete = true;
                                console.log('Initial scale animation completed');
                            }
                        });
                    });
                }
                
                resolve(texture);
            }).catch(error => {
                console.error('Error capturing hero:', error);
                
                // Even if texture fails, still scale up the mesh
                window.textureReady = true;
                if (window.wrapper && !window.scrollScaleActive) {
                    // Calculate correct scale based on current scroll position
                    calculateCorrectScaleForScroll().then(targetScale => {
                        gsap.to(window.wrapper.scale, {
                            x: targetScale,
                            y: targetScale,
                            z: targetScale,
                            duration: 1.5,
                            ease: "power2.out",
                            onStart: () => {
                                // Ensure visibility even when capture fails
                                const canvasEl = document.getElementById('three-canvas');
                                if (canvasEl) {
                                    gsap.to(canvasEl, { opacity: 1, duration: 0.4, ease: 'power1.out' });
                                }
                                if (window.wrapper) window.wrapper.visible = true;
                            },
                            onStart: () => {
                                console.log('Fallback scale animation started with scroll-adjusted scale:', targetScale);
                            },
                            onComplete: () => {
                                isInitialAnimationComplete = true;
                                console.log('Fallback scale animation completed');
                            }
                        });
                    });
                }
                
                reject(error);
            });
        };
        const waitForHeroReady = () => {
            // Prefer global heroReady if available; fallback to fonts.ready
            if (window.heroReady && typeof window.heroReady.then === 'function') {
                window.heroReady.then(() => requestAnimationFrame(doCapture));
            } else if (document.fonts && typeof document.fonts.ready?.then === 'function') {
                document.fonts.ready.then(() => requestAnimationFrame(doCapture));
            } else {
                requestAnimationFrame(doCapture);
            }
        };
        waitForHeroReady();
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
    
    // Capture hero and apply as texture once fonts/layout are stable
    captureHeroAsTexture().then(texture => {
        plane.material.map = texture;
        plane.material.needsUpdate = true;
        // Ensure plane uses the texture without opacity manipulation
        plane.visible = true; // keep as-is; shader samples map regardless of mesh visibility
        // console.log('Dynamic texture applied to plane');
    }).catch(error => {
        console.error('Failed to apply dynamic texture, using fallback:', error);
        // Fallback to static texture if capture fails
        const textureLoader = new THREE.TextureLoader();
        // Use Vite asset URL to ensure it’s emitted to dist
        const headerUrl = new URL('../images/header.png', import.meta.url).href;
        const headerTexture = textureLoader.load(headerUrl);
        plane.material.map = headerTexture;
        plane.material.needsUpdate = true;
    });
    
    // Safety timeout to ensure mesh scales up even if html2canvas takes too long
    setTimeout(() => {
        if (!window.textureReady && window.wrapper && !window.scrollScaleActive) {
            window.textureReady = true;
            import('../utils/viewport.js').then(({ calculateStartPosition }) => {
                const startPos = calculateStartPosition();
                const targetScale = startPos.scale || MODEL_CONFIG.startScale;
                
                gsap.to(window.wrapper.scale, {
                    x: targetScale,
                    y: targetScale,
                    z: targetScale,
                    duration: 1.5,
                    ease: "power2.out"
                });
                // Ensure visibility if the capture took too long
                const canvasEl = document.getElementById('three-canvas');
                if (canvasEl) {
                    gsap.to(canvasEl, { opacity: 1, duration: 0.4, ease: 'power1.out' });
                }
                if (window.wrapper) window.wrapper.visible = true;
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
    whiteSphere.name = 'whiteLightSphere';
    
    // Set position based on breakpoint
    import('../utils/breakpointManager.js').then(({ getCurrentBreakpoint }) => {
        import('../config.js').then(({ WHITE_SPHERE_POSITIONS }) => {
            const breakpoint = getCurrentBreakpoint();
            const position = WHITE_SPHERE_POSITIONS[breakpoint] || WHITE_SPHERE_POSITIONS.desktop;
            
            whiteSphere.position.set(position.x, position.y, position.z);
        });
    });
    
    whiteSphere.scale.setScalar(1.25); // Make it visible
    
    // Default: keep sphere hidden; the render loop will toggle it during offscreen captures
    whiteSphere.visible = false;
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
 * Capture a specific DOM element into a texture and apply it to the background plane.
 * Returns a Promise that resolves to the created THREE.CanvasTexture.
 */
export function updatePlaneTextureForSection(selector) {
    return new Promise((resolve, reject) => {
        try {
            const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
            if (!el) {
                reject(new Error('updatePlaneTextureForSection: element not found'));
                return;
            }
            html2canvas(el, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: el.offsetWidth,
                height: el.offsetHeight,
                scrollX: window.scrollX,
                scrollY: window.scrollY
            }).then((canvas) => {
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                if (backgroundPlane && backgroundPlane.material) {
                    if (backgroundPlane.material.map) {
                        try { backgroundPlane.material.map.dispose(); } catch (_) { void 0; }
                    }
                    backgroundPlane.material.map = texture;
                    backgroundPlane.material.needsUpdate = true;
                    backgroundPlane.visible = true;
                }
                resolve(texture);
            }).catch((err) => {
                reject(err);
            });
        } catch (e) { /* noop to satisfy linter */ reject(e); }
    });
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