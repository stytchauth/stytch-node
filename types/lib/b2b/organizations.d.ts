import { Authorization } from "../shared/method_options";
import { fetchConfig } from "../shared";
import { Members } from "./organizations_members";
import { SCIMAttributes } from "./scim";
export interface ActiveSCIMConnection {
    connection_id: string;
    display_name: string;
    bearer_token_last_four: string;
    bearer_token_expires_at?: string;
}
export interface ActiveSSOConnection {
    connection_id: string;
    display_name: string;
    identity_provider: string;
}
export interface B2BOrganizationsDeleteRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsResultsMetadata {
    /**
     * The total number of results returned by your search query. If totals have been disabled for your Stytch
     * Workspace to improve search performance, the value will always be -1.
     */
    total: number;
    /**
     * The `next_cursor` string is returned when your search result contains more than one page of results.
     * This value is passed into your next search call in the `cursor` field.
     */
    next_cursor?: string;
}
export interface B2BOrganizationsUpdateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface EmailImplicitRoleAssignment {
    domain: string;
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
export interface GithubProviderInfo {
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    /**
     * All tenant IDs returned by the OAuth provider. These is typically used to identify organizations or
     * groups within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the
     * Workspace ID, and in GitHub this is an organization ID. Some OAuth providers do not return tenant IDs,
     * some providers are guaranteed to return one, and some may return multiple. This field will always be
     * populated if at least one tenant ID was returned from the OAuth provider and developers should prefer
     * this field over `provider_tenant_id`.
     */
    provider_tenant_ids: string[];
    access_token: string;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
}
export interface HubspotProviderInfo {
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    /**
     * The tenant ID returned by the OAuth provider. This is typically used to identify an organization or
     * group within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the
     * Workspace ID, and in GitHub this is an organization ID. This field will only be populated if exactly one
     * tenant ID is returned from a successful OAuth authentication and developers should prefer
     * `provider_tenant_ids` over this since it accounts for the possibility of an OAuth provider yielding
     * multiple tenant IDs.
     */
    provider_tenant_id: string;
    access_token: string;
    access_token_expires_in: number;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
    /**
     * The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's
     * API.
     */
    refresh_token?: string;
}
export interface Member {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id: string;
    email_address: string;
    status: string;
    name: string;
    /**
     * An array of registered [SAML Connection](saml-connection-object) or
     * [OIDC Connection](oidc-connection-object) objects the Member has authenticated with.
     */
    sso_registrations: SSORegistration[];
    /**
     * Identifies the Member as a break glass user - someone who has permissions to authenticate into an
     * Organization by bypassing the Organization's settings. A break glass account is typically used for
     * emergency purposes to gain access outside of normal authentication procedures. Refer to the
     * [Organization object](organization-object) and its `auth_methods` and `allowed_auth_methods` fields for
     * more details.
     */
    is_breakglass: boolean;
    member_password_id: string;
    oauth_registrations: OAuthRegistration[];
    email_address_verified: boolean;
    mfa_phone_number_verified: boolean;
    /**
     * Whether or not the Member has the `stytch_admin` Role. This Role is automatically granted to Members
     *   who create an Organization through the
     * [discovery flow](https://stytch.com/docs/b2b/api/create-organization-via-discovery). See the
     *   [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for more details on this Role.
     */
    is_admin: boolean;
    totp_registration_id: string;
    /**
     *
     *   A list of retired email addresses for this member.
     *   A previously active email address can be marked as retired in one of two ways:
     *   - It's replaced with a new primary email address during an explicit Member update.
     *   - A new email address is surfaced by an OAuth, SAML or OIDC provider. In this case the new email
     * address becomes the
     *   Member's primary email address and the old primary email address is retired.
     *
     *   A retired email address cannot be used by other Members in the same Organization. However, unlinking
     * retired email
     *   addresses allows them to be subsequently re-used by other Organization Members. Retired email
     * addresses can be unlinked
     *   using the [Unlink Retired Email endpoint](https://stytch.com/docs/b2b/api/unlink-retired-member-email).
     *
     */
    retired_email_addresses: RetiredEmail[];
    /**
     * Sets whether the Member is enrolled in MFA. If true, the Member must complete an MFA step whenever they
     * wish to log in to their Organization. If false, the Member only needs to complete an MFA step if the
     * Organization's MFA policy is set to `REQUIRED_FOR_ALL`.
     */
    mfa_enrolled: boolean;
    mfa_phone_number: string;
    default_mfa_method: string;
    /**
     * Explicit or implicit Roles assigned to this Member, along with details about the role assignment source.
     *    See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information
     * about role assignment.
     */
    roles: MemberRole[];
    trusted_metadata?: Record<string, any>;
    /**
     * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
     *   frontend SDK, and should not be used to store critical information. See the
     * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
     *   for complete field behavior details.
     */
    untrusted_metadata?: Record<string, any>;
    /**
     * The timestamp of the Member's creation. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    created_at?: string;
    /**
     * The timestamp of when the Member was last updated. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    updated_at?: string;
    /**
     * A scim member registration, referencing a [SCIM Connection](scim-connection-object) object in use for
     * the Member creation.
     */
    scim_registration?: SCIMRegistration;
    external_id?: string;
}
export interface MemberRole {
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
    /**
     * A list of sources for this role assignment. A role assignment can come from multiple sources - for
     * example, the Role could be both explicitly assigned and implicitly granted from the Member's email
     * domain.
     */
    sources: MemberRoleSource[];
}
export interface MemberRoleSource {
    /**
     * The type of role assignment. The possible values are:
     *
     *   `direct_assignment` – an explicitly assigned Role.
     *
     *   Directly assigned roles can be updated by passing in the `roles` argument to the
     *   [Update Member](https://stytch.com/docs/b2b/api/update-member) endpoint.
     *
     *   `email_assignment` – an implicit Role granted by the Member's email domain, regardless of their login
     * method.
     *
     *   Email implicit role assignments can be updated by passing in the
     * `rbac_email_implicit_role_assignments` argument to
     *   the [Update Organization](https://stytch.com/docs/b2b/api/update-organization) endpoint.
     *
     *   `sso_connection` – an implicit Role granted by the Member's SSO connection. This is currently only
     * available
     *   for SAML connections and not for OIDC. If the Member has a SAML Member registration with the given
     * connection, this
     *   role assignment will appear in the list. However, for authorization check purposes (in
     *   [sessions authenticate](https://stytch.com/docs/b2b/api/authenticate-session) or in any endpoint that
     * enforces RBAC with session
     *   headers), the Member will only be granted the Role if their session contains an authentication factor
     * with the
     *   specified SAML connection.
     *
     *   SAML connection implicit role assignments can be updated by passing in the
     *   `saml_connection_implicit_role_assignments` argument to the
     *   [Update SAML connection](https://stytch.com/docs/b2b/api/update-saml-connection) endpoint.
     *
     *   `sso_connection_group` – an implicit Role granted by the Member's SSO connection and group. This is
     * currently only
     *   available for SAML connections and not for OIDC. If the Member has a SAML Member registration with the
     * given
     *   connection, and belongs to a specific group within the IdP, this role assignment will appear in the
     * list. However,
     *   for authorization check purposes (in
     * [sessions authenticate](https://stytch.com/docs/b2b/api/authenticate-session) or in any endpoint
     *   that enforces RBAC with session headers), the Member will only be granted the role if their session
     * contains an
     *   authentication factor with the specified SAML connection.
     *
     *   SAML group implicit role assignments can be updated by passing in the
     * `saml_group_implicit_role_assignments`
     *   argument to the [Update SAML connection](https://stytch.com/docs/b2b/api/update-saml-connection)
     * endpoint.
     *
     *     `scim_connection_group` – an implicit Role granted by the Member's SCIM connection and group. If the
     * Member has
     *   a SCIM Member registration with the given connection, and belongs to a specific group within the IdP,
     * this role assignment will appear in the list.
     *
     *   SCIM group implicit role assignments can be updated by passing in the
     * `scim_group_implicit_role_assignments`
     *   argument to the [Update SCIM connection](https://stytch.com/docs/b2b/api/update-scim-connection)
     * endpoint.
     *
     */
    type: string;
    /**
     * An object containing additional metadata about the source assignment. The fields will vary depending
     *   on the role assignment type as follows:
     *
     *   `direct_assignment` – no additional details.
     *
     *   `email_assignment` – will contain the email domain that granted the assignment.
     *
     *   `sso_connection` – will contain the `connection_id` of the SAML connection that granted the assignment.
     *
     *   `sso_connection_group` – will contain the `connection_id` of the SAML connection and the name of the
     * `group`
     *   that granted the assignment.
     *
     *   `scim_connection_group` – will contain the `connection_id` of the SAML connection and the `group_id`
     *   that granted the assignment.
     *
     */
    details?: Record<string, any>;
}
export interface OAuthRegistration {
    /**
     * Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub
     * etc.
     */
    provider_type: string;
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    member_oauth_registration_id: string;
    /**
     * If available, the `profile_picture_url` is a URL of the User's profile picture set in OAuth identity the
     * provider that the User has authenticated with, e.g. Google profile picture.
     */
    profile_picture_url?: string;
    /**
     * If available, the `locale` is the Member's locale set in the OAuth identity provider that the user has
     * authenticated with.
     */
    locale?: string;
}
export interface OIDCProviderInfo {
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    /**
     * The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information
     * about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are
     * returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/)
     * specification, which is based on OAuth.
     */
    id_token: string;
    access_token: string;
    access_token_expires_in: number;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
    connection_id: string;
    /**
     * The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's
     * API.
     */
    refresh_token?: string;
}
export interface Organization {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    organization_name: string;
    organization_logo_url: string;
    /**
     * The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following
     * reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length. Wherever an
     * organization_id is expected in a path or request parameter, you may also use the organization_slug as a
     * convenience.
     */
    organization_slug: string;
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
    sso_jit_provisioning: string;
    /**
     * An array of `connection_id`s that reference
     * [SAML Connection objects](https://stytch.com/docs/b2b/api/saml-connection-object).
     *   Only these connections will be allowed to JIT provision Members via SSO when `sso_jit_provisioning` is
     * set to `RESTRICTED`.
     */
    sso_jit_provisioning_allowed_connections: string[];
    /**
     * An array of active [SAML Connection references](https://stytch.com/docs/b2b/api/saml-connection-object)
     * or [OIDC Connection references](https://stytch.com/docs/b2b/api/oidc-connection-object).
     */
    sso_active_connections: ActiveSSOConnection[];
    /**
     * An array of email domains that allow invites or JIT provisioning for new Members. This list is enforced
     * when either `email_invites` or `email_jit_provisioning` is set to `RESTRICTED`.
     *
     *
     *     Common domains such as `gmail.com` are not allowed. See the
     * [common email domains resource](https://stytch.com/docs/b2b/api/common-email-domains) for the full list.
     */
    email_allowed_domains: string[];
    /**
     * The authentication setting that controls how a new Member can be provisioned by authenticating via Email
     * Magic Link or OAuth. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be
     * provisioned upon authentication via Email Magic Link or OAuth.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning via Email Magic Link and OAuth.
     *
     */
    email_jit_provisioning: string;
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
    email_invites: string;
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
    auth_methods: string;
    /**
     * An array of allowed authentication methods. This list is enforced when `auth_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sso`, `magic_link`, `email_otp`, `password`, `google_oauth`,
     * `microsoft_oauth`, `slack_oauth`, `github_oauth`, and `hubspot_oauth`.
     *
     */
    allowed_auth_methods: string[];
    mfa_policy: string;
    /**
     * Implicit role assignments based off of email domains.
     *   For each domain-Role pair, all Members whose email addresses have the specified email domain will be
     * granted the
     *   associated Role, regardless of their login method. See the
     * [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)
     *   for more information about role assignment.
     */
    rbac_email_implicit_role_assignments: EmailImplicitRoleAssignment[];
    /**
     * The setting that controls which MFA methods can be used by Members of an Organization. The accepted
     * values are:
     *
     *   `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.
     *
     *   `RESTRICTED` – only methods that comply with `allowed_mfa_methods` can be used for authentication.
     * This setting does not apply to Members with `is_breakglass` set to `true`.
     *
     */
    mfa_methods: string;
    /**
     * An array of allowed MFA authentication methods. This list is enforced when `mfa_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sms_otp` and `totp`.
     *
     */
    allowed_mfa_methods: string[];
    /**
     * The authentication setting that controls how a new Member can JIT provision into an organization by
     * tenant. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with tenants in `allowed_oauth_tenants` can JIT provision via tenant.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning by OAuth Tenant.
     *
     */
    oauth_tenant_jit_provisioning: string;
    claimed_email_domains: string[];
    trusted_metadata?: Record<string, any>;
    /**
     * The timestamp of the Organization's creation. Values conform to the RFC 3339 standard and are expressed
     * in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    created_at?: string;
    /**
     * The timestamp of when the Organization was last updated. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    updated_at?: string;
    sso_default_connection_id?: string;
    scim_active_connection?: ActiveSCIMConnection;
    /**
     * A map of allowed OAuth tenants. If this field is not passed in, the Organization will not allow JIT
     * provisioning by OAuth Tenant. Allowed keys are "slack", "hubspot", and "github".
     */
    allowed_oauth_tenants?: Record<string, any>;
}
export interface RetiredEmail {
    email_id: string;
    email_address: string;
}
export interface SCIMRegistration {
    connection_id: string;
    registration_id: string;
    external_id?: string;
    scim_attributes?: SCIMAttributes;
}
export interface SSORegistration {
    connection_id: string;
    external_id: string;
    registration_id: string;
    sso_attributes?: Record<string, any>;
}
export interface SearchQuery {
    /**
     * The action to perform on the operands. The accepted value are:
     *
     *   `AND` – all the operand values provided must match.
     *
     *   `OR` – the operator will return any matches to at least one of the operand values you supply.
     */
    operator: "OR" | "AND" | string;
    operands: SearchQueryOperand[];
}
export interface SlackProviderInfo {
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    /**
     * The tenant ID returned by the OAuth provider. This is typically used to identify an organization or
     * group within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the
     * Workspace ID, and in GitHub this is an organization ID. This field will only be populated if exactly one
     * tenant ID is returned from a successful OAuth authentication and developers should prefer
     * `provider_tenant_ids` over this since it accounts for the possibility of an OAuth provider yielding
     * multiple tenant IDs.
     */
    provider_tenant_id: string;
    access_token: string;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
    /**
     * The `access_token` that you may use to access data as a bot application in Slack. Use in conjunction
     * with `bot_scopes`.
     */
    bot_access_token: string;
    bot_scopes: string[];
}
export interface B2BOrganizationsCreateRequest {
    organization_name: string;
    /**
     * The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following
     * reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length. Wherever an
     * organization_id is expected in a path or request parameter, you may also use the organization_slug as a
     * convenience.
     */
    organization_slug?: string;
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
     * Magic Link or OAuth. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be
     * provisioned upon authentication via Email Magic Link or OAuth.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning via Email Magic Link and OAuth.
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
     * An array of allowed authentication methods. This list is enforced when `auth_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sso`, `magic_link`, `email_otp`, `password`, `google_oauth`,
     * `microsoft_oauth`, `slack_oauth`, `github_oauth`, and `hubspot_oauth`.
     *
     */
    allowed_auth_methods?: string[];
    /**
     * The setting that controls the MFA policy for all Members in the Organization. The accepted values are:
     *
     *   `REQUIRED_FOR_ALL` – All Members within the Organization will be required to complete MFA every time
     * they wish to log in. However, any active Session that existed prior to this setting change will remain
     * valid.
     *
     *   `OPTIONAL` – The default value. The Organization does not require MFA by default for all Members.
     * Members will be required to complete MFA only if their `mfa_enrolled` status is set to true.
     *
     */
    mfa_policy?: string;
    /**
     * Implicit role assignments based off of email domains.
     *   For each domain-Role pair, all Members whose email addresses have the specified email domain will be
     * granted the
     *   associated Role, regardless of their login method. See the
     * [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)
     *   for more information about role assignment.
     */
    rbac_email_implicit_role_assignments?: EmailImplicitRoleAssignment[];
    /**
     * The setting that controls which MFA methods can be used by Members of an Organization. The accepted
     * values are:
     *
     *   `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.
     *
     *   `RESTRICTED` – only methods that comply with `allowed_mfa_methods` can be used for authentication.
     * This setting does not apply to Members with `is_breakglass` set to `true`.
     *
     */
    mfa_methods?: string;
    /**
     * An array of allowed MFA authentication methods. This list is enforced when `mfa_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sms_otp` and `totp`.
     *
     */
    allowed_mfa_methods?: string[];
    /**
     * The authentication setting that controls how a new Member can JIT provision into an organization by
     * tenant. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with tenants in `allowed_oauth_tenants` can JIT provision via tenant.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning by OAuth Tenant.
     *
     */
    oauth_tenant_jit_provisioning?: string;
    /**
     * A map of allowed OAuth tenants. If this field is not passed in, the Organization will not allow JIT
     * provisioning by OAuth Tenant. Allowed keys are "slack", "hubspot", and "github".
     */
    allowed_oauth_tenants?: Record<string, any>;
    claimed_email_domains?: string[];
}
export interface B2BOrganizationsCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsDeleteRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
}
export interface B2BOrganizationsDeleteResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsGetRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
}
export interface B2BOrganizationsGetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMetricsRequest {
    organization_id: string;
}
export interface B2BOrganizationsMetricsResponse {
    request_id: string;
    member_count: number;
    status_code: number;
}
export interface B2BOrganizationsSearchRequest {
    /**
     * The `cursor` field allows you to paginate through your results. Each result array is limited to 1000
     * results. If your query returns more than 1000 results, you will need to paginate the responses using the
     * `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata`
     * object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the
     * next page of results. Continue to make search calls until the `next_cursor` in the response is null.
     */
    cursor?: string;
    /**
     * The number of search results to return per page. The default limit is 100. A maximum of 1000 results can
     * be returned by a single search request. If the total size of your result set is greater than one page
     * size, you must paginate the response. See the `cursor` field.
     */
    limit?: number;
    /**
     * The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter
     * your results. Only an operator is required. If you include no operands, no filtering will be applied. If
     * you include no query object, it will return all Organizations with no filtering applied.
     */
    query?: SearchQuery;
}
export interface B2BOrganizationsSearchResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    organizations: Organization[];
    /**
     * The search `results_metadata` object contains metadata relevant to your specific query like `total` and
     * `next_cursor`.
     */
    results_metadata: B2BOrganizationsResultsMetadata;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsUpdateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    /**
     * The name of the Organization. Must be between 1 and 128 characters in length.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.info.name` action on the `stytch.organization` Resource.
     */
    organization_name?: string;
    /**
     * The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following
     * reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length. Wherever an
     * organization_id is expected in a path or request parameter, you may also use the organization_slug as a
     * convenience.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.info.slug` action on the `stytch.organization` Resource.
     */
    organization_slug?: string;
    /**
     * The image URL of the Organization logo.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.info.logo-url` action on the `stytch.organization` Resource.
     */
    organization_logo_url?: string;
    /**
     * An arbitrary JSON object for storing application-specific data or identity-provider-specific data.
     *           If a session header is passed into the request, this field may **not** be passed into the
     * request. You cannot
     *           update trusted metadata when acting as a Member.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * The default connection used for SSO when there are multiple active connections.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.default-sso-connection` action on the `stytch.organization`
     * Resource.
     */
    sso_default_connection_id?: string;
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
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.sso-jit-provisioning` action on the `stytch.organization`
     * Resource.
     */
    sso_jit_provisioning?: string;
    /**
     * An array of `connection_id`s that reference
     * [SAML Connection objects](https://stytch.com/docs/b2b/api/saml-connection-object).
     *   Only these connections will be allowed to JIT provision Members via SSO when `sso_jit_provisioning` is
     * set to `RESTRICTED`.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.sso-jit-provisioning` action on the `stytch.organization`
     * Resource.
     */
    sso_jit_provisioning_allowed_connections?: string[];
    /**
     * An array of email domains that allow invites or JIT provisioning for new Members. This list is enforced
     * when either `email_invites` or `email_jit_provisioning` is set to `RESTRICTED`.
     *
     *
     *     Common domains such as `gmail.com` are not allowed. See the
     * [common email domains resource](https://stytch.com/docs/b2b/api/common-email-domains) for the full list.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.allowed-domains` action on the `stytch.organization` Resource.
     */
    email_allowed_domains?: string[];
    /**
     * The authentication setting that controls how a new Member can be provisioned by authenticating via Email
     * Magic Link or OAuth. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be
     * provisioned upon authentication via Email Magic Link or OAuth.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning via Email Magic Link and OAuth.
     *
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.email-jit-provisioning` action on the `stytch.organization`
     * Resource.
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
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.email-invites` action on the `stytch.organization` Resource.
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
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.allowed-auth-methods` action on the `stytch.organization`
     * Resource.
     */
    auth_methods?: string;
    /**
     * An array of allowed authentication methods. This list is enforced when `auth_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sso`, `magic_link`, `email_otp`, `password`, `google_oauth`,
     * `microsoft_oauth`, `slack_oauth`, `github_oauth`, and `hubspot_oauth`.
     *
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.allowed-auth-methods` action on the `stytch.organization`
     * Resource.
     */
    allowed_auth_methods?: string[];
    /**
     * The setting that controls the MFA policy for all Members in the Organization. The accepted values are:
     *
     *   `REQUIRED_FOR_ALL` – All Members within the Organization will be required to complete MFA every time
     * they wish to log in. However, any active Session that existed prior to this setting change will remain
     * valid.
     *
     *   `OPTIONAL` – The default value. The Organization does not require MFA by default for all Members.
     * Members will be required to complete MFA only if their `mfa_enrolled` status is set to true.
     *
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.mfa-policy` action on the `stytch.organization` Resource.
     */
    mfa_policy?: string;
    /**
     * Implicit role assignments based off of email domains.
     *   For each domain-Role pair, all Members whose email addresses have the specified email domain will be
     * granted the
     *   associated Role, regardless of their login method. See the
     * [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)
     *   for more information about role assignment.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.implicit-roles` action on the `stytch.organization` Resource.
     */
    rbac_email_implicit_role_assignments?: EmailImplicitRoleAssignment[];
    /**
     * The setting that controls which MFA methods can be used by Members of an Organization. The accepted
     * values are:
     *
     *   `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.
     *
     *   `RESTRICTED` – only methods that comply with `allowed_mfa_methods` can be used for authentication.
     * This setting does not apply to Members with `is_breakglass` set to `true`.
     *
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.allowed-mfa-methods` action on the `stytch.organization`
     * Resource.
     */
    mfa_methods?: string;
    /**
     * An array of allowed MFA authentication methods. This list is enforced when `mfa_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sms_otp` and `totp`.
     *
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.allowed-mfa-methods` action on the `stytch.organization`
     * Resource.
     */
    allowed_mfa_methods?: string[];
    /**
     * The authentication setting that controls how a new Member can JIT provision into an organization by
     * tenant. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with tenants in `allowed_oauth_tenants` can JIT provision via tenant.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning by OAuth Tenant.
     *
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.oauth-tenant-jit-provisioning` action on the
     * `stytch.organization` Resource.
     */
    oauth_tenant_jit_provisioning?: string;
    /**
     * A map of allowed OAuth tenants. If this field is not passed in, the Organization will not allow JIT
     * provisioning by OAuth Tenant. Allowed keys are "slack", "hubspot", and "github".
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.allowed-oauth-tenants` action on the `stytch.organization`
     * Resource.
     */
    allowed_oauth_tenants?: Record<string, any>;
    claimed_email_domains?: string[];
}
export interface B2BOrganizationsUpdateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export type OrganizationSearchOperand = {
    filter_name: "organization_ids";
    filter_value: string[];
} | {
    filter_name: "organization_slugs";
    filter_value: string[];
} | {
    filter_name: "organization_name_fuzzy";
    filter_value: string;
} | {
    filter_name: "organization_slug_fuzzy";
    filter_value: string;
} | {
    filter_name: "member_emails";
    filter_value: string[];
} | {
    filter_name: "member_email_fuzzy";
    filter_value: string;
} | {
    filter_name: "allowed_domains";
    filter_value: string[];
} | {
    filter_name: "allowed_domain_fuzzy";
    filter_value: string;
} | {
    filter_name: "claimed_email_domains";
    filter_value: string[];
};
export type MemberSearchOperand = {
    filter_name: "member_ids";
    filter_value: string[];
} | {
    filter_name: "member_emails";
    filter_value: string[];
} | {
    filter_name: "member_email_fuzzy";
    filter_value: string;
} | {
    filter_name: "member_is_breakglass";
    filter_value: boolean;
} | {
    filter_name: "statuses";
    filter_value: string[];
} | {
    filter_name: "member_phone_numbers";
    filter_value: string[];
} | {
    filter_name: "member_phone_number_fuzzy";
    filter_value: string;
};
export type SearchQueryOperand = OrganizationSearchOperand | MemberSearchOperand | {
    filter_name: string;
    [key: string]: unknown;
};
export declare class Organizations {
    private fetchConfig;
    members: Members;
    constructor(fetchConfig: fetchConfig);
    /**
     * Creates an. An `organization_name` and a unique `organization_slug` are required.
     *
     * By default, `email_invites` and `sso_jit_provisioning` will be set to `ALL_ALLOWED`, and `mfa_policy`
     * will be set to `OPTIONAL` if no Organization authentication settings are explicitly defined in the
     * request.
     *
     * *See the [Organization authentication settings](https://stytch.com/docs/b2b/api/org-auth-settings)
     * resource to learn more about fields like `email_jit_provisioning`, `email_invites`,
     * `sso_jit_provisioning`, etc., and their behaviors.
     * @param data {@link B2BOrganizationsCreateRequest}
     * @returns {@link B2BOrganizationsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BOrganizationsCreateRequest): Promise<B2BOrganizationsCreateResponse>;
    /**
     * Returns an specified by `organization_id`.
     * @param params {@link B2BOrganizationsGetRequest}
     * @returns {@link B2BOrganizationsGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BOrganizationsGetRequest): Promise<B2BOrganizationsGetResponse>;
    /**
     * Updates an specified by `organization_id`. An Organization must always have at least one auth setting
     * set to either `RESTRICTED` or `ALL_ALLOWED` in order to provision new Members.
     *
     * *See the [Organization authentication settings](https://stytch.com/docs/b2b/api/org-auth-settings)
     * resource to learn more about fields like `email_jit_provisioning`, `email_invites`,
     * `sso_jit_provisioning`, etc., and their behaviors.
     * @param data {@link B2BOrganizationsUpdateRequest}
     * @param options {@link B2BOrganizationsUpdateRequestOptions}
     * @returns {@link B2BOrganizationsUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: B2BOrganizationsUpdateRequest, options?: B2BOrganizationsUpdateRequestOptions): Promise<B2BOrganizationsUpdateResponse>;
    /**
     * Deletes an specified by `organization_id`. All Members of the Organization will also be deleted.
     * @param data {@link B2BOrganizationsDeleteRequest}
     * @param options {@link B2BOrganizationsDeleteRequestOptions}
     * @returns {@link B2BOrganizationsDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: B2BOrganizationsDeleteRequest, options?: B2BOrganizationsDeleteRequestOptions): Promise<B2BOrganizationsDeleteResponse>;
    /**
     * Search for Organizations. If you send a request with no body params, no filtering will be applied and
     * the endpoint will return all Organizations. All fuzzy search filters require a minimum of three
     * characters.
     * @param data {@link B2BOrganizationsSearchRequest}
     * @returns {@link B2BOrganizationsSearchResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    search(data: B2BOrganizationsSearchRequest): Promise<B2BOrganizationsSearchResponse>;
    /**
     * @param params {@link B2BOrganizationsMetricsRequest}
     * @returns {@link B2BOrganizationsMetricsResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    metrics(params: B2BOrganizationsMetricsRequest): Promise<B2BOrganizationsMetricsResponse>;
}
