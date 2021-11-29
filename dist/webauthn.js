"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebAuthn = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WebAuthn {
  constructor(client) {
    _defineProperty(this, "base_path", "webauthn");

    this.client = client;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  registerStart(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("register/start"),
      data
    });
  }

  register(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("register"),
      data
    });
  }

  authenticateStart(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
      data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    });
  }

}

exports.WebAuthn = WebAuthn;