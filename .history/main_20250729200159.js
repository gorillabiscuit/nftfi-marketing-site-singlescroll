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
    
    // Create render target for refraction effect
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
    
    // Create a plane geometry for the background
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    
    // Create a simple blue material for testing refraction
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x0066ff,  // Bright blue color
        transparent: true,
        opacity: 1.0
    });
    
    // Create the background plane - positioned for refraction
    const backgroundPlane = new THREE.Mesh(planeGeometry, material);
    backgroundPlane.position.set(0, 0, -5); // Match original GitHub positioning
    backgroundPlane.rotation.set(0, 0, 0);
    
    scene.add(backgroundPlane);
    console.log('Blue background plane added at z:', backgroundPlane.position.z);
    console.log('Background plane visible:', backgroundPlane.visible);
    console.log('Background plane material:', backgroundPlane.material);
}

// Load GLTF model
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
    
    // Update render target size
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
        // Update uniforms like in the original
        mesh.material.uniforms.uDiffuseness.value = 0.2;
        mesh.material.uniforms.uShininess.value = 25.0;
        mesh.material.uniforms.uLight.value = new THREE.Vector3(5, 5, 5).normalize();
        mesh.material.uniforms.uFresnelPower.value = 9.0;
        mesh.material.uniforms.uIorR.value = 1.15;
        mesh.material.uniforms.uIorY.value = 1.16;
        mesh.material.uniforms.uIorG.value = 1.18;
        mesh.material.uniforms.uIorC.value = 1.22;
        mesh.material.uniforms.uIorB.value = 1.22;
        mesh.material.uniforms.uIorP.value = 1.22;
        mesh.material.uniforms.uSaturation.value = 1.01;
        mesh.material.uniforms.uChromaticAberration.value = 0.14;
        mesh.material.uniforms.uRefractPower.value = 0.35;
        
        // CRITICAL: Update winResolution uniform for proper UV calculation
        mesh.material.uniforms.winResolution.value.set(window.innerWidth, window.innerHeight);
        
        // STEP 1: Render scene WITHOUT the mesh to back render target
        mesh.visible = false;
        renderer.setRenderTarget(backRenderTarget);
        renderer.render(scene, camera);
        
        // STEP 2: Assign the back render target texture to the shader
        mesh.material.uniforms.uTexture.value = backRenderTarget.texture;
        
        // STEP 3: Show mesh and render to screen with refraction
        mesh.visible = true;
        renderer.setRenderTarget(null);
        
        // Debug: Log texture updates occasionally
        if (Math.random() < 0.01) { // Log 1% of the time to avoid spam
            console.log('Back render target texture assigned:', backRenderTarget.texture);
            console.log('Texture dimensions:', backRenderTarget.texture.image?.width, 'x', backRenderTarget.texture.image?.height);
            console.log('winResolution:', mesh.material.uniforms.winResolution.value);
            console.log('uRefractPower:', mesh.material.uniforms.uRefractPower.value);
            console.log('uChromaticAberration:', mesh.material.uniforms.uChromaticAberration.value);
        }
    }
    
    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, ready to initialize Three.js scene');
    init();
    animate();
}); 