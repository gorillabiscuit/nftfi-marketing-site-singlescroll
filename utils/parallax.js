// Parallax Mouse Movement System
// Handles smooth, performant parallax effects for multiple layers

class ParallaxSystem {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.isActive = false;
        this.layers = new Map();
        
        // Layer speed multipliers (inverse movement)
        this.layerSpeeds = {
            background: 0.1,  // Subtle background movement
            hero: 0.3,        // Medium hero movement
            text: 0.5         // Most responsive text/buttons
        };
        
        this.init();
    }
    
    init() {
        // Check if device supports touch (mobile/tablet)
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Only initialize on non-touch devices for better performance
        if (this.isTouchDevice) {
            console.log('Parallax disabled on touch device for performance');
            return;
        }
        
        // Throttled mouse event handler
        this.handleMouseMove = this.throttle(this.updateMousePosition.bind(this), 16); // 60fps
        this.handleResize = this.throttle(this.updateViewportCenter.bind(this), 100);
        
        // Add event listeners
        document.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('resize', this.handleResize);
        
        // Start animation loop
        this.animate();
    }
    
    // Throttle function for performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Update mouse position relative to viewport center
    updateMousePosition(e) {
        this.mouseX = (e.clientX - this.centerX) / this.centerX; // -1 to 1
        this.mouseY = (e.clientY - this.centerY) / this.centerY; // -1 to 1
        this.isActive = true;
    }
    
    // Update viewport center on resize
    updateViewportCenter() {
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
    }
    
    // Register a layer for parallax movement
    registerLayer(name, element, speed = null) {
        const layerSpeed = speed || this.layerSpeeds[name] || 0.3;
        
        this.layers.set(name, {
            element,
            speed: layerSpeed,
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
            originalTransform: element.style.transform || ''
        });
    }
    
    // Smooth interpolation for fluid movement
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    // Update layer transforms
    updateLayers() {
        this.layers.forEach((layer, name) => {
            // Calculate target position (inverse to mouse movement)
            const targetX = -this.mouseX * layer.speed * 50; // Max 50px movement
            const targetY = -this.mouseY * layer.speed * 50;
            
            // Smooth interpolation
            layer.currentX = this.lerp(layer.currentX, targetX, 0.1);
            layer.currentY = this.lerp(layer.currentY, targetY, 0.1);
            
            // Store original transform if not already stored
            if (!layer.originalTransform) {
                layer.originalTransform = layer.element.style.transform || '';
            }
            
            // Combine original transform with parallax transform
            const parallaxTransform = `translate3d(${layer.currentX}px, ${layer.currentY}px, 0)`;
            layer.element.style.transform = `${layer.originalTransform} ${parallaxTransform}`.trim();
            
            // Special handling for buttons within the layer to preserve hover effects
            const buttons = layer.element.querySelectorAll('.card');
            buttons.forEach(button => {
                // Preserve any existing button transforms (like hover effects)
                const buttonTransform = button.style.transform || '';
                if (buttonTransform && buttonTransform.includes('translateY')) {
                    // Keep the hover effect and add parallax
                    button.style.transform = `${buttonTransform} ${parallaxTransform}`.trim();
                }
            });
        });
    }
    
    // Main animation loop
    animate() {
        if (this.isActive) {
            this.updateLayers();
        }
        requestAnimationFrame(() => this.animate());
    }
    
    // Cleanup
    destroy() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);
        this.layers.clear();
    }
}

// Export for use in other modules
export default ParallaxSystem; 