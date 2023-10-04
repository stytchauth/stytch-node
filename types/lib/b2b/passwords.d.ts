import { Argon2Config, MD5Config, PBKDF2Config, SHA1Config, ScryptConfig } from "../b2c/passwords";
import { Email } from "./passwords_email";
import { ExistingPassword } from "./passwords_existing_password";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
import { Sessions } from "./passwords_session";
export interface LudsFeedback {
    has_lower_case: boolean;
    has_upper_case: boolean;
    has_digit: boolean;
    /**
     * For LUDS validation, whether the password contains at least one symbol. Any UTF8 character outside of
     * a-z or A-Z may count as a valid symbol.
     */
    has_symbol: boolean;
    /**
     * For LUDS validation, the number of complexity requirements that are missing from the password.
     *       Check the complexity fields to see which requirements are missing.
     */
    missing_complexity: number;
    /**
     * For LUDS validation, this is the required length of the password that you've set minus the length of the
     * password being checked.
     *       The user will need to add this many characters to the password to make it valid.
     */
    missing_characters: number;
}
export interface ZxcvbnFeedback {
    /**
     * For zxcvbn validation, contains an end user consumable warning if the password is valid but not strong
     * enough.
     */
    warning: string;
    /**
     * For zxcvbn validation, contains end user consumable suggestions on how to improve the strength of the
     * password.
     */
    suggestions: string[];
}
export interface B2BPasswordsAuthenticateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    email_address: string;
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
     *   If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a
     * 60 minute duration. If you don't want
     *   to use the Stytch session product, you can ignore the session fields in the response.
     */
    session_duration_minutes?: number;
    session_jwt?: string;
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
     * If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will
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
    locale?: "en" | "es" | "pt-br" | string;
}
export interface B2BPasswordsAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
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
     * The returned Intermediate Session Token contains a password factor associated with the Member.
     *       The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
     * MFA flow and log in to the Organization.
     *       Password factors are not transferable between Organizations, so the intermediate session token is
     * not valid for use with discovery endpoints.
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
export interface B2BPasswordsMigrateRequest {
    email_address: string;
    hash: string;
    /**
     * The password hash used. Currently `bcrypt`, `scrypt`, `argon2i`, `argon2id`, `md_5`, `sha_1`, and
     * `pbkdf_2` are supported.
     */
    hash_type: "bcrypt" | "md_5" | "argon_2i" | "argon_2id" | "sha_1" | "scrypt" | "phpass" | "pbkdf_2" | string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    md_5_config?: MD5Config;
    argon_2_config?: Argon2Config;
    sha_1_config?: SHA1Config;
    scrypt_config?: ScryptConfig;
    /**
     * Required additional parameters for PBKDF2 hash keys. Note that we use the SHA-256 by default, please
     * contact [support@stytch.com](mailto:support@stytch.com) if you use another hashing function.
     */
    pbkdf_2_config?: PBKDF2Config;
    name?: string;
    trusted_metadata?: Record<string, any>;
    /**
     * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
     *   frontend SDK, and should not be used to store critical information. See the
     * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
     *   for complete field behavior details.
     */
    untrusted_metadata?: Record<string, any>;
}
export interface B2BPasswordsMigrateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    /**
     * A flag indicating `true` if a new Member object was created and `false` if the Member object already
     * existed.
     */
    member_created: boolean;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BPasswordsStrengthCheckRequest {
    password: string;
    email_address?: string;
}
export interface B2BPasswordsStrengthCheckResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * Returns `true` if the password passes our password validation. We offer two validation options,
     *   [zxcvbn](https://stytch.com/docs/passwords#strength-requirements) is the default option which offers a
     * high level of sophistication.
     *   We also offer [LUDS](https://stytch.com/docs/passwords#strength-requirements). If an email address is
     * included in the call we also
     *   require that the password hasn't been compromised using built-in breach detection powered by
     * [HaveIBeenPwned](https://haveibeenpwned.com/)
     */
    valid_password: boolean;
    /**
     * The score of the password determined by [zxcvbn](https://github.com/dropbox/zxcvbn). Values will be
     * between 1 and 4, a 3 or greater is required to pass validation.
     */
    score: number;
    /**
     * Returns `true` if the password has been breached. Powered by
     * [HaveIBeenPwned](https://haveibeenpwned.com/).
     */
    breached_password: boolean;
    strength_policy: string;
    /**
     * Will return `true` if breach detection will be evaluated. By default this option is enabled.
     *   This option can be disabled by contacting
     * [support@stytch.com](mailto:support@stytch.com?subject=Password%20strength%20configuration).
     *   If this value is false then `breached_password` will always be `false` as well.
     */
    breach_detection_on_create: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * Feedback for how to improve the password's strength using
     * [luds](https://stytch.com/docs/passwords#strength-requirements).
     */
    luds_feedback?: LudsFeedback;
    /**
     * Feedback for how to improve the password's strength using
     * [zxcvbn](https://stytch.com/docs/passwords#strength-requirements).
     */
    zxcvbn_feedback?: ZxcvbnFeedback;
}
export declare class Passwords {
    private fetchConfig;
    email: Email;
    sessions: Sessions;
    existingPassword: ExistingPassword;
    constructor(fetchConfig: fetchConfig);
    /**
     * This API allows you to check whether the user’s provided password is valid, and to provide feedback to
     * the user on how to increase the strength of their password.
     *
     * This endpoint adapts to your Project's password strength configuration. If you're using
     * [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the default, your passwords are
     * considered valid if the strength score is >= 3. If you're using
     * [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), your passwords are considered valid if
     * they meet the requirements that you've set with Stytch. You may update your password strength
     * configuration in the [stytch dashboard](https://stytch.com/dashboard/password-strength-config).
     *
     * ## Password feedback
     * The zxcvbn_feedback and luds_feedback objects contains relevant fields for you to relay feedback to
     * users that failed to create a strong enough password.
     *
     * If you're using [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the feedback object
     * will contain warning and suggestions for any password that does not meet the
     * [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy) strength requirements. You can return
     * these strings directly to the user to help them craft a strong password.
     *
     * If you're using [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), the feedback object
     * will contain a collection of fields that the user failed or passed. You'll want to prompt the user to
     * create a password that meets all requirements that they failed.
     * @param data {@link B2BPasswordsStrengthCheckRequest}
     * @returns {@link B2BPasswordsStrengthCheckResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    strengthCheck(data: B2BPasswordsStrengthCheckRequest): Promise<B2BPasswordsStrengthCheckResponse>;
    /**
     * Adds an existing password to a member's email that doesn't have a password yet. We support migrating
     * members from passwords stored with bcrypt, scrypt, argon2, MD-5, SHA-1, and PBKDF2. This endpoint has a
     * rate limit of 100 requests per second.
     * @param data {@link B2BPasswordsMigrateRequest}
     * @returns {@link B2BPasswordsMigrateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    migrate(data: B2BPasswordsMigrateRequest): Promise<B2BPasswordsMigrateResponse>;
    /**
     * Authenticate a member with their email address and password. This endpoint verifies that the member has
     * a password currently set, and that the entered password is correct.
     *
     * If you have breach detection during authentication enabled in your
     * [password strength policy](https://stytch.com/docs/b2b/guides/passwords/strength-policies) and the
     * member's credentials have appeared in the HaveIBeenPwned dataset, this endpoint will return a
     * `member_reset_password` error even if the member enters a correct password. We force a password reset in
     * this case to ensure that the member is the legitimate owner of the email address and not a malicious
     * actor abusing the compromised credentials.
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
     * @param data {@link B2BPasswordsAuthenticateRequest}
     * @returns {@link B2BPasswordsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BPasswordsAuthenticateRequest): Promise<B2BPasswordsAuthenticateResponse>;
}
