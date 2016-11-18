module.exports = {
    toArray: function (collection) {
        var reflect = require('harmony-reflect');

        var retVal = [];
        var current = -1;

        reflect.ownKeys(collection).forEach(function (e) {
            var toAdd = collection[e];

            toAdd.id = e;

            retVal[++current] = toAdd;
        });

        return retVal;
    }
}