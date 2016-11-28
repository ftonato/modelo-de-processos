
module.exports = function (Q) {
  Q.forEach = function (arr, callback, thisArg) {
    var cb = callback,
      that = thisArg,
      deferred = Q.defer(),
      cur = undefined,
      rets = [];

    arr.forEach(function (value) {
      if (cur) {
        cur = cur.then(internal(value));
      } else {
        cur = callback.apply(that, [value]);
      }
    });

    if (cur) {
      cur.then(function (value) {
        deferred.resolve();
      }, function (err) {
        throw err;
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;

    function internal() {
      var args = arguments;
      return function (value) {
        rets.push(value);
        return cb.apply(that, args);
      }
    }
  }
};
