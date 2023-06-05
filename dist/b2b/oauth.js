"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = void 0;

var _shared = require("../shared");

class Discovery {
  base_path = "oauth/discovery";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    });
  }

}

class OAuth {
  base_path = "oauth";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.discovery = new Discovery(fetchConfig);
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    });
  }

}

exports.OAuth = OAuth;