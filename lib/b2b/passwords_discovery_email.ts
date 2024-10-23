// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import { DiscoveredOrganization } from "./discovery";
import { fetchConfig } from "../shared";
import { request } from "../shared";

// Request type for `passwords.discovery.email.reset`.
export interface B2BPasswordsDiscoveryEmailResetRequest {
  // The password reset token to authenticate.
  password_reset_token: string;
  /**
   * The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g.
   * spaces, emojis, non-English characers, etc.
   */
  password: string;
  pkce_code_verifier?: string;
  /**
   * If the needs to complete an MFA step, and the Member has a phone number, this endpoint will
   * pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be
   * used to determine which language to use when sending the passcode.
   *
   * Parameter is a [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/),
   * e.g. `"en"`.
   *
   * Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese
   * (`"pt-br"`); if no value is provided, the copy defaults to English.
   *
   * Request support for additional languages
   * [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!
   *
   */
  locale?: string;
}

// Response type for `passwords.discovery.email.reset`.
export interface B2BPasswordsDiscoveryEmailResetResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  /**
   * The returned Intermediate Session Token contains a password factor associated with the Member. If this
   * value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The
   * token can be used with the
   * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
   * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
   * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
   * MFA flow and log in to the Organization. Password factors are not transferable between Organizations, so
   * the intermediate session token is not valid for use with discovery endpoints.
   */
  intermediate_session_token: string;
  email_address: string;
  discovered_organizations: DiscoveredOrganization[];
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `passwords.discovery.email.resetStart`.
export interface B2BPasswordsDiscoveryEmailResetStartRequest {
  // The email address of the Member to start the email reset process for.
  email_address: string;
  /**
   * The URL that the Member clicks from the reset password link. This URL should be an endpoint in the
   * backend server that verifies the request by querying
   *   Stytch's authenticate endpoint and finishes the reset password flow. If this value is not passed, the
   * default `reset_password_redirect_url` that you set in your Dashboard is used.
   *   If you have not set a default `reset_password_redirect_url`, an error is returned.
   */
  reset_password_redirect_url?: string;
  /**
   * The URL that the end user clicks from the discovery Magic Link. This URL should be an endpoint in the
   * backend server that
   *   verifies the request by querying Stytch's discovery authenticate endpoint and continues the flow. If
   * this value is not passed, the default
   *   discovery redirect URL that you set in your Dashboard is used. If you have not set a default discovery
   * redirect URL, an error is returned.
   */
  discovery_redirect_url?: string;
  /**
   * Use a custom template for reset password emails. By default, it will use your default email template.
   * The template must be a template using our built-in customizations or a custom HTML email for Magic Links
   * - Reset Password.
   */
  reset_password_template_id?: string;
  // Sets a time limit after which the email link to reset the member's password will no longer be valid.
  reset_password_expiration_minutes?: number;
  pkce_code_challenge?: string;
  /**
   * Used to determine which language to use when sending the user this delivery method. Parameter is a
   * [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.
   *
   * Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese
   * (`"pt-br"`); if no value is provided, the copy defaults to English.
   *
   * Request support for additional languages
   * [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!
   *
   */
  locale?: string;
}

// Response type for `passwords.discovery.email.resetStart`.
export interface B2BPasswordsDiscoveryEmailResetStartResponse {
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
}

export class Email {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Initiates a password reset for the email address provided, when cross-org passwords are enabled. This
   * will trigger an email to be sent to the address, containing a magic link that will allow them to set a
   * new password and authenticate.
   *
   * This endpoint adapts to your Project's password strength configuration.
   * If you're using [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the default, your
   * passwords are considered valid
   * if the strength score is >= 3. If you're using
   * [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), your passwords are
   * considered valid if they meet the requirements that you've set with Stytch.
   * You may update your password strength configuration in the
   * [stytch dashboard](https://stytch.com/dashboard/password-strength-config).
   * @param data {@link B2BPasswordsDiscoveryEmailResetStartRequest}
   * @returns {@link B2BPasswordsDiscoveryEmailResetStartResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  resetStart(
    data: B2BPasswordsDiscoveryEmailResetStartRequest
  ): Promise<B2BPasswordsDiscoveryEmailResetStartResponse> {
    const headers: Record<string, string> = {};
    return request<B2BPasswordsDiscoveryEmailResetStartResponse>(
      this.fetchConfig,
      {
        method: "POST",
        url: `/v1/b2b/passwords/discovery/email/reset/start`,
        headers,
        data,
      }
    );
  }

  /**
   * Reset the password associated with an email and start an intermediate session. This endpoint checks that
   * the password reset token is valid, hasn’t expired, or already been used.
   *
   * The provided password needs to meet the project's password strength requirements, which can be checked
   * in advance with the password strength endpoint. If the token and password are accepted, the password is
   * securely stored for future authentication and the user is authenticated.
   *
   * Resetting a password will start an intermediate session and return a list of discovered organizations
   * the session can be exchanged into.
   * @param data {@link B2BPasswordsDiscoveryEmailResetRequest}
   * @returns {@link B2BPasswordsDiscoveryEmailResetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  reset(
    data: B2BPasswordsDiscoveryEmailResetRequest
  ): Promise<B2BPasswordsDiscoveryEmailResetResponse> {
    const headers: Record<string, string> = {};
    return request<B2BPasswordsDiscoveryEmailResetResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/passwords/discovery/email/reset`,
      headers,
      data,
    });
  }
}
