export default class Disk {
    constructor ( file, extension ){
        this.reader = new FileReader(); 
        this.extension = extension;
        this.load( file );
        return new Promise(( resolve, reject ) => {
            this.reader.addEventListener('load', e => {
                try {
                    resolve( e.target.result );
                } catch( e ){
                    reject( e );
                }   
            }, false );  
            this.reader.addEventListener( 'progress', e => {
                console.log( e );
            });
        });
    }
    load ( file ){  
        //根据模型类型选择哪种读取方式
        switch( this.extension ){
            case 'STL' : {
                //IE not support
                if ( !!this.reader.readAsBinaryString ) {
                    this.reader.readAsBinaryString( file ); 
                //support IE10
                } else {
                    this.reader.readAsArrayBuffer( file );
                }
                break;      
            }
            case 'OBJ' : 
            case 'JSON': {
                this.reader.readAsText( file );
                break;
            }
            default: {
                this.reader.readAsText( file );
            }       
        }
    }
}