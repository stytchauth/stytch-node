"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Passwords = void 0;
require("../shared/method_options");
var _passwords_email = require("./passwords_email");
var _passwords_existing_password = require("./passwords_existing_password");
var _shared = require("../shared");
var _passwords_session = require("./passwords_session");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `passwords.authenticate`.

// Response type for `passwords.authenticate`.

// Request type for `passwords.migrate`.

// Response type for `passwords.migrate`.

// Request type for `passwords.strengthCheck`.

// Response type for `passwords.strengthCheck`.

class Passwords {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new _passwords_email.Email(this.fetchConfig);
    this.sessions = new _passwords_session.Sessions(this.fetchConfig);
    this.existingPassword = new _passwords_existing_password.ExistingPassword(this.fetchConfig);
  }

  /**
   * This API allows you to check whether the user’s provided password is valid, and to provide feedback to
   * the user on how to increase the strength of their password.
   *
   * This endpoint adapts to your Project's password strength configuration. If you're using
   * [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the default, your passwords are
   * considered valid if the strength score is >= 3. If you're using
   * [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), your passwords are considered valid if
   * they meet the requirements that you've set with Stytch. You may update your password strength
   * configuration in the [stytch dashboard](https://stytch.com/dashboard/password-strength-config).
   *
   * ## Password feedback
   * The zxcvbn_feedback and luds_feedback objects contains relevant fields for you to relay feedback to
   * users that failed to create a strong enough password.
   *
   * If you're using [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the feedback object
   * will contain warning and suggestions for any password that does not meet the
   * [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy) strength requirements. You can return
   * these strings directly to the user to help them craft a strong password.
   *
   * If you're using [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), the feedback object
   * will contain a collection of fields that the user failed or passed. You'll want to prompt the user to
   * create a password that meets all requirements that they failed.
   * @param data {@link B2BPasswordsStrengthCheckRequest}
   * @returns {@link B2BPasswordsStrengthCheckResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  strengthCheck(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/passwords/strength_check`,
      headers,
      data
    });
  }

  /**
   * Adds an existing password to a member's email that doesn't have a password yet. We support migrating
   * members from passwords stored with bcrypt, scrypt, argon2, MD-5, SHA-1, and PBKDF2. This endpoint has a
   * rate limit of 100 requests per second.
   *
   * The member's email will be marked as verified when you use this endpoint.
   * @param data {@link B2BPasswordsMigrateRequest}
   * @returns {@link B2BPasswordsMigrateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  migrate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/passwords/migrate`,
      headers,
      data
    });
  }

  /**
   * Authenticate a member with their email address and password. This endpoint verifies that the member has
   * a password currently set, and that the entered password is correct.
   *
   * If you have breach detection during authentication enabled in your
   * [password strength policy](https://stytch.com/docs/b2b/guides/passwords/strength-policies) and the
   * member's credentials have appeared in the HaveIBeenPwned dataset, this endpoint will return a
   * `member_reset_password` error even if the member enters a correct password. We force a password reset in
   * this case to ensure that the member is the legitimate owner of the email address and not a malicious
   * actor abusing the compromised credentials.
   *
   * If the is required to complete MFA to log in to the, the returned value of `member_authenticated` will
   * be `false`, and an `intermediate_session_token` will be returned.
   * The `intermediate_session_token` can be passed into the
   * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
   * MFA step and acquire a full member session.
   * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
   *
   * If a valid `session_token` or `session_jwt` is passed in, the Member will not be required to complete an
   * MFA step.
   * @param data {@link B2BPasswordsAuthenticateRequest}
   * @returns {@link B2BPasswordsAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/passwords/authenticate`,
      headers,
      data
    });
  }
}
exports.Passwords = Passwords;