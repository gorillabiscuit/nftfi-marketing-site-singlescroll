// Scroll Speed Manager for NFTfi Marketing Site
// Centralized controller for consistent scroll behavior across all sections

import { SCROLL_CONFIG } from '../config/scrollConfig.js';

class ScrollSpeedManager {
    constructor() {
        this.baseSpeed = SCROLL_CONFIG.baseSpeed;
        this.currentSpeed = 1.0;
        this.smoother = null;
        this.performanceMonitor = null;
        this.isInitialized = false;
        this.sectionElements = new Map();
        this.scrollTriggers = new Map();
        
        // Performance tracking
        this.performanceData = {
            averageFPS: 60,
            scrollLatency: 0,
            lastScrollTime: 0,
            frameCount: 0,
            isHealthy: true
        };
        
        // Debug mode
        this.debugMode = SCROLL_CONFIG.debug.enabled;
        
        console.log('ScrollSpeedManager initialized with base speed:', this.baseSpeed);
    }

    /**
     * Initialize the scroll speed manager with ScrollSmoother reference
     * @param {Object} smoother - ScrollSmoother instance
     */
    initialize(smoother) {
        this.smoother = smoother;
        this.isInitialized = true;
        
        if (this.debugMode) {
            console.log('ScrollSpeedManager initialized with ScrollSmoother');
        }
        
        return this;
    }

    /**
     * Register a section element for speed management
     * @param {number} sectionNumber - Section number (1-7)
     * @param {HTMLElement} element - Section DOM element
     */
    registerSection(sectionNumber, element) {
        if (!element) {
            console.warn(`ScrollSpeedManager: Section ${sectionNumber} element not found`);
            return;
        }
        
        this.sectionElements.set(sectionNumber, element);
        
        if (this.debugMode) {
            console.log(`ScrollSpeedManager: Registered section ${sectionNumber}`, element);
        }
    }

    /**
     * Calculate normalized scroll distance for a section
     * @param {number} sectionNumber - Section number (1-7)
     * @param {number} originalDistance - Original scroll distance
     * @param {Object} options - Additional options
     * @returns {number} Normalized scroll distance
     */
    normalizeSpeed(sectionNumber, originalDistance, options = {}) {
        const sectionElement = this.sectionElements.get(sectionNumber);
        if (!sectionElement) {
            console.warn(`ScrollSpeedManager: Section ${sectionNumber} not registered, using original distance`);
            return originalDistance;
        }

        // Get section-specific speed multiplier
        const sectionSpeed = this.getSectionSpeed(sectionNumber);
        
        // Get device-specific speed multiplier
        const deviceMultiplier = this.getDeviceSpeedMultiplier();
        
        // Calculate viewport-based distance
        const viewportDistance = this.calculateViewportDistance(sectionElement, sectionNumber);
        
        // Apply all multipliers
        const finalDistance = viewportDistance * sectionSpeed * deviceMultiplier * this.currentSpeed;
        
        // Clamp between min and max values
        const clampedDistance = Math.max(
            SCROLL_CONFIG.viewport.minScrollDistance,
            Math.min(finalDistance, SCROLL_CONFIG.viewport.maxScrollDistance)
        );
        
        const result = Math.round(clampedDistance);
        
        if (this.debugMode) {
            console.log(`ScrollSpeedManager: Section ${sectionNumber} speed calculation:`, {
                originalDistance,
                viewportDistance,
                sectionSpeed,
                deviceMultiplier,
                currentSpeed: this.currentSpeed,
                finalDistance: result
            });
        }
        
        return result;
    }

    /**
     * Get section-specific speed multiplier
     * @param {number} sectionNumber - Section number (1-7)
     * @returns {number} Speed multiplier
     */
    getSectionSpeed(sectionNumber) {
        const sectionKey = `section${sectionNumber}`;
        return SCROLL_CONFIG.sectionSpeeds[sectionKey] || 1.0;
    }

    /**
     * Get device-specific speed multiplier
     * @returns {number} Device speed multiplier
     */
    getDeviceSpeedMultiplier() {
        const width = window.innerWidth;
        
        if (width < 768) {
            return SCROLL_CONFIG.viewport.mobileSpeedMultiplier;
        } else if (width < 1024) {
            return SCROLL_CONFIG.viewport.tabletSpeedMultiplier;
        } else {
            return SCROLL_CONFIG.viewport.desktopSpeedMultiplier;
        }
    }

    /**
     * Calculate viewport-based scroll distance
     * @param {HTMLElement} element - Section element
     * @param {number} sectionNumber - Section number
     * @returns {number} Viewport-based distance
     */
    calculateViewportDistance(element, sectionNumber) {
        const viewportHeight = window.innerHeight;
        const sectionHeight = element.offsetHeight;
        
        // Use viewport ratio for responsive calculations
        const viewportRatio = sectionHeight / viewportHeight;
        
        // Base distance calculation
        let baseDistance = viewportRatio * this.baseSpeed;
        
        // Special handling for different section types
        switch (sectionNumber) {
            case 2: // Key metrics - content-based
                baseDistance = Math.max(baseDistance, 800); // Minimum for readability
                break;
            case 4: // Pebble animation - longer for dramatic effect
                baseDistance = Math.max(baseDistance, 1200);
                break;
            case 5: // Testimonials - content-dependent
                baseDistance = Math.max(baseDistance, 1000);
                break;
            case 6: // Title animation - medium length
                baseDistance = Math.max(baseDistance, 900);
                break;
            default:
                // Use calculated viewport distance
                break;
        }
        
        return baseDistance;
    }

    /**
     * Update global scroll speed
     * @param {number} multiplier - Speed multiplier (0.5 = half speed, 2.0 = double speed)
     */
    updateGlobalSpeed(multiplier) {
        this.currentSpeed = Math.max(0.1, Math.min(multiplier, 3.0)); // Clamp between 0.1x and 3.0x
        
        if (this.smoother) {
            // Update ScrollSmoother speed if available
            try {
                this.smoother.smooth(this.smoother.smooth() * (multiplier / this.currentSpeed));
            } catch (error) {
                console.warn('ScrollSpeedManager: Could not update ScrollSmoother speed:', error);
            }
        }
        
        if (this.debugMode) {
            console.log('ScrollSpeedManager: Global speed updated to:', this.currentSpeed);
        }
    }

    /**
     * Register a ScrollTrigger for monitoring
     * @param {number} sectionNumber - Section number
     * @param {Object} scrollTrigger - ScrollTrigger instance
     */
    registerScrollTrigger(sectionNumber, scrollTrigger) {
        this.scrollTriggers.set(sectionNumber, scrollTrigger);
        
        if (this.debugMode) {
            console.log(`ScrollSpeedManager: Registered ScrollTrigger for section ${sectionNumber}`);
        }
    }

    /**
     * Refresh all registered ScrollTriggers
     */
    refreshScrollTriggers() {
        if (this.debugMode) {
            console.log('ScrollSpeedManager: Refreshing all ScrollTriggers');
        }
        
        // Temporarily disable ScrollSmoother if available
        if (this.smoother) {
            this.smoother.paused(true);
        }
        
        // Refresh all ScrollTriggers
        this.scrollTriggers.forEach((trigger, sectionNumber) => {
            try {
                trigger.refresh();
                if (this.debugMode) {
                    console.log(`ScrollSpeedManager: Refreshed ScrollTrigger for section ${sectionNumber}`);
                }
            } catch (error) {
                console.warn(`ScrollSpeedManager: Failed to refresh ScrollTrigger for section ${sectionNumber}:`, error);
            }
        });
        
        // Re-enable ScrollSmoother
        if (this.smoother) {
            this.smoother.paused(false);
        }
    }

    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        if (!SCROLL_CONFIG.performance.enableMonitoring) return;
        
        this.performanceMonitor = setInterval(() => {
            this.updatePerformanceData();
        }, 1000); // Update every second
        
        if (this.debugMode) {
            console.log('ScrollSpeedManager: Performance monitoring started');
        }
    }

    /**
     * Stop performance monitoring
     */
    stopPerformanceMonitoring() {
        if (this.performanceMonitor) {
            clearInterval(this.performanceMonitor);
            this.performanceMonitor = null;
            
            if (this.debugMode) {
                console.log('ScrollSpeedManager: Performance monitoring stopped');
            }
        }
    }

    /**
     * Update performance data
     */
    updatePerformanceData() {
        // This would integrate with the existing performance monitor
        // For now, we'll use a simple implementation
        const now = performance.now();
        const timeSinceLastScroll = now - this.performanceData.lastScrollTime;
        
        // Simple health check
        this.performanceData.isHealthy = timeSinceLastScroll < 1000; // Consider healthy if scrolled within last second
        
        if (this.debugMode && !this.performanceData.isHealthy) {
            console.warn('ScrollSpeedManager: Performance may be degraded');
        }
    }

    /**
     * Get current performance data
     * @returns {Object} Performance data
     */
    getPerformanceData() {
        return { ...this.performanceData };
    }

    /**
     * Emergency disable - stops all scroll management
     */
    emergencyDisable() {
        console.warn('ScrollSpeedManager: Emergency disable activated');
        
        this.stopPerformanceMonitoring();
        this.currentSpeed = 1.0;
        
        if (this.smoother) {
            try {
                this.smoother.paused(true);
            } catch (error) {
                console.warn('ScrollSpeedManager: Could not pause ScrollSmoother:', error);
            }
        }
    }

    /**
     * Get debug information
     * @returns {Object} Debug information
     */
    getDebugInfo() {
        return {
            isInitialized: this.isInitialized,
            currentSpeed: this.currentSpeed,
            baseSpeed: this.baseSpeed,
            registeredSections: Array.from(this.sectionElements.keys()),
            registeredTriggers: Array.from(this.scrollTriggers.keys()),
            performanceData: this.getPerformanceData(),
            deviceMultiplier: this.getDeviceSpeedMultiplier()
        };
    }

    /**
     * Cleanup and destroy the manager
     */
    destroy() {
        this.stopPerformanceMonitoring();
        this.sectionElements.clear();
        this.scrollTriggers.clear();
        this.smoother = null;
        this.isInitialized = false;
        
        if (this.debugMode) {
            console.log('ScrollSpeedManager: Destroyed');
        }
    }
}

// Create and export singleton instance
const scrollSpeedManager = new ScrollSpeedManager();

export default scrollSpeedManager;
