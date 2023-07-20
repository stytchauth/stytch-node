"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOTPs = void 0;

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
class TOTPs {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }
  /**
   * Create a new TOTP instance for a user. The user can use the authenticator application of their choice to
   * scan the QR code or enter the secret.
   */


  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/totps`,
      data
    });
  } // Authenticate a TOTP code entered by a user.


  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/totps/authenticate`,
      data
    });
  } // Retrieve the recovery codes for a TOTP instance tied to a User.


  recoveryCodes(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/totps/recovery_codes`,
      data
    });
  } // Authenticate a recovery code for a TOTP instance.


  recover(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/totps/recover`,
      data
    });
  }

}

exports.TOTPs = TOTPs;