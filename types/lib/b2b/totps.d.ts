import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BTOTPsAuthenticateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id: string;
    code: string;
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
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
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
     * Optionally sets the Member’s MFA enrollment status upon a successful authentication. If the
     * Organization’s MFA policy is `REQUIRED_FOR_ALL`, this field will be ignored. If this field is not passed
     * in, the Member’s `mfa_enrolled` boolean will not be affected. The options are:
     *
     *   `enroll` – sets the Member's `mfa_enrolled` boolean to `true`. The Member will be required to complete
     * an MFA step upon subsequent logins to the Organization.
     *
     *   `unenroll` –  sets the Member's `mfa_enrolled` boolean to `false`. The Member will no longer be
     * required to complete MFA steps when logging in to the Organization.
     *
     */
    set_mfa_enrollment?: string;
    /**
     * If passed will set the authenticated method to the default MFA method. Completing an MFA authentication
     * flow for the first time for a Member will implicitly set the method to the default MFA method. This
     * option can be used to update the default MFA method if multiple are being used.
     */
    set_default_mfa?: boolean;
}
export interface B2BTOTPsAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    session_token: string;
    session_jwt: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BTOTPsCreateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id: string;
    /**
     * The expiration for the TOTP registration. If the newly created TOTP registration is not authenticated
     * within this time frame the member will have to restart the registration flow. Defaults to 60 (1 hour)
     * with a minimum of 5 and a maximum of 1440.
     */
    expiration_minutes?: number;
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
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface B2BTOTPsCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    totp_registration_id: string;
    secret: string;
    qr_code: string;
    recovery_codes: string[];
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BTOTPsMigrateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id: string;
    secret: string;
    /**
     * An existing set of recovery codes to be imported into Stytch to be used to authenticate in place of the
     * secondary MFA method.
     */
    recovery_codes: string[];
}
export interface B2BTOTPsMigrateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    totp_registration_id: string;
    recovery_codes: string[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class TOTPs {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create a new TOTP instance for a. The Member can use the authenticator application of their choice to
     * scan the QR code or enter the secret.
     *
     * Passing an intermediate session token, session token, or session JWT is not required, but if passed must
     * match the Member ID passed.
     * @param data {@link B2BTOTPsCreateRequest}
     * @returns {@link B2BTOTPsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BTOTPsCreateRequest): Promise<B2BTOTPsCreateResponse>;
    /**
     * Authenticate a Member provided TOTP.
     * @param data {@link B2BTOTPsAuthenticateRequest}
     * @returns {@link B2BTOTPsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BTOTPsAuthenticateRequest): Promise<B2BTOTPsAuthenticateResponse>;
    /**
     * Migrate an existing TOTP instance for a. Recovery codes are not required and will be minted for the
     * Member if not provided.
     * @param data {@link B2BTOTPsMigrateRequest}
     * @returns {@link B2BTOTPsMigrateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    migrate(data: B2BTOTPsMigrateRequest): Promise<B2BTOTPsMigrateResponse>;
}
