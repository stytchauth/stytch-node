"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RBAC = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Response type for `rbac.policy`.

class RBAC {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Get the active RBAC Policy for your current Stytch Project. An RBAC Policy is the canonical document
   * that stores all defined Resources and Roles within your RBAC permissioning model.
   *
   * When using the backend SDKs, the RBAC Policy will automatically be loaded and refreshed in the
   * background to allow for local evaluations, eliminating the need for an extra request to Stytch.
   *
   * Resources and Roles can be created and managed within the [Dashboard](/dashboard). Additionally,
   * [Role assignment](https://stytch.com/docs/b2b/guides/rbac/role-assignment) can be programmatically
   * managed through certain Stytch API endpoints.
   *
   *
   * Check out the [RBAC overview](https://stytch.com/docs/b2b/guides/rbac/overview) to learn more about
   * Stytch's RBAC permissioning model.
   * @param params {@link B2BRBACPolicyRequest}
   * @returns {@link B2BRBACPolicyResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  policy() {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/rbac/policy`,
      headers
    });
  }
}
exports.RBAC = RBAC;