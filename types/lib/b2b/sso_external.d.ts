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
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    external_organization_id: string;
    /**
     * Globally unique UUID that identifies a specific SSO connection configured for a different Organization
     * in your Project.
     */
    external_connection_id: string;
    display_name?: string;
    connection_implicit_role_assignments?: SAMLConnectionImplicitRoleAssignment[];
    group_implicit_role_assignments?: SAMLGroupImplicitRoleAssignment[];
}
export interface B2BSSOExternalCreateConnectionResponse {
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
     * The `External Connection` object affected by this API call. See the
     * [External Connection Object](https://stytch.com/docs/b2b/api/external-connection-object) for complete
     * response field details.
     */
    connection?: Connection;
}
export interface B2BSSOExternalUpdateConnectionRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    connection_id: string;
    display_name?: string;
    /**
     * All Members who log in with this External connection will implicitly receive the specified Roles. See
     * the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about
     * role assignment. Implicit role assignments are not supported for External connections if the underlying
     * SSO connection is an OIDC connection.
     */
    external_connection_implicit_role_assignments?: ConnectionImplicitRoleAssignment[];
    /**
     * Defines the names of the groups
     *  that grant specific role assignments. For each group-Role pair, if a Member logs in with this external
     * connection and
     *  belongs to the specified group, they will be granted the associated Role. See the
     *  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role
     * assignment. Before adding any group implicit role assignments to an external connection, you must add a
     * "groups" key to the underlying SAML connection's
     *          `attribute_mapping`. Make sure that the SAML connection IdP is configured to correctly send the
     * group information. Implicit role assignments are not supported
     *          for External connections if the underlying SSO connection is an OIDC connection.
     */
    external_group_implicit_role_assignments?: GroupImplicitRoleAssignment[];
}
export interface B2BSSOExternalUpdateConnectionResponse {
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
     * The `External Connection` object affected by this API call. See the
     * [External Connection Object](https://stytch.com/docs/b2b/api/external-connection-object) for complete
     * response field details.
     */
    connection?: Connection;
}
export declare class External {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create a new External SSO Connection.
     * @param data {@link B2BSSOExternalCreateConnectionRequest}
     * @param options {@link B2BSSOExternalCreateConnectionRequestOptions}
     * @returns {@link B2BSSOExternalCreateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    createConnection(data: B2BSSOExternalCreateConnectionRequest, options?: B2BSSOExternalCreateConnectionRequestOptions): Promise<B2BSSOExternalCreateConnectionResponse>;
    /**
     * Updates an existing External SSO connection.
     * @param data {@link B2BSSOExternalUpdateConnectionRequest}
     * @param options {@link B2BSSOExternalUpdateConnectionRequestOptions}
     * @returns {@link B2BSSOExternalUpdateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    updateConnection(data: B2BSSOExternalUpdateConnectionRequest, options?: B2BSSOExternalUpdateConnectionRequestOptions): Promise<B2BSSOExternalUpdateConnectionResponse>;
}
