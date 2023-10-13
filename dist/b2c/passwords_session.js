"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sessions = void 0;
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `passwords.sessions.reset`.

// Response type for `passwords.sessions.reset`.

class Sessions {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Reset the user’s password using their existing session. The endpoint will error if the session does not
   * have a password, email magic link, or email OTP authentication factor that has been issued within the
   * last 5 minutes. This endpoint requires either a `session_jwt` or `session_token` be included in the
   * request.
   *
   * Note that a successful password reset via an existing session will revoke all active sessions for the
   * `user_id`, except for the one used during the reset flow.
   * @param data {@link PasswordsSessionResetRequest}
   * @returns {@link PasswordsSessionResetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  reset(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/passwords/session/reset`,
      headers,
      data
    });
  }
}
exports.Sessions = Sessions;