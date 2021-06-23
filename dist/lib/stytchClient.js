"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./envs");
const stytchRequest_1 = require("./stytchRequest");
class Client {
}
class Client {
    constructor(config) {
        if (typeof config != 'object') {
            throw new Error('Unexpected config type. ' +
                'Refer to https://github.com/stytchauth/stytch-node ' +
                'for how to use the Node client library.');
        }
        if (!Object.prototype.hasOwnProperty.call(config, 'project_id')) {
            throw new Error('Missing "project_id" in config');
        }
        if (!Object.prototype.hasOwnProperty.call(config, 'secret')) {
            throw new Error('Missing "secret" in config');
        }
        if (!Object.prototype.hasOwnProperty.call(config, 'env')) {
            throw new Error('Missing "env" in config');
        }
        if (config['env'] != envs_1.default.live && config['env'] != envs_1.default.test) {
            throw new Error('Invalid env supplied, should be test or live');
        }
        if (arguments.length > 1 || Object.keys(config).length > 3) {
            throw new Error('Too many arguments provided for the Stytch config');
        }
        this.project_id = config.project_id;
        this.secret = config.secret;
        this.env = config.env;
    }
    _authenticatedRequest(request, method, cb) {
        return stytchRequest_1.default({
            project_id: this.project_id,
            secret: this.secret,
        }, this.env, request, method, cb);
    }
    createUser(request, cb) {
        return this._authenticatedRequest({
            path: 'users',
            body: request,
        }, 'POST', cb);
    }
    getUser(user_id, cb) {
        return this._authenticatedRequest({
            path: `users/${user_id}`,
        }, 'GET', cb);
    }
    updateUser(user_id, request, cb) {
        return this._authenticatedRequest({
            path: `users/${user_id}`,
            body: request,
        }, 'PUT', cb);
    }
    deleteUser(user_id, cb) {
        return this._authenticatedRequest({
            path: `users/${user_id}`,
        }, 'DELETE', cb);
    }
    getPendingUsers(request, cb) {
        var request = request || {};
        return this._authenticatedRequest({
            path: 'users/pending',
            params: {
                starting_after_id: request['starting_after_id'] || null,
                limit: request['limit'] || null,
            },
        }, 'GET', cb);
    }
    deleteUserEmail(email_id, cb) {
        return this._authenticatedRequest({
            path: `users/emails/${email_id}`,
        }, 'DELETE', cb);
    }
    deleteUserPhoneNumber(phone_id, cb) {
        return this._authenticatedRequest({
            path: `users/phone_numbers/${phone_id}`,
        }, 'DELETE', cb);
    }
    // MAGIC LINKS
    sendMagicLinkByEmail(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/send_by_email',
            body: request,
        }, 'POST', cb);
    }
    loginOrCreate(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/login_or_create',
            body: request,
        }, 'POST', cb);
    }
    inviteByEmail(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/invite_by_email',
            body: request,
        }, 'POST', cb);
    }
    authenticateMagicLink(token, request, cb) {
        return this._authenticatedRequest({
            path: `magic_links/${token}/authenticate`,
            body: request,
        }, 'POST', cb);
    }
    revokePendingInvite(request, cb) {
        return this._authenticatedRequest({
            path: 'magic_links/revoke_invite',
            body: request,
        }, 'POST', cb);
    }
    // OTP
    sendOTPBySMS(request, cb) {
        return this._authenticatedRequest({
            path: 'otp/send_by_sms',
            body: request,
        }, 'POST', cb);
    }
    loginOrCreateUserBySMS(request, cb) {
        return this._authenticatedRequest({
            path: 'otp/login_or_create',
            body: request,
        }, 'POST', cb);
    }
    authenticateOTP(request, cb) {
        return this._authenticatedRequest({
            path: 'otp/authenticate',
            body: request,
        }, 'POST', cb);
    }
}
module.exports = Client;
