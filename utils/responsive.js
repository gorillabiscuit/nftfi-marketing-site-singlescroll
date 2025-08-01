/**
 * Responsive Controller for Three.js
 * Handles camera adjustments, mesh positioning, and performance optimizations
 */

class ResponsiveController {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.deviceType = this.detectDevice();
        this.meshes = new Map();
        this.init();
    }

    /**
     * Detect device type based on screen size and capabilities
     */
    detectDevice() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelRatio = window.devicePixelRatio || 1;
        const isMobile = width <= 768;
        const isTablet = width > 768 && width <= 1024;
        const isHighDPI = pixelRatio > 2;

        if (isMobile) return 'mobile';
        if (isTablet) return 'tablet';
        if (isHighDPI) return 'high-dpi';
        return 'desktop';
    }

    /**
     * Initialize responsive controller
     */
    init() {
        this.setupEventListeners();
        this.optimizeForDevice();
        this.updateCamera();
        this.updateMeshPositions();
    }

    /**
     * Setup window resize and device orientation change listeners
     */
    setupEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const newDeviceType = this.detectDevice();
        
        if (newDeviceType !== this.deviceType) {
            this.deviceType = newDeviceType;
            this.optimizeForDevice();
        }
        
        this.updateCamera();
        this.updateMeshPositions();
    }

    /**
     * Handle device orientation change
     */
    handleOrientationChange() {
        // Wait for orientation change to complete
        setTimeout(() => {
            this.handleResize();
        }, 100);
    }

    /**
     * Optimize Three.js for current device
     */
    optimizeForDevice() {
        switch (this.deviceType) {
            case 'mobile':
                this.optimizeForMobile();
                break;
            case 'tablet':
                this.optimizeForTablet();
                break;
            case 'high-dpi':
                this.optimizeForHighDPI();
                break;
            default:
                this.optimizeForDesktop();
        }
    }

    /**
     * Mobile optimizations
     */
    optimizeForMobile() {
        // Reduce pixel ratio for better performance
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        
        // Adjust camera for mobile
        this.camera.fov = 75;
        this.camera.position.set(0, 0, 5);
        
        // Reduce shadow quality
        this.renderer.shadowMap.enabled = false;
        
        console.log('Optimized for mobile device');
    }

    /**
     * Tablet optimizations
     */
    optimizeForTablet() {
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.fov = 70;
        this.camera.position.set(0, 0, 4);
        
        console.log('Optimized for tablet device');
    }

    /**
     * High DPI optimizations
     */
    optimizeForHighDPI() {
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.fov = 65;
        this.camera.position.set(0, 0, 3);
        
        console.log('Optimized for high DPI display');
    }

    /**
     * Desktop optimizations
     */
    optimizeForDesktop() {
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.fov = 60;
        this.camera.position.set(0, 0, 3);
        
        console.log('Optimized for desktop device');
    }

    /**
     * Update camera aspect ratio and projection
     */
    updateCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    /**
     * Register a mesh with responsive positioning
     */
    registerMesh(name, mesh, desktopPosition, mobilePosition, tabletPosition) {
        this.meshes.set(name, {
            mesh,
            positions: {
                desktop: desktopPosition,
                mobile: mobilePosition,
                tablet: tabletPosition || desktopPosition
            }
        });
    }

    /**
     * Update mesh positions based on device type
     */
    updateMeshPositions() {
        this.meshes.forEach((config, name) => {
            const position = this.getPositionForDevice(config.positions);
            config.mesh.position.set(position.x, position.y, position.z);
        });
    }

    /**
     * Get appropriate position for current device
     */
    getPositionForDevice(positions) {
        switch (this.deviceType) {
            case 'mobile':
                return positions.mobile;
            case 'tablet':
                return positions.tablet;
            default:
                return positions.desktop;
        }
    }

    /**
     * Get current device type
     */
    getDeviceType() {
        return this.deviceType;
    }

    /**
     * Check if current device is mobile
     */
    isMobile() {
        return this.deviceType === 'mobile';
    }

    /**
     * Check if current device is tablet
     */
    isTablet() {
        return this.deviceType === 'tablet';
    }

    /**
     * Get responsive camera settings
     */
    getCameraSettings() {
        const settings = {
            mobile: {
                fov: 75,
                position: { x: 0, y: 0, z: 5 },
                near: 0.1,
                far: 1000
            },
            tablet: {
                fov: 70,
                position: { x: 0, y: 0, z: 4 },
                near: 0.1,
                far: 1000
            },
            desktop: {
                fov: 60,
                position: { x: 0, y: 0, z: 3 },
                near: 0.1,
                far: 1000
            }
        };

        return settings[this.deviceType] || settings.desktop;
    }

    /**
     * Apply camera settings
     */
    applyCameraSettings() {
        const settings = this.getCameraSettings();
        
        this.camera.fov = settings.fov;
        this.camera.position.set(settings.position.x, settings.position.y, settings.position.z);
        this.camera.near = settings.near;
        this.camera.far = settings.far;
        this.camera.updateProjectionMatrix();
    }

    /**
     * Cleanup event listeners
     */
    destroy() {
        window.removeEventListener('resize', this.handleResize.bind(this));
        window.removeEventListener('orientationchange', this.handleOrientationChange.bind(this));
    }
}

export default ResponsiveController; 