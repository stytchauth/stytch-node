import { B2BRBACPolicy, RBAC } from "./rbac";
import { B2BSessionsAuthorizationCheck } from "./sessions";
export declare class PolicyCache {
    private rbac;
    private _policy?;
    private _timestamp?;
    constructor(rbac: RBAC);
    private fresh;
    private reload;
    getPolicy(): Promise<B2BRBACPolicy>;
}
export declare function performAuthorizationCheck({ policy, subjectRoles, subjectOrgID, authorizationCheck, }: {
    policy: B2BRBACPolicy;
    subjectRoles: string[];
    subjectOrgID: string;
    authorizationCheck: B2BSessionsAuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, subjectOrgID, authorizationCheck, }: {
    policy: B2BRBACPolicy;
    tokenScopes: string[];
    subjectOrgID: string;
    authorizationCheck: B2BSessionsAuthorizationCheck;
}): void;
