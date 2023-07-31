// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import { fetchConfig } from "../shared";
import { OIDCConnection } from "./sso";
import { request } from "../shared";

// Request type for `sso.oidc.createConnection`.
export interface B2BSSOOIDCCreateConnectionRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // A human-readable display name for the connection.
  display_name?: string;
}

// Response type for `sso.oidc.createConnection`.
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

// Request type for `sso.oidc.updateConnection`.
export interface B2BSSOOIDCUpdateConnectionRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // Globally unique UUID that identifies a specific SSO `connection_id` for a Member.
  connection_id: string;
  // A human-readable display name for the connection.
  display_name?: string;
  // The OAuth2.0 client ID used to authenticate login attempts. This will be provided by the IdP.
  client_id?: string;
  /**
   * The secret belonging to the OAuth2.0 client used to authenticate login attempts. This will be provided
   * by the IdP.
   */
  client_secret?: string;
  // A case-sensitive `https://` URL that uniquely identifies the IdP. This will be provided by the IdP.
  issuer?: string;
  // The location of the URL that starts an OAuth login at the IdP. This will be provided by the IdP.
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

// Response type for `sso.oidc.updateConnection`.
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

export class OIDC {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Create a new OIDC Connection.
   * @param data {@link B2BSSOOIDCCreateConnectionRequest}
   * @returns {@link B2BSSOOIDCCreateConnectionResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  createConnection(
    data: B2BSSOOIDCCreateConnectionRequest
  ): Promise<B2BSSOOIDCCreateConnectionResponse> {
    return request<B2BSSOOIDCCreateConnectionResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/sso/oidc/${data.organization_id}`,
      data: {
        display_name: data.display_name,
      },
    });
  }

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
  updateConnection(
    data: B2BSSOOIDCUpdateConnectionRequest
  ): Promise<B2BSSOOIDCUpdateConnectionResponse> {
    return request<B2BSSOOIDCUpdateConnectionResponse>(this.fetchConfig, {
      method: "PUT",
      url: `/v1/b2b/sso/oidc/${data.organization_id}/connections/${data.connection_id}`,
      data: {
        display_name: data.display_name,
        client_id: data.client_id,
        client_secret: data.client_secret,
        issuer: data.issuer,
        authorization_url: data.authorization_url,
        token_url: data.token_url,
        userinfo_url: data.userinfo_url,
        jwks_url: data.jwks_url,
      },
    });
  }
}
