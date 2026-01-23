type Role = {
    role_id: string;
    description: string;
    permissions: {
        resource_id: string;
        actions: string[];
    }[];
};
type Policy = {
    roles: Role[];
    resources: {
        resource_id: string;
        description: string;
        actions: string[];
    }[];
    scopes: {
        scope: string;
        description: string;
        permissions: {
            resource_id: string;
            actions: string[];
        }[];
    }[];
};
type OrgPolicy = Pick<Policy, "roles">;
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
    policyRoles: Role[];
    subjectRoles: string[];
    authorizationCheck: AuthorizationCheck;
    callerType: string;
};
export declare function performBaseRoleAuthorizationCheck({ policyRoles, subjectRoles, authorizationCheck, callerType, }: baseRoleAuthorizationCheckArgs): void;
interface PolicyGetter<T> {
    policy: () => Promise<{
        policy?: T;
    }>;
}
interface OrgPolicyGetter<T, U> extends PolicyGetter<T> {
    organizations: {
        getOrgPolicy: (params: {
            organization_id: string;
        }) => Promise<{
            org_policy?: U;
        }>;
    };
}
export declare class PolicyCache<T extends Policy> {
    /**
     * The maximum TTL, in milliseconds, before a cached policy should be refreshed.
     * Resolves to 5 minutes.
     */
    static readonly CacheTTL: number;
    private rbac;
    private projectPolicy?;
    private lastRefreshedAt?;
    constructor(rbac: PolicyGetter<T>);
    private fresh;
    private refresh;
    getPolicy(): Promise<T>;
}
export declare class B2BPolicyCache<T extends Policy, U extends OrgPolicy> extends PolicyCache<T> {
    private b2bRBAC;
    private orgPolicyCache;
    constructor(rbac: OrgPolicyGetter<T, U>);
    private orgPolicyFresh;
    private refreshOrgPolicy;
    getOrgPolicy(organizationID: string): Promise<U>;
}
export {};
