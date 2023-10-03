import { Attributes } from "./attribute";
import { Email } from "./magic_links_email";
import { fetchConfig } from "../shared";
import { Session } from "./sessions";
import { User } from "./users";
export interface Options {
    ip_match_required: boolean;
    user_agent_match_required: boolean;
}
export interface MagicLinksAuthenticateRequest {
    /**
     * The Magic Link `token` from the `?token=` query parameter in the URL.
     *
     *       The redirect URL will look like
     * `https://example.com/authenticate?stytch_token_type=magic_links&token=rM_kw42CWBhsHLF62V75jELMbvJ87njMe3tFVj7Qupu7`
     *
     *       In the redirect URL, the `stytch_token_type` will be `magic_link`. See
     * [here](https://stytch.com/docs/guides/dashboard/redirect-urls) for more detail.
     */
    token: string;
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
    code_verifier?: string;
}
export interface MagicLinksAuthenticateResponse {
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
     *   See [GET sessions](https://stytch.com/docs/api/session-get) for complete response fields.
     *
     */
    session?: Session;
}
export interface MagicLinksCreateRequest {
    user_id: string;
    /**
     * Set the expiration for the Magic Link `token` in minutes. By default, it expires in 1 hour. The minimum
     * expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    expiration_minutes?: number;
    attributes?: Attributes;
}
export interface MagicLinksCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    token: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class MagicLinks {
    private fetchConfig;
    email: Email;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate a User given a Magic Link. This endpoint verifies that the Magic Link token is valid,
     * hasn't expired or been previously used, and any optional security settings such as IP match or user
     * agent match are satisfied.
     * @param data {@link MagicLinksAuthenticateRequest}
     * @returns {@link MagicLinksAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: MagicLinksAuthenticateRequest): Promise<MagicLinksAuthenticateResponse>;
    /**
     * Create an embeddable Magic Link token for a User. Access to this endpoint is restricted. To enable it,
     * please send us a note at support@stytch.com.
     *
     * ### Next steps
     * Send the returned `token` value to the end user in a link which directs to your application. When the
     * end user follows your link, collect the token, and call
     * [Authenticate Magic Link](https://stytch.com/docs/api/authenticate-magic-link) to complete
     * authentication.
     * @param data {@link MagicLinksCreateRequest}
     * @returns {@link MagicLinksCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: MagicLinksCreateRequest): Promise<MagicLinksCreateResponse>;
}
