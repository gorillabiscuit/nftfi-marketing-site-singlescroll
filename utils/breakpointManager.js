// Breakpoint Manager for NFTfi Marketing Site
// Handles breakpoint detection and animation state management

import { ANIMATION_STATES, BREAKPOINT_VALUES, BREAKPOINT_NAMES } from '../config/index.js';

// Use centralized breakpoint definitions
export const BREAKPOINTS = {
    mobile: BREAKPOINT_VALUES.TABLET,    // Legacy: old mobile was 768px
    tablet: BREAKPOINT_VALUES.DESKTOP,   // Legacy: old tablet was 1024px
    desktop: BREAKPOINT_VALUES.DESKTOP   // Legacy: old desktop was 1024px
};

// Current animation state
let currentState = 'desktop';
let stateChangeCallbacks = [];

// Debug mode configuration - SET TO TRUE TO AUTO-ENABLE DEBUG LABEL ON LOAD
export const DEBUG_BREAKPOINTS_ON_LOAD = true;

// Debug mode state
let debugMode = false;
let debugLabel = null;

// Get current breakpoint based on window width (mobile-first approach)
export function getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    // Use the centralized breakpoint system with all 6 breakpoints:
    // Mobile: ≤600px
    // Tablet: 601-900px  
    // Desktop: 901-1200px
    // Desktop HD: 1201-1600px (HD displays: 1366x768, 1440x900)
    // Desktop XL: 1601-2000px (Full HD: 1920x1080)
    // Desktop 2XL: ≥2001px (QHD/2K: 2560x1440+, ultra-wide)
    if (width <= BREAKPOINT_VALUES.MOBILE) return BREAKPOINT_NAMES.MOBILE;
    if (width <= BREAKPOINT_VALUES.TABLET) return BREAKPOINT_NAMES.TABLET;
    if (width <= BREAKPOINT_VALUES.DESKTOP) return BREAKPOINT_NAMES.DESKTOP;
    if (width <= BREAKPOINT_VALUES.DESKTOP_HD) return BREAKPOINT_NAMES.DESKTOP_HD;
    if (width <= BREAKPOINT_VALUES.DESKTOP_XL) return BREAKPOINT_NAMES.DESKTOP_XL;
    return BREAKPOINT_NAMES.DESKTOP_2XL;
}

// Get current animation state
export function getCurrentAnimationState() {
    return currentState;
}

// Get animation state for a specific breakpoint
export function getAnimationState(breakpoint) {
    const state = ANIMATION_STATES[breakpoint] || ANIMATION_STATES.desktop;
    
    // Validate scale values to prevent animation issues
    if (typeof state.start.scale !== 'number' || isNaN(state.start.scale)) {
        console.warn(`Invalid start scale for ${breakpoint}:`, state.start.scale, 'falling back to desktop');
        return ANIMATION_STATES.desktop;
    }
    
    if (typeof state.target.scale !== 'number' || isNaN(state.target.scale)) {
        console.warn(`Invalid target scale for ${breakpoint}:`, state.target.scale, 'falling back to desktop');
        return ANIMATION_STATES.desktop;
    }
    
    return state;
}

// Check if state has changed
export function hasStateChanged() {
    const newBreakpoint = getCurrentBreakpoint();
    const newState = newBreakpoint;
    
    console.log('Checking state change:', {
        currentState,
        newState,
        windowWidth: window.innerWidth
    });
    
    if (newState !== currentState) {
        const oldState = currentState;
        currentState = newState;
        
        console.log('State changed!', {
            from: oldState,
            to: newState,
            windowWidth: window.innerWidth
        });
        
        // Update debug label if active
        updateDebugLabel();
        
        // Notify all callbacks of state change
        stateChangeCallbacks.forEach(callback => {
            callback(newState, oldState);
        });
        
        return true;
    }
    
    return false;
}

// Register callback for state changes
export function onStateChange(callback) {
    stateChangeCallbacks.push(callback);
}

// Initialize breakpoint detection
export function initializeBreakpointDetection() {
    // Set initial state
    currentState = getCurrentBreakpoint();
    
    // Auto-enable debug mode if configured
    if (DEBUG_BREAKPOINTS_ON_LOAD) {
        enableDebugMode();
    }
    
    // Listen for window resize
    window.addEventListener('resize', () => {
        console.log('Window resized to:', window.innerWidth);
        hasStateChanged();
        // Update debug label on resize even if breakpoint hasn't changed
        updateDebugLabel();
    });
    
    console.log('Breakpoint detection initialized. Current state:', currentState);
}

// Debug function to manually test state changes
export function debugSetState(state) {
    if (ANIMATION_STATES[state]) {
        const oldState = currentState;
        currentState = state;
        
        console.log('Debug: State manually changed to:', state);
        
        // Notify callbacks
        stateChangeCallbacks.forEach(callback => {
            callback(state, oldState);
        });
        
        return true;
    } else {
        console.error('Debug: Invalid state:', state);
        return false;
    }
}

// Create debug label element
function createDebugLabel() {
    if (debugLabel) return debugLabel;
    
    debugLabel = document.createElement('div');
    debugLabel.id = 'breakpoint-debug-label';
    debugLabel.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.85);
        color: #00ff00;
        padding: 8px 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        font-weight: bold;
        z-index: 999999;
        pointer-events: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 255, 0, 0.3);
    `;
    document.body.appendChild(debugLabel);
    return debugLabel;
}

// Update debug label content
function updateDebugLabel() {
    if (!debugMode || !debugLabel) return;
    
    const breakpoint = getCurrentBreakpoint();
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    debugLabel.innerHTML = `
        <div style="line-height: 1.5;">
            <div>BREAKPOINT: <span style="color: #ffff00;">${breakpoint.toUpperCase()}</span></div>
            <div style="font-size: 10px; color: #888; margin-top: 4px;">
                ${width}×${height}px
            </div>
        </div>
    `;
}

// Toggle debug mode on/off
export function toggleDebugMode() {
    debugMode = !debugMode;
    
    if (debugMode) {
        createDebugLabel();
        updateDebugLabel();
        console.log('🐛 Breakpoint debug mode ENABLED');
        console.log('Current breakpoint:', getCurrentBreakpoint());
        console.log('Window size:', window.innerWidth, '×', window.innerHeight);
    } else {
        if (debugLabel) {
            debugLabel.remove();
            debugLabel = null;
        }
        console.log('🐛 Breakpoint debug mode DISABLED');
    }
    
    return debugMode;
}

// Enable debug mode
export function enableDebugMode() {
    if (!debugMode) {
        toggleDebugMode();
    }
}

// Disable debug mode
export function disableDebugMode() {
    if (debugMode) {
        toggleDebugMode();
    }
}

// Check if debug mode is active
export function isDebugModeActive() {
    return debugMode;
} 