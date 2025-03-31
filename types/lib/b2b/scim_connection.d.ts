import { Authorization } from "../shared/method_options";
import { fetchConfig } from "../shared";
import { SCIMConnection, SCIMConnectionWithNextToken, SCIMConnectionWithToken, SCIMGroup, SCIMGroupImplicitRoleAssignments } from "./scim";
export interface B2BSCIMConnectionCreateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionDeleteRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionGetGroupsRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionGetRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionRotateCancelRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionRotateCompleteRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionRotateStartRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionUpdateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionCreateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    display_name?: string;
    identity_provider?: "generic" | "okta" | "microsoft-entra" | "cyberark" | "jumpcloud" | "onelogin" | "pingfederate" | "rippling" | string;
}
export interface B2BSCIMConnectionCreateResponse {
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
     * The `SCIM Connection` object affected by this API call. See the
     * [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object) for complete response
     * field details.
     */
    connection?: SCIMConnectionWithToken;
}
export interface B2BSCIMConnectionDeleteRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionDeleteResponse {
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
export interface B2BSCIMConnectionGetGroupsRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    connection_id: string;
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
}
export interface B2BSCIMConnectionGetGroupsResponse {
    scim_groups: SCIMGroup[];
    status_code: number;
    /**
     * The `next_cursor` string is returned when your search result contains more than one page of results.
     * This value is passed into your next search call in the `cursor` field.
     */
    next_cursor?: string;
}
export interface B2BSCIMConnectionGetRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
}
export interface B2BSCIMConnectionGetResponse {
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
     * A [SCIM Connection](https://stytch.com/docs/b2b/api/scim-connection-object) connection belonging to the
     * organization (currently limited to one).
     */
    connection?: SCIMConnection;
}
export interface B2BSCIMConnectionRotateCancelRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionRotateCancelResponse {
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
     * The `SCIM Connection` object affected by this API call. See the
     * [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object) for complete response
     * field details.
     */
    connection?: SCIMConnection;
}
export interface B2BSCIMConnectionRotateCompleteRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionRotateCompleteResponse {
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
     * The `SCIM Connection` object affected by this API call. See the
     * [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object) for complete response
     * field details.
     */
    connection?: SCIMConnection;
}
export interface B2BSCIMConnectionRotateStartRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionRotateStartResponse {
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
     * The `SCIM Connection` object affected by this API call. See the
     * [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object) for complete response
     * field details.
     */
    connection?: SCIMConnectionWithNextToken;
}
export interface B2BSCIMConnectionUpdateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    connection_id: string;
    display_name?: string;
    identity_provider?: "generic" | "okta" | "microsoft-entra" | "cyberark" | "jumpcloud" | "onelogin" | "pingfederate" | "rippling" | string;
    /**
     * An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and
     * a `role_id`.
     */
    scim_group_implicit_role_assignments?: SCIMGroupImplicitRoleAssignments[];
}
export interface B2BSCIMConnectionUpdateResponse {
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
     * The `SAML Connection` object affected by this API call. See the
     * [SAML Connection Object](https://stytch.com/docs/b2b/api/saml-connection-object) for complete response
     * field details.
     */
    connection?: SCIMConnection;
}
export declare class Connection {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Update a SCIM Connection.
     * @param data {@link B2BSCIMConnectionUpdateRequest}
     * @param options {@link B2BSCIMConnectionUpdateRequestOptions}
     * @returns {@link B2BSCIMConnectionUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: B2BSCIMConnectionUpdateRequest, options?: B2BSCIMConnectionUpdateRequestOptions): Promise<B2BSCIMConnectionUpdateResponse>;
    /**
     * Deletes a SCIM Connection.
     * @param data {@link B2BSCIMConnectionDeleteRequest}
     * @param options {@link B2BSCIMConnectionDeleteRequestOptions}
     * @returns {@link B2BSCIMConnectionDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: B2BSCIMConnectionDeleteRequest, options?: B2BSCIMConnectionDeleteRequestOptions): Promise<B2BSCIMConnectionDeleteResponse>;
    /**
     * Start a SCIM token rotation.
     * @param data {@link B2BSCIMConnectionRotateStartRequest}
     * @param options {@link B2BSCIMConnectionRotateStartRequestOptions}
     * @returns {@link B2BSCIMConnectionRotateStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateStart(data: B2BSCIMConnectionRotateStartRequest, options?: B2BSCIMConnectionRotateStartRequestOptions): Promise<B2BSCIMConnectionRotateStartResponse>;
    /**
     * Completes a SCIM token rotation. This will complete the current token rotation process and update the
     * active token to be the new token supplied in the
     * [start SCIM token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start) response.
     * @param data {@link B2BSCIMConnectionRotateCompleteRequest}
     * @param options {@link B2BSCIMConnectionRotateCompleteRequestOptions}
     * @returns {@link B2BSCIMConnectionRotateCompleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateComplete(data: B2BSCIMConnectionRotateCompleteRequest, options?: B2BSCIMConnectionRotateCompleteRequestOptions): Promise<B2BSCIMConnectionRotateCompleteResponse>;
    /**
     * Cancel a SCIM token rotation. This will cancel the current token rotation process, keeping the original
     * token active.
     * @param data {@link B2BSCIMConnectionRotateCancelRequest}
     * @param options {@link B2BSCIMConnectionRotateCancelRequestOptions}
     * @returns {@link B2BSCIMConnectionRotateCancelResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateCancel(data: B2BSCIMConnectionRotateCancelRequest, options?: B2BSCIMConnectionRotateCancelRequestOptions): Promise<B2BSCIMConnectionRotateCancelResponse>;
    /**
     * Gets a paginated list of all SCIM Groups associated with a given Connection.
     * @param params {@link B2BSCIMConnectionGetGroupsRequest}
     * @param options {@link B2BSCIMConnectionGetGroupsRequestOptions}
     * @returns {@link B2BSCIMConnectionGetGroupsResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getGroups(params: B2BSCIMConnectionGetGroupsRequest, options?: B2BSCIMConnectionGetGroupsRequestOptions): Promise<B2BSCIMConnectionGetGroupsResponse>;
    /**
     * Create a new SCIM Connection.
     * @param data {@link B2BSCIMConnectionCreateRequest}
     * @param options {@link B2BSCIMConnectionCreateRequestOptions}
     * @returns {@link B2BSCIMConnectionCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BSCIMConnectionCreateRequest, options?: B2BSCIMConnectionCreateRequestOptions): Promise<B2BSCIMConnectionCreateResponse>;
    /**
     * Get SCIM Connection.
     * @param params {@link B2BSCIMConnectionGetRequest}
     * @param options {@link B2BSCIMConnectionGetRequestOptions}
     * @returns {@link B2BSCIMConnectionGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BSCIMConnectionGetRequest, options?: B2BSCIMConnectionGetRequestOptions): Promise<B2BSCIMConnectionGetResponse>;
}
