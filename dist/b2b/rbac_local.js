"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyCache = void 0;
exports.performAuthorizationCheck = performAuthorizationCheck;
exports.performScopeAuthorizationCheck = performScopeAuthorizationCheck;
var _errors = require("../shared/errors");
// We want to refresh if the policy is more than 5 minutes old
const MAX_AGE_MS = 1000 * 60 * 5;

// PolicyCache handles local caching of RBAC policy information
// It is based on https://github.com/panva/jose/blob/main/src/jwks/remote.ts
// Instead of using a background worker/setInterval strategy, it refreshes on usage
// and tracks the timestamp internally. this has a few _very nice_ properties:
// - It works very well in Jest environments, since there's no boilerplate required to tear down the setInterval
// - No work is done if RBAC is not used and the policy is not required
class PolicyCache {
  constructor(rbac) {
    this.rbac = rbac;
  }
  fresh() {
    return !!this._timestamp && Date.now() < this._timestamp + MAX_AGE_MS;
  }
  async reload() {
    const policyResponse = await this.rbac.policy();
    this._policy = policyResponse.policy;
    this._timestamp = Date.now();
  }
  async getPolicy() {
    if (!this._policy || !this.fresh()) {
      await this.reload();
    }
    return this._policy;
  }
}
exports.PolicyCache = PolicyCache;
function performAuthorizationCheck({
  policy,
  subjectRoles,
  subjectOrgID,
  authorizationCheck
}) {
  if (subjectOrgID !== authorizationCheck.organization_id) {
    throw new _errors.ClientError("tenancy_mismatch", "Member belongs to different organization");
  }
  const hasPermission = policy.roles.filter(role => subjectRoles.includes(role.role_id)).flatMap(role => role.permissions).some(permission => {
    const hasMatchingAction = permission.actions.includes(authorizationCheck.action) || permission.actions.includes("*");
    const hasMatchingResource = authorizationCheck.resource_id === permission.resource_id;
    return hasMatchingAction && hasMatchingResource;
  });
  if (!hasPermission) {
    throw new _errors.ClientError("invalid_permissions", "Member does not have permission to perform the requested action");
  }
}
function performScopeAuthorizationCheck({
  policy,
  tokenScopes,
  subjectOrgID,
  authorizationCheck
}) {
  if (subjectOrgID !== authorizationCheck.organization_id) {
    throw new _errors.ClientError("tenancy_mismatch", "Member belongs to different organization");
  }
  const hasPermission = policy.scopes.filter(scope => tokenScopes.includes(scope.scope)).flatMap(scope => scope.permissions).some(permission => {
    const hasMatchingAction = permission.actions.includes(authorizationCheck.action) || permission.actions.includes("*");
    const hasMatchingResource = authorizationCheck.resource_id === permission.resource_id;
    return hasMatchingAction && hasMatchingResource;
  });
  if (!hasPermission) {
    throw new _errors.ClientError("invalid_permissions", "Member does not have permission to perform the requested action");
  }
}