"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SamlShieldClient = exports.SamlShield = void 0;
var _client = require("../shared/client");
var _errors = require("../shared/errors");
require("../shared/method_options");
// Request type for `samlshield.validate`.

// Response type for `samlshield.validate`.

class SamlShield {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }
  async validate(data) {
    const baseURL = this.fetchConfig.baseURL;
    const url = new URL(`/v1/saml/validate`, baseURL);
    let response;
    try {
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("SAMLResponse", data.SAMLResponse);
      response = await fetch(url.toString(), {
        method: "POST",
        body: urlEncodedData,
        // @ts-expect-error [AUTH-2047] things fail catastrophically when using the NextJS fetch-cache
        // so we need to explicitly opt out of it using the "no-store" tag - which isn't part of the core Node fetch API
        cache: "no-store",
        ...this.fetchConfig,
        headers: this.fetchConfig.headers
      });
    } catch (e) {
      const err = e;
      throw new _errors.RequestError(err.message, {
        url: url.toString(),
        method: "POST",
        headers: this.fetchConfig.headers,
        data: data
      });
    }
    let responseJSON;
    try {
      responseJSON = await response.json();
    } catch (e) {
      const err = e;
      throw new _errors.RequestError(`Unable to parse JSON response from server: ${err.message}`, {
        url: url.toString(),
        method: "POST",
        headers: this.fetchConfig.headers,
        data: data
      });
    }
    if (response.status >= 400) {
      throw new _errors.StytchError(responseJSON);
    }
    return responseJSON;
  }
}
exports.SamlShield = SamlShield;
class SamlShieldClient extends _client.BaseClient {
  constructor(config) {
    if (typeof config != "object") {
      throw new Error("Unexpected config type. Refer to https://github.com/stytchauth/stytch-node for how to use the Node client library.");
    }
    if (!config.public_key) {
      throw new Error('Missing "public_key" in config');
    }

    // Convert SAML Shield config to BaseClient config format
    const baseClientConfig = {
      project_id: config.public_key,
      // Use public_key as project_id for SAML Shield
      secret: "saml-shield-placeholder",
      // SAML Shield doesn't use secret, but BaseClient requires it
      timeout: config.timeout,
      dispatcher: config.dispatcher,
      custom_base_url: config.custom_base_url || "https://api.samlshield.com"
    };
    super(baseClientConfig);

    // Override the headers and auth for SAML Shield specific requirements
    this.fetchConfig.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": this.fetchConfig.headers["User-Agent"],
      // Keep the User-Agent from BaseClient
      Authorization: "Bearer " + config.public_key
    };
    this.saml = new SamlShield(this.fetchConfig);
  }
}
exports.SamlShieldClient = SamlShieldClient;