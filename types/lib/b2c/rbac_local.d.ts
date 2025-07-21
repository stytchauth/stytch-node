import { ConsumerRBACPolicy } from "./consumer_rbac";
import { ConsumerRBAC } from "./consumer_rbac";
import { SessionsAuthorizationCheck } from "./sessions";
export declare class PolicyCache {
    private rbac;
    private _policy?;
    private _timestamp?;
    constructor(rbac: ConsumerRBAC);
    private fresh;
    private reload;
    getPolicy(): Promise<ConsumerRBACPolicy>;
}
export declare function performAuthorizationCheck({ policy, subjectRoles, authorizationCheck, }: {
    policy: ConsumerRBACPolicy;
    subjectRoles: string[];
    authorizationCheck: SessionsAuthorizationCheck;
}): void;
export declare function performScopeAuthorizationCheck({ policy, tokenScopes, authorizationCheck, }: {
    policy: ConsumerRBACPolicy;
    tokenScopes: string[];
    authorizationCheck: SessionsAuthorizationCheck;
}): void;
