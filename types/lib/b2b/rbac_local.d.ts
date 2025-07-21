import { RBACPolicy, RBAC } from "./rbac";
import { B2BSessionsAuthorizationCheck } from "./sessions";
export declare class PolicyCache {
    private rbac;
    private _policy?;
    private _timestamp?;
    constructor(rbac: RBAC);
    private fresh;
    private reload;
    getPolicy(): Promise<RBACPolicy>;
}
export declare function performAuthorizationCheck({ policy, subjectRoles, subjectOrgID, authorizationCheck, }: {
    policy: RBACPolicy;
    subjectRoles: string[];
    subjectOrgID: string;
    authorizationCheck: B2BSessionsAuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, subjectOrgID, authorizationCheck, }: {
    policy: RBACPolicy;
    tokenScopes: string[];
    subjectOrgID: string;
    authorizationCheck: B2BSessionsAuthorizationCheck;
}): void;
