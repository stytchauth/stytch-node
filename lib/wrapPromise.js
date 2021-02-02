'use strict';

const R = require('ramda');

// (Promise, Callback, Options?) => Promise | void
//
// Options: { no_spread: bool }
//   no_spread: prevents wrapPromise from applying array-like return arguments
//              to the callback.
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
