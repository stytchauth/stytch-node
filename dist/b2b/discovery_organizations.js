"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Organizations = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `discovery.organizations.create`.

// Response type for `discovery.organizations.create`.

// Request type for `discovery.organizations.list`.

// Response type for `discovery.organizations.list`.

class Organizations {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * If an end user does not want to join any already-existing, or has no possible Organizations to join,
   * this endpoint can be used to create a new
   * [Organization](https://stytch.com/docs/b2b/api/organization-object) and
   * [Member](https://stytch.com/docs/b2b/api/member-object).
   *
   * This operation consumes the Intermediate Session.
   *
   * This endpoint will also create an initial Member Session for the newly created Member.
   *
   * The created by this endpoint will automatically be granted the `stytch_admin` Role. See the
   * [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for more details on this Role.
   *
   * If the new Organization is created with a `mfa_policy` of `REQUIRED_FOR_ALL`, the newly created Member
   * will need to complete an MFA step to log in to the Organization.
   * The `intermediate_session_token` will not be consumed and instead will be returned in the response.
   * The `intermediate_session_token` can be passed into the
   * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
   * MFA step and acquire a full member session.
   * The `intermediate_session_token` can also be used with the
   * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
   * or the
   * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to join a different Organization or create a new one.
   * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
   * @param data {@link B2BDiscoveryOrganizationsCreateRequest}
   * @returns {@link B2BDiscoveryOrganizationsCreateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  create(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/discovery/organizations/create`,
      headers,
      data
    });
  }

  /**
   * List all possible organization relationships connected to a
   * [Member Session](https://stytch.com/docs/b2b/api/session-object) or Intermediate Session.
   *
   * When a Member Session is passed in, relationships with a type of `active_member`, `pending_member`, or
   * `invited_member`
   * will be returned, and any membership can be assumed by calling the
   * [Exchange Session](https://stytch.com/docs/b2b/api/exchange-session) endpoint.
   *
   * When an Intermediate Session is passed in, all relationship types - `active_member`, `pending_member`,
   * `invited_member`,
   * `eligible_to_join_by_email_domain`, and `eligible_to_join_by_oauth_tenant` - will be returned,
   * and any membership can be assumed by calling the
   * [Exchange Intermediate Session](https://stytch.com/docs/b2b/api/exchange-intermediate-session) endpoint.
   *
   * This endpoint requires either an `intermediate_session_token`, `session_jwt` or `session_token` be
   * included in the request.
   * It will return an error if multiple are present.
   *
   * This operation does not consume the Intermediate Session or Session Token passed in.
   * @param data {@link B2BDiscoveryOrganizationsListRequest}
   * @returns {@link B2BDiscoveryOrganizationsListResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  list(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/discovery/organizations`,
      headers,
      data
    });
  }
}
exports.Organizations = Organizations;