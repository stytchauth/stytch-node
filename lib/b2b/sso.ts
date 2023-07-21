// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { OIDC } from "./sso_oidc";
import { request } from "../shared";
import { SAML } from "./sso_saml";

export interface OIDCConnection {
  organization_id: string;
  connection_id: string;
  status: string;
  display_name: string;
  redirect_url: string;
  client_id: string;
  client_secret: string;
  issuer: string;
  authorization_url: string;
  token_url: string;
  userinfo_url: string;
  jwks_url: string;
}

export interface SAMLConnection {
  organization_id: string;
  connection_id: string;
  status: string;
  idp_entity_id: string;
  display_name: string;
  idp_sso_url: string;
  acs_url: string;
  audience_uri: string;
  signing_certificates: X509Certificate[];
  verification_certificates: X509Certificate[];
  attribute_mapping?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface X509Certificate {
  certificate_id: string;
  certificate: string;
  issuer: string;
  created_at?: Date;
  expires_at?: Date;
}

// Request type for `SSO.authenticate`.
export interface B2BSSOAuthenticateRequest {
  // The token to authenticate.
  sso_token: string;
  // A base64url encoded one time secret used to validate that the request starts and ends on the same device.
  pkce_code_verifier?: string;
  // The `session_token` belonging to the member that you wish to associate the email with.
  session_token?: string;
  // The `session_jwt` belonging to the member that you wish to associate the email with.
  session_jwt?: string;
  /**
   * Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't
   * already exist,
   *   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the
   * `session_jwt` will have a fixed lifetime of
   *   five minutes regardless of the underlying session duration, and will need to be refreshed over time.
   *
   *   This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).
   *
   *   If a `session_token` or `session_jwt` is provided then a successful authentication will continue to
   * extend the session this many minutes.
   *
   *   If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a
   * 60 minute duration. If you don't want
   *   to use the Stytch session product, you can ignore the session fields in the response.
   */
  session_duration_minutes?: number;
  /**
   * Add a custom claims map to the Session being authenticated. Claims are only created if a Session is
   * initialized by providing a value in
   *   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a
   * key in an existing Session, supply a new value. To
   *   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`,
   * `exp`, `nbf`, `iat`, `jti`) will be ignored.
   *   Total custom claims size cannot exceed four kilobytes.
   */
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  locale?: "en" | "es" | "pt-br" | string;
}

// Response type for `SSO.authenticate`.
export interface B2BSSOAuthenticateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object).
  member: Member;
  // A secret token for a given Stytch Session.
  session_token: string;
  // The JSON Web Token (JWT) for a given Stytch Session.
  session_jwt: string;
  /**
   * Indicates if all Sessions linked to the Member need to be reset. You should check this field if you
   * aren't using
   *     Stytch's Session product. If you are using Stytch's Session product, we revoke the Member’s other
   * Sessions for you.
   */
  reset_session: boolean;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
  // The [Session object](https://stytch.com/docs/b2b/api/session-object).
  member_session?: MemberSession;
}

// Request type for `SSO.deleteConnection`.
export interface B2BSSODeleteConnectionRequest {
  // The organization ID that the SSO connection belongs to.
  organization_id: string;
  // The ID of the SSO connection. Both SAML and OIDC connection IDs can be provided.
  connection_id: string;
}

// Response type for `SSO.deleteConnection`.
export interface B2BSSODeleteConnectionResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The `connection_id` that was deleted as part of the delete request.
  connection_id: string;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `SSO.getConnections`.
export interface B2BSSOGetConnectionsRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
}

// Response type for `SSO.getConnections`.
export interface B2BSSOGetConnectionsResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  /**
   * The list of [SAML Connections](https://stytch.com/docs/b2b/api/saml-connection-object) owned by this
   * organization.
   */
  saml_connections: SAMLConnection[];
  /**
   * The list of [OIDC Connections](https://stytch.com/docs/b2b/api/oidc-connection-object) owned by this
   * organization.
   */
  oidc_connections: OIDCConnection[];
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

export class SSO {
  private fetchConfig: fetchConfig;
  oidc: OIDC;
  saml: SAML;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.oidc = new OIDC(this.fetchConfig);
    this.saml = new SAML(this.fetchConfig);
  }

  // Get all SSO Connections owned by the organization.
  getConnections(
    params: B2BSSOGetConnectionsRequest
  ): Promise<B2BSSOGetConnectionsResponse> {
    return request<B2BSSOGetConnectionsResponse>(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/sso/${params.organization_id}`,
      params: {},
    });
  }

  // Delete an existing SSO connection.
  deleteConnection(
    data: B2BSSODeleteConnectionRequest
  ): Promise<B2BSSODeleteConnectionResponse> {
    return request<B2BSSODeleteConnectionResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/sso/${data.organization_id}/connections/${data.connection_id}`,
      data: {},
    });
  }

  /**
   * Authenticate a user given a token.
   * This endpoint verifies that the user completed the SSO Authentication flow by verifying that the token
   * is valid and hasn't expired.
   * Provide the `session_duration_minutes` parameter to set the lifetime of the session.
   * If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60
   * minute duration.
   * To link this authentication event to an existing Stytch session, include either the `session_token` or
   * `session_jwt` param.
   */
  authenticate(
    data: B2BSSOAuthenticateRequest
  ): Promise<B2BSSOAuthenticateResponse> {
    return request<B2BSSOAuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/sso/authenticate`,
      data,
    });
  }
}
