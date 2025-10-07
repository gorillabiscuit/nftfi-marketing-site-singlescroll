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

// Pebble positioning for Section 4 (Three.js world-space offsets and scale)
// Units are world units relative to current baseline position/scale
export const SECTION4_PEBBLE = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: 0, y: 1.5, z: 0 },
        scale: 1.4
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: 0.0, y: 1.5, z: 0 },
        scale: 1.6
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: -3.5, y: 0, z: 0 },
        scale: 1.75
    },
    [BREAKPOINT_NAMES.LARGE]: {
        position: { x: -3.5, y: 0, z: 0 },  // Keep same as desktop
        scale: 1.75  // Keep same as desktop
    }
};

// Pebble rotation for Section 4 - 45 degree rotation on different axes
// Change the axis (x, y, z) to test which one gives the desired effect
export const SECTION4_PEBBLE_ROTATION = {
    enabled: true,
    axis: 'x', // Change this to 'x', 'y', or 'z' to test different axes
    degrees: 0, // 45 degree rotation
    // You can also test different angles: 30, 60, 90, etc.
};

// Helper function to easily change rotation for testing
// Usage: In browser console, run: window.setPebbleRotation('x', 45)
export function setPebbleRotation(axis, degrees) {
    if (typeof axis !== 'string' || !['x', 'y', 'z'].includes(axis.toLowerCase())) {
        console.error('Invalid axis. Use "x", "y", or "z"');
        return;
    }
    if (typeof degrees !== 'number' || degrees < 0 || degrees > 360) {
        console.error('Invalid degrees. Use a number between 0 and 360');
        return;
    }
    
    SECTION4_PEBBLE_ROTATION.axis = axis.toLowerCase();
    SECTION4_PEBBLE_ROTATION.degrees = degrees;
    
    console.log(`[Section 4] Rotation updated: ${degrees}° on ${axis.toUpperCase()}-axis`);
    console.log('Refresh the page to see the changes, or scroll to Section 4');
}

// Continuous Y spin (degrees per second) independent of scroll
export const SECTION4_PEBBLE_SPIN = {
    enabled: false, // Disabled - no Y-axis animation
    degPerSecond: 24,
    // Extra spin impulse when middle items appear
    boostDegPerSecond: 1000,
    boostDecayPerSecond: 750
};

// Continuous X-axis wobble (sinusoidal) to accompany base Y spin
export const SECTION4_PEBBLE_WOBBLE = {
    enabled: false, // Disabled to prevent overriding static X rotation
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
