"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Discovery = void 0;
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `magicLinks.email.discovery.send`.

// Response type for `magicLinks.email.discovery.send`.

class Discovery {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Send a discovery magic link to an email address.
   * @param data {@link B2BMagicLinksEmailDiscoverySendRequest}
   * @returns {@link B2BMagicLinksEmailDiscoverySendResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/magic_links/email/discovery/send`,
      data
    });
  }
}
exports.Discovery = Discovery;