"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Users {
  constructor(client) {
    _defineProperty(this, "base_path", "users");

    this.client = client;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.base_path,
      data
    });
  }

  get(userID) {
    return (0, _shared.request)(this.client, {
      method: "GET",
      url: this.endpoint(userID)
    });
  }

  update(userID, data) {
    return (0, _shared.request)(this.client, {
      method: "PUT",
      url: this.endpoint(userID),
      data
    });
  }

  delete(userID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(userID)
    });
  }

  getPending(params) {
    return (0, _shared.request)(this.client, {
      method: "GET",
      url: this.endpoint("pending"),
      params
    });
  }

  deleteEmail(emailID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`emails/${emailID}`)
    });
  }

  deletePhoneNumber(phoneID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`phone_numbers/${phoneID}`)
    });
  }

  deleteWebAuthnRegistration(webAuthnRegistrationID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`webauthn_registrations/${webAuthnRegistrationID}`)
    });
  }

}

exports.Users = Users;