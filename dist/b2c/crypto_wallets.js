"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CryptoWallets = void 0;
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `cryptoWallets.authenticate`.

// Response type for `cryptoWallets.authenticate`.

// Request type for `cryptoWallets.authenticateStart`.

// Response type for `cryptoWallets.authenticateStart`.

class CryptoWallets {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Initiate the authentication of a crypto wallet. After calling this endpoint, the user will need to sign
   * a message containing only the returned `challenge` field.
   * @param data {@link CryptoWalletsAuthenticateStartRequest}
   * @returns {@link CryptoWalletsAuthenticateStartResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticateStart(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/crypto_wallets/authenticate/start`,
      headers,
      data
    });
  }

  /**
   * Complete the authentication of a crypto wallet by passing the signature.
   * @param data {@link CryptoWalletsAuthenticateRequest}
   * @returns {@link CryptoWalletsAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/crypto_wallets/authenticate`,
      headers,
      data
    });
  }
}
exports.CryptoWallets = CryptoWallets;