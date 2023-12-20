import { fetchConfig } from "../shared";
export interface Policy {
    roles: PolicyRole[];
    resources: PolicyResource[];
}
export interface PolicyResource {
    resource_id: string;
    description: string;
    actions: string[];
}
export interface PolicyRole {
    role_id: string;
    description: string;
    permissions: PolicyRolePermission[];
}
export interface PolicyRolePermission {
    resource_id: string;
    actions: string[];
}
export interface B2BRBACPolicyResponse {
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
     * [Dashboard](/dashboard). Read more about these entities and how they work in our
     * [RBAC overview](https://stytch.com/docs/b2b/guides/rbac/overview).
     */
    policy?: Policy;
}
export declare class RBAC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get the active RBAC Policy for your current Stytch Project. An RBAC Policy is the canonical document
     * that stores all defined Resources and Roles within your RBAC permissioning model.
     *
     * When using the backend SDKs, the RBAC Policy will automatically be loaded and refreshed in the
     * background to allow for local evaluations, eliminating the need for an extra request to Stytch.
     *
     * Resources and Roles can be created and managed within the [Dashboard](/dashboard). Additionally,
     * [Role assignment](https://stytch.com/docs/b2b/guides/rbac/role-assignment) can be programmatically
     * managed through certain Stytch API endpoints.
     *
     *
     * Check out the [RBAC overview](https://stytch.com/docs/b2b/guides/rbac/overview) to learn more about
     * Stytch's RBAC permissioning model.
     * @param params {@link B2BRBACPolicyRequest}
     * @returns {@link B2BRBACPolicyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    policy(): Promise<B2BRBACPolicyResponse>;
}
