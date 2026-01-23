"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyCache = exports.B2BPolicyCache = void 0;
exports.performBaseRoleAuthorizationCheck = performBaseRoleAuthorizationCheck;
exports.performBaseScopeAuthorizationCheck = performBaseScopeAuthorizationCheck;
var _errors = require("./errors");
function performBaseScopeAuthorizationCheck({
  policy,
  tokenScopes,
  authorizationCheck,
  callerType
}) {
  const hasPermission = policy.scopes.filter(scope => tokenScopes.includes(scope.scope)).flatMap(scope => scope.permissions).some(permission => {
    const hasMatchingAction = permission.actions.includes(authorizationCheck.action) || permission.actions.includes("*");
    const hasMatchingResource = authorizationCheck.resource_id === permission.resource_id;
    return hasMatchingAction && hasMatchingResource;
  });
  if (!hasPermission) {
    throw new _errors.ClientError("invalid_permissions", `${callerType} does not have permission to perform the requested action`);
  }
}
function performBaseRoleAuthorizationCheck({
  policyRoles,
  subjectRoles,
  authorizationCheck,
  callerType
}) {
  const hasPermission = policyRoles.filter(role => subjectRoles.includes(role.role_id)).flatMap(role => role.permissions).some(permission => {
    const hasMatchingAction = permission.actions.includes(authorizationCheck.action) || permission.actions.includes("*");
    const hasMatchingResource = authorizationCheck.resource_id === permission.resource_id;
    return hasMatchingAction && hasMatchingResource;
  });
  if (!hasPermission) {
    throw new _errors.ClientError("invalid_permissions", `${callerType} does not have permission to perform the requested action`);
  }
}
class PolicyCache {
  /**
   * The maximum TTL, in milliseconds, before a cached policy should be refreshed.
   * Resolves to 5 minutes.
   */
  static CacheTTL = 1000 * 60 * 5;
  constructor(rbac) {
    this.rbac = rbac;
  }
  fresh() {
    return !!this.lastRefreshedAt && Date.now() < this.lastRefreshedAt + PolicyCache.CacheTTL;
  }
  async refresh() {
    const policyResponse = await this.rbac.policy();
    this.projectPolicy = policyResponse.policy;
    this.lastRefreshedAt = Date.now();
  }
  async getPolicy() {
    if (!this.projectPolicy || !this.fresh()) {
      await this.refresh();
    }
    return this.projectPolicy;
  }
}
exports.PolicyCache = PolicyCache;
class B2BPolicyCache extends PolicyCache {
  orgPolicyCache = {};
  constructor(rbac) {
    super(rbac);
    this.b2bRBAC = rbac;
  }
  orgPolicyFresh(organizationID) {
    const cached = this.orgPolicyCache[organizationID];
    return !!cached && Date.now() < cached.lastRefreshedAt + PolicyCache.CacheTTL;
  }
  async refreshOrgPolicy(organizationID) {
    const resp = await this.b2bRBAC.organizations.getOrgPolicy({
      organization_id: organizationID
    });
    this.orgPolicyCache[organizationID] = {
      policy: resp.org_policy,
      lastRefreshedAt: Date.now()
    };
  }
  async getOrgPolicy(organizationID) {
    if (!this.orgPolicyFresh(organizationID)) {
      await this.refreshOrgPolicy(organizationID);
    }
    return this.orgPolicyCache[organizationID].policy;
  }
}
exports.B2BPolicyCache = B2BPolicyCache;