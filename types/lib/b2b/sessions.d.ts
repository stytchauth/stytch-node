import { AuthenticationFactor, JWK } from "../b2c/sessions";
import { Authorization } from "../shared/method_options";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MfaRequired } from "./mfa";
import { PolicyCache } from "./rbac_local";
import { JwtConfig } from "../shared/sessions";
export interface AuthorizationCheck {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    /**
     * A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.
     *
     *   A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch
     * default Resources with reserved  `resource_id`s. These include:
     *
     *   * `stytch.organization`
     *   * `stytch.member`
     *   * `stytch.sso`
     *   * `stytch.self`
     *
     *   Check out the
     * [guide on Stytch default Resources](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more
     * detailed explanation.
     *
     *
     */
    resource_id: string;
    action: string;
}
export interface AuthorizationVerdict {
    authorized: boolean;
    granting_roles: string[];
}
export interface B2BSessionsRevokeRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface MemberSession {
    member_session_id: string;
    member_id: string;
    /**
     * The timestamp when the Session was created. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    started_at: string;
    /**
     * The timestamp when the Session was last accessed. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    last_accessed_at: string;
    /**
     * The timestamp when the Session expires. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    expires_at: string;
    authentication_factors: AuthenticationFactor[];
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    roles: string[];
    /**
     * The custom claims map for a Session. Claims can be added to a session during a Sessions authenticate
     * call.
     */
    custom_claims?: Record<string, any>;
}
export interface PrimaryRequired {
    /**
     * Details the auth method that the member must also complete to fulfill the primary authentication
     * requirements of the Organization. For example, a value of `[magic_link]` indicates that the Member must
     * also complete a magic link authentication step. If you have an intermediate session token, you must pass
     * it into that primary authentication step.
     */
    allowed_auth_methods: string[];
}
export interface B2BSessionsAuthenticateRequest {
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
     * If an `authorization_check` object is passed in, this endpoint will also check if the Member is
     *   authorized to perform the given action on the given Resource in the specified Organization. A Member
     * is authorized if
     *   their Member Session contains a Role, assigned
     *   [explicitly or implicitly](https://stytch.com/docs/b2b/guides/rbac/role-assignment), with adequate
     * permissions.
     *   In addition, the `organization_id` passed in the authorization check must match the Member's
     * Organization.
     *
     *   The Roles on the Member Session may differ from the Roles you see on the Member object - Roles that
     * are implicitly
     *   assigned by SSO connection or SSO group will only be valid for a Member Session if there is at least
     * one authentication
     *   factor on the Member Session from the specified SSO connection.
     *
     *   If the Member is not authorized to perform the specified action on the specified Resource, or if the
     *   `organization_id` does not match the Member's Organization, a 403 error will be thrown.
     *   Otherwise, the response will contain a list of Roles that satisfied the authorization check.
     */
    authorization_check?: AuthorizationCheck;
}
export interface B2BSessionsAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_session: MemberSession;
    session_token: string;
    session_jwt: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * If an `authorization_check` is provided in the request and the check succeeds, this field will return
     *   the complete list of Roles that gave the Member permission to perform the specified action on the
     * specified Resource.
     */
    verdict?: AuthorizationVerdict;
}
export interface B2BSessionsExchangeAccessTokenRequest {
    access_token: string;
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
}
export interface B2BSessionsExchangeAccessTokenResponse {
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
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BSessionsExchangeRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
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
     * If the needs to complete an MFA step, and the Member has a phone number, this endpoint will
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
}
export interface B2BSessionsExchangeResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member_session: MemberSession;
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
     * The returned Intermediate Session Token contains any Email Magic Link or OAuth factors from the original
     * member session that are valid for the target Organization. If this value is non-empty, the member must
     * complete an MFA step to finish logging in to the Organization. The token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
     * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
     * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
     * MFA flow and log in to the Organization. It can also be used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a specific Organization that allows the factors represented by the intermediate session token;
     * or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member.
     */
    intermediate_session_token: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    mfa_required?: MfaRequired;
    primary_required?: PrimaryRequired;
}
export interface B2BSessionsGetJWKSRequest {
    project_id: string;
}
export interface B2BSessionsGetJWKSResponse {
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
export interface B2BSessionsGetRequest {
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
}
export interface B2BSessionsGetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_sessions: MemberSession[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BSessionsMigrateRequest {
    session_token: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
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
}
export interface B2BSessionsMigrateResponse {
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
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BSessionsRevokeRequest {
    /**
     * Globally unique UUID that identifies a specific Session in the Stytch API. The `member_session_id` is
     * critical to perform operations on an Session, so be sure to preserve this value.
     */
    member_session_id?: string;
    session_token?: string;
    session_jwt?: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
     */
    member_id?: string;
}
export interface B2BSessionsRevokeResponse {
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
export interface B2BSessionsAuthenticateJwtRequest {
    /**
     * The JWT to authenticate. You may provide a JWT that has expired according to its `exp` claim and needs
     * to be refreshed. If the signature is valid and the underlying session is still active then Stytch will
     * return a new JWT.
     */
    session_jwt: string;
    authorization_check?: AuthorizationCheck;
    /**
     * If set, remote verification will be forced if the JWT was issued at (based on the "iat" claim) more than that many seconds ago.
     * If explicitly set to zero, all tokens will be considered too old, even if they are otherwise valid.
     */
    max_token_age_seconds?: number;
}
export interface B2BSessionsAuthenticateJwtLocalRequest {
    /**
     * The JWT to authenticate. The JWT must not be expired in order for this request to succeed.
     */
    session_jwt: string;
    authorization_check?: AuthorizationCheck;
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
    private policyCache;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig, policyCache: PolicyCache);
    /**
     * Retrieves all active Sessions for a Member.
     * @param params {@link B2BSessionsGetRequest}
     * @returns {@link B2BSessionsGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BSessionsGetRequest): Promise<B2BSessionsGetResponse>;
    /**
     * Authenticates a Session and updates its lifetime by the specified `session_duration_minutes`. If the
     * `session_duration_minutes` is not specified, a Session will not be extended. This endpoint requires
     * either a `session_jwt` or `session_token` be included in the request. It will return an error if both
     * are present.
     *
     * You may provide a JWT that needs to be refreshed and is expired according to its `exp` claim. A new JWT
     * will be returned if both the signature and the underlying Session are still valid. See our
     * [How to use Stytch Session JWTs](https://stytch.com/docs/b2b/guides/sessions/resources/using-jwts) guide
     * for more information.
     *
     * If an `authorization_check` object is passed in, this method will also check if the Member is authorized
     * to perform the given action on the given Resource in the specified. A is authorized if their Member
     * Session contains a Role, assigned
     * [explicitly or implicitly](https://stytch.com/docs/b2b/guides/rbac/role-assignment), with adequate
     * permissions.
     * In addition, the `organization_id` passed in the authorization check must match the Member's
     * Organization.
     *
     * If the Member is not authorized to perform the specified action on the specified Resource, or if the
     * `organization_id` does not match the Member's Organization, a 403 error will be thrown.
     * Otherwise, the response will contain a list of Roles that satisfied the authorization check.
     * @param data {@link B2BSessionsAuthenticateRequest}
     * @returns {@link B2BSessionsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BSessionsAuthenticateRequest): Promise<B2BSessionsAuthenticateResponse>;
    /**
     * Revoke a Session and immediately invalidate all its tokens. To revoke a specific Session, pass either
     * the `member_session_id`, `session_token`, or `session_jwt`. To revoke all Sessions for a Member, pass
     * the `member_id`.
     * @param data {@link B2BSessionsRevokeRequest}
     * @param options {@link B2BSessionsRevokeRequestOptions}
     * @returns {@link B2BSessionsRevokeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    revoke(data: B2BSessionsRevokeRequest, options?: B2BSessionsRevokeRequestOptions): Promise<B2BSessionsRevokeResponse>;
    /**
     * Use this endpoint to exchange a's existing session for another session in a different. This can be used
     * to accept an invite, but not to create a new member via domain matching.
     *
     * To create a new member via domain matching, use the
     * [Exchange Intermediate Session](https://stytch.com/docs/b2b/api/exchange-intermediate-session) flow
     * instead.
     *
     * Only Email Magic Link, OAuth, and SMS OTP factors can be transferred between sessions. Other
     * authentication factors, such as password factors, will not be transferred to the new session.
     * Any OAuth Tokens owned by the Member will not be transferred to the new Organization.
     * SMS OTP factors can be used to fulfill MFA requirements for the target Organization if both the original
     * and target Member have the same phone number and the phone number is verified for both Members.
     * HubSpot and Slack OAuth registrations will not be transferred between sessions. Instead, you will
     * receive a corresponding factor with type `"oauth_exchange_slack"` or `"oauth_exchange_hubspot"`
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
     * @param data {@link B2BSessionsExchangeRequest}
     * @returns {@link B2BSessionsExchangeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    exchange(data: B2BSessionsExchangeRequest): Promise<B2BSessionsExchangeResponse>;
    /**
     * Use this endpoint to exchange a Connected Apps Access Token back into a Member Session for the
     * underlying Member.
     * This session can be used with the Stytch SDKs and APIs.
     *
     * The Access Token must contain the `full_access` scope and must not be more than 5 minutes old. Access
     * Tokens may only be exchanged a single time.
     *
     * Because the Member previously completed MFA and satisfied all Organization authentication requirements
     * at the time of the original Access Token issuance, this endpoint will never return an
     * `intermediate_session_token` or require MFA.
     * @param data {@link B2BSessionsExchangeAccessTokenRequest}
     * @returns {@link B2BSessionsExchangeAccessTokenResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    exchangeAccessToken(data: B2BSessionsExchangeAccessTokenRequest): Promise<B2BSessionsExchangeAccessTokenResponse>;
    /**
     * Migrate a session from an external OIDC compliant endpoint. Stytch will call the external UserInfo
     * endpoint defined in your Stytch Project settings in the [Dashboard](https://stytch.com/docs/dashboard),
     * and then perform a lookup using the `session_token`. If the response contains a valid email address,
     * Stytch will attempt to match that email address with an existing in your and create a Stytch Session.
     * You will need to create the member before using this endpoint.
     * @param data {@link B2BSessionsMigrateRequest}
     * @returns {@link B2BSessionsMigrateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    migrate(data: B2BSessionsMigrateRequest): Promise<B2BSessionsMigrateResponse>;
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
     * If you're using one of our [backend SDKs](https://stytch.com/docs/b2b/sdks), the JWKS rotation will be
     * handled for you.
     *
     * If you're using your own JWT validation library, many have built-in support for JWKS rotation, and
     * you'll just need to supply this API endpoint. If not, your application should decide which JWKS to use
     * for validation by inspecting the `kid` value.
     *
     * See our
     * [How to use Stytch Session JWTs](https://stytch.com/docs/b2b/guides/sessions/resources/using-jwts) guide
     * for more information.
     * @param params {@link B2BSessionsGetJWKSRequest}
     * @returns {@link B2BSessionsGetJWKSResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getJWKS(params: B2BSessionsGetJWKSRequest): Promise<B2BSessionsGetJWKSResponse>;
    /** Parse a JWT and verify the signature, preferring local verification over remote.
     *
     * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
     * (based on the "iat" claim) more than that many seconds ago.
     *
     * To force remote validation for all tokens, set max_token_age_seconds to zero or use the
     * authenticate method instead.
     */
    authenticateJwt(params: B2BSessionsAuthenticateJwtRequest): Promise<{
        member_session: MemberSession;
        session_jwt: string;
    }>;
    /** Parse a JWT and verify the signature locally (without calling /authenticate in the API).
     *
     * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
     * claim) more than maxTokenAge seconds ago.
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
    authenticateJwtLocal(params: B2BSessionsAuthenticateJwtLocalRequest): Promise<MemberSession>;
}
