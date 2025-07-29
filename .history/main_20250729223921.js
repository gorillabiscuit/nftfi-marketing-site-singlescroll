// Main JavaScript file for NFTfi Marketing Site - Single Scroll
// Three.js scene with glass shader and scroll/mouse interactions

import * as THREE from 'three';
import { GLTFLoader } from './libs/GLTFLoader.js';

console.log('NFTfi Marketing Site - Single Scroll initialized');

// Scene variables
let scene, camera, renderer, canvas;
let mesh, wrapper;
let isModelReady = false;
let mainRenderTarget, backRenderTarget;
let uniforms;
let mouseInfluence = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };

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
    console.log('Initializing Three.js scene...');
    
    // Get canvas
    canvas = document.getElementById('three-canvas');
    
    // Calculate square size like GitHub version
    const size = Math.min(window.innerWidth, window.innerHeight, 800);
    
    // Create scene
    scene = new THREE.Scene();
    // Set black background like GitHub version
    scene.background = new THREE.Color('#000000');
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, size / size, 0.1, 1000); // GitHub Canvas FOV
    camera.position.set(4, -2, 7); // GitHub Canvas position
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    
    // Set square aspect ratio like GitHub version
    renderer.setSize(size, size);
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
        uChromaticAberration: { value: 0.14 },
        uRefractPower: { value: 0.35 },
        uFresnelPower: { value: 9.0 },
        uShininess: { value: 25.0 },
        uDiffuseness: { value: 0.2 },
        uLight: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
        winResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(Math.min(window.devicePixelRatio, 2)) },
        uTexture: { value: null }
    };
    
    console.log('Uniforms initialized:', uniforms);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    
    // Create background geometry for refraction
    createBackgroundGeometry();
    
    // Load GLTF model
    loadModel();
    
    // Add event listeners
    addEventListeners();
}

// Create background geometry for refraction effects
function createBackgroundGeometry() {
    const backgroundGroup = new THREE.Group();
    backgroundGroup.visible = true; // Make visible to see all objects
    
    // Background group is now empty - removed the four white icosahedrons
    scene.add(backgroundGroup);
    
    // Add plane with PNG material - separate from background group so it's visible
    const textureLoader = new THREE.TextureLoader();
    const headerTexture = textureLoader.load('/header.png');
    
    // Create plane geometry - exact GitHub dimensions
    const planeScale = 1; // GitHub default
    const width = 20 * planeScale; // 20 units
    const height = width * (591 / 1325); // 8.92 units based on 1325:591 ratio
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMaterial = new THREE.MeshBasicMaterial({ 
        map: headerTexture,
        transparent: true,
        opacity: 0.8, // GitHub opacity
        side: THREE.DoubleSide
    });
    
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -5); // GitHub position
    scene.add(plane); // Add directly to scene, not to background group
}

// Load GLTF model
function loadModel() {
    console.log('Loading NFTfi logo model...');
    
    const loader = new GLTFLoader();
    
    loader.load('/models/nftfi_logo.glb', (gltf) => {
        console.log('Model loaded:', gltf);
        
        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        
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
        
        // Create wrapper group
        wrapper = new THREE.Group();
        
        // Center the original mesh
        gltf.scene.position.set(-center.x, -center.y, -center.z);
        
        // Add centered mesh to wrapper
        wrapper.add(gltf.scene);
        
        // Scale the wrapper
        wrapper.scale.set(3, 3, 3);
        
        // Add to scene
        scene.add(wrapper);
        
        isModelReady = true;
        console.log('NFTfi logo ready for animation');
        
        // Debug: Log all objects in scene
        console.log('All objects in scene:');
        scene.traverse((object) => {
            console.log('-', object.type, object.name || 'unnamed', 'visible:', object.visible);
        });
        
    }, (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    }, (error) => {
        console.error('Error loading model:', error);
        // Fallback to icosahedron if model fails to load
        createFallbackGeometry();
    });
}

// Fallback geometry if model loading fails
function createFallbackGeometry() {
    console.log('Creating fallback geometry...');
    
    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        side: THREE.DoubleSide
    });
    
    // Check for shader compilation errors
    if (material.program && material.program.error) {
        console.error('Fallback shader compilation error:', material.program.error);
    } else {
        console.log('Fallback shader compiled successfully');
    }
    
    mesh = new THREE.Mesh(geometry, material);
    wrapper = new THREE.Group();
    wrapper.add(mesh);
    wrapper.scale.set(3, 3, 3);
    scene.add(wrapper);
    
    isModelReady = true;
    console.log('Fallback geometry ready for animation');
    
    // Debug: Log all objects in scene
    console.log('All objects in scene (fallback):');
    scene.traverse((object) => {
        console.log('-', object.type, object.name || 'unnamed', 'visible:', object.visible);
    });
}

// Add event listeners
function addEventListeners() {
    // Mouse move handler
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
        mouseInfluence.x += deltaX / window.innerWidth * 2.0;
        mouseInfluence.y += deltaY / window.innerHeight * 2.0;
        
        lastMousePos.x = e.clientX;
        lastMousePos.y = e.clientY;
    });
    
    // Window resize handler
    window.addEventListener('resize', onWindowResize);
}

// Window resize handler
function onWindowResize() {
    const size = Math.min(window.innerWidth, window.innerHeight, 800);
    
    camera.aspect = size / size; // Square aspect ratio
    camera.updateProjectionMatrix();
    renderer.setSize(size, size);
    
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
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (wrapper && isModelReady) {
        // Update mouse influence for rotation
        mouseInfluence.x *= 0.95;
        mouseInfluence.y *= 0.95;
        
        wrapper.rotation.y += mouseInfluence.x * 0.01;
        wrapper.rotation.x += mouseInfluence.y * 0.01;
        
        // Render glass refraction
        if (mesh) {
            console.log('Rendering glass refraction...'); // Debugging
            mesh.visible = false;
            // Back side render
            renderer.setRenderTarget(backRenderTarget);
            renderer.render(scene, camera);
            mesh.material.uniforms.uTexture.value = backRenderTarget.texture;
            mesh.material.side = THREE.BackSide;
            console.log('Back render target texture:', backRenderTarget.texture); // Debugging
            mesh.visible = true;
            // Front side render
            renderer.setRenderTarget(mainRenderTarget);
            renderer.render(scene, camera);
            mesh.material.uniforms.uTexture.value = mainRenderTarget.texture;
            mesh.material.side = THREE.FrontSide;
            console.log('Main render target texture:', mainRenderTarget.texture); // Debugging
            renderer.setRenderTarget(null);
        }
    }
    
    renderer.render(scene, camera);
}

// UI Controls functionality
function initializeUIControls() {
    // Shader controls
    const refractionSlider = document.getElementById('refraction');
    const chromaticAberrationSlider = document.getElementById('chromaticAberration');
    const saturationSlider = document.getElementById('saturation');
    const fresnelPowerSlider = document.getElementById('fresnelPower');
    const shininessSlider = document.getElementById('shininess');
    const diffusenessSlider = document.getElementById('diffuseness');
    
    // IOR controls
    const iorRSlider = document.getElementById('iorR');
    const iorYSlider = document.getElementById('iorY');
    const iorGSlider = document.getElementById('iorG');
    const iorCSlider = document.getElementById('iorC');
    const iorBSlider = document.getElementById('iorB');
    const iorPSlider = document.getElementById('iorP');
    
    // Camera controls
    const cameraFovSlider = document.getElementById('cameraFov');
    const cameraXSlider = document.getElementById('cameraX');
    const cameraYSlider = document.getElementById('cameraY');
    const cameraZSlider = document.getElementById('cameraZ');
    
    // Toggle controls button
    const toggleButton = document.getElementById('toggle-controls');
    const controlsPanel = document.getElementById('controls-panel');
    
    // Update value displays and uniforms
    function updateValueDisplay(sliderId, value) {
        const display = document.getElementById(sliderId + '-value');
        if (display) {
            display.textContent = parseFloat(value).toFixed(3);
        }
    }
    
    // Shader control handlers
    refractionSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('refraction', value);
        if (uniforms && uniforms.uRefractPower) {
            uniforms.uRefractPower.value = value;
        }
    });
    
    chromaticAberrationSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('chromaticAberration', value);
        if (uniforms && uniforms.uChromaticAberration) {
            uniforms.uChromaticAberration.value = value;
        }
    });
    
    saturationSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('saturation', value);
        if (uniforms && uniforms.uSaturation) {
            uniforms.uSaturation.value = value;
        }
    });
    
    fresnelPowerSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('fresnelPower', value);
        if (uniforms && uniforms.uFresnelPower) {
            uniforms.uFresnelPower.value = value;
        }
    });
    
    shininessSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('shininess', value);
        if (uniforms && uniforms.uShininess) {
            uniforms.uShininess.value = value;
        }
    });
    
    diffusenessSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('diffuseness', value);
        if (uniforms && uniforms.uDiffuseness) {
            uniforms.uDiffuseness.value = value;
        }
    });
    
    // IOR control handlers
    iorRSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('iorR', value);
        if (uniforms && uniforms.uIorR) {
            uniforms.uIorR.value = value;
        }
    });
    
    iorYSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('iorY', value);
        if (uniforms && uniforms.uIorY) {
            uniforms.uIorY.value = value;
        }
    });
    
    iorGSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('iorG', value);
        if (uniforms && uniforms.uIorG) {
            uniforms.uIorG.value = value;
        }
    });
    
    iorCSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('iorC', value);
        if (uniforms && uniforms.uIorC) {
            uniforms.uIorC.value = value;
        }
    });
    
    iorBSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('iorB', value);
        if (uniforms && uniforms.uIorB) {
            uniforms.uIorB.value = value;
        }
    });
    
    iorPSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('iorP', value);
        if (uniforms && uniforms.uIorP) {
            uniforms.uIorP.value = value;
        }
    });
    
    // Camera control handlers
    cameraFovSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('cameraFov', value);
        if (camera) {
            camera.fov = value;
            camera.updateProjectionMatrix();
        }
    });
    
    cameraXSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('cameraX', value);
        if (camera) {
            camera.position.x = value;
        }
    });
    
    cameraYSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('cameraY', value);
        if (camera) {
            camera.position.y = value;
        }
    });
    
    cameraZSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        updateValueDisplay('cameraZ', value);
        if (camera) {
            camera.position.z = value;
        }
    });
    
    // Toggle controls panel
    toggleButton.addEventListener('click', () => {
        controlsPanel.classList.toggle('hidden');
        toggleButton.textContent = controlsPanel.classList.contains('hidden') ? 'Show Controls' : 'Hide Controls';
    });
    
    // Initialize value displays
    updateValueDisplay('refraction', refractionSlider.value);
    updateValueDisplay('chromaticAberration', chromaticAberrationSlider.value);
    updateValueDisplay('saturation', saturationSlider.value);
    updateValueDisplay('fresnelPower', fresnelPowerSlider.value);
    updateValueDisplay('shininess', shininessSlider.value);
    updateValueDisplay('diffuseness', diffusenessSlider.value);
    updateValueDisplay('iorR', iorRSlider.value);
    updateValueDisplay('iorY', iorYSlider.value);
    updateValueDisplay('iorG', iorGSlider.value);
    updateValueDisplay('iorC', iorCSlider.value);
    updateValueDisplay('iorB', iorBSlider.value);
    updateValueDisplay('iorP', iorPSlider.value);
    updateValueDisplay('cameraFov', cameraFovSlider.value);
    updateValueDisplay('cameraX', cameraXSlider.value);
    updateValueDisplay('cameraY', cameraYSlider.value);
    updateValueDisplay('cameraZ', cameraZSlider.value);
}

// Initialize everything
init();
initializeUIControls(); 