"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Discovery = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `otps.email.discovery.authenticate`.

// Response type for `otps.email.discovery.authenticate`.

// Request type for `otps.email.discovery.send`.

// Response type for `otps.email.discovery.send`.

class Discovery {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Send a discovery OTP to an email address. The OTP is valid for 10 minutes. Only the most recently sent
   * OTP is valid: when an OTP is sent, all OTPs previously sent to the same email address are invalidated,
   * even if unused or unexpired.
   * @param data {@link B2BOTPEmailDiscoverySendRequest}
   * @returns {@link B2BOTPEmailDiscoverySendResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  send(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/otps/email/discovery/send`,
      headers,
      data
    });
  }

  /**
   * Authenticates the OTP and returns an intermediate session token. Intermediate session tokens can be used
   * for various Discovery login flows and are valid for 10 minutes.
   * @param data {@link B2BOTPEmailDiscoveryAuthenticateRequest}
   * @returns {@link B2BOTPEmailDiscoveryAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/otps/email/discovery/authenticate`,
      headers,
      data
    });
  }
}
exports.Discovery = Discovery;