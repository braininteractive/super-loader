var scene, camera, renderer, controls;
var mesh, material = new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } );
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

init();
animate();  

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
    camera = new THREE.PerspectiveCamera( 35, screenWidth / screenHeight, 1, 15 );
    camera.position.z = 3;

    controls = new THREE.TrackballControls( camera );
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.addEventListener( 'change', render );

    scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
    addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize( screenWidth, screenHeight );
    renderer.setClearColor( scene.fog.color );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}

function render() {
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
