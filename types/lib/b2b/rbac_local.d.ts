import { Policy } from "./rbac";
import { AuthorizationCheck } from "./sessions";
import { baseScopeAuthorizationCheckArgs, BasePolicyCache, baseRoleAuthorizationCheckArgs } from "../shared/rbac_local";
export declare class PolicyCache extends BasePolicyCache<Policy> {
}
export declare function performAuthorizationCheck({ policy, subjectRoles, subjectOrgID, authorizationCheck, }: Omit<baseRoleAuthorizationCheckArgs, "callerType"> & {
    subjectOrgID: string;
    authorizationCheck: AuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, subjectOrgID, authorizationCheck, }: Omit<baseScopeAuthorizationCheckArgs, "callerType"> & {
    subjectOrgID: string;
    authorizationCheck: AuthorizationCheck;
}): void;
