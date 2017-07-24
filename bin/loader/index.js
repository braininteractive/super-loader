import Fetch from './fetch-loader';
import Disk from './disk-loader';
import Node from './node-loader';
import deps from '../util/deps';
import { appendBuffer, normalizeGeometry } from '../util';
import ps from '../util/pubsub';

module.exports = ( file, alias, extension, isDisk, workerEnable ) => {
    // The remote file is first read to the local, and then loaded according to the local file
    const FileReader = isDisk ? Disk : Fetch;
    const covert2Mesh = require(`../plugins/${extension}`); 
    const name = isDisk ? file.name : (alias || file);     

    deps( extension ).then( loader => {
        const fileReader = new FileReader( file, extension, loader );
        fileReader.then( content => {   
            ps.emit( 'upload.finish', {
                "name": name,   
                "buffer": content   
            });         
            try {               
                var $geometry = loader.parse( content );
                ps.emit( 'parse.before', {
                    "name": name,
                    "bufferGeometry": $geometry 
                });         
                var $mesh = covert2Mesh( $geometry );
                $mesh.name = name;  
                ps.emit( 'parse.load', {    
                    "name": name,
                    "mesh": $mesh
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