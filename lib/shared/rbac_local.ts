import { ClientError } from "./errors";

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

export function performBaseScopeAuthorizationCheck({
  policy,
  tokenScopes,
  authorizationCheck,
  callerType,
}: baseScopeAuthorizationCheckArgs): void {
  const hasPermission = policy.scopes
    .filter((scope) => tokenScopes.includes(scope.scope))
    .flatMap((scope) => scope.permissions)
    .some((permission) => {
      const hasMatchingAction =
        permission.actions.includes(authorizationCheck.action) ||
        permission.actions.includes("*");
      const hasMatchingResource =
        authorizationCheck.resource_id === permission.resource_id;
      return hasMatchingAction && hasMatchingResource;
    });

  if (!hasPermission) {
    throw new ClientError(
      "invalid_permissions",
      `${callerType} does not have permission to perform the requested action`
    );
  }
}

export type baseRoleAuthorizationCheckArgs = {
  policyRoles: Role[];
  subjectRoles: string[];
  authorizationCheck: AuthorizationCheck;
  callerType: string;
};

export function performBaseRoleAuthorizationCheck({
  policyRoles,
  subjectRoles,
  authorizationCheck,
  callerType,
}: baseRoleAuthorizationCheckArgs): void {
  const hasPermission = policyRoles
    .filter((role) => subjectRoles.includes(role.role_id))
    .flatMap((role) => role.permissions)
    .some((permission) => {
      const hasMatchingAction =
        permission.actions.includes(authorizationCheck.action) ||
        permission.actions.includes("*");
      const hasMatchingResource =
        authorizationCheck.resource_id === permission.resource_id;
      return hasMatchingAction && hasMatchingResource;
    });

  if (!hasPermission) {
    throw new ClientError(
      "invalid_permissions",
      `${callerType} does not have permission to perform the requested action`
    );
  }
}

interface PolicyGetter<T> {
  policy: () => Promise<{ policy?: T }>;
}

interface OrgPolicyGetter<T, U> extends PolicyGetter<T> {
  organizations: {
    getOrgPolicy: (params: {
      organization_id: string;
    }) => Promise<{ org_policy?: U }>;
  };
}

export class PolicyCache<T extends Policy> {
  /**
   * The maximum TTL, in milliseconds, before a cached policy should be refreshed.
   * Resolves to 5 minutes.
   */
  static readonly CacheTTL: number = 1000 * 60 * 5;

  private rbac: PolicyGetter<T>;
  private projectPolicy?: T;
  private lastRefreshedAt?: number;

  constructor(rbac: PolicyGetter<T>) {
    this.rbac = rbac;
  }

  private fresh(): boolean {
    return (
      !!this.lastRefreshedAt &&
      Date.now() < this.lastRefreshedAt + PolicyCache.CacheTTL
    );
  }

  private async refresh(): Promise<void> {
    const policyResponse = await this.rbac.policy();
    this.projectPolicy = policyResponse.policy as T;
    this.lastRefreshedAt = Date.now();
  }

  async getPolicy(): Promise<T> {
    if (!this.projectPolicy || !this.fresh()) {
      await this.refresh();
    }
    return this.projectPolicy as T;
  }
}

type CachedOrgPolicy = {
  policy: OrgPolicy;
  lastRefreshedAt: number;
};

export class B2BPolicyCache<
  T extends Policy,
  U extends OrgPolicy
> extends PolicyCache<T> {
  private b2bRBAC: OrgPolicyGetter<T, U>;
  private orgPolicyCache: Record<string, CachedOrgPolicy> = {};

  constructor(rbac: OrgPolicyGetter<T, U>) {
    super(rbac);
    this.b2bRBAC = rbac;
  }

  private orgPolicyFresh(organizationID: string): boolean {
    const cached = this.orgPolicyCache[organizationID];
    return (
      !!cached && Date.now() < cached.lastRefreshedAt + PolicyCache.CacheTTL
    );
  }

  private async refreshOrgPolicy(organizationID: string): Promise<void> {
    const resp = await this.b2bRBAC.organizations.getOrgPolicy({
      organization_id: organizationID,
    });
    this.orgPolicyCache[organizationID] = {
      policy: resp.org_policy as U,
      lastRefreshedAt: Date.now(),
    };
  }

  async getOrgPolicy(organizationID: string): Promise<U> {
    if (!this.orgPolicyFresh(organizationID)) {
      await this.refreshOrgPolicy(organizationID);
    }
    return this.orgPolicyCache[organizationID].policy as U;
  }
}
