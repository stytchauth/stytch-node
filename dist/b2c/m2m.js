"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.M2M = void 0;
require("../shared/method_options");
var _m2m_clients = require("./m2m_clients");
var _sessions = require("../shared/sessions");
var _errors = require("../shared/errors");
var _m2m_local = require("./m2m_local");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// MANUAL(M2MSearchQueryOperand)(TYPES)

// ENDMANUAL(M2MSearchQueryOperand)

// MANUAL(AuthenticateToken)(TYPES)

// ENDMANUAL(AuthenticateToken)

// MANUAL(Token)(TYPES)

// ENDMANUAL(Token)

class M2M {
  constructor(fetchConfig, jwtConfig) {
    this.fetchConfig = fetchConfig;
    this.clients = new _m2m_clients.Clients(this.fetchConfig);
    this.jwksClient = jwtConfig.jwks;
    this.jwtOptions = {
      audience: jwtConfig.projectID,
      issuer: `stytch.com/${jwtConfig.projectID}`,
      typ: "JWT"
    };
  }

  // MANUAL(token)(SERVICE_METHOD)
  /**
   * Retrieve an access token for the given M2M Client.
   * Access tokens are JWTs signed with the project's JWKS, and are valid for one hour after issuance.
   * M2M Access tokens contain a standard set of claims as well as any custom claims generated from templates.
   *
   * M2M Access tokens can be validated locally using the Authenticate Access Token method in the Stytch Backend SDKs,
   * or with any library that supports JWT signature validation.
   *
   * Here is an example of a standard set of claims from a M2M Access Token:
   *   ```
   *  {
   *    "sub": "m2m-client-test-d731954d-dab3-4a2b-bdee-07f3ad1be885",
   *    "iss": "stytch.com/project-test-3e71d0a1-1e3e-4ee2-9be0-d7c0900f02c2",
   *    "aud": ["project-test-3e71d0a1-1e3e-4ee2-9be0-d7c0900f02c2"],
   *    "scope": "read:users write:users",
   *    "iat": 4102473300,
   *    "nbf": 4102473300,
   *    "exp": 4102476900
   *  }
   *  ```
   * @param data {@link TokenRequest}
   * @async
   * @returns {@link TokenResponse}
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  async token(data) {
    const fetchConfig = {
      ...this.fetchConfig,
      headers: {
        ["User-Agent"]: this.fetchConfig.headers["User-Agent"],
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const params = {
      client_id: data.client_id,
      client_secret: data.client_secret,
      grant_type: "client_credentials"
    };
    if (data.scopes && data.scopes.length > 0) {
      params.scope = data.scopes?.join(" ");
    }
    return (0, _shared.request)(fetchConfig, {
      method: "POST",
      url: `/v1/public/${this.jwtOptions.audience}/oauth2/token`,
      dataRaw: new URLSearchParams(params)
    });
  }
  // ENDMANUAL(token)

  // MANUAL(authenticateToken)(SERVICE_METHOD)
  // ADDIMPORT: import { authenticateM2MJwtLocal, JwtConfig } from "../shared/sessions";
  // ADDIMPORT: import { request } from "../shared";
  // ADDIMPORT: import { performAuthorizationCheck, ScopeAuthorizationFunc } from "./m2m_local";
  // ADDIMPORT: import { ClientError } from "../shared/errors";
  /**
               * Authenticate an access token issued by Stytch from the Token endpoint.
               * M2M access tokens are JWTs signed with the project's JWKs, and can be validated locally using any Stytch client library.
               * You may pass in an optional set of scopes that the JWT must contain in order to enforce permissions.
               * You may also override the default scope authorization function to implement custom authorization logic.
               *
               * @param data {@link AuthenticateTokenRequest}
               * @param scopeAuthorizationFunc {@link ScopeAuthorizationFunc} - A function that checks if the token has the required scopes. 
                 The default function assumes scopes are either direct string matches or written in the form "action:resource". See the 
                 documentation for {@link performAuthorizationCheck} for more information.
               * @async
               * @returns {@link AuthenticateTokenResponse}
               * @throws {ClientError} when token can not be authenticated
               */
  async authenticateToken(data, scopeAuthorizationFunc = _m2m_local.performAuthorizationCheck) {
    const {
      sub,
      scope,
      custom_claims
    } = await (0, _sessions.authenticateM2MJwtLocal)(this.jwksClient, this.jwtOptions, data.access_token, {
      max_token_age_seconds: data.max_token_age_seconds,
      clock_tolerance_seconds: data.clock_tolerance_seconds
    });
    const scopes = scope.split(" ");
    if (data.required_scopes && data.required_scopes.length > 0) {
      const isAuthorized = scopeAuthorizationFunc({
        hasScopes: scopes,
        requiredScopes: data.required_scopes
      });
      if (!isAuthorized) {
        throw new _errors.ClientError("missing_scopes", "Missing at least one required scope", data.required_scopes);
      }
    }
    return {
      client_id: sub,
      scopes,
      custom_claims
    };
  }
  // ENDMANUAL(authenticateToken)
}
exports.M2M = M2M;