import Fetch from './fetch-loader';
import Disk from './disk-loader';
import deps from '../util/deps';
import { appendBuffer } from '../util';
import PubSub from '../util/pubsub';

function ensureBinary ( buf ){
    if ( typeof buf === "string" ) {
        var array_buffer = new Uint8Array( buf.length );
        for ( var i = 0; i < buf.length; i ++ ) {
            array_buffer[ i ] = buf.charCodeAt( i ) & 0xff; // implicitly assumes little-endian
        }
        return array_buffer.buffer || array_buffer;
    } else {
        return buf;
    }
}


module.exports = ( file, extension, isDisk, workerEnable, reduction, noColor ) => {
    // The remote file is first read to the local, and then loaded according to the local file
    const FileReader = isDisk ? Disk : Fetch;
    const fileReader = new FileReader( file, extension );
    const LOADER = require(`./loaders/${extension}`); 

    fileReader.then( content => { 
        try {   
            var theMesh = null;
            return deps( extension ).then( loader => {
               loader.parse( content, {
                    reduction: reduction,       
                    noColor: noColor,
                    initial ( geometry ){
                        theMesh = LOADER( geometry );
                        PubSub.emit('initial', theMesh);        
                    },
                    update ( geometry ){
                        var _geometry = (new THREE.Geometry()).fromBufferGeometry( geometry );
                        theMesh.geometry.merge( _geometry );
                        theMesh.geometry.computeFaceNormals();
                        theMesh.updateMatrix();
                        theMesh.drawMode = THREE.TrianglesDrawMode;
                        PubSub.emit('update', theMesh );    
                    },  
                    finish ( len ){
                        theMesh.drawMode = THREE.TrianglesDrawMode; 
                        PubSub.emit('finish', theMesh);      
                    }       
                });             
            }); 
        } catch ( e ){
            return Promise.reject( e );
        }
    });    

    return PubSub;
};              