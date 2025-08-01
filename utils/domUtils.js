// DOM Utilities Module for NFTfi Marketing Site
// Handles DOM-related utilities and event binding

// Debounced texture update function
let textureUpdateTimeout;

export function debouncedTextureUpdate(updatePlaneTexture) {
    clearTimeout(textureUpdateTimeout);
    textureUpdateTimeout = setTimeout(() => {
        updatePlaneTexture();
    }, 250); // Wait 250ms after resize stops
}

// Window resize handler
export function createWindowResizeHandler(onThreeJSResize, updatePlaneForViewport, updatePlaneTexture) {
    return function onWindowResize() {
        // Use modular resize handler
        onThreeJSResize();
        
        // Update plane position for new viewport
        updatePlaneForViewport();
        
        // Debounced texture update
        debouncedTextureUpdate(updatePlaneTexture);
    };
}

// Add event listeners for mouse movement and window resize
export function addEventListeners(onWindowResize) {
    // Mouse move handler with sophisticated tracking
    // Use window events since canvas has pointer-events: none
    window.addEventListener('mousemove', (e) => {
        // Initialize lastMousePos if it hasn't been set yet
        if (window.lastMousePos && window.lastMousePos.x === 0 && window.lastMousePos.y === 0) {
            window.lastMousePos.x = e.clientX;
            window.lastMousePos.y = e.clientY;
            return;
        }
        
        if (!window.lastMousePos) {
            window.lastMousePos = { x: e.clientX, y: e.clientY };
            return;
        }
        
        const deltaX = e.clientX - window.lastMousePos.x;
        const deltaY = e.clientY - window.lastMousePos.y;
        
        // Add mouse movement to influence (normalized to screen size)
        // Enhanced mouse influence calculation like the working example
        if (window.mouseInfluence) {
            window.mouseInfluence.x += deltaX / window.innerWidth * 2.0;
            window.mouseInfluence.y += deltaY / window.innerHeight * 2.0;
        }
        
        window.lastMousePos.x = e.clientX;
        window.lastMousePos.y = e.clientY;
    });
    
    // Window resize handler
    window.addEventListener('resize', onWindowResize);
} 