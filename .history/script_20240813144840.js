const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('myCanvas'),
});
renderer.setSize(window.innerWidth, window.innerHeight);

const dirLight = new THREE.DirectionalLight('#ffffff', 0.75);
dirLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
scene.add(dirLight, ambientLight);

const geometry = new THREE.IcosahedronGeometry(1, 150);

// adding shader files
// we gonna import the files as text into string variables
fetch('./fragment.glsl')
    .then((res) => res.text())
    .then(fragmentShader => {

        fetch('./vertex.glsl')
            .then((res) => res.text())
            .then(vertexShader => {

                const material = new THREE.ShaderMaterial({
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                });

                material.uniforms.uTime = { value: 0 };

                const shape = new THREE.Mesh(geometry, material);
                scene.add(shape);

                camera.position.z = 3;

                let time = 0;
                function animate() {

                    material.uniforms.uTime.value = time;

                    time += 0.001;

                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);

                }

                animate();

            });

    });