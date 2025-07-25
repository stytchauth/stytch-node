// This file is manually generated!

import { Policy } from "./rbac";
import { AuthorizationCheck } from "./sessions";
import { ClientError } from "../shared/errors";
import {
  baseScopeAuthorizationCheckArgs,
  performBaseRoleAuthorizationCheck,
  performBaseScopeAuthorizationCheck,
  BasePolicyCache,
  baseRoleAuthorizationCheckArgs,
} from "../shared/rbac_local";

// PolicyCache handles local caching of RBAC policy information
// It is based on https://github.com/panva/jose/blob/main/src/jwks/remote.ts
// Instead of using a background worker/setInterval strategy, it refreshes on usage
// and tracks the timestamp internally. this has a few _very nice_ properties:
// - It works very well in Jest environments, since there's no boilerplate required to tear down the setInterval
// - No work is done if RBAC is not used and the policy is not required
export class PolicyCache extends BasePolicyCache<Policy> {}

export function performAuthorizationCheck({
  policy,
  subjectRoles,
  subjectOrgID,
  authorizationCheck,
}: Omit<baseRoleAuthorizationCheckArgs, "callerType"> & {
  subjectOrgID: string;
  authorizationCheck: AuthorizationCheck;
}): void {
  if (subjectOrgID !== authorizationCheck.organization_id) {
    throw new ClientError(
      "tenancy_mismatch",
      "Member belongs to different organization"
    );
  }
  performBaseRoleAuthorizationCheck({
    policy,
    subjectRoles,
    authorizationCheck,
    callerType: "Member",
  });
}

export function performScopeAuthorizationCheck({
  policy,
  tokenScopes,
  subjectOrgID,
  authorizationCheck,
}: Omit<baseScopeAuthorizationCheckArgs, "callerType"> & {
  subjectOrgID: string;
  authorizationCheck: AuthorizationCheck;
}): void {
  if (subjectOrgID !== authorizationCheck.organization_id) {
    throw new ClientError(
      "tenancy_mismatch",
      "Member belongs to different organization"
    );
  }
  return performBaseScopeAuthorizationCheck({
    policy,
    tokenScopes,
    authorizationCheck,
    callerType: "Member",
  });
}
