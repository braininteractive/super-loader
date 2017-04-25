# super-loader
load stl、fbx、obj ...

### Example
```
    var loader = require('super-loader');
    // local
    // 1.
    var mesh = loader( event.target.files, /* options */ );
    // 2.
    var mesh = loader( File, /* options */ );
    // remote
    // 1.
    var mesh = loader( 'http://royjang.github.io/super-loader/example.stl', /* options */ );
    // 2.
    var mesh = loader( 'http://royjang.github.io/super-loader/503d123bea9fcc8064a60e8e4572ac90', /* options */ );
```

### Options

#### type
```
    // if the URL not has been file extension, should be set type
    var mesh = loader( 'http://royjang.github.io/super-loader/503d123bea9fcc8064a60e8e4572ac90', {
        type: 'stl' // no default
    });
``` 

#### reduction
Reduce the number of vertexes in reading files
```
    var mesh = loader( File, {
        reduction: 1 // default is 1
    });
```

#### worker
load the model using webworker
```
    var mesh = loader( File, {
        worker: false // if the browser supports webworker, default is true
    });
``` 

#### max
The maximum number of threads that webwork can use
```
    var mesh = loader( File, {
        max: 4 // default is 4
    });
``` 