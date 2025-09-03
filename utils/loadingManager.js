// Loading Manager for NFTfi Marketing Site
// Tracks all asset loading and provides progress feedback

class LoadingManager {
    constructor() {
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.loadingSteps = [];
        this.currentStep = 0;
        this.isComplete = false;
        
        // DOM elements
        this.loadingScreen = null;
        this.loadingText = null;
        this.loadingBar = null;
        this.loadingPercentage = null;
        
        // Initialize DOM references
        this.initializeDOMReferences();
        
        // Define loading steps
        this.defineLoadingSteps();
        
        // Initial scroll prevention (body fallback until ScrollSmoother is ready)
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        console.log('[Loading] Initial body overflow prevention applied');
        
        // Fallback timeout to ensure loading screen doesn't stay forever
        this.fallbackTimeout = setTimeout(() => {
            console.warn('[Loading] Timeout reached, force completing loading screen');
            this.forceComplete();
        }, 3000); // 3 second timeout - aggressive fallback
        
        // Additional immediate fallback for emergencies
        this.emergencyTimeout = setTimeout(() => {
            console.error('[Loading] Emergency timeout - forcing scroll capability');
            this.allowScrolling();
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }, 1500); // 1.5 second emergency timeout
    }
    
    initializeDOMReferences() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingText = document.getElementById('loading-text');
        this.loadingBar = document.getElementById('loading-bar');
        this.loadingPercentage = document.getElementById('loading-percentage');
    }
    
    defineLoadingSteps() {
        this.loadingSteps = [
            { name: 'Initializing Three.js...', weight: 10 },
            { name: 'Loading 3D models...', weight: 40 },
            { name: 'Loading images...', weight: 25 },
            { name: 'Initializing shaders...', weight: 15 },
            { name: 'Preparing animations...', weight: 10 }
        ];
        
        this.totalAssets = this.loadingSteps.reduce((sum, step) => sum + step.weight, 0);
    }
    
    // Switch to ScrollSmoother control once it's initialized
    switchToScrollSmootherControl() {
        if (window.smoother && !this.isComplete) {
            console.log('[Loading] Switching to ScrollSmoother control');
            // Pause ScrollSmoother to prevent scrolling
            window.smoother.paused(true);
            // Restore body since ScrollSmoother is now handling scroll control
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
    }
    
    preventScrolling() {
        console.log('[Loading] Preventing scrolling via ScrollSmoother');
        // Since ScrollSmoother controls scrolling, pause it instead of body overflow
        if (window.smoother) {
            window.smoother.paused(true);
            console.log('[Loading] ScrollSmoother paused');
        } else {
            // Fallback: prevent body scrolling if ScrollSmoother isn't available
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            console.log('[Loading] Fallback: Body overflow hidden');
        }
    }
    
    allowScrolling() {
        console.log('[Loading] Restoring scrolling capability');
        
        // Primary: Restore ScrollSmoother scrolling (the main scroll controller)
        if (window.smoother) {
            console.log('[Loading] Unpausing ScrollSmoother to restore scrolling');
            window.smoother.paused(false);
        } else {
            // Fallback: restore body scrolling if ScrollSmoother isn't available
            console.log('[Loading] Fallback: Restoring body overflow');
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.overflowY = 'auto';
        }
        
        // Clean up any scroll-disabled classes
        document.body.classList.remove('scroll-disabled');
        document.documentElement.classList.remove('scroll-disabled');
    }
    
    updateProgress(stepName, progress) {
        if (typeof progress === 'undefined') {
            progress = 100;
        }
        if (this.isComplete) return;
        
        // Find current step
        const stepIndex = this.loadingSteps.findIndex(step => step.name === stepName);
        if (stepIndex === -1) return;
        
        // Calculate total progress
        let totalProgress = 0;
        
        // Add completed steps
        for (let i = 0; i < stepIndex; i++) {
            totalProgress += this.loadingSteps[i].weight;
        }
        
        // Add current step progress
        totalProgress += (this.loadingSteps[stepIndex].weight * progress) / 100;
        
        // Calculate percentage
        const percentage = Math.min(100, Math.round((totalProgress / this.totalAssets) * 100));
        
        // Update UI
        this.updateUI(stepName, percentage);
    }
    
    updateUI(stepName, percentage) {
        if (this.loadingText) {
            this.loadingText.textContent = stepName;
        }
        
        if (this.loadingBar) {
            this.loadingBar.style.width = `${percentage}%`;
        }
        
        if (this.loadingPercentage) {
            this.loadingPercentage.textContent = `${percentage}%`;
        }
    }
    
    completeStep(stepName) {
        this.updateProgress(stepName, 100);
        this.currentStep++;
    }
    
    complete() {
        if (this.isComplete) return;
        
        this.isComplete = true;
        this.updateUI('Ready!', 100);
        
        // Clear fallback timeouts
        if (this.fallbackTimeout) {
            clearTimeout(this.fallbackTimeout);
            this.fallbackTimeout = null;
        }
        if (this.emergencyTimeout) {
            clearTimeout(this.emergencyTimeout);
            this.emergencyTimeout = null;
        }
        
        // Wait a moment to show 100%, then fade out
        setTimeout(() => {
            this.fadeOut();
        }, 500);
    }
    
    // Emergency fallback to force remove loading screen
    forceComplete() {
        console.log('[Loading] Force completing loading screen');
        this.isComplete = true;
        this.fadeOut();
    }
    
    fadeOut() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            
            // Remove from DOM and allow scrolling after transition
            setTimeout(() => {
                this.allowScrolling();
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                }
            }, 800); // Match CSS transition duration
        }
    }
    
    // Utility methods for tracking specific asset types
    trackModelLoad(modelName) {
        console.log(`[Loading] Model loaded: ${modelName}`);
        this.updateProgress('Loading 3D models...', 
            this.getModelLoadProgress());
    }
    
    trackVideoLoad(videoName) {
        console.log(`[Loading] Video loaded: ${videoName}`);
        this.updateProgress('Loading video assets...', 
            this.getVideoLoadProgress());
    }
    
    trackImageLoad(imageName) {
        console.log(`[Loading] Image loaded: ${imageName}`);
        this.updateProgress('Loading images...', 
            this.getImageLoadProgress());
    }
    
    // Progress calculation methods (these would be updated based on actual asset counts)
    getModelLoadProgress() {
        // This would track actual model loading progress
        // For now, return incremental progress
        return Math.min(100, this.loadedAssets * 33.33);
    }
    
    getVideoLoadProgress() {
        // Track video loading progress
        return Math.min(100, this.loadedAssets * 25);
    }
    
    getImageLoadProgress() {
        // Track image loading progress  
        return Math.min(100, this.loadedAssets * 50);
    }
}

// Create global loading manager instance
export const loadingManager = new LoadingManager();

// Export convenience methods
export function updateLoadingProgress(stepName, progress) {
    loadingManager.updateProgress(stepName, progress);
}

export function completeLoadingStep(stepName) {
    loadingManager.completeStep(stepName);
}

export function completeLoading() {
    loadingManager.complete();
}

export function trackAssetLoad(assetType, assetName) {
    switch(assetType) {
        case 'model':
            loadingManager.trackModelLoad(assetName);
            break;
        case 'video':
            loadingManager.trackVideoLoad(assetName);
            break;
        case 'image':
            loadingManager.trackImageLoad(assetName);
            break;
        default:
            console.log(`[Loading] Asset loaded: ${assetName}`);
    }
}

export function forceCompleteLoading() {
    loadingManager.forceComplete();
}

export function switchToScrollSmootherControl() {
    loadingManager.switchToScrollSmootherControl();
}

export function forceAllowScrolling() {
    console.log('[Loading] Emergency scroll restoration');
    loadingManager.allowScrolling();
    // Also remove loading screen if it's still there
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    // Force ScrollSmoother restoration as backup
    if (window.smoother) {
        console.log('[Loading] Emergency: Unpausing ScrollSmoother');
        window.smoother.paused(false);
    }
}

// Expose emergency functions globally for debugging
window.forceCompleteLoading = forceCompleteLoading;
window.forceAllowScrolling = forceAllowScrolling;
