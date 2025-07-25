"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExistingPassword = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `passwords.existingPassword.reset`.

// Response type for `passwords.existingPassword.reset`.

class ExistingPassword {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Reset the member’s password using their existing password.
   *
   * This endpoint adapts to your Project's password strength configuration.
   * If you're using [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the default, your
   * passwords are considered valid
   * if the strength score is >= 3. If you're using
   * [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), your passwords are
   * considered valid if they meet the requirements that you've set with Stytch.
   * You may update your password strength configuration on the
   * [Passwords Policy page](https://stytch.com/dashboard/password-strength-config) in the Stytch Dashboard.
   *
   * If the Member is required to complete MFA to log in to the Organization, the returned value of
   * `member_authenticated` will be `false`, and an `intermediate_session_token` will be returned.
   * The `intermediate_session_token` can be passed into the
   * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
   * MFA step and acquire a full member session.
   * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
   *
   * If a valid `session_token` or `session_jwt` is passed in, the Member will not be required to complete an
   * MFA step.
   *
   * Note that a successful password reset via an existing password will revoke all active sessions for the
   * `member_id`.
   * @param data {@link B2BPasswordsExistingPasswordResetRequest}
   * @returns {@link B2BPasswordsExistingPasswordResetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  reset(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/passwords/existing_password/reset`,
      headers,
      data
    });
  }
}
exports.ExistingPassword = ExistingPassword;