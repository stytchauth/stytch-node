// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import * as jose from "jose";
import {} from "../shared/method_options";
import { Clients } from "./m2m_clients";
import { fetchConfig } from "../shared";

import { authenticateM2MJwtLocal, JwtConfig } from "../shared/sessions";
import { ClientError } from "../shared/errors";
import { performAuthorizationCheck, ScopeAuthorizationFunc } from "./m2m_local";
import { request } from "../shared";

export interface M2MClient {
  // The ID of the client.
  client_id: string;
  // A human-readable name for the client.
  client_name: string;
  // A human-readable description for the client.
  client_description: string;
  // The status of the client - either `active` or `inactive`.
  status: string;
  // An array of scopes assigned to the client.
  scopes: string[];
  // The last four characters of the client secret.
  client_secret_last_four: string;
  // An arbitrary JSON object for storing application-specific data.
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  // The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists.
  next_client_secret_last_four?: string;
}

export interface M2MClientWithClientSecret {
  // The ID of the client.
  client_id: string;
  /**
   * The secret of the client. **Important:** this is the only time you will be able to view the
   * `client_secret`. Be sure to persist the `client_secret` in a secure location. If the `client_secret` is
   * lost, you will need to trigger a secret rotation flow to receive another one.
   */
  client_secret: string;
  // A human-readable name for the client.
  client_name: string;
  // A human-readable description for the client.
  client_description: string;
  // The status of the client - either `active` or `inactive`.
  status: string;
  // An array of scopes assigned to the client.
  scopes: string[];
  // The last four characters of the client secret.
  client_secret_last_four: string;
  // An arbitrary JSON object for storing application-specific data.
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  // The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists.
  next_client_secret_last_four?: string;
}

export interface M2MClientWithNextClientSecret {
  // The ID of the client.
  client_id: string;
  /**
   * The newly created secret that's next in rotation for the client. **Important:** this is the only time
   * you will be able to view the `next_client_secret`. Be sure to persist the `next_client_secret` in a
   * secure location. If the `next_client_secret` is lost, you will need to trigger a secret rotation flow to
   * receive another one.
   */
  next_client_secret: string;
  // A human-readable name for the client.
  client_name: string;
  // A human-readable description for the client.
  client_description: string;
  // The status of the client - either `active` or `inactive`.
  status: string;
  // An array of scopes assigned to the client.
  scopes: string[];
  // The last four characters of the client secret.
  client_secret_last_four: string;
  // An arbitrary JSON object for storing application-specific data.
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  // The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists.
  next_client_secret_last_four?: string;
}

export interface M2MResultsMetadata {
  // The total number of results returned by your search query.
  total: number;
  /**
   * The `next_cursor` string is returned when your search result contains more than one page of results.
   * This value is passed into your next search call in the `cursor` field.
   */
  next_cursor?: string;
}

export interface M2MSearchQuery {
  /**
   * The action to perform on the operands. The accepted value are:
   *
   *   `AND` – all the operand values provided must match.
   *
   *   `OR` – the operator will return any matches to at least one of the operand values you supply.
   */
  operator: "OR" | "AND" | string;
  /**
   * An array of operand objects that contains all of the filters and values to apply to your search search
   * query.
   */
  operands: M2MSearchQueryOperand[];
}

// MANUAL(M2MSearchQueryOperand)(TYPES)
export type M2MSearchQueryOperand =
  | {
      filter_name: "client_id";
      filter_value: string[];
    }
  | {
      filter_name: "client_name";
      filter_value: string[];
    }
  | {
      filter_name: "scopes";
      filter_value: string[];
    };
// ENDMANUAL(M2MSearchQueryOperand)

// MANUAL(AuthenticateToken)(TYPES)
export interface AuthenticateTokenRequest {
  access_token: string;
  required_scopes?: string[];
  max_token_age_seconds?: number;
  clock_tolerance_seconds?: number;
}

export interface AuthenticateTokenResponse {
  client_id: string;
  scopes: string[];
  custom_claims: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// ENDMANUAL(AuthenticateToken)

// MANUAL(Token)(TYPES)
export interface TokenRequest {
  // The ID of the client.
  client_id: string;
  // The secret of the client.
  client_secret: string;
  // An array scopes requested. If omitted, all scopes assigned to the client will be returned.
  scopes?: string[];
}

export interface TokenResponse {
  // The access token granted to the client. Access tokens are JWTs signed with the project's JWKs.
  access_token: string;
  // The type of the returned access token. Today, this value will always be equal to "bearer"
  token_type: string;
  // The lifetime in seconds of the access token.
  // For example, the value 3600 denotes that the access token will expire in one hour from the time the response was generated.
  expires_in: number;
}

// ENDMANUAL(Token)

export class M2M {
  private fetchConfig: fetchConfig;
  private jwksClient: jose.JWTVerifyGetKey;
  private jwtOptions: jose.JWTVerifyOptions;
  clients: Clients;

  constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig) {
    this.fetchConfig = fetchConfig;
    this.clients = new Clients(this.fetchConfig);

    this.jwksClient = jwtConfig.jwks;
    this.jwtOptions = {
      audience: jwtConfig.projectID,
      issuer: `stytch.com/${jwtConfig.projectID}`,
      typ: "JWT",
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
  async token(data: TokenRequest): Promise<TokenResponse> {
    const fetchConfig: fetchConfig = {
      ...this.fetchConfig,
      headers: {
        ["User-Agent"]: this.fetchConfig.headers["User-Agent"],
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const params: Record<string, string> = {
      client_id: data.client_id,
      client_secret: data.client_secret,
      grant_type: "client_credentials",
    };
    if (data.scopes && data.scopes.length > 0) {
      params.scope = data.scopes?.join(" ");
    }

    return request<TokenResponse>(fetchConfig, {
      method: "POST",
      url: `/v1/public/${this.jwtOptions.audience}/oauth2/token`,
      dataRaw: new URLSearchParams(params),
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
  async authenticateToken(
    data: AuthenticateTokenRequest,
    scopeAuthorizationFunc: ScopeAuthorizationFunc = performAuthorizationCheck
  ): Promise<AuthenticateTokenResponse> {
    const { sub, scope, custom_claims } = await authenticateM2MJwtLocal(
      this.jwksClient,
      this.jwtOptions,
      data.access_token,
      {
        max_token_age_seconds: data.max_token_age_seconds,
        clock_tolerance_seconds: data.clock_tolerance_seconds,
      }
    );
    const scopes = scope.split(" ");

    if (data.required_scopes && data.required_scopes.length > 0) {
      const isAuthorized = scopeAuthorizationFunc({
        hasScopes: scopes,
        requiredScopes: data.required_scopes,
      });
      if (!isAuthorized) {
        throw new ClientError(
          "missing_scopes",
          "Missing at least one required scope",
          data.required_scopes
        );
      }
    }

    return {
      client_id: sub,
      scopes,
      custom_claims,
    };
  }
  // ENDMANUAL(authenticateToken)
}
