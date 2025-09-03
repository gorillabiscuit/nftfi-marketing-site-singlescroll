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
        
        // Prevent scrolling during loading
        this.preventScrolling();
        
        // Fallback timeout to ensure loading screen doesn't stay forever
        this.fallbackTimeout = setTimeout(() => {
            console.warn('[Loading] Timeout reached, force completing loading screen');
            this.forceComplete();
        }, 5000); // 5 second timeout (reduced since we're not waiting for videos)
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
    
    preventScrolling() {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
    }
    
    allowScrolling() {
        console.log('[Loading] Restoring scrolling capability');
        // Remove loading-specific scroll prevention
        document.body.style.overflow = '';
        document.body.style.height = '';
        // Remove any scroll-disabled classes that might be applied
        document.body.classList.remove('scroll-disabled');
        document.documentElement.classList.remove('scroll-disabled');
        // Force scroll capability
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
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
        
        // Clear fallback timeout
        if (this.fallbackTimeout) {
            clearTimeout(this.fallbackTimeout);
            this.fallbackTimeout = null;
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

export function forceAllowScrolling() {
    console.log('[Loading] Emergency scroll restoration');
    loadingManager.allowScrolling();
    // Also remove loading screen if it's still there
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

// Expose emergency functions globally for debugging
window.forceCompleteLoading = forceCompleteLoading;
window.forceAllowScrolling = forceAllowScrolling;
