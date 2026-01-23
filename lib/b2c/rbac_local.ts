// This file is manually generated!

import { RBACPolicy } from "./rbac";
import {
  performBaseRoleAuthorizationCheck,
  performBaseScopeAuthorizationCheck,
  PolicyCache as BasePolicyCache,
  baseRoleAuthorizationCheckArgs,
  baseScopeAuthorizationCheckArgs,
} from "../shared/rbac_local";

// PolicyCache handles local caching of RBAC policy information
// It is based on https://github.com/panva/jose/blob/main/src/jwks/remote.ts
// Instead of using a background worker/setInterval strategy, it refreshes on usage
// and tracks the timestamp internally. this has a few _very nice_ properties:
// - It works very well in Jest environments, since there's no boilerplate required to tear down the setInterval
// - No work is done if RBAC is not used and the policy is not required
export class PolicyCache extends BasePolicyCache<RBACPolicy> {}

export function performAuthorizationCheck({
  policyRoles,
  subjectRoles,
  authorizationCheck,
}: Omit<baseRoleAuthorizationCheckArgs, "callerType">): void {
  performBaseRoleAuthorizationCheck({
    policyRoles,
    subjectRoles,
    authorizationCheck,
    callerType: "User",
  });
}

export function performScopeAuthorizationCheck({
  policy,
  tokenScopes,
  authorizationCheck,
}: Omit<baseScopeAuthorizationCheckArgs, "callerType">): void {
  return performBaseScopeAuthorizationCheck({
    policy,
    tokenScopes,
    authorizationCheck,
    callerType: "User",
  });
}
