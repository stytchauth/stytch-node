'use strict';

const R = require('ramda');

const stytchEnvironments = require('./environments');
const stytchRequest = require('./stytchRequest');

// Client(String, String, String, String, Object?)
function Client(configs) {
    if (!R.is(Object, configs)) {
        throw new Error('Unexpected parameter type. ' +
            'Refer to https://github.com/stytchauth/stytch-node ' +
            'for how to use the Node client library.');
    }

    if (R.isNil(configs.projectID)) {
        throw new Error('Missing "projectID"');
    }

    if (R.isNil(configs.secret)) {
        throw new Error('Missing "secret"');
    }

    if (!R.any(R.equals(configs.env), R.values(stytchEnvironments))) {
        throw new Error('Invalid environment');
    }

    if (arguments.length > 1) {
        throw new Error('Too many arguments');
    }

    this.project_id = configs.projectID;
    this.secret = configs.secret;
    this.env = configs.env;
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

Client.prototype.getInvitedUsers =
    function(cb) {
        return this._authenticatedRequest({
            path: 'users/invites',
        },'GET', cb);
    };

Client.prototype.deleteUserEmail =
    function(user_id, email_id, cb) {
        return this._authenticatedRequest({
            path: `users/${user_id}/${email_id}`,
        },'DELETE', cb);
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

Client.prototype.loginOrInvite =
    function(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/login_or_invite',
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


module.exports = Client;
