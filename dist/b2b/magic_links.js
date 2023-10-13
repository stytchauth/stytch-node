"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicLinks = void 0;
var _magic_links_discovery = require("./magic_links_discovery");
var _magic_links_email = require("./magic_links_email");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `magicLinks.authenticate`.

// Response type for `magicLinks.authenticate`.

class MagicLinks {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new _magic_links_email.Email(this.fetchConfig);
    this.discovery = new _magic_links_discovery.Discovery(this.fetchConfig);
  }

  /**
   * Authenticate a Member with a Magic Link. This endpoint requires a Magic Link token that is not expired
   * or previously used. If the Member’s status is `pending` or `invited`, they will be updated to `active`.
   * Provide the `session_duration_minutes` parameter to set the lifetime of the session. If the
   * `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute
   * duration.
   *
   * If the Member is required to complete MFA to log in to the Organization, the returned value of
   * `member_authenticated` will be `false`, and an `intermediate_session_token` will be returned.
   * The `intermediate_session_token` can be passed into the
   * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
   * MFA step and acquire a full member session.
   * The `intermediate_session_token` can also be used with the
   * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
   * or the
   * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to join a different Organization or create a new one.
   * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
   *
   * If a valid `session_token` or `session_jwt` is passed in, the Member will not be required to complete an
   * MFA step.
   * @param data {@link B2BMagicLinksAuthenticateRequest}
   * @returns {@link B2BMagicLinksAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/magic_links/authenticate`,
      headers,
      data
    });
  }
}
exports.MagicLinks = MagicLinks;