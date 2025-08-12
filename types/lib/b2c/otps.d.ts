import { Attributes } from "./attribute";
import { DeviceInfo } from "./device_history";
import { Email } from "./otps_email";
import { fetchConfig } from "../shared";
import { Options } from "./magic_links";
import { Session } from "./sessions";
import { Sms } from "./otps_sms";
import { User } from "./users";
import { Whatsapp } from "./otps_whatsapp";
export interface OTPsAuthenticateRequest {
    method_id: string;
    code: string;
    /**
     * Provided attributes to help with fraud detection. These values are pulled and passed into Stytch
     * endpoints by your application.
     */
    attributes?: Attributes;
    options?: Options;
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
    /**
     * If the `telemetry_id` is passed, as part of this request, Stytch will call the
     * [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated
     * fingerprints and IPGEO information for the User. Your workspace must be enabled for Device
     * Fingerprinting to use this feature.
     */
    telemetry_id?: string;
}
export interface OTPsAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    method_id: string;
    session_token: string;
    session_jwt: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * Indicates if all other of the User's Sessions need to be reset. You should check this field if you
     * aren't using Stytch's Session product. If you are using Stytch's Session product, we revoke the User's
     * other sessions for you.
     */
    reset_sessions: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll
     * receive a full Session object in the response.
     *
     *   See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.
     *
     */
    session?: Session;
    /**
     * If a valid `telemetry_id` was passed in the request and the
     * [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the
     * `user_device` response field will contain information about the user's device attributes.
     */
    user_device?: DeviceInfo;
}
export declare class OTPs {
    private fetchConfig;
    sms: Sms;
    whatsapp: Whatsapp;
    email: Email;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate a User given a `method_id` (the associated `email_id` or `phone_id`) and a `code`. This
     * endpoint verifies that the code is valid, hasn't expired or been previously used, and any optional
     * security settings such as IP match or user agent match are satisfied. A given `method_id` may only have
     * a single active OTP code at any given time, if a User requests another OTP code before the first one has
     * expired, the first one will be invalidated.
     * @param data {@link OTPsAuthenticateRequest}
     * @returns {@link OTPsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: OTPsAuthenticateRequest): Promise<OTPsAuthenticateResponse>;
}
