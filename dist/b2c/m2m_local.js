"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performAuthorizationCheck = performAuthorizationCheck;
function performAuthorizationCheck({
  hasScopes,
  requiredScopes
}) {
  const clientScopes = {};
  hasScopes.forEach(scope => {
    let action = scope;
    let resource = "-";
    if (scope.includes(":")) {
      [action, resource] = scope.split(":");
    }
    if (!clientScopes[action]) {
      clientScopes[action] = new Set();
    }
    clientScopes[action].add(resource);
  });
  for (const requiredScope of requiredScopes) {
    let requiredAction = requiredScope;
    let requiredResource = "-";
    if (requiredScope.includes(":")) {
      [requiredAction, requiredResource] = requiredScope.split(":");
    }
    if (!clientScopes[requiredAction]) {
      return false;
    }
    const resources = clientScopes[requiredAction];
    // The client can either have a wildcard resource or the specific resource
    if (!resources.has("*") && !resources.has(requiredResource)) {
      return false;
    }
  }
  return true;
}