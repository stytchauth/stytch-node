"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performAuthorizationCheck = performAuthorizationCheck;
var _errors = require("../shared/errors");
function performAuthorizationCheck({
  hasScopes,
  requiredScopes
}) {
  const clientScopes = {};
  hasScopes.forEach(scope => {
    let action = scope;
    let resource = "*";
    if (scope.includes(":")) {
      [action, resource] = scope.split(":");
    }
    if (!clientScopes[action]) {
      clientScopes[action] = new Set();
    }
    clientScopes[action].add(resource);
  });
  requiredScopes.forEach(requiredScope => {
    let requiredAction = requiredScope;
    let requiredResource = "*";
    if (requiredScope.includes(":")) {
      [requiredAction, requiredResource] = requiredScope.split(":");
    }
    if (!clientScopes[requiredAction]) {
      throw new _errors.ClientError("missing_scopes", "Missing required action", requiredAction);
    }
    const resources = clientScopes[requiredAction];

    // The client can either have a wildcard resource or the specific resource
    if (!resources.has("*") && !resources.has(requiredResource)) {
      throw new _errors.ClientError("missing_scopes", "Missing required scope", requiredResource);
    }
  });
}