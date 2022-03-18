"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTPs = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Email {
  constructor(fetchConfig, base_path) {
    _defineProperty(this, "delivery", "email");

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

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

}

class SMS {
  constructor(fetchConfig, base_path) {
    _defineProperty(this, "delivery", "sms");

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

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

}

class WhatsApp {
  constructor(fetchConfig, base_path) {
    _defineProperty(this, "delivery", "whatsapp");

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

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

}

class OTPs {
  constructor(fetchConfig) {
    _defineProperty(this, "base_path", "otps");

    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
    this.sms = new SMS(fetchConfig, this.base_path);
    this.whatsapp = new WhatsApp(fetchConfig, this.base_path);
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

exports.OTPs = OTPs;