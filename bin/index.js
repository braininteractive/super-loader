/*
    super-loader v1.0
*/
import { getExtension, isDiskFile } from './util';
import loader from './loader';
    
function superLoader ( file, configure = {} ) {

    if( !window.FileReader || !window.ArrayBuffer ) return Promise.reject('[Error] This browser is not supported');

    var extension;
    var isDisk = isDiskFile( file );

    // default configure
    var workerEnable;
    var maxThread = 4;
    var reduction = 1;

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

    if( !extension ) return Promise.reject('[Error] Can not determine the format of the file');

    // Reduce the number of vertexes in reading files
    if( configure.reduction ) reduction = configure.reduction;

    // webWorker support        
    if( window.Worker && ( configure.worker || typeof configure.worker === undefined )){
        workerEnable = true;
    }   

    // default: super-loader parse the model's Color
    var noColor = configure.noColor || true;       

    return loader( file, extension, isDisk, workerEnable, reduction, !!noColor );
};

module.exports = superLoader;