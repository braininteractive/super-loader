import { normalizeGeometry } from '../../util';

module.exports = geometry => {
    geometry = normalizeGeometry( geometry );
    geometry.sourceType = "STL";
    geometry.center();
    geometry.computeVertexNormals();        
    geometry.computeFaceNormals();
    return new THREE.Mesh( geometry );
}