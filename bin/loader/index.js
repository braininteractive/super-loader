import Fetch from './fetch-loader';
import Disk from './disk-loader';
import loader from './loaders';

module.exports = ( file, extension, isDisk, workerEnable, reduction ) => {
    // The remote file is first read to the local, and then loaded according to the local file
    const FileReader = isDisk ? Disk : Fetch;
    const fileReader = new FileReader( file, extension );
    return fileReader.then( content => { 
        try {
            return Promise.resolve( loader( content, extension, reduction ) );
        } catch ( e ){
            return Promise.reject( e );
        }
    });     
};              