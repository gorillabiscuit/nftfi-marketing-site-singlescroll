// Section 4 (Pebble/Assets) Configuration for NFTfi Marketing Site
// Contains pebble animation, layout positioning, timing, and scroll settings

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Center-anchored layout offsets for Section 4 per breakpoint
// Values are CSS percentages as strings (e.g., '0%', '15%', '-20%')
export const SECTION4_LAYOUT = {
    [BREAKPOINT_NAMES.MOBILE]: {
        title: { x: '0%', y: '-5%' },
        panel: { x: '0%',  y: '15%' }
    },
    [BREAKPOINT_NAMES.TABLET]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '-15%', y: '2%' }
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
        position: { x: -2.2, y: 0.1, z: 0 },
        scale: 1.4
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: -3.0, y: 0, z: 0 },
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

// Continuous Y spin (degrees per second) independent of scroll
export const SECTION4_PEBBLE_SPIN = {
    enabled: true,
    degPerSecond: 24,
    // Extra spin impulse when middle items appear
    boostDegPerSecond: 1000,
    boostDecayPerSecond: 750
};

// Continuous X-axis wobble (sinusoidal) to accompany base Y spin
export const SECTION4_PEBBLE_WOBBLE = {
    enabled: true,
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
