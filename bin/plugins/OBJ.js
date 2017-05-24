import { normalizeGeometry } from '../util';

module.exports = object => {
    object = object.children[ 0 ];
    object.geometry = normalizeGeometry( object.geometry );
    return new THREE.Mesh( object.geometry );
}   