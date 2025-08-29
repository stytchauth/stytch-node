import { fetchConfig } from "../shared";
export interface RBACPolicy {
    roles: RBACPolicyRole[];
    resources: RBACPolicyResource[];
    scopes: RBACPolicyScope[];
}
export interface RBACPolicyResource {
    /**
     * A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.
     *
     *   A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch
     * default Resources with reserved `resource_id`s.
     *
     */
    resource_id: string;
    description: string;
    actions: string[];
}
export interface RBACPolicyRole {
    /**
     * The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.
     *
     *   The `stytch_user` `role_id` is predefined by Stytch.
     *   Check out the [RBAC guide](https://stytch.com/docs/guides/rbac/overview) for a more detailed
     * explanation.
     *
     */
    role_id: string;
    description: string;
    /**
     * A list of permissions that link a [Resource](https://stytch.com/docs/api/rbac-resource-object) to a list
     * of actions.
     */
    permissions: RBACPolicyRolePermission[];
}
export interface RBACPolicyRolePermission {
    /**
     * A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.
     *
     *   A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch
     * default Resources with reserved `resource_id`s.
     *
     */
    resource_id: string;
    /**
     * A list of permitted actions the Role is authorized to take with the provided Resource. You can use `*`
     * as a wildcard to grant a Role permission to use all possible actions related to the Resource.
     */
    actions: string[];
}
export interface RBACPolicyScope {
    scope: string;
    description: string;
    permissions: RBACPolicyScopePermission[];
}
export interface RBACPolicyScopePermission {
    resource_id: string;
    actions: string[];
}
export interface RBACPolicyResponse {
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
     * The RBAC Policy document that contains all defined Roles and Resources – which are managed in the
     * [Dashboard](https://stytch.com/dashboard/rbac). Read more about these entities and how they work in our
     * [RBAC overview](https://stytch.com/docs/guides/rbac/overview).
     */
    policy?: RBACPolicy;
}
export declare class RBAC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get the active RBAC Policy for your current Stytch Project. An RBAC Policy is the canonical document
     * that stores all defined Resources and Roles within your RBAC permissioning model.
     *
     * When using the backend SDKs, the RBAC Policy will be cached to allow for local evaluations, eliminating
     * the need for an extra request to Stytch.
     * The policy will be refreshed if an authorization check is requested and the RBAC policy was last updated
     * more than 5 minutes ago.
     *
     * Resources and Roles can be created and managed within the [RBAC page](https://stytch.com/dashboard/rbac)
     * in the Dashboard.
     * Additionally, [Role assignment](https://stytch.com/docs/guides/rbac/role-assignment) can be
     * programmatically managed through certain Stytch API endpoints.
     *
     * Check out the [RBAC overview](https://stytch.com/docs/guides/rbac/overview) to learn more about Stytch's
     * RBAC permissioning model.
     * @param params {@link RBACPolicyRequest}
     * @returns {@link RBACPolicyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    policy(): Promise<RBACPolicyResponse>;
}
