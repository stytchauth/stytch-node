"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapPromise(promise, cb) {
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
}
exports.default = wrapPromise;
