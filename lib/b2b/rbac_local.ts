import { Policy, RBAC } from "./rbac";
import { AuthorizationCheck } from "./sessions";
import { ClientError } from "../shared/errors";

// We want to refresh if the policy is more than 5 minutes old
const MAX_AGE_MS = 1000 * 60 * 5;

// PolicyCache handles local caching of RBAC policy information
// It is based on https://github.com/panva/jose/blob/main/src/jwks/remote.ts
// Instead of using a background worker/setInterval strategy, it refreshes on usage
// and tracks the timestamp internally. this has a few _very nice_ properties:
// - It works very well in Jest environments, since there's no boilerplate required to tear down the setInterval
// - No work is done if RBAC is not used and the policy is not required
export class PolicyCache {
  private rbac: RBAC;
  private _policy?: Policy;
  private _timestamp?: number;

  constructor(rbac: RBAC) {
    this.rbac = rbac;
  }

  private fresh(): boolean {
    return !!this._timestamp && Date.now() < this._timestamp + MAX_AGE_MS;
  }

  private async reload() {
    const policyResponse = await this.rbac.policy();
    this._policy = policyResponse.policy;
    this._timestamp = Date.now();
  }

  async getPolicy(): Promise<Policy> {
    if (!this._policy || !this.fresh()) {
      await this.reload();
    }
    return this._policy as Policy;
  }
}

export function performAuthorizationCheck({
  policy,
  subjectRoles,
  subjectOrgID,
  authorizationCheck,
}: {
  policy: Policy;
  subjectRoles: string[];
  subjectOrgID: string;
  authorizationCheck: AuthorizationCheck;
}): void {
  if (subjectOrgID !== authorizationCheck.organization_id) {
    throw new ClientError(
      "tenancy_mismatch",
      "Member belongs to different organization"
    );
  }
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
      "Member does not have permission to perform the requested action"
    );
  }
}
