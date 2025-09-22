// Section 5 (Trusted By/Horizontal Scroll) Configuration for NFTfi Marketing Site
// Contains horizontal scroll animation settings for tiles and logos

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Breakpoint-specific layout configuration for Section 5
// Controls tile sizes, vertical positioning, and spacing per breakpoint
export const SECTION5_LAYOUT = {
    [BREAKPOINT_NAMES.MOBILE]: {
        // Testimonial card sizes (pixels) - optimized for mobile viewing
        topRowTileSize: 200,      // Smaller cards for mobile
        bottomRowTileSize: 200,   // Even smaller for bottom row
        // Y-offset from natural center (CSS transform translateY value)
        yOffset: '-10px',         // Slightly higher on mobile
        // Row spacing
        rowGap: '2rem',
        // Title positioning
        titleYOffset: '-20px'
    },
    [BREAKPOINT_NAMES.TABLET]: {
        topRowTileSize: 300,      // Medium cards for tablet
        bottomRowTileSize: 260,   // Slightly smaller bottom row
        yOffset: '0px',           // Natural center
        rowGap: '2.5rem',
        titleYOffset: '0px'
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        topRowTileSize: 200,      // Standard testimonial card size
        bottomRowTileSize: 200,   // Slightly smaller for variety
        yOffset: '20px',          // Slightly lower on desktop
        rowGap: '3rem',
        titleYOffset: '10px'
    },
    [BREAKPOINT_NAMES.LARGE]: {
        topRowTileSize: 280,      // Larger cards for big screens
        bottomRowTileSize: 280,   // Proportionally larger
        yOffset: '0px',          // More spacing on large screens
        rowGap: '1.5rem',
        titleYOffset: '15px'
    }
};

// Section 5 horizontal scroll animation configuration
export const SECTION5_CONFIG = {
    // Scroll speed control (pixels of scroll per second of timeline duration)
    scrollSpeed: 10000, // Adjustable: higher = faster scroll, lower = slower scroll
    
    // Tile size configuration (base sizes in pixels)
    topRowTileSize: 320,      // Top row tile size
    bottomRowTileSize: 140,   // Bottom row tile size (30% smaller by default)
    
    // Row positioning (CSS transform values)
    topRowPosition: {
        x: 0,     // Horizontal offset from center
        y: '1rem' // Vertical offset (above center)
    },
    bottomRowPosition: {
        x: 0,     // Horizontal offset from center  
        y: '2rem' // Vertical offset (below center)
    },
    
    // Animation behavior
    scrollDirection: {
        topRow: 'left',    // 'left' or 'right'
        bottomRow: 'right' // 'left' or 'right'
    },
    
    // Initial offset distance control (single value for synchronized appearance)
    initialOffsetMultiplier: 0.5, // Controls how far off-screen both rows start (0.5 = closer, 2.0 = further)
    
    // Exit offset distance control (single value for synchronized unpinning)
    exitOffsetMultiplier: 0.6, // Controls how far off-screen tiles must travel before unpinning (0.5 = unpin sooner, 2.0 = unpin later)
    
    // Travel distance multipliers for fine-tuning synchronization
    travelMultipliers: {
        topRow: 1.0,    // Multiplier for top row travel distance
        bottomRow: 1.0  // Multiplier for bottom row travel distance
    },
    
    // Starting positions (where tiles begin off-screen)
    startPositions: {
        topRow: 'right',    // Start off-screen: 'left' or 'right'
        bottomRow: 'left'   // Start off-screen: 'left' or 'right'
    },
    
    // Title animation timings (matches Section 4 pattern)
    titleTimings: {
        periodA: 0.5,      // Initial delay before title appears
        h2FadeIn: 0.5,     // Title fade in duration  
        h2Show: 1.0,       // How long title stays visible
        h2FadeOut: 0.5     // Title fade out duration
    }
};
