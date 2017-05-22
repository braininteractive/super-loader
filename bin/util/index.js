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

export function splitArray ( faces, step ){
    var n = Math.ceil((faces / step));
    var result = [];
    result.push([ 0, n ]);
    for( var i = 1; i < step; i++ ){
        result.push([ n * i + 1, n * i + n ]);
    }
    //可能不被整除，所以最后一列设定为最大值
    result[ result.length - 1 ][ 1 ] = faces;
    return result;
}

export function appendBuffer ( buffer1, buffer2 ) {
  var tmp = new Float32Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Float32Array(buffer1), 0);
  tmp.set(new Float32Array(buffer2), buffer1.byteLength);
  return tmp;    
};