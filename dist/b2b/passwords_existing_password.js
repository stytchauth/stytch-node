"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExistingPassword = void 0;

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
class ExistingPassword {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }
  /**
   * Reset the member’s password using their existing password.
   *
   * This endpoint adapts to your Project's password strength configuration.
   * If you're using [zxcvbn](https://stytch.com/docs/passwords#strength-requirements), the default, your
   * passwords are considered valid
   * if the strength score is >= 3. If you're using
   * [LUDS](https://stytch.com/docs/passwords#strength-requirements), your passwords are
   * considered valid if they meet the requirements that you've set with Stytch.
   * You may update your password strength configuration in the
   * [stytch dashboard](https://stytch.com/dashboard/password-strength-config).
   * @param data {@link B2BPasswordsExistingPasswordResetRequest}
   * @returns {@link B2BPasswordsExistingPasswordResetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  reset(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/passwords/existing_password/reset`,
      data
    });
  }

}

exports.ExistingPassword = ExistingPassword;