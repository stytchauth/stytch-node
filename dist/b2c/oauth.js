"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuth = void 0;

var _shared_b2c = require("./shared_b2c");

var _shared = require("../shared");

class OAuth {
  base_path = "oauth";

  constructor(fetchConfig) {
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
    }).then(res => {
      return { ...res,
        user: (0, _shared_b2c.parseUser)(res.user)
      };
    });
  }

  attach(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("attach"),
      data
    });
  }

}

exports.OAuth = OAuth;