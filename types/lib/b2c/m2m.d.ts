import { Clients } from "./m2m_clients";
import { fetchConfig } from "../shared";
import { JwtConfig } from "../shared/sessions";
export interface M2MClient {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    scopes: string[];
    client_secret_last_four: string;
    trusted_metadata?: Record<string, any>;
    next_client_secret_last_four?: string;
}
export interface M2MClientWithClientSecret {
    client_id: string;
    /**
     * The secret of the client. **Important:** this is the only time you will be able to view the
     * `client_secret`. Be sure to persist the `client_secret` in a secure location. If the `client_secret` is
     * lost, you will need to trigger a secret rotation flow to receive another one.
     */
    client_secret: string;
    client_name: string;
    client_description: string;
    status: string;
    scopes: string[];
    client_secret_last_four: string;
    trusted_metadata?: Record<string, any>;
    next_client_secret_last_four?: string;
}
export interface M2MClientWithNextClientSecret {
    client_id: string;
    /**
     * The newly created secret that's next in rotation for the client. **Important:** this is the only time
     * you will be able to view the `next_client_secret`. Be sure to persist the `next_client_secret` in a
     * secure location. If the `next_client_secret` is lost, you will need to trigger a secret rotation flow to
     * receive another one.
     */
    next_client_secret: string;
    client_name: string;
    client_description: string;
    status: string;
    scopes: string[];
    client_secret_last_four: string;
    trusted_metadata?: Record<string, any>;
    next_client_secret_last_four?: string;
}
export interface M2MResultsMetadata {
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
export declare type M2MSearchQueryOperand = {
    filter_name: "client_id";
    filter_value: string[];
} | {
    filter_name: "client_name";
    filter_value: string[];
} | {
    filter_name: "scopes";
    filter_value: string[];
};
export interface AuthenticateTokenRequest {
    access_token: string;
    required_scopes?: string[];
    max_token_age_seconds?: number;
}
export interface AuthenticateTokenResponse {
    client_id: string;
    scopes: string[];
    custom_claims: Record<string, any>;
}
export interface TokenRequest {
    client_id: string;
    client_secret: string;
    scopes?: string[];
}
export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}
export declare class M2M {
    private fetchConfig;
    private jwksClient;
    private jwtOptions;
    clients: Clients;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig);
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
    token(data: TokenRequest): Promise<TokenResponse>;
    /**
     * Authenticate an access token issued by Stytch from the Token endpoint.
     * M2M access tokens are JWTs signed with the project's JWKs, and can be validated locally using any Stytch client library.
     * You may pass in an optional set of scopes that the JWT must contain in order to enforce permissions.
     *
     * @param data {@link AuthenticateTokenRequest}
     * @async
     * @returns {@link AuthenticateTokenResponse}
     * @throws {ClientError} when token can not be authenticated
     */
    authenticateToken(data: AuthenticateTokenRequest): Promise<AuthenticateTokenResponse>;
}
