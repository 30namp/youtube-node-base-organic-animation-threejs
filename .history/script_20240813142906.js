import fragment from "./fragment.glsl";

// script.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.SphereGeometry(1, 32, 32);

const vertexShader = `
    uniform float amplitude;
  
    void main() {
      vec3 newPosition = position + normal * amplitude;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

const fragmentShader = `
    uniform vec3 color;
  
    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `;

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms:
    {
        amplitude: { value: 0.2 },
        color: { value: new THREE.Color(0xffffff) }
    }
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();