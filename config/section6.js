// Section 6 (Our Investors) Configuration for NFTfi Marketing Site
// Contains title animation settings matching Section 3 pattern

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Section 6 animation timings (title + tiles sequence)
// NEW SYSTEM: Animation duration is separate from pin hold duration
// - The timeline contains only the active animations (title + tiles fade in)
// - After animations complete, the section stays pinned for holdAfterAnimation
// - This creates a true "hold" effect without stretching the animation
export const SECTION6_TIMINGS = {
    // Title animation phases
    periodA: 0.01,        // Initial delay before title appears
    titleFadeIn: 0.15,   // Title fade in duration (matches Section 3)
    titleShow: 3.45,      // How long title stays visible
    titleFadeOut: 0.15,  // Title fade out duration
    
    // Tiles animation phases (after title disappears)
    tilesDelay: 0.3,     // Delay after title disappears before tiles appear
    tilesFadeIn: 0.4,    // Duration for tiles to fade in
    tilesStagger: 0.05,  // Stagger between individual tiles
    tilesShow: 3.0,      // How long tiles stay visible after animation completes
    
    // Hold after all animations complete (tiles stay visible while pinned)
    // This is in pixels, not timeline units - it's added to the scroll distance
    holdAfterAnimation: 2000  // Extra scroll distance to hold tiles visible before unpinning
};

// Section 6 scroll distance scaling (maps timeline duration to scroll length)
export const SECTION6_SCROLL = {
    pxPerUnit: 300 // Scroll distance per timeline unit - higher = longer scroll for same animation
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
    [BREAKPOINT_NAMES.DESKTOP_HD]: {
        width: 700,
        height: 260,
        offsetX: 0,
        offsetY: 0
    },
    [BREAKPOINT_NAMES.DESKTOP_XL]: {
        width: 700,
        height: 260,
        offsetX: 0,
        offsetY: 0
    },
    [BREAKPOINT_NAMES.DESKTOP_2XL]: {
        width: 700,
        height: 260,
        offsetX: 0,
        offsetY: 0
    }
};
