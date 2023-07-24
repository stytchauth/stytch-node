import { BaseResponse, fetchConfig } from "../shared";
import { Member, MemberSession } from "./shared_b2b";
import { JwtConfig } from "../shared/sessions";
import { Organization } from "./organizations";
import { MfaRequired } from "./mfa";
export interface B2BSessionsGetRequest {
    organization_id: string;
    member_id: string;
}
export interface B2BSessionsGetResponse extends BaseResponse {
    member_sessions: MemberSession[];
}
export interface B2BSessionsJwksResponse extends BaseResponse {
    keys: JWK[];
}
export interface JWK {
    alg: string;
    key_ops: string[];
    kid: string;
    kty: string;
    use: string;
    x5c: string[];
    "x5t#S256": string;
    n: string;
    e: string;
}
export interface B2BSessionsAuthenticateRequest {
    session_duration_minutes?: number;
    session_token?: string;
    session_jwt?: string;
    session_custom_claims?: Record<string, any>;
}
export interface B2BSessionsAuthenticateResponse extends BaseResponse {
    member_session: MemberSession;
    member: Member;
    session_token: string;
    session_jwt: string;
    organization: Organization;
}
export declare type B2BSessionsRevokeRequest = {
    member_session_id: string;
} | {
    session_token: string;
} | {
    session_jwt: string;
} | {
    member_id: string;
};
export declare type B2BSessionsRevokeResponse = BaseResponse;
export interface B2BSessionsExchangeRequest {
    organization_id: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    locale?: "en" | "es" | "pt-br" | string;
}
export interface B2BSessionsExchangeResponse extends BaseResponse {
    member_id: string;
    member_session: MemberSession | null;
    session_token: string;
    session_jwt: string;
    member: Member;
    organization: Organization;
    member_authenticated: boolean;
    intermediate_session_token: string;
    mfa_required: MfaRequired | null;
}
export declare class Sessions {
    private base_path;
    private fetchConfig;
    private jwksClient;
    private jwtOptions;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig);
    private endpoint;
    get({ organization_id, member_id, }: B2BSessionsGetRequest): Promise<B2BSessionsGetResponse>;
    jwks(project_id: string): Promise<B2BSessionsJwksResponse>;
    authenticate(data: B2BSessionsAuthenticateRequest): Promise<B2BSessionsAuthenticateResponse>;
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
    authenticateJwtLocal(jwt: string, options?: {
        clock_tolerance_seconds?: number;
        max_token_age_seconds?: number;
        current_date?: Date;
    }): Promise<MemberSession>;
    exchange(data: B2BSessionsExchangeRequest): Promise<B2BSessionsExchangeResponse>;
    revoke(data: B2BSessionsRevokeRequest): Promise<B2BSessionsRevokeResponse>;
}
