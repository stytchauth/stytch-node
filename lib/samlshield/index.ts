import type { Dispatcher } from "undici";
import { BaseClient } from "../shared/client";
import { fetchConfig } from "../shared";
import { RequestError, StytchError, StytchErrorJSON } from "../shared/errors";
import {} from "../shared/method_options";

export interface SamlShieldClientConfig {
  public_token: string;
  timeout?: number;
  dispatcher?: Dispatcher;
  custom_base_url?: string;
}

// Request type for `samlshield.validate`.
export interface SamlShieldValidateRequest {
  /**
   * The SAML response to validate. This should be the base64 encoded SAML response from the IdP
   * and not the raw XML.
   */
  SAMLResponse: string;
}

// Response type for `samlshield.validate`.
export interface SamlShieldValidateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
  message: string;
}

export class SamlShield {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  async validate(
    data: SamlShieldValidateRequest
  ): Promise<SamlShieldValidateResponse> {
    const baseURL = this.fetchConfig.baseURL;
    const url = new URL(`/v1/saml/validate`, baseURL);

    let response: Response;
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
        headers: this.fetchConfig.headers,
      });
    } catch (e) {
      const err = e as Error;
      throw new RequestError(err.message, {
        url: url.toString(),
        method: "POST",
        headers: this.fetchConfig.headers,
        data: data,
      });
    }

    let responseJSON;
    try {
      responseJSON = await response.json();
    } catch (e) {
      const err = e as Error;
      throw new RequestError(
        `Unable to parse JSON response from server: ${err.message}`,
        {
          url: url.toString(),
          method: "POST",
          headers: this.fetchConfig.headers,
          data: data,
        }
      );
    }

    if (response.status >= 400) {
      throw new StytchError(responseJSON as StytchErrorJSON);
    }

    return responseJSON as SamlShieldValidateResponse;
  }
}

export class SamlShieldClient extends BaseClient {
  saml: SamlShield;

  constructor(config: SamlShieldClientConfig) {
    if (typeof config != "object") {
      throw new Error(
        "Unexpected config type. Refer to https://github.com/stytchauth/stytch-node for how to use the Node client library."
      );
    }

    if (!config.public_token) {
      throw new Error('Missing "public_token" in config');
    }

    // Convert SAML Shield config to BaseClient config format
    const baseClientConfig = {
      project_id: config.public_token, // Use public_token as project_id for SAML Shield
      secret: "saml-shield-placeholder", // SAML Shield doesn't use secret, but BaseClient requires it
      timeout: config.timeout,
      dispatcher: config.dispatcher,
      custom_base_url: config.custom_base_url || "https://api.samlshield.com",
    };

    super(baseClientConfig);

    // Override the headers and auth for SAML Shield specific requirements
    this.fetchConfig.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": this.fetchConfig.headers["User-Agent"], // Keep the User-Agent from BaseClient
      Authorization: "Bearer " + config.public_token,
    };

    this.saml = new SamlShield(this.fetchConfig);
  }
}
