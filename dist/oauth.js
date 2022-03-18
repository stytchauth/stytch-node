"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class OAuth {
  constructor(fetchConfig) {
    _defineProperty(this, "base_path", "oauth");

    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticate(token, data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: {
        token,
        ...data
      }
    });
  }

}

exports.OAuth = OAuth;