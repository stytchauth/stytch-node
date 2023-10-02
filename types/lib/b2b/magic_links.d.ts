import { Discovery } from "./magic_links_discovery";
import { Email } from "./magic_links_email";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
export interface B2BMagicLinksAuthenticateRequest {
    magic_links_token: string;
    pkce_code_verifier?: string;
    /**
     * Reuse an existing session instead of creating a new one. If you provide a `session_token`, Stytch will
     * update the session.
     *       If the `session_token` and `magic_links_token` belong to different Members, the `session_token`
     * will be ignored. This endpoint will error if
     *       both `session_token` and `session_jwt` are provided.
     */
    session_token?: string;
    /**
     * Reuse an existing session instead of creating a new one. If you provide a `session_jwt`, Stytch will
     * update the session. If the `session_jwt`
     *       and `magic_links_token` belong to different Members, the `session_jwt` will be ignored. This
     * endpoint will error if both `session_token` and `session_jwt`
     *       are provided.
     */
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
export interface B2BMagicLinksAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    method_id: string;
    /**
     * Indicates if all Sessions linked to the Member need to be reset. You should check this field if you
     * aren't using
     *     Stytch's Session product. If you are using Stytch's Session product, we revoke the Member’s other
     * Sessions for you.
     */
    reset_sessions: boolean;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    member: Member;
    session_token: string;
    session_jwt: string;
    member_session: MemberSession;
    organization: Organization;
    /**
     * The returned Intermediate Session Token contains an Email Magic Link factor associated with the Member's
     * email address.
     *       The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
     * MFA flow and log in to the Organization.
     *       It can also be used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a different existing Organization that allows login with Email Magic Links,
     *       or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization.
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
    mfa_required?: MfaRequired;
}
export declare class MagicLinks {
    private fetchConfig;
    email: Email;
    discovery: Discovery;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate a Member with a Magic Link. This endpoint requires a Magic Link token that is not expired
     * or previously used. If the Member’s status is `pending` or `invited`, they will be updated to `active`.
     * Provide the `session_duration_minutes` parameter to set the lifetime of the session. If the
     * `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute
     * duration.
     *
     * If the Member is required to complete MFA to log in to the Organization, the returned value of
     * `member_authenticated` will be `false`, and an `intermediate_session_token` will be returned.
     * The `intermediate_session_token` can be passed into the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms) to complete the
     * MFA step and acquire a full member session.
     * The `intermediate_session_token` can also be used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to join a different Organization or create a new one.
     * The `session_duration_minutes` and `session_custom_claims` parameters will be ignored.
     *
     * If a valid `session_token` or `session_jwt` is passed in, the Member will not be required to complete an
     * MFA step.
     * @param data {@link B2BMagicLinksAuthenticateRequest}
     * @returns {@link B2BMagicLinksAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BMagicLinksAuthenticateRequest): Promise<B2BMagicLinksAuthenticateResponse>;
}
