import { fetchConfig } from "../shared";
import { Session } from "./sessions";
import { User } from "./users";
export interface OAuthProviderValues {
    access_token: string;
    refresh_token: string;
    /**
     * The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information
     * about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are
     * returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/)
     * specification, which is based on OAuth.
     */
    id_token: string;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
    /**
     * The timestamp when the Session expires. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    expires_at?: string;
}
export interface OAuthAttachRequest {
    provider: string;
    user_id?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface OAuthAttachResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * A single-use token for connecting the Stytch User selection from an OAuth Attach request to the
     * corresponding OAuth Start request.
     */
    oauth_attach_token: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface OAuthAuthenticateRequest {
    /**
     * The OAuth `token` from the `?token=` query parameter in the URL.
     *
     *       The redirect URL will look like
     * `https://example.com/authenticate?stytch_token_type=oauth&token=rM_kw42CWBhsHLF62V75jELMbvJ87njMe3tFVj7Qupu7`
     *
     *       In the redirect URL, the `stytch_token_type` will be `oauth`. See
     * [here](https://stytch.com/docs/guides/dashboard/redirect-urls) for more detail.
     */
    token: string;
    /**
     * Reuse an existing session instead of creating a new one. If you provide us with a `session_token`, then
     * we'll update the session represented by this session token with this OAuth factor. If this
     * `session_token` belongs to a different user than the OAuth token, the session_jwt will be ignored. This
     * endpoint will error if both `session_token` and `session_jwt` are provided.
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
     *   If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created.
     */
    session_duration_minutes?: number;
    /**
     * Reuse an existing session instead of creating a new one. If you provide us with a `session_jwt`, then
     * we'll update the session represented by this JWT with this OAuth factor. If this `session_jwt` belongs
     * to a different user than the OAuth token, the session_jwt will be ignored. This endpoint will error if
     * both `session_token` and `session_jwt` are provided.
     */
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
export interface OAuthAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the "sub" or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    /**
     * Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Facebook, GitHub
     * etc.
     */
    provider_type: string;
    session_token: string;
    session_jwt: string;
    /**
     * The `provider_values` object lists relevant identifiers, values, and scopes for a given OAuth provider.
     * For example this object will include a provider's `access_token` that you can use to access the
     * provider's API for a given user.
     *
     *   Note that these values will vary based on the OAuth provider in question, e.g. `id_token` is only
     * returned by OIDC complaint identity providers.
     */
    provider_values: OAuthProviderValues;
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
    oauth_user_registration_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * A `Session` object. For backwards compatibility reasons, the session from an OAuth authenticate call is
     * labeled as `user_session`, but is otherwise just a standard stytch `Session` object.
     *
     *   See [GET sessions](https://stytch.com/docs/api/session-get) for complete response fields.
     *
     */
    user_session?: Session;
}
export declare class OAuth {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Generate an OAuth Attach Token to pre-associate an OAuth flow with an existing Stytch User. Pass the
     * returned `oauth_attach_token` to the same provider's OAuth Start endpoint to treat this OAuth flow as a
     * login for that user instead of a signup for a new user.
     *
     * Exactly one of `user_id`, `session_token`, or `session_jwt` must be provided to identify the target
     * Stytch User.
     *
     * This is an optional step in the OAuth flow. Stytch can often determine whether to create a new user or
     * log in an existing one based on verified identity provider information. This endpoint is useful for
     * cases where we can't, such as missing or unverified provider information.
     * @param data {@link OAuthAttachRequest}
     * @returns {@link OAuthAttachResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    attach(data: OAuthAttachRequest): Promise<OAuthAttachResponse>;
    /**
     * Authenticate a User given a `token`. This endpoint verifies that the user completed the OAuth flow by
     * verifying that the token is valid and hasn't expired. To initiate a Stytch session for the user while
     * authenticating their OAuth token, include `session_duration_minutes`; a session with the identity
     * provider, e.g. Google or Facebook, will always be initiated upon successful authentication.
     * @param data {@link OAuthAuthenticateRequest}
     * @returns {@link OAuthAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: OAuthAuthenticateRequest): Promise<OAuthAuthenticateResponse>;
}
