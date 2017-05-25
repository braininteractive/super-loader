var scene, camera, renderer;
var mesh, material = new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } );
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

init();
animate();  

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
    camera = new THREE.PerspectiveCamera( 35, screenWidth / screenHeight, 1, 15 );
    camera.position.set( 3, 0.15, 30 );
    cameraTarget = new THREE.Vector3( 0, -0.25, 0 );

    // Ground
    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
    );
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -0.5;
    scene.add( plane );
    plane.receiveShadow = true;

    scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
    addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize( screenWidth, screenHeight );
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    if( mesh ) mesh.rotation.z += 0.01;
    render();
}

function render() {
    var timer = Date.now() * 0.0005;
    camera.position.x = Math.cos( timer ) * 3;
    camera.position.z = Math.sin( timer ) * 3;
    camera.lookAt( cameraTarget );
    renderer.render( scene, camera );
}

function addShadowedLight( x, y, z, color, intensity ) {
    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );
    directionalLight.castShadow = true;
    var d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.005;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
