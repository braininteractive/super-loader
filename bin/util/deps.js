module.exports = type => {
    return new Promise(( resolve, reject ) => {
        if( !window.THREE ){
            console.error('super-loader must be required THREE.js');
        } else {
            var loader = THREE[type + 'Loader'];
            if( !loader ) return reject(`Not Found THREE.${type + 'Loader'}`);
            resolve( new loader );  
        }
    });
}   
