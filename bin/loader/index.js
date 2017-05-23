import Fetch from './fetch-loader';
import Disk from './disk-loader';
import deps from '../util/deps';
import { appendBuffer, normalizeGeometry } from '../util';
import PubSub from '../util/pubsub';

module.exports = ( file, extension, isDisk, workerEnable, reduction, noColor ) => {
    // The remote file is first read to the local, and then loaded according to the local file
    const FileReader = isDisk ? Disk : Fetch;
    const covert2Mesh = require(`./loaders/${extension}`); 

    deps( extension ).then( loader => {
        const fileReader = new FileReader( file, loader );
        fileReader.then( content => {     
            PubSub.emit( 'upload.finish', content );
            try {       
                console.log( typeof content );
                loader.parse( content, {
                    noColor: noColor,   
                    load ( geometry ){
                        console.log( geometry );
                        var theMesh = covert2Mesh( geometry );       
                        PubSub.emit( 'parse.load', theMesh );          
                    }
                });     
            } catch ( e ){
                PubSub.emit( 'parse.error', e );
            }
        });  
    });             
    return PubSub;
};              