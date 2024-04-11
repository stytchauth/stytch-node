import { Authorization } from "../shared/method_options";
import { fetchConfig } from "../shared";
import { SCIMConnection, SCIMConnectionWithNextToken, SCIMConnectionWithToken, SCIMGroupImplicitRoleAssignments } from "./scim";
export interface B2BSCIMConnectionsCreateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionsDeleteRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionsGetRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionsRotateCancelRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionsRotateCompleteRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionsRotateStartRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionsUpdateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSCIMConnectionsCreateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    display_name?: string;
    identity_provider?: "unknown" | "okta" | "microsoft-entra" | "cyberark" | "jumpcloud" | "onelogin" | "pingfederate" | "rippling" | string;
}
export interface B2BSCIMConnectionsCreateResponse {
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
export interface B2BSCIMConnectionsDeleteRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionsDeleteResponse {
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
export interface B2BSCIMConnectionsGetRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
}
export interface B2BSCIMConnectionsGetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    connections: SCIMConnection[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BSCIMConnectionsRotateCancelRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionsRotateCancelResponse {
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
export interface B2BSCIMConnectionsRotateCompleteRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionsRotateCompleteResponse {
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
export interface B2BSCIMConnectionsRotateStartRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionsRotateStartResponse {
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
export interface B2BSCIMConnectionsUpdateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
    display_name?: string;
    identity_provider?: "unknown" | "okta" | "microsoft-entra" | string;
    scim_group_implicit_role_assignments?: SCIMGroupImplicitRoleAssignments[];
}
export interface B2BSCIMConnectionsUpdateResponse {
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
export declare class Connections {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Update a SCIM Connection. /%}
     * @param data {@link B2BSCIMConnectionsUpdateRequest}
     * @param options {@link B2BSCIMConnectionsUpdateRequestOptions}
     * @returns {@link B2BSCIMConnectionsUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: B2BSCIMConnectionsUpdateRequest, options?: B2BSCIMConnectionsUpdateRequestOptions): Promise<B2BSCIMConnectionsUpdateResponse>;
    /**
     * Deletes a SCIM Connection. /%}
     * @param data {@link B2BSCIMConnectionsDeleteRequest}
     * @param options {@link B2BSCIMConnectionsDeleteRequestOptions}
     * @returns {@link B2BSCIMConnectionsDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: B2BSCIMConnectionsDeleteRequest, options?: B2BSCIMConnectionsDeleteRequestOptions): Promise<B2BSCIMConnectionsDeleteResponse>;
    /**
     * Start a SCIM token rotation. /%}
     * @param data {@link B2BSCIMConnectionsRotateStartRequest}
     * @param options {@link B2BSCIMConnectionsRotateStartRequestOptions}
     * @returns {@link B2BSCIMConnectionsRotateStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateStart(data: B2BSCIMConnectionsRotateStartRequest, options?: B2BSCIMConnectionsRotateStartRequestOptions): Promise<B2BSCIMConnectionsRotateStartResponse>;
    /**
     * Completes a SCIM token rotation. This will complete the current token rotation process and update the
     * active token to be the new token supplied in the
     * [start SCIM token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start) response. /%}
     * @param data {@link B2BSCIMConnectionsRotateCompleteRequest}
     * @param options {@link B2BSCIMConnectionsRotateCompleteRequestOptions}
     * @returns {@link B2BSCIMConnectionsRotateCompleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateComplete(data: B2BSCIMConnectionsRotateCompleteRequest, options?: B2BSCIMConnectionsRotateCompleteRequestOptions): Promise<B2BSCIMConnectionsRotateCompleteResponse>;
    /**
     * Cancel a SCIM token rotation. This will cancel the current token rotation process, keeping the original
     * token active. /%}
     * @param data {@link B2BSCIMConnectionsRotateCancelRequest}
     * @param options {@link B2BSCIMConnectionsRotateCancelRequestOptions}
     * @returns {@link B2BSCIMConnectionsRotateCancelResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateCancel(data: B2BSCIMConnectionsRotateCancelRequest, options?: B2BSCIMConnectionsRotateCancelRequestOptions): Promise<B2BSCIMConnectionsRotateCancelResponse>;
    /**
     * Create a new SCIM Connection. /%}
     * @param data {@link B2BSCIMConnectionsCreateRequest}
     * @param options {@link B2BSCIMConnectionsCreateRequestOptions}
     * @returns {@link B2BSCIMConnectionsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BSCIMConnectionsCreateRequest, options?: B2BSCIMConnectionsCreateRequestOptions): Promise<B2BSCIMConnectionsCreateResponse>;
    /**
     * Get SCIM Connections. /%}
     * @param params {@link B2BSCIMConnectionsGetRequest}
     * @param options {@link B2BSCIMConnectionsGetRequestOptions}
     * @returns {@link B2BSCIMConnectionsGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BSCIMConnectionsGetRequest, options?: B2BSCIMConnectionsGetRequestOptions): Promise<B2BSCIMConnectionsGetResponse>;
}
