function range( min, max, step ) {
    var t = [];
    for( var i = min; i < max; i += step ){
        t.push( i );
    }
    return t;
}

var array = range( 0, 1000000, 1 );

function divide ( arrayOrigin, times ){
    
}

console.time('divide');
divide( array, times );
console.timeEnd('divide');