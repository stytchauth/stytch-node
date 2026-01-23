import { OrgPolicy, Policy } from "./rbac";
import { AuthorizationCheck } from "./sessions";
import { baseScopeAuthorizationCheckArgs, B2BPolicyCache, baseRoleAuthorizationCheckArgs } from "../shared/rbac_local";
export declare class PolicyCache extends B2BPolicyCache<Policy, OrgPolicy> {
}
export declare function performAuthorizationCheck({ policyRoles, subjectRoles, subjectOrgID, authorizationCheck, }: Omit<baseRoleAuthorizationCheckArgs, "callerType"> & {
    subjectOrgID: string;
    authorizationCheck: AuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, subjectOrgID, authorizationCheck, }: Omit<baseScopeAuthorizationCheckArgs, "callerType"> & {
    subjectOrgID: string;
    authorizationCheck: AuthorizationCheck;
}): void;
