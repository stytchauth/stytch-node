import { DiscoveredOrganization } from "./discovery";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
export interface B2BDiscoveryOrganizationsCreateRequest {
    /**
     * The Intermediate Session Token. This token does not necessarily belong to a specific instance of a
     * Member, but represents a bag of factors that may be converted to a member session.
     *     The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete an MFA
     * flow;
     *     the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a specific Organization that allows the factors represented by the intermediate session token;
     *     or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member.
     */
    intermediate_session_token: string;
    /**
     * The name of the Organization. If the name is not specified, a default name will be created based on the
     * email used to initiate the discovery flow. If the email domain is a common email provider such as
     * gmail.com, or if the email is a .edu email, the organization name will be generated based on the name
     * portion of the email. Otherwise, the organization name will be generated based on the email domain.
     */
    organization_name: string;
    /**
     * The unique URL slug of the Organization. A minimum of two characters is required. The slug only accepts
     * alphanumeric characters and the following reserved characters: `-` `.` `_` `~`. If the slug is not
     * specified, a default slug will be created based on the email used to initiate the discovery flow. If the
     * email domain is a common email provider such as gmail.com, or if the email is a .edu email, the
     * organization slug will be generated based on the name portion of the email. Otherwise, the organization
     * slug will be generated based on the email domain.
     */
    organization_slug: string;
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
    organization_logo_url?: string;
    trusted_metadata?: Record<string, any>;
    /**
     * The authentication setting that controls the JIT provisioning of Members when authenticating via SSO.
     * The accepted values are:
     *
     *   `ALL_ALLOWED` – new Members will be automatically provisioned upon successful authentication via any
     * of the Organization's `sso_active_connections`.
     *
     *   `RESTRICTED` – only new Members with SSO logins that comply with
     * `sso_jit_provisioning_allowed_connections` can be provisioned upon authentication.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning via SSO.
     *
     */
    sso_jit_provisioning?: string;
    /**
     * An array of email domains that allow invites or JIT provisioning for new Members. This list is enforced
     * when either `email_invites` or `email_jit_provisioning` is set to `RESTRICTED`.
     *
     *
     *     Common domains such as `gmail.com` are not allowed. See the
     * [common email domains resource](https://stytch.com/docs/b2b/api/common-email-domains) for the full list.
     */
    email_allowed_domains?: string[];
    /**
     * The authentication setting that controls how a new Member can be provisioned by authenticating via Email
     * Magic Link. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be
     * provisioned upon authentication via Email Magic Link.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning via Email Magic Link.
     *
     */
    email_jit_provisioning?: string;
    /**
     * The authentication setting that controls how a new Member can be invited to an organization by email.
     * The accepted values are:
     *
     *   `ALL_ALLOWED` – any new Member can be invited to join via email.
     *
     *   `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be
     * invited via email.
     *
     *   `NOT_ALLOWED` – disable email invites.
     *
     */
    email_invites?: string;
    /**
     * The setting that controls which authentication methods can be used by Members of an Organization. The
     * accepted values are:
     *
     *   `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.
     *
     *   `RESTRICTED` – only methods that comply with `allowed_auth_methods` can be used for authentication.
     * This setting does not apply to Members with `is_breakglass` set to `true`.
     *
     */
    auth_methods?: string;
    /**
     *
     *   An array of allowed authentication methods. This list is enforced when `auth_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sso`, `magic_link`, `password`, `google_oauth`, and `microsoft_oauth`.
     *
     */
    allowed_auth_methods?: string[];
    /**
     * The setting that controls the MFA policy for all Members in the Organization. The accepted values are:
     *
     *   `REQUIRED_FOR_ALL` – All Members within the Organization will be required to complete MFA every time
     * they wish to log in.
     *
     *   `OPTIONAL` – The default value. The Organization does not require MFA by default for all Members.
     * Members will be required to complete MFA only if their `mfa_enrolled` status is set to true.
     *
     */
    mfa_policy?: string;
}
export interface B2BDiscoveryOrganizationsCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    session_token: string;
    session_jwt: string;
    member: Member;
    /**
     * Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step
     * to log in to the Organization.
     */
    member_authenticated: boolean;
    /**
     * The returned Intermediate Session Token is identical to the one that was originally passed in to the
     * request.
     *       The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
     * MFA flow and log in to the Organization.
     *       It can also be used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a different existing Organization,
     *       or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization.
     */
    intermediate_session_token: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
    organization?: Organization;
    mfa_required?: MfaRequired;
}
export interface B2BDiscoveryOrganizationsListRequest {
    /**
     * The Intermediate Session Token. This token does not necessarily belong to a specific instance of a
     * Member, but represents a bag of factors that may be converted to a member session.
     *     The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete an MFA
     * flow;
     *     the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a specific Organization that allows the factors represented by the intermediate session token;
     *     or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member.
     */
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface B2BDiscoveryOrganizationsListResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    email_address: string;
    /**
     * An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`,
     * or `session_jwt`. See the
     * [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for
     * complete details.
     *
     *   Note that Organizations will only appear here under any of the following conditions:
     *   1. The end user is already a Member of the Organization.
     *   2. The end user is invited to the Organization.
     *   3. The end user can join the Organization because:
     *
     *       a) The Organization allows JIT provisioning.
     *
     *       b) The Organizations' allowed domains list contains the Member's email domain.
     *
     *       c) The Organization has at least one other Member with a verified email address with the same
     * domain as the end user (to prevent phishing attacks).
     */
    discovered_organizations: DiscoveredOrganization[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * If the intermediate session token is associated with a specific Organization, that Organization ID will
     * be returned here. The Organization ID will be null if the intermediate session token was generated by a
     * email magic link discovery or OAuth discovery flow. If a session token or session JWT is provided, the
     * Organization ID hint will be null.
     */
    organization_id_hint?: string;
}
export declare class Organizations {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * If an end user does not want to join any already-existing organization, or has no possible organizations
     * to join, this endpoint can be used to create a new
     * [Organization](https://stytch.com/docs/b2b/api/organization-object) and
     * [Member](https://stytch.com/docs/b2b/api/member-object).
     *
     * This operation consumes the Intermediate Session.
     *
     * This endpoint can also be used to start an initial session for the newly created member and organization.
     *
     * If the new Organization is created with a `mfa_policy` of `REQUIRED_FOR_ALL`, the newly created Member
     * will need to complete an MFA step to log in to the Organization.
     * The `intermediate_session_token` will not be consumed and instead will be returned in the response.
     * The `intermediate_session_token` can be passed into the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
     * MFA step and acquire a full member session.
     * The `intermediate_session_token` can also be used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to join a different Organization or create a new one.
     * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
     * @param data {@link B2BDiscoveryOrganizationsCreateRequest}
     * @returns {@link B2BDiscoveryOrganizationsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BDiscoveryOrganizationsCreateRequest): Promise<B2BDiscoveryOrganizationsCreateResponse>;
    /**
     * List all possible organization relationships connected to a
     * [Member Session](https://stytch.com/docs/b2b/api/session-object) or Intermediate Session.
     *
     * When a Member Session is passed in, relationships with a type of `active_member`, `pending_member`, or
     * `invited_member`
     * will be returned, and any membership can be assumed by calling the
     * [Exchange Session](https://stytch.com/docs/b2b/api/exchange-session) endpoint.
     *
     * When an Intermediate Session is passed in, all relationship types - `active_member`, `pending_member`,
     * `invited_member`,
     * and `eligible_to_join_by_email_domain` - will be returned,
     * and any membership can be assumed by calling the
     * [Exchange Intermediate Session](https://stytch.com/docs/b2b/api/exchange-intermediate-session) endpoint.
     *
     * This endpoint requires either an `intermediate_session_token`, `session_jwt` or `session_token` be
     * included in the request.
     * It will return an error if multiple are present.
     *
     * This operation does not consume the Intermediate Session or Session Token passed in.
     * @param data {@link B2BDiscoveryOrganizationsListRequest}
     * @returns {@link B2BDiscoveryOrganizationsListResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    list(data: B2BDiscoveryOrganizationsListRequest): Promise<B2BDiscoveryOrganizationsListResponse>;
}
