import { RBACPolicy } from "./rbac";
import { PolicyCache as BasePolicyCache, baseRoleAuthorizationCheckArgs, baseScopeAuthorizationCheckArgs } from "../shared/rbac_local";
export declare class PolicyCache extends BasePolicyCache<RBACPolicy> {
}
export declare function performAuthorizationCheck({ policyRoles, subjectRoles, authorizationCheck, }: Omit<baseRoleAuthorizationCheckArgs, "callerType">): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, authorizationCheck, }: Omit<baseScopeAuthorizationCheckArgs, "callerType">): void;
