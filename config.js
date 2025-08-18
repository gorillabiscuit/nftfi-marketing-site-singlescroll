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
    // DRAWING STEPS (total durations and offsets)
    // Each "total" is the time from the start of the first line to the end of the last line for that axis.
    // Offsets are relative to the END of the previous step: positive = delay, negative = overlap.
    lineDrawSingle: 0.25,                 // duration for a single line to draw (used to compute stagger)
    drawVerticalLinesTotal: 2.0,          // total time to complete vertical lines
    drawVerticalLinesOffset: 0.0,         // offset relative to start (first step)
    drawHorizontalLinesTotal: 2.0,        // total time to complete horizontal lines
    drawHorizontalLinesOffset: -1.0,      // start 1s before vertical finishes (overlap)

    // TRANSFORM STEPS (durations and offsets)
    outwardDuration: 0.75,
    outwardOffset: 0.5,                   // after drawing finishes
    rotateDuration: 0.75,
    rotateOffset: 0.3,                    // after outward finishes
    microRotateDuration: 0.75,            // subtle per-line micro-rotation during rotate step
    expandDuration: 0.25,
    expandOffset: 0.0,

    // TITLE STEP
    titleDuration: 0.35,                  // used for title wipe/reveal
    titleOffset: 0.0,                     // after rotate finishes

    // BLOCKS SEQUENCE (master-level)
    blocksFirstOffset: 0.5,               // delay after title before first block
    blockGap: 0.25,                       // gap between blocks in the master sequence

    // BLOCK INTERNALS (per-block TL)
    rectDraw: 0.25,                       // cell stroke draw duration
    rectFillFade: 0.10,                   // cell fill fade-in
    highlightExpand: 0.22,                // label/title wipe expand
    labelReveal: 0.05,                    // label/title reveal after wipe
    highlightShrink: 0.22,                // wipe shrink
    amountDelayAfterLabel: 0.5,           // delay after label before amount appears
    amountAppear: 0.15,                   // amount fade-in
    amountCount: 2.0                      // count-up duration
};

// Rectangle cell states for Section 2 (breakpoint-aware)
// Controls: visibility (enabled), size relative to spacing, corner radius, and selection pattern
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
        mouseInfluence: 0.05
    },
    yRotationRate: {
        base: 0.3,
        modulation: 0.2,
        frequency: 0.08,
        mouseInfluence: 0.05
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