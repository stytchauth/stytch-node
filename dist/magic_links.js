"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicLinks = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-line @typescript-eslint/no-empty-interface
class Email {
  constructor(client, parent_path) {
    _defineProperty(this, "delivery", "email");

    this.client = client;
    this.base_path = `${parent_path}`;
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("send"),
      data
    });
  }

  loginOrCreate(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

  invite(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("invite"),
      data
    });
  }

  revokeInvite(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("revoke_invite"),
      data
    });
  }

}

class MagicLinks {
  constructor(client) {
    _defineProperty(this, "base_path", "magic_links");

    this.client = client;
    this.email = new Email(client, this.base_path);
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.base_path,
      data: data
    });
  }

  authenticate(token, data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: {
        token,
        ...data
      }
    });
  }

}

exports.MagicLinks = MagicLinks;