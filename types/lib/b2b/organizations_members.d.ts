import { Authorization } from "../shared/method_options";
import { B2BOrganizationsResultsMetadata, Member, OIDCProviderInfo, Organization, SearchQuery } from "./organizations";
import { fetchConfig } from "../shared";
import { OAuthProviders } from "./organizations_members_oauth_providers";
export interface B2BOrganizationsMembersCreateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersDeleteMFAPhoneNumberRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersDeletePasswordRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersDeleteRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersDeleteTOTPRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersReactivateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersSearchRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersUnlinkRetiredEmailRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersUpdateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersCreateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    email_address: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    /**
     * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
     *   frontend SDK, and should not be used to store critical information. See the
     * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
     *   for complete field behavior details.
     */
    untrusted_metadata?: Record<string, any>;
    /**
     * Flag for whether or not to save a Member as `pending` or `active` in Stytch. It defaults to false. If
     * true, new Members will be created with status `pending` in Stytch's backend. Their status will remain
     * `pending` and they will continue to receive signup email templates for every Email Magic Link until that
     * Member authenticates and becomes `active`. If false, new Members will be created with status `active`.
     */
    create_member_as_pending?: boolean;
    /**
     * Identifies the Member as a break glass user - someone who has permissions to authenticate into an
     * Organization by bypassing the Organization's settings. A break glass account is typically used for
     * emergency purposes to gain access outside of normal authentication procedures. Refer to the
     * [Organization object](organization-object) and its `auth_methods` and `allowed_auth_methods` fields for
     * more details.
     */
    is_breakglass?: boolean;
    mfa_phone_number?: string;
    /**
     * Sets whether the Member is enrolled in MFA. If true, the Member must complete an MFA step whenever they
     * wish to log in to their Organization. If false, the Member only needs to complete an MFA step if the
     * Organization's MFA policy is set to `REQUIRED_FOR_ALL`.
     */
    mfa_enrolled?: boolean;
    /**
     * Roles to explicitly assign to this Member. See the
     * [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)
     *    for more information about role assignment.
     */
    roles?: string[];
    /**
     * An identifier that can be used in API calls wherever a member_id is expected. This is a string
     * consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters.
     * External IDs must be unique within an organization, but may be reused across different organizations in
     * the same project.
     */
    external_id?: string;
}
export interface B2BOrganizationsMembersCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersDangerouslyGetRequest {
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
     */
    member_id: string;
    include_deleted?: boolean;
}
export interface B2BOrganizationsMembersDeleteMFAPhoneNumberRequest {
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
}
export interface B2BOrganizationsMembersDeleteMFAPhoneNumberResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersDeletePasswordRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    member_password_id: string;
}
export interface B2BOrganizationsMembersDeletePasswordResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersDeleteRequest {
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
}
export interface B2BOrganizationsMembersDeleteResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersDeleteTOTPRequest {
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
}
export interface B2BOrganizationsMembersDeleteTOTPResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersGetRequest {
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
    member_id?: string;
    email_address?: string;
}
export interface B2BOrganizationsMembersGetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersOIDCProviderInformationRequest {
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
    /**
     * Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false.
     * **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically
     * refresh access tokens in the future.
     */
    include_refresh_token?: boolean;
}
export interface B2BOrganizationsMembersOIDCProvidersResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    registrations: OIDCProviderInfo[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersReactivateRequest {
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
}
export interface B2BOrganizationsMembersReactivateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersSearchRequest {
    organization_ids: string[];
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
     * you include no query object, it will return all Members with no filtering applied.
     */
    query?: SearchQuery;
}
export interface B2BOrganizationsMembersSearchResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    members: Member[];
    /**
     * The search `results_metadata` object contains metadata relevant to your specific query like `total` and
     * `next_cursor`.
     */
    results_metadata: B2BOrganizationsResultsMetadata;
    /**
     * A map from `organization_id` to
     * [Organization object](https://stytch.com/docs/b2b/api/organization-object). The map only contains the
     * Organizations that the Members belongs to.
     */
    organizations: Record<string, Organization>;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersUnlinkRetiredEmailRequest {
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
    email_id?: string;
    email_address?: string;
}
export interface B2BOrganizationsMembersUnlinkRetiredEmailResponse {
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
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOrganizationsMembersUpdateRequest {
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
    /**
     * The name of the Member.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.info.name` action on the `stytch.member` Resource. Alternatively, if
     * the Member Session matches the Member associated with the `member_id` passed in the request, the
     * authorization check will also allow a Member Session that has permission to perform the
     * `update.info.name` action on the `stytch.self` Resource.
     */
    name?: string;
    /**
     * An arbitrary JSON object for storing application-specific data or identity-provider-specific data.
     *           If a session header is passed into the request, this field may **not** be passed into the
     * request. You cannot
     *           update trusted metadata when acting as a Member.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
     *   frontend SDK, and should not be used to store critical information. See the
     * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
     *   for complete field behavior details.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.info.untrusted-metadata` action on the `stytch.member` Resource.
     * Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the
     * request, the authorization check will also allow a Member Session that has permission to perform the
     * `update.info.untrusted-metadata` action on the `stytch.self` Resource.
     */
    untrusted_metadata?: Record<string, any>;
    /**
     * Identifies the Member as a break glass user - someone who has permissions to authenticate into an
     * Organization by bypassing the Organization's settings. A break glass account is typically used for
     * emergency purposes to gain access outside of normal authentication procedures. Refer to the
     * [Organization object](organization-object) and its `auth_methods` and `allowed_auth_methods` fields for
     * more details.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.is-breakglass` action on the `stytch.member` Resource.
     */
    is_breakglass?: boolean;
    /**
     * Sets the Member's phone number. Throws an error if the Member already has a phone number. To change the
     * Member's phone number, use the
     * [Delete member phone number endpoint](https://stytch.com/docs/b2b/api/delete-member-mfa-phone-number) to
     * delete the Member's existing phone number first.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.info.mfa-phone` action on the `stytch.member` Resource. Alternatively,
     * if the Member Session matches the Member associated with the `member_id` passed in the request, the
     * authorization check will also allow a Member Session that has permission to perform the
     * `update.info.mfa-phone` action on the `stytch.self` Resource.
     */
    mfa_phone_number?: string;
    /**
     * Sets whether the Member is enrolled in MFA. If true, the Member must complete an MFA step whenever they
     * wish to log in to their Organization. If false, the Member only needs to complete an MFA step if the
     * Organization's MFA policy is set to `REQUIRED_FOR_ALL`.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.mfa-enrolled` action on the `stytch.member` Resource.
     * Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the
     * request, the authorization check will also allow a Member Session that has permission to perform the
     * `update.settings.mfa-enrolled` action on the `stytch.self` Resource.
     */
    mfa_enrolled?: boolean;
    /**
     * Roles to explicitly assign to this Member.
     *  Will completely replace any existing explicitly assigned roles. See the
     *  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role
     * assignment.
     *
     *    If a Role is removed from a Member, and the Member is also implicitly assigned this Role from an SSO
     * connection
     *    or an SSO group, we will by default revoke any existing sessions for the Member that contain any SSO
     *    authentication factors with the affected connection ID. You can preserve these sessions by passing in
     * the
     *    `preserve_existing_sessions` parameter with a value of `true`.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.roles` action on the `stytch.member` Resource.
     */
    roles?: string[];
    /**
     * Whether to preserve existing sessions when explicit Roles that are revoked are also implicitly assigned
     *   by SSO connection or SSO group. Defaults to `false` - that is, existing Member Sessions that contain
     * SSO
     *   authentication factors with the affected SSO connection IDs will be revoked.
     */
    preserve_existing_sessions?: boolean;
    /**
     * The Member's default MFA method. This value is used to determine which secondary MFA method to use in
     * the case of multiple methods registered for a Member. The current possible values are `sms_otp` and
     * `totp`.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.settings.default-mfa-method` action on the `stytch.member` Resource.
     * Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the
     * request, the authorization check will also allow a Member Session that has permission to perform the
     * `update.settings.default-mfa-method` action on the `stytch.self` Resource.
     */
    default_mfa_method?: string;
    /**
     * Updates the Member's `email_address`, if provided.
     *         If a Member's email address is changed, other Members in the same Organization cannot use the
     * old email address, although the Member may update back to their old email address.
     *         A Member's email address can only be useable again by other Members if the Member is deleted.
     *
     * If this field is provided and a session header is passed into the request, the Member Session must have
     * permission to perform the `update.info.email` action on the `stytch.member` Resource. Members cannot
     * update their own email address.
     */
    email_address?: string;
    /**
     * An identifier that can be used in API calls wherever a member_id is expected. This is a string
     * consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters.
     * External IDs must be unique within an organization, but may be reused across different organizations in
     * the same project.
     */
    external_id?: string;
}
export interface B2BOrganizationsMembersUpdateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Members {
    private fetchConfig;
    oauthProviders: OAuthProviders;
    constructor(fetchConfig: fetchConfig);
    /**
     * Updates a specified by `organization_id` and `member_id`.
     * @param data {@link B2BOrganizationsMembersUpdateRequest}
     * @param options {@link B2BOrganizationsMembersUpdateRequestOptions}
     * @returns {@link B2BOrganizationsMembersUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: B2BOrganizationsMembersUpdateRequest, options?: B2BOrganizationsMembersUpdateRequestOptions): Promise<B2BOrganizationsMembersUpdateResponse>;
    /**
     * Deletes a specified by `organization_id` and `member_id`.
     * @param data {@link B2BOrganizationsMembersDeleteRequest}
     * @param options {@link B2BOrganizationsMembersDeleteRequestOptions}
     * @returns {@link B2BOrganizationsMembersDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: B2BOrganizationsMembersDeleteRequest, options?: B2BOrganizationsMembersDeleteRequestOptions): Promise<B2BOrganizationsMembersDeleteResponse>;
    /**
     * Reactivates a deleted's status and its associated email status (if applicable) to active, specified by
     * `organization_id` and `member_id`. This endpoint will only work for Members with at least one verified
     * email where their `email_address_verified` is `true`.
     * @param data {@link B2BOrganizationsMembersReactivateRequest}
     * @param options {@link B2BOrganizationsMembersReactivateRequestOptions}
     * @returns {@link B2BOrganizationsMembersReactivateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    reactivate(data: B2BOrganizationsMembersReactivateRequest, options?: B2BOrganizationsMembersReactivateRequestOptions): Promise<B2BOrganizationsMembersReactivateResponse>;
    /**
     * Delete a's MFA phone number.
     *
     * To change a Member's phone number, you must first call this endpoint to delete the existing phone number.
     *
     * Existing Member Sessions that include a phone number authentication factor will not be revoked if the
     * phone number is deleted, and MFA will not be enforced until the Member logs in again.
     * If you wish to enforce MFA immediately after a phone number is deleted, you can do so by prompting the
     * Member to enter a new phone number
     * and calling the [OTP SMS send](https://stytch.com/docs/b2b/api/otp-sms-send) endpoint, then calling the
     * [OTP SMS Authenticate](https://stytch.com/docs/b2b/api/authenticate-otp-sms) endpoint.
     * @param data {@link B2BOrganizationsMembersDeleteMFAPhoneNumberRequest}
     * @param options {@link B2BOrganizationsMembersDeleteMFAPhoneNumberRequestOptions}
     * @returns {@link B2BOrganizationsMembersDeleteMFAPhoneNumberResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteMFAPhoneNumber(data: B2BOrganizationsMembersDeleteMFAPhoneNumberRequest, options?: B2BOrganizationsMembersDeleteMFAPhoneNumberRequestOptions): Promise<B2BOrganizationsMembersDeleteMFAPhoneNumberResponse>;
    /**
     * Delete a Member's MFA TOTP registration.
     *
     * To mint a new registration for a Member, you must first call this endpoint to delete the existing
     * registration.
     *
     * Existing Member Sessions that include the TOTP authentication factor will not be revoked if the
     * registration is deleted, and MFA will not be enforced until the Member logs in again.
     * @param data {@link B2BOrganizationsMembersDeleteTOTPRequest}
     * @param options {@link B2BOrganizationsMembersDeleteTOTPRequestOptions}
     * @returns {@link B2BOrganizationsMembersDeleteTOTPResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteTOTP(data: B2BOrganizationsMembersDeleteTOTPRequest, options?: B2BOrganizationsMembersDeleteTOTPRequestOptions): Promise<B2BOrganizationsMembersDeleteTOTPResponse>;
    /**
     * Search for Members within specified Organizations. An array with at least one `organization_id` is
     * required. Submitting an empty `query` returns all non-deleted Members within the specified Organizations.
     *
     * *All fuzzy search filters require a minimum of three characters.
     * @param data {@link B2BOrganizationsMembersSearchRequest}
     * @param options {@link B2BOrganizationsMembersSearchRequestOptions}
     * @returns {@link B2BOrganizationsMembersSearchResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    search(data: B2BOrganizationsMembersSearchRequest, options?: B2BOrganizationsMembersSearchRequestOptions): Promise<B2BOrganizationsMembersSearchResponse>;
    /**
     * Delete a's password.
     * @param data {@link B2BOrganizationsMembersDeletePasswordRequest}
     * @param options {@link B2BOrganizationsMembersDeletePasswordRequestOptions}
     * @returns {@link B2BOrganizationsMembersDeletePasswordResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deletePassword(data: B2BOrganizationsMembersDeletePasswordRequest, options?: B2BOrganizationsMembersDeletePasswordRequestOptions): Promise<B2BOrganizationsMembersDeletePasswordResponse>;
    /**
     * Get a Member by `member_id`. This endpoint does not require an `organization_id`, enabling you to get
     * members across organizations. This is a dangerous operation. Incorrect use may open you up to indirect
     * object reference (IDOR) attacks. We recommend using the
     * [Get Member](https://stytch.com/docs/b2b/api/get-member) API instead.
     * @param params {@link B2BOrganizationsMembersDangerouslyGetRequest}
     * @returns {@link B2BOrganizationsMembersGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    dangerouslyGet(params: B2BOrganizationsMembersDangerouslyGetRequest): Promise<B2BOrganizationsMembersGetResponse>;
    /**
     * Retrieve the saved OIDC access tokens and ID tokens for a member. After a successful OIDC login, Stytch
     * will save the
     * issued access token and ID token from the identity provider. If a refresh token has been issued, Stytch
     * will refresh the
     * access token automatically.
     * @param params {@link B2BOrganizationsMembersOIDCProviderInformationRequest}
     * @returns {@link B2BOrganizationsMembersOIDCProvidersResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    oidcProviders(params: B2BOrganizationsMembersOIDCProviderInformationRequest): Promise<B2BOrganizationsMembersOIDCProvidersResponse>;
    /**
     * Unlinks a retired email address from a specified by their `organization_id` and `member_id`. The email
     * address
     * to be retired can be identified in the request body by either its `email_id`, its `email_address`, or
     * both. If using
     * both identifiers they must refer to the same email.
     *
     * A previously active email address can be marked as retired in one of two ways:
     *
     * - It's replaced with a new primary email address during an explicit Member update.
     * - A new email address is surfaced by an OAuth, SAML or OIDC provider. In this case the new email address
     * becomes the
     *   Member's primary email address and the old primary email address is retired.
     *
     * A retired email address cannot be used by other Members in the same Organization. However, unlinking
     * retired email
     * addresses allows them to be subsequently re-used by other Organization Members. Retired email addresses
     * can be viewed
     * on the [Member object](https://stytch.com/docs/b2b/api/member-object).
     *  %}
     * @param data {@link B2BOrganizationsMembersUnlinkRetiredEmailRequest}
     * @param options {@link B2BOrganizationsMembersUnlinkRetiredEmailRequestOptions}
     * @returns {@link B2BOrganizationsMembersUnlinkRetiredEmailResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    unlinkRetiredEmail(data: B2BOrganizationsMembersUnlinkRetiredEmailRequest, options?: B2BOrganizationsMembersUnlinkRetiredEmailRequestOptions): Promise<B2BOrganizationsMembersUnlinkRetiredEmailResponse>;
    /**
     * Creates a. An `organization_id` and `email_address` are required.
     * @param data {@link B2BOrganizationsMembersCreateRequest}
     * @param options {@link B2BOrganizationsMembersCreateRequestOptions}
     * @returns {@link B2BOrganizationsMembersCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BOrganizationsMembersCreateRequest, options?: B2BOrganizationsMembersCreateRequestOptions): Promise<B2BOrganizationsMembersCreateResponse>;
    /**
     * Get a Member by `member_id` or `email_address`.
     * @param params {@link B2BOrganizationsMembersGetRequest}
     * @returns {@link B2BOrganizationsMembersGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BOrganizationsMembersGetRequest): Promise<B2BOrganizationsMembersGetResponse>;
}
