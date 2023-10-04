import { Attributes } from "./attribute";
import { fetchConfig } from "../shared";
import { Options } from "./magic_links";
import { Session } from "./sessions";
import { User } from "./users";
export interface PasswordsEmailResetRequest {
    /**
     * The Passwords `token` from the `?token=` query parameter in the URL.
     *
     *       In the redirect URL, the `stytch_token_type` will be `login` or `reset_password`.
     *
     *       See examples and read more about redirect URLs
     * [here](https://stytch.com/docs/guides/dashboard/redirect-urls).
     */
    token: string;
    password: string;
    session_token?: string;
    /**
     * Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't
     * already exist,
     *   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the
     * `session_jwt` will have a fixed lifetime of
     *   five minutes regardless of the underlying session duration, and will need to be refreshed over time.
     *
     *   This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).
     *
     *   If a `session_token` or `session_jwt` is provided then a successful authentication will continue to
     * extend the session this many minutes.
     *
     *   If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created.
     */
    session_duration_minutes?: number;
    session_jwt?: string;
    code_verifier?: string;
    /**
     * Add a custom claims map to the Session being authenticated. Claims are only created if a Session is
     * initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session
     * object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key,
     * supply a null value.
     *
     *   Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be
     * ignored. Total custom claims size cannot exceed four kilobytes.
     */
    session_custom_claims?: Record<string, any>;
    attributes?: Attributes;
    options?: Options;
}
export interface PasswordsEmailResetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    session_token: string;
    session_jwt: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll
     * receive a full Session object in the response.
     *
     *   See [GET sessions](https://stytch.com/docs/api/session-get) for complete response fields.
     *
     */
    session?: Session;
}
export interface PasswordsEmailResetStartRequest {
    email: string;
    /**
     * The url that the user clicks from the password reset email to finish the reset password flow.
     *   This should be a url that your app receives and parses before showing your app's reset password page.
     *   After the user submits a new password to your app, it should send an API request to complete the
     * password reset process.
     *   If this value is not passed, the default reset password redirect URL that you set in your Dashboard is
     * used.
     *   If you have not set a default reset password redirect URL, an error is returned.
     */
    reset_password_redirect_url?: string;
    /**
     * Set the expiration for the password reset, in minutes. By default, it expires in 30 minutes.
     *   The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    reset_password_expiration_minutes?: number;
    /**
     * A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends
     * on the same device.
     */
    code_challenge?: string;
    attributes?: Attributes;
    /**
     * The URL Stytch redirects to after the OAuth flow is completed for a user that already exists. This URL
     * should be a route in your application which will run `oauth.authenticate` (see below) and finish the
     * login.
     *
     *   The URL must be configured as a Login URL in the [Redirect URL page](/dashboard/redirect-urls). If the
     * field is not specified, the default Login URL will be used.
     */
    login_redirect_url?: string;
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
    /**
     * Use a custom template for password reset emails. By default, it will use your default email template.
     *   The template must be a template using our built-in customizations or a custom HTML email for Passwords
     * - Password reset.
     */
    reset_password_template_id?: string;
}
export interface PasswordsEmailResetStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    email_id: string;
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
     * Initiates a password reset for the email address provided. This will trigger an email to be sent to the
     * address, containing a magic link that will allow them to set a new password and authenticate.
     * @param data {@link PasswordsEmailResetStartRequest}
     * @returns {@link PasswordsEmailResetStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    resetStart(data: PasswordsEmailResetStartRequest): Promise<PasswordsEmailResetStartResponse>;
    /**
     * Reset the user’s password and authenticate them. This endpoint checks that the magic link `token` is
     * valid, hasn’t expired, or already been used – and can optionally require additional security settings,
     * such as the IP address and user agent matching the initial reset request.
     *
     * The provided password needs to meet our password strength requirements, which can be checked in advance
     * with the password strength endpoint. If the token and password are accepted, the password is securely
     * stored for future authentication and the user is authenticated.
     *
     * Note that a successful password reset by email will revoke all active sessions for the `user_id`.
     * @param data {@link PasswordsEmailResetRequest}
     * @returns {@link PasswordsEmailResetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    reset(data: PasswordsEmailResetRequest): Promise<PasswordsEmailResetResponse>;
}
