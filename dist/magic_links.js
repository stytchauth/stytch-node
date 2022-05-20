"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicLinks = void 0;

var _shared = require("./shared");

// eslint-disable-line @typescript-eslint/no-empty-interface
class Email {
  delivery = "email";

  constructor(fetchConfig, parent_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
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

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
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

  revokeInvite(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke_invite"),
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

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data: data
    });
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
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.MagicLinks = MagicLinks;