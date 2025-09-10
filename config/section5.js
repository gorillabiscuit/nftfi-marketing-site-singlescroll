// Section 5 (Trusted By/Horizontal Scroll) Configuration for NFTfi Marketing Site
// Contains horizontal scroll animation settings for tiles and logos

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
