# super-loader    
[![Latest NPM release][npm-badge]][npm-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

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

[npm-badge]: https://img.shields.io/npm/v/super-loader.svg
[npm-badge-url]: https://www.npmjs.com/package/super-loader
[license-badge]: https://img.shields.io/npm/l/super-loader.svg
[license-badge-url]: ./LICENSE
[dependencies-badge]: https://img.shields.io/david/royJang/super-loader.svg
[dependencies-badge-url]: https://david-dm.org/royJang/super-loader
[devDependencies-badge]: 
https://img.shields.io/david/dev/royJang/super-loader.svg
[devDependencies-badge-url]: 
https://david-dm.org/royJang/super-loader#info=devDependencies