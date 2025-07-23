import { RBACPolicy } from "./rbac";
import { RBAC } from "./rbac";
import { SessionsAuthorizationCheck } from "./sessions";
export declare class PolicyCache {
    private rbac;
    private _policy?;
    private _timestamp?;
    constructor(rbac: RBAC);
    private fresh;
    private reload;
    getPolicy(): Promise<RBACPolicy>;
}
export declare function performAuthorizationCheck({ policy, subjectRoles, authorizationCheck, }: {
    policy: RBACPolicy;
    subjectRoles: string[];
    authorizationCheck: SessionsAuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, authorizationCheck, }: {
    policy: RBACPolicy;
    tokenScopes: string[];
    authorizationCheck: SessionsAuthorizationCheck;
}): void;
