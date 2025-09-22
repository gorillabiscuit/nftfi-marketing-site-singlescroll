// Section 3 (Dashboard/Features) Configuration for NFTfi Marketing Site
// Contains dashboard SVG positioning, arrows, looper background, and scroll settings

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Section 3 Parent Container - Centers the entire Section 3 content
// This container holds both the hero panel and SVG, positioned centrally in the section
//
// POSITIONING GUIDE:
// • Center: left: '50%', top: '50%', xPercent: -50, yPercent: -50
// • Top-Left: left: '0%', top: '0%', xPercent: 0, yPercent: 0  
// • Top-Right: left: '100%', top: '0%', xPercent: -100, yPercent: 0
// • Bottom-Left: left: '0%', top: '100%', xPercent: 0, yPercent: -100
// • Bottom-Right: left: '100%', top: '100%', xPercent: -100, yPercent: -100
//
export const SECTION3_CONTAINER = {
    [BREAKPOINT_NAMES.MOBILE]: {
        // Container size (percentage of section)
        width: '100%',      // Full width of section
        height: '100%',     // Full height of section
        // Position from parent edges
        left: '50%',        // Distance from left edge of parent (50% = center)
        top: '50%',         // Distance from top edge of parent (50% = center)
        // Self-offset (to achieve true centering)
        xPercent: -50,      // Offset by own width (-50% = move left by half own width)
        yPercent: -50       // Offset by own height (-50% = move up by half own height)
    },
    [BREAKPOINT_NAMES.TABLET]: {
        // Container size (percentage of section)
        width: '100%',      // Full width of section
        height: '100%',     // Full height of section
        // Position from parent edges
        left: '50%',        // Distance from left edge of parent (50% = center)
        top: '50%',         // Distance from top edge of parent (50% = center)
        // Self-offset (to achieve true centering)
        xPercent: -50,      // Offset by own width (-50% = move left by half own width)
        yPercent: -50       // Offset by own height (-50% = move up by half own height)
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        // Container size (percentage of section)
        width: '90%',       // 90% width of section (leaves 10% margin)
        height: '80%',      // 80% height of section (leaves 20% margin)
        // Position from parent edges
        left: '49.5%',        // Distance from left edge of parent (50% = center)
        top: '49.50%',         // Distance from top edge of parent (50% = center)
        // Self-offset (to achieve true centering)
        xPercent: -50,      // Offset by own width (-50% = move left by half own width)
        yPercent: -50       // Offset by own height (-50% = move up by half own height)
    },
    [BREAKPOINT_NAMES.LARGE]: {
        // Container size (percentage of section) - More spacious for large screens
        width: '85%',       // 85% width of section (leaves 15% margin)
        height: '75%',      // 75% height of section (leaves 25% margin)
        // Position from parent edges
        left: '50%',        // Distance from left edge of parent (50% = center)
        top: '50%',         // Distance from top edge of parent (50% = center)
        // Self-offset (to achieve true centering)
        xPercent: -50,      // Offset by own width (-50% = move left by half own width)
        yPercent: -50       // Offset by own height (-50% = move up by half own height)
    }
};

// Hero Panel (Looper Background) - Positioned absolutely with pixel offsets from center
// Both hero and SVG are positioned in the same container with simple pixel-based positioning
//
// POSITIONING: Simple pixel offsets from center point
// • offsetX: 0, offsetY: 0 = Perfect center
// • offsetX: 100, offsetY: 0 = 100px right of center
// • offsetX: -50, offsetY: 20 = 50px left, 20px down from center
//
export const HERO_LOOPER = {
    [BREAKPOINT_NAMES.MOBILE]: {
        // Panel size (in pixels)
        width: 340,
        height: 560,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: 0,         // Horizontal offset in pixels (+ = right, - = left)
        offsetY: 0          // Vertical offset in pixels (+ = down, - = up)
    },
    [BREAKPOINT_NAMES.TABLET]: {
        // Panel size (in pixels)
        width: 700,
        height: 800,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: 0,         // Horizontal offset in pixels (+ = right, - = left)
        offsetY: 0          // Vertical offset in pixels (+ = down, - = up)
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        // Panel size (in pixels)
        width: 580,
        height: 620,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: 190,      // Horizontal offset in pixels (+ = right, - = left)
        offsetY: 50          // Vertical offset in pixels (+ = down, - = up)
    },
    [BREAKPOINT_NAMES.LARGE]: {
        // Panel size (in pixels)
        width: 780,
        height: 620,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: 280,      // Horizontal offset in pixels (+ = right, - = left)
        offsetY: 50         // Vertical offset in pixels (+ = down, - = up) - Slightly higher
    }
};

// Dashboard SVG - Positioned absolutely with pixel offsets from center
// Both hero and SVG are positioned in the same container with simple pixel-based positioning
//
// POSITIONING: Simple pixel offsets from center point
// • offsetX: 0, offsetY: 0 = Perfect center
// • offsetX: 200, offsetY: 0 = 200px right of center
// • offsetX: -100, offsetY: -50 = 100px left, 50px up from center
//
export const DASHBOARD_SVG = {
    [BREAKPOINT_NAMES.MOBILE]: {
        // Container size (pixels for precise control)
        width: 600,
        height: 600,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: 220,         // Horizontal offset in pixels (+ = right, - = left)
        offsetY: 40,         // Vertical offset in pixels (+ = down, - = up)
        // SVG content scaling
        scale: 0.085
    },
    [BREAKPOINT_NAMES.TABLET]: {
        // Container size (pixels for precise control)
        width: 800,
        height: 720,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: 150,         // Horizontal offset in pixels (+ = right, - = left)
        offsetY: -70,         // Vertical offset in pixels (+ = down, - = up)
        // SVG content scaling
        scale: 0.19,
        transformOrigin: 'center center'
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        // Container size (pixels for precise control)
        width: 1000,
        height: 1000,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: -340,       // Horizontal offset in pixels (+ = right, - = left)
        offsetY: 140,         // Vertical offset in pixels (+ = down, - = up)
        // SVG content scaling
        scale: 0.32
    },
    [BREAKPOINT_NAMES.LARGE]: {
        width: 1000,
        height: 1000,
        // Pixel offset from center point (0,0 = perfect center)
        offsetX: -350,       // Horizontal offset in pixels (+ = right, - = left)
        offsetY: 140,         // Vertical offset in pixels (+ = down, - = up)
        // SVG content scaling
        scale: 0.33,
        transformOrigin: 'center center'
    }
};

// Section 3 arrows mapping (simplified): absolute coordinates per breakpoint
// Use 'to' coordinates (required). Optionally provide 'from' coords; otherwise we use the feature block center.
export const SECTION3_ARROWS = [
    {
        fromSelector: '.section3-features .feature-1',
        from: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 680, y: 320 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 820, y: 360 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 760, y: 275 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 800, y: 260 }
        },
        to: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 680, y: 150 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 820, y: 360 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 500, y: 230 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 480, y: 210 }
        }
    },
    {
        fromSelector: '.section3-features .feature-2',
        from: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 680, y: 340 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 820, y: 360 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 810, y: 372 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 850, y: 360 }
        },
        to: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 640, y: 360 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 800, y: 400 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 450, y: 360 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 430, y: 340 }
        }
    },
    {
        fromSelector: '.section3-features .feature-3',
        from: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 680, y: 320 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 820, y: 360 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 862, y: 463 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 900, y: 450 }
        },
        to: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 600, y: 400 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 760, y: 440 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 773, y: 440 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 750, y: 420 }
        }
    },
    {
        fromSelector: '.section3-features .feature-4',
        from: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 680, y: 320 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 820, y: 360 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 917, y: 557 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 960, y: 540 }
        },
        to: {
            [BREAKPOINT_NAMES.MOBILE]:  { x: 560, y: 440 },
            [BREAKPOINT_NAMES.TABLET]:  { x: 720, y: 480 },
            [BREAKPOINT_NAMES.DESKTOP]: { x: 630, y: 610 },
            [BREAKPOINT_NAMES.LARGE]:   { x: 600, y: 590 }
        }
    }
];

// Debug: when true, arrows are always visible (no dash animation) to validate geometry quickly
export const SECTION3_ARROWS_DEBUG = true;

// When true, keep arrows visible at all times but with zero-length stroke
// (strokeDashoffset = totalLength) until animated. Useful to avoid pop-in on
// downward scroll while still allowing draw animation.
export const SECTION3_ARROWS_VISIBLE_ZERO = true;

// Global toggle to enable/disable Section 3 arrows entirely
export const SECTION3_ARROWS_ENABLED = false;

// Section 3 (Dashboard SVG) scaling per breakpoint
// Now that parent container positioning handles layout, SVG only needs scaling and transform origin
// The parent container (SECTION3_CONTAINER) handles all positioning responsively
export const GROUP_BASE_HEIGHT = 20;
export const SECTION3 = {
    // SVG scaling is now consolidated in DASHBOARD_SVG above
    // Sequence defaults for Section 3 SVG groups
    sequence: {
        // Legacy fields (still read for fallback-only mode)
        // Move up to highlight position (negative Y moves up)
        yIn: -800,
        // Not used in per-id mode (return always to y:0)
        yOut: 0,
        // Per-id stagger when no groups are used
        stagger: 3.12,
        // Base durations used by legacy label mode
        introDuration: 10.5,
        outroDuration: 10.5,

        // Delay between title reveal and first subheader/arrow (seconds)
        firstFeatureDelay: 6.6,

        // Per-ID mode (new):
        riseDuration: 2.0,     // seconds to move up
        holdDefault: 6.0,      // seconds to stay up if item has no hold override
        returnDuration: 2.0,   // seconds to return to y:0
        baseStagger: 0.35,     // stagger between ids in the same group
        groupGap: 1.0,         // gap between groups after all ids in a group finish
        jitterMax: 0.25        // max random +/- seconds applied within group window
    },
    // Explicit targets (IDs) to animate in order. If provided, code will use these instead of auto-discovery.
    targets: {
        // Preferred detailed specification (order preserved):
        // Each item can override maxY (positive magnitude), hold (seconds), jitter (seconds), group label
        groupBaseHeight: GROUP_BASE_HEIGHT,
        detail: [
            { id: '#animate-1stbox', group: 'boxes', maxY: GROUP_BASE_HEIGHT + 50 },
            { id: '#animate-2ndbox', group: 'boxes', maxY: GROUP_BASE_HEIGHT + 70 },
            { id: '#animate-2ndbox-button', group: 'boxes', maxY:  40 },
            { id: '#animate-3rdbox', group: 'boxes', maxY: GROUP_BASE_HEIGHT + 45 },
            { id: '#animate-3rdbox-button', group: 'boxes', maxY:  30 },
            { id: '#animate-4thbox', group: 'boxes', maxY: GROUP_BASE_HEIGHT + 40 },
            { id: '#animate-5thbox', group: 'boxes', maxY: GROUP_BASE_HEIGHT + 50 },
            { id: '#animate-6thbox', group: 'boxes', maxY: GROUP_BASE_HEIGHT + 20 },
            { id: '#animate-primary-btn', group: 'table', maxY:  20 },
            { id: '#animate-1st-row', group: 'table', maxY:  50 },
            { id: '#animate-2nd-row', group: 'table', maxY:  40 },
            { id: '#animate-3rd-row', group: 'table', maxY:  30 },
            { id: '#animate-4th-row', group: 'table', maxY:  20 },
            { id: '#animate-Collateral-distribution', group: 'donut', maxY:  30 },
            { id: '#animate-Currency-distribution', group: 'donut', maxY:  50 },
            { id: '#animate-Protocol-distribution', group: 'donut', maxY:  70 },
            { id: '#animate-pie1-animate-Collateral-distribution', group: 'donut', maxY:  20 },
            { id: '#animate-pie2-animate-Collateral-distribution', group: 'donut', maxY:  40 },
            { id: '#animate-pie3-animate-Collateral-distribution', group: 'donut', maxY:  60 },
            { id: '#animate-pie4-animate-Collateral-distribution', group: 'donut', maxY:  80 },
            { id: '#animate-pie5-animate-Collateral-distribution', group: 'donut', maxY:  100 },
            { id: '#animate-pie1-animate-Currency-distribution', group: 'donut', maxY:  80 },
            { id: '#animate-pie2-animate-Currency-distribution', group: 'donut', maxY:  120 },
            { id: '#animate-pie3-animate-Currency-distribution', group: 'donut', maxY:  60 },
            { id: '#animate-pie1-Protocol-distribution', group: 'donut', maxY:  10 },
            { id: '#animate-pie2-Protocol-distribution', group: 'donut', maxY:  30 },
            { id: '#animate-pie3-Protocol-distribution', group: 'donut', maxY:  50 },
            { id: '#animate-pie4-Protocol-distribution', group: 'donut', maxY:  70 },
            { id: '#animate-pie5-Protocol-distribution', group: 'donut', maxY:  90 },
            
        ],
        // Legacy simple list (still supported). If provided and detail is empty, code uses these.
        ids: [
            '#animate-1stbox',
            '#animate-2ndbox',
            '#animate-3rdbox',
            '#animate-4thbox',
            '#animate-5thbox',
            '#animate-6thbox'
        ]
        ,
        // Bubble animation configuration
        bubbles: {
            // Parent group id containing the circles/ellipses
            parentId: '#animate-bubble',
            // Timing windows (seconds)
            startWindowSec: 1.25,
            holdMinSec: 4.0,
            holdMaxSec: 8.0,
            returnWindowSec: 1.25,
            // Vertical travel range per element (pixels)
            minRange: 12,
            maxRange: 120,
            // Optional additional element ids to include with the bubble animation
            // Use raw SVG ids, e.g., 'Ellipse 66' or '#animate-foo'.
            extraIds: ["#animate-Chart/Legend/Item1","#animate-Chart/Legend/Item2","#animate-Chart/Legend/Item3","#animate-Chart/Legend/Item4","#bubble-chart-all","#animate-legend2"]
        }
    
    }
};

// White sphere positions for Section 3
export const WHITE_SPHERE_POSITIONS = {
    [BREAKPOINT_NAMES.MOBILE]: { x: -3.5, y: 5.6, z: -6 },
    [BREAKPOINT_NAMES.TABLET]: { x: -10.0, y: 4.8, z: -6.5 },
    [BREAKPOINT_NAMES.DESKTOP]: { x: -11.15, y: 5.35, z: -7 },
    [BREAKPOINT_NAMES.LARGE]: { x: -12.5, y: 5.8, z: -7.5 }
};

// Scroll scaling for Section 3: pixels of scroll per second of timeline duration
export const SECTION3_SCROLL = {
    pxPerSecond: 100,
    // Scroll distance for pinned Section 3 in viewport heights (percent). Higher = slower.
    durationVh: 600
};
