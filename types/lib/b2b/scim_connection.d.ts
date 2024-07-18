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
    organization_id: string;
    display_name?: string;
    identity_provider?: "generic" | "okta" | "microsoft-entra" | "cyberark" | "jumpcloud" | "onelogin" | "pingfederate" | "rippling" | string;
}
export interface B2BSCIMConnectionCreateResponse {
    request_id: string;
    status_code: number;
    connection?: SCIMConnectionWithToken;
}
export interface B2BSCIMConnectionDeleteRequest {
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionDeleteResponse {
    request_id: string;
    connection_id: string;
    status_code: number;
}
export interface B2BSCIMConnectionGetGroupsRequest {
    organization_id: string;
    connection_id: string;
    cursor?: string;
    limit?: number;
}
export interface B2BSCIMConnectionGetGroupsResponse {
    scim_groups: SCIMGroup[];
    status_code: number;
    next_cursor?: string;
}
export interface B2BSCIMConnectionGetRequest {
    organization_id: string;
}
export interface B2BSCIMConnectionGetResponse {
    request_id: string;
    status_code: number;
    connection?: SCIMConnection;
}
export interface B2BSCIMConnectionRotateCancelRequest {
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionRotateCancelResponse {
    request_id: string;
    status_code: number;
    connection?: SCIMConnection;
}
export interface B2BSCIMConnectionRotateCompleteRequest {
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionRotateCompleteResponse {
    request_id: string;
    status_code: number;
    connection?: SCIMConnection;
}
export interface B2BSCIMConnectionRotateStartRequest {
    organization_id: string;
    connection_id: string;
}
export interface B2BSCIMConnectionRotateStartResponse {
    request_id: string;
    status_code: number;
    connection?: SCIMConnectionWithNextToken;
}
export interface B2BSCIMConnectionUpdateRequest {
    organization_id: string;
    connection_id: string;
    display_name?: string;
    identity_provider?: "generic" | "okta" | "microsoft-entra" | "cyberark" | "jumpcloud" | "onelogin" | "pingfederate" | "rippling" | string;
    scim_group_implicit_role_assignments?: SCIMGroupImplicitRoleAssignments[];
}
export interface B2BSCIMConnectionUpdateResponse {
    request_id: string;
    status_code: number;
    connection?: SCIMConnection;
}
export declare class Connection {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BSCIMConnectionUpdateRequest}
     * @param options {@link B2BSCIMConnectionUpdateRequestOptions}
     * @returns {@link B2BSCIMConnectionUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: B2BSCIMConnectionUpdateRequest, options?: B2BSCIMConnectionUpdateRequestOptions): Promise<B2BSCIMConnectionUpdateResponse>;
    /**
     * @param data {@link B2BSCIMConnectionDeleteRequest}
     * @param options {@link B2BSCIMConnectionDeleteRequestOptions}
     * @returns {@link B2BSCIMConnectionDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: B2BSCIMConnectionDeleteRequest, options?: B2BSCIMConnectionDeleteRequestOptions): Promise<B2BSCIMConnectionDeleteResponse>;
    /**
     * @param data {@link B2BSCIMConnectionRotateStartRequest}
     * @param options {@link B2BSCIMConnectionRotateStartRequestOptions}
     * @returns {@link B2BSCIMConnectionRotateStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateStart(data: B2BSCIMConnectionRotateStartRequest, options?: B2BSCIMConnectionRotateStartRequestOptions): Promise<B2BSCIMConnectionRotateStartResponse>;
    /**
     * @param data {@link B2BSCIMConnectionRotateCompleteRequest}
     * @param options {@link B2BSCIMConnectionRotateCompleteRequestOptions}
     * @returns {@link B2BSCIMConnectionRotateCompleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateComplete(data: B2BSCIMConnectionRotateCompleteRequest, options?: B2BSCIMConnectionRotateCompleteRequestOptions): Promise<B2BSCIMConnectionRotateCompleteResponse>;
    /**
     * @param data {@link B2BSCIMConnectionRotateCancelRequest}
     * @param options {@link B2BSCIMConnectionRotateCancelRequestOptions}
     * @returns {@link B2BSCIMConnectionRotateCancelResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateCancel(data: B2BSCIMConnectionRotateCancelRequest, options?: B2BSCIMConnectionRotateCancelRequestOptions): Promise<B2BSCIMConnectionRotateCancelResponse>;
    /**
     * @param params {@link B2BSCIMConnectionGetGroupsRequest}
     * @param options {@link B2BSCIMConnectionGetGroupsRequestOptions}
     * @returns {@link B2BSCIMConnectionGetGroupsResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getGroups(params: B2BSCIMConnectionGetGroupsRequest, options?: B2BSCIMConnectionGetGroupsRequestOptions): Promise<B2BSCIMConnectionGetGroupsResponse>;
    /**
     * @param data {@link B2BSCIMConnectionCreateRequest}
     * @param options {@link B2BSCIMConnectionCreateRequestOptions}
     * @returns {@link B2BSCIMConnectionCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BSCIMConnectionCreateRequest, options?: B2BSCIMConnectionCreateRequestOptions): Promise<B2BSCIMConnectionCreateResponse>;
    /**
     * @param params {@link B2BSCIMConnectionGetRequest}
     * @param options {@link B2BSCIMConnectionGetRequestOptions}
     * @returns {@link B2BSCIMConnectionGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BSCIMConnectionGetRequest, options?: B2BSCIMConnectionGetRequestOptions): Promise<B2BSCIMConnectionGetResponse>;
}
