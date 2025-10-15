// Section 4 (Pebble/Assets) Configuration for NFTfi Marketing Site
// Contains pebble animation, layout positioning, timing, and scroll settings

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Vertical spacing between pebbles per breakpoint (adjustable)
// Smaller screens need tighter spacing, larger screens can spread out more
export const SECTION4_PEBBLE_VERTICAL_SPACING = {
    [BREAKPOINT_NAMES.MOBILE]: 5.0,      // Tighter spacing on mobile
    [BREAKPOINT_NAMES.TABLET]: 4.0,      // Moderate spacing on tablet
    [BREAKPOINT_NAMES.DESKTOP]: 6.0,     // Standard spacing on desktop
    [BREAKPOINT_NAMES.DESKTOP_HD]: 6.5,  // Slightly more on HD
    [BREAKPOINT_NAMES.DESKTOP_XL]: 6.0,  // More spacing on Full HD
    [BREAKPOINT_NAMES.DESKTOP_2XL]: 4.0  // Maximum spacing on 2K+
};

// Helper function to calculate pebble Y position based on index, breakpoint, and spacing
const getPebbleY = (index, breakpoint) => {
    const spacing = SECTION4_PEBBLE_VERTICAL_SPACING[breakpoint] || SECTION4_PEBBLE_VERTICAL_SPACING[BREAKPOINT_NAMES.DESKTOP];
    return -(index * spacing);
};

// First pebble positioning for Section 4 (Three.js world-space offsets and scale)
// Y position auto-calculated: index 0 * spacing[breakpoint] = 0 (always 0 for first pebble)
export const SECTION4_PEBBLE = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: -2.5, y: getPebbleY(0, BREAKPOINT_NAMES.MOBILE), z: 0 },  // Left side, top
        scale: 1.5
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: -2.5, y: getPebbleY(0, BREAKPOINT_NAMES.TABLET), z: 0 },  // Left side, top
        scale: 1.2
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: -3.5, y: getPebbleY(0, BREAKPOINT_NAMES.DESKTOP), z: 0 },  // Left side, top
        scale: 1.5
    },
    [BREAKPOINT_NAMES.DESKTOP_HD]: {
        position: { x: -4, y: getPebbleY(0, BREAKPOINT_NAMES.DESKTOP_HD), z: 0 },  // Left side, top (HD: 1366x768)
        scale: 1.8
    },
    [BREAKPOINT_NAMES.DESKTOP_XL]: {
        position: { x: -5, y: getPebbleY(0, BREAKPOINT_NAMES.DESKTOP_XL), z: 0 },  // Left side, top (Full HD: 1920x1080)
        scale: 1.95
    },
    [BREAKPOINT_NAMES.DESKTOP_2XL]: {
        position: { x: -3, y: getPebbleY(0, BREAKPOINT_NAMES.DESKTOP_2XL), z: 0 },  // Left side, top (QHD: 2560x1440)
        scale: 1.25
    }
};

// Second pebble positioning - auto-calculated: index 1 * spacing[breakpoint]
export const SECTION4_PEBBLE2 = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: 2.5, y: getPebbleY(1, BREAKPOINT_NAMES.MOBILE), z: 0 },  // Right side
        scale: 1.5
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: 2.5, y: getPebbleY(1, BREAKPOINT_NAMES.TABLET), z: 0 },  // Right side
        scale: 1.2
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: 3.5, y: getPebbleY(1, BREAKPOINT_NAMES.DESKTOP), z: 0 },  // Right side
        scale: 1.5
    },
    [BREAKPOINT_NAMES.DESKTOP_HD]: {
        position: { x: 4, y: getPebbleY(1, BREAKPOINT_NAMES.DESKTOP_HD), z: 0 },  // Right side (HD: 1366x768)
        scale: 1.8
    },
    [BREAKPOINT_NAMES.DESKTOP_XL]: {
        position: { x: 5, y: getPebbleY(1, BREAKPOINT_NAMES.DESKTOP_XL), z: 0 },  // Right side (Full HD: 1920x1080)
        scale: 1.95
    },
    [BREAKPOINT_NAMES.DESKTOP_2XL]: {
        position: { x: 3, y: getPebbleY(1, BREAKPOINT_NAMES.DESKTOP_2XL), z: 0 },  // Right side (QHD: 2560x1440)
        scale: 1.25
    }
};

// Third pebble positioning - auto-calculated: index 2 * spacing[breakpoint]
export const SECTION4_PEBBLE3 = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: -2.5, y: getPebbleY(2, BREAKPOINT_NAMES.MOBILE), z: 0 },  // Left side
        scale: 1.5
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: -2.5, y: getPebbleY(2, BREAKPOINT_NAMES.TABLET), z: 0 },  // Left side
        scale: 1.2
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: -3.5, y: getPebbleY(2, BREAKPOINT_NAMES.DESKTOP), z: 0 },  // Left side
        scale: 1.5
    },
    [BREAKPOINT_NAMES.DESKTOP_HD]: {
        position: { x: -4, y: getPebbleY(2, BREAKPOINT_NAMES.DESKTOP_HD), z: 0 },  // Left side (HD: 1366x768)
        scale: 1.8
    },
    [BREAKPOINT_NAMES.DESKTOP_XL]: {
        position: { x: -5, y: getPebbleY(2, BREAKPOINT_NAMES.DESKTOP_XL), z: 0 },  // Left side (Full HD: 1920x1080)
        scale: 1.95
    },
    [BREAKPOINT_NAMES.DESKTOP_2XL]: {
        position: { x: -3, y: getPebbleY(2, BREAKPOINT_NAMES.DESKTOP_2XL), z: 0 },  // Left side (QHD: 2560x1440)
        scale: 1.25
    }
};

// Fourth pebble positioning - auto-calculated: index 3 * spacing[breakpoint]
export const SECTION4_PEBBLE4 = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: 2.5, y: getPebbleY(3, BREAKPOINT_NAMES.MOBILE), z: 0 },  // Right side
        scale: 1.5
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: 2.5, y: getPebbleY(3, BREAKPOINT_NAMES.TABLET), z: 0 },  // Right side
        scale: 1.2
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: 3.5, y: getPebbleY(3, BREAKPOINT_NAMES.DESKTOP), z: 0 },  // Right side
        scale: 1.5
    },
    [BREAKPOINT_NAMES.DESKTOP_HD]: {
        position: { x: 4, y: getPebbleY(3, BREAKPOINT_NAMES.DESKTOP_HD), z: 0 },  // Right side (HD: 1366x768)
        scale: 1.8
    },
    [BREAKPOINT_NAMES.DESKTOP_XL]: {
        position: { x: 5, y: getPebbleY(3, BREAKPOINT_NAMES.DESKTOP_XL), z: 0 },  // Right side (Full HD: 1920x1080)
        scale: 1.95
    },
    [BREAKPOINT_NAMES.DESKTOP_2XL]: {
        position: { x: 4, y: getPebbleY(3, BREAKPOINT_NAMES.DESKTOP_2XL), z: 0 },  // Right side (QHD: 2560x1440)
        scale: 1.25
    }
};

// Section 4 container height (in viewport height units) per breakpoint
// Controls the visual scroll length of Section 4's content container
export const SECTION4_CONTAINER_HEIGHT = {
    [BREAKPOINT_NAMES.MOBILE]: 200,      // Slightly shorter on mobile
    [BREAKPOINT_NAMES.TABLET]: 130,
    [BREAKPOINT_NAMES.DESKTOP]: 200,
    [BREAKPOINT_NAMES.DESKTOP_HD]: 200,
    [BREAKPOINT_NAMES.DESKTOP_XL]: 200,
    [BREAKPOINT_NAMES.DESKTOP_2XL]: 140
};

// Scroll parallax controls for Section 4 (pebbles, text panels, and title)
// Breakpoint-specific scroll parameters for responsive behavior
export const SECTION4_PEBBLE_SCROLL_PARAMS = {
    [BREAKPOINT_NAMES.MOBILE]: {
        // === PEBBLE (3D MESH) CONTROLS ===
        pebbleStartY: -13,
        pebbleTotalTravel: 30,
        pebbleScrollSpeed: 1.35,
        
        // === TEXT PANEL CONTROLS ===
        textSpacingPixels: 300,
        textStartOffset: -100,
        textTravelMultiplier: 0.85,
        // Horizontal offsets from pebble to text (fractions of available space to container edge)
        // Higher value = text further from pebble
        textHorizontalOffsetLeft: 0.9,
        textHorizontalOffsetRight: 1.2,
        textPanelMinWidthPx: 200,
        textPanelMaxWidthPx: 200,
        textPanelGutterPx: 24,
        
        // === TITLE CONTROLS ===
        titleYOffset: -400,
        titleTravelMultiplier: 0.9,
        titleStartOffset: 0
    },
    [BREAKPOINT_NAMES.TABLET]: {
        // === PEBBLE (3D MESH) CONTROLS ===
        pebbleStartY: -16,
        pebbleTotalTravel: 33,
        pebbleScrollSpeed: 1.25,
        
        // === TEXT PANEL CONTROLS ===
        textSpacingPixels: 420,
        textStartOffset: -100,
        textTravelMultiplier: 1.4,
        textHorizontalOffsetLeft: 0.75,
        textHorizontalOffsetRight: 0.9,
        textPanelMinWidthPx: 300,
        textPanelMaxWidthPx: 350,
        textPanelGutterPx: 24,
        
        // === TITLE CONTROLS ===
        titleYOffset: -600,
        titleTravelMultiplier: 1.0,
        titleStartOffset: 0
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        // === PEBBLE (3D MESH) CONTROLS ===
        pebbleStartY: -16,
        pebbleTotalTravel: 35,
        pebbleScrollSpeed: 1.3,
        
        // === TEXT PANEL CONTROLS ===
        textSpacingPixels: 450,
        textStartOffset: 0,
        textTravelMultiplier: 1.5,
        textHorizontalOffsetLeft: 0.9,
        textHorizontalOffsetRight: 0.9,
        textPanelMinWidthPx: 320,
        textPanelMaxWidthPx: 440,
        textPanelGutterPx: 24,
        
        // === TITLE CONTROLS ===
        titleYOffset: -450,
        titleTravelMultiplier: 1.0,
        titleStartOffset: 0
    },
    [BREAKPOINT_NAMES.DESKTOP_HD]: {
        // === PEBBLE (3D MESH) CONTROLS ===
        pebbleStartY: -16,
        pebbleTotalTravel: 37,
        pebbleScrollSpeed: 1.3,
        
        // === TEXT PANEL CONTROLS ===
        textSpacingPixels: 530,
        textStartOffset: 0,
        textTravelMultiplier: 1.5,
        textHorizontalOffsetLeft: 0.75,  // HD displays (1366x768)
        textHorizontalOffsetRight: 0.75,
        textPanelMinWidthPx: 320,
        textPanelMaxWidthPx: 520,
        textPanelGutterPx: 24,
        
        // === TITLE CONTROLS ===
        titleYOffset: -400,
        titleTravelMultiplier: 1.0,
        titleStartOffset: 0
    },
    [BREAKPOINT_NAMES.DESKTOP_XL]: {
        // === PEBBLE (3D MESH) CONTROLS ===
        pebbleStartY: -16,
        pebbleTotalTravel: 35,
        pebbleScrollSpeed: 1.3,
        
        // === TEXT PANEL CONTROLS ===
        textSpacingPixels: 620,
        textStartOffset: 0,
        textTravelMultiplier: 1.5,
        textHorizontalOffsetLeft: 0.55,  // Full HD (1920x1080)
        textHorizontalOffsetRight: 0.55,
        textPanelMinWidthPx: 340,
        textPanelMaxWidthPx: 520,
        textPanelGutterPx: 24,
        
        // === TITLE CONTROLS ===
        titleYOffset: -500,
        titleTravelMultiplier: 1.0,
        titleStartOffset: 0
    },
    [BREAKPOINT_NAMES.DESKTOP_2XL]: {
        // === PEBBLE (3D MESH) CONTROLS ===
        pebbleStartY: -18,
        pebbleTotalTravel: 35,
        pebbleScrollSpeed: 1.3,
        
        // === TEXT PANEL CONTROLS ===
        textSpacingPixels: 520,
        textStartOffset: 0,
        textTravelMultiplier: 1.5,
        textHorizontalOffsetLeft: 0.45,  // QHD/2K (2560x1440+)
        textHorizontalOffsetRight: 0.45,
        textPanelMinWidthPx: 360,
        textPanelMaxWidthPx: 560,
        textPanelGutterPx: 28,
        
        // === TITLE CONTROLS ===
        titleYOffset: -700,
        titleTravelMultiplier: 1.0,
        titleStartOffset: 0
    }
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
