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
   */


  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/magic_links/authenticate`,
      data
    });
  }

}

exports.MagicLinks = MagicLinks;