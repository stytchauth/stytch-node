import { fetchConfig } from "../shared";
import { Members } from "./organizations_members";
export interface ActiveSSOConnection {
    connection_id: string;
    display_name: string;
}
export interface B2BOrganizationsResultsMetadata {
    total: number;
    /**
     * The `next_cursor` string is returned when your search result contains more than one page of results.
     * This value is passed into your next search call in the `cursor` field.
     */
    next_cursor?: string;
}
export interface Member {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
     */
    member_id: string;
    email_address: string;
    status: string;
    name: string;
    /**
     * An array of registered [SAML Connection](saml-connection-object) objects the Member has authenticated
     * with.
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
     * Sets whether the Member is enrolled in MFA. If true, the Member must complete an MFA step whenever they
     * wish to log in to their Organization. If false, the Member only needs to complete an MFA step if the
     * Organization's MFA policy is set to `REQUIRED_FOR_ALL`.
     */
    mfa_enrolled: boolean;
    mfa_phone_number: string;
    trusted_metadata?: Record<string, any>;
    /**
     * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
     *   frontend SDK, and should not be used to store critical information. See the
     * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
     *   for complete field behavior details.
     */
    untrusted_metadata?: Record<string, any>;
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
export interface Organization {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    organization_name: string;
    organization_logo_url: string;
    /**
     * The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following
     * reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length.
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
     * Magic Link. The accepted values are:
     *
     *   `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be
     * provisioned upon authentication via Email Magic Link.
     *
     *   `NOT_ALLOWED` – disable JIT provisioning via Email Magic Link.
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
     *
     *   An array of allowed authentication methods. This list is enforced when `auth_methods` is set to
     * `RESTRICTED`.
     *   The list's accepted values are: `sso`, `magic_link`, `password`, `google_oauth`, and `microsoft_oauth`.
     *
     */
    allowed_auth_methods: string[];
    mfa_policy: string;
    trusted_metadata?: Record<string, any>;
    sso_default_connection_id?: string;
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
export interface B2BOrganizationsCreateRequest {
    organization_name: string;
    /**
     * The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following
     * reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length.
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
     * perform operations on an Organization, so be sure to preserve this value.
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
     * perform operations on an Organization, so be sure to preserve this value.
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
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    organization_name?: string;
    /**
     * The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following
     * reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length.
     */
    organization_slug?: string;
    organization_logo_url?: string;
    trusted_metadata?: Record<string, any>;
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
     */
    sso_jit_provisioning?: string;
    /**
     * An array of `connection_id`s that reference
     * [SAML Connection objects](https://stytch.com/docs/b2b/api/saml-connection-object).
     *   Only these connections will be allowed to JIT provision Members via SSO when `sso_jit_provisioning` is
     * set to `RESTRICTED`.
     */
    sso_jit_provisioning_allowed_connections?: string[];
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
export declare type OrganizationSearchOperand = {
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
};
export declare type MemberSearchOperand = {
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
export declare type SearchQueryOperand = OrganizationSearchOperand | MemberSearchOperand | {
    filter_name: string;
    [key: string]: unknown;
};
export declare class Organizations {
    private fetchConfig;
    members: Members;
    constructor(fetchConfig: fetchConfig);
    /**
     * Creates an Organization. An `organization_name` and a unique `organization_slug` are required.
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
     * Returns an Organization specified by `organization_id`.
     * @param data {@link B2BOrganizationsGetRequest}
     * @returns {@link B2BOrganizationsGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BOrganizationsGetRequest): Promise<B2BOrganizationsGetResponse>;
    /**
     * Updates an Organization specified by `organization_id`. An Organization must always have at least one
     * auth setting set to either `RESTRICTED` or `ALL_ALLOWED` in order to provision new Members.
     *
     * *See the [Organization authentication settings](https://stytch.com/docs/b2b/api/org-auth-settings)
     * resource to learn more about fields like `email_jit_provisioning`, `email_invites`,
     * `sso_jit_provisioning`, etc., and their behaviors.
     * @param data {@link B2BOrganizationsUpdateRequest}
     * @returns {@link B2BOrganizationsUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: B2BOrganizationsUpdateRequest): Promise<B2BOrganizationsUpdateResponse>;
    /**
     * Deletes an Organization specified by `organization_id`. All Members of the Organization will also be
     * deleted.
     * @param data {@link B2BOrganizationsDeleteRequest}
     * @returns {@link B2BOrganizationsDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: B2BOrganizationsDeleteRequest): Promise<B2BOrganizationsDeleteResponse>;
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
}
