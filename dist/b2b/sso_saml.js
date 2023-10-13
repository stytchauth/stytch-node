"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SAML = void 0;
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `sso.saml.createConnection`.

// Response type for `sso.saml.createConnection`.

// Request type for `sso.saml.deleteVerificationCertificate`.

// Response type for `sso.saml.deleteVerificationCertificate`.

// Request type for `sso.saml.updateConnection`.

// Response type for `sso.saml.updateConnection`.

class SAML {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Create a new SAML Connection.
   * @param data {@link B2BSSOSAMLCreateConnectionRequest}
   * @returns {@link B2BSSOSAMLCreateConnectionResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  createConnection(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/sso/saml/${data.organization_id}`,
      headers,
      data: {
        display_name: data.display_name
      }
    });
  }

  /**
   * Updates an existing SAML connection.
   *
   * Note that a newly created connection will not become active until all of the following are provided:
   * * `idp_sso_url`
   * * `attribute_mapping`
   * * `idp_entity_id`
   * * `x509_certificate`
   * @param data {@link B2BSSOSAMLUpdateConnectionRequest}
   * @returns {@link B2BSSOSAMLUpdateConnectionResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  updateConnection(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/b2b/sso/saml/${data.organization_id}/connections/${data.connection_id}`,
      headers,
      data: {
        idp_entity_id: data.idp_entity_id,
        display_name: data.display_name,
        attribute_mapping: data.attribute_mapping,
        x509_certificate: data.x509_certificate,
        idp_sso_url: data.idp_sso_url
      }
    });
  }

  /**
   * Delete a SAML verification certificate.
   *
   * You may need to do this when rotating certificates from your IdP, since Stytch allows a maximum of 5
   * certificates per connection. There must always be at least one certificate per active connection.
   * @param data {@link B2BSSOSAMLDeleteVerificationCertificateRequest}
   * @returns {@link B2BSSOSAMLDeleteVerificationCertificateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteVerificationCertificate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/sso/saml/${data.organization_id}/connections/${data.connection_id}/verification_certificates/${data.certificate_id}`,
      headers,
      data: {}
    });
  }
}
exports.SAML = SAML;