import { fetchConfig } from "../shared";
export interface RBACPolicy {
    roles: RBACPolicyRole[];
    resources: RBACPolicyResource[];
    scopes: RBACPolicyScope[];
}
export interface RBACPolicyResource {
    resource_id: string;
    description: string;
    actions: string[];
}
export interface RBACPolicyRole {
    role_id: string;
    description: string;
    permissions: RBACPolicyRolePermission[];
}
export interface RBACPolicyRolePermission {
    resource_id: string;
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
    request_id: string;
    status_code: number;
    policy?: RBACPolicy;
}
export declare class RBAC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param params {@link RBACPolicyRequest}
     * @returns {@link RBACPolicyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    policy(): Promise<RBACPolicyResponse>;
}
