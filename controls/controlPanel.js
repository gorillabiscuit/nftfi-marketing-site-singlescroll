// Control Panel Module for NFTfi Marketing Site
// Handles all DOM-based UI controls for shader parameters, camera, and effects

// Global references to Three.js objects (will be set by main.js)
let camera;
let uniforms;

// Import the actual plane update function
let updatePlaneFromBackground = null;

// Initialize all controls
export function initializeControls(threeCamera, threeUniforms, planeUpdateFunction = null) {
    // Store references
    camera = threeCamera;
    uniforms = threeUniforms;
    updatePlaneFromBackground = planeUpdateFunction;
    
    // Initialize accordion functionality
    initializeAccordion();
    
    // Initialize all control event listeners
    initializeControlListeners();
    
    // Sync UI with actual camera position
    syncCameraUI();
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

// Initialize all control event listeners
function initializeControlListeners() {
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
}

// Sync UI with actual camera position
function syncCameraUI() {
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

// Update light direction
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

// Update material properties
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

// Update index of refraction values
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

// Update effect parameters
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

// Update camera position and FOV
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
    }
}

// Update plane position and scale
function updatePlane() {
    const x = parseFloat(document.getElementById('planeX').value);
    const y = parseFloat(document.getElementById('planeY').value);
    const z = parseFloat(document.getElementById('planeZ').value);
    const scale = parseFloat(document.getElementById('planeScale').value);
    
    document.getElementById('planeXValue').textContent = x.toFixed(1);
    document.getElementById('planeYValue').textContent = y.toFixed(1);
    document.getElementById('planeZValue').textContent = z.toFixed(1);
    document.getElementById('planeScaleValue').textContent = scale.toFixed(1);
    
    // Call the actual plane update function from backgroundPlane.js
    if (updatePlaneFromBackground) {
        updatePlaneFromBackground();
    }
}

// Export functions that might be needed by other modules
export {
    updateLight,
    updateMaterial,
    updateIOR,
    updateEffects,
    updateCamera,
    updatePlane,
    syncCameraUI
}; 