import Fetch from './fetch-loader';
import Disk from './disk-loader';
import deps from '../util/deps';
import { appendBuffer, normalizeGeometry } from '../util';
import ps from '../util/pubsub';

module.exports = ( file, extension, isDisk, workerEnable, noColor ) => {
    // The remote file is first read to the local, and then loaded according to the local file
    const FileReader = isDisk ? Disk : Fetch;
    const covert2Mesh = require(`../plugins/${extension}`); 
    const name = isDisk ? file.name : file;     
    
    deps( extension ).then( loader => {
        const fileReader = new FileReader( file, extension, loader );
        fileReader.then( content => {   
            ps.emit( 'upload.finish', {
                "name": name,   
                "buffer": content   
            });     
            try {       
                var geometry = loader.parse( content, {    
                    "noColor": noColor  
                });     
                ps.emit( 'parse.before', {
                    "name": name,
                    "bufferGeometry": geometry
                });     
                ps.emit( 'parse.load', {
                    "name": name,
                    "mesh": covert2Mesh( geometry )
                });             
            } catch ({ message, stack }){  
                ps.emit( 'parse.error', {
                    "name": name,
                    "stack": stack,
                    "message": message
                });
            }   
        });     
    });             
    return ps;
};              