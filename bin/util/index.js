export function normalizeGeometry ( geo ){
    return geo instanceof THREE.BufferGeometry 
            ? ( new THREE.Geometry ).fromBufferGeometry( geo )   
            : geo;  
}       
    
export function getExtension ( name ){
    var re = name.match( /\.(\w+)$/i )[ 1 ];
    return re && re.toUpperCase();  
}       

export function isDiskFile ( file ){ 
    return Object.prototype.toString.call( file ) === '[object File]';
}
    