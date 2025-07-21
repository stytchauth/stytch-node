import { Policy, RBAC } from "./rbac";
import { AuthorizationCheck } from "./sessions";
export declare class PolicyCache {
    private rbac;
    private _policy?;
    private _timestamp?;
    constructor(rbac: RBAC);
    private fresh;
    private reload;
    getPolicy(): Promise<Policy>;
}
export declare function performAuthorizationCheck({ policy, subjectRoles, subjectOrgID, authorizationCheck, }: {
    policy: Policy;
    subjectRoles: string[];
    subjectOrgID: string;
    authorizationCheck: AuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, subjectOrgID, authorizationCheck, }: {
    policy: Policy;
    tokenScopes: string[];
    subjectOrgID: string;
    authorizationCheck: AuthorizationCheck;
}): void;
