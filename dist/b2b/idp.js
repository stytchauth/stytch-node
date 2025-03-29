"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDP = void 0;
var jose = _interopRequireWildcard(require("jose"));
var _shared = require("../shared");
var _rbac_local = require("./rbac_local");
var _errors = require("../shared/errors");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class IDP {
  constructor(fetchConfig, jwtConfig, policyCache) {
    this.fetchConfig = fetchConfig;
    this.jwtConfig = jwtConfig;
    this.jwksClient = jwtConfig.jwks;
    this.policyCache = policyCache;
  }
  async introspectTokenNetwork(data, options) {
    const fetchConfig = {
      ...this.fetchConfig,
      headers: {
        ["User-Agent"]: this.fetchConfig.headers["User-Agent"],
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const params = {
      token: data.token,
      client_id: data.client_id
    };
    if (data.client_secret && data.client_secret.length > 0) {
      params.client_secret = data.client_secret;
    }
    if (data.token_type_hint && data.token_type_hint.length > 0) {
      params.token_type_hint = data.token_type_hint;
    }
    let response;
    try {
      response = await (0, _shared.request)(fetchConfig, {
        method: "POST",
        url: `/v1/public/${this.jwtConfig.projectID}/oauth2/introspect`,
        dataRaw: new URLSearchParams(params)
      });
    } catch (err) {
      throw new _errors.ClientError("token_invalid", "Could not introspect token", err);
    }
    if (!response.active) {
      throw new _errors.ClientError("token_invalid", "Token was not active", null);
    }
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      aud: _aud,
      exp: _exp,
      iat: _iat,
      iss: _iss,
      nbf: _nbf,
      sub: _sub,
      status_code: _status_code,
      scope: _scope,
      active: _active,
      request_id: _request_id,
      token_type: _token_type,
      client_id: _client_id,
      "https://stytch.com/organization": _organization_claim,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...customClaims
    } = response;
    if (options?.authorization_check) {
      const policy = await this.policyCache.getPolicy();
      const organization_id = _organization_claim["organization_id"];
      (0, _rbac_local.performScopeAuthorizationCheck)({
        policy,
        subjectOrgID: organization_id,
        tokenScopes: _scope.trim().split(" "),
        authorizationCheck: options.authorization_check
      });
    }
    const organization = {
      organization_id: _organization_claim.organization_id,
      slug: _organization_claim.slug
    };
    return {
      subject: _sub,
      scope: _scope,
      audience: _aud,
      expires_at: _exp,
      issued_at: _iat,
      issuer: _iss,
      not_before: _nbf,
      token_type: _token_type,
      organization,
      custom_claims: customClaims
    };
  }
  async introspectTokenLocal(tokenJWT, options) {
    const jwtOptions = {
      audience: this.jwtConfig.projectID,
      issuer: `stytch.com/${this.jwtConfig.projectID}`,
      typ: "JWT"
    };
    const now = options?.current_date || new Date();
    let payload;
    try {
      const token = await jose.jwtVerify(tokenJWT, this.jwksClient, {
        ...jwtOptions,
        clockTolerance: options?.clock_tolerance_seconds,
        currentDate: now
      });
      payload = token.payload;
    } catch (err) {
      throw new _errors.ClientError("jwt_invalid", "Could not verify JWT", err);
    }

    // The custom claim set is all the claims in the payload except for the standard claims and
    // the scope and token_type claims. The cleanest way to collect those seems to be naming what we want
    // to omit and using ...rest for to collect the custom claims.
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      aud: _aud,
      exp: _exp,
      iat: _iat,
      iss: _iss,
      jti: _jti,
      nbf: _nbf,
      sub: _sub,
      scope: _scope,
      "https://stytch.com/organization": _organization_claim,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...custom_claims
    } = payload;
    if (options?.authorization_check) {
      const policy = await this.policyCache.getPolicy();
      (0, _rbac_local.performScopeAuthorizationCheck)({
        policy,
        subjectOrgID: _organization_claim["organization_id"],
        tokenScopes: _scope.trim().split(" "),
        authorizationCheck: options.authorization_check
      });
    }
    const organization = {
      organization_id: _organization_claim.organization_id,
      slug: _organization_claim.slug
    };
    return {
      subject: _sub,
      expires_at: _exp,
      audience: _aud,
      issued_at: _iat,
      issuer: _iss,
      not_before: _nbf,
      scope: _scope,
      token_type: "access_token",
      organization,
      custom_claims
    };
  }
}
exports.IDP = IDP;