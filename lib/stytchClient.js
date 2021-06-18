'use strict';

const envs = require('./envs');
const stytchRequest = require('./stytchRequest');

function Client(config) {
    if (typeof config != 'object') {
        throw new Error('Unexpected config type. ' +
            'Refer to https://github.com/stytchauth/stytch-node ' +
            'for how to use the Node client library.');
    }

    if (!config.hasOwnProperty('project_id')) {
        throw new Error('Missing "project_id" in config');
    }

    if (!config.hasOwnProperty('secret')) {
        throw new Error('Missing "secret" in config');
    }

    if (!config.hasOwnProperty('env')) {
        throw new Error('Missing "env" in config');
    }

    if (config['env'] != envs.live && config['env'] != envs.test){
        throw new Error('Invalid env supplied, should be test or live')
    }

    if (arguments.length > 1 || Object.keys(config).length > 3) {
        throw new Error('Too many arguments provided for the Stytch config');
    }

    this.project_id = config.project_id;
    this.secret = config.secret;
    this.env = config.env;
}

Client.prototype._authenticatedRequest =
    function _authenticatedRequest(request, method, cb) {
        return stytchRequest({
            project_id: this.project_id,
            secret: this.secret,
        }, this.env, request, method, cb);
    };

// USERS
Client.prototype.createUser =
    function(request, cb) {
        return this._authenticatedRequest({
            path: 'users',
            body: request,
        },'POST', cb);
    };

Client.prototype.getUser =
    function(user_id, cb) {
        return this._authenticatedRequest({
            path: `users/${user_id}`,
        },'GET', cb);
    };

Client.prototype.updateUser =
    function(user_id, request, cb) {
        return this._authenticatedRequest({
            path: `users/${user_id}`,
            body: request,
        },'PUT', cb);
    };

Client.prototype.deleteUser =
    function(user_id, cb) {
        return this._authenticatedRequest({
            path: `users/${user_id}`,
        },'DELETE', cb);
    };

Client.prototype.getPendingUsers =
    function(request, cb) {
        var request = request || {};
        return this._authenticatedRequest({
            path: 'users/pending',
            params: {
                starting_after_id: request['starting_after_id'] || null,
                limit: request['limit'] || null,
            },
        },'GET', cb);
    };

Client.prototype.deleteUserEmail =
    function(email_id, cb) {
        return this._authenticatedRequest({
            path: `users/emails/${email_id}`,
        },'DELETE', cb);
    };

Client.prototype.deleteUserPhoneNumber =
    function (phone_id, cb) {
        return this._authenticatedRequest({
            path: `users/phone_numbers/${phone_id}`,
        }, 'DELETE', cb);
};

// MAGIC LINKS
Client.prototype.sendMagicLink =
    function(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/send',
            body: request,
        },'POST', cb);
    };

Client.prototype.sendMagicLinkByEmail =
    function(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/send_by_email',
            body: request,
        },'POST', cb);
    };

Client.prototype.loginOrCreate =
    function(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/login_or_create',
            body: request,
        },'POST', cb);
    };

Client.prototype.inviteByEmail =
    function(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/invite_by_email',
            body: request,
        },'POST', cb);
    };

Client.prototype.authenticateMagicLink =
    function(token, request, cb) {
        return this._authenticatedRequest({
            path: `magic_links/${token}/authenticate`,
            body: request,
        },'POST', cb);
    };

Client.prototype.revokePendingInvite =
    function(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/revoke_invite',
            body: request,
        },'POST', cb);
    };

// OTP
Client.prototype.sendOTPBySMS =
    function (request, cb) {
        return this._authenticatedRequest({
            path: 'otp/send_by_sms',
            body: request,
        },'POST', cb);
};

Client.prototype.loginOrCreateUserBySMS =
    function (request, cb) {
        return this._authenticatedRequest({
            path: 'otp/login_or_create',
            body: request,
        },'POST', cb);
};

Client.prototype.authenticateOTP =
    function (request, cb) {
        return this._authenticatedRequest({
            path: 'otp/authenticate',
            body: request,
        },'POST', cb);
};

module.exports = Client;
