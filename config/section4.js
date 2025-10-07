// Section 4 (Pebble/Assets) Configuration for NFTfi Marketing Site
// Contains pebble animation, layout positioning, timing, and scroll settings

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Center-anchored layout offsets for Section 4 per breakpoint
// Values are CSS percentages as strings (e.g., '0%', '15%', '-20%')
export const SECTION4_LAYOUT = {
    [BREAKPOINT_NAMES.MOBILE]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '0%',  y: '150%' }
    },
    [BREAKPOINT_NAMES.TABLET]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '0%', y: '200%' }
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '60%', y: '0%' }
    },
    [BREAKPOINT_NAMES.LARGE]: {
        title: { x: '0%', y: '0%' },
        panel: { x: '60%', y: '0%' }  // Keep same as desktop
    }
};

// Pebble positioning for Section 4 (Three.js world-space offsets and scale)
// Units are world units relative to current baseline position/scale
export const SECTION4_PEBBLE = {
    [BREAKPOINT_NAMES.MOBILE]: {
        position: { x: 0, y: 1.5, z: 0 },
        scale: 1.4
    },
    [BREAKPOINT_NAMES.TABLET]: {
        position: { x: 0.0, y: 1.5, z: 0 },
        scale: 1.6
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        position: { x: -3.5, y: 0, z: 0 },
        scale: 1.75
    },
    [BREAKPOINT_NAMES.LARGE]: {
        position: { x: -3.5, y: 0, z: 0 },  // Keep same as desktop
        scale: 1.75  // Keep same as desktop
    }
};

// Pebble rotation for Section 4 - Multi-axis rotation support
// Set rotation degrees for each axis independently
export const SECTION4_PEBBLE_ROTATION = {
    enabled: true,
    x: 0,  // X-axis rotation in degrees
    y: 90,   // Y-axis rotation in degrees  
    z: 0,   // Z-axis rotation in degrees
    // You can set any combination of axes: 0 = no rotation, any value = rotation in degrees
};

// Coordinate System Adjustment - Reorient the pebble's local coordinate system
// This gets applied FIRST, before SECTION4_PEBBLE_ROTATION
// Use this to align the pebble's axes to match your desired rotation behavior
export const SECTION4_COORDINATE_SYSTEM = {
    enabled: true,  // Enable to apply coordinate system rotation first
    x: 0,   // Rotate coordinate system on X-axis (in degrees)
    y: 45,   // Rotate coordinate system on Y-axis (in degrees)
    z: 0    // Rotate coordinate system on Z-axis (in degrees)
};

// Axes Helper Configuration - Visualize X, Y, Z axes for the pebble
export const SECTION4_AXES_HELPER = {
    enabled: true,  // Set to true to show axes, false to hide
    size: 2,        // Length of the axes lines (adjust to make more/less visible)
    // If you want axes to match the adjusted coordinate system, 
    // they will automatically align with SECTION4_COORDINATE_SYSTEM when enabled
};

// Helper function to toggle axes visibility
// Usage: window.toggleAxes() or window.toggleAxes(true/false)
export function toggleAxesHelper(show) {
    if (window.PEBBLE && window.PEBBLE.axesHelper) {
        if (show === undefined) {
            // Toggle current state
            window.PEBBLE.axesHelper.visible = !window.PEBBLE.axesHelper.visible;
        } else {
            window.PEBBLE.axesHelper.visible = show;
        }
        console.log(`[Section 4] Axes helper ${window.PEBBLE.axesHelper.visible ? 'shown' : 'hidden'}`);
    } else {
        console.warn('[Section 4] Axes helper not found. Make sure the pebble is loaded.');
    }
}

// Helper function to change axes size
// Usage: window.setAxesSize(10)
export function setAxesSize(size) {
    if (typeof size !== 'number' || size <= 0) {
        console.error('Invalid size. Use a positive number.');
        return;
    }
    
    SECTION4_AXES_HELPER.size = size;
    console.log(`[Section 4] Axes size updated to ${size}. Refresh to see changes.`);
}

// Helper function to easily change rotation for testing
// Usage: In browser console, run: window.setPebbleRotation('x', 45) or window.setPebbleRotation({x: 45, y: 90, z: 0})
export function setPebbleRotation(axisOrObject, degrees) {
    // Support both single axis: setPebbleRotation('x', 45) and multi-axis: setPebbleRotation({x: 45, y: 90})
    if (typeof axisOrObject === 'string') {
        // Single axis mode: setPebbleRotation('x', 45)
        const axis = axisOrObject.toLowerCase();
        if (!['x', 'y', 'z'].includes(axis)) {
            console.error('Invalid axis. Use "x", "y", or "z"');
            return;
        }
        if (typeof degrees !== 'number' || degrees < 0 || degrees > 360) {
            console.error('Invalid degrees. Use a number between 0 and 360');
            return;
        }
        
        SECTION4_PEBBLE_ROTATION[axis] = degrees;
        console.log(`[Section 4] Rotation updated: ${degrees}° on ${axis.toUpperCase()}-axis`);
        
    } else if (typeof axisOrObject === 'object' && axisOrObject !== null) {
        // Multi-axis mode: setPebbleRotation({x: 45, y: 90, z: 0})
        const updates = [];
        for (const [axis, value] of Object.entries(axisOrObject)) {
            if (['x', 'y', 'z'].includes(axis.toLowerCase()) && typeof value === 'number' && value >= 0 && value <= 360) {
                SECTION4_PEBBLE_ROTATION[axis.toLowerCase()] = value;
                updates.push(`${value}° on ${axis.toUpperCase()}`);
            }
        }
        
        if (updates.length > 0) {
            console.log(`[Section 4] Multi-axis rotation updated: ${updates.join(', ')}`);
        } else {
            console.error('No valid rotation values provided. Use {x: 45, y: 90, z: 0} format');
            return;
        }
    } else {
        console.error('Invalid input. Use setPebbleRotation("x", 45) or setPebbleRotation({x: 45, y: 90, z: 0})');
        return;
    }
    
    console.log('Current rotation:', {x: SECTION4_PEBBLE_ROTATION.x, y: SECTION4_PEBBLE_ROTATION.y, z: SECTION4_PEBBLE_ROTATION.z});
    console.log('Refresh the page to see the changes, or scroll to Section 4');
}

// Continuous Y spin (degrees per second) independent of scroll
export const SECTION4_PEBBLE_SPIN = {
    enabled: false, // Disabled - no Y-axis animation
    degPerSecond: 24,
    // Extra spin impulse when middle items appear
    boostDegPerSecond: 1000,
    boostDecayPerSecond: 750
};

// Continuous X-axis wobble (sinusoidal) to accompany base Y spin
export const SECTION4_PEBBLE_WOBBLE = {
    enabled: false, // Disabled to prevent overriding static X rotation
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
    periodB: .25, // after h2 fade-out
    pebbleIn: 2,
    periodC: 4, // before list begins
    // panel items (title+body per item)
    itemTitleIn: 1.0,
    itemBodyIn: 1.0,
    itemHold: 1.2,
    itemFadeOut: 0.8,
    periodBetweenItems: 0.6
};

// Section 4 scroll distance scaling (maps timeline duration to scroll length)
export const SECTION4_SCROLL = {
    pxPerUnit: 700 // increase to slow down overall scrub speed
};
