"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sessions = void 0;

var _shared = require("../shared");

var _sessions = require("../shared/sessions");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
// ENDMANUAL(authenticateJwt)
class Sessions {
  constructor(fetchConfig, jwtConfig) {
    this.fetchConfig = fetchConfig;
    this.jwksClient = jwtConfig.jwks;
    this.jwtOptions = {
      audience: jwtConfig.projectID,
      issuer: `stytch.com/${jwtConfig.projectID}`,
      typ: "JWT"
    };
  }
  /**
   * List all active Sessions for a given `user_id`. All timestamps are formatted according to the RFC 3339
   * standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
   * @param data {@link SessionsGetRequest}
   * @returns {@link SessionsGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  get(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/sessions`,
      params: { ...params
      }
    });
  }
  /**
   * Authenticate a session token and retrieve associated session data. If `session_duration_minutes` is
   * included, update the lifetime of the session to be that many minutes from now. All timestamps are
   * formatted according to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. This
   * endpoint requires exactly one `session_jwt` or `session_token` as part of the request. If both are
   * included you will receive a `too_many_session_arguments` error.
   * @param data {@link SessionsAuthenticateRequest}
   * @returns {@link SessionsAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/sessions/authenticate`,
      data
    });
  }
  /**
   * Revoke a Session, immediately invalidating all of its session tokens. You can revoke a session in three
   * ways: using its ID, or using one of its session tokens, or one of its JWTs. This endpoint requires
   * exactly one of those to be included in the request. It will return an error if multiple are present.
   * @param data {@link SessionsRevokeRequest}
   * @returns {@link SessionsRevokeResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  revoke(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/sessions/revoke`,
      data
    });
  }
  /**
   * Get the JSON Web Key Set (JWKS) for a Stytch Project.
   * @param data {@link SessionsGetJWKSRequest}
   * @returns {@link SessionsGetJWKSResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  getJWKS(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/sessions/jwks/${params.project_id}`,
      params: {}
    });
  } // MANUAL(authenticateJwt)(SERVICE_METHOD)
  // ADDIMPORT: import * as jose from "jose";
  // ADDIMPORT: import { JwtConfig, authenticateSessionJwtLocal } from "../shared/sessions";

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
      const session = await this.authenticateJwtLocal(params);
      return {
        session,
        session_jwt: params.session_jwt
      };
    } catch (err) {
      // JWT could not be verified locally. Check with the Stytch API.
      return this.authenticate({
        session_jwt: params.session_jwt
      });
    }
  }
  /** Parse a JWT and verify the signature locally (without calling /authenticate in the API).
   *
   * If max_token_age_seconds is set, this will return an error if the JWT was issued (based on the "iat"
   * claim) more than max_token_age_seconds seconds ago.
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
    return {
      session_id: sess.session_id,
      attributes: sess.attributes,
      authentication_factors: sess.authentication_factors,
      user_id: sess.sub,
      started_at: sess.started_at,
      last_accessed_at: sess.last_accessed_at,
      expires_at: sess.expires_at,
      custom_claims: sess.custom_claims
    };
  } // ENDMANUAL(authenticateJwt)


}

exports.Sessions = Sessions;