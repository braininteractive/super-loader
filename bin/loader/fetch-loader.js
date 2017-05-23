import ps from '../util/pubsub';    

export default class {  
    constructor ( url, loader ){
        this.loader = loader;
        return this.load( url );        
    }       
    load ( url ){
        return new Promise(( resolve, reject ) => {
            this.loader.load( url, resolve, ({ loaded, total, timeStamp }) => {
                ps.emit('upload.progress', {
                    "name": url,
                    "loaded": loaded,
                    "total": total,
                    "timeStamp": timeStamp
                });     
            }, ({ message, stack }) => {
                ps.emit('upload.error', {
                    "name": url,
                    "stack": stack,
                    "message": message
                });
            });
        });
    }       
}   