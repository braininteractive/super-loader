# super-loader    
- The model loader for the three.js     
- Currently Support `STL`, `OBJ`, `FBX` &`JSON`      

### Install
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
```

- Use window
```
	var load = window.superLoader('assets/models/example.stl');
	load.on ...
```

For more details, please see the [documentation](https://royjang.github.io/super-loader/)