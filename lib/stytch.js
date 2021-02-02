'use strict';

const environments = require('./environments');
const Client = require('./stytchClient');
const StytchError = require('./stytchError');

module.exports = {
    environments: environments,
    Client: Client,
    StytchError: StytchError,
};
