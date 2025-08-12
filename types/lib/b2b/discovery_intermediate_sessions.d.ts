import { DeviceInfo } from "../b2c/device_history";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession, PrimaryRequired } from "./sessions";
import { MfaRequired } from "./mfa";
export interface B2BDiscoveryIntermediateSessionsExchangeRequest {
    /**
     * The Intermediate Session Token. This token does not necessarily belong to a specific instance of a
     * Member, but represents a bag of factors that may be converted to a member session. The token can be used
     * with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
     * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
     * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
     * MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be
     * used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a specific Organization that allows the factors represented by the intermediate session token;
     * or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes.
     */
    intermediate_session_token: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug or organization_external_id here as a convenience.
     */
    organization_id: string;
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
    locale?: "en" | "es" | "pt-br" | "fr" | "it" | "de-DE" | "zh-Hans" | "ca-ES" | string;
    /**
     * If the `telemetry_id` is passed, as part of this request, Stytch will call the
     * [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated
     * fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device
     * Fingerprinting to use this feature.
     */
    telemetry_id?: string;
}
export interface B2BDiscoveryIntermediateSessionsExchangeResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    session_token: string;
    session_jwt: string;
    member: Member;
    organization: Organization;
    /**
     * Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step
     * to log in to the Organization.
     */
    member_authenticated: boolean;
    /**
     * The returned Intermediate Session Token is identical to the one that was originally passed in to the
     * request. If this value is non-empty, the member must complete an MFA step to finish logging in to the
     * Organization. The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
     * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
     * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
     * MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be
     * used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a specific Organization that allows the factors represented by the intermediate session token;
     * or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes.
     */
    intermediate_session_token: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
    mfa_required?: MfaRequired;
    primary_required?: PrimaryRequired;
    /**
     * If a valid `telemetry_id` was passed in the request and the
     * [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the
     * `member_device` response field will contain information about the member's device attributes.
     */
    member_device?: DeviceInfo;
}
export declare class IntermediateSessions {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Exchange an Intermediate Session for a fully realized
     * [Member Session](https://stytch.com/docs/b2b/api/session-object) for the
     * [Organization](https://stytch.com/docs/b2b/api/organization-object) that the user wishes to log into.
     *
     * This endpoint can be used to accept invites and JIT Provision into a new Organization on the basis of
     * the user's email domain or OAuth tenant.
     *
     * If the user **has** already satisfied the authentication requirements of the Organization they are
     * trying to exchange into and logged in with a method that verifies their email address, this API will
     * return `member_authenticated: true` and a `session_token` and `session_jwt`.
     *
     * If the user **has not** satisfied the primary or secondary authentication requirements of the
     * Organization they are attempting to exchange into or is JIT Provisioning but did not log in via a method
     * that provides email verification, this API will return `member_authenticated: false` and an
     * `intermediate_session_token`.
     *
     * If `primary_required` is returned, prompt the user to fulfill the Organization's auth requirements using
     * the options returned in `primary_required.allowed_auth_methods`.
     *
     * If `primary_required` is null and `mfa_required` is set, check `mfa_required.member_options` to
     * determine if the Member has SMS OTP or TOTP set up for MFA and prompt accordingly. If the Member has SMS
     * OTP, check `mfa_required.secondary_auth_initiated` to see if the OTP has already been sent.
     *
     * Include the `intermediate_session_token` returned above when calling the `authenticate()` method that
     * the user needed to perform. Once the user has completed the authentication requirements they were
     * missing, they will be granted a full `session_token` and `session_jwt` to indicate they have
     * successfully logged into the Organization.
     *
     * The `intermediate_session_token` can also be used with the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization instead of joining an existing one.
     * @param data {@link B2BDiscoveryIntermediateSessionsExchangeRequest}
     * @returns {@link B2BDiscoveryIntermediateSessionsExchangeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    exchange(data: B2BDiscoveryIntermediateSessionsExchangeRequest): Promise<B2BDiscoveryIntermediateSessionsExchangeResponse>;
}
