/*
    super-loader v1.0
*/
import { getExtension, isDiskFile } from './util';
import loader from './loader';
import ps from './util/pubsub';
    
function superLoader ( file, configure = {} ) {

    if( !window.FileReader || !window.ArrayBuffer ) 
        return ps.emit('compatible.error', '[Error] This browser is not supported');

    var extension;
    var isDisk = isDiskFile( file );

    // default configure
    var workerEnable;
    var maxThread = 4;

    // if it's a local file
    if( isDisk ){
        extension = file.type || getExtension( file.name );
    }
    else {
        file = decodeURIComponent( file );
        extension = getExtension( file );
    }       

    // getExtension(decodeURIComponent( file ));
    if( configure.type ) extension = configure.type; //use user's configure first

    if( !extension ) return ps.emit('compatible.error', '[Error] Can not determine the format of the file');
    
    // webWorker support        
    if( window.Worker && ( configure.worker || typeof configure.worker === undefined )){
        workerEnable = true;
    }   

    // default: super-loader parse the model's Color
    var noColor = configure.noColor || true;       

    return loader( file, extension, isDisk, workerEnable, !!noColor );
};

module.exports = superLoader;