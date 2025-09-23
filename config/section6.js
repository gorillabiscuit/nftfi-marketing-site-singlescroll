// Section 6 (Our Investors) Configuration for NFTfi Marketing Site
// Contains title animation settings matching Section 3 pattern

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Section 6 title animation timings (matches Section 3 pattern)
export const SECTION6_TIMINGS = {
    // Title animation phases
    periodA: 0.5,        // Initial delay before title appears
    titleFadeIn: 0.35,   // Title fade in duration (matches Section 3)
    titleShow: 2.0,      // How long title stays visible
    titleFadeOut: 0.35,  // Title fade out duration
    periodB: 0.5         // Final delay after title disappears
};

// Section 6 scroll distance scaling (maps timeline duration to scroll length)
export const SECTION6_SCROLL = {
    pxPerUnit: 800 // Scroll distance per timeline unit (adjust for speed)
};

// Container layout settings per breakpoint (matches Section 3 hero--looper pattern)
export const SECTION6_CONTAINER = {
    [BREAKPOINT_NAMES.MOBILE]: {
        width: 320,
        height: 200,
        offsetX: 0,
        offsetY: 0
    },
    [BREAKPOINT_NAMES.TABLET]: {
        width: 500,
        height: 220,
        offsetX: 0,
        offsetY: 0
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        width: 600,
        height: 240,
        offsetX: 0,
        offsetY: 0
    },
    [BREAKPOINT_NAMES.LARGE]: {
        width: 700,
        height: 260,
        offsetX: 0,
        offsetY: 0
    }
};
