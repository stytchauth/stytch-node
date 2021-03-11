'use strict';

const axios = require('axios');

const StytchError = require('./stytchError');
const wrapPromise = require('./wrapPromise');


// Max timeout of ten minutes
const DEFAULT_TIMEOUT_IN_MILLIS = 10 * 60 * 1000;

const rejectWithStytchError = function(reject, res) {
    if (typeof res.data === 'object'){
        res.data.status_code = res.status;
        return reject(new StytchError(res.data));
    }

    // Unknown body type returned, return a 500
    return reject(new StytchError({
        status_code: 500,
        error_type: 'internal_server_error',
        error_message: 'Oops, something seems to have gone wrong',
        error_url: 'https://stytch.com/docs/api/errors/500',
    }));
};

const handleApiResponse = function(resolve, reject, res) {
    if (res.status === 200 || res.status === 201) {
        return resolve(res.data);
    } else {
        return rejectWithStytchError(reject, res);
    }
};

const stytchRequest = function (auth, env, request, method, cb) {
    const uri = env + request.path;
    const requestOptions = {
        url: uri,
        method: method,
        data: request.body || null,
        auth: {
            username: auth["project_id"],
            password: auth["secret"],
        },
        params: request.params || null,
        timeout: DEFAULT_TIMEOUT_IN_MILLIS,
        responseType: 'json',
        headers: {"Content-Type": "application/json"}
    };

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
