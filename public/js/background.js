document.addEventListener('DOMContentLoaded', function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';

    const cubes = [];
    const cubeCount = 285;

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onWindowResize();

    window.addEventListener('resize', onWindowResize, false);

for (let i = 0; i < cubeCount; i++) {
    const boxSize = 0.01 + Math.random() * 0.1;
    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

    const baseColor = new THREE.Color(Math.random(), Math.random(), Math.random());

    const materials = [];

    for (let j = 0; j < 6; j++) {
        const shade = 0.1 + Math.random() * 0.9;
        const color = new THREE.Color(
            baseColor.r * shade,
            baseColor.g * shade,
            baseColor.b * shade
        );
        materials.push(new THREE.MeshBasicMaterial({ color: color }));
    }

    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
    );

    cubes.push(cube);
    scene.add(cube);
}

    const animate = () => {
        requestAnimationFrame(animate);

        cubes.forEach((cube) => {
            cube.position.y -= 0.015;

            if (cube.position.y < -5) {
                cube.position.y = 5;
            }
        });

        renderer.render(scene, camera);
    };

    animate();

    const skyboxGeometry = new THREE.BoxGeometry(100, 100, 100);
    const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }); // Start with a black sky
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);

    const changeSkyboxColor = () => {
        const randomDarkColor = getRandomDarkColor();
        new TWEEN.Tween(skybox.material.color)
            .to({ r: (randomDarkColor >> 16) / 255, g: ((randomDarkColor >> 8) & 0xFF) / 255, b: (randomDarkColor & 0xFF) / 255 }, 3000)
            .onUpdate(() => {
            })
            .start();

        setTimeout(changeSkyboxColor, 2500);
    };

    const getRandomDarkColor = () => {
        const r = Math.floor(Math.random() * 13);
        const g = Math.floor(Math.random() * 8);
        const b = Math.floor(Math.random() * 15);
        return (r << 16) | (g << 8) | b;
    };

    changeSkyboxColor();
    
    function animateTween() {
        requestAnimationFrame(animateTween);
        TWEEN.update();
    }
    animateTween();
});
