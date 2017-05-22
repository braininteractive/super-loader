/**
 * @author royJang / https://github.com/royJang
 *
 * Description: A THREE loader for STL ASCII files, as created by Solidworks and other CAD programs.
 *
 * Supports both binary and ASCII encoded files, with automatic detection of type.
 *
 * The loader returns a non-indexed buffer geometry.
 */

import { splitArray } from '../util';


function STLLoader ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
};

STLLoader.prototype = {
	constructor: THREE.STLLoader,
	load: function ( url, onLoad, onProgress, onError ) {
		var scope = this;
		var loader = new THREE.FileLoader( scope.manager );
		loader.setResponseType( 'arraybuffer' );
		loader.load( url, function ( text ) {
			onLoad( scope.parse( text ) );
		}, onProgress, onError );
	},

	parse: function ( data, opts = {} ) {

		var isBinary = function () {

			var expect, face_size, n_faces, reader;
			reader = new DataView( binData );
			face_size = ( 32 / 8 * 3 ) + ( ( 32 / 8 * 3 ) * 3 ) + ( 16 / 8 );
			n_faces = reader.getUint32( 80, true );
			expect = 80 + ( 32 / 8 ) + ( n_faces * face_size );

			if ( expect === reader.byteLength ) {
				return true;
			}

			// An ASCII STL data must begin with 'solid ' as the first six bytes.
			// However, ASCII STLs lacking the SPACE after the 'd' are known to be
			// plentiful.  So, check the first 5 bytes for 'solid'.

			// US-ASCII ordinal values for 's', 'o', 'l', 'i', 'd'
			var solid = [ 115, 111, 108, 105, 100 ];

			for ( var i = 0; i < 5; i ++ ) {
				// If solid[ i ] does not match the i-th byte, then it is not an
				// ASCII STL; hence, it is binary and return true.
				if ( solid[ i ] != reader.getUint8( i, false ) ) return true;
 			}
			// First 5 bytes read "solid"; declare it to be an ASCII STL
			return false;
		};

		var binData = this.ensureBinary( data );

		opts.reduction = opts.reduction || 1;	

		return isBinary() ? 
			this.parseBinary( binData, opts ) : 
			this.parseASCII( this.ensureString( data ), opts );

	},

	parseBinary: function ( data, opts ) {
	
		var reader = new DataView( data );
		var $faces = reader.getUint32( 80, true );	

		var r, g, b, hasColors = false, colors;
		var defaultR, defaultG, defaultB, alpha;

		// var normals = new Float32Array( $faces * 3 * 3 );
		// var positions = new Float32Array( $faces * 3 * 3 );		

		// process STL header
		// check for default color in header ("COLOR=rgba" sequence).
		var ary = splitArray( $faces, opts.reduction );
		var step1_start = ary[ 0 ][ 0 ];
		var step1_end = ary[ 0 ][ 1 ];
		var rGeo = generatorGeometry( step1_start, step1_end );
		opts.initial( rGeo );	

		// loop, skip the first
		// update the Geometry
		// setTimeout(() => {
		ary = ary.map( item => {
			return function (){
				var start = item[ 0 ], 
					end = item[ 1 ];
				opts.update(generatorGeometry( start, end ), start /* offset */);
			};
		});
		var timer = null;
		var len = ary.length;

		execFunc();	

		function execFunc (){
			// clearTimeout( timer );	
			timer = setTimeout(() => {
				len -= 1;		
				if( len < 0 ) return clearTimeout( timer );
				ary[ len ]();
				execFunc();
			}, 1000 );		
		}	
		
		function generatorGeometry ( start, end ){
			var geometry = parseData( start, end );	
			var geo = new THREE.BufferGeometry();
			geo.addAttribute('normal', new THREE.BufferAttribute(geometry.attributes.normal.array, 3));
			geo.addAttribute('position', new THREE.BufferAttribute(geometry.attributes.position.array, 3));
			return geo;
		}

		// for( var i = 0, len = ary.length; i < len; i++ ){
		// 	var start = ary[ i ][ 0 ], 
		// 		end = ary[ i ][ 1 ];	

		// 	var geometry = parseData( start, end );	
		// 	if( rGeo.attributes.normal && rGeo.attributes.position ){
		// 		console.log('then');
		// 		break;
		// 	} else {
		// 		console.log('first');
		// 		rGeo.addAttribute('normal', new THREE.BufferAttribute(geometry.attributes.normal.array, 3));
		// 		rGeo.addAttribute('position', new THREE.BufferAttribute(geometry.attributes.position.array, 3));
		// 		opts.callback( rGeo );
		// 		break;
		// 	}
		// }

		// ary.forEach(( item, index ) => {
		// 	var start = item[ 0 ], 
		// 		end = item[ 1 ];

		// 	var geometry = parseData( start, end );
		// 	if( rGeo.attributes.normal && rGeo.attributes.position ){
		// 		console.log('then');
		// 	} else {
		// 		console.log('first');
		// 		rGeo.addAttribute('normal', new THREE.BufferAttribute(geometry.attributes.normal.array, 3));
		// 		rGeo.addAttribute('position', new THREE.BufferAttribute(geometry.attributes.position.array, 3));
		// 		opts.callback( rGeo );
		// 	}
		// 	// normals.set( geometry.attributes.normal.array, start * 3 * 3 );
		// 	// positions.set( geometry.attributes.position.array, start * 3 * 3 );
		// 	// geometry = null;
		// });	
		// rGeo.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
		// rGeo.addAttribute('position', new THREE.BufferAttribute(positions, 3));

		// normals = null;
		// positions = null;	

		// return rGeo;

		function parseData ( $start, $end ){

			for ( var index = 0; index < 80 - 10; index ++ ) {
				if ( ( reader.getUint32( index, false ) == 0x434F4C4F /*COLO*/ ) &&
					( reader.getUint8( index + 4 ) == 0x52 /*'R'*/ ) &&
					( reader.getUint8( index + 5 ) == 0x3D /*'='*/ ) ) {

					hasColors = true;
					colors = [];	

					defaultR = reader.getUint8( index + 6 ) / 255;
					defaultG = reader.getUint8( index + 7 ) / 255;
					defaultB = reader.getUint8( index + 8 ) / 255;
					alpha = reader.getUint8( index + 9 ) / 255;
				}
			}

			//The noColor default is false
			if( opts.noColor === true ){
				hasColors = false;
			}	

			var dataOffset = 84;
			var faceLength = 12 * 4 + 2;

			var geometry = new THREE.BufferGeometry();

			var vertices = [];
			var normals = [];

			for ( var face = $start; face < $end; face ++ ) {
				var start = dataOffset + face * faceLength;
				var normalX = reader.getFloat32( start, true );
				var normalY = reader.getFloat32( start + 4, true );
				var normalZ = reader.getFloat32( start + 8, true );
				if ( hasColors ) {	
					var packedColor = reader.getUint16( start + 48, true );
					if ( ( packedColor & 0x8000 ) === 0 ) {
						// facet has its own unique color
						r = ( packedColor & 0x1F ) / 31;
						g = ( ( packedColor >> 5 ) & 0x1F ) / 31;
						b = ( ( packedColor >> 10 ) & 0x1F ) / 31;
					} else {
						r = defaultR;
						g = defaultG;
						b = defaultB;
					}
				}
				for ( var i = 1; i <= 3; i ++ ) {
					var vertexstart = start + i * 12;
					vertices.push( reader.getFloat32( vertexstart, true ) );
					vertices.push( reader.getFloat32( vertexstart + 4, true ) );
					vertices.push( reader.getFloat32( vertexstart + 8, true ) );
					normals.push( normalX, normalY, normalZ );
					if ( hasColors ) {
						colors.push( r, g, b );
					}
				}
			}
			geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
			geometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );
			if ( hasColors ) {
				geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 3 ) );
				geometry.hasColors = true;
				geometry.alpha = alpha;
			}	
			return geometry;
		}
	},

	parseASCII: function ( data ) {

		var geometry, length, patternFace, patternNormal, patternVertex, result, text;
		geometry = new THREE.BufferGeometry();
		patternFace = /facet([\s\S]*?)endfacet/g;

		var vertices = [];
		var normals = [];

		var normal = new THREE.Vector3();

		while ( ( result = patternFace.exec( data ) ) !== null ) {

			text = result[ 0 ];
			patternNormal = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;

			while ( ( result = patternNormal.exec( text ) ) !== null ) {

				normal.x = parseFloat( result[ 1 ] );
				normal.y = parseFloat( result[ 3 ] );
				normal.z = parseFloat( result[ 5 ] );

			}

			patternVertex = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;

			while ( ( result = patternVertex.exec( text ) ) !== null ) {

				vertices.push( parseFloat( result[ 1 ] ), parseFloat( result[ 3 ] ), parseFloat( result[ 5 ] ) );
				normals.push( normal.x, normal.y, normal.z );

			}

		}

		geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
		geometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );

		return geometry;

	},

	ensureString: function ( buf ) {

		if ( typeof buf !== "string" ) {

			var array_buffer = new Uint8Array( buf );
			var strArray = [];
			for ( var i = 0; i < buf.byteLength; i ++ ) {

				strArray.push(String.fromCharCode( array_buffer[ i ] )); // implicitly assumes little-endian

			}
			return strArray.join('');

		} else {

			return buf;

		}

	},

	ensureBinary: function ( buf ) {

		if ( typeof buf === "string" ) {

			var array_buffer = new Uint8Array( buf.length );
			for ( var i = 0; i < buf.length; i ++ ) {

				array_buffer[ i ] = buf.charCodeAt( i ) & 0xff; // implicitly assumes little-endian

			}
			return array_buffer.buffer || array_buffer;

		} else {

			return buf;

		}

	}

};

module.exports = STLLoader;