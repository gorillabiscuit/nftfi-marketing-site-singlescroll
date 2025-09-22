// Section 5 (Trusted By/Horizontal Scroll) Configuration for NFTfi Marketing Site
// Contains horizontal scroll animation settings for tiles and logos

import { BREAKPOINT_NAMES } from './breakpoints.js';

// Breakpoint-specific layout configuration for Section 5
// Controls tile sizes, vertical positioning, and spacing per breakpoint
export const SECTION5_LAYOUT = {
    [BREAKPOINT_NAMES.MOBILE]: {
        // Explicit tweet count per row (world-class approach)
        topRowCount: 6,           // Exactly 6 tweets in top row
        bottomRowCount: 6,        // Exactly 6 tweets in bottom row
        // Card sizing (CSS handles responsive sizing)
        topRowTileSize: 220,      // Base size for CSS calculations
        bottomRowTileSize: 220,   // Base size for CSS calculations
        // Y-offset from natural center (CSS transform translateY value)
        yOffset: '0px',         // Slightly higher on mobile
        // Row spacing
        rowGap: '2rem',
        // Title positioning
        titleYOffset: '-20px'
    },
    [BREAKPOINT_NAMES.TABLET]: {
        // Explicit tweet count per row
        topRowCount: 8,           // Exactly 8 tweets in top row
        bottomRowCount: 8,        // Exactly 8 tweets in bottom row
        // Card sizing
        topRowTileSize: 280,      // Base size for CSS calculations
        bottomRowTileSize: 280,   // Base size for CSS calculations
        yOffset: '0px',           // Natural center
        rowGap: '2.5rem',
        titleYOffset: '0px'
    },
    [BREAKPOINT_NAMES.DESKTOP]: {
        // Explicit tweet count per row
        topRowCount: 10,          // Exactly 10 tweets in top row
        bottomRowCount: 10,       // Exactly 10 tweets in bottom row
        // Card sizing
        topRowTileSize: 200,      // Base size for CSS calculations
        bottomRowTileSize: 200,   // Base size for CSS calculations
        yOffset: '20px',          // Slightly lower on desktop
        rowGap: '3rem',
        titleYOffset: '10px'
    },
    [BREAKPOINT_NAMES.LARGE]: {
        // Explicit tweet count per row
        topRowCount: 12,          // Exactly 12 tweets in top row
        bottomRowCount: 12,       // Exactly 12 tweets in bottom row
        // Card sizing
        topRowTileSize: 280,      // Base size for CSS calculations
        bottomRowTileSize: 280,   // Base size for CSS calculations
        yOffset: '0px',          // More spacing on large screens
        rowGap: '1.5rem',
        titleYOffset: '15px'
    }
};

// Section 5 horizontal scroll animation configuration
export const SECTION5_CONFIG = {
    // Scroll speed control (pixels of scroll per second of timeline duration)
    scrollSpeed: 10000, // Further reduced for slower, more readable scroll
    
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
    initialOffsetMultiplier: 2, // Controls how far off-screen both rows start (0.5 = closer, 2.0 = further)
    
    // Exit offset distance control (single value for synchronized unpinning)
    exitOffsetMultiplier: 2, // Controls how far off-screen tiles must travel before unpinning (0.5 = unpin sooner, 2.0 = unpin later)
    
    // Travel distance multipliers for fine-tuning synchronization
    travelMultipliers: {
        topRow: 0.3,    // Further reduced for slower top row movement
        bottomRow: 0.3  // Further reduced for slower bottom row movement
    },
    
    // Starting positions (where tiles begin off-screen)
    startPositions: {
        topRow: 'right',    // Start off-screen: 'left' or 'right'
        bottomRow: 'left'   // Start off-screen: 'left' or 'right'
    },
    
    // Title animation timings (matches Section 4 pattern)
    titleTimings: {
        periodA: 0.2,      // Initial delay before title appears
        h2FadeIn: 0.25,     // Title fade in duration  
        h2Show: 0.5,       // How long title stays visible
        h2FadeOut: 0.2     // Title fade out duration
    }
};
