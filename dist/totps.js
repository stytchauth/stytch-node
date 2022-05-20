"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOTPs = void 0;

var _shared = require("./shared");

class TOTPs {
  base_path = "totps";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
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

  recoveryCodes(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recovery_codes"),
      data
    });
  }

  recover(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recover"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.TOTPs = TOTPs;