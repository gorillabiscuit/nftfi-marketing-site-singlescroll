// Centralized Breakpoint Constants for NFTfi Marketing Site
// Single source of truth for all breakpoint values across CSS, JavaScript, and configuration

/**
 * BREAKPOINT SYSTEM OVERVIEW
 * =========================
 * 
 * This system provides consistent breakpoint values across:
 * - CSS media queries (@media queries)
 * - JavaScript device detection (breakpointManager.js)
 * - Configuration objects (animation states, layouts, etc.)
 * - Three.js responsive positioning and scaling
 * 
 * BREAKPOINT DEFINITIONS:
 * - MOBILE: ≤ 480px    - Small mobile devices (iPhone SE, etc.)
 * - TABLET: 481-768px  - Large mobile/small tablet (iPhone 12, iPad mini)  
 * - DESKTOP: 769-1024px - Tablet/laptop (iPad, small laptops)
 * - LARGE: ≥ 1025px    - Desktop/large screens (monitors, large laptops)
 */

// Breakpoint values in pixels
export const BREAKPOINT_VALUES = {
    MOBILE: 480,
    TABLET: 768, 
    DESKTOP: 1024,
    LARGE: 1025  // Changed from 1200 to 1025 to eliminate gap
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

// Legacy compatibility - maps to the old breakpoint system used in breakpointManager.js
export const LEGACY_BREAKPOINTS = {
    mobile: BREAKPOINT_VALUES.TABLET,    // Old mobile was 768px
    tablet: BREAKPOINT_VALUES.DESKTOP,   // Old tablet was 1024px  
    desktop: BREAKPOINT_VALUES.DESKTOP   // Old desktop was 1024px
};
