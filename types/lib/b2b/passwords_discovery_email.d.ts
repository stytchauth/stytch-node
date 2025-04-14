import { DiscoveredOrganization } from "./discovery";
import { fetchConfig } from "../shared";
export interface B2BPasswordsDiscoveryEmailResetRequest {
    password_reset_token: string;
    /**
     * The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g.
     * spaces, emojis, non-English characers, etc.
     */
    password: string;
    pkce_code_verifier?: string;
}
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
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BPasswordsDiscoveryEmailResetStartRequest {
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
     * The template must be a template using our built-in customizations or a custom HTML email for Passwords -
     * Reset Password.
     */
    reset_password_template_id?: string;
    reset_password_expiration_minutes?: number;
    pkce_code_challenge?: string;
    /**
     * Used to determine which language to use when sending the user this delivery method. Parameter is a
     * [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.
     *
     * Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian
     * Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.
     *
     * Request support for additional languages
     * [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!
     *
     */
    locale?: string;
    /**
     * Use a custom template for verification emails sent during password reset flows. This template will be
     * used the first time a user sets a password via a
     *   password reset flow. By default, it will use your default email template. The template must be a
     * template using our built-in customizations or a custom HTML email for Passwords - Email Verification.
     */
    verify_email_template_id?: string;
}
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
export declare class Email {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
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
    resetStart(data: B2BPasswordsDiscoveryEmailResetStartRequest): Promise<B2BPasswordsDiscoveryEmailResetStartResponse>;
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
    reset(data: B2BPasswordsDiscoveryEmailResetRequest): Promise<B2BPasswordsDiscoveryEmailResetResponse>;
}
