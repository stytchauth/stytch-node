import type { Dispatcher } from "undici";
import { version } from "../../package.json";
import { fetchConfig } from "../shared";
import { RequestError, StytchError, StytchErrorJSON } from "../shared/errors";
import {} from "../shared/method_options";

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

export interface ClientConfig {
  public_key: string;
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

export class SamlShieldClient {
  saml: SamlShield;
  protected fetchConfig: fetchConfig;
  protected baseURL: string;

  constructor(config: ClientConfig) {
    if (typeof config != "object") {
      throw new Error(
        "Unexpected config type. Refer to https://github.com/stytchauth/stytch-node for how to use the Node client library."
      );
    }

    if (!config.public_key) {
      throw new Error('Missing "public_key" in config');
    }

    // Validate custom_base_url is using HTTPS
    if (
      config.custom_base_url &&
      !config.custom_base_url.startsWith("https://")
    ) {
      throw new Error("custom_base_url must use HTTPS scheme");
    }

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": `Stytch Node v${version}`,
      Authorization: "Bearer " + config.public_key,
    };

    const baseURL = config.custom_base_url || "https://api.samlshield.com";
    this.fetchConfig = {
      baseURL: baseURL,
      fraudBaseURL: "",
      headers,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      dispatcher: config.dispatcher,
    };

    // Get a baseURL that ends with a slash to make building route URLs easier.
    this.baseURL = baseURL;
    if (!this.baseURL.endsWith("/")) {
      this.baseURL += "/";
    }

    this.saml = new SamlShield(this.fetchConfig);
  }
}
