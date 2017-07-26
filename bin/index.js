/**
    @author royJang https://github.com/royJang
*/
import { getExtension, isDiskFile } from './util';
import loader from './loader';
import ps from './util/pubsub';
    
function superLoader ( file /* or files */, configure = {} ) {

    if( !window.FileReader || !window.ArrayBuffer ) {
        return ps.emit('compatible.error', 'Not support FileReader or ArrayBuffer');
    }

    if(Array.isArray( file )){
        file.forEach( _file => {
            superLoader( _file.url, Object.assign(configure, {
                alias: _file.alias
            }));
        });
        return ps;  
    }
    if( file instanceof FileList ){ 
        var fl = file.length;   
        while( fl-- ){
            superLoader(file.item( fl ), configure);
        }
        return ps;  
    }           

    var extension;
    var alias;
    var isDisk = isDiskFile( file );

    // default configure
    var workerEnable;
    var maxThread = 4;  

    // getExtension(decodeURIComponent( file ));
    if( configure.type ) extension = configure.type.toUpperCase(); //use user's configure first

    // if it's a local file 
    if( isDisk ){
        extension = file.type || getExtension( file.name );
    }
    else {
        file = decodeURIComponent( file );
        extension = extension || getExtension( file );  
    }           

    if( configure.alias ) alias = configure.alias;

    if( !extension ) return ps.emit('compatible.error', 'Can not determine the format of the file');
    
    // webWorker support
    if( window.Worker && ( configure.worker || typeof configure.worker === undefined )){
        workerEnable = true;
    }       

    return loader( file, alias, extension, isDisk, workerEnable );
};

module.exports = superLoader;