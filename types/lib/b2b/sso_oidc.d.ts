import { fetchConfig } from "../shared";
import { OIDCConnection } from "./sso";
export interface B2BSSOOIDCCreateConnectionRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    display_name?: string;
}
export interface B2BSSOOIDCCreateConnectionResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * The `OIDC Connection` object affected by this API call. See the
     * [OIDC Connection Object](https://stytch.com/docs/b2b/api/oidc-connection-object) for complete response
     * field details.
     */
    connection?: OIDCConnection;
}
export interface B2BSSOOIDCUpdateConnectionRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
    display_name?: string;
    client_id?: string;
    /**
     * The secret belonging to the OAuth2.0 client used to authenticate login attempts. This will be provided
     * by the IdP.
     */
    client_secret?: string;
    issuer?: string;
    authorization_url?: string;
    /**
     * The location of the URL that issues OAuth2.0 access tokens and OIDC ID tokens. This will be provided by
     * the IdP.
     */
    token_url?: string;
    /**
     * The location of the IDP's
     * [UserInfo Endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo). This will be
     * provided by the IdP.
     */
    userinfo_url?: string;
    /**
     * The location of the IdP's JSON Web Key Set, used to verify credentials issued by the IdP. This will be
     * provided by the IdP.
     */
    jwks_url?: string;
}
export interface B2BSSOOIDCUpdateConnectionResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * The `OIDC Connection` object affected by this API call. See the
     * [OIDC Connection Object](https://stytch.com/docs/b2b/api/oidc-connection-object) for complete response
     * field details.
     */
    connection?: OIDCConnection;
    /**
     * If it is not possible to resolve the well-known metadata document from the OIDC issuer, this field will
     * explain what went wrong if the request is successful otherwise. In other words, even if the overall
     * request succeeds, there could be relevant warnings related to the connection update.
     */
    warning?: string;
}
export declare class OIDC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create a new OIDC Connection.
     * @param data {@link B2BSSOOIDCCreateConnectionRequest}
     * @returns {@link B2BSSOOIDCCreateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    createConnection(data: B2BSSOOIDCCreateConnectionRequest): Promise<B2BSSOOIDCCreateConnectionResponse>;
    /**
     * Updates an existing OIDC connection.
     *
     * When the value of `issuer` changes, Stytch will attempt to retrieve the
     * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata)
     * document found at `$/.well-known/openid-configuration`.
     * If the metadata document can be retrieved successfully, Stytch will use it to infer the values of
     * `authorization_url`, `token_url`, `jwks_url`, and `userinfo_url`.
     * The `client_id` and `client_secret` values cannot be inferred from the metadata document, and *must* be
     * passed in explicitly.
     *
     * If the metadata document cannot be retrieved, Stytch will still update the connection using values from
     * the request body.
     *
     * If the metadata document can be retrieved, and values are passed in the request body, the explicit
     * values passed in from the request body will take precedence over the values inferred from the metadata
     * document.
     *
     * Note that a newly created connection will not become active until all of the following fields are
     * provided:
     * * `issuer`
     * * `client_id`
     * * `client_secret`
     * * `authorization_url`
     * * `token_url`
     * * `userinfo_url`
     * * `jwks_url`
     * @param data {@link B2BSSOOIDCUpdateConnectionRequest}
     * @returns {@link B2BSSOOIDCUpdateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    updateConnection(data: B2BSSOOIDCUpdateConnectionRequest): Promise<B2BSSOOIDCUpdateConnectionResponse>;
}
