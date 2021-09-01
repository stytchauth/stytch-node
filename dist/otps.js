"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTPs = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Email {
  constructor(client, base_path) {
    _defineProperty(this, "delivery", "email");

    this.client = client;
    this.base_path = base_path;
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

}

class SMS {
  constructor(client, base_path) {
    _defineProperty(this, "delivery", "sms");

    this.client = client;
    this.base_path = base_path;
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

}

class WhatsApp {
  constructor(client, base_path) {
    _defineProperty(this, "delivery", "whatsapp");

    this.client = client;
    this.base_path = base_path;
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

}

class OTPs {
  constructor(client) {
    _defineProperty(this, "base_path", "otps");

    this.client = client;
    this.email = new Email(client, this.base_path);
    this.sms = new SMS(client, this.base_path);
    this.whatsapp = new WhatsApp(client, this.base_path);
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticate(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    });
  }

}

exports.OTPs = OTPs;