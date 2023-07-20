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
  } // Reset the User’s password using their existing password.


  reset(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/passwords/existing_password/reset`,
      data
    });
  }

}

exports.ExistingPassword = ExistingPassword;