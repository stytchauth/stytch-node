"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.B2BClient = void 0;
var jose = _interopRequireWildcard(require("jose"));
var _client = require("../shared/client");
var _discovery = require("./discovery");
var _fraud = require("../b2c/fraud");
var _impersonation = require("./impersonation");
var _sessions = require("../shared/sessions");
var _m2m = require("../b2c/m2m");
var _magic_links = require("./magic_links");
var _oauth = require("./oauth");
var _organizations = require("./organizations");
var _otp = require("./otp");
var _passwords = require("./passwords");
var _rbac_local = require("./rbac_local");
var _project = require("../b2c/project");
var _rbac = require("./rbac");
var _recovery_codes = require("./recovery_codes");
var _scim = require("./scim");
var _sessions2 = require("./sessions");
var _sso = require("./sso");
var _totps = require("./totps");
var _idp = require("./idp");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class B2BClient extends _client.BaseClient {
  constructor(config) {
    super(config);
    this.jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(new URL(`/v1/b2b/sessions/jwks/${config.project_id}`, this.fetchConfig.baseURL)),
      issuers: [`stytch.com/${config.project_id}`, (0, _sessions.trimTrailingSlash)(this.fetchConfig.baseURL)]
    };
    const policyCache = new _rbac_local.PolicyCache(new _rbac.RBAC(this.fetchConfig));
    this.discovery = new _discovery.Discovery(this.fetchConfig);
    this.fraud = new _fraud.Fraud(this.fetchConfig);
    this.impersonation = new _impersonation.Impersonation(this.fetchConfig);
    this.m2m = new _m2m.M2M(this.fetchConfig, this.jwtConfig);
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.oauth = new _oauth.OAuth(this.fetchConfig);
    this.otps = new _otp.OTPs(this.fetchConfig);
    this.organizations = new _organizations.Organizations(this.fetchConfig);
    this.passwords = new _passwords.Passwords(this.fetchConfig);
    this.project = new _project.Project(this.fetchConfig);
    this.rbac = new _rbac.RBAC(this.fetchConfig);
    this.recoveryCodes = new _recovery_codes.RecoveryCodes(this.fetchConfig);
    this.scim = new _scim.SCIM(this.fetchConfig);
    this.sso = new _sso.SSO(this.fetchConfig);
    this.sessions = new _sessions2.Sessions(this.fetchConfig, this.jwtConfig, policyCache);
    this.totps = new _totps.TOTPs(this.fetchConfig);
    this.idp = new _idp.IDP(this.fetchConfig, this.jwtConfig, policyCache);
  }
}
exports.B2BClient = B2BClient;