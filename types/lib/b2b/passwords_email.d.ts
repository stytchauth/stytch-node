import { Authorization } from "../shared/method_options";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
export interface B2BPasswordsEmailRequireResetRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BPasswordsEmailRequireResetRequest {
    email_address: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id?: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id?: string;
}
export interface B2BPasswordsEmailRequireResetResponse {
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_id?: string;
    member?: Member;
    organization?: Organization;
}
export interface B2BPasswordsEmailResetRequest {
    password_reset_token: string;
    /**
     * The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g.
     * spaces, emojis, non-English characers, etc.
     */
    password: string;
    /**
     * Reuse an existing session instead of creating a new one. If you provide a `session_token`, Stytch will
     * update the session.
     *       If the `session_token` and `magic_links_token` belong to different Members, the `session_token`
     * will be ignored. This endpoint will error if
     *       both `session_token` and `session_jwt` are provided.
     */
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
     *   If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a
     * 60 minute duration. If you don't want
     *   to use the Stytch session product, you can ignore the session fields in the response.
     */
    session_duration_minutes?: number;
    /**
     * Reuse an existing session instead of creating a new one. If you provide a `session_jwt`, Stytch will
     * update the session. If the `session_jwt`
     *       and `magic_links_token` belong to different Members, the `session_jwt` will be ignored. This
     * endpoint will error if both `session_token` and `session_jwt`
     *       are provided.
     */
    session_jwt?: string;
    code_verifier?: string;
    /**
     * Add a custom claims map to the Session being authenticated. Claims are only created if a Session is
     * initialized by providing a value in
     *   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a
     * key in an existing Session, supply a new value. To
     *   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`,
     * `exp`, `nbf`, `iat`, `jti`) will be ignored.
     *   Total custom claims size cannot exceed four kilobytes.
     */
    session_custom_claims?: Record<string, any>;
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
    locale?: "en" | "es" | "pt-br" | "fr" | string;
    /**
     * Adds this primary authentication factor to the intermediate session token. If the resulting set of
     * factors satisfies the organization's primary authentication requirements and MFA requirements, the
     * intermediate session token will be consumed and converted to a member session. If not, the same
     * intermediate session token will be returned.
     */
    intermediate_session_token?: string;
}
export interface B2BPasswordsEmailResetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member_email_id: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    member: Member;
    session_token: string;
    session_jwt: string;
    organization: Organization;
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
    /**
     * Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step
     * to log in to the Organization.
     */
    member_authenticated: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
    mfa_required?: MfaRequired;
}
export interface B2BPasswordsEmailResetStartRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    email_address: string;
    /**
     * The URL that the Member clicks from the reset password link. This URL should be an endpoint in the
     * backend server that verifies the request by querying
     *   Stytch's authenticate endpoint and finishes the reset password flow. If this value is not passed, the
     * default `reset_password_redirect_url` that you set in your Dashboard is used.
     *   If you have not set a default `reset_password_redirect_url`, an error is returned.
     */
    reset_password_redirect_url?: string;
    reset_password_expiration_minutes?: number;
    /**
     * A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends
     * on the same device.
     */
    code_challenge?: string;
    /**
     * The URL that the member clicks from the reset without password link. This URL should be an endpoint in
     * the backend server
     *       that verifies the request by querying Stytch's authenticate endpoint and finishes the magic link
     * flow. If this value is not passed, the
     *       default `login_redirect_url` that you set in your Dashboard is used. This value is only used if
     * magic links are enabled for the member. If
     *       you have not set a default `login_redirect_url` and magic links are not enabled for the member, an
     * error is returned.
     */
    login_redirect_url?: string;
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
    locale?: "en" | "es" | "pt-br" | "fr" | string;
    /**
     * Use a custom template for reset password emails. By default, it will use your default email template.
     * The template must be a template using our built-in customizations or a custom HTML email for Passwords -
     * Reset Password.
     */
    reset_password_template_id?: string;
    /**
     * Use a custom template for verification emails sent during password reset flows. This template will be
     * used the first time a user sets a password via a
     *   password reset flow. By default, it will use your default email template. The template must be a
     * template using our built-in customizations or a custom HTML email for Passwords - Email Verification.
     */
    verify_email_template_id?: string;
}
export interface B2BPasswordsEmailResetStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member_email_id: string;
    member: Member;
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
     *
     * This endpoint adapts to your Project's password strength configuration.
     * If you're using [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the default, your
     * passwords are considered valid
     * if the strength score is >= 3. If you're using
     * [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), your passwords are
     * considered valid if they meet the requirements that you've set with Stytch.
     * You may update your password strength configuration in the
     * [stytch dashboard](https://stytch.com/dashboard/password-strength-config).
     * @param data {@link B2BPasswordsEmailResetStartRequest}
     * @returns {@link B2BPasswordsEmailResetStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    resetStart(data: B2BPasswordsEmailResetStartRequest): Promise<B2BPasswordsEmailResetStartResponse>;
    /**
     * Reset the's password and authenticate them. This endpoint checks that the password reset token is valid,
     * hasn’t expired, or already been used.
     *
     * The provided password needs to meet our password strength requirements, which can be checked in advance
     * with the password strength endpoint. If the token and password are accepted, the password is securely
     * stored for future authentication and the user is authenticated.
     *
     * If the Member is required to complete MFA to log in to the Organization, the returned value of
     * `member_authenticated` will be `false`, and an `intermediate_session_token` will be returned.
     * The `intermediate_session_token` can be passed into the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
     * MFA step and acquire a full member session.
     * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
     *
     * If a valid `session_token` or `session_jwt` is passed in, the Member will not be required to complete an
     * MFA step.
     *
     * Note that a successful password reset by email will revoke all active sessions for the `member_id`.
     * @param data {@link B2BPasswordsEmailResetRequest}
     * @returns {@link B2BPasswordsEmailResetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    reset(data: B2BPasswordsEmailResetRequest): Promise<B2BPasswordsEmailResetResponse>;
    /**
     * Require a password be reset by the associated email address. This endpoint is only functional for
     * cross-org password use cases.
     * @param data {@link B2BPasswordsEmailRequireResetRequest}
     * @param options {@link B2BPasswordsEmailRequireResetRequestOptions}
     * @returns {@link B2BPasswordsEmailRequireResetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    requireReset(data: B2BPasswordsEmailRequireResetRequest, options?: B2BPasswordsEmailRequireResetRequestOptions): Promise<B2BPasswordsEmailRequireResetResponse>;
}
