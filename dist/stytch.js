'use strict';
const envs = require('./envs');
const Client = require('./stytchClient');
const StytchError = require('./stytchError');
module.exports = {
    envs: envs,
    Client: Client,
    StytchError: StytchError,
};
