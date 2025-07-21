import { fetchConfig } from "../shared";
export interface ConsumerRBACPolicy {
    roles: ConsumerRBACPolicyRole[];
    resources: ConsumerRBACPolicyResource[];
    scopes: ConsumerRBACPolicyScope[];
}
export interface ConsumerRBACPolicyResource {
    resource_id: string;
    description: string;
    actions: string[];
}
export interface ConsumerRBACPolicyRole {
    role_id: string;
    description: string;
    permissions: ConsumerRBACPolicyRolePermission[];
}
export interface ConsumerRBACPolicyRolePermission {
    resource_id: string;
    actions: string[];
}
export interface ConsumerRBACPolicyScope {
    scope: string;
    description: string;
    permissions: ConsumerRBACPolicyScopePermission[];
}
export interface ConsumerRBACPolicyScopePermission {
    resource_id: string;
    actions: string[];
}
export interface ConsumerRBACPolicyResponse {
    request_id: string;
    status_code: number;
    policy?: ConsumerRBACPolicy;
}
export declare class ConsumerRBAC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param params {@link ConsumerRBACPolicyRequest}
     * @returns {@link ConsumerRBACPolicyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    policy(): Promise<ConsumerRBACPolicyResponse>;
}
