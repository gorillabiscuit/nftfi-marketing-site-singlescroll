// Section 2 (Grid Animation) Configuration for NFTfi Marketing Site
// Contains grid states, rectangle states, timings, and scroll settings

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Grid sizing states for Section 2 (breakpoint-aware)
// Controls: line spacing and counts, plus how far they expand and SVG sizing multiplier
export const GRID_STATES = {
    [BREAKPOINT_NAMES.MOBILE]: {
        // Base spacing between logical levels before expansion
        initialSpacing: 60,
        // How far lines spread during outward expansion (phase 2)
        outwardFactor: 2.2,
        // Final spacing factor for the last phase (phase 4)
        finalFactor: 3.4,
        // Levels per axis (total lines per axis = 2*levels + 1)
        levels: 4,
        // SVG size multiplier relative to max(viewportWidth, viewportHeight)
        svgSizeMultiplier: 1.8,
        // Grid line styling
        lineWidth: 1.5,
        lineColor: '#F2F2F2',
        lineOpacity: 0.8
    },
    [BREAKPOINT_NAMES.TABLET]: {
        initialSpacing: 55,
        outwardFactor: 2.0,
        finalFactor: 3.2,
        levels: 4,
        svgSizeMultiplier: 1.7,
        lineWidth: 1.5,
        lineColor: '#F2F2F2',
        lineOpacity: 0.8
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        initialSpacing: 80,
        outwardFactor: 1.9,
        finalFactor: 3.0,
        levels: 4,
        svgSizeMultiplier: 1.6,
        lineWidth: 0.5,
        lineColor: '#F2F2F2',
        lineOpacity: 0.25
    }
};

// Rectangle cell states for Section 2 (breakpoint-aware)
// Controls: visibility (enabled), size relative to spacing, corner radius, and selection pattern
export const RECT_STATES = {
    [BREAKPOINT_NAMES.MOBILE]: {
        enabled: false,
        sizeFactor: 0.45,          // rect size as fraction of spacing
        cornerRadiusFactor: 0.1,   // rounded corner as fraction of rect size
        pattern: 'none',           // 'all' | 'checker' | 'none'
        cells: [],                 // Explicit [i,j] pairs. If non-empty, overrides pattern
        // Optional per-phase size factors (override sizeFactor if set)
        sizeFactorOutStart: undefined,
        sizeFactorOutEnd: undefined,
        sizeFactorFinalStart: undefined,
        sizeFactorFinalEnd: undefined,
        // Outward travel multipliers (1 = match grid exactly)
        positionOutMultiplierStart: 1,
        positionOutMultiplierEnd: 1,
        positionFinalMultiplierStart: 1,
        positionFinalMultiplierEnd: 1,
        // Optional text configs
        amount: {},
        label: { rotateDeg: undefined, padRight: undefined, padTop: undefined, padBottom: undefined }
    },
    [BREAKPOINT_NAMES.TABLET]: {
        enabled: false,
        sizeFactor: 0.48,
        cornerRadiusFactor: 0.18,
        pattern: 'none',
        cells: [[-2,0],[-1,0],[1,-1],[0,-2]],
        sizeFactorOutStart: 1,
        sizeFactorOutEnd: 1,
        sizeFactorFinalStart: 1,
        sizeFactorFinalEnd: 1,
        positionOutMultiplierStart: 1,
        positionOutMultiplierEnd: 1,
        positionFinalMultiplierStart: 1,
        positionFinalMultiplierEnd: 1,
        amount: {},
        label: { rotateDeg: undefined, padRight: undefined, padTop: undefined, padBottom: undefined }
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        enabled: true,
        sizeFactor: 1,
        cornerRadiusFactor: 0.1,
        pattern: 'checker',
        cells: [[-2,0],[-1,0],[1,-1],[0,-2]],
        sizeFactorOutStart: 1,
        sizeFactorOutEnd: 1.4,
        sizeFactorFinalStart: 1,
        sizeFactorFinalEnd: 1,
        positionOutMultiplierStart: 1,
        positionOutMultiplierEnd: 1.5265,
        positionFinalMultiplierStart: 1,
        positionFinalMultiplierEnd: 1,
        // Default rect styling for all blocks (can be overridden per block)
        rectDefaults: {
            gradientStart: 'rgba(109, 62, 88, 0.0)',
            gradientEnd: 'rgba(109, 62, 88, 0.8)',
            gradientAngle: 45,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.38,
            strokeWidth: 1,
            rxOverride: 15 // optional override; otherwise computed from cornerRadiusFactor
        },
        // Blocks array: order maps to visible cells sequence. Only text is required; rect can override gradient.
        blocks: [
            { amount: { text: '$700M+' }, label: { text: 'LOAN VOLUME' }, rect: { /* uses defaults */ } },
            { amount: { text: '73,000' },  label: { text: 'LOANS' }, rect: { gradientStart: 'rgba(139, 103, 76, 0.10)', gradientEnd: 'rgba(139, 103, 76, 0.80)', gradientAngle: 45 } },
            { amount: { text: '$20,000' }, label: { text: 'AVERAGE LOAN' }, rect: { gradientStart: 'rgba(72, 55, 65, 0.10)', gradientEnd: 'rgba(72, 55, 65, 0.80)', gradientAngle: 45 } },
            { amount: { text: 'May 2020' }, label: { text: 'RUNNING SAFE SINCE' }, rect: { /* overrides optional */ } }
        ]
    }
};

// Exposed timings for Section 2 animation (tweak as needed)
export const SECTION2_TIMINGS = {
    // Draw (lines)
    lineStagger: 0.02,          // per-line stagger
    lineDrawSingle: 4.25,       // duration for a single line draw when computing totals
    // Totals & offsets per step (offsets relative to END of previous step; negative = overlap)
    drawVerticalLinesTotal: 2.0,
    drawVerticalLinesOffset: 0.0,
    drawHorizontalLinesTotal: 2.0,
    drawHorizontalLinesOffset: -1.0,

    // Transforms (grid motion)
    outward: 5.75,              // outward expansion + initial 45° rotation duration

    // Phase spacing (explicit offsets before each phase)
    delayAfterGridDraw: 3,    // delay before outward begins (relative to end of drawing)
    delayAfterRotation: 2,   // delay before rotation begins (relative to end of outward)
    delayAfterRotationOLDNOW: 0.0,    // delay after rotation finishes, before expand begins

    // Title
    delayBeforeTitle: 0.0,       // delay before title wipe begins (relative to end of expand)
    titleWipeDuration: 1.75,     // duration of the title highlight wipe

    // Blocks (sequence-level)
    delayBeforeFirstBlock: 6,  // delay after title before first block
    blockGap: 10.25,             // gap between block i and block i+1 in the master sequence
    delayBeforeUnpin: 1.0,      // delay after the last block finishes before unpinning

    // Grid fade-out as we transition to Section 3
    fadeOutDelay: 4.0,           // delay after last block before fade starts
    fadeOutDuration: 5.0,        // duration of grid fade-out

    // Block internals (per-block TL)
    rectDraw: 2.25,             // cell stroke draw duration
    rectFillFade: 0.70,         // cell fill fade-in
    highlightExpand: 1.22,      // label/title wipe expand
    labelReveal: 1.05,          // label/title reveal after wipe
    highlightShrink: 1.22,      // wipe shrink
    amountDelayAfterLabel: 2.5, // delay after label before amount appears
    amountAppear: 2.15,         // amount fade-in
    amountCount: 7.0            // count-up duration
};

// Scroll scaling for Section 2: pixels of scroll per second of timeline duration
export const SECTION2_SCROLL = {
    pxPerSecond: 100
};
