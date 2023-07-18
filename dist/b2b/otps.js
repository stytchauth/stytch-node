"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTPs = void 0;

var _shared = require("../shared");

class SMS {
  delivery = "sms";

  constructor(fetchConfig, base_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = base_path;
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    });
  }

}

class OTPs {
  base_path = "otps";

  constructor(fetchConfig) {
    this.sms = new SMS(fetchConfig, this.base_path);
  }

}

exports.OTPs = OTPs;