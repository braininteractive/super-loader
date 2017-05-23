function installLoader ( type, callback ){
    switch ( type ){
        case 'STL': {
            callback(new (require('../assets/STLLoader.js')));
            break;
        }
        case 'OBJ': {
            callback(new (require('../assets/OBJLoader.js')));
            break;
        }
    }           
}   

module.exports = type => {
    return new Promise(( resolve, reject ) => {
        if( !window.THREE ){
            console.error('super-loader must be required THREE.js');
        } else {
            installLoader( type, resolve );
        }
    });
}                       
