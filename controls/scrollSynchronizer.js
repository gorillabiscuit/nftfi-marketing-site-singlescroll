// Scroll Synchronization Module for NFTfi Marketing Site
// Safely integrates ScrollSmoother with existing ScrollTrigger system
// WITHOUT breaking Three.js animations or performance

import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register the ScrollSmoother plugin with GSAP
gsap.registerPlugin(ScrollSmoother);

// Global state
let smoother = null;
let isInitialized = false;
let isEnabled = false;
let performanceMonitor = null;

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.fpsHistory = [];
        this.scrollLatencyHistory = [];
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.lastScrollTime = performance.now();
    }

    startFrame() {
        const now = performance.now();
        const delta = now - this.lastFrameTime;
        
        if (delta > 0) {
            const fps = 1000 / delta;
            this.fpsHistory.push(fps);
            
            // Keep only last 60 frames for rolling average
            if (this.fpsHistory.length > 60) {
                this.fpsHistory.shift();
            }
        }
        
        this.lastFrameTime = now;
        this.frameCount++;
    }

    recordScrollLatency() {
        const now = performance.now();
        const latency = now - this.lastScrollTime;
        this.scrollLatencyHistory.push(latency);
        
        // Keep only last 30 scroll events
        if (this.scrollLatencyHistory.length > 30) {
            this.scrollLatencyHistory.shift();
        }
        
        this.lastScrollTime = now;
    }

    getAverageFPS() {
        if (this.fpsHistory.length === 0) return 0;
        const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
        return Math.round(sum / this.fpsHistory.length);
    }

    getAverageScrollLatency() {
        if (this.scrollLatencyHistory.length === 0) return 0;
        const sum = this.scrollLatencyHistory.reduce((a, b) => a + b, 0);
        return Math.round(sum / this.scrollLatencyHistory.length);
    }

    getPerformanceReport() {
        return {
            currentFPS: this.getAverageFPS(),
            currentScrollLatency: this.getAverageScrollLatency(),
            frameCount: this.frameCount,
            isHealthy: this.getAverageFPS() >= 55 // Allow 5fps drop
        };
    }
}

/**
 * Initialize ScrollSmoother with safe configuration
 * This function does NOT interfere with existing ScrollTrigger
 */
export function initializeScrollSmoother() {
    if (isInitialized) {
        console.log('ScrollSmoother already initialized');
        return smoother;
    }

    try {
        // Check if the smooth-content element exists
        const smoothContent = document.querySelector("#smooth-content");
        if (!smoothContent) {
            console.warn('ScrollSmoother: #smooth-content element not found, skipping initialization');
            return null;
        }

        // Create ScrollSmoother with SAFE configuration
        // Key: We're NOT configuring ScrollTrigger to use this
        smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper", // Use the wrapper div
            content: "#smooth-content", // Use the content div
            smooth: 1.2, // Moderate smoothness
            effects: false, // Disable effects to prevent interference
            normalizeScroll: false, // Keep native scroll behavior
            ignoreMobileResize: true,
            smoothTouch: 0.1, // Minimal touch smoothness
            ease: "power1.out", // Subtle easing
            // Critical: Don't let ScrollSmoother control scroll events
            preventDefault: false,
            // Don't interfere with existing scroll behavior
            syncInterval: 60
        });

        // Initialize performance monitor
        performanceMonitor = new PerformanceMonitor();

        // Start with ScrollSmoother ENABLED by default
        smoother.paused(false);
        isEnabled = true;
        
        isInitialized = true;
        console.log('ScrollSmoother initialized and enabled by default');

        return smoother;

    } catch (error) {
        console.warn('ScrollSmoother initialization failed, continuing with native scroll:', error);
        smoother = null;
        return null;
    }
}

/**
 * Enable ScrollSmoother smooth scrolling
 * This function activates the visual smoothness without breaking existing system
 */
export function enableScrollSmoother() {
    if (!smoother || !isInitialized) {
        console.warn('ScrollSmoother not initialized, cannot enable');
        return false;
    }

    try {
        // Unpause ScrollSmoother to enable smooth scrolling
        smoother.paused(false);
        isEnabled = true;
        
        console.log('ScrollSmoother enabled - smooth scrolling active');
        return true;

    } catch (error) {
        console.error('Failed to enable ScrollSmoother:', error);
        return false;
    }
}

/**
 * Disable ScrollSmoother and return to native scrolling
 * This function provides a safe fallback
 */
export function disableScrollSmoother() {
    if (!smoother || !isInitialized) {
        return false;
    }

    try {
        // Pause ScrollSmoother to disable smooth scrolling
        smoother.paused(true);
        isEnabled = false;
        
        console.log('ScrollSmoother disabled - native scrolling active');
        return true;

    } catch (error) {
        console.error('Failed to disable ScrollSmoother:', error);
        return false;
    }
}



/**
 * Get current ScrollSmoother status
 */
export function getScrollSmootherStatus() {
    return {
        isInitialized,
        isEnabled,
        smoother: smoother ? 'active' : 'inactive',
        performance: performanceMonitor ? performanceMonitor.getPerformanceReport() : null
    };
}

/**
 * Performance monitoring functions for integration with animation loop
 */
export function startPerformanceFrame() {
    if (performanceMonitor) {
        performanceMonitor.startFrame();
    }
}

export function recordScrollEvent() {
    if (performanceMonitor) {
        performanceMonitor.recordScrollLatency();
    }
}

/**
 * Clean up ScrollSmoother when needed
 */
export function cleanupScrollSmoother() {
    if (smoother) {
        try {
            smoother.kill();
            smoother = null;
        } catch (error) {
            console.warn('Error cleaning up ScrollSmoother:', error);
        }
    }
    
    isInitialized = false;
    isEnabled = false;
    performanceMonitor = null;
    
    console.log('ScrollSmoother cleaned up');
}

/**
 * Test function to verify ScrollSmoother is working without interference
 */
export function testScrollSmoother() {
    if (!smoother) {
        console.log('ScrollSmoother test: Not initialized');
        return false;
    }

    try {
        // Test basic functionality
        const status = getScrollSmootherStatus();
        console.log('ScrollSmoother test results:', status);
        
        // Test if ScrollSmoother is actually active
        console.log('ScrollSmoother instance:', smoother);
        console.log('Is paused:', smoother.paused());
        console.log('Progress:', smoother.progress);
        console.log('ScrollTop:', smoother.scrollTop());
        
        // Test performance
        if (performanceMonitor) {
            const perf = performanceMonitor.getPerformanceReport();
            console.log('Performance test:', perf);
            
            // Alert if performance is degraded
            if (!perf.isHealthy) {
                console.warn('⚠️ Performance degradation detected! Consider disabling ScrollSmoother');
                return false;
            }
        }
        
        return true;

    } catch (error) {
        console.error('ScrollSmoother test failed:', error);
        return false;
    }
}

/**
 * Emergency disable function for critical performance issues
 */
export function emergencyDisable() {
    console.warn('🚨 Emergency disabling ScrollSmoother due to performance issues');
    disableScrollSmoother();
    
    // Force cleanup if needed
    if (smoother) {
        cleanupScrollSmoother();
    }
    
    return true;
}
