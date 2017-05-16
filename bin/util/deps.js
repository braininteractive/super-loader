import STLLoader from '../assets/STLLoader';

function installLoader ( type, callback ){
    callback( new STLLoader () );
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
