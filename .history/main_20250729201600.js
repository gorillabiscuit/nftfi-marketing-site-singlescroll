// Main JavaScript file for NFTfi Marketing Site - Single Scroll
// Three.js scene with glass shader and scroll/mouse interactions

console.log('NFTfi Marketing Site - Single Scroll initialized');

// Scene variables
let scene, camera, renderer, canvas;
let model, wrapper, mesh;
let mouseInfluence = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let uniforms = {};
let backRenderTarget;
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

// DEBUG: Simplified shader for testing
void main() {
  // Calculate UV coordinates
  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  
  // Simple refraction test
  vec3 normal = normalize(worldNormal);
  vec3 viewDir = normalize(eyeVector);
  
  // Basic refraction calculation
  float ior = 1.5; // Simple glass IOR
  vec3 refractDir = refract(viewDir, normal, 1.0 / ior);
  
  // Sample texture with refraction offset
  vec2 refractedUV = uv + refractDir.xy * 0.1; // Simple offset
  
  // Sample the background texture
  vec4 refractedColor = texture2D(uTexture, refractedUV);
  
  // Add some basic lighting
  vec3 lightDir = normalize(uLight);
  float diffuse = max(0.0, dot(normal, lightDir));
  
  // Final color
  vec3 color = refractedColor.rgb * 0.8 + diffuse * 0.2;
  
  // Add fresnel effect
  float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 3.0);
  color += fresnel * 0.3;
  
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
    scene.background = null; // Make background transparent
    
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // No render target needed - MeshPhysicalMaterial handles refraction automatically
    
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
        uLight: { value: new THREE.Vector3(5, 5, 5).normalize() },
        winResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
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
    
    // No debug quad needed - MeshPhysicalMaterial handles refraction automatically
    
    // Load GLTF model
    loadModel().catch(error => {
        console.error('Error in loadModel:', error);
        createFallbackGeometry();
    });
    
    // Add event listeners
    addEventListeners();
}

// Create background plane for refraction effects
function createBackgroundGeometry() {
    console.log('Creating background plane for refraction...');
    
    // Create a narrow plane geometry for the background
    const planeGeometry = new THREE.PlaneGeometry(4, 20); // Much narrower: 4 wide, 20 tall
    
    // Create a simple blue material for testing refraction
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x0066ff,  // Bright blue color
        transparent: true,
        opacity: 1.0
    });
    
    // Create the background plane - positioned BEHIND the mesh for proper refraction
    const backgroundPlane = new THREE.Mesh(planeGeometry, material);
    backgroundPlane.position.set(0, 0, -5); // BEHIND the mesh (z=-5) for proper refraction
    
    // Random rotation for more interesting refraction
    const randomRotationX = (Math.random() - 0.5) * Math.PI * 0.5; // ±45 degrees
    const randomRotationY = (Math.random() - 0.5) * Math.PI * 0.3; // ±27 degrees
    const randomRotationZ = (Math.random() - 0.5) * Math.PI * 0.2; // ±18 degrees
    backgroundPlane.rotation.set(randomRotationX, randomRotationY, randomRotationZ);
    
    scene.add(backgroundPlane);
    console.log('Blue background plane added at z:', backgroundPlane.position.z);
    console.log('Background plane visible:', backgroundPlane.visible);
    console.log('Background plane material:', backgroundPlane.material);
    console.log('Background plane rotation:', backgroundPlane.rotation);
    console.log('Background plane dimensions: 4 x 20 (narrow rectangle)');
    console.log('Background plane positioned BEHIND mesh (z=-5) for proper refraction');
}

// Create debug quad to visualize render target content
function createDebugQuad() {
    console.log('Creating debug quad to visualize render target...');
    
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({
        map: null, // Will be set to render target texture
        transparent: true,
        opacity: 0.8
    });
    
    const debugQuad = new THREE.Mesh(geometry, material);
    debugQuad.position.set(15, 0, 0); // Position to the right of the scene
    debugQuad.name = 'debugQuad';
    
    scene.add(debugQuad);
    console.log('Debug quad added at position:', debugQuad.position);
}
async function loadModel() {
    console.log('Loading NFTfi logo model...');
    
    try {
        // Import GLTFLoader dynamically
        const { GLTFLoader } = await import('./libs/GLTFLoader.js');
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
                    
                    // Create glass material using Three.js built-in refraction
                    child.material = new THREE.MeshPhysicalMaterial({
                        transmission: 1.0,        // Full transmission for glass effect
                        thickness: 0.5,          // Thickness of the glass
                        ior: 1.5,                // Index of refraction (glass)
                        transparent: true,
                        opacity: 1.0,
                        color: 0xffffff,
                        metalness: 0.0,
                        roughness: 0.0,
                        clearcoat: 1.0,          // Clear coat for extra shine
                        clearcoatRoughness: 0.0
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
            
            // Move to front of scene
            wrapper.position.z = 5;
            
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
    } catch (error) {
        console.error('Error loading GLTFLoader:', error);
        // Fallback to icosahedron if GLTFLoader fails
        createFallbackGeometry();
    }
}

// Fallback geometry if model loading fails
function createFallbackGeometry() {
    console.log('Creating fallback geometry...');
    
    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.MeshPhysicalMaterial({
        transmission: 1.0,        // Full transmission for glass effect
        thickness: 0.5,          // Thickness of the glass
        ior: 1.5,                // Index of refraction (glass)
        transparent: true,
        opacity: 1.0,
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.0,
        clearcoat: 1.0,          // Clear coat for extra shine
        clearcoatRoughness: 0.0
    });
    
    mesh = new THREE.Mesh(geometry, material);
    wrapper = new THREE.Group();
    wrapper.add(mesh);
    wrapper.scale.set(3, 3, 3);
    
    // Move to front of scene
    wrapper.position.z = 5;
    
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
    
    // No render target to resize - MeshPhysicalMaterial handles refraction automatically
    
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
    
    // MeshPhysicalMaterial handles refraction automatically - no custom render target needed
    if (mesh) {
        // Optional: Add some subtle animation to the material properties
        const time = Date.now() * 0.001;
        mesh.material.transmission = 0.9 + Math.sin(time * 0.5) * 0.1; // Subtle transmission variation
    }
    
    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, ready to initialize Three.js scene');
    init();
    animate();
}); 