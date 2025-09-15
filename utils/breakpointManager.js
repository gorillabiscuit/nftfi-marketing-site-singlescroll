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

// Get current breakpoint based on window width (mobile-first approach)
export function getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    // Use the centralized breakpoint system with all 4 breakpoints:
    // Mobile: ≤480px
    // Tablet: 481-768px  
    // Desktop: 769-1024px
    // Large: ≥1025px
    if (width <= BREAKPOINT_VALUES.MOBILE) return BREAKPOINT_NAMES.MOBILE;
    if (width <= BREAKPOINT_VALUES.TABLET) return BREAKPOINT_NAMES.TABLET;
    if (width <= BREAKPOINT_VALUES.DESKTOP) return BREAKPOINT_NAMES.DESKTOP;
    return BREAKPOINT_NAMES.LARGE;
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
    
    // Listen for window resize
    window.addEventListener('resize', () => {
        console.log('Window resized to:', window.innerWidth);
        hasStateChanged();
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