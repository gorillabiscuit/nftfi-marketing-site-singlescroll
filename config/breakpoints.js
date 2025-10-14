// Centralized Breakpoint Constants for NFTfi Marketing Site
// Single source of truth for all breakpoint values across CSS, JavaScript, and configuration

/**
 * WORLD-CLASS BREAKPOINT SYSTEM
 * =============================
 * 
 * Based on industry best practices from Tailwind CSS, Bootstrap, and modern responsive design patterns.
 * Content-driven breakpoints that adapt naturally to layout needs rather than specific devices.
 * 
 * This system provides consistent breakpoint values across:
 * - CSS media queries (@media queries)
 * - JavaScript device detection (breakpointManager.js)
 * - Configuration objects (animation states, layouts, etc.)
 * - Three.js responsive positioning and scaling
 * 
 * BREAKPOINT DEFINITIONS (Industry Standard):
 * - MOBILE: ≤ 600px           - Small to large phones, compact content
 * - TABLET: 601-900px         - Large phones, tablets, narrow laptops
 * - DESKTOP: 901-1200px       - Standard laptops, small desktop monitors
 * - DESKTOP_HD: 1201-1600px   - HD displays (1366x768, 1440x900)
 * - DESKTOP_XL: 1601-2000px   - Full HD displays (1920x1080)
 * - DESKTOP_2XL: ≥ 2001px     - QHD/2K displays (2560x1440+, ultra-wide)
 * 
 * Benefits:
 * - No boundary conflicts or 1px gaps
 * - Content naturally breaks at these points
 * - Granular control for desktop layouts
 * - Future-proof for new device sizes
 * - Aligns with industry standards (Tailwind xl/2xl naming)
 */

// Breakpoint values in pixels (Industry Standard - Tailwind-inspired)
export const BREAKPOINT_VALUES = {
    MOBILE: 600,
    TABLET: 900, 
    DESKTOP: 1200,
    DESKTOP_HD: 1600,   // HD displays (1366x768, 1440x900)
    DESKTOP_XL: 2000,   // Full HD (1920x1080)
    DESKTOP_2XL: 2560   // QHD/2K and ultra-wide (2560x1440+)
};

// Breakpoint names as constants to prevent typos and enable refactoring
export const BREAKPOINT_NAMES = {
    MOBILE: 'mobile',
    TABLET: 'tablet', 
    DESKTOP: 'desktop',
    DESKTOP_HD: 'desktop_hd',    // 1201px-1600px (HD: 1366x768, 1440x900)
    DESKTOP_XL: 'desktop_xl',    // 1601px-2000px (Full HD: 1920x1080)
    DESKTOP_2XL: 'desktop_2xl'   // 2001px+ (QHD/2K: 2560x1440, ultra-wide)
};

// CSS custom property names (for use in CSS and JavaScript)
export const BREAKPOINT_CSS_VARS = {
    MOBILE: '--mobile',
    TABLET: '--tablet',
    DESKTOP: '--desktop',
    DESKTOP_HD: '--desktop-hd',
    DESKTOP_XL: '--desktop-xl',
    DESKTOP_2XL: '--desktop-2xl'
};

// Helper function to get breakpoint value by name
export function getBreakpointValue(breakpointName) {
    const nameMap = {
        [BREAKPOINT_NAMES.MOBILE]: BREAKPOINT_VALUES.MOBILE,
        [BREAKPOINT_NAMES.TABLET]: BREAKPOINT_VALUES.TABLET,
        [BREAKPOINT_NAMES.DESKTOP]: BREAKPOINT_VALUES.DESKTOP,
        [BREAKPOINT_NAMES.DESKTOP_HD]: BREAKPOINT_VALUES.DESKTOP_HD,
        [BREAKPOINT_NAMES.DESKTOP_XL]: BREAKPOINT_VALUES.DESKTOP_XL,
        [BREAKPOINT_NAMES.DESKTOP_2XL]: BREAKPOINT_VALUES.DESKTOP_2XL
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
    if (width <= BREAKPOINT_VALUES.DESKTOP_HD) return BREAKPOINT_NAMES.DESKTOP_HD;
    if (width <= BREAKPOINT_VALUES.DESKTOP_XL) return BREAKPOINT_NAMES.DESKTOP_XL;
    return BREAKPOINT_NAMES.DESKTOP_2XL;
}

// Media query strings for use in CSS-in-JS or dynamic styles
export const MEDIA_QUERIES = {
    MOBILE: `(max-width: ${BREAKPOINT_VALUES.MOBILE}px)`,
    TABLET: `(min-width: ${BREAKPOINT_VALUES.MOBILE + 1}px) and (max-width: ${BREAKPOINT_VALUES.TABLET}px)`,
    DESKTOP: `(min-width: ${BREAKPOINT_VALUES.TABLET + 1}px) and (max-width: ${BREAKPOINT_VALUES.DESKTOP}px)`,
    DESKTOP_HD: `(min-width: ${BREAKPOINT_VALUES.DESKTOP + 1}px) and (max-width: ${BREAKPOINT_VALUES.DESKTOP_HD}px)`,
    DESKTOP_XL: `(min-width: ${BREAKPOINT_VALUES.DESKTOP_HD + 1}px) and (max-width: ${BREAKPOINT_VALUES.DESKTOP_XL}px)`,
    DESKTOP_2XL: `(min-width: ${BREAKPOINT_VALUES.DESKTOP_XL + 1}px)`,
    
    // Convenience queries
    MOBILE_UP: `(min-width: ${BREAKPOINT_VALUES.MOBILE + 1}px)`,
    TABLET_UP: `(min-width: ${BREAKPOINT_VALUES.TABLET + 1}px)`,
    DESKTOP_UP: `(min-width: ${BREAKPOINT_VALUES.DESKTOP + 1}px)`,
    DESKTOP_HD_UP: `(min-width: ${BREAKPOINT_VALUES.DESKTOP_HD + 1}px)`,
    DESKTOP_XL_UP: `(min-width: ${BREAKPOINT_VALUES.DESKTOP_XL + 1}px)`,
    
    MOBILE_DOWN: `(max-width: ${BREAKPOINT_VALUES.MOBILE}px)`,
    TABLET_DOWN: `(max-width: ${BREAKPOINT_VALUES.TABLET}px)`,
    DESKTOP_DOWN: `(max-width: ${BREAKPOINT_VALUES.DESKTOP}px)`,
    DESKTOP_HD_DOWN: `(max-width: ${BREAKPOINT_VALUES.DESKTOP_HD}px)`,
    DESKTOP_XL_DOWN: `(max-width: ${BREAKPOINT_VALUES.DESKTOP_XL}px)`
};

// Export all breakpoint names as an array for iteration
export const ALL_BREAKPOINT_NAMES = Object.values(BREAKPOINT_NAMES);

// Legacy compatibility - maps to the old breakpoint system (DEPRECATED - will be removed)
export const LEGACY_BREAKPOINTS = {
    mobile: 768,    // Old mobile was 768px (DEPRECATED)
    tablet: 1024,   // Old tablet was 1024px (DEPRECATED)
    desktop: 1024   // Old desktop was 1024px (DEPRECATED)
};
