"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OIDC = void 0;

var _shared = require("../shared");

class OIDC {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  create({
    organization_id,
    ...data
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `sso/oidc/${organization_id}`,
      data
    });
  }

  update({
    organization_id,
    connection_id,
    ...data
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `sso/oidc/${organization_id}/connections/${connection_id}`,
      data
    });
  }

}

exports.OIDC = OIDC;