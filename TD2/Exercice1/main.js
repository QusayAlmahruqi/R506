// Source: https://threejs.org/docs/pages/GLTFLoader.html 
//this is to get the 3d image
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Source: https://threejs.org/manual/pages/creating-a-scene.html
import * as THREE from 'three';

// Scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);

//to get the image we downloaded for the cube
const texture = new THREE.TextureLoader().load('wall.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshStandardMaterial({ map: texture }); // this material Reacts to light

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//the light
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

// Load the 3d robot
const loader = new GLTFLoader();

let robot;

loader.load('RobotExpressive.glb', function(gltf) {
    robot = gltf.scene;
    robot.scale.set(0.3, 0.3, 0.3);
    robot.position.x = 2;
    scene.add(robot);
});



camera.position.z = 5;

// Animation
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (robot) robot.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

