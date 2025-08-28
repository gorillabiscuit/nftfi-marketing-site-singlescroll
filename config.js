// Configuration Constants for NFTfi Marketing Site
// Centralized configuration for all application settings

import * as THREE from 'three';

// Target position configuration for scroll animations
export const TARGET_CONFIG = {
    // Target position in world coordinates (-1 to 1 range)
    targetWorldX: -0.92,    // 80% left in world space
    targetWorldY: 0.84,     // 50% up in world space
    targetWorldZ: 0,        // Z depth
    scaleRatio: 1.2,        // Scale ratio
    
    // Starting position in world coordinates (-1 to 1 range)
    startWorldX: 0.55,      // 80% right in world space
    startWorldY: -0.15,     // Center vertically
    startWorldZ: 0          // Z depth
};

// Animation states for different breakpoints
// Each breakpoint can have different start and target positions/scales
export const ANIMATION_STATES = {
    mobile: {
        start: { x: 0.4, y: .5, z: 0, scale: 1.5 },
        target: { x: -0.89, y: 0.9, z: 0, scale: 0.135 }
    },
    tablet: {
        start: { x: 0.6, y: -0.1, z: 0, scale: 2.8 },
        target: { x: -0.7, y: 0.7, z: 0, scale: 0.3 }
    },
    desktop: {
        start: { x: 0.55, y: -0.15, z: 0, scale: 3.0 },
        target: { x: -0.94, y: 0.81, z: 0, scale: 0.235 }
    }
};

// Grid sizing states for Section 2 (breakpoint-aware)
// Controls: line spacing and counts, plus how far they expand and SVG sizing multiplier
export const GRID_STATES = {
    mobile: {
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
    tablet: {
        initialSpacing: 55,
        outwardFactor: 2.0,
        finalFactor: 3.2,
        levels: 4,
        svgSizeMultiplier: 1.7,
        lineWidth: 1.5,
        lineColor: '#F2F2F2',
        lineOpacity: 0.8
    },
    desktop: {
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

export const RECT_STATES = {
    mobile: {
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
    tablet: {
        enabled: false,
        sizeFactor: 0.48,
        cornerRadiusFactor: 0.18,
        pattern: 'none',
        cells: [],
        sizeFactorOutStart: undefined,
        sizeFactorOutEnd: undefined,
        sizeFactorFinalStart: undefined,
        sizeFactorFinalEnd: undefined,
        positionOutMultiplierStart: 1,
        positionOutMultiplierEnd: 1,
        positionFinalMultiplierStart: 1,
        positionFinalMultiplierEnd: 1,
        amount: {},
        label: { rotateDeg: undefined, padRight: undefined, padTop: undefined, padBottom: undefined }
    },
    desktop: {
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
        // Text configurations for the primary cell (global defaults)
        amount: {
            text: '$700M+',
            color: 'rgba(255, 255, 255, 0.75)',
            fontFamily: 'Roboto Mono, monospace',
            fontSize: 36,
            fontWeight: '300',
            letterSpacing: 1.44,
            center: true,
            anchor: 'middle',
            baseline: 'middle',
            centerOffsetX: 70,
            centerOffsetY: 65,
            rotateDeg: -45
        },
        label: {
            text: 'LOAN VOLUME',
            color: '#FFFFFF',
            opacity: 0.5,
            fontFamily: 'Satoshi Variable, sans-serif',
            fontSize: 16,
            fontWeight: '500',
            // bottom-left by default; you can switch to bottom-right using padRight
            padLeft: 200,
            padBottom: undefined,
            padRight: undefined,
            padTop: 180,
            rotateDeg: -90,
            anchor: 'start',
            baseline: 'alphabetic'
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

// Scroll scaling for Section 2: pixels of scroll per second of timeline duration
export const SECTION2_SCROLL = {
    pxPerSecond: 100
};

// Scroll scaling for Section 3: pixels of scroll per second of timeline duration
export const SECTION3_SCROLL = {
    pxPerSecond: 100,
    // Scroll distance for pinned Section 3 in viewport heights (percent). Higher = slower.
    durationVh: 600
};

// Section 3 Looper background (hero--looper) sizing and positioning per breakpoint
// Width/height are in pixels. Positioning is absolute; by default centered via 50%/50% with -50% translate.
export const LOOPER_BG = {
    mobile: {
        width: 600,
        height: 560,
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50
    },
    tablet: {
        width: 740,
        height: 700,
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50
    },
    desktop: {
        width: 680,
        height: 620,
        left: '50%',
        top: '50%',
        xPercent: -20,
        yPercent: -43
    }
};

// Section 3 arrows mapping (simplified): absolute coordinates per breakpoint
// Use 'to' coordinates (required). Optionally provide 'from' coords; otherwise we use the feature block center.
export const SECTION3_ARROWS = [
    {
        fromSelector: '.section3-features .feature-1',
        from: {
            mobile:  { x: 680, y: 320 },
            tablet:  { x: 820, y: 360 },
            desktop: { x: 760, y: 275 }
        },
        // from: { mobile: { x: 260, y: 220 }, tablet: { x: 300, y: 240 }, desktop: { x: 340, y: 260 } },
        to: {
            mobile:  { x: 680, y: 150 },
            tablet:  { x: 820, y: 360 },
            desktop: { x: 500, y: 230 }
        }
    },
    {
        fromSelector: '.section3-features .feature-2',
        from: {
            mobile:  { x: 680, y: 340 },
            tablet:  { x: 820, y: 360 },
            desktop: { x: 810, y: 372 }
        },
        to: {
            mobile:  { x: 640, y: 360 },
            tablet:  { x: 800, y: 400 },
            desktop: { x: 450, y: 360 }
        }
    },
    {
        fromSelector: '.section3-features .feature-3',
        from: {
            mobile:  { x: 680, y: 320 },
            tablet:  { x: 820, y: 360 },
            desktop: { x: 862, y: 463 }
        },
        to: {
            mobile:  { x: 600, y: 400 },
            tablet:  { x: 760, y: 440 },
            desktop: { x: 773, y: 440 }
        }
    },
    {
        fromSelector: '.section3-features .feature-4',
        from: {
            mobile:  { x: 680, y: 320 },
            tablet:  { x: 820, y: 360 },
            desktop: { x: 917, y: 557 }
        },
        to: {
            mobile:  { x: 560, y: 440 },
            tablet:  { x: 720, y: 480 },
            desktop: { x: 630, y: 610 }
        }
    }
];

// Debug: when true, arrows are always visible (no dash animation) to validate geometry quickly
export const SECTION3_ARROWS_DEBUG = true;

// When true, keep arrows visible at all times but with zero-length stroke
// (strokeDashoffset = totalLength) until animated. Useful to avoid pop-in on
// downward scroll while still allowing draw animation.
export const SECTION3_ARROWS_VISIBLE_ZERO = true;

// Rectangle cell states for Section 2 (breakpoint-aware)
// Controls: visibility (enabled), size relative to spacing, corner radius, and selection pattern


// Section 3 (Dashboard SVG) positioning/scaling per breakpoint
// Controls initial inline SVG transform before any GSAP timeline animations
export const GROUP_BASE_HEIGHT = 20;
export const SECTION3 = {
    svg: {
        mobile:  { x: -1500, scale: 0.5, transformOrigin: '0% 0%' },
        tablet:  { x: -1500, scale: 0.5, transformOrigin: '0% 0%' },
        desktop: { x: 0, scale: 0.325, transformOrigin: '-4% 3%' }
    },
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

export const WHITE_SPHERE_POSITIONS = {
    mobile: { x: -3.5, y: 5.6, z: -6 },
    tablet: { x: -10.0, y: 4.8, z: -6.5 },
    desktop: { x: -11.15, y: 5.35, z: -7 }
};

// Model animation and behavior configuration
export const MODEL_CONFIG = {
    // Scale configuration
    startScale: 3.0,        // Starting scale
    targetScale: 0.265,     // Target scale (much smaller)
    
    // Animation timing
    scrubDuration: 1,       // Smooth transition duration
    
    // Floating animation settings
    floatAmplitude: 0.3,    // Small amplitude for subtle movement
    floatSpeed: 0.8,        // Slow, gentle speed
    
    // Scroll spin settings
    spinIntensity: 0.05,    // How much spin per scroll unit
    spinDecay: 0.1          // How quickly spin decays (0.95 = slow decay)
};

// Shader uniform default values
export const SHADER_DEFAULTS = {
    // Index of Refraction (IOR) values for different colors
    uIorR: 1.15,            // Red channel IOR
    uIorY: 1.16,            // Yellow channel IOR
    uIorG: 1.18,            // Green channel IOR
    uIorC: 1.22,            // Cyan channel IOR
    uIorB: 1.22,            // Blue channel IOR
    uIorP: 1.22,            // Purple channel IOR
    
    // Post-processing effects
    uSaturation: 1.01,      // Color saturation
    uChromaticAberration: 0.28, // Chromatic aberration intensity
    uRefractPower: 0.5,     // Refraction power
    
    // Material properties
    uFresnelPower: 12.7,    // Fresnel effect power
    uShininess: 28.2,       // Material shininess
    uDiffuseness: 0.07,     // Material diffuseness
    
    // Lighting
    uLight: new THREE.Vector3(-1.3, 1.5, -0.6), // Light position
    
    // Resolution (will be updated dynamically)
    winResolution: new THREE.Vector2(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    ),
    
    // Texture (will be set dynamically)
    uTexture: null
};

// Camera configuration
export const CAMERA_CONFIG = {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: {
        x: 0,
        y: 0,
        z: 5
    }
};

// Renderer configuration
export const RENDERER_CONFIG = {
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
};

// Animation configuration
export const ANIMATION_CONFIG = {
    // Mouse influence decay
    mouseDecayRate: 0.98,
    
    // Rotation rates
    xRotationRate: {
        base: 0.2,
        modulation: 0.15,
        frequency: 0.1,
        mouseInfluence: 0.55,
        // Directional overrides (up/down). If set, they override mouseInfluence for that sign
        mouseInfluenceUp: 0.15,
        mouseInfluenceDown: 0.1
    },
    yRotationRate: {
        base: 0.3,
        modulation: 0.2,
        frequency: 0.08,
        mouseInfluence: 0.55,
        // Directional overrides (left/right). If set, they override mouseInfluence for that sign
        mouseInfluenceLeft: 0.2,
        mouseInfluenceRight: 0.15
    },
    zRotationRate: {
        base: 0.15,
        modulation: 0.1,
        frequency: 0.12,
        mouseInfluence: 0
    }
};

// Plane configuration for background
export const PLANE_CONFIG = {
    scale: 1,
    width: 20,
    height: 20 * (591 / 1325), // Based on 1325:591 ratio
    position: {
        x: 0,
        y: 0,
        z: -10
    }
}; 

// Center-anchored layout offsets for Section 4 per breakpoint
// Values are CSS percentages as strings (e.g., '0%', '15%', '-20%')
export const SECTION4_LAYOUT = {
    desktop: {
        title: { x: '0%', y: '0%' },
        panel: { x: '80%', y: '0%' }
    },
    tablet: {
        title: { x: '0%', y: '0%' },
        panel: { x: '-15%', y: '2%' }
    },
    mobile: {
        title: { x: '0%', y: '-5%' },
        panel: { x: '0%',  y: '15%' }
    }
};

// Pebble positioning for Section 4 (Three.js world-space offsets and scale)
// Units are world units relative to current baseline position/scale
export const SECTION4_PEBBLE = {
    desktop: {
        position: { x: -3.5, y: 0, z: 0 },
        scale: 1.75
    },
    tablet: {
        position: { x: -3.0, y: 0, z: 0 },
        scale: 1.6
    },
    mobile: {
        position: { x: -2.2, y: 0.1, z: 0 },
        scale: 1.4
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

// Section 4 pebble rotation behavior
// ySpinTurns: number of full 360° spins during the entrance
// sin: sinusoidal follow-on rotations after entrance (radians are computed from degrees here)
// (Removed SECTION4_PEBBLE_ROTATION: entrance spin and sinusoidal follow-on now unused)

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
    periodB: 1, // after h2 fade-out
    pebbleIn: 2,
    periodC: 4, // before list begins
    // panel items (title+body per item)
    itemTitleIn: 1.0,
    itemBodyIn: 1.0,
    itemHold: 2.2,
    itemFadeOut: 0.8,
    periodBetweenItems: 0.6
};

// Section 4 scroll distance scaling (maps timeline duration to scroll length)
export const SECTION4_SCROLL = {
    pxPerUnit: 700 // increase to slow down overall scrub speed
};