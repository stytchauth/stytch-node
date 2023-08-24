// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import { Discovery } from "./magic_links_email_discovery";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { request } from "../shared";

// Request type for `magicLinks.email.invite`.
export interface B2BMagicLinksEmailInviteRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // The email address of the Member.
  email_address: string;
  /**
   * The URL that the Member clicks from the invite Email Magic Link. This URL should be an endpoint in the
   * backend server that verifies
   *   the request by querying Stytch's authenticate endpoint and finishes the invite flow. If this value is
   * not passed, the default `invite_redirect_url`
   *   that you set in your Dashboard is used. If you have not set a default `invite_redirect_url`, an error
   * is returned.
   */
  invite_redirect_url?: string;
  // The `member_id` of the Member who sends the invite.
  invited_by_member_id?: string;
  // The name of the Member.
  name?: string;
  // An arbitrary JSON object for storing application-specific data or identity-provider-specific data.
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
   *   frontend SDK, and should not be used to store critical information. See the
   * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
   *   for complete field behavior details.
   */
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Use a custom template for invite emails. By default, it will use your default email template. The
   * template must be a template
   *   using our built-in customizations or a custom HTML email for Magic Links - Invite.
   */
  invite_template_id?: string;
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
  locale?: "en" | "es" | "pt-br" | string;
}

// Response type for `magicLinks.email.invite`.
export interface B2BMagicLinksEmailInviteResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object)
  member: Member;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `magicLinks.email.loginOrSignup`.
export interface B2BMagicLinksEmailLoginOrSignupRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // The email address of the Member.
  email_address: string;
  /**
   * The URL that the Member clicks from the login Email Magic Link. This URL should be an endpoint in the
   * backend server that
   *   verifies the request by querying Stytch's authenticate endpoint and finishes the login. If this value
   * is not passed, the default login
   *   redirect URL that you set in your Dashboard is used. If you have not set a default login redirect URL,
   * an error is returned.
   */
  login_redirect_url?: string;
  /**
   * The URL the Member clicks from the signup Email Magic Link. This URL should be an endpoint in the
   * backend server that verifies
   *   the request by querying Stytch's authenticate endpoint and finishes the login. If this value is not
   * passed, the default sign-up redirect URL
   *   that you set in your Dashboard is used. If you have not set a default sign-up redirect URL, an error
   * is returned.
   */
  signup_redirect_url?: string;
  /**
   * A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends
   * on the same device.
   */
  pkce_code_challenge?: string;
  /**
   * Use a custom template for login emails. By default, it will use your default email template. The
   * template must be from Stytch's
   * built-in customizations or a custom HTML email for Magic Links - Login.
   */
  login_template_id?: string;
  /**
   * Use a custom template for signup emails. By default, it will use your default email template. The
   * template must be from Stytch's
   * built-in customizations or a custom HTML email for Magic Links - Signup.
   */
  signup_template_id?: string;
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
  locale?: "en" | "es" | "pt-br" | string;
}

// Response type for `magicLinks.email.loginOrSignup`.
export interface B2BMagicLinksEmailLoginOrSignupResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  /**
   * A flag indicating `true` if a new Member object was created and `false` if the Member object already
   * existed.
   */
  member_created: boolean;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object)
  member: Member;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

export class Email {
  private fetchConfig: fetchConfig;
  discovery: Discovery;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.discovery = new Discovery(this.fetchConfig);
  }

  /**
   * Send either a login or signup magic link to a Member. A new, pending, or invited Member will receive a
   * signup Email Magic Link. Members will have a `pending` status until they successfully authenticate. An
   * active Member will receive a login Email Magic Link.
   * @param data {@link B2BMagicLinksEmailLoginOrSignupRequest}
   * @returns {@link B2BMagicLinksEmailLoginOrSignupResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  loginOrSignup(
    data: B2BMagicLinksEmailLoginOrSignupRequest
  ): Promise<B2BMagicLinksEmailLoginOrSignupResponse> {
    return request<B2BMagicLinksEmailLoginOrSignupResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/magic_links/email/login_or_signup`,
      data,
    });
  }

  /**
   * Send an invite email to a new Member to join an Organization. The Member will be created with an
   * `invited` status until they successfully authenticate. Sending invites to `pending` Members will update
   * their status to `invited`. Sending invites to already `active` Members will return an error.
   * @param data {@link B2BMagicLinksEmailInviteRequest}
   * @returns {@link B2BMagicLinksEmailInviteResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  invite(
    data: B2BMagicLinksEmailInviteRequest
  ): Promise<B2BMagicLinksEmailInviteResponse> {
    return request<B2BMagicLinksEmailInviteResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/magic_links/email/invite`,
      data,
    });
  }
}