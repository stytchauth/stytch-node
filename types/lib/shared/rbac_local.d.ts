type Policy = {
    roles: Array<{
        role_id: string;
        description: string;
        permissions: Array<{
            resource_id: string;
            actions: string[];
        }>;
    }>;
    resources: Array<{
        resource_id: string;
        description: string;
        actions: string[];
    }>;
    scopes: Array<{
        scope: string;
        description: string;
        permissions: Array<{
            resource_id: string;
            actions: string[];
        }>;
    }>;
};
type AuthorizationCheck = {
    resource_id: string;
    action: string;
};
export type baseScopeAuthorizationCheckArgs = {
    policy: Policy;
    tokenScopes: string[];
    authorizationCheck: AuthorizationCheck;
    callerType: string;
};
export declare function performBaseScopeAuthorizationCheck({ policy, tokenScopes, authorizationCheck, callerType, }: baseScopeAuthorizationCheckArgs): void;
export type baseRoleAuthorizationCheckArgs = {
    policy: Policy;
    subjectRoles: string[];
    authorizationCheck: AuthorizationCheck;
    callerType: string;
};
export declare function performBaseRoleAuthorizationCheck({ policy, subjectRoles, authorizationCheck, callerType, }: baseRoleAuthorizationCheckArgs): void;
type PolicyGetter<T> = {
    policy: () => Promise<{
        policy?: T;
    }>;
};
export declare class BasePolicyCache<T extends Policy> {
    private rbac;
    private _policy?;
    private _timestamp?;
    constructor(rbac: PolicyGetter<T>);
    private fresh;
    private reload;
    getPolicy(): Promise<T>;
}
export {};
