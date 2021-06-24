"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SMS {
  constructor(client, base_path) {
    _defineProperty(this, "delivery", "sms");

    this.client = client;
    this.base_path = base_path;
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(request) {
    return this.client.post(this.endpoint("send_by_sms"), {
      body: request
    });
  }

  loginOrCreate(request) {
    return this.client.post(this.endpoint("login_or_create"), {
      body: request
    });
  }

}

class OTPs {
  constructor(client) {
    _defineProperty(this, "base_path", "otps");

    this.client = client;
    this.sms = new SMS(client, this.base_path);
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticate(request) {
    return this.client.post(this.endpoint("authenticate"), {
      body: request
    });
  }

}

exports.default = OTPs;