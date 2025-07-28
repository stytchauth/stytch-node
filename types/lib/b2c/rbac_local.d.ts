import { RBACPolicy } from "./rbac";
import { BasePolicyCache, baseRoleAuthorizationCheckArgs, baseScopeAuthorizationCheckArgs } from "../shared/rbac_local";
export declare class PolicyCache extends BasePolicyCache<RBACPolicy> {
}
export declare function performAuthorizationCheck({ policy, subjectRoles, authorizationCheck, }: Omit<baseRoleAuthorizationCheckArgs, "callerType">): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, authorizationCheck, }: Omit<baseScopeAuthorizationCheckArgs, "callerType">): void;
