import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.js';

var renderer = null,
    scene = null,
    camera = null,
    //Variables para las figuras
    cube = null,
    cylinder = null,
    dodecahedron = null,
    icosahedron = null,
    sphere = null,
    torus = null,
    //Variables para los materiales
    material0 = null,
    material1 = null,
    material2 = null,
    //Variable para saber que material cambiar
    num_material = 0,
    cambio = false, //Variable para saber si se cambio el material
    animating = true; //Variable para animar siempre estara activa desde un inicio
window.onload = onLoad;
function onLoad() {
    // Grab our container div
    var container = document.getElementById("container");

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Put in a camera
    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 4000);
    camera.position.set(0, 0, 12);

    // Create the Three.js renderer, add it to our div
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create a directional light to show off the object
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    scene.add(light);

    // Create a shaded, texture-mapped cube and add it to the scene
    // First, create the texture map
    var mapUrl = "./images/texturizado.jpg";

    //TextureLoader load in the texture map
    var texture = new THREE.TextureLoader().load(mapUrl);

    // Now, create a Phong material to show shading; pass in the map
    var material = new THREE.MeshPhongMaterial({ map: texture });

    //Creamos nuevos materiales que se utilizaran con diferente tipo de iluminacion pero con mismo color
    material0 = new THREE.MeshBasicMaterial({ map: texture });
    material1 = new THREE.MeshStandardMaterial({ map: texture });
    material2 = new THREE.MeshPhongMaterial({ map: texture });

    //Tamaño del cubo
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    //Es el tamaño con dimensiones en radio inferior, radio superior, altura y numero de segmentos
    const geometry2 = new THREE.CylinderGeometry(0.9, 0.9, 2.8, 32);
    //Dodecahedron
    const geometry3 = new THREE.DodecahedronGeometry(1.8, 0); //Radio y detalle
    //Icosahedron
    const geometry4 = new THREE.IcosahedronGeometry(1.8, 0); //Radio y detalle
    //Esfera
    const geometry5 = new THREE.SphereGeometry(1.8, 32, 32); //Radio, segmentos horizontales y verticales
    //Toroide
    const geometry6 = new THREE.TorusGeometry(1.5, 0.7, 16, 100); //Radio, radio del tubo, segmentos radiales y tubulares

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);
    cylinder = new THREE.Mesh(geometry2, material);
    dodecahedron = new THREE.Mesh(geometry3, material);
    icosahedron = new THREE.Mesh(geometry4, material);
    sphere = new THREE.Mesh(geometry5, material);
    torus = new THREE.Mesh(geometry6, material);

    //Set cube's position
    cube.position.set(-7.5, 2.4, 0);
    //Cylinder
    cylinder.position.set(0, 2.5, 0);
    //Dodecahedron
    dodecahedron.position.set(7.5, 2.4, 0);
    //Icosahedron
    icosahedron.position.set(-7.5, -2.4, 0);
    //Esfera
    sphere.position.set(0, -2, 0);
    //Toroide
    torus.position.set(7.5, -2, 0);

    // Turn it toward the scene, or we won't see the cube shape!
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    //Cylinder
    cylinder.rotation.x = Math.PI / 5;
    cylinder.rotation.y = Math.PI / 5;
    //Dodecahedron
    dodecahedron.rotation.x = Math.PI / 5;
    dodecahedron.rotation.y = Math.PI / 5;
    //Icosahedron
    icosahedron.rotation.x = Math.PI / 5;
    icosahedron.rotation.y = Math.PI / 5;
    //sphere
    sphere.rotation.x = Math.PI / 5;
    sphere.rotation.y = Math.PI / 5;
    //torus
    torus.rotation.x = Math.PI / 5;
    torus.rotation.y = Math.PI / 5;

    // Add the cube to our scene
    scene.add(cube, cylinder, dodecahedron, icosahedron, sphere, torus);
    // Add a mouse up handler to toggle the animation
    addMouseHandler();
    // Run our render loop
    run();
}
//Function to run the render loop
function run() {
    // Render the scene
    renderer.render(scene, camera);
    // Spin the figures for next frame
    if (animating) { //Ya que siempre estara activada la animacion estas se moveran en sus 3 ejes
        cube.rotation.x += 0.02; cube.rotation.y += 0.01; cube.rotation.z += 0.01;
        cylinder.rotation.x += 0.02; cylinder.rotation.y += 0.01; cylinder.rotation.z += 0.01;
        dodecahedron.rotation.x += 0.02; dodecahedron.rotation.y += 0.01; dodecahedron.rotation.z += 0.01;
        icosahedron.rotation.x += 0.02; icosahedron.rotation.y += 0.01; icosahedron.rotation.z += 0.01;
        sphere.rotation.x += 0.02; sphere.rotation.y += 0.01; sphere.rotation.z += 0.01;
        torus.rotation.x += 0.02; torus.rotation.y += 0.01; torus.rotation.z += 0.01;
    }
    // Ask for another frame
    requestAnimationFrame(run);
    //Se cambia el material de la figura dependiendo del valor de num_material
    if (cambio) {
        switch (num_material) {
            case 0:
                cube.material = material0;
                cylinder.material = material0;
                dodecahedron.material = material0;
                icosahedron.material = material0;
                sphere.material = material0;
                torus.material = material0;
                break;
            case 1:
                cube.material = material1;
                cylinder.material = material1;
                dodecahedron.material = material1;
                icosahedron.material = material1;
                sphere.material = material1;
                torus.material = material1;
                break;
            case 2:
                cube.material = material2;
                cylinder.material = material2;
                dodecahedron.material = material2;
                icosahedron.material = material2;
                sphere.material = material2;
                torus.material = material2;
                break;
        }
    }
}

// Handles the mouse up event, can be used to toggle animation
function addMouseHandler() {
    var dom = renderer.domElement;

    dom.addEventListener('mouseup', onMouseUp, false);
}

function onMouseUp(event) {
    event.preventDefault();
    //Si se da click se cambia el material de la figura por lo tanto solo puede tomar
    //los valores 0, 1 y 2, en otro caso se reinicia
    num_material++;
    if (num_material == 3) {
        num_material = 0;
    }
    //Se cambia el valor de cambio para que se cambie el material
    cambio = !cambio;
}	