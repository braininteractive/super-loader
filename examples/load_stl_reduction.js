var fs = require('fs-extra');
var path = require('path');
var records = path.resolve( __dirname, './records/' );
var dirs = fs.readdirSync( records );
var testResult = {};

/*
{
    'shoulder_L_pt4.stl' : {
        1: {
            area:
            vol:
            size:
        }
        100: {
            area: 
            vol:
            sizes:
        }
    }
}
*/

dirs.forEach(function ( json ){
    var content = JSON.parse(fs.readFileSync(path.join( records, json )));
    if( !testResult[ content.name ] ) testResult[ content.name ] = {};
    testResult[ content.name ][ content.reduction ] = content;
});

fs.outputFileSync( path.join(__dirname, 'public/json/test.json'), JSON.stringify( testResult, 0, 4 ));