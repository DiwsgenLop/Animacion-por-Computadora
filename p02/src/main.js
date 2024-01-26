import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.js';
//Se crea el objeto de la escena
const scene = new THREE.Scene();
//Camara de tipo perspectiva (fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Se crea el objeto de renderizado
const renderer = new THREE.WebGLRenderer();
//Se agrega el objeto de renderizado al DOM
renderer.setSize( window.innerWidth, window.innerHeight );
// Se configura el color de fondo 
renderer.setClearColor( 0x000000, 1 );

//Se agrega el objeto de renderizado al DOM
document.body.appendChild( renderer.domElement );

// Se crea una luz direccional para mostrar el objeto
var light = new THREE.DirectionalLight( 0xffffff, 1.5); //Color e intensidad
light.position.set(1, 0, 1);
scene.add( light );

//Creando los objetos
//Tamaño del cubo
const geometry = new THREE.BoxGeometry(2, 2, 2);
//Es el tamaño con dimensiones en radio inferior, radio superior, altura y numero de segmentos
const geometry2 = new THREE.CylinderGeometry( 1, 1, 4, 32);
//Dodecahedron
const geometry3 = new THREE.DodecahedronGeometry( 2, 0 ); //Radio y detalle
//Icosahedron
const geometry4 = new THREE.IcosahedronGeometry( 2, 0 ); //Radio y detalle
//Esfera
const geometry5 = new THREE.SphereGeometry( 2, 32, 32 ); //Radio, segmentos horizontales y verticales
//Toroide
const geometry6 = new THREE.TorusGeometry( 2, 1, 16, 100 ); //Radio, radio del tubo, segmentos radiales y tubulares

//Material (color)
const material = new THREE.MeshPhongMaterial( { color: 0x0099ff } );

//Creacion de objetos
const cube = new THREE.Mesh( geometry, material );
const cylinder = new THREE.Mesh( geometry2, material );
const dodecahedron = new THREE.Mesh( geometry3, material );
const icosahedron = new THREE.Mesh( geometry4, material );
const sphere = new THREE.Mesh( geometry5, material );
const torus = new THREE.Mesh( geometry6, material );

//Coordenadas de elementos
//Cubo
cube.position.set(-10, 4, 0);
//Cilindro
cylinder.position.set(0, 4, 0);
//Dodecahedron
dodecahedron.position.set(10, 3.5, 0);
//Icosahedron
icosahedron.position.set(-10, -4, 0);
//Esfera
sphere.position.set(0, -4, 0);
//Toroide
torus.position.set(8.5, -3.5, 0);

//Añadiendo elementos
scene.add(cube, cylinder, dodecahedron, icosahedron, sphere, torus);

//Creacion de coordenadas
const coordx = 0;
const coordy = 0;
const coordz = 12;
//Se posiciona la camara
camera.position.set(coordx, coordy, coordz);

//Se crea la funcion de animacion
function animate() {
	requestAnimationFrame( animate );
    //Cubo
	cube.rotation.x += 0.02;
	cube.rotation.y += 0.01;
    //Cilindro
    cylinder.rotation.x += 0.02;
    cylinder.rotation.z += 0.01;
    //Dodecahedron
    dodecahedron.rotation.x += 0.02;
    dodecahedron.rotation.y += 0.01;
    //Icosahedron
    icosahedron.rotation.x += 0.02;
    icosahedron.rotation.y += 0.01;
    //Esfera
    sphere.rotation.x += 0.02;
    sphere.rotation.y += 0.01;
    //Toroide
    torus.rotation.x += 0.02;
    torus.rotation.y += 0.01;

    //Se renderiza la escena con la camara 
	renderer.render( scene, camera );
}
//Se llama a la funcion de animacion
animate();