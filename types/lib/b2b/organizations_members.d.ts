import { B2BOrganizationsResultsMetadata, Member, Organization, SearchQuery } from "./organizations";
import { fetchConfig } from "../shared";
export interface B2BMembersCreateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
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
    phone_number?: string;
    mfa_enrolled?: boolean;
}
export interface B2BMembersCreateResponse {
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
export interface B2BMembersDeletePasswordRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    member_password_id: string;
}
export interface B2BMembersDeletePasswordResponse {
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
export interface B2BMembersDeletePhoneNumberRequest {
    organization_id: string;
    member_id: string;
}
export interface B2BMembersDeletePhoneNumberResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    status_code: number;
}
export interface B2BMembersDeleteRequest {
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
}
export interface B2BMembersDeleteResponse {
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
export interface B2BMembersGetRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
     */
    member_id?: string;
    email_address?: string;
}
export interface B2BMembersGetResponse {
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
export interface B2BMembersSearchRequest {
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
     * you include no query object, it will return all Organizations with no filtering applied.
     */
    query?: SearchQuery;
}
export interface B2BMembersSearchResponse {
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
export interface B2BMembersUpdateRequest {
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
     * Identifies the Member as a break glass user - someone who has permissions to authenticate into an
     * Organization by bypassing the Organization's settings. A break glass account is typically used for
     * emergency purposes to gain access outside of normal authentication procedures. Refer to the
     * [Organization object](organization-object) and its `auth_methods` and `allowed_auth_methods` fields for
     * more details.
     */
    is_breakglass?: boolean;
    phone_number?: string;
    mfa_enrolled?: boolean;
}
export interface B2BMembersUpdateResponse {
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
    constructor(fetchConfig: fetchConfig);
    update(data: B2BMembersUpdateRequest): Promise<B2BMembersUpdateResponse>;
    delete(data: B2BMembersDeleteRequest): Promise<B2BMembersDeleteResponse>;
    deletePhoneNumber(data: B2BMembersDeletePhoneNumberRequest): Promise<B2BMembersDeletePhoneNumberResponse>;
    /**
     * Search for Members within specified Organizations. An array with at least one `organization_id` is
     * required. Submitting an empty `query` returns all Members within the specified Organizations.
     *
     * *All fuzzy search filters require a minimum of three characters.
     */
    search(data: B2BMembersSearchRequest): Promise<B2BMembersSearchResponse>;
    deletePassword(data: B2BMembersDeletePasswordRequest): Promise<B2BMembersDeletePasswordResponse>;
    create(data: B2BMembersCreateRequest): Promise<B2BMembersCreateResponse>;
    get(params: B2BMembersGetRequest): Promise<B2BMembersGetResponse>;
}
