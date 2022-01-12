"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOTPs = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TOTPs {
  constructor(client) {
    _defineProperty(this, "base_path", "totps");

    this.client = client;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.base_path,
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

  recoveryCodes(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("recovery_codes"),
      data
    });
  }

  recover(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("recover"),
      data
    });
  }

}

exports.TOTPs = TOTPs;