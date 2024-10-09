import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';

// Create the scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a custom geometry using BufferGeometry
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -5, 5, -5,
    5, 5, -5,
    5, 15, -5,
    -5, 15, -5,
    -5, 5, 5,
    5, 5, 5,
    5, 15, 5,
    -5, 15, 5,
]);
const indices = [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    0, 1, 5, 5, 4, 0,
    1, 2, 6, 6, 5, 1,
    2, 3, 7, 7, 6, 2,
    4, 5, 6, 6, 7, 4
];
geometry.setIndex(indices);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// Create a material and combine it with the geometry into a mesh
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const customMesh = new THREE.Mesh(geometry, material);

// Add the custom mesh to the scene
scene.add(customMesh);

// Create a plane geometry and material
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Rotate the plane to be horizontal
plane.rotation.x = Math.PI / 2;

// Position the plane below the custom mesh
plane.position.y = -1;

// Add the plane to the scene
scene.add(plane);

// Move the camera away from the origin, down the Z axis
camera.position.z = 20;

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor
controls.screenSpacePanning = false; // Disable panning

// Create a GUI
const gui = new GUI();
const meshFolder = gui.addFolder('Custom Mesh');
meshFolder.add(customMesh.position, 'x', -10, 10);
meshFolder.add(customMesh.position, 'y', -10, 10);
meshFolder.add(customMesh.position, 'z', -10, 10);
meshFolder.add(customMesh.rotation, 'x', 0, Math.PI * 2);
meshFolder.add(customMesh.rotation, 'y', 0, Math.PI * 2);
meshFolder.add(customMesh.rotation, 'z', 0, Math.PI * 2);
meshFolder.open();

// Create a function to animate our scene
function animate() {
    requestAnimationFrame(animate);

    // Update the controls
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Run the animation function for the first time to kick things off
animate();