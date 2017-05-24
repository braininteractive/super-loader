import Fetch from './fetch-loader';
import Disk from './disk-loader';
import deps from '../util/deps';
import { appendBuffer, normalizeGeometry } from '../util';
import PubSub from '../util/pubsub';

module.exports = ( file, extension, isDisk, workerEnable, noColor ) => {
    // The remote file is first read to the local, and then loaded according to the local file
    const FileReader = isDisk ? Disk : Fetch;
    const covert2Mesh = require(`../plugins/${extension}`);     

    deps( extension ).then( loader => {
        const fileReader = new FileReader( file, extension, loader );
        fileReader.then( content => {   
            PubSub.emit( 'upload.finish', content );    
            try {       
                var geometry = loader.parse( content, {    
                    "noColor": noColor  
                });     
                PubSub.emit( 'parse.load', covert2Mesh( geometry ));          
            } catch ({ message, stack }){  
                PubSub.emit( 'parse.error', stack );
            }
        });     
    });             
    return PubSub;
};              