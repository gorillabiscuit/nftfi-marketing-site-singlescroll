// Unified Pinning System for NFTfi Marketing Site
// Provides consistent pinning behavior across all sections using Scroll Speed Manager

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLL_CONFIG } from '../config/scrollConfig.js';
import scrollSpeedManager from './scrollSpeedManager.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class UnifiedPinningSystem {
    constructor() {
        this.pinnedSections = new Map();
        this.isInitialized = false;
        this.debugMode = SCROLL_CONFIG.debug.enabled;
        
        console.log('UnifiedPinningSystem initialized');
    }

    /**
     * Initialize the unified pinning system
     */
    initialize() {
        this.isInitialized = true;
        
        if (this.debugMode) {
            console.log('UnifiedPinningSystem: System initialized');
        }
        
        return this;
    }

    /**
     * Create a consistent pin trigger for any section
     * @param {Object} options - Configuration options
     * @returns {Object} ScrollTrigger instance
     */
    createPinTrigger(options) {
        const {
            sectionNumber,
            triggerElement,
            pinElement,
            animation,
            originalDistance,
            customEnd,
            onUpdate,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
            animationEndProgress  // NEW: Optional - animation completes at this progress, then holds
        } = options;

        // Validate required parameters
        if (!sectionNumber || !triggerElement) {
            console.error('UnifiedPinningSystem: Missing required parameters (sectionNumber, triggerElement)');
            return null;
        }

        // Register section with Scroll Speed Manager
        scrollSpeedManager.registerSection(sectionNumber, triggerElement);

        // Calculate normalized scroll distance
        const normalizedDistance = scrollSpeedManager.normalizeSpeed(
            sectionNumber, 
            originalDistance || 1000
        );

        // Mobile: disable pinning entirely (return null to skip creating triggers)
        try {
            if (typeof window !== 'undefined' && window.innerWidth <= 600) {
                if (this.debugMode) {
                    console.log('UnifiedPinningSystem: Skipping pin on mobile for section', sectionNumber);
                }
                return null;
            }
        } catch (_) { /* no-op */ }

        // Create ScrollTrigger configuration
        const triggerConfig = {
            trigger: triggerElement,
            start: 'top top',
            end: customEnd || `+=${normalizedDistance}`,
            pin: pinElement || true,
            pinSpacing: SCROLL_CONFIG.pinning.pinSpacing,
            anticipatePin: SCROLL_CONFIG.pinning.anticipatePin,
            scrub: SCROLL_CONFIG.pinning.scrub,
            invalidateOnRefresh: SCROLL_CONFIG.pinning.invalidateOnRefresh,
            
            // Animation handling
            animation: animation,
            
            // Callbacks
            onUpdate: (self) => {
                // Animation progress handling
                if (animation && typeof animation.progress === 'function') {
                    if (animationEndProgress !== undefined) {
                        // Animation should complete at animationEndProgress, then hold
                        // Map scroll progress 0→animationEndProgress to animation 0→1
                        // After that point, keep animation at 100%
                        const clampedProgress = Math.min(self.progress / animationEndProgress, 1.0);
                        animation.progress(clampedProgress);
                        
                        if (this.debugMode && Math.random() < 0.05) { // Log occasionally to avoid spam
                            console.log(`UnifiedPinningSystem: Section ${sectionNumber}`, {
                                scrollProgress: (self.progress * 100).toFixed(1) + '%',
                                animationProgress: (clampedProgress * 100).toFixed(1) + '%',
                                holding: self.progress > animationEndProgress
                            });
                        }
                    } else {
                        // Default: 1:1 mapping of scroll progress to animation progress
                        animation.progress(self.progress);
                    }
                }
                
                // Call custom onUpdate if provided
                if (onUpdate) {
                    onUpdate(self);
                }
            },
            
            onEnter: (self) => {
                if (this.debugMode) {
                    console.log(`UnifiedPinningSystem: Section ${sectionNumber} entered`);
                }
                if (onEnter) onEnter(self);
            },
            
            onLeave: (self) => {
                if (this.debugMode) {
                    console.log(`UnifiedPinningSystem: Section ${sectionNumber} left`);
                }
                if (onLeave) onLeave(self);
            },
            
            onEnterBack: (self) => {
                if (this.debugMode) {
                    console.log(`UnifiedPinningSystem: Section ${sectionNumber} entered back`);
                }
                if (onEnterBack) onEnterBack(self);
            },
            
            onLeaveBack: (self) => {
                if (this.debugMode) {
                    console.log(`UnifiedPinningSystem: Section ${sectionNumber} left back`);
                }
                if (onLeaveBack) onLeaveBack(self);
            }
        };

        // Create ScrollTrigger
        const scrollTrigger = ScrollTrigger.create(triggerConfig);
        
        // Register with Scroll Speed Manager
        scrollSpeedManager.registerScrollTrigger(sectionNumber, scrollTrigger);
        
        // Store in our map
        this.pinnedSections.set(sectionNumber, {
            trigger: scrollTrigger,
            config: triggerConfig,
            element: triggerElement,
            animation: animation
        });

        if (this.debugMode) {
            console.log(`UnifiedPinningSystem: Created pin trigger for section ${sectionNumber}`, {
                distance: normalizedDistance,
                element: triggerElement,
                animation: !!animation
            });
        }

        return scrollTrigger;
    }

    /**
     * Create a simple pin trigger (no animation)
     * @param {number} sectionNumber - Section number
     * @param {HTMLElement} triggerElement - Element to pin
     * @param {number} originalDistance - Original scroll distance
     * @param {Object} options - Additional options
     * @returns {Object} ScrollTrigger instance
     */
    createSimplePin(sectionNumber, triggerElement, originalDistance, options = {}) {
        return this.createPinTrigger({
            sectionNumber,
            triggerElement,
            originalDistance,
            ...options
        });
    }

    /**
     * Create a pin trigger with animation
     * @param {number} sectionNumber - Section number
     * @param {HTMLElement} triggerElement - Element to pin
     * @param {Object} animation - GSAP animation/timeline
     * @param {number} originalDistance - Original scroll distance
     * @param {Object} options - Additional options
     * @returns {Object} ScrollTrigger instance
     */
    createAnimatedPin(sectionNumber, triggerElement, animation, originalDistance, options = {}) {
        return this.createPinTrigger({
            sectionNumber,
            triggerElement,
            animation,
            originalDistance,
            ...options
        });
    }

    /**
     * Update a section's scroll distance
     * @param {number} sectionNumber - Section number
     * @param {number} newDistance - New scroll distance
     */
    updateSectionDistance(sectionNumber, newDistance) {
        const section = this.pinnedSections.get(sectionNumber);
        if (!section) {
            console.warn(`UnifiedPinningSystem: Section ${sectionNumber} not found`);
            return;
        }

        // Calculate new normalized distance
        const normalizedDistance = scrollSpeedManager.normalizeSpeed(
            sectionNumber, 
            newDistance
        );

        // Update ScrollTrigger end point
        section.trigger.vars.end = `+=${normalizedDistance}`;
        section.trigger.refresh();

        if (this.debugMode) {
            console.log(`UnifiedPinningSystem: Updated section ${sectionNumber} distance to ${normalizedDistance}`);
        }
    }

    /**
     * Refresh all pinned sections
     */
    refreshAllSections() {
        if (this.debugMode) {
            console.log('UnifiedPinningSystem: Refreshing all sections');
        }

        // Use Scroll Speed Manager's refresh method
        scrollSpeedManager.refreshScrollTriggers();
    }

    /**
     * Get section information
     * @param {number} sectionNumber - Section number
     * @returns {Object} Section information
     */
    getSectionInfo(sectionNumber) {
        const section = this.pinnedSections.get(sectionNumber);
        if (!section) {
            return null;
        }

        return {
            sectionNumber,
            element: section.element,
            trigger: section.trigger,
            animation: section.animation,
            isActive: section.trigger.isActive,
            progress: section.trigger.progress,
            start: section.trigger.start,
            end: section.trigger.end
        };
    }

    /**
     * Get all sections information
     * @returns {Array} Array of section information
     */
    getAllSectionsInfo() {
        const sections = [];
        this.pinnedSections.forEach((section, sectionNumber) => {
            sections.push(this.getSectionInfo(sectionNumber));
        });
        return sections;
    }

    /**
     * Kill a specific section's pin trigger
     * @param {number} sectionNumber - Section number
     */
    killSection(sectionNumber) {
        const section = this.pinnedSections.get(sectionNumber);
        if (!section) {
            console.warn(`UnifiedPinningSystem: Section ${sectionNumber} not found`);
            return;
        }

        section.trigger.kill();
        this.pinnedSections.delete(sectionNumber);

        if (this.debugMode) {
            console.log(`UnifiedPinningSystem: Killed section ${sectionNumber}`);
        }
    }

    /**
     * Kill all pinned sections
     */
    killAllSections() {
        this.pinnedSections.forEach((section, sectionNumber) => {
            section.trigger.kill();
        });
        this.pinnedSections.clear();

        if (this.debugMode) {
            console.log('UnifiedPinningSystem: Killed all sections');
        }
    }

    /**
     * Update global scroll speed for all sections
     * @param {number} speedMultiplier - Speed multiplier
     */
    updateGlobalSpeed(speedMultiplier) {
        scrollSpeedManager.updateGlobalSpeed(speedMultiplier);
        
        // Refresh all sections to apply new speed
        this.refreshAllSections();

        if (this.debugMode) {
            console.log(`UnifiedPinningSystem: Updated global speed to ${speedMultiplier}x`);
        }
    }

    /**
     * Get debug information
     * @returns {Object} Debug information
     */
    getDebugInfo() {
        return {
            isInitialized: this.isInitialized,
            pinnedSectionsCount: this.pinnedSections.size,
            sections: this.getAllSectionsInfo(),
            scrollSpeedManager: scrollSpeedManager.getDebugInfo()
        };
    }

    /**
     * Cleanup and destroy the system
     */
    destroy() {
        this.killAllSections();
        this.isInitialized = false;

        if (this.debugMode) {
            console.log('UnifiedPinningSystem: Destroyed');
        }
    }
}

// Create and export singleton instance
const unifiedPinningSystem = new UnifiedPinningSystem();

export default unifiedPinningSystem;
