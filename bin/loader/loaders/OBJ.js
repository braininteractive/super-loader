import Loader from './';
import { normalizeGeometry } from '../util';

class OBJLoader extends Loader {
    constructor (){ 
        super('obj');
    }
    load ( object ){    
        object = object.children[ 0 ];
        object.geometry = normalizeGeometry( object.geometry );
        object.geometry.center();
        return new THREE.Mesh( object.geometry, this.material );
    }  
}  