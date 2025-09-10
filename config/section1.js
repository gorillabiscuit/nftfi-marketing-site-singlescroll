// Section 1 (Hero/Logo) Configuration for NFTfi Marketing Site
// Contains logo animation states, target positions, and hero section settings

import { BREAKPOINT_NAMES } from './breakpoints.js';

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
    [BREAKPOINT_NAMES.MOBILE]: {
        start: { x: 0.4, y: .5, z: 0, scale: 1.5 },
        target: { x: -0.89, y: 0.9, z: 0, scale: 0.135 }
    },
    [BREAKPOINT_NAMES.TABLET]: {
        start: { x: 0.6, y: -0.1, z: 0, scale: 2.8 },
        target: { x: -0.7, y: 0.7, z: 0, scale: 0.3 }
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        start: { x: 0.55, y: -0.15, z: 0, scale: 3.0 },
        target: { x: -0.94, y: 0.81, z: 0, scale: 0.235 }
    }
};

// Hero Button Stroke Effects Configuration
// Controls the glass morphism and distortion effects on the three hero buttons (Borrow, Lend, Refinance)
//
// INNER GLOW EFFECTS (always visible):
// • highlightOpacity: Controls brightness of the top-left directional highlight (0.0 = invisible, 1.0 = fully bright)
// • highlight2Opacity: Controls brightness of the bottom-right directional highlight (0.0 = invisible, 1.0 = fully bright)
// • glowOpacity: Controls transparency of the overall inner glow (0.0 = invisible, 1.0 = fully opaque)
// • glowSpread: Controls how far the glow extends (higher = more spread out)
// • glowBlur: Controls how soft/blurred the glow appears (higher = softer)
// • glowOffsetX/Y: Controls direction of the first highlight effect (positive = down/right)
// • glow2OffsetX/Y: Controls direction of the second highlight effect (positive = down/right)
//
// DISPLACEMENT EFFECTS:
// • displacementScale: Controls strength of the default distortion effect (0 = no distortion, 400+ = heavy distortion)
// • displacementScaleHover: Controls strength of the distortion effect on hover (stronger than default)
// • displacementBlur: Controls blur amount applied with distortion (higher = more blur)
// • displacementBlurHover: Controls blur amount on hover
//
// BACKGROUND EFFECTS:
// • backgroundOpacity: Controls transparency of the button background (0.0 = invisible, 1.0 = solid)
//
export const HERO_BUTTON_STROKE_EFFECTS = {
    // Inner glow/stroke effect (always visible)
    highlightOpacity: 0.9,     // Brightness of top-left directional highlight (0.0-1.0)
    highlight2Opacity: 0.9,    // Brightness of bottom-right directional highlight (0.0-1.0) - matched
    glowOpacity: 0.125,        // Transparency of overall inner glow (0.0-1.0)
    glowSpread: 2,             // How far the glow spreads (pixels)
    glowBlur: 3,               // Softness of the glow effect (pixels)
    glowOffsetX: 2,            // Horizontal offset of first highlight (pixels, + = right)
    glowOffsetY: 2,            // Vertical offset of first highlight (pixels, + = down)
    glow2OffsetX: -2,          // Horizontal offset of second highlight (pixels, + = right, - = left) - symmetric
    glow2OffsetY: -2,          // Vertical offset of second highlight (pixels, + = down, - = up) - symmetric
    
    // Displacement/distortion effects (default + hover)
    displacementScale: 250,         // Default distortion strength (0-400+, subtle by default)
    displacementScaleHover: 100,    // Hover distortion strength (stronger on hover)
    displacementBlur: 1.5,          // Default blur with distortion (pixels)
    displacementBlurHover: 2.5,     // Hover blur with distortion (pixels)
    
    // Hover highlight enhancement
    highlightOpacityHover: 1,     // Top-left highlight brightness on hover (stronger)
    highlight2OpacityHover: 1,    // Bottom-right highlight brightness on hover (stronger)
    
    // Background
    backgroundOpacity: 0.1     // Button background transparency (0.0-1.0)
};
