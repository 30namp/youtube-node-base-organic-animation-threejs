// script.js
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new three.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
});

const geometry = new three.SphereGeometry(1, 32, 32);

fetch("./fragment.glsl")
    .then((res) => res.text())
    .then((fragmentShader) => {
        const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

        const material = new three.ShaderMaterial({
            vertexShader,
            fragmentShader,
        });

        const sphere = new three.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 3;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
    });