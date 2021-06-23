"use strict";
const wrapPromise = function (promise, cb) {
    if (cb) {
        return promise.then(function (args) {
            setImmediate(function () {
                cb(null, args);
            });
        }).catch(function (err) {
            setImmediate(function () {
                cb(err, undefined);
            });
        });
    }
    return promise;
};
module.exports = wrapPromise;
