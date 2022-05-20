"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTPs = void 0;

var _shared = require("./shared");

class Email {
  delivery = "email";

  constructor(fetchConfig, base_path) {
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
  delivery = "sms";

  constructor(fetchConfig, base_path) {
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
  delivery = "whatsapp";

  constructor(fetchConfig, base_path) {
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
  base_path = "otps";

  constructor(fetchConfig) {
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
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.OTPs = OTPs;