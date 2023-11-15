import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BOTPSmsAuthenticateRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
     */
    member_id: string;
    code: string;
    /**
     * The Intermediate Session Token. This token does not necessarily belong to a specific instance of a
     * Member, but represents a bag of factors that may be converted to a member session.
     *     The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete an MFA
     * flow;
     *     the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a specific Organization that allows the factors represented by the intermediate session token;
     *     or the
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
}
export interface B2BOTPSmsAuthenticateResponse {
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
export interface B2BOTPSmsSendRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
     */
    member_id: string;
    /**
     * The phone number to send the OTP to. If the Member already has a phone number, this argument is not
     * needed.
     */
    mfa_phone_number?: string;
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
export interface B2BOTPSmsSendResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Sms {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Send a One-Time Passcode (OTP) to a Member's phone number.
     *
     * If the Member already has a phone number, the `mfa_phone_number` field is not needed; the endpoint will
     * send an OTP to the number associated with the Member.
     * If the Member does not have a phone number, the endpoint will send an OTP to the `mfa_phone_number`
     * provided and link the `mfa_phone_number` with the Member.
     *
     * An error will be thrown if the Member already has a phone number and the provided `mfa_phone_number`
     * does not match the existing one.
     *
     * Note that sending another OTP code before the first has expired will invalidate the first code.
     *
     * If a Member has a phone number and is enrolled in MFA, then after a successful primary authentication
     * event (e.g. [email magic link](https://stytch.com/docs/b2b/api/authenticate-magic-link) or
     * [SSO](https://stytch.com/docs/b2b/api/sso-authenticate) login is complete), an SMS OTP will
     * automatically be sent to their phone number. In that case, this endpoint should only be used for
     * subsequent authentication events, such as prompting a Member for an OTP again after a period of
     * inactivity.
     *
     * ### Cost to send SMS OTP
     * Before configuring SMS or WhatsApp OTPs, please review how Stytch
     * [bills the costs of international OTPs](https://stytch.com/pricing) and understand how to protect your
     * app against [toll fraud](https://stytch.com/docs/guides/passcodes/toll-fraud/overview).
     *
     * __Note:__ SMS to phone numbers outside of the US and Canada is disabled by default for customers who did
     * not use SMS prior to October 2023. If you're interested in sending international SMS, please reach out
     * to [support@stytch.com](mailto:support@stytch.com?subject=Enable%20international%20SMS).
     * @param data {@link B2BOTPSmsSendRequest}
     * @returns {@link B2BOTPSmsSendResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    send(data: B2BOTPSmsSendRequest): Promise<B2BOTPSmsSendResponse>;
    /**
     * SMS OTPs may not be used as a primary authentication mechanism. They can be used to complete an MFA
     * requirement, or they can be used as a step-up factor to be added to an existing session.
     *
     * This endpoint verifies that the one-time passcode (OTP) is valid and hasn't expired or been previously
     * used. A given Member may only have a single active OTP code at any given time. If a Member requests
     * another OTP code before the first one has expired, the first one will be invalidated.
     *
     * Exactly one of `intermediate_session_token`, `session_token`, or `session_jwt` must be provided in the
     * request.
     * If an intermediate session token is provided, this operation will consume it.
     *
     * Intermediate session tokens are generated upon successful calls to primary authenticate methods in the
     * case where MFA is required,
     * such as [email magic link authenticate](https://stytch.com/docs/b2b/api/authenticate-magic-link),
     * or upon successful calls to discovery authenticate methods, such as
     * [email magic link discovery authenticate](https://stytch.com/docs/b2b/api/authenticate-discovery-magic-link).
     *
     * If the Organization's MFA policy is `REQUIRED_FOR_ALL`, a successful OTP authentication will change the
     * Member's `mfa_enrolled` status to `true` if it is not already `true`.
     * If the Organization's MFA policy is `OPTIONAL`, the Member's MFA enrollment can be toggled by passing in
     * a value for the `set_mfa_enrollment` field.
     * The Member's MFA enrollment can also be toggled through the
     * [Update Member](https://stytch.com/docs/b2b/api/update-member) endpoint.
     *
     * Provide the `session_duration_minutes` parameter to set the lifetime of the session. If the
     * `session_duration_minutes` parameter is not specified, a Stytch session will be created with a duration
     * of 60 minutes.
     * @param data {@link B2BOTPSmsAuthenticateRequest}
     * @returns {@link B2BOTPSmsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BOTPSmsAuthenticateRequest): Promise<B2BOTPSmsAuthenticateResponse>;
}
