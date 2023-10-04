"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;
var jose = _interopRequireWildcard(require("jose"));
var _client = require("../shared/client");
var _crypto_wallets = require("./crypto_wallets");
var _m2m = require("./m2m");
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
class Client extends _client.BaseClient {
  constructor(config) {
    super(config);
    this.jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(new URL(`/v1/sessions/jwks/${config.project_id}`, this.fetchConfig.baseURL))
    };
    this.cryptoWallets = new _crypto_wallets.CryptoWallets(this.fetchConfig);
    this.m2m = new _m2m.M2M(this.fetchConfig, this.jwtConfig);
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.oauth = new _oauth.OAuth(this.fetchConfig);
    this.otps = new _otps.OTPs(this.fetchConfig);
    this.passwords = new _passwords.Passwords(this.fetchConfig);
    this.sessions = new _sessions.Sessions(this.fetchConfig, this.jwtConfig);
    this.totps = new _totps.TOTPs(this.fetchConfig);
    this.users = new _users.Users(this.fetchConfig);
    this.webauthn = new _webauthn.WebAuthn(this.fetchConfig);
  }
}
exports.Client = Client;