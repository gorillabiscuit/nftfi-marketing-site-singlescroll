// Section 6 (Our Investors) Configuration for NFTfi Marketing Site
// Contains title animation settings matching Section 3 pattern

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Section 6 animation timings (title + tiles sequence)
// NOTE: With scrub:true, these values represent PROPORTIONAL timeline segments, not real time.
// 
// WEIGHTED SCROLL SYSTEM:
// - ACTIVE segments (fades, animations): Use activePxPerUnit (faster scroll)
// - PASSIVE segments (shows, holds, delays): Use passivePxPerUnit (slower scroll)
// 
// This allows postTilesDelay to create a long pause without making title disappear slowly.
export const SECTION6_TIMINGS = {
    // Title animation phases
    periodA: 0.01,        // Initial delay before title appears
    titleFadeIn: 0.15,   // Title fade in duration (matches Section 3)
    titleShow: 0.25,      // How long title stays visible
    titleFadeOut: 0.15,  // Title fade out duration
    
    // Tiles animation phases (after title disappears)
    tilesDelay: 0.1,     // Delay after title disappears before tiles appear
    tilesFadeIn: 0.4,    // Duration for tiles to fade in
    tilesStagger: 0.05,  // Stagger between individual tiles
    tilesShow: 3.0,      // How long tiles stay visible
    tilesHold: 5.0,      // Additional time after tiles appear before unpinning
    
    // Extra control periods
    postTilesDelay: 8.0, // Extra time period after all logo blocks have fully appeared
                         // This is a PASSIVE segment - uses passivePxPerUnit for slower scroll
    
    periodB: 3.5         // Final delay after all animations complete
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
    [BREAKPOINT_NAMES.LARGE]: {
        width: 700,
        height: 260,
        offsetX: 0,
        offsetY: 0
    }
};
