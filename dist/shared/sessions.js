"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateJwtLocal = authenticateJwtLocal;
exports.authenticateM2MJwtLocal = authenticateM2MJwtLocal;
exports.authenticateSessionJwtLocal = authenticateSessionJwtLocal;
exports.trimTrailingSlash = trimTrailingSlash;
var jose = _interopRequireWildcard(require("jose"));
var _errors = require("./errors");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const sessionClaim = "https://stytch.com/session";
// We expect issuers with no trailing slash at the end but store the base URL with one.
// We use this function to normalize this difference.
function trimTrailingSlash(baseURL) {
  while (baseURL.endsWith("/")) {
    baseURL = baseURL.slice(0, -1);
  }
  return baseURL;
}

// An IntermediateSession can be either a MemberSession or a UserSession

async function authenticateJwtLocal(jwksClient, jwtOptions, jwt, options) {
  const now = options?.current_date || new Date();
  let payload;
  try {
    const token = await jose.jwtVerify(jwt, jwksClient, {
      ...jwtOptions,
      clockTolerance: options?.clock_tolerance_seconds,
      currentDate: now
      // Don't pass maxTokenAge directly to jwtVerify because it interprets zero as "infinity".
      // We want zero to mean "every token is stale" and force remote verification.
    });

    payload = token.payload;
  } catch (err) {
    throw new _errors.ClientError("jwt_invalid", "Could not verify JWT", err);
  }
  const maxTokenAge = options?.max_token_age_seconds;
  if (maxTokenAge != null) {
    const iat = payload.iat;
    if (!iat) {
      throw new _errors.ClientError("jwt_invalid", "JWT was missing iat claim");
    }
    const nowEpoch = +now / 1000; // Epoch seconds from milliseconds
    if (nowEpoch - iat >= maxTokenAge) {
      throw new _errors.ClientError("jwt_too_old", `JWT was issued at ${iat}, more than ${maxTokenAge} seconds ago`);
    }
  }

  // The custom claim set is all the claims in the payload except for the standard claims and
  // the Stytch session claim. The cleanest way to collect those seems to be naming what we want
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
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...customClaims
  } = payload;
  return {
    payload,
    customClaims
  };
}
async function authenticateM2MJwtLocal(jwksClient, jwtOptions, jwt, options) {
  const {
    payload,
    customClaims: untypedClaims
  } = await authenticateJwtLocal(jwksClient, jwtOptions, jwt, options);
  const {
    scope: scopeClaim,
    ...customClaims
  } = untypedClaims;
  const scope = scopeClaim;
  return {
    sub: payload.sub ?? "",
    scope: scope,
    custom_claims: customClaims
  };
}
async function authenticateSessionJwtLocal(jwksClient, jwtOptions, jwt, options) {
  const {
    payload,
    customClaims: untypedClaims
  } = await authenticateJwtLocal(jwksClient, jwtOptions, jwt, options);

  // The custom claim set is all the claims in the payload except for the standard claims and
  // the Stytch session claim. The cleanest way to collect those seems to be naming what we want
  // to omit and using ...rest for to collect the custom claims.
  const {
    [sessionClaim]: stytchClaim,
    ...customClaims
  } = untypedClaims;
  const claim = stytchClaim;
  return {
    session_id: claim.id,
    attributes: claim.attributes,
    authentication_factors: claim.authentication_factors,
    sub: payload.sub || "",
    // The JWT expiration time is the same as the session's.
    // The exp claim is a Unix timestamp in seconds, so convert it to milliseconds first. The
    // other timestamps are RFC3339-formatted strings.
    started_at: claim.started_at,
    last_accessed_at: claim.last_accessed_at,
    // For JWTs that include it, prefer the inner expires_at claim.
    expires_at: new Date(claim.expires_at || (payload.exp || 0) * 1000).toISOString(),
    custom_claims: customClaims,
    roles: claim.roles
  };
}