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

var _sessions = require("./sessions");

var _experiments = require("./experiments");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

class Client {
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
    this.experiments = { ..._experiments.defaults,
      ...config.experiments
    };
    this.users = new _users.Users(this.client);
    this.magicLinks = new _magic_links.MagicLinks(this.client);
    this.otps = new _otps.OTPs(this.client);
    this.sessions = new _sessions.Sessions(this.client, this.experiments);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.create instead. */


  createUser(request) {
    return this.users.create(request);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.get instead. */


  getUser(userID) {
    return this.users.get(userID);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.update instead. */


  updateUser(userID, request) {
    return this.users.update(userID, request);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.delete instead. */


  deleteUser(userID) {
    return this.users.delete(userID);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deleteEmail instead. */


  deleteUserEmail(emailID) {
    return this.users.deleteEmail(emailID);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deletePhoneNumber instead. */


  deleteUserPhoneNumber(phoneID) {
    return this.users.deletePhoneNumber(phoneID);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.getPending instead. */


  getPendingUsers(request) {
    return this.users.getPending(request);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.send instead. */


  sendMagicLinkByEmail(data) {
    return this.magicLinks.email.send(data);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.loginOrCreate instead. */


  loginOrCreate(data) {
    return this.magicLinks.email.loginOrCreate(data);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.invite instead. */


  inviteByEmail(data) {
    return this.magicLinks.email.invite(data);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.revokeInvite instead. */


  revokePendingInvite(data) {
    return this.magicLinks.email.revokeInvite(data);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.authenticate instead. */


  authenticateMagicLink(token, data) {
    return this.magicLinks.authenticate(token, data);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.sms.send instead. */


  sendOTPBySMS(data) {
    return this.otps.sms.send(data);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.sms.loginOrCreate instead. */


  loginOrCreateUserBySMS(data) {
    return this.otps.sms.loginOrCreate(data);
  }
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.authenticate instead. */


  authenticateOTP(data) {
    return this.otps.authenticate(data);
  }

}

exports.Client = Client;