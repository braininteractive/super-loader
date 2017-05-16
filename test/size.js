module.exports = function ( mesh ){
    var box = mesh.geometry.boundingBox;
    var sizes = {
        x: ( box.max.x - box.min.x ),
        y: ( box.max.y - box.min.y ),
        z: ( box.max.z - box.min.z )
    };      
    var ret = calcVol([ mesh.geometry.vertices, mesh.geometry.faces ]);
    return {
        sizes: {
            x : sizes.x.toFixed(3),
            y : sizes.y.toFixed(3),
            z : sizes.z.toFixed(3)
        },
        area: ret.area.toFixed(2),
        vol: ret.vol.toFixed(2)
    };
}   

function signedVolumeOfTriangle ( point1, point2, point3 ) {
    var v321 = point3.x * point2.y * point1.z;
    var v231 = point2.x * point3.y * point1.z;
    var v312 = point3.x * point1.y * point2.z;
    var v132 = point1.x * point3.y * point2.z;
    var v213 = point2.x * point1.y * point3.z;
    var v123 = point1.x * point2.y * point3.z;
    return (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);
}

function signedSurfaceOfTriangle ( point1, point2, point3 ) {
    var ax = point2.x - point1.x;
    var ay = point2.y - point1.y;
    var az = point2.z - point1.z;
    var bx = point3.x - point1.x;
    var by = point3.y - point1.y;
    var bz = point3.z - point1.z;       
    var cx = ay * bz - az * by;
    var cy = az * bx - ax * bz;
    var cz = ax * by - ay * bx;
    return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz);
}

function calcVol(data) {
    var vol = 0;    
    var area = 0;   
    var faces = data[ 1 ];
    var vertices = data[ 0 ];
    for (var i = 0, len = data[1].length; i < len; i++) {     
        vol += signedVolumeOfTriangle( vertices[ faces[i].a ], vertices[ faces[i].b ], vertices[ faces[i].c ]);
        area += signedSurfaceOfTriangle( vertices[ faces[i].a ], vertices[ faces[i].b ], vertices[ faces[i].c ]);
    }
    vol = vol / 1000;
    area = area / 100;
    return {
        vol: vol, 
        area: area
    };  
}