import { fetchConfig } from "../shared";
import { RBAC } from "./consumer_rbac_rbac";
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
export declare class ConsumerRBAC {
    private fetchConfig;
    rbac: RBAC;
    constructor(fetchConfig: fetchConfig);
}
