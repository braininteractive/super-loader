export default class {
    constructor ( file ){
        return this.load( file );
    }
    load ( file ){
        // var extension = file.type || getExtension( file.name ); 
        return new Promise(( resolve, reject ) => {
            //根据模型类型选择哪种读取方式
            // switch( extension ){
            //     case 'stl' : {
            //         // deps.loadSTLLoader().then(()=> {
            //             //优先使用remote字段
            //             // resolve((new STLLoader()).download( file.remote || file.name, loaded => {
            //                 // progressCb(parseInt(((loaded / file.size) * 100)));    
            //             // }));        
            //         // }); 
            //         break;
            //     }   
            //     case 'obj' : {  
            //         deps.loadOBJLoader().then(() => {
            //             resolve((new OBJLoader()).download( file.remote || file.name ));
            //         });
            //         break;
            //     }
            //     case 'json': {
            //         break;  
            //     }           
            // }
        });
    }
}