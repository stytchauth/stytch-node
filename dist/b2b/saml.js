"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SAML = void 0;

var _shared = require("../shared");

class SAML {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  create({
    organization_id,
    ...data
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `sso/saml/${organization_id}`,
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
      url: `sso/saml/${organization_id}/connections/${connection_id}`,
      data
    });
  }

  deleteVerificationCertificate({
    organization_id,
    connection_id,
    certificate_id
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `sso/saml/${organization_id}/connections/${connection_id}/verification_certificates/${certificate_id}`
    });
  }

}

exports.SAML = SAML;