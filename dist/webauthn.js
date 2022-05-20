"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebAuthn = void 0;

var _shared = require("./shared");

class WebAuthn {
  base_path = "webauthn";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  registerStart(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register/start"),
      data
    });
  }

  register(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register"),
      data
    });
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

exports.WebAuthn = WebAuthn;