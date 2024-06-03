import { ClientError } from "../shared/errors";

export function performAuthorizationCheck({
  hasScopes,
  requiredScopes,
}: {
  hasScopes: string[];
  requiredScopes: string[];
}): void {
  const clientScopes: { [key: string]: Set<string> } = {};
  hasScopes.forEach((scope) => {
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

  requiredScopes.forEach((requiredScope) => {
    let requiredAction = requiredScope;
    let requiredResource = "*";
    if (requiredScope.includes(":")) {
      [requiredAction, requiredResource] = requiredScope.split(":");
    }
    if (!clientScopes[requiredAction]) {
      throw new ClientError(
        "missing_scopes",
        "Missing required action",
        requiredAction
      );
    }
    const resources = clientScopes[requiredAction];

    // The client can either have a wildcard resource or the specific resource
    if (!resources.has("*") && !resources.has(requiredResource)) {
      throw new ClientError(
        "missing_scopes",
        "Missing required scope",
        requiredResource
      );
    }
  });
}
