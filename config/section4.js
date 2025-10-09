// Section 4 (Pebble/Assets) Configuration for NFTfi Marketing Site
// Contains pebble animation, layout positioning, timing, and scroll settings

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Center-anchored layout offsets for Section 4 per breakpoint
// Values are CSS percentages as strings (e.g., '0%', '15%', '-20%')
export const SECTION4_LAYOUT = {
    [BREAKPOINT_NAMES.MOBILE]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '0%',  y: '150%' }
    },
    [BREAKPOINT_NAMES.TABLET]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '0%', y: '200%' }
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '60%', y: '0%' }
    },
    [BREAKPOINT_NAMES.LARGE]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '60%', y: '0%' }  // Keep same as desktop
    }
};

// Vertical spacing between pebbles (adjustable) - ADJUST THIS ONE NUMBER TO CONTROL ALL SPACING
export const SECTION4_PEBBLE_VERTICAL_SPACING = 6.0; // World units between pebbles vertically

// Helper function to calculate pebble Y position based on index and spacing
const getPebbleY = (index) => {
    return -(index * SECTION4_PEBBLE_VERTICAL_SPACING);
};

// First pebble positioning for Section 4 (Three.js world-space offsets and scale)
// Y position auto-calculated: index 0 * spacing = 0
export const SECTION4_PEBBLE = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: -1.5, y: getPebbleY(0), z: 0 },  // Left side, top
        scale: 0.7
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: -1.5, y: getPebbleY(0), z: 0 },  // Left side, top
        scale: 0.8
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: -2.5, y: getPebbleY(0), z: 0 },  // Left side, top
        scale: 0.875
    },
    [BREAKPOINT_NAMES.LARGE]: {
        position: { x: -3, y: getPebbleY(0), z: 0 },  // Left side, top
        scale: 0.875
    }
};

// Second pebble positioning - auto-calculated: index 1 * spacing
export const SECTION4_PEBBLE2 = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: 1.5, y: getPebbleY(1), z: 0 },  // Right side
        scale: 0.7
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: 1.5, y: getPebbleY(1), z: 0 },  // Right side
        scale: 0.8
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: 2.5, y: getPebbleY(1), z: 0 },  // Right side
        scale: 0.875
    },
    [BREAKPOINT_NAMES.LARGE]: {
        position: { x: 3, y: getPebbleY(1), z: 0 },  // Right side
        scale: 0.875
    }
};

// Third pebble positioning - auto-calculated: index 2 * spacing
export const SECTION4_PEBBLE3 = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: -1.5, y: getPebbleY(2), z: 0 },  // Left side
        scale: 0.7
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: -1.5, y: getPebbleY(2), z: 0 },  // Left side
        scale: 0.8
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: -2.5, y: getPebbleY(2), z: 0 },  // Left side
        scale: 0.875
    },
    [BREAKPOINT_NAMES.LARGE]: {
        position: { x: -3, y: getPebbleY(2), z: 0 },  // Left side
        scale: 0.875
    }
};

// Fourth pebble positioning - auto-calculated: index 3 * spacing
export const SECTION4_PEBBLE4 = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: 1.5, y: getPebbleY(3), z: 0 },  // Right side
        scale: 0.7
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: 1.5, y: getPebbleY(3), z: 0 },  // Right side
        scale: 0.8
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: 2.5, y: getPebbleY(3), z: 0 },  // Right side
        scale: 0.875
    },
    [BREAKPOINT_NAMES.LARGE]: {
        position: { x: 3, y: getPebbleY(3), z: 0 },  // Right side
        scale: 0.875
    }
};

// Scroll parallax controls for pebbles
export const SECTION4_PEBBLE_SCROLL_PARAMS = {
    // Starting Y position (offscreen below viewport)
    // Lower (more negative) = start further down, appear later
    // Higher (less negative) = start closer, appear earlier
    startY: -15,  // Start well below viewport
    
    // Total upward travel distance as you scroll through Section 4
    // Larger value = more movement range, pebbles travel further
    // Smaller value = less movement, pebbles appear more static
    totalTravel: 35,  // Increased to bring pebbles all the way up
    
    // Scroll speed multiplier
    // 1.0 = pebbles move with scroll (appear locked to screen)
    // > 1.0 = pebbles move faster than scroll
    // < 1.0 = pebbles move slower than scroll (subtle parallax)
    scrollSpeed: 1.0,
    
    // 3D world to 2D screen pixel scale for text panels
    // This controls the overall scroll speed of text relative to pebbles
    // Adjust this to make text move at same speed as pebbles
    // Negative value needed because screen Y is inverted from 3D world Y
    worldToPixelScale: 0,
    
    // Text panel vertical spacing (in pixels)
    // This controls the distance between each text panel independently of pebble spacing
    // Adjust this to line up text with their corresponding pebbles
    textSpacingPixels: 450,  // Distance between each text panel
    
    // Text starting offset (in pixels)
    // This controls where text starts vertically (added to base position)
    // Positive = text starts higher up (appears earlier)
    // Negative = text starts lower down (appears later)
    textStartOffset: 0,  // Starting offset for all text panels
    
    // Text scroll speed (viewport height multiplier)
    // This controls how far text travels as you scroll through Section 4
    // Higher value = text scrolls faster/further
    // Lower value = text scrolls slower/less
    textTravelMultiplier: 1  // Text travels 1.5 viewports upward
};

// Continuous Y spin (degrees per second) independent of scroll
export const SECTION4_PEBBLE_SPIN = {
    enabled: false, // DISABLED for debugging
    degPerSecond: 24,
    // Extra spin impulse when middle items appear
    boostDegPerSecond: 50,
    boostDecayPerSecond: 750
};

// Continuous X-axis wobble (sinusoidal) to accompany base Y spin
export const SECTION4_PEBBLE_WOBBLE = {
    enabled: false, // DISABLED for debugging
    xAmplitudeDeg: 12,   // small tilt amplitude in degrees
    xFrequencyHz: 0.2   // cycles per second
};

// Section 4 timeline timings (fractions of pinned timeline 0..1 or seconds if needed)
export const SECTION4_TIMINGS = {
    // Use normalized fractions of the pinned duration (0..1)
    // Periods between phases
    periodA: 0.5, // before h2 fade-in
    h2FadeIn: 0.5,
    h2Show: 1,
    h2FadeOut: 0.5,
    periodB: .25, // after h2 fade-out
    pebbleIn: 2,
    periodC: 4, // before list begins
    // panel items (title+body per item)
    itemTitleIn: 1.0,
    itemBodyIn: 1.0,
    itemHold: 1.2,
    itemFadeOut: 0.8,
    periodBetweenItems: 0.6
};

// Section 4 scroll distance scaling (maps timeline duration to scroll length)
export const SECTION4_SCROLL = {
    pxPerUnit: 700 // increase to slow down overall scrub speed
};
