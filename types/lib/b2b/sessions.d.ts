import { AuthenticationFactor, JWK } from "../b2c/sessions";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { JwtConfig } from "../shared/sessions";
export interface MemberSession {
    member_session_id: string;
    member_id: string;
    /**
     * The timestamp when the Session was created. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    started_at: Date;
    /**
     * The timestamp when the Session was last accessed. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    last_accessed_at: Date;
    /**
     * The timestamp when the Session expires. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    expires_at: Date;
    authentication_factors: AuthenticationFactor[];
    /**
     * The custom claims map for a Session. Claims can be added to a session during a Sessions authenticate
     * call.
     */
    custom_claims: Record<string, any>;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
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
}
export interface B2BSessionsExchangeRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
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
    locale?: "en" | "es" | "pt-br" | string;
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
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
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
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
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
export declare class Sessions {
    private fetchConfig;
    private jwksClient;
    private jwtOptions;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig);
    get(params: B2BSessionsGetRequest): Promise<B2BSessionsGetResponse>;
    /**
     * Authenticates a Session and updates its lifetime by the specified `session_duration_minutes`. If the
     * `session_duration_minutes` is not specified, a Session will not be extended. This endpoint requires
     * either a `session_jwt` or `session_token` be included in the request. It will return an error if both
     * are present.
     *
     * You may provide a JWT that needs to be refreshed and is expired according to its `exp` claim. A new JWT
     * will be returned if both the signature and the underlying Session are still valid.
     */
    authenticate(data: B2BSessionsAuthenticateRequest): Promise<B2BSessionsAuthenticateResponse>;
    /**
     * Revoke a Session and immediately invalidate all its tokens. To revoke a specific Session, pass either
     * the `member_session_id`, `session_token`, or `session_jwt`. To revoke all Sessions for a Member, pass
     * the `member_id`.
     */
    revoke(data: B2BSessionsRevokeRequest): Promise<B2BSessionsRevokeResponse>;
    /**
     * Use this endpoint to exchange a Member's existing session for another session in a different
     * Organization. This can be used to accept an invite, but not to create a new member via domain matching.
     *
     * To create a new member via domain matching, use the
     * [Exchange Intermediate Session](https://stytch.com/docs/b2b/api/exchange-intermediate-session) flow
     * instead.
     */
    exchange(data: B2BSessionsExchangeRequest): Promise<B2BSessionsExchangeResponse>;
    getJWKS(params: B2BSessionsGetJWKSRequest): Promise<B2BSessionsGetJWKSResponse>;
    /** Parse a JWT and verify the signature, preferring local verification over remote.
     *
     * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
     * (based on the "iat" claim) more than that many seconds ago.
     *
     * To force remote validation for all tokens, set max_token_age_seconds to zero or use the
     * authenticate method instead.
     */
    authenticateJwt(jwt: string, options?: {
        max_token_age_seconds?: number;
    }): Promise<{
        member_session?: MemberSession;
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
    authenticateJwtLocal(jwt: string, options?: {
        clock_tolerance_seconds?: number;
        max_token_age_seconds?: number;
        current_date?: Date;
    }): Promise<MemberSession>;
}
