import { Authorization } from "../shared/method_options";
import { External } from "./sso_external";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
import { OIDC } from "./sso_oidc";
import { SAML } from "./sso_saml";
export interface B2BSSODeleteConnectionRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSSOGetConnectionsRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface Connection {
    organization_id: string;
    connection_id: string;
    external_organization_id: string;
    external_connection_id: string;
    display_name: string;
    status: string;
    external_connection_implicit_role_assignments: ConnectionImplicitRoleAssignment[];
    external_group_implicit_role_assignments: GroupImplicitRoleAssignment[];
}
export interface ConnectionImplicitRoleAssignment {
    /**
     * The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.
     *
     *   Reserved `role_id`s that are predefined by Stytch include:
     *
     *   * `stytch_member`
     *   * `stytch_admin`
     *
     *   Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default)
     * for a more detailed explanation.
     *
     *
     */
    role_id: string;
}
export interface GroupImplicitRoleAssignment {
    /**
     * The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.
     *
     *   Reserved `role_id`s that are predefined by Stytch include:
     *
     *   * `stytch_member`
     *   * `stytch_admin`
     *
     *   Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default)
     * for a more detailed explanation.
     *
     *
     */
    role_id: string;
    group: string;
}
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
    identity_provider: string;
    custom_scopes: string;
    attribute_mapping?: Record<string, any>;
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
    saml_connection_implicit_role_assignments: SAMLConnectionImplicitRoleAssignment[];
    saml_group_implicit_role_assignments: SAMLGroupImplicitRoleAssignment[];
    alternative_audience_uri: string;
    identity_provider: string;
    nameid_format: string;
    alternative_acs_url: string;
    attribute_mapping?: Record<string, any>;
}
export interface SAMLConnectionImplicitRoleAssignment {
    /**
     * The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.
     *
     *   Reserved `role_id`s that are predefined by Stytch include:
     *
     *   * `stytch_member`
     *   * `stytch_admin`
     *
     *   Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default)
     * for a more detailed explanation.
     *
     *
     */
    role_id: string;
}
export interface SAMLGroupImplicitRoleAssignment {
    /**
     * The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.
     *
     *   Reserved `role_id`s that are predefined by Stytch include:
     *
     *   * `stytch_member`
     *   * `stytch_admin`
     *
     *   Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default)
     * for a more detailed explanation.
     *
     *
     */
    role_id: string;
    group: string;
}
export interface X509Certificate {
    certificate_id: string;
    certificate: string;
    issuer: string;
    created_at?: string;
    expires_at?: string;
    updated_at?: string;
}
export interface B2BSSOAuthenticateRequest {
    sso_token: string;
    pkce_code_verifier?: string;
    session_token?: string;
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
    session_custom_claims?: Record<string, any>;
    /**
     * If the needs to complete an MFA step, and the Member has a phone number, this endpoint will
     * pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be
     * used to determine which language to use when sending the passcode.
     *
     * Parameter is a [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/),
     * e.g. `"en"`.
     *
     * Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese
     * (`"pt-br"`); if no value is provided, the copy defaults to English.
     *
     * Request support for additional languages
     * [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!
     *
     */
    locale?: "en" | "es" | "pt-br" | "fr" | "it" | "de-DE" | "zh-Hans" | "ca-ES" | string;
    /**
     * Adds this primary authentication factor to the intermediate session token. If the resulting set of
     * factors satisfies the organization's primary authentication requirements and MFA requirements, the
     * intermediate session token will be consumed and converted to a member session. If not, the same
     * intermediate session token will be returned.
     */
    intermediate_session_token?: string;
}
export interface B2BSSOAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    member: Member;
    session_token: string;
    session_jwt: string;
    reset_session: boolean;
    organization: Organization;
    /**
     * The returned Intermediate Session Token contains an SSO factor associated with the Member. If this value
     * is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token
     * can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
     * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
     * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
     * MFA flow and log in to the Organization. SSO factors are not transferable between Organizations, so the
     * intermediate session token is not valid for use with discovery endpoints.
     */
    intermediate_session_token: string;
    /**
     * Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step
     * to log in to the Organization.
     */
    member_authenticated: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
    mfa_required?: MfaRequired;
}
export interface B2BSSODeleteConnectionRequest {
    /**
     * The organization ID that the SSO connection belongs to. You may also use the organization_slug here as a
     * convenience.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSSODeleteConnectionResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    connection_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BSSOGetConnectionsRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
}
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
     * The list of [External Connections](https://stytch.com/docs/b2b/api/external-connection-object) owned by
     * this organization.
     */
    external_connections: Connection[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class SSO {
    private fetchConfig;
    oidc: OIDC;
    saml: SAML;
    external: External;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get all SSO Connections owned by the organization.
     * @param params {@link B2BSSOGetConnectionsRequest}
     * @param options {@link B2BSSOGetConnectionsRequestOptions}
     * @returns {@link B2BSSOGetConnectionsResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getConnections(params: B2BSSOGetConnectionsRequest, options?: B2BSSOGetConnectionsRequestOptions): Promise<B2BSSOGetConnectionsResponse>;
    /**
     * Delete an existing SSO connection.
     * @param data {@link B2BSSODeleteConnectionRequest}
     * @param options {@link B2BSSODeleteConnectionRequestOptions}
     * @returns {@link B2BSSODeleteConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteConnection(data: B2BSSODeleteConnectionRequest, options?: B2BSSODeleteConnectionRequestOptions): Promise<B2BSSODeleteConnectionResponse>;
    /**
     * Authenticate a user given a token.
     * This endpoint verifies that the user completed the SSO Authentication flow by verifying that the token
     * is valid and hasn't expired.
     * Provide the `session_duration_minutes` parameter to set the lifetime of the session.
     * If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60
     * minute duration.
     * To link this authentication event to an existing Stytch session, include either the `session_token` or
     * `session_jwt` param.
     *
     * If the is required to complete MFA to log in to the, the returned value of `member_authenticated` will
     * be `false`, and an `intermediate_session_token` will be returned.
     * The `intermediate_session_token` can be passed into the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
     * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp),
     * or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete
     * the MFA step and acquire a full member session.
     * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
     *
     * If a valid `session_token` or `session_jwt` is passed in, the Member will not be required to complete an
     * MFA step.
     * @param data {@link B2BSSOAuthenticateRequest}
     * @returns {@link B2BSSOAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BSSOAuthenticateRequest): Promise<B2BSSOAuthenticateResponse>;
}
