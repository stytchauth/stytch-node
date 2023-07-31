"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = void 0;

var _oauth_discovery = require("./oauth_discovery");

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
class OAuth {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.discovery = new _oauth_discovery.Discovery(this.fetchConfig);
  }
  /**
   * Authenticate a Member given a `token`. This endpoint verifies that the member completed the OAuth flow
   * by verifying that the token is valid and hasn't expired.  Provide the `session_duration_minutes`
   * parameter to set the lifetime of the session. If the `session_duration_minutes` parameter is not
   * specified, a Stytch session will be created with a 60 minute duration.
   *
   * (Coming Soon) If the Member is required to complete MFA to log in to the Organization, the returned
   * value of `member_authenticated` will be `false`, and an `intermediate_session_token` will be returned.
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
   * @param data {@link B2BOAuthAuthenticateRequest}
   * @returns {@link B2BOAuthAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/oauth/authenticate`,
      data
    });
  }

}

exports.OAuth = OAuth;