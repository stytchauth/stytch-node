'use strict';

const R = require('ramda');
const axios = require('axios');
const pjson = require('../package.json');

const StytchError = require('./stytchError');
const wrapPromise = require('./wrapPromise');


// Max timeout of ten minutes
const DEFAULT_TIMEOUT_IN_MILLIS = 10 * 60 * 1000;

const rejectWithStytchError = function(reject, res) {
    if (R.type(res.data) === 'Object') {
        res.data.status_code = res.status;
        return reject(new StytchError(res.data));
    }

    // Unknown body type returned, return a 500
    return reject(new StytchError({
        error_type: 'API_ERROR',
        status_code: res.status,
        error_code: 'INTERNAL_SERVER_ERROR',
        error_message: String(res.data),
        display_message: null,
        request_id: null,
    }));
};

const handleApiResponse = function(resolve, reject, res) {
    const $body = res.data;
    if (res != null && R.type($body) === 'Object') {
        $body.status_code = res.status;
    }

    if (res.status === 200) {
        // extract request id from header for binary data,
        // i.e. mime type application/*
        if (res.headers['plaid-request-id'] != null &&
            res.headers['content-type'] != null &&
            res.headers['content-type'].indexOf('application') === 0) {
            return resolve({
                request_id: res.headers['plaid-request-id'],
                buffer: $body
            });
        }
        return resolve($body);

    } else {
        return rejectWithStytchError(reject, res);
    }
};

const stytchRequest = function (auth, env, request, method, cb) {
    const uri = env + request.path;
    const requestOptions = {
        url: uri,
        method: method,
        data: request.body,
        auth:{
            username: auth["project_id"],
            password: auth["secret"],
        },
        timeout: DEFAULT_TIMEOUT_IN_MILLIS,
        responseType: 'json'
    };
    console.log("RequestOptions below")
    console.log(requestOptions)
    return wrapPromise(new Promise(function (resolve, reject) {
        axios(requestOptions)
            .then((res) => {
                handleApiResponse(resolve, reject, res)
            })
            .catch((error) => {
                if (error.response) {
                    return rejectWithStytchError(reject, error.response);
                } else {
                    return reject(error);
                }
            });
    }), cb);
};

module.exports = stytchRequest;
