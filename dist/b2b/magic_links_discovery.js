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
class Discovery {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }
  /**
   * Authenticates the Discovery Magic Link token and exchanges it for an Intermediate Session Token.
   * Intermediate Session Tokens can be used for various Discovery login flows and are valid for 10 minutes.
   */


  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/magic_links/discovery/authenticate`,
      data
    });
  }

}

exports.Discovery = Discovery;