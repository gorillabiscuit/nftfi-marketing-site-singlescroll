// Hero Button Stroke Effects Controller
// Applies configurable stroke effects to the three hero buttons (Borrow, Lend, Refinance)

import { HERO_BUTTON_STROKE_EFFECTS } from '../config/index.js';

/**
 * Update SVG displacement filter scale
 * @param {number} scale - Displacement scale value
 */
function updateDisplacementFilter(scale) {
    const filter = document.querySelector('#displacementFilter feDisplacementMap');
    if (filter) {
        filter.setAttribute('scale', scale.toString());
        console.log(`Updated displacement filter scale to: ${scale}`);
    } else {
        console.warn('Displacement filter not found');
    }
}

/**
 * Update SVG displacement filter scale for hover state
 * @param {number} scale - Hover displacement scale value
 */
function updateDisplacementFilterHover(scale) {
    // Store hover scale in CSS custom property for use in hover state
    const root = document.documentElement;
    root.style.setProperty('--hero-button-displacement-scale-hover', scale.toString());
    console.log(`Updated hover displacement filter scale to: ${scale}`);
}

/**
 * Apply stroke effects configuration to hero buttons
 */
function applyStrokeEffects() {
    const config = HERO_BUTTON_STROKE_EFFECTS;
    
    console.log('Applying hero button stroke effects:', config);
    
    // Update CSS custom properties for dynamic styling
    const root = document.documentElement;
    
    // Inner glow effects (always visible)
    root.style.setProperty('--hero-button-highlight-opacity', config.highlightOpacity);
    root.style.setProperty('--hero-button-highlight2-opacity', config.highlight2Opacity);
    root.style.setProperty('--hero-button-glow-opacity', config.glowOpacity);
    root.style.setProperty('--hero-button-glow-spread', `${config.glowSpread}px`);
    root.style.setProperty('--hero-button-glow-blur', `${config.glowBlur}px`);
    root.style.setProperty('--hero-button-glow-offset-x', `${config.glowOffsetX}px`);
    root.style.setProperty('--hero-button-glow-offset-y', `${config.glowOffsetY}px`);
    root.style.setProperty('--hero-button-glow2-offset-x', `${config.glow2OffsetX}px`);
    root.style.setProperty('--hero-button-glow2-offset-y', `${config.glow2OffsetY}px`);
    
    // Background opacity
    root.style.setProperty('--hero-button-bg-opacity', config.backgroundOpacity);
    
    // Displacement effects (default + hover)
    root.style.setProperty('--hero-button-displacement-blur', `${config.displacementBlur}px`);
    root.style.setProperty('--hero-button-displacement-blur-hover', `${config.displacementBlurHover}px`);
    
    // Hover highlight enhancements
    root.style.setProperty('--hero-button-highlight-opacity-hover', config.highlightOpacityHover);
    root.style.setProperty('--hero-button-highlight2-opacity-hover', config.highlight2OpacityHover);
    
    // Update SVG displacement filters (default + hover)
    updateDisplacementFilter(config.displacementScale);
    updateDisplacementFilterHover(config.displacementScaleHover);
}

/**
 * Initialize hero button stroke effects system
 */
export function initHeroButtonEffects() {
    console.log('Initializing hero button stroke effects...');
    
    // Apply initial effects
    applyStrokeEffects();
    
    // Effects are now static - no need to update on resize
    
    console.log('Hero button stroke effects initialized');
}

/**
 * Manually update stroke effects (useful for debugging/tweaking)
 * @param {Object} customConfig - Custom configuration to apply
 */
export function updateStrokeEffects(customConfig) {
    if (customConfig) {
        // Apply custom config temporarily
        const root = document.documentElement;
        
        if (customConfig.highlightOpacity !== undefined) {
            root.style.setProperty('--hero-button-highlight-opacity', customConfig.highlightOpacity);
        }
        if (customConfig.highlight2Opacity !== undefined) {
            root.style.setProperty('--hero-button-highlight2-opacity', customConfig.highlight2Opacity);
        }
        if (customConfig.glowOpacity !== undefined) {
            root.style.setProperty('--hero-button-glow-opacity', customConfig.glowOpacity);
        }
        if (customConfig.glowSpread !== undefined) {
            root.style.setProperty('--hero-button-glow-spread', `${customConfig.glowSpread}px`);
        }
        if (customConfig.glowBlur !== undefined) {
            root.style.setProperty('--hero-button-glow-blur', `${customConfig.glowBlur}px`);
        }
        if (customConfig.glowOffsetX !== undefined) {
            root.style.setProperty('--hero-button-glow-offset-x', `${customConfig.glowOffsetX}px`);
        }
        if (customConfig.glowOffsetY !== undefined) {
            root.style.setProperty('--hero-button-glow-offset-y', `${customConfig.glowOffsetY}px`);
        }
        if (customConfig.glow2OffsetX !== undefined) {
            root.style.setProperty('--hero-button-glow2-offset-x', `${customConfig.glow2OffsetX}px`);
        }
        if (customConfig.glow2OffsetY !== undefined) {
            root.style.setProperty('--hero-button-glow2-offset-y', `${customConfig.glow2OffsetY}px`);
        }
        if (customConfig.backgroundOpacity !== undefined) {
            root.style.setProperty('--hero-button-bg-opacity', customConfig.backgroundOpacity);
        }
        if (customConfig.displacementBlur !== undefined) {
            root.style.setProperty('--hero-button-displacement-blur', `${customConfig.displacementBlur}px`);
        }
        if (customConfig.displacementScale !== undefined) {
            updateDisplacementFilter(customConfig.displacementScale);
        }
        
        console.log('Applied custom stroke effects:', customConfig);
    } else {
        // Apply config from breakpoint
        applyStrokeEffects();
    }
}

// Export for global access (debugging)
window.updateHeroButtonStrokeEffects = updateStrokeEffects;
