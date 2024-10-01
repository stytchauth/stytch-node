import { Authorization } from "../shared/method_options";
import { Connection, ConnectionImplicitRoleAssignment, GroupImplicitRoleAssignment, SAMLConnectionImplicitRoleAssignment, SAMLGroupImplicitRoleAssignment } from "./sso";
import { fetchConfig } from "../shared";
export interface B2BSSOExternalCreateConnectionRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSSOExternalUpdateConnectionRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSSOExternalCreateConnectionRequest {
    organization_id: string;
    external_organization_id: string;
    external_connection_id: string;
    display_name?: string;
    connection_implicit_role_assignments?: SAMLConnectionImplicitRoleAssignment[];
    group_implicit_role_assignments?: SAMLGroupImplicitRoleAssignment[];
}
export interface B2BSSOExternalCreateConnectionResponse {
    request_id: string;
    status_code: number;
    connection?: Connection;
}
export interface B2BSSOExternalUpdateConnectionRequest {
    organization_id: string;
    connection_id: string;
    display_name?: string;
    external_connection_implicit_role_assignments?: ConnectionImplicitRoleAssignment[];
    external_group_implicit_role_assignments?: GroupImplicitRoleAssignment[];
}
export interface B2BSSOExternalUpdateConnectionResponse {
    request_id: string;
    status_code: number;
    connection?: Connection;
}
export declare class External {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BSSOExternalCreateConnectionRequest}
     * @param options {@link B2BSSOExternalCreateConnectionRequestOptions}
     * @returns {@link B2BSSOExternalCreateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    createConnection(data: B2BSSOExternalCreateConnectionRequest, options?: B2BSSOExternalCreateConnectionRequestOptions): Promise<B2BSSOExternalCreateConnectionResponse>;
    /**
     * @param data {@link B2BSSOExternalUpdateConnectionRequest}
     * @param options {@link B2BSSOExternalUpdateConnectionRequestOptions}
     * @returns {@link B2BSSOExternalUpdateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    updateConnection(data: B2BSSOExternalUpdateConnectionRequest, options?: B2BSSOExternalUpdateConnectionRequestOptions): Promise<B2BSSOExternalUpdateConnectionResponse>;
}
