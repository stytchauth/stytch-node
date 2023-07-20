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
  } // Send a discovery magic link to an email address.


  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/magic_links/email/discovery/send`,
      data
    });
  }

}

exports.Discovery = Discovery;