"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyCache = void 0;
exports.performAuthorizationCheck = performAuthorizationCheck;
exports.performScopeAuthorizationCheck = performScopeAuthorizationCheck;
var _errors = require("../shared/errors");
var _rbac_local = require("../shared/rbac_local");
// This file is manually generated!

// PolicyCache handles local caching of RBAC policy information
// It is based on https://github.com/panva/jose/blob/main/src/jwks/remote.ts
// Instead of using a background worker/setInterval strategy, it refreshes on usage
// and tracks the timestamp internally. this has a few _very nice_ properties:
// - It works very well in Jest environments, since there's no boilerplate required to tear down the setInterval
// - No work is done if RBAC is not used and the policy is not required
class PolicyCache extends _rbac_local.BasePolicyCache {}
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
  (0, _rbac_local.performBaseRoleAuthorizationCheck)({
    policy,
    subjectRoles,
    authorizationCheck,
    callerType: "Member"
  });
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
  return (0, _rbac_local.performBaseScopeAuthorizationCheck)({
    policy,
    tokenScopes,
    authorizationCheck,
    callerType: "Member"
  });
}