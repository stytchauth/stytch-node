import { ClientError } from "./errors";

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
  policy: Policy;
  subjectRoles: string[];
  authorizationCheck: AuthorizationCheck;
  callerType: string;
};

export function performBaseRoleAuthorizationCheck({
  policy,
  subjectRoles,
  authorizationCheck,
  callerType,
}: baseRoleAuthorizationCheckArgs): void {
  const hasPermission = policy.roles
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

// We want to refresh if the policy is more than 5 minutes old
const MAX_AGE_MS = 1000 * 60 * 5;

type PolicyGetter<T> = { policy: () => Promise<{ policy?: T }> };
// BasePolicyCache handles local caching of RBAC policy information
// It is based on https://github.com/panva/jose/blob/main/src/jwks/remote.ts
// Instead of using a background worker/setInterval strategy, it refreshes on usage
// and tracks the timestamp internally. this has a few _very nice_ properties:
// - It works very well in Jest environments, since there's no boilerplate required to tear down the setInterval
// - No work is done if RBAC is not used and the policy is not required
export class BasePolicyCache<T extends Policy> {
  private rbac: PolicyGetter<T>;
  private _policy?: T;
  private _timestamp?: number;

  constructor(rbac: PolicyGetter<T>) {
    this.rbac = rbac;
  }

  private fresh(): boolean {
    return !!this._timestamp && Date.now() < this._timestamp + MAX_AGE_MS;
  }

  private async reload() {
    const policyResponse = await this.rbac.policy();
    this._policy = policyResponse.policy;
    this._timestamp = Date.now();
    return this._policy as T;
  }

  async getPolicy(): Promise<T> {
    if (!this._policy || !this.fresh()) {
      return this.reload();
    }
    return this._policy;
  }
}
