// Centralized Breakpoint Constants for NFTfi Marketing Site
// Single source of truth for all breakpoint values across CSS, JavaScript, and configuration

/**
 * WORLD-CLASS BREAKPOINT SYSTEM
 * =============================
 * 
 * Based on industry best practices from Tailwind CSS, CSS-Tricks, and modern responsive design patterns.
 * Content-driven breakpoints that adapt naturally to layout needs rather than specific devices.
 * 
 * This system provides consistent breakpoint values across:
 * - CSS media queries (@media queries)
 * - JavaScript device detection (breakpointManager.js)
 * - Configuration objects (animation states, layouts, etc.)
 * - Three.js responsive positioning and scaling
 * 
 * BREAKPOINT DEFINITIONS (Content-Driven):
 * - MOBILE: ≤ 600px     - Small to large phones, compact content
 * - TABLET: 601-900px   - Large phones, tablets, narrow laptops
 * - DESKTOP: 901-1200px - Standard laptops, small desktop monitors  
 * - LARGE: ≥ 1201px     - Large desktop monitors, wide screens
 * 
 * Benefits:
 * - No boundary conflicts or 1px gaps
 * - Content naturally breaks at these points
 * - Future-proof for new device sizes
 * - Aligns with industry standards
 */

// Breakpoint values in pixels (Industry Standard)
export const BREAKPOINT_VALUES = {
    MOBILE: 600,
    TABLET: 900, 
    DESKTOP: 1200,
    LARGE: 1800  // Large desktop and ultra-wide monitors
};

// Breakpoint names as constants to prevent typos and enable refactoring
export const BREAKPOINT_NAMES = {
    MOBILE: 'mobile',
    TABLET: 'tablet', 
    DESKTOP: 'desktop',
    LARGE: 'large'
};

// CSS custom property names (for use in CSS and JavaScript)
export const BREAKPOINT_CSS_VARS = {
    MOBILE: '--mobile',
    TABLET: '--tablet',
    DESKTOP: '--desktop', 
    LARGE: '--large'
};

// Helper function to get breakpoint value by name
export function getBreakpointValue(breakpointName) {
    const nameMap = {
        [BREAKPOINT_NAMES.MOBILE]: BREAKPOINT_VALUES.MOBILE,
        [BREAKPOINT_NAMES.TABLET]: BREAKPOINT_VALUES.TABLET,
        [BREAKPOINT_NAMES.DESKTOP]: BREAKPOINT_VALUES.DESKTOP,
        [BREAKPOINT_NAMES.LARGE]: BREAKPOINT_VALUES.LARGE
    };
    
    return nameMap[breakpointName] || BREAKPOINT_VALUES.DESKTOP;
}

// Helper function to determine current breakpoint from window width
export function getCurrentBreakpointName(width) {
    if (typeof width === 'undefined') {
        width = window.innerWidth;
    }
    if (width <= BREAKPOINT_VALUES.MOBILE) return BREAKPOINT_NAMES.MOBILE;
    if (width <= BREAKPOINT_VALUES.TABLET) return BREAKPOINT_NAMES.TABLET;
    if (width <= BREAKPOINT_VALUES.DESKTOP) return BREAKPOINT_NAMES.DESKTOP;
    return BREAKPOINT_NAMES.LARGE;
}

// Media query strings for use in CSS-in-JS or dynamic styles
export const MEDIA_QUERIES = {
    MOBILE: `(max-width: ${BREAKPOINT_VALUES.MOBILE}px)`,
    TABLET: `(min-width: ${BREAKPOINT_VALUES.MOBILE + 1}px) and (max-width: ${BREAKPOINT_VALUES.TABLET}px)`,
    DESKTOP: `(min-width: ${BREAKPOINT_VALUES.TABLET + 1}px) and (max-width: ${BREAKPOINT_VALUES.DESKTOP}px)`,
    LARGE: `(min-width: ${BREAKPOINT_VALUES.DESKTOP + 1}px)`,
    
    // Convenience queries
    MOBILE_UP: `(min-width: ${BREAKPOINT_VALUES.MOBILE + 1}px)`,
    TABLET_UP: `(min-width: ${BREAKPOINT_VALUES.TABLET + 1}px)`,
    DESKTOP_UP: `(min-width: ${BREAKPOINT_VALUES.DESKTOP + 1}px)`,
    
    MOBILE_DOWN: `(max-width: ${BREAKPOINT_VALUES.MOBILE}px)`,
    TABLET_DOWN: `(max-width: ${BREAKPOINT_VALUES.TABLET}px)`,
    DESKTOP_DOWN: `(max-width: ${BREAKPOINT_VALUES.DESKTOP}px)`
};

// Export all breakpoint names as an array for iteration
export const ALL_BREAKPOINT_NAMES = Object.values(BREAKPOINT_NAMES);

// Legacy compatibility - maps to the old breakpoint system (DEPRECATED - will be removed)
export const LEGACY_BREAKPOINTS = {
    mobile: 768,    // Old mobile was 768px (DEPRECATED)
    tablet: 1024,   // Old tablet was 1024px (DEPRECATED)
    desktop: 1024   // Old desktop was 1024px (DEPRECATED)
};
