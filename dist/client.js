"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _package = require("../package.json");

var envs = _interopRequireWildcard(require("./envs"));

var _users = require("./users");

var _magic_links = require("./magic_links");

var _otps = require("./otps");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

class Client {
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.create instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.create instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.update instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.delete instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deleteEmail instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deletePhoneNumber instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.getPending instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.send instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.loginOrCreate instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.invite instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.revokeInvite instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.authenticate instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.sms.send instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.sms.loginOrCreate instead. */

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.authenticate instead. */
  constructor(config) {
    if (typeof config != "object") {
      throw new Error("Unexpected config type. Refer to https://github.com/stytchauth/stytch-node for how to use the Node client library.");
    }

    if (!config.project_id) {
      throw new Error('Missing "project_id" in config');
    }

    if (!config.secret) {
      throw new Error('Missing "secret" in config');
    }

    if (!config.env) {
      throw new Error('Missing "env" in config');
    }

    if (config.env != envs.test && config.env != envs.live) {// TODO: warn about non-production configuration
    }

    this.client = _axios.default.create({
      baseURL: config.env,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `Stytch Node v${_package.version}`
      },
      auth: {
        username: config.project_id,
        password: config.secret
      }
    });
    this.users = new _users.Users(this.client);
    this.magicLinks = new _magic_links.MagicLinks(this.client);
    this.otps = new _otps.OTPs(this.client); // TODO(v4): Remove these deprecated methods.

    this.createUser = this.users.create;
    this.getUser = this.users.get;
    this.updateUser = this.users.update;
    this.deleteUser = this.users.delete;
    this.deleteUserEmail = this.users.deleteEmail;
    this.deleteUserPhoneNumber = this.users.deletePhoneNumber;
    this.getPendingUsers = this.users.getPending;
    this.sendMagicLinkByEmail = this.magicLinks.email.send;
    this.loginOrCreate = this.magicLinks.email.loginOrCreate;
    this.inviteByEmail = this.magicLinks.email.invite;
    this.revokePendingInvite = this.magicLinks.email.revokeInvite;
    this.authenticateMagicLink = this.magicLinks.authenticate;
    this.sendOTPBySMS = this.otps.sms.send;
    this.loginOrCreateUserBySMS = this.otps.sms.loginOrCreate;
    this.authenticateOTP = this.otps.authenticate;
  }

}

exports.Client = Client;