"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CryptoWallets = void 0;

var _shared = require("./shared");

class CryptoWallets {
  base_path = "crypto_wallets";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticateStart(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
      data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.CryptoWallets = CryptoWallets;