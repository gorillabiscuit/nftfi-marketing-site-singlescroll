// Main JavaScript file for NFTfi Marketing Site - Single Scroll
// Three.js scene with glass shader and scroll/mouse interactions

import * as THREE from 'three';
import { GLTFLoader } from './libs/GLTFLoader.js';

console.log('NFTfi Marketing Site - Single Scroll initialized');

// Scene variables
let scene, camera, renderer, canvas;
let model, wrapper, mesh;
let mouseInfluence = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let uniforms = {};
let mainRenderTarget, backRenderTarget;
let isModelReady = false;

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
  float NdotH = dot(normal, halfVector);
  float kDiffuse = max(0.0, NdotL);
  float NdotH2 = NdotH * NdotH;

  float kSpecular = pow(NdotH2, shininess);
  return kSpecular + kDiffuse * diffuseness;
}

const int LOOP = 16;

void main() {
  float iorRatioRed = 1.0/uIorR;
  float iorRatioGreen = 1.0/uIorG;
  float iorRatioBlue = 1.0/uIorB;

  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;
  vec3 color = vec3(0.0);

  for (int i = 0; i < LOOP; i++) {
    float slide = float(i) / float(LOOP) * 0.1;

    vec3 refractVecR = refract(eyeVector, normal, (1.0/uIorR));
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

  color /= float(LOOP);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

// Initialize Three.js scene
function init() {
    console.log('Initializing Three.js scene...');
    
    // Get canvas
    canvas = document.getElementById('three-canvas');
    
    // Create scene
    scene = new THREE.Scene();
    // Remove background to make it transparent
    // scene.background = new THREE.Color('#271E23');
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Set clear color to transparent
    renderer.setClearColor(0x000000, 0);
    
    // Create render targets
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
        winResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTexture: { value: null }
    };
    
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
    backgroundGroup.visible = false;
    
    // Add geometric shapes for refraction
    const geometry1 = new THREE.IcosahedronGeometry(2, 16);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(-4, -3, -4);
    backgroundGroup.add(mesh1);
    
    const mesh2 = new THREE.Mesh(geometry1, material1);
    mesh2.position.set(4, -3, -4);
    backgroundGroup.add(mesh2);
    
    const mesh3 = new THREE.Mesh(geometry1, material1);
    mesh3.position.set(-5, 3, -4);
    backgroundGroup.add(mesh3);
    
    const mesh4 = new THREE.Mesh(geometry1, material1);
    mesh4.position.set(5, 3, -4);
    backgroundGroup.add(mesh4);
    
    scene.add(backgroundGroup);
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
                    transparent: true,
                    side: THREE.DoubleSide
                });
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
        transparent: true,
        side: THREE.DoubleSide
    });
    
    mesh = new THREE.Mesh(geometry, material);
    wrapper = new THREE.Group();
    wrapper.add(mesh);
    wrapper.scale.set(3, 3, 3);
    scene.add(wrapper);
    
    isModelReady = true;
    console.log('Fallback geometry ready for animation');
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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
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
    uniforms.winResolution.value.set(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (wrapper && isModelReady) {
        const time = Date.now() * 0.001; // Convert to seconds
        
        // Decay mouse influence over time
        mouseInfluence.x *= 0.98;
        mouseInfluence.y *= 0.98;
        
        // X-axis: varying rate with sine wave modulation + mouse Y influence
        const xRate = 0.2 + Math.sin(time * 0.1) * 0.15;
        wrapper.rotation.x += xRate * 0.02 + mouseInfluence.y * 0.05;
        
        // Y-axis: varying rate with cosine wave modulation + mouse X influence
        const yRate = 0.3 + Math.cos(time * 0.08) * 0.2;
        wrapper.rotation.y += yRate * 0.02 + mouseInfluence.x * 0.05;
        
        // Z-axis: varying rate with sine wave modulation at different frequency
        const zRate = 0.15 + Math.sin(time * 0.12) * 0.1;
        wrapper.rotation.z += zRate * 0.02;
    }
    
    // Glass refraction rendering
    if (mesh) {
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
        
        renderer.setRenderTarget(null);
    }
    
    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, ready to initialize Three.js scene');
    init();
    animate();
}); 