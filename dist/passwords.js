"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Passwords = void 0;

var _shared = require("./shared");

class Passwords {
  base_path = "passwords";

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
      data: data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  resetByEmailStart(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset/start"),
      data: data
    });
  }

  resetByEmail(token, password, data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset"),
      data: {
        token,
        password,
        ...data
      }
    });
  }

  resetByExistingPassword(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("existing_password/reset"),
      data: data
    });
  }

  resetBySession(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("session/reset"),
      data: data
    });
  }

  strengthCheck(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("strength_check"),
      data: data
    });
  }

  migrate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("migrate"),
      data: data
    });
  }

}

exports.Passwords = Passwords;