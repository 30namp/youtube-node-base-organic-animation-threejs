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

fetch("./fragment.glsl")
    .then((res) => res.text())
    .then((fragmentShader) => {
        const vertexShader = `
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(1, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 3;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
    });