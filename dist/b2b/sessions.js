"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sessions = void 0;
var _shared = require("../shared");
var _sessions = require("../shared/sessions");
var _rbac_local = require("./rbac_local");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `sessions.authenticate`.

// Response type for `sessions.authenticate`.

// Request type for `sessions.exchange`.

// Response type for `sessions.exchange`.

// Request type for `sessions.getJWKS`.

// Response type for `sessions.getJWKS`.

// Request type for `sessions.get`.

// Response type for `sessions.get`.

// Request type for `sessions.revoke`.

// Response type for `sessions.revoke`.

// MANUAL(authenticateJwt)(TYPES)

// Request type for `sessions.authenticateJwt`

// Request type for `sessions.authenticateJwtLocal`

// ENDMANUAL(authenticateJwt)

class Sessions {
  constructor(fetchConfig, jwtConfig, policyCache) {
    this.fetchConfig = fetchConfig;
    this.jwksClient = jwtConfig.jwks;
    this.jwtOptions = {
      audience: jwtConfig.projectID,
      issuer: `stytch.com/${jwtConfig.projectID}`,
      typ: "JWT"
    };
    this.policyCache = policyCache;
  }

  /**
   * Retrieves all active Sessions for a Member.
   * @param params {@link B2BSessionsGetRequest}
   * @returns {@link B2BSessionsGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  get(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/sessions`,
      headers,
      params: {
        ...params
      }
    });
  }

  /**
   * Authenticates a Session and updates its lifetime by the specified `session_duration_minutes`. If the
   * `session_duration_minutes` is not specified, a Session will not be extended. This endpoint requires
   * either a `session_jwt` or `session_token` be included in the request. It will return an error if both
   * are present.
   *
   * You may provide a JWT that needs to be refreshed and is expired according to its `exp` claim. A new JWT
   * will be returned if both the signature and the underlying Session are still valid.
   * @param data {@link B2BSessionsAuthenticateRequest}
   * @returns {@link B2BSessionsAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/sessions/authenticate`,
      headers,
      data
    });
  }

  /**
   * Revoke a Session and immediately invalidate all its tokens. To revoke a specific Session, pass either
   * the `member_session_id`, `session_token`, or `session_jwt`. To revoke all Sessions for a Member, pass
   * the `member_id`.
   * @param data {@link B2BSessionsRevokeRequest}
   * @returns {@link B2BSessionsRevokeResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  revoke(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/sessions/revoke`,
      headers,
      data
    });
  }

  /**
   * Use this endpoint to exchange a Member's existing session for another session in a different
   * Organization. This can be used to accept an invite, but not to create a new member via domain matching.
   *
   * To create a new member via domain matching, use the
   * [Exchange Intermediate Session](https://stytch.com/docs/b2b/api/exchange-intermediate-session) flow
   * instead.
   *
   * Only Email Magic Link, OAuth, and SMS OTP factors can be transferred between sessions. Other
   * authentication factors, such as password factors, will not be transferred to the new session.
   * SMS OTP factors can be used to fulfill MFA requirements for the target Organization if both the original
   * and target Member have the same phone number and the phone number is verified for both Members.
   *
   * If the Member is required to complete MFA to log in to the Organization, the returned value of
   * `member_authenticated` will be `false`, and an `intermediate_session_token` will be returned.
   * The `intermediate_session_token` can be passed into the
   * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
   * MFA step and acquire a full member session.
   * The `intermediate_session_token` can also be used with the
   * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
   * or the
   * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to join a different Organization or create a new one.
   * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
   * @param data {@link B2BSessionsExchangeRequest}
   * @returns {@link B2BSessionsExchangeResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  exchange(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/sessions/exchange`,
      headers,
      data
    });
  }

  /**
   * Get the JSON Web Key Set (JWKS) for a project.
   *
   * JWKS are rotated every ~6 months. Upon rotation, new JWTs will be signed using the new key set, and both
   * key sets will be returned by this endpoint for a period of 1 month.
   *
   * JWTs have a set lifetime of 5 minutes, so there will be a 5 minute period where some JWTs will be signed
   * by the old JWKS, and some JWTs will be signed by the new JWKS. The correct JWKS to use for validation is
   * determined by matching the `kid` value of the JWT and JWKS.
   *
   * If you're using one of our [backend SDKs](https://stytch.com/docs/b2b/sdks), the JWKS roll will be
   * handled for you.
   *
   * If you're using your own JWT validation library, many have built-in support for JWKS rotation, and
   * you'll just need to supply this API endpoint. If not, your application should decide which JWKS to use
   * for validation by inspecting the `kid` value.
   * @param params {@link B2BSessionsGetJWKSRequest}
   * @returns {@link B2BSessionsGetJWKSResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  getJWKS(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/sessions/jwks/${params.project_id}`,
      headers,
      params: {}
    });
  }

  // MANUAL(authenticateJwt)(SERVICE_METHOD)
  // ADDIMPORT: import { JwtConfig, authenticateSessionJwtLocal } from "../shared/sessions";
  // ADDIMPORT: import { performAuthorizationCheck } from "./rbac_local";
  /** Parse a JWT and verify the signature, preferring local verification over remote.
   *
   * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
   * (based on the "iat" claim) more than that many seconds ago.
   *
   * To force remote validation for all tokens, set max_token_age_seconds to zero or use the
   * authenticate method instead.
   */
  async authenticateJwt(params) {
    try {
      const member_session = await this.authenticateJwtLocal(params);
      return {
        member_session,
        session_jwt: params.session_jwt
      };
    } catch (err) {
      // JWT could not be verified locally. Check with the Stytch API.
      return this.authenticate({
        session_jwt: params.session_jwt,
        authorization_check: params.authorization_check
      });
    }
  }

  /** Parse a JWT and verify the signature locally (without calling /authenticate in the API).
   *
   * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
   * claim) more than maxTokenAge seconds ago.
   *
   * If max_token_age_seconds is explicitly set to zero, all tokens will be considered too old,
   * even if they are otherwise valid.
   *
   * The value for current_date is used to compare timestamp claims ("exp", "nbf", "iat"). It
   * defaults to the current date (new Date()).
   *
   * The value for clock_tolerance_seconds is the maximum allowable difference when comparing
   * timestamps. It defaults to zero.
   */
  async authenticateJwtLocal(params) {
    const sess = await (0, _sessions.authenticateSessionJwtLocal)(this.jwksClient, this.jwtOptions, params.session_jwt, {
      clock_tolerance_seconds: params.clock_tolerance_seconds,
      max_token_age_seconds: params.max_token_age_seconds,
      current_date: params.current_date
    });
    const organizationClaim = "https://stytch.com/organization";
    const rolesClaim = "https://stytch.com/roles";
    const {
      [organizationClaim]: orgClaimUntyped,
      [rolesClaim]: rolesClaimUntyped,
      ...claims
    } = sess.custom_claims;
    const orgClaim = orgClaimUntyped;
    const roleClaim = rolesClaimUntyped;
    if (params.authorization_check) {
      const policy = await this.policyCache.getPolicy();
      await (0, _rbac_local.performAuthorizationCheck)({
        policy,
        subjectRoles: roleClaim,
        subjectOrgID: orgClaim.organization_id,
        authorizationCheck: params.authorization_check
      });
    }
    return {
      member_session_id: sess.session_id,
      member_id: sess.sub,
      organization_id: orgClaim.organization_id,
      authentication_factors: sess.authentication_factors,
      started_at: sess.started_at,
      last_accessed_at: sess.last_accessed_at,
      expires_at: sess.expires_at,
      custom_claims: claims
    };
  }

  // ENDMANUAL(authenticateJwt)
}
exports.Sessions = Sessions;