import { fetchConfig } from "../shared";
export interface AuthorizationCheck {
    organization_id: string;
    resource_id: string;
    action: string;
}
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
export interface B2BRBACPolicyRequest {
}
export interface B2BRBACPolicyResponse {
    request_id: string;
    policy: Policy;
    status_code: number;
}
export declare class RBAC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BRBACPolicyRequest}
     * @returns {@link B2BRBACPolicyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    policy(params: B2BRBACPolicyRequest): Promise<B2BRBACPolicyResponse>;
}
