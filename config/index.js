// Central Configuration Export Hub for NFTfi Marketing Site
// Single import point for all configuration modules

// Breakpoint system (foundational - imported by other configs)
export * from './breakpoints.js';

// Core 3D rendering and global settings
export * from './core.js';

// Section-specific configurations
export * from './section1.js';
export * from './section2.js';
export * from './section3.js';
export * from './section4.js';
export * from './section5.js';
export * from './section6.js';

// Global scroll configuration
export * from './scrollConfig.js';

// Legacy compatibility exports for existing imports
// These maintain backward compatibility while the codebase transitions

// Re-export commonly used configs with their original names
export { TARGET_CONFIG, ANIMATION_STATES, HERO_BUTTON_STROKE_EFFECTS } from './section1.js';
export { GRID_STATES, RECT_STATES, SECTION2_TIMINGS, SECTION2_SCROLL, UNIVERSAL_BLOCKS } from './section2.js';
export { 
    SECTION3, 
    SECTION3_SCROLL, 
    SECTION3_CONTAINER,
    HERO_LOOPER, 
    DASHBOARD_SVG,
    SECTION3_ARROWS, 
    SECTION3_ARROWS_DEBUG, 
    SECTION3_ARROWS_VISIBLE_ZERO, 
    SECTION3_ARROWS_ENABLED,
    WHITE_SPHERE_POSITIONS 
} from './section3.js';
export { 
    SECTION4_LAYOUT, 
    SECTION4_PEBBLE, 
    SECTION4_COORDINATE_SYSTEM,
    SECTION4_PEBBLE_ROTATION,
    SECTION4_AXES_HELPER,
    setPebbleRotation,
    toggleAxesHelper,
    setAxesSize,
    SECTION4_PEBBLE_SPIN, 
    SECTION4_PEBBLE_WOBBLE, 
    SECTION4_TIMINGS, 
    SECTION4_SCROLL 
} from './section4.js';
export { SECTION5_CONFIG, SECTION5_LAYOUT } from './section5.js';
export { SECTION6_TIMINGS, SECTION6_SCROLL, SECTION6_CONTAINER } from './section6.js';
export { 
    SHADER_DEFAULTS, 
    CAMERA_CONFIG, 
    RENDERER_CONFIG, 
    ANIMATION_CONFIG, 
    MODEL_CONFIG, 
    PLANE_CONFIG 
} from './core.js';
