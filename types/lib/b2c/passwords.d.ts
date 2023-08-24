import { Email } from "./passwords_email";
import { ExistingPassword } from "./passwords_existing_password";
import { fetchConfig } from "../shared";
import { Name, User } from "./users";
import { Session } from "./sessions";
import { Sessions } from "./passwords_session";
export interface Argon2Config {
    salt: string;
    iteration_amount: number;
    memory: number;
    threads: number;
    key_length: number;
}
export interface Feedback {
    /**
     * For `zxcvbn` validation, contains an end user consumable warning if the password is valid but not strong
     * enough.
     */
    warning: string;
    /**
     * For `zxcvbn` validation, contains end user consumable suggestions on how to improve the strength of the
     * password.
     */
    suggestions: string[];
    /**
     * Contains which LUDS properties are fulfilled by the password and which are missing to convert an invalid
     * password into a valid one. You'll use these fields to provide feedback to the user on how to improve the
     * password.
     */
    luds_requirements?: LUDSRequirements;
}
export interface LUDSRequirements {
    has_lower_case: boolean;
    has_upper_case: boolean;
    has_digit: boolean;
    /**
     * For LUDS validation, whether the password contains at least one symbol. Any UTF8 character outside of
     * a-z or A-Z may count as a valid symbol.
     */
    has_symbol: boolean;
    /**
     * For LUDS validation, the number of complexity requirements that are missing from the password. Check the
     * complexity fields to see which requirements are missing.
     */
    missing_complexity: number;
    /**
     * For LUDS validation, this is the required length of the password that you've set minus the length of the
     * password being checked. The user will need to add this many characters to the password to make it valid.
     */
    missing_characters: number;
}
export interface MD5Config {
    prepend_salt: string;
    append_salt: string;
}
export interface PBKDF2Config {
    salt: string;
    iteration_amount: number;
    key_length: number;
}
export interface SHA1Config {
    prepend_salt: string;
    append_salt: string;
}
export interface ScryptConfig {
    salt: string;
    /**
     * The N value, also known as the iterations count. It must be a power of two greater than 1 and less than
     * 262,145.
     *       If your applicaiton's N parameter is larger than 262,144, please reach out to
     * [support@stytch.com](mailto:support@stytch.com)
     */
    n_parameter: number;
    r_parameter: number;
    p_parameter: number;
    key_length: number;
}
export interface PasswordsAuthenticateRequest {
    email: string;
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
}
export interface PasswordsAuthenticateResponse {
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
export interface PasswordsCreateRequest {
    email: string;
    password: string;
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
    /**
     * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
     * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
     * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
     * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
     * behavior details.
     */
    untrusted_metadata?: Record<string, any>;
    name?: Name;
}
export interface PasswordsCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    email_id: string;
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
export interface PasswordsMigrateRequest {
    email: string;
    hash: string;
    /**
     * The password hash used. Currently `bcrypt`, `scrypt`, `argon_2i`, `argon_2id`, `md_5`, `sha_1`, and
     * `pbkdf_2` are supported.
     */
    hash_type: "bcrypt" | "md_5" | "argon_2i" | "argon_2id" | "sha_1" | "scrypt" | "phpass" | "pbkdf_2" | string;
    md_5_config?: MD5Config;
    argon_2_config?: Argon2Config;
    sha_1_config?: SHA1Config;
    /**
     * Required parameters if the scrypt is not provided in a
     * [PHC encoded form](https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md#phc-string-format).
     */
    scrypt_config?: ScryptConfig;
    pbkdf_2_config?: PBKDF2Config;
    /**
     * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
     * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
     * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
     * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
     * behavior details.
     */
    untrusted_metadata?: Record<string, any>;
    name?: Name;
}
export interface PasswordsMigrateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    email_id: string;
    user_created: boolean;
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
}
export interface PasswordsStrengthCheckRequest {
    password: string;
    email?: string;
}
export interface PasswordsStrengthCheckResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * Returns `true` if the password passes our password validation. We offer two validation options,
     * [zxcvbn](https://stytch.com/docs/passwords#strength-requirements) is the default option which offers a
     * high level of sophistication. We also offer
     * [LUDS](https://stytch.com/docs/passwords#strength-requirements). If an email address is included in the
     * call we also require that the password hasn't been compromised using built-in breach detection powered
     * by [HaveIBeenPwned](https://haveibeenpwned.com/).
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
     * Will return `true` if breach detection will be evaluated. By default this option is enabled. This option
     * can be disabled by contacting
     * [support@stytch.com](mailto:support@stytch.com?subject=Password%20strength%20configuration). If this
     * value is `false` then `breached_password` will always be `false` as well.
     */
    breach_detection_on_create: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    feedback?: Feedback;
}
export declare class Passwords {
    private fetchConfig;
    email: Email;
    existingPassword: ExistingPassword;
    sessions: Sessions;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create a new user with a password. If `session_duration_minutes` is specified, a new session will be
     * started as well.
     *
     * If a user with this email already exists in your Stytch project, this endpoint will return a
     * `duplicate_email` error. To add a password to an existing passwordless user, you'll need to either call
     * the [Migrate password endpoint](https://stytch.com/docs/api/password-migrate) or prompt the user to
     * complete one of our password reset flows.
     *
     * This endpoint will return an error if the password provided does not meet our strength requirements,
     * which you can check beforehand via the
     * [Password strength check endpoint](https://stytch.com/docs/api/password-strength-check).
     *
     * When creating new Passwords users, it's good practice to enforce an email verification flow. We'd
     * recommend checking out our
     * [Email verification guide](https://stytch.com/docs/guides/passwords/email-verification/overview) for
     * more information.
     * @param data {@link PasswordsCreateRequest}
     * @returns {@link PasswordsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: PasswordsCreateRequest): Promise<PasswordsCreateResponse>;
    /**
     * Authenticate a user with their email address and password. This endpoint verifies that the user has a
     * password currently set, and that the entered password is correct. There are two instances where the
     * endpoint will return a `reset_password` error even if they enter their previous password:
     *
     * **One:** The user’s credentials appeared in the HaveIBeenPwned dataset. We force a password reset to
     * ensure that the user is the legitimate owner of the email address, and not a malicious actor abusing the
     * compromised credentials.
     *
     * **Two:** A user that has previously authenticated with email/password uses a passwordless authentication
     * method tied to the same email address (e.g. Magic Links, Google OAuth) for the first time. Any
     * subsequent email/password authentication attempt will result in this error. We force a password reset in
     * this instance in order to safely deduplicate the account by email address, without introducing the risk
     * of a pre-hijack account takeover attack.
     *
     * Imagine a bad actor creates many accounts using passwords and the known email addresses of their
     * victims. If a victim comes to the site and logs in for the first time with an email-based passwordless
     * authentication method then both the victim and the bad actor have credentials to access to the same
     * account. To prevent this, any further email/password login attempts first require a password reset which
     * can only be accomplished by someone with access to the underlying email address.
     * @param data {@link PasswordsAuthenticateRequest}
     * @returns {@link PasswordsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: PasswordsAuthenticateRequest): Promise<PasswordsAuthenticateResponse>;
    /**
     * This API allows you to check whether or not the user’s provided password is valid, and to provide
     * feedback to the user on how to increase the strength of their password.
     *
     * This endpoint adapts to your Project's password strength configuration. If you're using
     * [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy), the default, your passwords are
     * considered valid if the strength score is >= 3. If you're using
     * [LUDS](https://stytch.com/docs/guides/passwords/strength-policy), your passwords are considered valid if
     * they meet the requirements that you've set with Stytch. You may update your password strength
     * configuration in the [stytch dashboard](https://stytch.com/dashboard/password-strength-config).
     *
     *
     * ### Password feedback
     *
     * The `feedback` object contains relevant fields for you to relay feedback to users that failed to create
     * a strong enough password.
     *
     * If you're using zxcvbn, the `feedback` object will contain `warning` and `suggestions` for any password
     * that does not meet the zxcvbn strength requirements. You can return these strings directly to the user
     * to help them craft a strong password.
     *
     * If you're using LUDS, the `feedback` object will contain an object named `luds_requirements` which
     * contain a collection of fields that the user failed or passed. You'll want to prompt the user to create
     * a password that meets all of the requirements that they failed.
     * @param data {@link PasswordsStrengthCheckRequest}
     * @returns {@link PasswordsStrengthCheckResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    strengthCheck(data: PasswordsStrengthCheckRequest): Promise<PasswordsStrengthCheckResponse>;
    /**
     * Adds an existing password to a User's email that doesn't have a password yet. We support migrating users
     * from passwords stored with `bcrypt`, `scrypt`, `argon2`, `MD-5`, `SHA-1`, or `PBKDF2`. This endpoint has
     * a rate limit of 100 requests per second.
     * @param data {@link PasswordsMigrateRequest}
     * @returns {@link PasswordsMigrateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    migrate(data: PasswordsMigrateRequest): Promise<PasswordsMigrateResponse>;
}
