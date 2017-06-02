# super-loader    
[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

- The model loader for the three.js     
- Currently Support `STL`, `OBJ`  

### Installation
- Npm     
`npm i super-loader --save`  

- Download the minified library and include it in your html.       
`<script src="assets/three.min.js"></script>`        
`<script src="assets/super-loader.min.js"></script>`        
     
### Usage

- Module Require
```
var loader = require('super-loader');
var load = loader('assets/models/example.stl');
load.on('parse.load', function ( event, mesh ){
	//scene.add( mesh );
});
load.on('parse.error', function ( event, stack ){
	//console.log( stack );
});
```
- Use window
```
var load = window.superLoader('assets/models/example.stl');
load.on ...
```

**Note:** If you need to load the stl model, must be require the `THREE.STLLoader`    
**Note:** We have modified some of the source code for *-loader, You can download it in `example / javascripts / loaders`    

### Constructor
```
var loader = require('super-loader');

loader( URLs, configure );
```

### URLs
URLs support 4 types
- `File` or `FileList`   
If you upload a model from the local, you can use it like this:    
```
loader( event.target.files[ 0 ], /* configure */ );
```
or    
```
loader( event.target.files );
```

- `String` or `Array`    
You can also use the http link     
```
loader( 'https://royjang.github.io/super-loader/model/aircraft.stl', /* configure */ );
```
or    
```
loader([
	'https://royjang.github.io/super-loader/model/aircraft.stl',
	'https://royjang.github.io/super-loader/model/car.stl'
], /* configure */);	
```

### Configure

- `type`    
If the url can't reflect the type of model, the parameter is required    
```
{
	type: 'stl' // not case sensitive
}
```

- `worker`
Use a separate thread resolution model
```
{
	worker: true
}
```

### Will Support

- `timeout`


**Note:** If the Browser support WebWorker, defaut is true

### Hooks - Listener

- `parse.before`
```
loader.on('parse.before', ( event, { name, bufferGeometry } ) => {});
```

- `parse.load`
```
loader.on('parse.load', ( event, { name, mesh } ) => {});
```

- `parse.error`
```
loader.on('parse.error', ( event, { name, stack, message } ) => {});
```

- `upload.finish`
```
loader.on('upload.finish', ( event, { name, buffer } ) => {});
```

- `upload.error`
```
loader.on('upload.error', ( event, { name, stack, message } ) => {});
```

- `upload.progress`
```
loader.on('upload.progress', ( event, { name, loaded, total, timeStamp } ) => {});
```

- `compatible.error`    
If the browser not support `WebGL`,  `FileReader` or `ArrayBuffer`    
```
loader.on('compatible.error', ( event, message ) => {});
```
	
### Hooks - Emit
- `upload.abort`    
abort the file upload    
```
loader.emit('upload.abort');
```

### Example        
[Load-STL](https://royjang.github.io/super-loader/load_stl.html)     
[Load-STL-Multiple](https://royjang.github.io/super-loader/load_stl_multiple.html)        
[Load-OBJ](https://royjang.github.io/super-loader/load_obj.html)      
[Load-OBJ-With-STL](https://royjang.github.io/super-loader/load_obj_w_stl.html)    
[Upload-OBJ-With-STL](https://royjang.github.io/super-loader/upload_obj_w_stl.html)


[npm-badge]: https://img.shields.io/npm/v/super-loader.svg
[npm-badge-url]: https://www.npmjs.com/package/super-loader
[license-badge]: https://img.shields.io/npm/l/super-loader.svg
[license-badge-url]: ./LICENSE
[dependencies-badge]: https://img.shields.io/david/royJang/super-loader.svg
[dependencies-badge-url]: https://david-dm.org/royJang/super-loader
[devDependencies-badge]: https://img.shields.io/david/dev/royJang/super-loader.svg
[devDependencies-badge-url]: https://david-dm.org/royJang/super-loader#info=devDependencies