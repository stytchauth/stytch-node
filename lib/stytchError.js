'use strict';

// StytchError wraps API errors to implement the Error class.
class StytchError extends Error {
    constructor(body) {
        super(body.error_code);
        this.name = 'StytchError';

        if (typeof body === 'object') {
            Object.assign(this, body);
        }
    }
}

module.exports = StytchError;
