import deps from '../../util/deps';

module.exports = ( content, type, reduction ) => {
    return deps( type ).then( loader => {
        var mesh = loader.parse( content,  {
            reduction: reduction
        });
        return require(`./${type}`)( mesh );
    });
};  