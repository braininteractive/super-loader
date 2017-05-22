var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs-extra');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
  
function unique(arr){
     arr.sort();
     var newArr = [arr[0]];
     for(var i=1, len=arr.length; i<len; i++){
         if(arr[i] !== newArr[newArr.length-1]){
             newArr.push(arr[i]);
            }
     }
     return newArr;
}

router.get('/stl_reduction_test', function ( req, res, next ){
  var json = JSON.parse(fs.readFileSync(path.resolve( __dirname, '../public/json/test.json')));
  var reductions = [];
  for( var i in json ){
    for( var k in json[ i ] ){
      reductions.push( k );
    }
  }

  res.render('stl_reduction_test', { 
    title: 'stl_reduction_test',  
    data: json,
    items: Object.keys( json ),
    reduction: unique(reductions)
  });
});

module.exports = router;
