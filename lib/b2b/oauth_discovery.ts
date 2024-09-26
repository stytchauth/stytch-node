// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import { DiscoveredOrganization } from "./discovery";
import { fetchConfig } from "../shared";
import { request } from "../shared";

// Request type for `oauth.discovery.authenticate`.
export interface B2BOAuthDiscoveryAuthenticateRequest {
  // The Discovery OAuth token to authenticate.
  discovery_oauth_token: string;
  session_token?: string;
  session_duration_minutes?: number;
  session_jwt?: string;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  // A base64url encoded one time secret used to validate that the request starts and ends on the same device.
  pkce_code_verifier?: string;
}

// Response type for `oauth.discovery.authenticate`.
export interface B2BOAuthDiscoveryAuthenticateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  /**
   * The Intermediate Session Token. This token does not necessarily belong to a specific instance of a
   * Member, but represents a bag of factors that may be converted to a member session. The token can be used
   * with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
   * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
   * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
   * MFA flow and log in to the Organization. It can also be used with the
   * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
   * to join a specific Organization that allows the factors represented by the intermediate session token;
   * or the
   * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member.
   */
  intermediate_session_token: string;
  // The email address.
  email_address: string;
  /**
   * An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`,
   * or `session_jwt`. See the
   * [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for
   * complete details.
   *
   *   Note that Organizations will only appear here under any of the following conditions:
   *   1. The end user is already a Member of the Organization.
   *   2. The end user is invited to the Organization.
   *   3. The end user can join the Organization because:
   *
   *       a) The Organization allows JIT provisioning.
   *
   *       b) The Organizations' allowed domains list contains the Member's email domain.
   *
   *       c) The Organization has at least one other Member with a verified email address with the same
   * domain as the end user (to prevent phishing attacks).
   */
  discovered_organizations: DiscoveredOrganization[];
  provider_type: string;
  provider_tenant_id: string;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

export class Discovery {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Authenticates the Discovery token and exchanges it for an Intermediate Session Token. Intermediate
   * Session Tokens can be used for various Discovery login flows and are valid for 10 minutes.
   * @param data {@link B2BOAuthDiscoveryAuthenticateRequest}
   * @returns {@link B2BOAuthDiscoveryAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticate(
    data: B2BOAuthDiscoveryAuthenticateRequest
  ): Promise<B2BOAuthDiscoveryAuthenticateResponse> {
    const headers: Record<string, string> = {};
    return request<B2BOAuthDiscoveryAuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/oauth/discovery/authenticate`,
      headers,
      data,
    });
  }
}
