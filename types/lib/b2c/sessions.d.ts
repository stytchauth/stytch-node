import { Attributes } from "./attribute";
import { fetchConfig } from "../shared";
import { User } from "./users";
import { JwtConfig } from "../shared/sessions";
export interface AmazonOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface AppleOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface AuthenticationFactor {
    /**
     * The type of authentication factor. The possible values are: `magic_link`, `otp`,
     *        `oauth`, `password`, `email_otp`, or `sso` .
     */
    type: "magic_link" | "otp" | "oauth" | "webauthn" | "totp" | "crypto" | "password" | "signature_challenge" | "sso" | "imported" | "recovery_codes" | "email_otp" | "impersonated" | string;
    /**
     * The method that was used to deliver the authentication factor. The possible values depend on the `type`:
     *
     *       `magic_link` – Only `email`.
     *
     *       `otp` –  Either `sms` or `email` .
     *
     *       `oauth` – Either `oauth_google` or `oauth_microsoft`.
     *
     *       `password` – Only `knowledge`.
     *
     *       `sso` – Either `sso_saml` or `sso_oidc`.
     *
     */
    delivery_method: "email" | "sms" | "whatsapp" | "embedded" | "oauth_google" | "oauth_microsoft" | "oauth_apple" | "webauthn_registration" | "authenticator_app" | "oauth_github" | "recovery_code" | "oauth_facebook" | "crypto_wallet" | "oauth_amazon" | "oauth_bitbucket" | "oauth_coinbase" | "oauth_discord" | "oauth_figma" | "oauth_gitlab" | "oauth_instagram" | "oauth_linkedin" | "oauth_shopify" | "oauth_slack" | "oauth_snapchat" | "oauth_spotify" | "oauth_steam" | "oauth_tiktok" | "oauth_twitch" | "oauth_twitter" | "knowledge" | "biometric" | "sso_saml" | "sso_oidc" | "oauth_salesforce" | "oauth_yahoo" | "oauth_hubspot" | "imported_auth0" | "oauth_exchange_slack" | "oauth_exchange_hubspot" | "oauth_exchange_github" | "oauth_exchange_google" | "impersonation" | "oauth_access_token_exchange" | string;
    last_authenticated_at?: string;
    created_at?: string;
    updated_at?: string;
    email_factor?: EmailFactor;
    phone_number_factor?: PhoneNumberFactor;
    google_oauth_factor?: GoogleOAuthFactor;
    microsoft_oauth_factor?: MicrosoftOAuthFactor;
    apple_oauth_factor?: AppleOAuthFactor;
    webauthn_factor?: WebAuthnFactor;
    authenticator_app_factor?: AuthenticatorAppFactor;
    github_oauth_factor?: GithubOAuthFactor;
    recovery_code_factor?: RecoveryCodeFactor;
    facebook_oauth_factor?: FacebookOAuthFactor;
    crypto_wallet_factor?: CryptoWalletFactor;
    amazon_oauth_factor?: AmazonOAuthFactor;
    bitbucket_oauth_factor?: BitbucketOAuthFactor;
    coinbase_oauth_factor?: CoinbaseOAuthFactor;
    discord_oauth_factor?: DiscordOAuthFactor;
    figma_oauth_factor?: FigmaOAuthFactor;
    git_lab_oauth_factor?: GitLabOAuthFactor;
    instagram_oauth_factor?: InstagramOAuthFactor;
    linked_in_oauth_factor?: LinkedInOAuthFactor;
    shopify_oauth_factor?: ShopifyOAuthFactor;
    slack_oauth_factor?: SlackOAuthFactor;
    snapchat_oauth_factor?: SnapchatOAuthFactor;
    spotify_oauth_factor?: SpotifyOAuthFactor;
    steam_oauth_factor?: SteamOAuthFactor;
    tik_tok_oauth_factor?: TikTokOAuthFactor;
    twitch_oauth_factor?: TwitchOAuthFactor;
    twitter_oauth_factor?: TwitterOAuthFactor;
    embeddable_magic_link_factor?: EmbeddableMagicLinkFactor;
    biometric_factor?: BiometricFactor;
    saml_sso_factor?: SAMLSSOFactor;
    oidc_sso_factor?: OIDCSSOFactor;
    salesforce_oauth_factor?: SalesforceOAuthFactor;
    yahoo_oauth_factor?: YahooOAuthFactor;
    hubspot_oauth_factor?: HubspotOAuthFactor;
    slack_oauth_exchange_factor?: SlackOAuthExchangeFactor;
    hubspot_oauth_exchange_factor?: HubspotOAuthExchangeFactor;
    github_oauth_exchange_factor?: GithubOAuthExchangeFactor;
    google_oauth_exchange_factor?: GoogleOAuthExchangeFactor;
    impersonated_factor?: ImpersonatedFactor;
    oauth_access_token_exchange_factor?: OAuthAccessTokenExchangeFactor;
}
export interface AuthenticatorAppFactor {
    totp_id: string;
}
export interface BiometricFactor {
    biometric_registration_id: string;
}
export interface BitbucketOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface CoinbaseOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface CryptoWalletFactor {
    crypto_wallet_id: string;
    crypto_wallet_address: string;
    crypto_wallet_type: string;
}
export interface DiscordOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface EmailFactor {
    email_id: string;
    email_address: string;
}
export interface EmbeddableMagicLinkFactor {
    embedded_id: string;
}
export interface FacebookOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface FigmaOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface GitLabOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface GithubOAuthExchangeFactor {
    email_id: string;
}
export interface GithubOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface GoogleOAuthExchangeFactor {
    email_id: string;
}
export interface GoogleOAuthFactor {
    id: string;
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    email_id?: string;
}
export interface HubspotOAuthExchangeFactor {
    email_id: string;
}
export interface HubspotOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface ImpersonatedFactor {
    /**
     * The unique UUID of the impersonator. For impersonation sessions initiated via the Stytch dashboard, the
     * `impersonator_id` will be the impersonator's Stytch workspace id.
     */
    impersonator_id: string;
    impersonator_email_address: string;
}
export interface InstagramOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface JWK {
    kty: string;
    use: string;
    key_ops: string[];
    alg: string;
    kid: string;
    x5c: string[];
    x5tS256: string;
    n: string;
    e: string;
}
export interface LinkedInOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface MicrosoftOAuthFactor {
    id: string;
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    email_id?: string;
}
export interface OAuthAccessTokenExchangeFactor {
    client_id: string;
}
export interface OIDCSSOFactor {
    id: string;
    provider_id: string;
    external_id: string;
}
export interface PhoneNumberFactor {
    phone_id: string;
    phone_number: string;
}
export interface RecoveryCodeFactor {
    totp_recovery_code_id: string;
}
export interface SAMLSSOFactor {
    id: string;
    provider_id: string;
    external_id: string;
}
export interface SalesforceOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface Session {
    session_id: string;
    user_id: string;
    authentication_factors: AuthenticationFactor[];
    /**
     * The timestamp when the Session was created. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    started_at?: string;
    /**
     * The timestamp when the Session was last accessed. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    last_accessed_at?: string;
    /**
     * The timestamp when the Session expires. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    expires_at?: string;
    attributes?: Attributes;
    /**
     * The custom claims map for a Session. Claims can be added to a session during a Sessions authenticate
     * call.
     */
    custom_claims?: Record<string, any>;
}
export interface ShopifyOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface SlackOAuthExchangeFactor {
    email_id: string;
}
export interface SlackOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface SnapchatOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface SpotifyOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface SteamOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface TikTokOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface TwitchOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface TwitterOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface WebAuthnFactor {
    webauthn_registration_id: string;
    domain: string;
    user_agent?: string;
}
export interface YahooOAuthFactor {
    id: string;
    provider_subject: string;
    email_id?: string;
}
export interface SessionsAuthenticateRequest {
    session_token?: string;
    /**
     * Set the session lifetime to be this many minutes from now; minimum of 5 and a maximum of 527040 minutes
     * (366 days). Note that a successful authentication will continue to extend the session this many minutes.
     */
    session_duration_minutes?: number;
    /**
     * The JWT to authenticate. You may provide a JWT that has expired according to its `exp` claim and needs
     * to be refreshed. If the signature is valid and the underlying session is still active then Stytch will
     * return a new JWT.
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
}
export interface SessionsAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll
     * receive a full Session object in the response.
     *
     *   See [GET sessions](https://stytch.com/docs/api/session-get) for complete response fields.
     *
     */
    session: Session;
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
}
export interface SessionsGetJWKSRequest {
    project_id: string;
}
export interface SessionsGetJWKSResponse {
    keys: JWK[];
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface SessionsGetRequest {
    user_id: string;
}
export interface SessionsGetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    sessions: Session[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface SessionsMigrateRequest {
    session_token: string;
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
}
export interface SessionsMigrateResponse {
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
export interface SessionsRevokeRequest {
    session_id?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface SessionsRevokeResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface SessionsAuthenticateJwtRequest {
    /**
     * The JWT to authenticate. You may provide a JWT that has expired according to its `exp` claim and needs
     * to be refreshed. If the signature is valid and the underlying session is still active then Stytch will
     * return a new JWT.
     */
    session_jwt: string;
    /**
     * If set, remote verification will be forced if the JWT was issued at (based on the "iat" claim) more than that many seconds ago.
     * If explicitly set to zero, all tokens will be considered too old, even if they are otherwise valid.
     */
    max_token_age_seconds?: number;
}
export interface SessionsAuthenticateJwtLocalRequest {
    /**
     * The JWT to authenticate. The JWT must not be expired in order for this request to succeed.
     */
    session_jwt: string;
    /**
     * The maximum allowable difference when comparing timestamps.
     * It defaults to zero.
     */
    clock_tolerance_seconds?: number;
    /**
     * If set, return an error if the JWT was issued (based on the "iat" claim) more than max_token_age_seconds seconds ago.
     * If explicitly set to zero, all tokens will be considered too old, even if they are otherwise valid.
     */
    max_token_age_seconds?: number;
    /**
     * The value used to compare timestamp claims ("exp", "nbf", "iat").
     * It defaults to the current date (new Date()).
     */
    current_date?: Date;
}
export declare class Sessions {
    private fetchConfig;
    private jwksClient;
    private jwtOptions;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig);
    /**
     * List all active Sessions for a given `user_id`. All timestamps are formatted according to the RFC 3339
     * standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     * @param params {@link SessionsGetRequest}
     * @returns {@link SessionsGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: SessionsGetRequest): Promise<SessionsGetResponse>;
    /**
     * Authenticate a session token or session JWT and retrieve associated session data. If
     * `session_duration_minutes` is included, update the lifetime of the session to be that many minutes from
     * now. All timestamps are formatted according to the RFC 3339 standard and are expressed in UTC, e.g.
     * `2021-12-29T12:33:09Z`. This endpoint requires exactly one `session_jwt` or `session_token` as part of
     * the request. If both are included, you will receive a `too_many_session_arguments` error.
     *
     * You may provide a JWT that needs to be refreshed and is expired according to its `exp` claim. A new JWT
     * will be returned if both the signature and the underlying Session are still valid. See our
     * [How to use Stytch Session JWTs](https://stytch.com/docs/guides/sessions/using-jwts) guide for more
     * information.
     * @param data {@link SessionsAuthenticateRequest}
     * @returns {@link SessionsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: SessionsAuthenticateRequest): Promise<SessionsAuthenticateResponse>;
    /**
     * Revoke a Session, immediately invalidating all of its session tokens. You can revoke a session in three
     * ways: using its ID, or using one of its session tokens, or one of its JWTs. This endpoint requires
     * exactly one of those to be included in the request. It will return an error if multiple are present.
     * @param data {@link SessionsRevokeRequest}
     * @returns {@link SessionsRevokeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    revoke(data: SessionsRevokeRequest): Promise<SessionsRevokeResponse>;
    /**
     * Migrate a session from an external OIDC compliant endpoint. Stytch will call the external UserInfo
     * endpoint defined in your Stytch Project settings in the [Dashboard](https://stytch.com/docs/dashboard),
     * and then perform a lookup using the `session_token`. If the response contains a valid email address,
     * Stytch will attempt to match that email address with an existing User and create a Stytch Session. You
     * will need to create the user before using this endpoint.
     * @param data {@link SessionsMigrateRequest}
     * @returns {@link SessionsMigrateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    migrate(data: SessionsMigrateRequest): Promise<SessionsMigrateResponse>;
    /**
     * Get the JSON Web Key Set (JWKS) for a project.
     *
     * JWKS are rotated every ~6 months. Upon rotation, new JWTs will be signed using the new key, and both
     * keys will be returned by this endpoint for a period of 1 month.
     *
     * JWTs have a set lifetime of 5 minutes, so there will be a 5 minute period where some JWTs will be signed
     * by the old JWKS, and some JWTs will be signed by the new JWKS. The correct JWKS to use for validation is
     * determined by matching the `kid` value of the JWT and JWKS.
     *
     * If you're using one of our [backend SDKs](https://stytch.com/docs/sdks), the JWKS rotation will be
     * handled for you.
     *
     * If you're using your own JWT validation library, many have built-in support for JWKS rotation, and
     * you'll just need to supply this API endpoint. If not, your application should decide which JWKS to use
     * for validation by inspecting the `kid` value.
     *
     * See our [How to use Stytch Session JWTs](https://stytch.com/docs/guides/sessions/using-jwts) guide for
     * more information.
     * @param params {@link SessionsGetJWKSRequest}
     * @returns {@link SessionsGetJWKSResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getJWKS(params: SessionsGetJWKSRequest): Promise<SessionsGetJWKSResponse>;
    /** Parse a JWT and verify the signature, preferring local verification over remote.
     *
     * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
     * (based on the "iat" claim) more than that many seconds ago.
     *
     * To force remote validation for all tokens, set max_token_age_seconds to zero or use the
     * authenticate method instead.
     */
    authenticateJwt(params: SessionsAuthenticateJwtRequest): Promise<{
        session: Session;
        session_jwt: string;
    }>;
    /** Parse a JWT and verify the signature locally (without calling /authenticate in the API).
     *
     * If max_token_age_seconds is set, this will return an error if the JWT was issued (based on the "iat"
     * claim) more than max_token_age_seconds seconds ago.
     *
     * If max_token_age_seconds is explicitly set to zero, all tokens will be considered too old,
     * even if they are otherwise valid.
     *
     * The value for current_date is used to compare timestamp claims ("exp", "nbf", "iat"). It
     * defaults to the current date (new Date()).
     *
     * The value for clock_tolerance_seconds is the maximum allowable difference when comparing
     * timestamps. It defaults to zero.
     */
    authenticateJwtLocal(params: SessionsAuthenticateJwtLocalRequest): Promise<Session>;
}
