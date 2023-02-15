"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sessions = void 0;

var _shared = require("../shared");

class Sessions {
  base_path = "sessions";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  get({
    organization_id,
    member_id
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: this.base_path,
      params: {
        organization_id,
        member_id
      }
    });
  }

  jwks(project_id) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(`jwks/${project_id}`)
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    });
  }

  revoke(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke"),
      data
    });
  }

}

exports.Sessions = Sessions;