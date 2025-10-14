import * as THREE from 'three';
import { gsap } from 'gsap';
import { MODEL_CONFIG } from '../config/index.js';

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
        
        return currentScale;
    });
}

// Global reference
export let backgroundPlane = null;

// Safari detection utility
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Video texture system for Section 4 asset categories
let videoTextures = {};
let currentVideoTexture = null;
let isVideoSystemInitialized = false;

/**
 * Initialize video textures for Section 4 asset categories
 */
export function initializeVideoTextures() {
    if (isVideoSystemInitialized) return Promise.resolve();
    
    const videoMap = {
        'Digital Art': 'Art.mp4',
        'PFPs': 'PFP.mp4', 
        'Real-World Assets (RWAs)': 'RWA.mp4',
        'DeFi tokens': 'token.mp4'
    };
    
    const loadPromises = Object.entries(videoMap).map(([category, filename]) => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.crossOrigin = 'anonymous';
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            
            // Use Vite asset URL to ensure it works in both dev and production
            const videoUrl = new URL(`../images/${filename}`, import.meta.url).href;
            video.src = videoUrl;
            
            video.onloadeddata = () => {
                // Create Three.js video texture
                const texture = new THREE.VideoTexture(video);
                texture.needsUpdate = true;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                
                // Rotate texture by 45 degrees (π/4 radians)
                texture.rotation = Math.PI / 4; // 45 degrees
                texture.center.set(0.5, 0.5); // Rotate around center
                
                videoTextures[category] = {
                    video: video,
                    texture: texture
                };
                
                resolve();
            };
            
            video.onerror = (error) => {
                console.error(`[Video] Failed to load ${filename}:`, error);
                reject(error);
            };
            
            // Start loading
            video.load();
        });
    });
    
    return Promise.all(loadPromises).then(() => {
        isVideoSystemInitialized = true;
    }).catch(error => {
        console.error('[Video] Failed to initialize some video textures:', error);
        isVideoSystemInitialized = true; // Continue anyway
    });
}

/**
 * Switch to video texture for the specified asset category
 */
export function switchToVideoTexture(category) {
    if (!isVideoSystemInitialized) {
        return;
    }
    
    // Target the round pebble mesh (plane inside the glass pebble)
    const roundPebbleMesh = window.ROUND_PEBBLE?.roundPebbleMesh;
    if (!roundPebbleMesh || !roundPebbleMesh.material) {
        return;
    }
    
    const videoData = videoTextures[category];
    if (!videoData) {
        return;
    }
    
    // Stop current video if playing
    if (currentVideoTexture && currentVideoTexture.video) {
        currentVideoTexture.video.pause();
    }
    
    // Switch to new video texture on the round pebble's material
    if (roundPebbleMesh.material.map) {
        // Don't dispose - might be shared
        // roundPebbleMesh.material.map.dispose();
    }
    
    roundPebbleMesh.material.map = videoData.texture;
    roundPebbleMesh.material.needsUpdate = true;
    currentVideoTexture = videoData;
    
    // Start playing the video
    videoData.video.play().catch(error => {
        // Video play failed silently
    });
}

/**
 * Switch back to the original video (stop category video playback)
 */
export function switchToHeroTexture() {
    if (currentVideoTexture && currentVideoTexture.video) {
        currentVideoTexture.video.pause();
        currentVideoTexture = null;
    }
    
    // Target the round pebble mesh (plane inside the glass pebble)
    const roundPebbleMesh = window.ROUND_PEBBLE?.roundPebbleMesh;
    if (!roundPebbleMesh || !roundPebbleMesh.material) {
        return;
    }
    
    // Switch back to the original video (the social_s_y_l_l_o_g_i_s_m... video)
    // We need to get the original video texture from the round pebble
    // For now, let's create a function to get/restore the original video
    restoreOriginalPebbleVideo();
}

/**
 * Restore the original video texture to the round pebble
 */
function restoreOriginalPebbleVideo() {
    // We'll implement this by accessing the original video from roundPebbleModel
    // For now, let's create a new video element with the original video
    const roundPebbleMesh = window.ROUND_PEBBLE?.roundPebbleMesh;
    if (!roundPebbleMesh || !roundPebbleMesh.material) return;
    
    // Create the original video element (Art.mp4 - Digital Art category)
    const video = document.createElement('video');
    const originalVideoUrl = new URL('../images/Art.mp4', import.meta.url).href;
    video.src = originalVideoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    
    const originalVideoTexture = new THREE.VideoTexture(video);
    originalVideoTexture.colorSpace = THREE.SRGBColorSpace;
    originalVideoTexture.minFilter = THREE.LinearFilter;
    originalVideoTexture.magFilter = THREE.LinearFilter;
    originalVideoTexture.generateMipmaps = false;
    
    // Rotate texture by 45 degrees (π/4 radians)
    originalVideoTexture.rotation = Math.PI / 4; // 45 degrees
    originalVideoTexture.center.set(0.5, 0.5); // Rotate around center
    
    // Apply the original video texture
    roundPebbleMesh.material.map = originalVideoTexture;
    roundPebbleMesh.material.needsUpdate = true;
    
    // Start playing the original video
    const tryPlay = () => { try { video.play(); } catch (_) { void 0; } };
    if (video.readyState >= 2) { 
        tryPlay(); 
    } else { 
        video.addEventListener('canplay', tryPlay, { once: true }); 
    }
}

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
                
                // Mark texture as ready
                window.textureReady = true;
                
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
                                // Fallback scale animation started
                            },
                            onComplete: () => {
                                isInitialAnimationComplete = true;
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
    
    // No longer needed - mesh is visible immediately with loading screen
    
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
        import('../config/index.js').then(({ WHITE_SPHERE_POSITIONS }) => {
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
 * Create a gradient texture matching Section 4's background
 * Returns a THREE.CanvasTexture with the gradient
 */
function createSection4GradientTexture() {
    // Create a canvas for the gradient
    const canvas = document.createElement('canvas');
    canvas.width = 1024;  // Reasonable size for texture
    canvas.height = 1024;
    
    const ctx = canvas.getContext('2d');
    
    // Create gradient matching Section 4 background: linear-gradient(180deg, #8D694B 0%, #6C3C59 100%)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#8D694B');    // Top color
    gradient.addColorStop(1, '#6C3C59');    // Bottom color
    
    // Fill canvas with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create and return Three.js texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
}

/**
 * Capture a specific DOM element into a texture and apply it to the background plane.
 * For Section 4, uses a static gradient instead of DOM capture.
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
            
            // Check if this is Section 4 - use gradient texture instead of DOM capture
            const isSection4 = el.closest('.section[data-section="4"]') !== null;
            
            if (isSection4) {
                // Create gradient texture
                const texture = createSection4GradientTexture();
                
                // Apply to background plane
                if (backgroundPlane && backgroundPlane.material) {
                    if (backgroundPlane.material.map) {
                        try { backgroundPlane.material.map.dispose(); } catch (_) { void 0; }
                    }
                    backgroundPlane.material.map = texture;
                    backgroundPlane.material.needsUpdate = true;
                    backgroundPlane.visible = true;
                }
                
                resolve(texture);
                return;
            }
            
            // For non-Section 4, use original html2canvas capture
            // Safari-specific configuration
            const safariMode = isSafari();
            const html2canvasOptions = {
                backgroundColor: null,
                scale: safariMode ? 1 : 2, // Reduce scale for Safari to avoid canvas size limits
                useCORS: true,
                allowTaint: true,
                logging: safariMode, // Enable logging for Safari to debug issues
                width: el.offsetWidth,
                height: el.offsetHeight,
                windowWidth: safariMode ? Math.min(el.scrollWidth, 1024) : el.scrollWidth,
                windowHeight: safariMode ? Math.min(el.scrollHeight, 768) : el.scrollHeight,
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                // Safari-specific: Skip problematic elements
                ignoreElements: safariMode ? (element) => {
                    return element.tagName === 'CANVAS' || 
                           element.tagName === 'VIDEO' ||
                           element.classList.contains('three-canvas') ||
                           element.id === 'three-canvas' ||
                           element.id === 'three-container';
                } : undefined
            };
            
            // Safari-specific: Add additional timing delay for layout stability
            const captureDelay = safariMode ? 100 : 0;
            
            const doCapture = () => {
                html2canvas(el, html2canvasOptions).then((canvas) => {
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
                    console.error(`[Texture] Capture failed (Safari: ${safariMode}):`, err);
                    
                    // Safari fallback: try with even more conservative settings
                    if (safariMode) {
                        const fallbackOptions = {
                            ...html2canvasOptions,
                            scale: 0.5, // Very conservative scale
                            windowWidth: Math.min(el.offsetWidth, 1024), // Limit window size
                            windowHeight: Math.min(el.offsetHeight, 768),
                            ignoreElements: (element) => {
                                // Skip complex elements that might cause issues in Safari
                                return element.tagName === 'VIDEO' || 
                                       element.tagName === 'CANVAS' ||
                                       element.classList.contains('three-canvas');
                            }
                        };
                        
                        html2canvas(el, fallbackOptions).then((canvas) => {
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
                        }).catch((fallbackErr) => {
                            console.error('[Texture] Safari fallback capture also failed:', fallbackErr);
                            reject(fallbackErr);
                        });
                    } else {
                        reject(err);
                    }
                });
            };
            
            // Apply timing delay for Safari
            if (captureDelay > 0) {
                setTimeout(doCapture, captureDelay);
            } else {
                doCapture();
            }
            
        } catch (e) { /* noop to satisfy linter */ reject(e); }
    });
}

// Pre-capture Section 4 content ahead of onEnter using IntersectionObserver
export function setupSectionPreCapture(selector, rootMargin) {
    if (typeof rootMargin === 'undefined') { rootMargin = '400px'; }
    try {
        const target = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!target || typeof IntersectionObserver === 'undefined') return;
        let captured = false;
        const obs = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (!captured && entry && entry.isIntersecting) {
                captured = true;
                
                // Safari-specific: Add extra delay for layout stability
                const safariMode = isSafari();
                const captureDelay = safariMode ? 200 : 0;
                
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        try {
                            updatePlaneTextureForSection(selector)
                                .then(() => { 
                                    try { 
                                        window.__s4PreCaptured = true;
                                    } catch (_) { void 0; } 
                                })
                                .catch((err) => { 
                                    // Pre-capture failed silently
                                });
                        } catch (_) { void 0; }
                    });
                }, captureDelay);
                
                try { obs.disconnect(); } catch (_) { void 0; }
            }
        }, { root: null, rootMargin: rootMargin, threshold: 0 });
        obs.observe(target);
    } catch (_) { void 0; }
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