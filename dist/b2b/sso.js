"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSO = void 0;

var _shared = require("../shared");

var _saml = require("./saml");

var _oidc = require("./oidc");

class SSO {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.saml = new _saml.SAML(fetchConfig);
    this.oidc = new _oidc.OIDC(fetchConfig);
  }

  get({
    organization_id
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `sso/${organization_id}`
    });
  }

  delete({
    organization_id,
    connection_id
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `sso/${organization_id}/connections/${connection_id}`
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `sso/authenticate`,
      data
    });
  }

}

exports.SSO = SSO;