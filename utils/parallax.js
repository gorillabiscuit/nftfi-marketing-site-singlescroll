// Parallax Mouse Movement System
// Uses matrix3d transforms and CSS custom properties to avoid conflicts

class ParallaxSystem {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.ticking = false;
        this.layers = new Map();
        
        this.init();
    }
    
    init() {
        // Define parallax layers with different speeds
        this.addLayer('gradients-bg', 0.05, 0.05); // Background - very subtle
        this.addLayer('.hero', 0.15, 0.15);         // Hero container - medium
        this.addLayer('.hero-content', 0.25, 0.25);  // Text/buttons - most responsive
        
        // Add event listeners
        this.addEventListeners();
        
        // Initial update
        this.updateParallax();
    }
    
    addLayer(selector, speedX = 0.1, speedY = 0.1) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            this.layers.set(selector, {
                elements: Array.from(elements),
                speedX,
                speedY
            });
        }
    }
    
    addEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Touch events for mobile
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
    }
    
    handleMouseMove(e) {
        this.updateMousePosition(e.clientX, e.clientY);
    }
    
    handleTouchMove(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            this.updateMousePosition(touch.clientX, touch.clientY);
        }
    }
    
    handleResize() {
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
    }
    
    updateMousePosition(clientX, clientY) {
        // Normalize mouse position to -1 to 1 range
        this.mouseX = (clientX - this.centerX) / this.centerX;
        this.mouseY = (clientY - this.centerY) / this.centerY;
        
        // Throttle updates to 60fps
        if (!this.ticking) {
            requestAnimationFrame(this.updateParallax.bind(this));
            this.ticking = true;
        }
    }
    
    updateParallax() {
        this.layers.forEach((layer, selector) => {
            const { elements, speedX, speedY } = layer;
            
            // Calculate parallax offset
            const offsetX = this.mouseX * speedX * 50; // Scale factor for visual effect
            const offsetY = this.mouseY * speedY * 50;
            
            // Update each element in the layer
            elements.forEach(element => {
                // Use CSS custom properties to avoid transform conflicts
                element.style.setProperty('--parallax-x', `${offsetX}px`);
                element.style.setProperty('--parallax-y', `${offsetY}px`);
            });
        });
        
        this.ticking = false;
    }
    
    // Method to enable/disable parallax
    setEnabled(enabled) {
        if (enabled) {
            this.addEventListeners();
        } else {
            // Remove event listeners and reset transforms
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
            
            // Reset all parallax transforms
            this.layers.forEach((layer) => {
                layer.elements.forEach(element => {
                    element.style.setProperty('--parallax-x', '0px');
                    element.style.setProperty('--parallax-y', '0px');
                });
            });
        }
    }
}

// Initialize parallax system when DOM is ready
let parallaxSystem;

document.addEventListener('DOMContentLoaded', () => {
    parallaxSystem = new ParallaxSystem();
});

// Export for potential external control
window.ParallaxSystem = ParallaxSystem; 