var scene, camera, renderer;
var mesh, material = new THREE.MeshPhongMaterial({ color: 0x666666 });
var screenWidth = window.screen.availWidth;
var screenHeight = window.screen.availHeight;

init();
animate();  

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, screenWidth / screenHeight, 1, 10000 );
    camera.position.z = 1000;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    var light = new THREE.AmbientLight( 0xffffff, 1 );
    scene.add( light ); 

    var dirLight = new THREE.DirectionalLight( 0xffffff, 2);
    scene.add( dirLight );

    renderer.setSize( screenWidth, screenHeight );
    renderer.setClearColor( 0xf9f9f9 );
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    if( mesh ) mesh.rotation.z += 0.01;
    renderer.render( scene, camera );
}