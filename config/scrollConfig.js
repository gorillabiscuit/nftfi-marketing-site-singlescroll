// Global Scroll Configuration for NFTfi Marketing Site
// Centralized configuration for consistent scroll behavior across all sections

export const SCROLL_CONFIG = {
    // Base scroll speed configuration
    baseSpeed: 1000, // Base pixels per second for scroll calculations
    pinningSpeed: 0.8, // Speed multiplier for pinned sections (0.8 = 80% of base speed)
    smoothDuration: 1.2, // ScrollSmoother catch-up duration in seconds
    
    // ScrollSmoother specific settings
    smoother: {
        smooth: 1.2, // Reduced from 2 for more responsive feel
        effects: true, // Enable parallax effects
        normalizeScroll: true, // Critical for consistent behavior
        ignoreMobileResize: true,
        smoothTouch: 0.1, // Touch device smoothing
        ease: "power2.out", // Smoother easing curve
        preventDefault: false,
        syncInterval: 60,
        speed: 1.0 // Global speed multiplier
    },
    
    // ScrollTrigger pinning settings
    pinning: {
        anticipatePin: 0.5, // Reduced anticipation for smoother transitions
        pinSpacing: true, // Ensure proper spacing between pinned sections
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true
    },
    
    // Section-specific speed multipliers
    sectionSpeeds: {
        section1: 1.0, // Hero section - normal speed
        section2: 0.9, // Key metrics - slightly slower for readability
        section3: 1.0, // Dashboard - normal speed
        section4: 0.8, // Pebble animation - slower for dramatic effect
        section5: 0.9, // Testimonials - slightly slower for reading
        section6: 0.8, // Title animation - slower for impact
        section7: 1.0  // Final CTA - normal speed
    },
    
    // Viewport-based calculations
    viewport: {
        useViewportUnits: true, // Use vh/vw units for responsive calculations
        minScrollDistance: 300, // Minimum scroll distance in pixels
        maxScrollDistance: 2000, // Maximum scroll distance in pixels
        mobileSpeedMultiplier: 0.7, // Slower on mobile devices
        tabletSpeedMultiplier: 0.85, // Slightly slower on tablets
        desktopSpeedMultiplier: 1.0 // Full speed on desktop
    },
    
    // Performance settings
    performance: {
        enableMonitoring: true, // Enable scroll performance monitoring
        targetFPS: 60, // Target frames per second
        scrollLatencyThreshold: 16, // Maximum acceptable scroll latency in ms
        enableEmergencyDisable: true // Allow emergency disabling if performance drops
    },
    
    // Debug settings
    debug: {
        enabled: false, // Set to true for development
        showScrollMarkers: false, // Show ScrollTrigger markers
        logScrollEvents: false, // Log scroll events to console
        showPerformanceStats: false // Display performance statistics
    }
};

// Helper function to get section-specific speed
export function getSectionSpeed(sectionNumber) {
    const sectionKey = `section${sectionNumber}`;
    return SCROLL_CONFIG.sectionSpeeds[sectionKey] || 1.0;
}

// Helper function to calculate normalized scroll distance
export function calculateScrollDistance(sectionElement, baseDistance, sectionNumber) {
    if (!sectionElement) return baseDistance;
    
    const sectionSpeed = getSectionSpeed(sectionNumber);
    const viewportHeight = window.innerHeight;
    const sectionHeight = sectionElement.offsetHeight;
    
    // Use viewport-relative calculations for consistency
    const viewportRatio = sectionHeight / viewportHeight;
    const normalizedDistance = viewportRatio * SCROLL_CONFIG.baseSpeed * sectionSpeed;
    
    // Clamp between min and max values
    const clampedDistance = Math.max(
        SCROLL_CONFIG.viewport.minScrollDistance,
        Math.min(normalizedDistance, SCROLL_CONFIG.viewport.maxScrollDistance)
    );
    
    return Math.round(clampedDistance);
}

// Helper function to get device-specific speed multiplier
export function getDeviceSpeedMultiplier() {
    const width = window.innerWidth;
    
    if (width < 768) {
        return SCROLL_CONFIG.viewport.mobileSpeedMultiplier;
    } else if (width < 1024) {
        return SCROLL_CONFIG.viewport.tabletSpeedMultiplier;
    } else {
        return SCROLL_CONFIG.viewport.desktopSpeedMultiplier;
    }
}

// Helper function to get final scroll speed for a section
export function getFinalScrollSpeed(sectionNumber) {
    const sectionSpeed = getSectionSpeed(sectionNumber);
    const deviceMultiplier = getDeviceSpeedMultiplier();
    return sectionSpeed * deviceMultiplier;
}
