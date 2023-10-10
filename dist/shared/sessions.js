"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateJwtLocal = authenticateJwtLocal;
exports.authenticateM2MJwtLocal = authenticateM2MJwtLocal;
exports.authenticateSessionJwtLocal = authenticateSessionJwtLocal;
var jose = _interopRequireWildcard(require("jose"));
var _errors = require("./errors");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const sessionClaim = "https://stytch.com/session";

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
    custom_claims: customClaims
  };
}