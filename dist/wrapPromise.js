'use strict';
// (Promise, Callback, Options?) => Promise | void
const wrapPromise = function (promise, cb) {
    if (cb) {
        return promise.then(function (args) {
            setImmediate(function () {
                cb(null, args);
            });
        }).catch(function (err) {
            setImmediate(function () {
                cb(err);
            });
        });
    }
    return promise;
};
module.exports = wrapPromise;
