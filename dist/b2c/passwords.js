"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Passwords = void 0;

var _passwords_email = require("./passwords_email");

var _passwords_existing_password = require("./passwords_existing_password");

var _shared = require("../shared");

var _passwords_session = require("./passwords_session");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
class Passwords {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new _passwords_email.Email(this.fetchConfig);
    this.existingPassword = new _passwords_existing_password.ExistingPassword(this.fetchConfig);
    this.sessions = new _passwords_session.Sessions(this.fetchConfig);
  }
  /**
   * Create a new user with a password and an authenticated session for the user if requested. If a user with
   * this email already exists in the project, this API will return an error.
   *
   * Existing passwordless users who wish to create a password need to go through the reset password flow.
   *
   * This endpoint will return an error if the password provided does not meet our strength requirements,
   * which you can check beforehand with the password strength endpoint.
   * @param data {@link PasswordsCreateRequest}
   * @returns {@link PasswordsCreateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/passwords`,
      data
    });
  }
  /**
   * Authenticate a user with their email address and password. This endpoint verifies that the user has a
   * password currently set, and that the entered password is correct. There are two instances where the
   * endpoint will return a `reset_password` error even if they enter their previous password:
   *
   * **One:** The user’s credentials appeared in the HaveIBeenPwned dataset. We force a password reset to
   * ensure that the user is the legitimate owner of the email address, and not a malicious actor abusing the
   * compromised credentials.
   *
   * **Two:** A user that has previously authenticated with email/password uses a passwordless authentication
   * method tied to the same email address (e.g. Magic Links, Google OAuth) for the first time. Any
   * subsequent email/password authentication attempt will result in this error. We force a password reset in
   * this instance in order to safely deduplicate the account by email address, without introducing the risk
   * of a pre-hijack account takeover attack.
   *
   * Imagine a bad actor creates many accounts using passwords and the known email addresses of their
   * victims. If a victim comes to the site and logs in for the first time with an email-based passwordless
   * authentication method then both the victim and the bad actor have credentials to access to the same
   * account. To prevent this, any further email/password login attempts first require a password reset which
   * can only be accomplished by someone with access to the underlying email address.
   * @param data {@link PasswordsAuthenticateRequest}
   * @returns {@link PasswordsAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/passwords/authenticate`,
      data
    });
  }
  /**
   * This API allows you to check whether or not the user’s provided password is valid, and to provide
   * feedback to the user on how to increase the strength of their password.
   *
   * This endpoint adapts to your Project's password strength configuration. If you're using
   * [zxcvbn](https://stytch.com/docs/passwords#strength-requirements), the default, your passwords are
   * considered valid if the strength score is >= 3. If you're using
   * [LUDS](https://stytch.com/docs/passwords#strength-requirements), your passwords are considered valid if
   * they meet the requirements that you've set with Stytch. You may update your password strength
   * configuration in the [stytch dashboard](https://stytch.com/dashboard/password-strength-config).
   *
   *
   * ### Password feedback
   *
   * The `feedback` object contains relevant fields for you to relay feedback to users that failed to create
   * a strong enough password.
   *
   * If you're using zxcvbn, the `feedback` object will contain `warning` and `suggestions` for any password
   * that does not meet the zxcvbn strength requirements. You can return these strings directly to the user
   * to help them craft a strong password.
   *
   * If you're using LUDS, the `feedback` object will contain an object named `luds_requirements` which
   * contain a collection of fields that the user failed or passed. You'll want to prompt the user to create
   * a password that meets all of the requirements that they failed.
   * @param data {@link PasswordsStrengthCheckRequest}
   * @returns {@link PasswordsStrengthCheckResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  strengthCheck(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/passwords/strength_check`,
      data
    });
  }
  /**
   * Adds an existing password to a User's email that doesn't have a password yet. We support migrating users
   * from passwords stored with `bcrypt`, `scrypt`, `argon2`, `MD-5`, `SHA-1`, or `PBKDF2`. This endpoint has
   * a rate limit of 100 requests per second.
   * @param data {@link PasswordsMigrateRequest}
   * @returns {@link PasswordsMigrateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  migrate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/passwords/migrate`,
      data
    });
  }

}

exports.Passwords = Passwords;