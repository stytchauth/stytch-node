"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _isomorphicBase = require("isomorphic-base64");

var jose = _interopRequireWildcard(require("jose"));

var _package = require("../package.json");

var _crypto_wallets = require("./crypto_wallets");

var envs = _interopRequireWildcard(require("./envs"));

var _magic_links = require("./magic_links");

var _oauth = require("./oauth");

var _otps = require("./otps");

var _passwords = require("./passwords");

var _sessions = require("./sessions");

var _totps = require("./totps");

var _users = require("./users");

var _webauthn = require("./webauthn");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": `Stytch Node v${_package.version}`,
      Authorization: "Basic " + (0, _isomorphicBase.btoa)(config.project_id + ":" + config.secret)
    };
    this.fetchConfig = {
      baseURL: config.env,
      headers,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      agent: config.agent
    }; // Get a baseURL that ends with a slash to make building route URLs easier.

    let baseURL = config.env;

    if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }

    const jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(new URL(`sessions/jwks/${config.project_id}`, baseURL))
    };
    this.users = new _users.Users(this.fetchConfig);
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.oauth = new _oauth.OAuth(this.fetchConfig);
    this.otps = new _otps.OTPs(this.fetchConfig);
    this.passwords = new _passwords.Passwords(this.fetchConfig);
    this.sessions = new _sessions.Sessions(this.fetchConfig, jwtConfig);
    this.totps = new _totps.TOTPs(this.fetchConfig);
    this.webauthn = new _webauthn.WebAuthn(this.fetchConfig);
    this.cryptoWallets = new _crypto_wallets.CryptoWallets(this.fetchConfig);
  }

}

exports.Client = Client;