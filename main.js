// Main JavaScript file for NFTfi Marketing Site - Single Scroll
// Three.js scene with glass shader and scroll/mouse interactions

import * as THREE from 'three';
import { GLTFLoader } from './libs/GLTFLoader.js';


// Navigation functionality
function initializeNavigation() {
    
    const dropdowns = document.querySelectorAll('.dropdown-container');
    
    dropdowns.forEach((dropdown, index) => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        console.log(`📦 Dropdown ${index + 1}:`, {
            trigger: trigger ? 'Found' : 'Missing',
            menu: menu ? 'Found' : 'Missing',
            triggerText: trigger ? trigger.textContent.trim() : 'N/A',
            triggerVisible: trigger ? trigger.offsetParent !== null : false,
            menuVisible: menu ? menu.offsetParent !== null : false,
            menuDisplay: menu ? getComputedStyle(menu).display : 'N/A',
            menuVisibility: menu ? getComputedStyle(menu).visibility : 'N/A'
        });
        
        if (!trigger || !menu) {
            console.error('❌ Missing trigger or menu element');
            return;
        }
        
        // Toggle dropdown on click
        trigger.addEventListener('click', (e) => {
            console.log('🖱️ Dropdown clicked:', trigger.textContent.trim());
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = menu.classList.contains('open');
            console.log('📊 Current state:', isOpen ? 'Open' : 'Closed');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('open');
                    const otherTrigger = otherMenu.parentElement.querySelector('.dropdown-trigger');
                    if (otherTrigger) {
                        otherTrigger.classList.remove('open');
                    }
                }
            });
            
            // Toggle current dropdown
            if (isOpen) {
                console.log('🔽 Closing dropdown');
                menu.classList.remove('open');
                trigger.classList.remove('open');
                console.log('📊 Classes after close:', {
                    menuClasses: menu.className,
                    triggerClasses: trigger.className,
                    menuVisible: menu.style.visibility,
                    menuOpacity: menu.style.opacity
                });
            } else {
                console.log('🔼 Opening dropdown');
                menu.classList.add('open');
                trigger.classList.add('open');
                updateDropdownPosition(trigger, menu);
                console.log('📊 Classes after open:', {
                    menuClasses: menu.className,
                    triggerClasses: trigger.className,
                    menuVisible: menu.style.visibility,
                    menuOpacity: menu.style.opacity
                });
            }
        });
        
        console.log('✅ Event listener attached to dropdown', index + 1);
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            const openMenus = document.querySelectorAll('.dropdown-menu.open');
            if (openMenus.length > 0) {
                console.log('🔄 Closing dropdowns (outside click)');
                openMenus.forEach(menu => {
                    menu.classList.remove('open');
                    const trigger = menu.parentElement.querySelector('.dropdown-trigger');
                    if (trigger) {
                        trigger.classList.remove('open');
                    }
                });
            }
        }
    });
    
    // Close dropdowns on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openMenus = document.querySelectorAll('.dropdown-menu.open');
            if (openMenus.length > 0) {
                console.log('🔽 Closing dropdowns (escape key)');
                openMenus.forEach(menu => {
                    menu.classList.remove('open');
                    const trigger = menu.parentElement.querySelector('.dropdown-trigger');
                    if (trigger) {
                        trigger.classList.remove('open');
                    }
                });
            }
        }
    });
    
    // Update dropdown positions on window resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
            const trigger = menu.parentElement.querySelector('.dropdown-trigger');
            if (trigger) {
                updateDropdownPosition(trigger, menu);
            }
        });
    });
    
}

// Update dropdown position (improved positioning)
function updateDropdownPosition(trigger, menu) {
    
    // Get the trigger's position relative to its parent
    const triggerRect = trigger.getBoundingClientRect();
    const parentRect = trigger.parentElement.getBoundingClientRect();
    
    // Position the dropdown below the trigger
    menu.style.left = '0';
    menu.style.top = '100%';
    
    console.log('📍 Position set:', {
        left: menu.style.left,
        top: menu.style.top,
        triggerWidth: triggerRect.width,
        menuWidth: menu.offsetWidth
    });
}

// Initialize controls
function initializeControls() {
    // Accordion functionality
    initializeAccordion();
    
    // Light controls
    document.getElementById('lightX').addEventListener('input', updateLight);
    document.getElementById('lightY').addEventListener('input', updateLight);
    document.getElementById('lightZ').addEventListener('input', updateLight);
    
    // Material controls
    document.getElementById('diffuseness').addEventListener('input', updateMaterial);
    document.getElementById('shininess').addEventListener('input', updateMaterial);
    document.getElementById('fresnelPower').addEventListener('input', updateMaterial);
    
    // IOR controls
    document.getElementById('iorR').addEventListener('input', updateIOR);
    document.getElementById('iorY').addEventListener('input', updateIOR);
    document.getElementById('iorG').addEventListener('input', updateIOR);
    document.getElementById('iorC').addEventListener('input', updateIOR);
    document.getElementById('iorB').addEventListener('input', updateIOR);
    document.getElementById('iorP').addEventListener('input', updateIOR);
    
    // Effect controls
    document.getElementById('saturation').addEventListener('input', updateEffects);
    document.getElementById('chromaticAberration').addEventListener('input', updateEffects);
    document.getElementById('refraction').addEventListener('input', updateEffects);
    
    // Plane controls
    document.getElementById('planeX').addEventListener('input', updatePlane);
    document.getElementById('planeY').addEventListener('input', updatePlane);
    document.getElementById('planeZ').addEventListener('input', updatePlane);
    document.getElementById('planeScale').addEventListener('input', updatePlane);
    
    // Camera controls
    document.getElementById('cameraX').addEventListener('input', updateCamera);
    document.getElementById('cameraY').addEventListener('input', updateCamera);
    document.getElementById('cameraZ').addEventListener('input', updateCamera);
    document.getElementById('cameraFOV').addEventListener('input', updateCamera);
    
    // Sync UI with actual camera position
    if (camera) {
        // Set slider values to match camera position
        document.getElementById('cameraX').value = camera.position.x;
        document.getElementById('cameraY').value = camera.position.y;
        document.getElementById('cameraZ').value = camera.position.z;
        document.getElementById('cameraFOV').value = camera.fov; // Direct FOV value
        
        // Update display values
        updateCamera();
    }
}

// Initialize accordion functionality
function initializeAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', toggleAccordionSection);
    });
}

// Toggle accordion section
function toggleAccordionSection(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    const isExpanded = header.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        header.classList.remove('expanded');
        content.classList.remove('expanded');
    } else {
        // Expand
        header.classList.add('expanded');
        content.classList.add('expanded');
    }
}

function updateLight() {
    const x = parseFloat(document.getElementById('lightX').value);
    const y = parseFloat(document.getElementById('lightY').value);
    const z = parseFloat(document.getElementById('lightZ').value);
    
    document.getElementById('lightXValue').textContent = x.toFixed(1);
    document.getElementById('lightYValue').textContent = y.toFixed(1);
    document.getElementById('lightZValue').textContent = z.toFixed(1);
    
    if (uniforms && uniforms.uLight) {
        uniforms.uLight.value.set(x, y, z);
    }
}

function updateMaterial() {
    const diffuseness = parseFloat(document.getElementById('diffuseness').value);
    const shininess = parseFloat(document.getElementById('shininess').value);
    const fresnelPower = parseFloat(document.getElementById('fresnelPower').value);
    
    document.getElementById('diffusenessValue').textContent = diffuseness.toFixed(2);
    document.getElementById('shininessValue').textContent = shininess.toFixed(1);
    document.getElementById('fresnelPowerValue').textContent = fresnelPower.toFixed(1);
    
    if (uniforms) {
        if (uniforms.uDiffuseness) uniforms.uDiffuseness.value = diffuseness;
        if (uniforms.uShininess) uniforms.uShininess.value = shininess;
        if (uniforms.uFresnelPower) uniforms.uFresnelPower.value = fresnelPower;
    }
}

function updateIOR() {
    const iorR = parseFloat(document.getElementById('iorR').value);
    const iorY = parseFloat(document.getElementById('iorY').value);
    const iorG = parseFloat(document.getElementById('iorG').value);
    const iorC = parseFloat(document.getElementById('iorC').value);
    const iorB = parseFloat(document.getElementById('iorB').value);
    const iorP = parseFloat(document.getElementById('iorP').value);
    
    document.getElementById('iorRValue').textContent = iorR.toFixed(3);
    document.getElementById('iorYValue').textContent = iorY.toFixed(3);
    document.getElementById('iorGValue').textContent = iorG.toFixed(3);
    document.getElementById('iorCValue').textContent = iorC.toFixed(3);
    document.getElementById('iorBValue').textContent = iorB.toFixed(3);
    document.getElementById('iorPValue').textContent = iorP.toFixed(3);
    
    if (uniforms) {
        if (uniforms.uIorR) uniforms.uIorR.value = iorR;
        if (uniforms.uIorY) uniforms.uIorY.value = iorY;
        if (uniforms.uIorG) uniforms.uIorG.value = iorG;
        if (uniforms.uIorC) uniforms.uIorC.value = iorC;
        if (uniforms.uIorB) uniforms.uIorB.value = iorB;
        if (uniforms.uIorP) uniforms.uIorP.value = iorP;
    }
}

function updateEffects() {
    const saturation = parseFloat(document.getElementById('saturation').value);
    const chromaticAberration = parseFloat(document.getElementById('chromaticAberration').value);
    const refraction = parseFloat(document.getElementById('refraction').value);
    
    document.getElementById('saturationValue').textContent = saturation.toFixed(2);
    document.getElementById('chromaticAberrationValue').textContent = chromaticAberration.toFixed(2);
    document.getElementById('refractionValue').textContent = refraction.toFixed(2);
    
    if (uniforms) {
        if (uniforms.uSaturation) uniforms.uSaturation.value = saturation;
        if (uniforms.uChromaticAberration) uniforms.uChromaticAberration.value = chromaticAberration;
        if (uniforms.uRefractPower) uniforms.uRefractPower.value = refraction;
    }
}

function updatePlane() {
    const x = parseFloat(document.getElementById('planeX').value);
    const y = parseFloat(document.getElementById('planeY').value);
    const z = parseFloat(document.getElementById('planeZ').value);
    const scale = parseFloat(document.getElementById('planeScale').value);
    
    document.getElementById('planeXValue').textContent = x.toFixed(1);
    document.getElementById('planeYValue').textContent = y.toFixed(1);
    document.getElementById('planeZValue').textContent = z.toFixed(1);
    document.getElementById('planeScaleValue').textContent = scale.toFixed(1);
    
    // Update plane position and scale using direct reference
    if (backgroundPlane) {
        backgroundPlane.position.set(x, y, z);
        backgroundPlane.scale.setScalar(scale);
        
        // Update plane geometry dimensions
        const width = 20 * scale;
        const height = width * (591 / 1325);
        backgroundPlane.geometry.dispose();
        backgroundPlane.geometry = new THREE.PlaneGeometry(width, height);
    }
}

function updateCamera() {
    const x = parseFloat(document.getElementById('cameraX').value);
    const y = parseFloat(document.getElementById('cameraY').value);
    const z = parseFloat(document.getElementById('cameraZ').value);
    const fovSlider = parseFloat(document.getElementById('cameraFOV').value);
    
    document.getElementById('cameraXValue').textContent = x.toFixed(1);
    document.getElementById('cameraYValue').textContent = y.toFixed(1);
    document.getElementById('cameraZValue').textContent = z.toFixed(1);
    document.getElementById('cameraFOVValue').textContent = fovSlider.toFixed(0);
    
    // Update camera position and FOV
    if (camera) {
        // Update position
        camera.position.set(x, y, z);
        
        // FOV logic: slider value directly sets the FOV
        camera.fov = fovSlider;
        
        // Force projection matrix update
        camera.updateProjectionMatrix();
        
        console.log('Camera updated:', {
            position: camera.position,
            fov: camera.fov,
            sliderValue: fovSlider,
            aspect: camera.aspect
        });
    }
}

// Initialize controls when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Three.js to initialize
    setTimeout(() => {
        initializeControls();
        // Set initial plane position to -8.9
        updatePlane();
    }, 1000);
});

// Import GSAP and ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Scene variables
let scene, camera, renderer, canvas;
let mesh, wrapper;
let isModelReady = false;
let mainRenderTarget, backRenderTarget;
let backgroundPlane; // Reference to background plane for render target control
let uniforms;
let mouseInfluence = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let startTime = Date.now(); // For time-based rotation calculations

// Scroll animation variables
let scrollTimeline;
let originalWrapperPosition = { x: 0, y: 0, z: 0 };
let originalWrapperScale = { x: 3, y: 3, z: 3 };

// Scroll spin tracking variables
let scrollSpinVelocity = 0;
let lastScrollDirection = 0;
let lastScrollTime = 0;

// Responsive positioning cache
let cachedTargetPosition = null;
let lastViewportSize = { width: 0, height: 0 };

// Model positioning configuration - EASY TO TWEAK!
const MODEL_CONFIG = {
    // Starting position (right side of screen)
    startPosition: {
        x: 4,    // Move right (positive = right)
        y: 0,    // Center vertically
        z: 0     // Keep same depth
    },
    
    // Scale configuration
    startScale: 3.0,    // Starting scale
    
    // Animation timing
    scrubDuration: 1,    // Smooth transition duration
    
    // Floating animation settings
    floatAmplitude: 0.5, // Small amplitude for subtle movement
    floatSpeed: 0.8, // Slow, gentle speed
    
    // Scroll spin settings
    spinIntensity: 0.1, // How much spin per scroll unit
    spinDecay: 0.15, // How quickly spin decays (0.95 = slow decay)
    
    // BREAKPOINT CONFIGURATIONS - Different settings for different screen sizes
    breakpoints: {
        // Mobile (320px - 767px)
        mobile: {
            viewportTarget: {
                xPercent: 0.05,  // 5% from left edge
                yPercent: 0.05,  // 5% from top edge
                zDepth: 0
            },
            fallbackTarget: {
                x: -8,   // Move left
                y: 3,    // Move up
                z: 0
            },
            responsiveScale: {
                minScale: 0.05,   // Very small for mobile
                maxScale: 0.15,   // Small max for mobile
                viewportThreshold: 320
            }
        },
        
        // Tablet (768px - 1199px)
        tablet: {
            viewportTarget: {
                xPercent: 0.08,  // 8% from left edge
                yPercent: 0.08,  // 8% from top edge
                zDepth: 0
            },
            fallbackTarget: {
                x: -9,   // Move left
                y: 4,    // Move up
                z: 0
            },
            responsiveScale: {
                minScale: 0.08,   // Medium small for tablet
                maxScale: 0.2,    // Medium max for tablet
                viewportThreshold: 768
            }
        },
        
        // Desktop (1200px+)
        desktop: {
            viewportTarget: {
                xPercent: 0.1,   // 10% from left edge
                yPercent: 0.1,   // 10% from top edge
                zDepth: 0
            },
            fallbackTarget: {
                x: -9.725,   // Move left
                y: 4.7,      // Move up
                z: 0
            },
            responsiveScale: {
                minScale: 0.1,   // Larger min for desktop
                maxScale: 0.3,   // Larger max for desktop
                viewportThreshold: 1200
            }
        }
    }
};

// Shader code
const vertexShader = `
varying vec3 worldNormal;
varying vec3 eyeVector;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  worldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
  eyeVector = normalize(worldPos.xyz - cameraPosition);
}
`;

const fragmentShader = `
uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;

uniform float uSaturation;
uniform float uChromaticAberration;
uniform float uRefractPower;
uniform float uFresnelPower;
uniform float uShininess;
uniform float uDiffuseness;
uniform vec3 uLight;

uniform vec2 winResolution;
uniform sampler2D uTexture;

varying vec3 worldNormal;
varying vec3 eyeVector;

vec3 sat(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;
  
  return pow(inversefresnelFactor, power);
}

float specular(vec3 light, float shininess, float diffuseness) {
  vec3 normal = worldNormal;
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeVector + lightVector);

  float NdotL = dot(normal, lightVector);
  float NdotH =  dot(normal, halfVector);
  float kDiffuse = max(0.0, NdotL);
  float NdotH2 = NdotH * NdotH;

  float kSpecular = pow(NdotH2, shininess);
  return  kSpecular + kDiffuse * diffuseness;
}

const int LOOP = 16;

void main() {
  float iorRatioRed = 1.0/uIorR;
  float iorRatioGreen = 1.0/uIorG;
  float iorRatioBlue = 1.0/uIorB;

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;
  vec3 color = vec3(0.0);

  for ( int i = 0; i < LOOP; i ++ ) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(eyeVector, normal,(1.0/uIorR));
    vec3 refractVecY = refract(eyeVector, normal, (1.0/uIorY));
    vec3 refractVecG = refract(eyeVector, normal, (1.0/uIorG));
    vec3 refractVecC = refract(eyeVector, normal, (1.0/uIorC));
    vec3 refractVecB = refract(eyeVector, normal, (1.0/uIorB));
    vec3 refractVecP = refract(eyeVector, normal, (1.0/uIorP));

    float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;

    float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
                texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;

    float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;

    float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
                texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;
          
    float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;

    float p = (texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
                texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;

    float R = r + (2.0*p + 2.0*y - c)/3.0;
    float G = g + (2.0*y + 2.0*c - p)/3.0;
    float B = b + (2.0*c + 2.0*p - y)/3.0;

    color.r += R;
    color.g += G;
    color.b += B;

    color = sat(color, uSaturation);
  }

  // Divide by the number of layers to normalize colors (rgb values can be worth up to the value of LOOP)
  color /= float( LOOP );

  // Specular
  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight;

  // Fresnel
  float f = fresnel(eyeVector, normal, uFresnelPower);
  color.rgb += f * vec3(1.0);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

// Initialize Three.js scene
function init() {
    
    // Get canvas
    canvas = document.getElementById('three-canvas');
    
    // Use full viewport dimensions instead of square constraint
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create scene
    scene = new THREE.Scene();
    // Set transparent background instead of black
    scene.background = null;
    
    // Create camera with full viewport aspect ratio
    camera = new THREE.PerspectiveCamera(18, width / height, 0.1, 1000); // FOV 18, full viewport aspect
    camera.position.set(0, 0, 33.6); // Match UI defaults
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true, // Enable transparency
        antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent clear color
    
    // Set full viewport dimensions
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Set clear color to transparent
    renderer.setClearColor(0x000000, 0);
    
    // Create render targets with full window resolution like GitHub version
    mainRenderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );
    backRenderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );
    
    // Initialize uniforms
    uniforms = {
        uIorR: { value: 1.15 },
        uIorY: { value: 1.16 },
        uIorG: { value: 1.18 },
        uIorC: { value: 1.22 },
        uIorB: { value: 1.22 },
        uIorP: { value: 1.22 },
        uSaturation: { value: 1.01 },
        uChromaticAberration: { value: 0.06 },
        uRefractPower: { value: 0.13 },
        uFresnelPower: { value: 9.0 },
        uShininess: { value: 25.0 },
        uDiffuseness: { value: 0.2 },
        uLight: { value: new THREE.Vector3(-1.3, 1.5, -0.6) },
        winResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(Math.min(window.devicePixelRatio, 2)) },
        uTexture: { value: null }
    };
    
    
    // Add comprehensive lighting setup
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Secondary directional light for fill
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, 5);
    scene.add(fillLight);
    
    // Rim light for edge highlighting
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, -5, 5);
    scene.add(rimLight);
    
    // Point light for dynamic highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);
    
    // Create background geometry for refraction
    createBackgroundGeometry();
    
    // Load GLTF model
    loadModel();
    
    // Add event listeners
    addEventListeners();
}

// Capture hero div and create dynamic texture
function captureHeroAsTexture() {
    return new Promise((resolve, reject) => {
        const heroElement = document.querySelector('.hero');
        if (!heroElement) {
            reject(new Error('Hero element not found'));
            return;
        }
        
        // Wait for any pending layout calculations
        requestAnimationFrame(() => {
            // Capture the hero div using html2canvas
            html2canvas(heroElement, { 
                backgroundColor: null, // Transparent background
                scale: 2, // Higher resolution for better quality
                useCORS: true, // Allow cross-origin images
                allowTaint: true, // Allow tainted canvas
                logging: false, // Disable logging for performance
                width: heroElement.offsetWidth, // Use actual element width
                height: heroElement.offsetHeight, // Use actual element height
                scrollX: window.scrollX, // Account for scroll position
                scrollY: window.scrollY
            }).then(canvas => {
                // Create Three.js texture from canvas
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                
                console.log('Hero captured successfully:', {
                    canvasWidth: canvas.width,
                    canvasHeight: canvas.height,
                    elementWidth: heroElement.offsetWidth,
                    elementHeight: heroElement.offsetHeight,
                    texture: texture
                });
                
                resolve(texture);
            }).catch(error => {
                console.error('Error capturing hero:', error);
                reject(error);
            });
        });
    });
}

// Create background geometry for refraction effects
function createBackgroundGeometry() {
    const backgroundGroup = new THREE.Group();
    backgroundGroup.visible = true; // Make visible to see all objects
    
    // Background group is now empty - removed the four white icosahedrons
    scene.add(backgroundGroup);
    
    // Create plane geometry - exact GitHub dimensions
    const planeScale = 1; // GitHub default
    const width = 20 * planeScale; // 20 units
    const height = width * (591 / 1325); // 8.92 units based on 1325:591 ratio
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    
    // Create material with dynamic texture (will be updated)
    const planeMaterial = new THREE.MeshBasicMaterial({ 
        transparent: true,
        opacity: 0.8, // GitHub opacity
        side: THREE.DoubleSide
    });
    
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -10); // Position behind camera for invisibility
    
    // NEW: Make plane invisible to camera but still available for shader sampling
    plane.visible = false; // Invisible to camera
    plane.renderOrder = -1; // Render first (before the main mesh)
    
    scene.add(plane); // Add directly to scene, not to background group
    
    // Store reference for potential future use
    backgroundPlane = plane;
    
    // Capture hero and apply as texture with delay to ensure DOM is ready
    setTimeout(() => {
        captureHeroAsTexture().then(texture => {
            plane.material.map = texture;
            plane.material.needsUpdate = true;
            console.log('Dynamic texture applied to plane');
        }).catch(error => {
            console.error('Failed to apply dynamic texture, using fallback:', error);
            // Fallback to static texture if capture fails
            const textureLoader = new THREE.TextureLoader();
            const headerTexture = textureLoader.load('/images/header.png');
            plane.material.map = headerTexture;
            plane.material.needsUpdate = true;
        });
    }, 100); // Small delay to ensure DOM is fully rendered
    
    // Add white sphere at the same position as the plane
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true,
        opacity: 1
    });
    
    const whiteSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    whiteSphere.position.set(-11.75, 5.75, -7); // Same position as plane
    whiteSphere.scale.setScalar(.3); // Make it visible
    
    // Make sphere invisible to camera but available for shader sampling (like plane)
    whiteSphere.visible = false; // Invisible to camera
    whiteSphere.renderOrder = -2; // Render before plane
    
    scene.add(whiteSphere);
    
    // Store reference to sphere for potential future use
    if (!window.DEBUG) {
        window.DEBUG = {};
    }
    window.DEBUG.whiteSphere = whiteSphere;
    console.log('Sphere added to DEBUG object:', whiteSphere);
}

// Load GLTF model
function loadModel() {
    
        const loader = new GLTFLoader();
        
        loader.load('/models/nftfi_logo.glb', (gltf) => {
            
            // Calculate bounding box FIRST (before any geometry modifications)
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = new THREE.Vector3();
            const size = new THREE.Vector3();
            box.getCenter(center);
            box.getSize(size);
            
            console.log('Bounding box calculated:', {
                center: center.toArray(),
                size: size.toArray(),
                min: box.min.toArray(),
                max: box.max.toArray()
            });
            
            // Apply material to all meshes
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    mesh = child;
                    
                    // Apply smoothing
                    if (child.geometry) {
                        child.geometry.computeVertexNormals();
                    }
                    
                    // Create glass shader material
                    child.material = new THREE.ShaderMaterial({
                        vertexShader: vertexShader,
                        fragmentShader: fragmentShader,
                        uniforms: uniforms,
                        side: THREE.DoubleSide
                    });
                
                // Check for shader compilation errors
                if (child.material.program && child.material.program.error) {
                    console.error('Shader compilation error:', child.material.program.error);
                } else {
                    console.log('Shader compiled successfully');
                }
                }
            });
            
            // Create wrapper group (parent object for rotation)
            wrapper = new THREE.Group();
            
            // Center the original mesh by moving it
            gltf.scene.position.set(-center.x, -center.y, -center.z);
            
            // Add centered mesh to wrapper
            wrapper.add(gltf.scene);
            
            // Set starting position (right side of screen)
            wrapper.position.set(
                MODEL_CONFIG.startPosition.x,
                MODEL_CONFIG.startPosition.y,
                MODEL_CONFIG.startPosition.z
            );
            
            // Scale the wrapper
            wrapper.scale.setScalar(MODEL_CONFIG.startScale);
            
            // Add to scene
            scene.add(wrapper);
            
            // Expose debug objects to console for debugging (like working example)
            window.DEBUG = {
                gltf: gltf.scene,
                wrapper: wrapper,
                originalPosition: gltf.scene.position.clone(),
                center: center.clone(),
                size: size.clone(),
                box: box,
                // Helper functions
                setWrapperPosition: (x, y, z) => {
                    wrapper.position.set(x, y, z);
                    console.log('Wrapper position set to:', [x, y, z]);
                },
                setOriginalPosition: (x, y, z) => {
                    gltf.scene.position.set(x, y, z);
                    console.log('Original position set to:', [x, y, z]);
                },
                resetPositions: () => {
                    wrapper.position.set(0, 0, 0);
                    gltf.scene.position.set(-center.x, -center.y, -center.z);
                    console.log('Positions reset to calculated center');
                },
                logPositions: () => {
                    console.log('Current positions:', {
                        wrapper: wrapper.position.toArray(),
                        original: gltf.scene.position.toArray(),
                        center: center.toArray(),
                        size: size.toArray()
                    });
                },
                // Scroll animation helpers
                resetScrollAnimation: resetScrollAnimation,
                originalWrapperPosition: originalWrapperPosition,
                originalWrapperScale: originalWrapperScale,
                // Model positioning configuration - EASY TO TWEAK!
                MODEL_CONFIG: MODEL_CONFIG,
                // Scroll spin debugging
                scrollSpinVelocity: () => scrollSpinVelocity,
                updateScrollSpin: (direction) => updateScrollSpin(direction),
                // Texture debugging
                updatePlaneTexture,
                captureHeroAsTexture,
                // Responsive positioning debugging
                calculateResponsiveTargetPosition,
                calculateResponsiveScale,
                screenToWorldPosition,
                isPositionVisible,
                // Expose all configurable parameters for real-time tweaking
                viewportTarget: getCurrentBreakpoint().viewportTarget,
                responsiveScale: getCurrentBreakpoint().responsiveScale,
                fallbackTarget: getCurrentBreakpoint().fallbackTarget,
                startPosition: MODEL_CONFIG.startPosition,
                startScale: MODEL_CONFIG.startScale,
                // Helper functions for parameter tweaking
                updateViewportTarget: (xPercent, yPercent) => {
                    const currentBreakpoint = getCurrentBreakpoint();
                    currentBreakpoint.viewportTarget.xPercent = xPercent;
                    currentBreakpoint.viewportTarget.yPercent = yPercent;
                    cachedTargetPosition = null; // Invalidate cache
                    console.log('Updated viewport target for current breakpoint:', currentBreakpoint.viewportTarget);
                },
                updateResponsiveScale: (minScale, maxScale, threshold) => {
                    const currentBreakpoint = getCurrentBreakpoint();
                    currentBreakpoint.responsiveScale.minScale = minScale;
                    currentBreakpoint.responsiveScale.maxScale = maxScale;
                    currentBreakpoint.responsiveScale.viewportThreshold = threshold;
                    console.log('Updated responsive scale for current breakpoint:', currentBreakpoint.responsiveScale);
                },
                updateFallbackTarget: (x, y, z) => {
                    const currentBreakpoint = getCurrentBreakpoint();
                    currentBreakpoint.fallbackTarget.x = x;
                    currentBreakpoint.fallbackTarget.y = y;
                    currentBreakpoint.fallbackTarget.z = z;
                    cachedTargetPosition = null; // Invalidate cache
                    console.log('Updated fallback target for current breakpoint:', currentBreakpoint.fallbackTarget);
                },
                updateStartPosition: (x, y, z) => {
                    MODEL_CONFIG.startPosition.x = x;
                    MODEL_CONFIG.startPosition.y = y;
                    MODEL_CONFIG.startPosition.z = z;
                    console.log('Updated start position:', MODEL_CONFIG.startPosition);
                },
                updateStartScale: (scale) => {
                    MODEL_CONFIG.startScale = scale;
                    console.log('Updated start scale:', MODEL_CONFIG.startScale);
                },
                // Force recalculation
                forceRecalculate: () => {
                    cachedTargetPosition = null;
                    console.log('Forced position recalculation');
                }
            };
            
            console.log('Debug objects exposed! Use window.DEBUG to access them.');
            isModelReady = true;
            
            // Set initial plane position based on viewport
            updatePlaneForViewport();
            
            // Set up scroll-triggered animation after model is ready
            setupScrollAnimation();
        
       
            
        }, (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        }, (error) => {
            console.error('Error loading model:', error);
            // Fallback to icosahedron if model fails to load
    });
}


// Add event listeners
function addEventListeners() {
    // Mouse move handler with sophisticated tracking
    // Use window events since canvas has pointer-events: none
    window.addEventListener('mousemove', (e) => {
        // Initialize lastMousePos if it hasn't been set yet
        if (lastMousePos.x === 0 && lastMousePos.y === 0) {
            lastMousePos.x = e.clientX;
            lastMousePos.y = e.clientY;
            return;
        }
        
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;
        
        // Add mouse movement to influence (normalized to screen size)
        // Enhanced mouse influence calculation like the working example
        mouseInfluence.x += deltaX / window.innerWidth * 2.0;
        mouseInfluence.y += deltaY / window.innerHeight * 2.0;
        
        lastMousePos.x = e.clientX;
        lastMousePos.y = e.clientY;
    });
    
    // Window resize handler
    window.addEventListener('resize', onWindowResize);
}

// Calculate optimal plane position based on viewport
function calculatePlanePosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // X offset constant for easy tweaking
    const X_OFFSET = -4; // Adjust this value to move plane left/right
    
    // Calculate the center of the viewport in normalized coordinates (-1 to 1)
    const centerX = 0; // Center of viewport
    const centerY = 0; // Center of viewport
    
    // Convert viewport center to world coordinates
    // The plane should be positioned to match the visible content area
    let worldX = centerX * 10; // Scale factor for world coordinates
    let worldY = centerY * 10;
    const worldZ = -5; // Keep behind the camera
    
    // Apply X offset
    worldX += X_OFFSET;
    
    // Adjust based on viewport aspect ratio
    const aspectRatio = viewportWidth / viewportHeight;
    if (aspectRatio > 1) {
        // Wide screen - adjust X position
        worldX += (aspectRatio - 1) * 5; // Move plane right for wide screens
    } else {
        // Tall screen - adjust Y position
        worldY += (1 - aspectRatio) * 5; // Move plane up for tall screens
    }
    
    return { x: worldX, y: worldY, z: worldZ };
}

// Update plane position based on viewport
function updatePlaneForViewport() {
    if (backgroundPlane) {
        const position = calculatePlanePosition();
        backgroundPlane.position.set(position.x, position.y, position.z);
        
        // Update the UI controls to reflect the new position
        if (document.getElementById('planeX')) {
            document.getElementById('planeX').value = position.x;
            document.getElementById('planeXValue').textContent = position.x.toFixed(1);
        }
        if (document.getElementById('planeY')) {
            document.getElementById('planeY').value = position.y;
            document.getElementById('planeYValue').textContent = position.y.toFixed(1);
        }
        if (document.getElementById('planeZ')) {
            document.getElementById('planeZ').value = position.z;
            document.getElementById('planeZValue').textContent = position.z.toFixed(1);
        }
        
        console.log('Plane position updated for viewport:', position);
    }
}

// Update plane texture with fresh hero capture
function updatePlaneTexture() {
    if (backgroundPlane) {
        captureHeroAsTexture().then(texture => {
            // Dispose old texture to prevent memory leaks
            if (backgroundPlane.material.map) {
                backgroundPlane.material.map.dispose();
            }
            
            backgroundPlane.material.map = texture;
            backgroundPlane.material.needsUpdate = true;
            console.log('Plane texture updated with fresh hero capture');
        }).catch(error => {
            console.error('Failed to update plane texture:', error);
        });
    }
}

// Debounced texture update function
let textureUpdateTimeout;
function debouncedTextureUpdate() {
    clearTimeout(textureUpdateTimeout);
    textureUpdateTimeout = setTimeout(() => {
        updatePlaneTexture();
    }, 250); // Wait 250ms after resize stops
}

// Window resize handler
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height; // Full viewport aspect ratio
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    
    // Update render targets
    mainRenderTarget.setSize(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );
    backRenderTarget.setSize(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );
    
    // Update uniforms
    uniforms.winResolution.value.set(window.innerWidth, window.innerHeight).multiplyScalar(Math.min(window.devicePixelRatio, 2));
    
    // Update plane position for new viewport
    updatePlaneForViewport();
    
    // Invalidate cached responsive position
    cachedTargetPosition = null;
    
    // Debounced texture update
    debouncedTextureUpdate();
}

    // Animation loop with proper parent-child rotation, mouse-controlled axes, and floating animation
    function animate() {
        requestAnimationFrame(animate);
        
        if (wrapper && isModelReady) {
            const time = (Date.now() - startTime) * 0.001; // Convert to seconds from start
            
            // Decay mouse influence over time (slower decay like working example)
            mouseInfluence.x *= 0.98; // Slower decay
            mouseInfluence.y *= 0.98;
            
            // Apply rotation to wrapper (parent) with varying rates and mouse influence
            // X-axis: varying rate with sine wave modulation + mouse Y influence (up/down mouse = tilt)
            const xRate = 0.2 + Math.sin(time * 0.1) * 0.15;
            wrapper.rotation.x += xRate * 0.02 + mouseInfluence.y * 0.05; // Mouse Y affects X rotation
            
            // Y-axis: varying rate with cosine wave modulation + mouse X influence (left/right mouse = turn)
            const yRate = 0.3 + Math.cos(time * 0.08) * 0.2;
            wrapper.rotation.y += yRate * 0.02 + mouseInfluence.x * 0.05; // Mouse X affects Y rotation
            
            // Z-axis: varying rate with sine wave modulation at different frequency (no mouse control)
            const zRate = 0.15 + Math.sin(time * 0.12) * 0.1;
            wrapper.rotation.z += zRate * 0.02;
            
            // Add scroll spin to Y rotation (upward spin)
            wrapper.rotation.y += scrollSpinVelocity;
            
            // Floating animation - gentle up and down movement
            // Scale amplitude based on current mesh scale for consistent visual effect
            const currentScale = wrapper.scale.x; // Use X scale as reference
            const scaledAmplitude = MODEL_CONFIG.floatAmplitude * currentScale;
            const floatOffset = Math.sin(time * MODEL_CONFIG.floatSpeed) * scaledAmplitude;
            
            // Apply floating movement - works with both static and scroll animation
            if (wrapper.userData.targetY !== undefined) {
                // Scroll animation active - add floating offset to target Y position
                wrapper.position.y = wrapper.userData.targetY + floatOffset;
            } else {
                // No scroll animation - use base position with floating
                wrapper.position.y = MODEL_CONFIG.startPosition.y + floatOffset;
            }
        }
    
    // Glass refraction rendering with temporal plane and sphere visibility control
    if (mesh) {
        
        // Temporarily make background plane and sphere visible for render target sampling
        if (backgroundPlane) {
            backgroundPlane.visible = true;
        }
        
        // Find sphere in scene for render target sampling
        let whiteSphere = null;
        scene.traverse((object) => {
            if (object.isMesh && object.material && object.material.color && 
                object.material.color.getHexString() === 'ffffff') {
                whiteSphere = object;
            }
        });

        
        mesh.visible = false;
        
        // Back side render
        renderer.setRenderTarget(backRenderTarget);
        renderer.render(scene, camera);
        
        mesh.material.uniforms.uTexture.value = backRenderTarget.texture;
        mesh.material.side = THREE.BackSide;
        
        mesh.visible = true;
        
        // Front side render
        renderer.setRenderTarget(mainRenderTarget);
        renderer.render(scene, camera);
        
        mesh.material.uniforms.uTexture.value = mainRenderTarget.texture;
        mesh.material.side = THREE.FrontSide;
        
        // Hide background plane and sphere again for final render
        if (backgroundPlane) {
            backgroundPlane.visible = false;
        }
        
        // Hide sphere for final render
        if (whiteSphere) {
            whiteSphere.visible = false;
        }
        
        renderer.setRenderTarget(null);
    }
    
    renderer.render(scene, camera);
}

// Viewport to world coordinate conversion
function screenToWorldPosition(screenX, screenY, depth = 0) {
    const vector = new THREE.Vector3();
    vector.set(
        (screenX / window.innerWidth) * 2 - 1,
        -(screenY / window.innerHeight) * 2 + 1,
        depth
    );
    vector.unproject(camera);
    return vector;
}

// Check if position is within camera frustum
function isPositionVisible(position) {
    const frustum = new THREE.Frustum();
    const matrix = new THREE.Matrix4();
    
    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(matrix);
    
    return frustum.containsPoint(position);
}

// Calculate responsive target position
function getCurrentBreakpoint() {
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth < 768) {
        return MODEL_CONFIG.breakpoints.mobile;
    } else if (viewportWidth < 1200) {
        return MODEL_CONFIG.breakpoints.tablet;
    } else {
        return MODEL_CONFIG.breakpoints.desktop;
    }
}

function calculateResponsiveTargetPosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Check if viewport size has changed
    const viewportChanged = 
        viewportWidth !== lastViewportSize.width || 
        viewportHeight !== lastViewportSize.height;
    
    // Return cached position if viewport hasn't changed
    if (!viewportChanged && cachedTargetPosition) {
        return cachedTargetPosition;
    }
    
    // Calculate viewport-relative position
    const screenX = viewportWidth * MODEL_CONFIG.viewportTarget.xPercent;
    const screenY = viewportHeight * MODEL_CONFIG.viewportTarget.yPercent;
    
    // Convert to world coordinates
    const worldPos = screenToWorldPosition(screenX, screenY, MODEL_CONFIG.viewportTarget.zDepth);
    
    // Validate position is within camera frustum
    if (isPositionVisible(worldPos)) {
        cachedTargetPosition = worldPos;
        lastViewportSize = { width: viewportWidth, height: viewportHeight };
        console.log('Responsive target position calculated:', worldPos);
        return worldPos;
    } else {
        // Fallback to percentage-based calculation
        console.log('Position not visible, using fallback');
        return calculateFallbackPosition();
    }
}

// Calculate fallback position using viewport percentages
function calculateFallbackPosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Use smaller percentages for fallback
    const fallbackXPercent = 0.05; // 5% from left
    const fallbackYPercent = 0.05; // 5% from top
    
    const screenX = viewportWidth * fallbackXPercent;
    const screenY = viewportHeight * fallbackYPercent;
    
    const worldPos = screenToWorldPosition(screenX, screenY, MODEL_CONFIG.viewportTarget.zDepth);
    
    cachedTargetPosition = worldPos;
    lastViewportSize = { width: viewportWidth, height: viewportHeight };
    
    return worldPos;
}

// Calculate responsive scale based on viewport
function calculateResponsiveScale() {
    const viewportWidth = window.innerWidth;
    const { minScale, maxScale, viewportThreshold } = MODEL_CONFIG.responsiveScale;
    
    if (viewportWidth <= viewportThreshold) {
        // Small viewport - use minimum scale
        return minScale;
    } else {
        // Large viewport - interpolate between min and max
        const ratio = Math.min((viewportWidth - viewportThreshold) / 800, 1);
        return minScale + (maxScale - minScale) * ratio;
    }
}

// Track scroll events for spin animation
function updateScrollSpin(direction) {
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime;
    
    // Update spin velocity based on scroll direction
    if (direction !== 0) {
        scrollSpinVelocity += direction * MODEL_CONFIG.spinIntensity;
        lastScrollDirection = direction;
    }
    
    // Apply decay over time
    if (timeDelta > 16) { // Only decay every ~16ms (60fps)
        scrollSpinVelocity *= MODEL_CONFIG.spinDecay;
        lastScrollTime = currentTime;
    }
}

// Set up scroll-triggered animation
function setupScrollAnimation() {
    if (!wrapper) return;
    
    // Store original position and scale
    originalWrapperPosition = {
        x: wrapper.position.x,
        y: wrapper.position.y,
        z: wrapper.position.z
    };
    originalWrapperScale = {
        x: wrapper.scale.x,
        y: wrapper.scale.y,
        z: wrapper.scale.z
    };
    
        // Create scroll timeline with responsive positioning
    scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".section[data-section='1']",
            start: "top top",
            end: "bottom top",
            scrub: MODEL_CONFIG.scrubDuration, // Smooth scrubbing
            onUpdate: (self) => {
                // Update Three.js wrapper position and scale based on scroll progress
                const progress = self.progress;
                
                // Track scroll direction for spin animation
                const scrollDirection = self.direction || 0;
                updateScrollSpin(scrollDirection);
                
                // Get current responsive target position
                const currentTarget = calculateResponsiveTargetPosition();
                const responsiveTargetScale = calculateResponsiveScale();
                
                // Interpolate position using responsive target
                wrapper.position.x = gsap.utils.interpolate(
                    MODEL_CONFIG.startPosition.x, 
                    currentTarget.x, 
                    progress
                );
                
                // Store the target Y position for scroll animation (floating will add offset)
                wrapper.userData.targetY = gsap.utils.interpolate(
                    MODEL_CONFIG.startPosition.y, 
                    currentTarget.y, 
                    progress
                );
                
                wrapper.position.z = gsap.utils.interpolate(
                    MODEL_CONFIG.startPosition.z, 
                    currentTarget.z, 
                    progress
                );
                
                // Interpolate scale using responsive target scale
                const currentScale = gsap.utils.interpolate(
                    MODEL_CONFIG.startScale, 
                    responsiveTargetScale, 
                    progress
                );
                wrapper.scale.setScalar(currentScale);
                
                console.log('Responsive scroll animation:', {
                    progress: progress,
                    targetPosition: currentTarget,
                    targetScale: responsiveTargetScale,
                    currentScale: currentScale,
                    spinVelocity: scrollSpinVelocity
                });
            }
        }
    });
    
}

// Reset scroll animation to original position
function resetScrollAnimation() {
    if (wrapper && scrollTimeline) {
        wrapper.position.set(
            originalWrapperPosition.x,
            originalWrapperPosition.y,
            originalWrapperPosition.z
        );
        wrapper.scale.set(
            originalWrapperScale.x,
            originalWrapperScale.y,
            originalWrapperScale.z
        );
        // Clear the target Y data to stop scroll animation influence
        delete wrapper.userData.targetY;
        console.log('Scroll animation reset to original position');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
    
    // Force texture update after everything is loaded
    setTimeout(() => {
        if (window.DEBUG && window.DEBUG.updatePlaneTexture) {
            window.DEBUG.updatePlaneTexture();
        }
    }, 500); // Wait for all styles and layouts to be applied
}); 


// Check if DOM is ready, if not wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeNavigation();
    });
} else {
    initializeNavigation();
} 