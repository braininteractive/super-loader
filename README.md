# super-loader
load stl、fbx、obj and so on...

### Example
```
    var loader = require('super-loader');
    // local
    // 1.
    loader( event.target.files[ 0 ], /* options */ );
    // 2.
    loader( File, /* options */ );
    // 3.
    loader( event.target.files, /* options */ );
    // 4.
    loader( [ File, File, File ], /* options */ );
```

```
    // remote
    // 1.
    loader( 'http://royjang.github.io/super-loader/example.stl', /* options */ );
    // 2.
    loader( 'http://royjang.github.io/super-loader/503d123bea9fcc8064a60e8e4572ac90', /* options */ );
```

```
    loader( 'http://royjang.github.io/super-loader/example.stl' )
        .then( mesh => {
            //the mesh
        })
        .catch( e => {
            // some error
        });
```

### Options

#### type
```
    // if the URL not has been file extension, should be set type
    loader( 'http://royjang.github.io/super-loader/503d123bea9fcc8064a60e8e4572ac90', {
        type: 'stl' // no default
    });
``` 

#### worker
load the model using webworker
```
    worker: false // if the browser supports webworker, default is true
``` 

#### max-thread
The maximum number of threads that webwork can use
```
    maxThread: 4 // default is 4
``` 

#### max-size
The maximum number of file size, the default unit is byte
```
    maxSize: 1000 // no default
```