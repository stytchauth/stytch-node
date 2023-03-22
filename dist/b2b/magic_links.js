"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicLinks = void 0;

var _shared = require("../shared");

class Discovery {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: "magic_links/email/discovery/send",
      data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: "magic_links/email/discovery/authenticate",
      data
    });
  }

}

class Email {
  delivery = "email";

  constructor(fetchConfig, parent_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
    this.discovery = new Discovery(fetchConfig);
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  loginOrSignup(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_signup"),
      data
    });
  }

  invite(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("invite"),
      data
    });
  }

}

class MagicLinks {
  base_path = "magic_links";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
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

exports.MagicLinks = MagicLinks;