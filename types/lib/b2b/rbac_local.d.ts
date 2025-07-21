import { Policy, RBAC } from "./rbac";
import { B2BSessionsAuthorizationCheck } from "./sessions";
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
    authorizationCheck: B2BSessionsAuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, subjectOrgID, authorizationCheck, }: {
    policy: Policy;
    tokenScopes: string[];
    subjectOrgID: string;
    authorizationCheck: B2BSessionsAuthorizationCheck;
}): void;
