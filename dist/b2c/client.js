"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;
var jose = _interopRequireWildcard(require("jose"));
var _client = require("../shared/client");
var _connected_apps = require("./connected_apps");
var _consumer_rbac = require("./consumer_rbac");
var _crypto_wallets = require("./crypto_wallets");
var _fraud = require("./fraud");
var _impersonation = require("./impersonation");
var _sessions = require("../shared/sessions");
var _m2m = require("./m2m");
var _magic_links = require("./magic_links");
var _oauth = require("./oauth");
var _otps = require("./otps");
var _passwords = require("./passwords");
var _rbac_local = require("./rbac_local");
var _project = require("./project");
var _sessions2 = require("./sessions");
var _totps = require("./totps");
var _users = require("./users");
var _webauthn = require("./webauthn");
var _idp = require("./idp");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class Client extends _client.BaseClient {
  constructor(config) {
    super(config);
    this.jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(new URL(`/v1/sessions/jwks/${config.project_id}`, this.fetchConfig.baseURL)),
      issuers: [`stytch.com/${config.project_id}`, (0, _sessions.trimTrailingSlash)(this.fetchConfig.baseURL)]
    };
    const policyCache = new _rbac_local.PolicyCache(new _consumer_rbac.ConsumerRBAC(this.fetchConfig));
    this.connectedApp = new _connected_apps.ConnectedApp(this.fetchConfig);
    this.consumerRBAC = new _consumer_rbac.ConsumerRBAC(this.fetchConfig);
    this.cryptoWallets = new _crypto_wallets.CryptoWallets(this.fetchConfig);
    this.fraud = new _fraud.Fraud(this.fetchConfig);
    this.impersonation = new _impersonation.Impersonation(this.fetchConfig);
    this.m2m = new _m2m.M2M(this.fetchConfig, this.jwtConfig);
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.oauth = new _oauth.OAuth(this.fetchConfig);
    this.otps = new _otps.OTPs(this.fetchConfig);
    this.passwords = new _passwords.Passwords(this.fetchConfig);
    this.project = new _project.Project(this.fetchConfig);
    this.sessions = new _sessions2.Sessions(this.fetchConfig, this.jwtConfig, policyCache);
    this.totps = new _totps.TOTPs(this.fetchConfig);
    this.users = new _users.Users(this.fetchConfig);
    this.webauthn = new _webauthn.WebAuthn(this.fetchConfig);
    this.idp = new _idp.IDP(this.fetchConfig, this.jwtConfig, policyCache);
  }
}
exports.Client = Client;